import { authentication } from '../config/firebase-config';
import {
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
} from 'firebase/auth';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import fetcher from '../lib/fetcher';
import useSWR from 'swr';
import { useState } from 'react';
import { useAuth } from '../lib/useAuth';
import { useMessages } from '../lib/useMessages';
const makeshit = () => {
  fetch('/api/inbox/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'test',
      message: 'test',
      email: 'vaishnav240204@gmail.com',
    }),
  }).then((i) => {
    console.log(i);
  });
};
const removeUser = () => {
  signOut(getAuth())
    .then(() => {
      console.log('Signed out');
    })
    .catch((error) => {
      console.log(error);
    });
};

const getUser = async (uid) => {
  if (!uid) return null;
  const res = await fetch(`/api/user/${uid}`);
  if (!res) return null;
  return res;
};

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authentication, provider)
    .then((user) => {
      const us = getUser(user.user.uid).then((i) => {
        if ((i.message = 'User not found')) {
          fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(user.user),
          });
        }
      });
    })
    .catch((error) => {
      const errorCode = error.code;
    });
};

function Inbox({ user }) {
  //let { messages } = useMessages(user);
  let messages = [];
  return (
    <Link href='/inbox'>
      {messages?.length > 0 ? (
        <div className='btn-lg btn btn-outline btn-error gap-2'>
          <div className='badge badge-error badge-lg w-auto h-auto text-white text-xl'>
            {messages.length}
            <span class='animate-ping absolute inline-flex h-10 w-10 rounded-full bg-red-400 opacity-75'></span>
          </div>
        </div>
      ) : (
        <div className='btn-lg btn btn-outline btn-success w-12'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='stroke-current flex-shrink-0 h-6 w-6 text-white'
            fill='none'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
      )}
    </Link>
  );
}

export default function Nav() {
  let { pending, isSignedIn, user, auth } = useAuth();
  if (pending) {
    return (
      <div className='grid h-auto card glass rounded-md place-items-center text-3xl'>
        <div className='btn'>Loading...</div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-br from-red-400 to-slate-600'>
      <div className='navbar glass'>
        <div className='flex-1'>
          <Link href='/'>
            <div className='btn btn-error normal-case text-xl glass'>
              Kazoot!
            </div>
          </Link>
        </div>

        <div className='flex-none'>
          {isSignedIn ? (
            <div className='dropdown dropdown-end z-50'>
              <div className='btn-group'>
                <Inbox user={user} />
                <div
                  tabIndex={0}
                  className='btn btn-ghost btn-outline glass btn-lg gap-2'
                >
                  <div className='badge-lg badge rounded-md'>
                    {user.displayName}
                  </div>
                  <div className='mask mask-squircle w-10'>
                    <img src={user.photoURL} />
                  </div>
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-compact dropdown-content mt-3 p-2 shadow rounded-md bg-base-100 w-52'
              >
                <li>
                  <Link href='/profile'>
                    <a className='justify-between'>
                      Profile
                      <span className='badge'>New</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/groups'>
                    <a className='justify-between'>
                      Groups
                      <span className='badge'>New</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/leaderboard'>
                    <a className='justify-between'>
                      Leaderboard
                      <span className='badge'>New</span>
                    </a>
                  </Link>
                </li>
                <li onClick={removeUser}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <div className='btn btn-error' onClick={signInWithGoogle}>
              {' '}
              Sign in with Google{' '}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import Typewriter from 'typewriter-effect';
import PrivilegedComponent from '../components/PrivilegedComponent';
import Nav from '../components/Nav';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import Loading from '../components/Loading';
import { useAuth } from '../lib/useAuth';
import { useMessages } from '../lib/useMessages';
function Inbox({ user }) {
  let { messages } = useMessages(user);
  const handleClear = () => {
    fetch('/api/inbox/clear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: user.uid }),
    }).then((i) => {
      console.log(i);
    });
  };
  return (
    <>
      {messages?.length > 0 ? (
        <div className='alert alert-info shadow-lg rounded-md p-5 text-2xl'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='stroke-current flex-shrink-0 w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
              ></path>
            </svg>
            You have a total of {messages.length} unread messages!
          </div>
          <div className='btn btn-error btn-lg' onClick={handleClear}>
            Clear all
          </div>
        </div>
      ) : null}
      {messages?.length > 0 ? (
        messages.map((i, e) => {
          return (
            <div key={e}>
              <div className='card glass rounded-md p-2 m-2'>
                <div className='flex flex-row justify-between'>
                  <div className='badge badge-accent rounded-md h-auto text-2xl'>
                    {' '}
                    {i.from}{' '}
                  </div>
                  <div className='badge badge-accent rounded-md h-auto text-2xl'>
                    {new Date(i.createdAt).toString().slice(0, 33)}
                  </div>
                </div>
                <div className='alert mt-5 rounded-md glass'>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      className='stroke-info flex-shrink-0 w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      ></path>
                    </svg>
                    <div>
                      <h3 className='font-bold'>{i.message}</h3>
                    </div>
                  </div>
                  <div className='flex-none'>
                    <button className='btn btn-sm'>See</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className='alert alert-success shadow-lg'>
          <div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current flex-shrink-0 h-6 w-6'
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
            <span className='text-3xl'>Wow, such empty!</span>
          </div>
        </div>
      )}
    </>
  );
}
export default function Page() {
  const { pending, isSignedIn, user } = useAuth();
  if (pending) {
    return <h1>waiting...</h1>;
  }
  return (
    <>
      <Inbox user={user} />
    </>
  );
}

Page.privileged = false;

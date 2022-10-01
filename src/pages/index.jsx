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
export default function Page() {
  const { pending, isSignedIn, user, auth } = useAuth();

  if (pending) {
    return <h1>waiting...</h1>;
  }
  return (
    <>
      <Head>
        <title>Quiz</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <main>
        <h1 className='flex justify-center h-20 card glass place-items-center text-5xl flex-row rounded-md'>
          <Typewriter
            options={{
              strings: ['Kazoot!', 'The next big music quiz game!'],
              autoStart: true,
              loop: true,
              pauseFor: 500,
              deleteSpeed: 10,
              delay: 50,
            }}
            className='ml-2'
          />
        </h1>
        <section className='mt-5 card glass rounded-md justify-center text-3xl p-2 gap-2'>
          <div>
            <label
              htmlFor='my-modal'
              className='btn btn-accent btn-outline w-full btn-lg text-3xl gap-2 h-auto p-5'
            >
              {isSignedIn
                ? `Welcome ${user?.displayName}`
                : 'You are not logged in!'}
            </label>
          </div>
          <div>
            <Link href='/games'>
              <a className='btn btn-success btn-outline w-full btn-lg'>Start</a>
            </Link>
          </div>
        </section>
      </main>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            More info about {user?.displayName}!
          </h3>
          <div className='badge badge-accent rounded-md h-auto text-2xl'>
            {' '}
            {user?.uid}{' '}
          </div>
          <div className='modal-action'>
            <label htmlFor='my-modal' className='btn'>
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

Page.privileged = false;

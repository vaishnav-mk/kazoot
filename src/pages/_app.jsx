import React from 'react';
import { SWRConfig } from 'swr';
import PrivilegedComponent from '../components/PrivilegedComponent';
import '../styles/globals.css';
import Nav from '../components/Nav';
export default function MyApp({ Component, pageProps }) {
  if (Component.privileged === false) {
    return (
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <div className='flex min-h-screen w-full flex-col bg-gradient-to-br from-red-400 to-slate-600'>
          <Nav />
          <div className='m-auto w-full max-w-4xl overflow-hidden p-6 lg:p-10 2xl:max-w-7xl'>
            <Component {...pageProps} />
          </div>
        </div>{' '}
      </SWRConfig>
    );
  }
  return (
    <SWRConfig
      value={{
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <PrivilegedComponent>
        <div className='flex min-h-screen w-full flex-col bg-gradient-to-br from-red-400 to-slate-600'>
          <Nav />
          <div className='m-auto w-full max-w-4xl overflow-hidden p-6 lg:p-10 7xl:max-w-7xl'>
            <Component {...pageProps} />
          </div>
        </div>{' '}
      </PrivilegedComponent>
    </SWRConfig>
  );
}

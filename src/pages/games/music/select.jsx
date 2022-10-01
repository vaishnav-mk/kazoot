import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import fetcher from '../../../lib/fetcher';
import { DefaultMeta } from '../../../components/DefaultMeta';
import Loading from '../../../components/Loading';
import { useAuth } from '../../../lib/useAuth';
let show = false;
let code;
function SongSelector(i, options, setResult) {
  let res;
  fetch('/api/activegames/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      creatorUID: 'rK9QGQLgnidkGagajwXvKvWzq4y1',
      artist: i.artist,
      track: i.track,
      options,
    }),
  })
    .then((i) => i.json())
    .then((i) => {
      code = i.gameID;
      setResult(true);
    });
  /*fetch('/api/activegames/recentgame', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((i) => i.json())
    .then((i) => {
        console.log({i})
      code = i.key;
      setResult(true);
    });*/
}
export default function Page() {
  const [result, setResult] = useState(false);
  const { data, error, isValidating } = useSWR(
    '/api/activegames/randomsongs',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <Loading />;
  console.log({ data });
  return (
    <>
      {result ? (
        <div>
          <div className='btn glass w-full btn-lg text-3xl text-white bg-gradient-to-r from-[#36D399] to-[#F99797] rounded-none rounded-t-md outline outline-[#36D399]'>
            Rightclick to share link!
          </div>
          <section className='flex min-h-screen items-center align-middle glass rounded-md outline outline-[#36D399]'>
            <div className='m-auto mt-24 p-8 sm:p-12'>
              <div className='btn-group btn-group-vertical w-full'>
                <a href={`/games/music/begin/${code}`}>
                  {' '}
                  <div className='btn glass w-full btn-lg text-3xl text-white'>
                    play
                  </div>
                </a>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div>
          <div className='btn glass w-full btn-lg text-3xl text-white bg-gradient-to-r from-[#36D399] to-[#F99797] rounded-none rounded-t-md outline outline-[#36D399]'>
            Select a song!
          </div>
          <section className='flex min-h-screen items-center align-middle glass rounded-md outline outline-[#36D399]'>
            <div className='m-auto mt-24 p-8 sm:p-12'>
              <div className='btn-group btn-group-vertical w-full'>
                {data.randoms.map((i) => (
                  <div
                    className='btn glass w-full btn-lg text-3xl text-white h-auto'
                    onClick={() => SongSelector(i, data, setResult)}
                  >
                    {i.track} by {i.artist}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

import fetcher from '../lib/fetcher';
import useSWR from 'swr';
export default function PlayerPanelBeforeStart({ user, gameInfo }) {
  console.log('before start');
  console.log({ user, gameInfo });
  fetch('/api/activegames/updateplayer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playerUID: user.uid,
      gameID: gameInfo.id,
      displayName: user.displayName,
    }),
  }).then((i) => {
    console.log({ i });
  });

  return (
    <div>
      <div className='btn glass w-full btn-lg text-3xl text-white bg-gradient-to-r from-[#36D399] to-[#F99797] rounded-none rounded-t-md outline outline-[#36D399]'>
        Player Panel
      </div>
      <section className='flex min-h-screen items-center align-middle glass rounded-md outline outline-[#36D399]'>
        <div className='m-auto mt-24 p-8 sm:p-12'>
          <div className='btn-group btn-group-vertical w-full'>
            <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
              Game ID: {gameInfo.id}
            </div>
            <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
              Your current ID: {user.uid}
            </div>
            <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
              {!gameInfo.started
                ? "Game hasn't started yet!"
                : 'Game has already started!'}
            </div>
          </div>
          <div className='btn-group btn-group-vertical w-full mt-5'>
            <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
              Placeholder
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import { usePlayerList } from '../lib/usePlayerList';
import { useState } from 'react';
import { useGameState } from '../lib/useGameState';
const begin = (id) => {
  console.log({ id });
  fetch(`/api/activegames/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  })
    .then((i) => i.json())
    .then((i) => console.log({ i }));
};
const end = (id) => {
  fetch(`/api/activegames/endGame`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      winnerUID: null,
    }),
  })
    .then((i) => i.json())
    .then((i) => console.log({ i }));
};
const updateCreator = ({ gameInfo, creatorID }) => {
  fetch('/api/activegames/updateCreator', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: gameInfo.id,
      creatorUID: creatorID,
    }),
  }).then((i) => {
    console.log({ i });
  });
};
function Players({ gameInfo }) {
  let { players } = usePlayerList(gameInfo.id);
  console.log({ players });
  return (
    <>
      <div className='btn-group btn-group-vertical w-full mt-5'>
        <div className='btn btn-success w-full btn-lg text-3xl text-white btn-disabled'>
          Player Info
        </div>
        {gameInfo.currentPlayers?.length > 0 ? (
          <>
            <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
              Total players: {gameInfo.currentPlayers?.length}
            </div>

            {gameInfo.currentPlayers.map((player, i) => (
              <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
                <div className='badge badge-3xl text-3xl badge-success p-5 rounded-md'>
                  {player.displayName} - {player.playerUID}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className='btn btn-error btn-outline rounded-b-md'>
            No players have joined yet! try reloading
          </div>
        )}
        <select className='select w-full glass mt-10'>
          <option disabled selected>
            Change the admin
          </option>
          {gameInfo.currentPlayers?.map((player, i) => (
            <option value={player.playerUID}>{player.displayName}</option>
          ))}
        </select>
      </div>
    </>
  );
}
export default function AdminPanel({ gameInfo, lyrics, id }) {
  const [date, setDate] = useState(Date.now());
  console.log({ gameInfo });
  const { gameState } = useGameState(id);
  console.log({ gameState });

  return (
    <div>
      <div className='btn glass w-full btn-lg text-3xl text-white bg-gradient-to-r from-[#36D399] to-[#F99797] rounded-none rounded-t-md outline outline-[#36D399]'>
        Admin Panel
      </div>
      <section className='flex min-h-screen items-center align-middle glass rounded-md outline outline-[#36D399]'>
        <div className='m-auto mt-24 p-8 sm:p-12'>
          <div className='btn-group btn-group-vertical w-full'>
            <div className='btn btn-success w-full btn-lg text-3xl text-white btn-disabled'>
              Game Info
            </div>
            <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
              Game ID: {id}
            </div>
            <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
              Game Creator ID: {gameInfo.creatorID}
            </div>
            <div className='btn glass w-full btn-lg text-2xl text-white btn-disabled h-auto'>
              Gate started at: {new Date(Date.now()).toString().slice(0, 33)}
            </div>
          </div>
          <div className='btn-group btn-group-vertical w-full mt-5'>
            <div className='btn btn-success w-full btn-lg text-3xl text-white btn-disabled'>
              Song Info
            </div>
            <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
              Song artist: {gameInfo.artist}
            </div>
            <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
              Song name: {gameInfo.track}
            </div>
            <div className='btn glass w-full btn-lg text-3xl h-auto text-white btn-disabled p-5'>
              Lyrics: {lyrics}
            </div>
            <Players gameInfo={gameInfo} />
          </div>
        </div>
      </section>
    </div>
  );
}

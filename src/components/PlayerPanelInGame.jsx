import fetcher from '../lib/fetcher';
import useSWR from 'swr';
import { useState } from 'react';
import CorrectModal from './CorrectModal';
import WrongModal from './WrongModal';
import Loading from './Loading';
import { useGameState } from '../lib/useGameState';
import ResultMusic from './ResultMusic';
function endGame(gameInfo, winner) {
  fetch('/api/endGame', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      gameID: gameInfo.id,
      winnerUID: winner.uid,
    }),
  })
    .then((i) => i.json())
    .then((i) => {
      console.log({ i });
    });
}
export default function PlayerPanelInGame({
  user,
  gameInfo,
  lyrics,
  options,
  id,
}) {
  const [adminScore, setAdminScore] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [showModalCorrect, setShowModalCorrect] = useState(false);
  const [showModalWrong, setShowModalWrong] = useState(false);
  const [bgBlur, setBgBlur] = useState(false);
  const [answer, setAnswer] = useState();
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  if (!lyrics) return <div>loading</div>;
  const { gameState } = useGameState(gameInfo.id);
  console.log({ lyrics, options, gameInfo });
  console.log({ gameState });
  fetch('/api/activegames/updateplayer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      playerUID: user.uid,
      gameID: id,
      displayName: user.displayName,
    }),
  })
    .then((i) => i.json())
    .then((i) => {
      console.log({ updated: i });
    });
  return !gameEnded ? (
    <>
      <div>
        <div className='btn glass w-full btn-lg text-3xl text-white bg-gradient-to-r from-[#36D399] to-[#F99797] rounded-none rounded-t-md outline outline-[#36D399]'>
          Player Panel
        </div>
        <section className='flex min-h-screen items-center align-middle glass rounded-md outline outline-[#36D399]'>
          <div className='m-auto mt-24 p-8 sm:p-12'>
            <div className='btn-group btn-group-vertical w-full'>
              <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
                Game ID: {id}
              </div>
              <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
                Your current ID: {user.uid}
              </div>
              <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled'>
                Game STARTED
              </div>
            </div>
            <div className='btn-group btn-group-vertical w-full mt-5'>
              <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled h-auto'>
                {lyrics.slice(0, 100)}
              </div>
            </div>
            <div className='btn-group w-full'>
              <div className='mt-24 grid grid-flow-col grid-rows-4 gap-4 md:grid-rows-4 lg:grid-rows-2'>
                {[
                  options.randoms
                    .sort((a, b) => a.sort - b.sort)
                    .map((e, i) => {
                      console.log({ e });
                      return (
                        <button
                          onClick={() => {
                            setAnswer(gameInfo.track);
                            if (e.track === gameInfo.track) {
                              setRightAnswers(1);
                              setShowModalCorrect(true);
                              setUserScore(userScore + 1);
                              setAdminScore(0);
                              setTimeout(() => {
                                setShowModalCorrect(false);
                                setBgBlur(false);
                                setGameEnded(true);
                              }, 1500);

                              //endGame(id, user.uid);
                            } else {
                              setWrongAnswers(1);
                              setAdminScore(1);
                              setBgBlur(true);
                              setUserScore(0);
                              setShowModalWrong(true);
                              setTimeout(() => {
                                setShowModalWrong(false);
                                setBgBlur(false);
                                setGameEnded(true);
                              }, 1500);
                              //endGame(id, user.uid);
                            }
                          }}
                          key={i}
                          className='glass rounded-md h-16 flex items-center justify-center text-2xl font-bold disabled:bg-primary-100 lg:hover:bg-[#36D399] lg:hover:text-[#F99790] shadow-xl transition duration-300 w-full'
                        >
                          <div>
                            <span className='block rounded-xl p-4 shadow-sm w-full'>
                              <h6 className='text-${rightOptionColor}-500 mt-2 font-bold w-full'>
                                {e.track} by {e.artist}
                              </h6>
                            </span>
                          </div>
                        </button>
                      );
                    }),
                ]}
              </div>
            </div>
          </div>
        </section>
        <>
          {showModalCorrect ? (
            <CorrectModal correctAnswers={1} score={1} total={1} />
          ) : null}
        </>
        <>
          {showModalWrong ? (
            <WrongModal wrongAnswers={1} score={0} total={0} />
          ) : null}
        </>
      </div>
    </>
  ) : !gameEnded ? (
    <Loading />
  ) : (
    <ResultMusic
      adminScore={adminScore}
      userScore={userScore}
      question={lyrics.slice(0, 100)}
      answer={answer}
      lyrics={lyrics}
    />
  );
}

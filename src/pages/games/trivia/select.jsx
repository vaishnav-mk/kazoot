import useSWR from 'swr';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import fetcher from '../../../lib/fetcher';
import { MainLayout } from '../../../layouts/Layout';
import { DefaultMeta } from '../../../components/DefaultMeta';
import Loading from '../../../components/Loading';

function DifficultySelecter({ difficulty, setDifficulty }) {
  return (
    <div
      className={`card glass rounded-md text-3xl text-white p-5 mt-5 grid gap-5`}
    >
      Difficulty
      <div className='form-control card glass p-2 rounded-md'>
        <label className='label cursor-pointer'>
          <span className='label-text text text-white text-3xl ml-5'>Easy</span>
          <input
            type='radio'
            name='radio-6'
            className='radio checked:bg-blue-500'
            value='easy'
            checked={difficulty === 'easy'}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </label>
      </div>
      <div className='form-control card glass rounded-md p-2'>
        <label className='label cursor-pointer'>
          <span className='label-text text text-white text-3xl ml-5'>
            Medium
          </span>
          <input
            type='radio'
            name='radio-6'
            className='radio checked:radio-accent'
            value='medium'
            checked={difficulty === 'medium'}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </label>
      </div>
      <div className='form-control card glass p-2 rounded-md'>
        <label className='label cursor-pointer'>
          <span className='label-text text text-white text-3xl ml-5'>Hard</span>
          <input
            type='radio'
            name='radio-6'
            className='radio checked:bg-red-500'
            value='hard'
            checked={difficulty === 'hard'}
            onChange={(e) => setDifficulty(e.target.value)}
          />
        </label>
      </div>
      <div className='badge badge-lg rounded-md badge-accented'>
        By default, itll be set to easy
      </div>
    </div>
  );
}
function QuestionSelector({ questions, setQuestions }) {
  function handleSliderChange(e) {
    console.log(e);
    setQuestions(e.target.value);
  }
  return (
    <div className='mt-5'>
      <input
        type='range'
        min='0'
        max='25'
        onChange={handleSliderChange}
        value={questions}
        className='range rounded-md'
      />
      <div
        className='tooltip w-full tooltip-info'
        data-tip='Use the slider to select the number of questions'
      >
        <div className='btn w-full glass btn-disabled text-white'>
          <span className='countdown font-mono text-3xl'>
            Questions:{' '}
            <span style={{ '--value': questions }} className='ml-2'></span>
          </span>
        </div>
      </div>
    </div>
  );
}
export default function Page() {
  const [chosenCategory, setChosenCategory] = useState([]);
  const [questions, setQuestions] = useState('3');
  const [difficulty, setDifficulty] = useState();
  let [stage, setStage] = useState(0);
  console.log({ stage });

  function reset() {
    setChosenCategory([]);
  }
  const { data, error, isValidating } = useSWR(
    'https://the-trivia-api.com/api/categories',
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <Loading />;
  return (
    <>
      <DefaultMeta title='Begin this round' description='select categories' />
      <div>
        {stage === 0 ? (
          <div>
            <h1 className='text-4xl font-bold text-center'>
              Choose a category to start
              {chosenCategory.length
                ? `[${chosenCategory.length} selected]`
                : ''}
            </h1>
            <div className='flex flex-wrap flex-col'>
              <div className='grid gap-8 pt-12 md:grid-cols-2 lg:grid-cols-2 w-full text-lg'>
                {Object.entries(data).map((e, i) => {
                  return (
                    <div key={i}>
                      <div className='relative'>
                        <input
                          className='group peer hidden'
                          type='checkbox'
                          value={e[1][0]}
                          checked={chosenCategory.includes(e[1][0])}
                          onClick={(element) => {
                            if (
                              !chosenCategory.includes(element.target.value)
                            ) {
                              setChosenCategory([
                                ...chosenCategory,
                                element.target.value,
                              ]);
                            } else {
                              setChosenCategory(
                                chosenCategory.filter(
                                  (e) => e !== element.target.value
                                )
                              );
                            }
                          }}
                          id={i.toString()}
                        />

                        <label
                          className='align-middle w-full text-xl btn glass peer-checked:text-[#36D399] peer-checked:font-bold peer-checked:border-[#36D399] peer-checked:ring-1  peer-checked:ring-[#36D399] rounded-md'
                          htmlFor={i.toString()}
                        >
                          <span> {e[0]} </span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}
        {stage == 1 ? (
          <DifficultySelecter
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
        ) : null}

        {stage == 2 ? (
          <QuestionSelector
            questions={questions}
            setQuestions={setQuestions}
            className={stage === 2 ? 'visible' : 'invisible'}
          />
        ) : null}
        <div className='mt-5'>
          <div>
            <div className='btn-group btn-group-vertical md:btn-group-horizontal'>
              <div
                className={`btn btn-error ${
                  stage == 0 ? 'btn-disabled' : null
                }`}
                onClick={() => setStage(stage !== 0 ? stage-- : 0)}
              >
                previous page
              </div>
              <div
                className={`btn btn-success ${
                  stage == 2 ? 'btn-disabled' : null
                }`}
                onClick={() => setStage(stage !== 2 ? stage++ : 2)}
              >
                next page
              </div>
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <div
            className={
              chosenCategory.length > 0 && stage === 2 ? 'visible' : 'invisible'
            }
          >
            <div className='btn-group btn-group-vertical md:btn-group-horizontal'>
              <Link
                href={{
                  pathname: '/games/trivia/begin',
                  query: {
                    categories: chosenCategory.join(', '),
                    questions,
                    difficulty,
                  },
                }}
              >
                <button className='w-full btn btn-success text-xl'>
                  <h3>Start Quiz</h3>
                </button>
              </Link>
              <Link href='#'>
                <button
                  className='w-full btn btn-error text-xl'
                  onClick={reset}
                >
                  <h3>Clear Selection(s)</h3>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import fetcher from '../../../lib/fetcher';
import useSWR from 'swr';
import Result from '../../../components/Result';
import CorrectModal from '../../../components/CorrectModal';
import WrongModal from '../../../components/WrongModal';
import Loading from '../../../components/Loading';
import { useAuth } from '../../../lib/useAuth';
export default function Page() {
  const querries = useRouter().query;
  console.log({ querries });
  console.log(querries.categories);
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setquestionIndex] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [testEnded, setTestEnded] = useState(false);
  const [showModalCorrect, setShowModalCorrect] = useState(false);
  const [showModalWrong, setShowModalWrong] = useState(false);
  const [bgBlur, setBgBlur] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [rightAnswers, setRightAnswers] = useState([]);
  const total = querries.questions;
  let { pending, isSignedIn, user, auth } = useAuth();
  const { data, error, isValidating } = useSWR(
    `https://the-trivia-api.com/api/questions?categories=${
      querries.categories
    }&limit=${total}${
      querries.difficulty ? `&difficulty=${querries.difficulty}` : ''
    }`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );
  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);
  if (testEnded) {
    fetch('/api/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: questions.length,
        rightAnswers: rightAnswers.length,
        wrongAnswers: wrongAnswers.length,
        questions: questions.length,
        type: 'trivia',
        uid: user.uid,
        categories: querries.categories.split(','),
      }),
    }).then((i) => {
      console.log('TEST ENDED');
      console.log({ i });
    });
  }
  return questions.length > 0 && !testEnded ? (
    <>
      <Head>
        <title>Question {questionIndex + 1}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <div>
        <>
          <section
            className={`
             rounded-md outline outline-1 ${
               bgBlur ? 'min-h-screen p-8 blur-sm ' : 'min-h-screen p-8 '
             }
            `}
          >
            <a className=' rounded-sm m-auto mt-24 p-8 sm:p-12'>
              <div>
                <div className='lg:divider'>
                  <span className='btn glass rounded-md text-lg font-bold text-white w-full md:w-96 shadow-xl'>
                    Score: {userScore}
                  </span>
                </div>
                <div className='btn-group btn-group-vertical w-full shadow-lg mt-5'>
                  <span className='btn glass btn-success text-white text-3xl btn-disabled rounded-md shadow-md h-auto'>
                    Q{questionIndex + 1}
                  </span>
                  <span className='text-3xl  text-white btn btn-disabled glass rounded-md h-auto p-2'>
                    <h3>{questions[questionIndex].question}</h3>
                  </span>
                </div>
              </div>
              <div className='mt-24 grid grid-flow-col grid-rows-4 gap-4 md:grid-rows-4 lg:grid-rows-2'>
                {[
                  ...questions[questionIndex].incorrectAnswers,
                  questions[questionIndex].correctAnswer,
                ]
                  .map((value) => ({ value, sort: Math.random() }))
                  .sort((a, b) => a.sort - b.sort)
                  .map(({ value }) => value)
                  .map((e, i) => {
                    return (
                      <button
                        onClick={() => {
                          if (e === questions[questionIndex].correctAnswer) {
                            setRightAnswers((oldArray) => [
                              ...oldArray,
                              questions[questionIndex],
                            ]);
                            setUserScore(userScore + 1);
                            setShowModalCorrect(true);
                            setBgBlur(true);
                            setTimeout(() => {
                              questionIndex <= total - 2
                                ? setquestionIndex(questionIndex + 1)
                                : setTestEnded(true);
                              setShowModalCorrect(false);
                              setBgBlur(false);
                            }, 1500);
                          } else {
                            setWrongAnswers((oldArray) => [
                              ...oldArray,
                              questions[questionIndex],
                            ]);

                            setBgBlur(true);
                            setShowModalWrong(true);
                            setTimeout(() => {
                              questionIndex <= total - 2
                                ? setquestionIndex(questionIndex + 1)
                                : setTestEnded(true);
                              setShowModalWrong(false);
                              setBgBlur(false);
                            }, 1500);
                          }
                        }}
                        key={i}
                        className='glass rounded-md h-16 flex items-center justify-center text-2xl font-bold disabled:bg-primary-100 lg:hover:bg-[#36D399] lg:hover:text-[#F99790] shadow-xl transition duration-300'
                      >
                        <div>
                          <span className='block rounded-xl  p-4 shadow-sm '>
                            <h6 className='text-${rightOptionColor}-500 mt-2 font-bold'>
                              {e}
                            </h6>
                          </span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </a>
          </section>
        </>
      </div>
      <>
        {showModalCorrect ? (
          <CorrectModal
            correctAnswers={rightAnswers}
            score={userScore}
            total={total}
          />
        ) : null}
      </>
      <>
        {showModalWrong ? (
          <WrongModal
            wrongAnswers={wrongAnswers}
            score={userScore}
            total={total}
          />
        ) : null}
      </>
    </>
  ) : !testEnded ? (
    <Loading />
  ) : (
    <Result
      correctAnswers={rightAnswers}
      wrongAnswers={wrongAnswers}
      score={userScore}
    />
  );
}

import Head from 'next/head';
import Link from 'next/link';
import DefaultMeta from './DefaultMeta';

function GetWrongAnswers(question, answer) {
  return (
    <>
      <div
        tabIndex={0}
        className={`collapse collapse-plus border bg-[#F99797] outline-0 outline-[#F99797]  
          rounded-b-md
        `}
      >
        <div className='collapse-title text-xl font-medium outline-0'>
          {question}
        </div>

        <div className='collapse-content'>
          <p className='mt-4 leading-relaxed outline-0 m-2'>
            The correct answer was{' '}
            <span className='font-bold underline underline-offset-2 m-2 glass rounded-md p-2'>
              {answer}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

function GetCorrectAnswers(question, answer) {
  return (
    <>
      <div
        tabIndex={0}
        className={`collapse collapse-plus border bg-[#36D399] outline-0 outline-[#36D399] rounded-b-md
        `}
      >
        <div className='collapse-title text-xl font-medium outline-0'>
          {question}
        </div>
        <div className='collapse-content'>
          <p className='mt-4 leading-relaxed outline-0'>
            You answerred it correctly by giving
            <span className='font-bold underline underline-offset-2 m-2 glass rounded-md p-2'>
              {answer}
            </span>
            as the right answer
          </p>
        </div>
      </div>
    </>
  );
}
export default function ResultMusic({
  adminScore,
  userScore,
  question,
  answer,
  lyrics,
}) {
  return (
    <div>
      <div
        className={`btn glass w-full btn-lg text-3xl text-white bg-gradient-to-r from-[#36D399] to-[#F99797] rounded-none rounded-t-md outline outline-[#${
          userScore == 1 ? '36D399' : 'F99797'
        }]`}
      >
        Game Over
      </div>
      <section
        className={`flex min-h-screen items-center align-middle glass rounded-md outline outline-[#${
          userScore == 0 ? '36D399' : 'F99797'
        }]`}
      >
        <div className='m-auto mt-24 p-8 sm:p-12'>
          <div className='btn-group btn-group-vertical  w-full'>
            <div className='btn glass w-full btn-lg text-3xl text-white'>
              Your final userScore is {userScore}{' '}
              {userScore > 1 ? 'points' : 'point'}!
            </div>
            <div className='btn glass w-full btn-lg text-3xl text-white'>
              <Link href='/'>Play Again</Link>{' '}
            </div>
          </div>
          <div>
            {userScore == 1 ? (
              <div>
                <h4 className='btn w-full  rounded-t-md rounded-none text-white btn-lg text-xl btn-success btn-outline mt-5'>
                  Here is the question you got right
                </h4>
                {GetCorrectAnswers(question, answer)}
              </div>
            ) : (
              <div className='grid h-20 card glass rounded-md place-items-center text-3xl mt-5 outline outline-[#F99797]'>
                All the questions you answered were wrong
              </div>
            )}
          </div>
          <div>
            {userScore == 0 ? (
              <div>
                <h4 className='btn w-full rounded-t-md rounded-none text-white btn-lg text-xl btn-error btn-outline mt-5'>
                  Here are the questions you got wrong
                </h4>
                {GetWrongAnswers(question, answer)}
              </div>
            ) : (
              <div className='grid h-20 card glass rounded-md place-items-center text-3xl mt-5 outline outline-[#36D399]'>
                All the questions you answered were correct
              </div>
            )}
          </div>
          <div className='btn-group btn-group-vertical w-full mt-5'>
            <div className='btn glass w-full btn-lg text-3xl text-white btn-disabled h-auto p-5'>
              {lyrics}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

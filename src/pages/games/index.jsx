import Head from 'next/head';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex flex-col md:flex-row items-center gap-5 justify-between'>
      <div className='card w-96 glass shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-400 duration-300'>
        <figure className='px-10 pt-10'>
          <img
            src='https://placeimg.com/400/225/arch'
            alt='Shoes'
            className='rounded-xl'
          />
        </figure>
        <div className='card-body items-center text-center'>
          <h2 className='card-title text-3xl'>Trivia</h2>
          <p>Play trivia</p>
          <div className='card-actions w-full'>
            <Link href='/games/trivia/select'>
              <button className='btn btn-success w-full'>Play Now!</button>
            </Link>
          </div>
        </div>
      </div>
      <div className='card w-96 glass shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-400 duration-300'>
        <figure className='px-10 pt-10'>
          <img
            src='https://placeimg.com/400/225/arch'
            alt='Shoes'
            className='rounded-xl'
          />
        </figure>
        <div className='card-body items-center text-center'>
          <h2 className='card-title text-3xl'>
            Music Quiz{' '}
            <div className='badge badge-error badge-lg rounded-md uppercase'>
              incomplete!
            </div>
          </h2>
          <p>Play music quiz!</p>
          <div className='card-actions w-full'>
            <Link href='/games/music/select'>
              <button className='btn btn-primary w-full'>Play now!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

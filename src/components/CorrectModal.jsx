export default function CorrectModal({ correctAnswers, score, total }) {
  return (
    <>
      <input
        type='checkbox'
        id='my-modal'
        className='modal-toggle'
        checked={true}
      />
      <div className='modal'>
        <div className='modal-box outline outline-[#36D399] glass'>
          <h3 className='font-bold text-xl'>
            {['NICE'].sort(() => 0.5 - Math.random())[0]}
          </h3>
          <p className='py-4 text-xl'>
            {['you got that one right'].sort(() => 0.5 - Math.random())[0]}
          </p>
          <div className='modal-action'>
            <label
              htmlFor='my-modal'
              className='btn btn-outline btn-success w-full text-xl glass gap-3'
            >
              😃 +1 Point{' '}
              <span className='badge rounded-md badge-success badge-outline badge- text-xl'>
                {score}/{total}
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

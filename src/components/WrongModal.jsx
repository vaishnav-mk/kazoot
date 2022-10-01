export default function WrongModal({ wrongAnswers, score, total }) {
  return (
    <>
      <input
        type='checkbox'
        id='my-modal'
        className='modal-toggle'
        checked={true}
      />
      <div className='modal'>
        <div className='modal-box outline outline-[#F99797] glass'>
          <h3 className='font-bold text-xl'>
            {['OOPS!'].sort(() => 0.5 - Math.random())[0]}
          </h3>
          <p className='py-4 text-xl'>
            {['That was wrong'].sort(() => 0.5 - Math.random())[0]}
          </p>
          <div className='modal-action'>
            <label
              htmlFor='my-modal'
              className='btn btn-outline btn-error w-full text-xl glass gap-3'
            >
              😔 +0 Point{' '}
              <span className='badge rounded-md badge-error badge-outline badge- text-xl'>
                {score}/{total}
              </span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

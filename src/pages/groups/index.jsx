import { useAuth } from '../../lib/useAuth';
import { useState } from 'react';
const getIds = () => {};
export default function Page() {
  const [ids, setIds] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [modal, showModal] = useState(false);
  let { pending, isSignedIn, user, auth } = useAuth();
  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (name.length > 3 && description.length > 3) showModal(true);
  };

  if (pending) {
    return (
      <div className='grid h-auto card glass rounded-md place-items-center text-3xl'>
        <div className='btn'>Loading...</div>
      </div>
    );
  }
  return (
    <>
      <div className='flex flex-col md:flex-row gap-5 justify-between items-center md:items-stretch'>
        <div className='card glass w-96 bg-blue-900 shadow-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 duration-300'>
          <figure className='px-10 pt-10 mb-5'>
            <div className='grid flex-grow h-32 card glass rounded-md place-items-center mask mask-squircle select-none'>
              <h1 className='text-7xl'>NG</h1>
            </div>
          </figure>
          <h2 className='card-body items-center text-center underline btn btn-outline rounded-none text-3xl'>
            New Group!
          </h2>
          <div className='card-body items-center text-center glass'>
            <div className='btn btn-disabled text-white rounded-md w-full h-auto text-xl'>
              This is the group description!
            </div>
            <div className='card-actions w-full'>
              <button className='btn btn-primary w-full text-lg'>
                View Group
              </button>
              <button className='btn btn-error w-full text-lg'>
                Leave Group
              </button>
            </div>
          </div>
        </div>
        <div className='card w-96 shadow-xl glass bg-base-100 transition-all duration-300'>
          <figure className='px-10 pt-10'>
            <label
              htmlFor='my-modal'
              className='grid flex-grow h-32 card glass rounded-md btn btn-circle'
            >
              <h1 className='text-7xl'>+</h1>
            </label>
          </figure>
          <div className='card-body items-center text-center w-full justify-between'>
            <form onSubmit={handleInitialSubmit}>
              <input
                required
                type='text'
                placeholder='Group Name'
                className='input input-bordered input-error w-full'
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength='10'
                minLength='3'
              />
              <input
                required
                type='text'
                placeholder='Group Description'
                className='input input-bordered input-error w-full'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength='75'
                minLength='7'
              />
            </form>
            <div className='card-actions w-full'>
              <label
                htmlFor='my-modal'
                className={
                  name.length < 3 && description.length < 3
                    ? 'invisible'
                    : 'visible btn btn-primary w-full text-lg modal-button'
                }
                type='submit'
              >
                Create Group
              </label>
            </div>
          </div>
        </div>
        <input type='checkbox' id='my-modal' className='modal-toggle' />
        <div className='modal glass'>
          <div className='modal-box glass'>
            <h3 className='font-bold text-lg'>
              Add group members! (comma-separated)
            </h3>
            <p className='py-4'>
              Make sure to add group members so they can join your group! You
              can use their displayNames to invite them (separated by commas)
            </p>

            <div className='alert alert-info rounded-md shadow-lg mb-5'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  className='stroke-current flex-shrink-0 w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                  ></path>
                </svg>
                <span className='text-lg'>
                  You can add up to 3 group members!
                </span>
              </div>
            </div>
            {description.length < 3 ? (
              <div className='alert alert-warning rounded-md shadow-lg mb-5'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='stroke-current flex-shrink-0 h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                  <span className='text-lg'>
                    Group description isnt provided
                  </span>
                </div>
              </div>
            ) : null}
            {name.length < 3 ? (
              <div className='alert alert-warning rounded-md shadow-lg mb-5'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='stroke-current flex-shrink-0 h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                    />
                  </svg>
                  <span className='text-lg'>Group name isnt provided</span>
                </div>
              </div>
            ) : null}
            <div className='card-actions w-full'>
              <input
                type='text'
                placeholder='someone@gmail.com,hi@gmail.com,hello@gmail.com'
                className='input input-bordered input-success w-full'
                value={ids}
                onChange={(e) =>
                  ids.length <= 3 ? setIds(e.target.value.split(',')) : null
                }
              />
            </div>

            <div className='flex flex-row gap-3 mt-5 p-5 pl-0'>
              {ids.length > 1
                ? ids
                    .map((id, i) => (
                      <button
                        className='badge rounded-md badge-lg text-lg'
                        key={i}
                      >
                        {id}
                      </button>
                    ))
                    .slice(0, 3)
                : null}
            </div>

            <div
              className={
                ids.length === 0 ? 'invisible' : 'visible modal-action'
              }
            >
              <label htmlFor='my-modal' className='btn btn-success w-full'>
                Invite!
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useAuth } from '../../lib/useAuth';
import QRCode from 'react-qr-code';

export default function Page() {
  let { pending, isSignedIn, user, auth, profData, resData } = useAuth();
  if (pending) {
    return (
      <div className='grid h-auto card glass rounded-md place-items-center text-3xl'>
        <div className='btn'>Loading...</div>
      </div>
    );
  }
  return (
    <>
      <div className='card bg-base-100 shadow-xl'>
        <figure>
          <div className='grid flex-grow h-32 card glass rounded-none place-items-center'></div>
        </figure>
        <div className='divider p-5'>
          <figure className='mask mask-squircle w-96'>
            <img src={user.photoURL} alt={`${user.displayName}'s profile`} />
          </figure>
        </div>
        <div className='card-body'>
          <label
            htmlFor='my-modal'
            className='card-title text-3xl btn btn-ghost btn-outline text-white rounded-md'
          >
            <h2>{user.displayName}</h2>
          </label>
          <div className='grid flex-grow h-auto card bg-base-200 place-items-center rounded-md text-center p-5 text-lg'>
            <p>
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before final copy is available.
            </p>
          </div>
          <div className='grid flex-grow h-auto w-full card bg-base-200 place-items-center rounded-md'>
            <div className='overflow-x-auto w-full'>
              <table className='table w-full text-center text-lg'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>MATCHES</th>
                    <th>WINS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>1</th>
                    <td>WOW</td>
                    <td>RANDOM TEXT</td>
                    <td>Blue</td>
                  </tr>
                  <tr>
                    <th>2</th>
                    <td>JOHN DOE</td>
                    <td>MORE STUFF</td>
                    <td>Purple</td>
                  </tr>
                  <tr>
                    <th>3</th>
                    <td>MORE THINGS HERE</td>
                    <td>LMAO</td>
                    <td>Red</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='card-actions justify-end'>
            <div className='badge badge-outline'>TAG 1</div>
            <div className='badge badge-outline'>TAG 2</div>
          </div>
        </div>
      </div>
      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={`https://localhost:3000/profile/${user.uid}`}
            viewBox={`0 0 256 256`}
          />
          <div className='modal-action w-full'>
            <label htmlFor='my-modal' className='btn w-full'>
              Connect with vaishnav240204@gmail!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

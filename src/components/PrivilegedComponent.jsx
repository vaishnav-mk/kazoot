import { authentication } from '../config/firebase-config';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../lib/useAuth';

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(authentication, provider)
    .then((result) => {
      console.log({ result });
    })
    .catch((error) => {
      const errorCode = error.code;
    });
};

export default function PrivilegedComponent({ children }) {
  const { pending, isSignedIn, user, auth } = useAuth();
  if (!isSignedIn) {
    return (
      <>
        <div className='grid h-auto card glass rounded-md place-items-center text-3xl'>
          <div className='btn' onClick={signInWithGoogle}>
            Sign in with Google
          </div>
        </div>
      </>
    );
  } else {
    return <>{children}</>;
  }
}

import { useState, useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import fetcher from './fetcher';
import useSWR from 'swr';
export function useAuth() {
  let profData = useRef();
  const [authState, setAuthState] = useState({
    isSignedIn: false,
    pending: true,
    user: null,
  });

  useEffect(() => {
    const unregisterAuthObserver = getAuth().onAuthStateChanged((user) => {
      setAuthState({ user, pending: false, isSignedIn: user ? true : false });
      if (user) {
        fetch(`/api/user/${user.uid}`)
          .then((i) => i.json())
          .then((i) => (profData.current = i.user));
      }
    });
    return () => unregisterAuthObserver();
  }, []);
  return { getAuth, ...authState, profData: profData.current };
}

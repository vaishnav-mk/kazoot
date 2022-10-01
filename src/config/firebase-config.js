import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyDSGlTCz6AFsM8VYFMmZrg9HlFxnsGWYTQ',

  authDomain: 'kazoot-2e59d.firebaseapp.com',

  databaseURL: 'https://kazoot-2e59d-default-rtdb.firebaseio.com',

  projectId: 'kazoot-2e59d',

  storageBucket: 'kazoot-2e59d.appspot.com',

  messagingSenderId: '77422424544',

  appId: '1:77422424544:web:593758bee6d718b8cc7b85',

  measurementId: 'G-L7HCQYXCVP',
};
if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const app = getApp();
export const authentication = getAuth(app);

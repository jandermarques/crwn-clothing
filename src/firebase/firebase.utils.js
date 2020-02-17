import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyD7kLMIuotFU2ARQo-jbHy0zXv7pJCH_NU',
  authDomain: 'crwn-db-78d04.firebaseapp.com',
  databaseURL: 'https://crwn-db-78d04.firebaseio.com',
  projectId: 'crwn-db-78d04',
  storageBucket: 'crwn-db-78d04.appspot.com',
  messagingSenderId: '166759608110',
  appId: '1:166759608110:web:ce78a084924748ad6bd4bf'
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

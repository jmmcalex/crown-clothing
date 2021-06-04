import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDwlsnmd8uO-N-DMOkHlYdVxHJ2DkFQXWA",
  authDomain: "crwn-db-b652c.firebaseapp.com",
  projectId: "crwn-db-b652c",
  storageBucket: "crwn-db-b652c.appspot.com",
  messagingSenderId: "517148873682",
  appId: "1:517148873682:web:e0c7adb240c142875bee0b",
  measurementId: "G-QESP39EKM7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  // Get the reference to the user document, and the snapshot of the document itself.
  const userRef = firestore.doc(`/users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  // If no document for that user exists yet create one 
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(firebaseConfig);

// Auth is firebase's 'Auth service'
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
export const signOut = () => auth.signOut()

export default firebase;
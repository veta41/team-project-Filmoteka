import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child, onValue } from 'firebase/database';

import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

//

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
  apiKey: 'AIzaSyCjeEfSVnqA0nBYnu1Wz6r9TlDoOJzZTEk',
  authDomain: 'fs48-team-js.firebaseapp.com',
  databaseURL: 'https://fs48-team-js-default-rtdb.firebaseio.com',
  projectId: 'fs48-team-js',
  storageBucket: 'fs48-team-js.appspot.com',
  messagingSenderId: '749054562086',
  appId: '1:749054562086:web:8821117b629776cf373be7',
};

export function connectToBD() {
  const app = initializeApp(firebaseConfig);
  return getDatabase(app);
}

// create new user

export async function createNewUser(email, password) {
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;
      // ...
      return user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      // console.log(errorCode);
      // console.log(errorMessage);
      return errorCode;
    });
}

// auth
export async function logUser(email, password) {
  const auth = getAuth();
  return await signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // console.log(userCredential);
      // Signed in // 112233
      const user = userCredential.user;
      // console.log(' logUser  ', user);
      return user;
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode);
      // console.log(errorMessage);
      return errorCode;
    });
}

// current user
export async function getCurrentUser() {
  const auth = getAuth();
  const user = auth.currentUser;
  return user;
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // ...
  } else {
    // No user is signed in.
  }
}

//
//

export function watchUser() {
  const auth = getAuth();
  onAuthStateChanged(auth, user => {
    if (user) {
      // User is signed in, seeregister docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

// logout
export async function logOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log('Sign-out successful.');
    })
    .catch(error => {
      // An error happened.
    });
}

// CRUD

export async function createNote(user, watched, queue) {
  const database = getDatabase();
  await set(ref(database, 'galleries/' + user.uid), {
    userID: user.uid,
    email: user.email,
    timeStamp: Date.now(),
    created: Date(),
    watched,
    queue,
  });
}

// function readeNote()
export async function readNote(user) {
  const dbRef = ref(getDatabase());
  return await get(child(dbRef, `galleries/${user.uid}`))
    .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data);
        return data;
      } else {
        console.log('No data available');
      }
      return snapshot.val();
    })
    .catch(error => {
      console.error(error);
    });
}
//
//function updateNote() {}
//
//function deleteNote() {}
//
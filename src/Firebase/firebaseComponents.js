import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { app } from "./firebaseInit";

const db = getFirestore();
const colRef = collection(db, "Notes");
const colRefToUsers = collection(db, "Users");

export async function CheckUser(setSignInChecker) {
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, get the UUID
      setSignInChecker(true);
    } else {
      // User is signed out
      setSignInChecker(false);
    }
  });
}

export function checkUserStatus() {
  const auth = getAuth(app);
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in
        unsubscribe();
        resolve(true);
      } else {
        // User is signed out
        unsubscribe();
        resolve(false);
      }
    });
  });
}

function AddUserToUserDB(username, email, password) {
  const auth = getAuth();
  const user = auth.currentUser;
  const UUID = user.uid;

  addDoc(colRefToUsers, {
    uuid: UUID,
    username: username,
    email: email,
    password: password,
  });
}

export function SignInUser(email, password) {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(function (firebaseUser) {
        resolve(true);
      })
      .catch(function (error) {
        console.log(error);
        resolve(false);
      });
  });
}

export function CreateUser(username, email, password) {
  const auth = getAuth();

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(function (firebaseUser) {
        // console.log(firebaseUser)
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        AddUserToUserDB(username, email, password);
        resolve(true);
      })
      .catch(function (error) {
        console.log(error);
        resolve(false);
      });
  });
}

export async function GetUserDataFromDB() {
  const auth = getAuth(app);
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in
          resolve(user);
        } else {
          // User is signed out
          resolve(null);
        }
      },
      (error) => {
        console.log(error);
        reject(error);
      }
    );
  });
}

export function LogOutUser() {
  const auth = getAuth(app);

  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        resolve(true);
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out user:", error);
        resolve(false);
      });
  });
}

export function getUser() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, get the UUID
    } else {
      // User is signed out
    }
  });
}

export async function fetchData(setFetchData) {
  let temp = [];

  const auth = getAuth(app);
  const user = auth.currentUser;
  //   const UUID = user.uid;
  const q = await query(colRef, "Notes", orderBy("CreatedAt"));
  const data = await getDocs(q);
  const dataSnapShot = data.docs;

  for (var i in dataSnapShot) {
    const doc = dataSnapShot[i].data();
    // if (doc.UUID === UUID) {
    //   temp.unshift(doc);
    // }
  }

  setFetchData(temp);
}

export async function AddNoteToDB(Note) {
  const auth = getAuth();
  const user = auth.currentUser;
  const UUID = user.uid;

  const newDocRef = doc(colRef);
  await setDoc(newDocRef, {
    UUID: UUID,
    Title: Note.title,
    Description: Note.description,
    CreatedAt: serverTimestamp(),
  });

  const docRef = doc(db, "Notes", newDocRef.id);

  // await updateDoc(docRef, {
  //     Id: newDocRef.id
  // })
}

export async function UpdateNote(UpdateValues) {
  const docRef = doc(db, "Notes", UpdateValues.Id);

  await updateDoc(docRef, {
    Title: UpdateValues.Title,
    Description: UpdateValues.Description,
    CreatedAt: serverTimestamp(),
  });
}

export async function DeleteNote(Note) {
  const docRef = doc(db, "Notes", Note.Id);
  if (Note.Id !== undefined) {
    await deleteDoc(docRef);
  }
}

export default CreateUser;

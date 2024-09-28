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
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { app, auth } from "./firebaseInit";

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

export async function signInUser(email, password) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.error("Sign-in error:", error.message);
    return false;
  }
}

export async function signUpUser(username, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    await setDoc(doc(colRefToUsers, user.uid), {
      uid: user.uid,
      username: username,
      email: email,
      noteBooks: ["Default"],
    });

    return true;
  } catch (error) {
    console.error("Error signing up user:", error);
    return false;
  }
}

// NoteBook Functions
export async function getUserNoteBooks(setNoteBooks) {
  // const auth = getAuth();
  const user = auth.currentUser;
  const docRef = doc(db, "Users", user.uid);
  console.log(user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const fetchedNoteBooks = docSnap.data().noteBooks;

    // Transform fetched data to match the expected structure
    const formattedNoteBooks = fetchedNoteBooks.map((name) => ({
      name,
      isEditing: false, // Initialize as not editing
    }));

    setNoteBooks(formattedNoteBooks);
  } else {
    console.log("No such document!");
  }
}

export async function addNoteBook(notebookName) {
  const user = auth.currentUser;

  if (!user) return; // Check if user is logged in

  const docRef = doc(db, "Users", user.uid);

  await updateDoc(docRef, {
    noteBooks: arrayUnion(notebookName), // Add the new notebook name
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

export async function LogOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out user:", error);
  }
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

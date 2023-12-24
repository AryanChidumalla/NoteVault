import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, getDoc, setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCWLRcpmps3Acn0y5JiZDvycJN_ci8JVIo",
    authDomain: "signin-page-4d4e7.firebaseapp.com",
    projectId: "signin-page-4d4e7",
    storageBucket: "signin-page-4d4e7.appspot.com",
    messagingSenderId: "773647102240",
    appId: "1:773647102240:web:cdd3a6b3aa988329dfa745"
};

initializeApp(firebaseConfig)

const db = getFirestore()
const colRef = collection(db, 'Notes')
const colRefToUsers = collection(db, 'Users')

export function CheckUser(setSignInChecker) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, get the UUID
        setSignInChecker(true)
    } else {
        // User is signed out
        setSignInChecker(false)
    }
    });
}

function AddUserToUserDB(username, email, password) {
    const auth = getAuth();
    const user = auth.currentUser;
    const UUID = user.uid

    addDoc(colRefToUsers, {
        uuid: UUID,
        username: username,
        email: email,
        password: password
    })
}

function CreateUser(username, email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // The new user is now signed in
        const user = userCredential.user;
        AddUserToUserDB(username, email, password)
        })
        .catch((error) => {
        // Handle the error
        console.error("Error creating user:", error);
        });
}

export const GetUserDataFromDB = async () => {
    let temp

    const auth = getAuth()
    const user = auth.currentUser
    const UUID = user.uid

    const querySnapshot = await getDocs(colRefToUsers)
    const docSnapshots = querySnapshot.docs;
    for (var i in docSnapshots) {
        const doc = docSnapshots[i].data();
        if (doc.uuid === UUID) {
            temp = doc
        }
    }

    return temp
}

export function SignInUser(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // You can get the user's information like this
            const uid = user.uid;
            return true
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return false
        });
}

export function LogOutUser() {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
        // Sign-out successful.
        console.log("User signed out");
        })
        .catch((error) => {
        // An error happened.
        console.error("Error signing out user:", error);
        }); 
}

export function getUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, get the UUID
        const uid = user.uid;
        console.log("User UUID:", uid);
      } else {
        // User is signed out
      }
    });
}

export async function AddNoteToDB(Note) {
    const auth = getAuth();
    const user = auth.currentUser;
    const UUID = user.uid

    // let DateVal = new Date().toLocaleDateString()

    let dd = new Date().getDate()
    if (dd < 10) dd = '0' + dd

    let mm = new Date().getMonth()+1
    if (mm < 10) mm = '0' + mm

    let yyyy = new Date().getFullYear()

    let time = new Date().toLocaleTimeString()
    let timeSubArray = time.split(' ')
    let timeSubSubArray = timeSubArray[0].split(':')

    if (timeSubSubArray[0] === '12') {
        timeSubSubArray[0] = '0'
        timeSubArray[0] = timeSubSubArray.join(':')
        time = timeSubArray.join(' ')
    }

    const newDocRef = doc(colRef)
    await setDoc(newDocRef, {
        UUID: UUID,
        Title: Note.title,
        Description: Note.description,
        Date: `${dd}/${mm}/${yyyy}`,
        Time: time
    })

    const docRef = doc(db, 'Notes', newDocRef.id)

    await updateDoc(docRef, {
        Id: newDocRef.id
    })

    // addDoc(colRef, {
    //     Id: docRef.id,
    //     UUID: UUID,
    //     Title: Note.title,
    //     Description: Note.description,
    //     Date: `${dd}/${mm}/${yyyy}`,
    //     Time: new Date().toLocaleTimeString()
    // })
}

export async function fetchData(setFetchData) {
    let temp = new Array()

    const auth = getAuth()
    const user = auth.currentUser
    const UUID = user.uid

    const querySnapshot = await getDocs(colRef, 'Notes')
    const docSnapshots = querySnapshot.docs;
    for (var i in docSnapshots) {
        const doc = docSnapshots[i].data();
        if (doc.UUID === UUID) {
            temp.push(doc)
        }
    }

    setFetchData(temp)
}

export async function UpdateNote(UpdateValues) {
    const docRef = doc(db, 'Notes', UpdateValues.Id)

    let dd = new Date().getDate()
    if (dd < 10) dd = '0' + dd

    let mm = new Date().getMonth()+1
    if (mm < 10) mm = '0' + mm

    let yyyy = new Date().getFullYear()

    let time = new Date().toLocaleTimeString()
    let timeSubArray = time.split(' ')
    let timeSubSubArray = timeSubArray[0].split(':')

    if (timeSubSubArray[0] === '12') {
        timeSubSubArray[0] = '0'
        timeSubArray[0] = timeSubSubArray.join(':')
        time = timeSubArray.join(' ')
    }

    await updateDoc(docRef, {
        Title: UpdateValues.Title,
        Description: UpdateValues.Description,
        Date: `${dd}/${mm}/${yyyy}`,
        Time: time
    })
}

export async function DeleteNote(Note) {
    const docRef = doc(db, 'Notes', Note.Id)
    await deleteDoc(docRef)
}

export default CreateUser
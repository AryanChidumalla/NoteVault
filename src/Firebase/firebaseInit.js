import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCWLRcpmps3Acn0y5JiZDvycJN_ci8JVIo",
    authDomain: "signin-page-4d4e7.firebaseapp.com",
    projectId: "signin-page-4d4e7",
    storageBucket: "signin-page-4d4e7.appspot.com",
    messagingSenderId: "773647102240",
    appId: "1:773647102240:web:cdd3a6b3aa988329dfa745"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
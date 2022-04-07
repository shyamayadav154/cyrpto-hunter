
import { initializeApp } from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: 'AIzaSyAjDgK0idL07dJNdlX3-85f1q1uG_jDXQ4',
  authDomain: 'crypto-hunt-f2ad8.firebaseapp.com',
  projectId: 'crypto-hunt-f2ad8',
  storageBucket: 'crypto-hunt-f2ad8.appspot.com',
  messagingSenderId: '5690563960',
  appId: '1:5690563960:web:6221f9fcadc31c84f4bc8d',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

 const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)

export {auth,db}






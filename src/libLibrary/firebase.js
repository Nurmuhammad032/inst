import Firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyBkA4Yxx8NHpw1V0GOAxbG7YIXXojAqvVo",
  authDomain: "insta-react12-bfd52.firebaseapp.com",
  databaseURL: "https://insta-react12-bfd52-default-rtdb.firebaseio.com",
  projectId: "insta-react12-bfd52",
  storageBucket: "insta-react12-bfd52.appspot.com",
  messagingSenderId: "343474713138",
  appId: "1:343474713138:web:986c36a4edbf15f86f422b",
  measurementId: "G-WH26R2KGD6"
}

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };

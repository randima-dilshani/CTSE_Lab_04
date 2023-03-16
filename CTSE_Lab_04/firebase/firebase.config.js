import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXYXiwdiqQIXWviXHMTw-K__gmNGyWV1M",
  authDomain: "ctse-lab-04-7501a.firebaseapp.com",
  projectId: "ctse-lab-04-7501a",
  storageBucket: "ctse-lab-04-7501a.appspot.com",
  messagingSenderId: "37153427044",
  appId: "1:37153427044:web:e644b2715c787b982ad971",
  measurementId: "G-5LV5W1T131"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export { firebase };

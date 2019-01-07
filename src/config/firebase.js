import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyBY568Ul48ERANmwXIR5ORhvOxrrTvaGm8",
  authDomain: "gp-test-30c82.firebaseapp.com",
  databaseURL: "https://gp-test-30c82.firebaseio.com",
  projectId: "gp-test-30c82",
  storageBucket: "gp-test-30c82.appspot.com",
  messagingSenderId: "561070693219"
};

firebase.initializeApp(config);

export const db = firebase.database();

//yarn add @react-native-firebase/app
import firebase from '@react-native-firebase/app';
//yarn add @react-native-firebase/auth
import '@react-native-firebase/auth';
//yarn add @react-native-firebase/database
import '@react-native-firebase/database';
//yarn add @react-native-firebase/firestore
import '@react-native-firebase/firestore';

// We will use the JS SDK with React Native

const firebaseConfig = {
  apiKey: 'AIzaSyD51AcMkz0CGXFLWAerbjMbWJ5_g7RBSHw',
  authDomain: 'info-6134-groupchat.firebaseapp.com',
  projectId: 'info-6134-groupchat',
  storageBucket: 'info-6134-groupchat.appspot.com',
  messagingSenderId: '627981801439',
  appId: '1:627981801439:web:121e68f0e3b75b292b966a',
};

var app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // if already initialized, use that one
}

const db = app.database();
const auth = firebase.auth();

export {db, auth};

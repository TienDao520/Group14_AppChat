import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
auth().useEmulator('http://10.0.2.2:9099');
if (__DEV__) {
  firestore().useEmulator('10.0.2.2', 8080);
}
const db = firestore();
export {auth, firestore, db};

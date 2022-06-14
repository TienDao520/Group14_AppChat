import firestore from '@react-native-firebase/firestore';
export const addDocument = (collection, data) => {
  const query = firestore().collection(collection);

  query.add({
    ...data,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
};

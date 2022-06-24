import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

const ProfileScreen = () => {
  const [profile, setProfile] = useState({});
  const [uid, setUid] = useState();

  useEffect(() => {
    const getUserUid = async () => {
      const uid = await AsyncStorage.getItem('userUid');
      uid && getUserInfo(uid);
      setUid(uid);
    };
    getUserUid();
  }, []);

  const getUserInfo = _uid => {
    firestore()
      .collection('Users')
      .doc(_uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          const userInfo = documentSnapshot.data();
          setProfile(userInfo);
        }
      });
  };

  const pickImageHandler = async () => {
    const userImg = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    });
    const base64Image = `data:image/png;base64,${userImg.assets[0].base64}`;
    setProfile({...profile, image: base64Image});
  };

  const handleUpdateData = (field, value) => {
    setProfile(state => ({
      ...state,
      [field]: value,
    }));
  };

  const saveProfile = () => {
    firestore()
      .collection('Users')
      .doc(uid)
      .update(profile)
      .then(() => {
        Alert.alert('Info', 'Update successfully!');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Pressable style={styles.imagePressable} onPress={pickImageHandler}>
          <Image style={styles.avatar} source={{uri: profile.image}} />
        </Pressable>
      </View>
      <View>
        <Text>User name</Text>
        <TextInput
          style={styles.input}
          value={profile.userName}
          onChangeText={handleUpdateData.bind(this, 'userName')}
        />
      </View>
      <View>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          onChangeText={handleUpdateData.bind(this, 'email')}
        />
      </View>
      <Button onPress={saveProfile} title="Save" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
  },
  avatar: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'grey',
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '10%',
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default ProfileScreen;

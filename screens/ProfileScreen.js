import React, {useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker';
import useAppContext from '../store/app-context';

const ProfileScreen = () => {
  const appCtx = useAppContext();
  const [profile, setProfile] = useState(appCtx.userInfo);

  const pickImageHandler = async () => {
    const userImg = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 200,
      maxWidth: 200,
    });
    if (!userImg.assets?.length) {
      return;
    }
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
      .doc(profile.uid)
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

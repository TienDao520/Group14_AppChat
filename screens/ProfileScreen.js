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
import {textStyle} from '../styles/textStyle';
const buttonColor = '#008000';

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
    console.log(field);
    console.log(value);
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
        <Text
          style={
            textStyle({
              textSize: appCtx.systemSetting.fontSize,
              textWeight: appCtx.systemSetting.fontWeight,
            }).textLabel
          }>
          User name
        </Text>
        <TextInput
          style={styles.input}
          value={profile.userName}
          onChangeText={handleUpdateData.bind(this, 'userName')}
        />
      </View>
      <View>
        <Text
          style={
            textStyle({
              textSize: appCtx.systemSetting.fontSize,
              textWeight: appCtx.systemSetting.fontWeight,
            }).textLabel
          }>
          Email
        </Text>
        <TextInput
          style={styles.input}
          value={profile.email}
          onChangeText={handleUpdateData.bind(this, 'email')}
        />
      </View>
      <Button onPress={saveProfile} title="Save" color={buttonColor} />
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

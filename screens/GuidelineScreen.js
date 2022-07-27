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
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import useAppContext from '../store/app-context';
import SelectDropdown from 'react-native-select-dropdown';
import {textStyle} from '../styles/textStyle';
const buttonColor = '#008000';

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontSize: 26}}>Main Login screen</Text>
          <Image
            source={require('../assets/images/Guideline_LoginScreen.png')}
            style={{width: 260, height: 260}}
          />
          <Text style={{fontSize: 26}}>Room screen features</Text>
          <Image
            source={require('../assets/images/Guideline_RoomScreen.png')}
            style={{width: 260, height: 360}}
          />
          <Text style={{fontSize: 26}}>Chat room features</Text>
          <Image
            source={require('../assets/images/Guideline_ChatScreen.png')}
            style={{width: 260, height: 310}}
          />
          <Text style={{fontSize: 26}}>Profile screen</Text>
          <Image
            source={require('../assets/images/Guideline_ProfileScreen.png')}
            style={{width: 260, height: 360}}
          />
          <Text style={{fontSize: 26}}>Setting screen</Text>

          <Image
            source={require('../assets/images/Guideline_SettingScreen.png')}
            style={{width: 260, height: 360}}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
  },
  images: {
    width: 260,
    height: 260,
  },
});

export default SettingScreen;

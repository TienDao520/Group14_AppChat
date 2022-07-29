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
import SelectDropdown from 'react-native-select-dropdown';
import {textStyle} from '../styles/textStyle';
const buttonColor = '#008000';

const SettingScreen = () => {
  const appCtx = useAppContext();
  const [profile, setProfile] = useState(appCtx.userInfo);
  const [setting, setSetting] = useState(appCtx.systemSetting);
  const fontWeightList = ['bold', 'normal'];

  const handleUpdateDataTextSize = (field, value) => {
    let parsedVal = Number.parseInt(value);
    if (Number.isNaN(parsedVal)) {
      parsedVal = 10;
    } else if (parsedVal > 30) {
      parsedVal = 30;
    } else if (parsedVal < 10) {
      parsedVal = 10;
    }

    appCtx.systemSetting = {...appCtx.systemSetting, [field]: parsedVal};

    setSetting(appCtx.systemSetting);
    console.log(setting);
    console.log(typeof value);
    console.log(appCtx.systemSetting);
    console.log(appCtx.systemSetting.fontSize);
  };

  const handleUpdateData = (field, value) => {
    appCtx.systemSetting = {...appCtx.systemSetting, [field]: value};

    setSetting(appCtx.systemSetting);
    // setSetting(state => ({
    //   ...state,
    //   [field]: value,
    // }));

    console.log(setting);
    console.log(typeof value);
    console.log(appCtx.systemSetting);
    console.log(appCtx.systemSetting.fontSize);
  };

  const saveSetting = () => {
    appCtx.systemSetting = setting;
    setSetting(appCtx.systemSetting);
    console.log(appCtx.systemSetting['fontSize']);
    console.log(appCtx.systemSetting);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={
            textStyle({
              textSize: appCtx.systemSetting.fontSize,
              textWeight: appCtx.systemSetting.fontWeight,
            }).textLabel
          }>
          Font Size
        </Text>
        <TextInput
          style={styles.input}
          value={setting.fontSize}
          keyboardType="numeric"
          placeholder="15"
          onChangeText={handleUpdateDataTextSize.bind(this, 'fontSize')}
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
          Font Type
        </Text>
        <View style={styles.dropdownView}>
          <SelectDropdown
            data={fontWeightList}
            onSelect={(selectedItem, index) => {
              handleUpdateData('fontWeight', selectedItem);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            defaultButtonText={'normal'}
          />
        </View>
      </View>
      <Button onPress={saveSetting} title="Save" color={buttonColor} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    padding: 10,
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdownView: {
    marginVertical: 12,
  },
});

export default SettingScreen;

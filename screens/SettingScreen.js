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

const SettingScreen = () => {
  const appCtx = useAppContext();
  const [profile, setProfile] = useState(appCtx.userInfo);
  const [setting, setSetting] = useState(appCtx.systemSetting);
  const fontWeightList = ['bold', 'normal'];

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
    // setSetting(state => ({
    //   ...state,
    //   [field]: value,
    // }));

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
    // firestore()
    //   .collection('Users')
    //   .doc(profile.uid)
    //   .update(profile)
    //   .then(() => {
    //     Alert.alert('Info', 'Update successfully!');
    //   });
    appCtx.systemSetting = setting;
    setSetting(appCtx.systemSetting);
    console.log(appCtx.systemSetting['fontSize']);
    console.log(appCtx.systemSetting);
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
          Font Size
        </Text>
        <TextInput
          style={styles.input}
          value={setting.fontSize}
          keyboardType="numeric"
          onChangeText={handleUpdateDataTextSize.bind(this, 'fontSize')}
        />
      </View>
      <View>
        <Text
          style={
            textStyle({textSize: appCtx.systemSetting.fontSize}).textLabel
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
      <Button onPress={saveSetting} title="Save" />
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
  dropdown1BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    // borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdownView: {
    marginVertical: 12,
  },
});
// const textStyle = props =>
//   StyleSheet.create({
//     textLabel: {
//       // fontSize: props.big ? 25 : 15,
//       fontSize: parseInt(props.size),
//     },
//   });
export default SettingScreen;

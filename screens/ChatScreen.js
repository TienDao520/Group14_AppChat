import React, {useLayoutEffect, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import useAppContext from '../store/app-context';
import UserField from '../components/UserField';
const ChatScreen = ({navigation}) => {
  const appCtx = useAppContext();
  const selectedRoom = appCtx.selectedRoom;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedRoom.title,
      headerRight: () => (
        <Pressable onPress={showModalHandler}>
          <Image
            style={styles.headerButton}
            source={require('../assets/addUser.png')}
          />
        </Pressable>
      ),
    });
  }, [navigation, selectedRoom]);

  const showModalHandler = () => {};
  return (
    <SafeAreaView>
      <UserField></UserField>
      <FlatList></FlatList>
      <View>
        <TextInput></TextInput>
        <Image></Image>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    width: 30,
    height: 30,
    marginEnd: 20,
    borderRadius: 50,
  },
});

export default ChatScreen;

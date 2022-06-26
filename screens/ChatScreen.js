import React, {useState, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  TextInput,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import useAppContext from '../store/app-context';
import AddUserModal from '../components/AddUserModal';
const ChatScreen = ({navigation}) => {
  const appCtx = useAppContext();
  const selectedRoom = appCtx.selectedRoom;
  const [isShowAddUserModal, setIsShowAddUserModal] = useState(false);

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

  const showModalHandler = () => {
    setIsShowAddUserModal(true);
  };

  const closeModalHandler = () => {
    setIsShowAddUserModal(false);
  };
  return (
    <SafeAreaView>
      <AddUserModal
        visible={isShowAddUserModal}
        closeModalHandler={closeModalHandler}
      />
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

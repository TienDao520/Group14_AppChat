import React, {useState, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import useAppContext from '../store/app-context';
import AddUserModal from '../components/AddUserModal';
import MessageInput from '../components/MessageInput';
import Card from '../components/Card';

const ChatScreen = ({navigation}) => {
  const appCtx = useAppContext();
  const selectedRoom = appCtx.selectedRoom;
  const [isShowAddUserModal, setIsShowAddUserModal] = useState(false);
  const [messages] = useState([]);

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
      <View style={styles.container}>
        <AddUserModal
          visible={isShowAddUserModal}
          closeModalHandler={closeModalHandler}
        />
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={value => (
            <View>
              <Card>
                <View style={styles.cardBody}></View>
              </Card>
            </View>
          )}
        />
        <MessageInput />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  headerButton: {
    width: 30,
    height: 30,
    marginEnd: 20,
    borderRadius: 50,
  },
});

export default ChatScreen;

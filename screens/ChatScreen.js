import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import useAppContext from '../store/app-context';
import AddUserModal from '../components/AddUserModal';
import MessageInput from '../components/MessageInput';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import Card from '../components/Card';

const ChatScreen = ({navigation}) => {
  const {selectedRoom} = useAppContext();
  const roomId = selectedRoom.id;
  const [isShowAddUserModal, setIsShowAddUserModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (!roomId || !isFocused) {
      return;
    }
    const subscriber = firestore()
      .collection('Messages')
      .where('roomId', '==', roomId)
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot?.forEach(documentSnapshot => {
          const message = documentSnapshot.data();
          data.push({
            id: documentSnapshot.id,
            ...message,
          });
        });
        data.sort((a, b) => a.createdDate - b.createdDate);
        setMessages(data);
      });
    return () => subscriber();
  }, [roomId, isFocused]);

  const showModalHandler = () => {
    setIsShowAddUserModal(true);
  };

  const closeModalHandler = () => {
    setIsShowAddUserModal(false);
  };

  const convertTimeToDate = timeString => {
    const date = new Date(+timeString).toDateString();
    return date;
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
              <Card style={styles.card}>
                <View style={styles.cardBody}>
                  <Image
                    style={styles.avatar}
                    source={{uri: value.item.image}}
                  />
                  <View>
                    <View style={styles.userInfo}>
                      <Text>{value.item.userName}</Text>
                      <Text>{convertTimeToDate(value.item.createdDate)}</Text>
                    </View>
                    <Text>{value.item.message}</Text>
                  </View>
                </View>
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
  cardBody: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    width: '70%',
    justifyContent: 'flex-end',
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 25,
    margin: 5,
  },
  userInfo: {
    flexDirection: 'row',
  },
  headerButton: {
    width: 30,
    height: 30,
    marginEnd: 20,
    borderRadius: 50,
  },
});

export default ChatScreen;

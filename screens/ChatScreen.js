import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import useAppContext from '../store/app-context';
import AddUserModal from '../components/AddUserModal';
import ShareMessageModal from '../components/ShareMessageModal';
import MessageInput from '../components/MessageInput';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import Card from '../components/Card';

const ChatScreen = ({navigation}) => {
  const {selectedRoom, userInfo} = useAppContext();
  const roomId = selectedRoom.id;
  const [isShowAddUserModal, setIsShowAddUserModal] = useState(false);
  const [isShowShareMessageModal, setIsShowShareMessageModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [sharedMessage, setShareMessage] = useState();
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

  const showShareMessageModalHandler = message => {
    setShareMessage(message);
    setIsShowShareMessageModal(true);
  };

  const closeModalHandler = () => {
    setIsShowAddUserModal(false);
    setIsShowShareMessageModal(false);
  };

  const convertTimeToDate = timeString => {
    const date = new Date(+timeString).toDateString();
    return date;
  };

  const deleteMessage = messageId => {
    firestore()
      .collection('Messages')
      .doc(messageId)
      .delete()
      .then(() => {
        Alert.alert('Info', 'Message deleted successfully!');
      });
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <AddUserModal
          visible={isShowAddUserModal}
          closeModalHandler={closeModalHandler}
        />
        <ShareMessageModal
          visible={isShowShareMessageModal}
          closeModalHandler={closeModalHandler}
          sharedMessage={sharedMessage}
        />
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={value => (
            <View
              style={[
                styles.listContent,
                userInfo.uid === value.item.uid &&
                  styles.flexDirectionRowReverse,
              ]}>
              <Card style={styles.card}>
                <View style={styles.cardBody}>
                  <View style={styles.messageContainer}>
                    <Image
                      style={styles.avatar}
                      source={{uri: value.item.image}}
                    />
                    <View style={styles.messageContent}>
                      <View style={styles.userInfo}>
                        <Text>{value.item.userName}</Text>
                        <Text>{convertTimeToDate(value.item.createdDate)}</Text>
                      </View>
                      <Text>{value.item.message}</Text>
                    </View>
                  </View>
                  <Pressable
                    style={styles.deleteButton}
                    onPress={deleteMessage.bind(this, value.item.id)}>
                    <Text>X</Text>
                  </Pressable>
                </View>
              </Card>
              <Pressable
                style={styles.shareButtonContainer}
                onPress={showShareMessageModalHandler.bind(
                  this,
                  value.item.message,
                )}>
                <Image
                  style={styles.shareIcon}
                  source={require('../assets/share-icon.png')}
                />
              </Pressable>
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
    justifyContent: 'space-between',
  },
  listContent: {
    flexDirection: 'row',
  },
  messageContainer: {
    flexDirection: 'row',
    flex: 1,
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
  deleteButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingTop: 2,
  },
  flexDirectionRowReverse: {
    flexDirection: 'row-reverse',
  },
  shareIcon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    opacity: 0.3,
  },
  shareButtonContainer: {
    justifyContent: 'center',
  },
  messageContent: {
    width: '90%',
  },
});

export default ChatScreen;

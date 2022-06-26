import React, {useState} from 'react';
import {View, TextInput, Image, StyleSheet, Pressable} from 'react-native';
import useAppContext from '../store/app-context';
import firestore from '@react-native-firebase/firestore';

const MessageInput = () => {
  const appCtx = useAppContext();
  const room = appCtx.selectedRoom;
  const user = appCtx.userInfo;
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (!message) {
      return;
    }
    const newMessage = {
      ...user,
      message,
    };
    firestore()
      .collection('Rooms')
      .doc(room.id)
      .update({
        messages: firestore.FieldValue.arrayUnion(newMessage),
      })
      .then(() => {
        setMessage('');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={message}
        onChangeText={text => setMessage(text)}
        style={styles.input}
      />
      <Pressable onPress={sendMessage}>
        <Image
          style={styles.sendButton}
          source={require('../assets/send.webp')}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
  },
  input: {
    flex: 1,
  },
  sendButton: {
    height: 50,
    width: 50,
    marginLeft: 10,
    borderRadius: 30,
  },
});

export default MessageInput;

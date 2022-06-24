import React, {useState} from 'react';
import {
  View,
  Alert,
  Text,
  TextInput,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddRoomModal = props => {
  const [room, setRoom] = useState({title: '', description: ''});

  const createNewRoom = () => {
    if (!room.title || !room.description) {
      Alert.alert('Warning!', 'Please input all fields!');
      return;
    }
    firestore()
      .collection('Rooms')
      .add({
        ...room,
        createdDate: new Date.now(),
      })
      .then(() => {
        Alert.alert('Info', 'Room created successfully!');
        props.closeModalHandler();
      });
  };

  const handleUpdateData = (field, value) => {
    setRoom(state => ({
      ...state,
      [field]: value,
    }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>Create room!</Text>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.modalText}>Title</Text>
            <TextInput
              style={styles.input}
              value={room.title}
              onChangeText={handleUpdateData.bind(this, 'title')}
            />
            <Text style={styles.modalText}>Description</Text>
            <TextInput
              style={styles.input}
              value={room.description}
              onChangeText={handleUpdateData.bind(this, 'description')}
            />
          </View>

          <View style={styles.footer}>
            <Pressable style={styles.button} onPress={props.closeModalHandler}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCreate]}
              onPress={createNewRoom}>
              <Text style={styles.textStyle}>Create</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalHeader: {
    marginTop: -20,
    marginBottom: 20,
    alignItems: 'flex-start',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 5,
    borderWidth: 1,
    padding: 5,
  },
  modalBody: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginLeft: 20,
    marginBottom: -20,
  },
  buttonCreate: {
    backgroundColor: 'green',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 20,
  },
});

export default AddRoomModal;

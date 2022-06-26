import React, {useRef} from 'react';
import {View, Alert, Text, Modal, StyleSheet, Pressable} from 'react-native';
import UserField from '../components/UserField';
import useAppContext from '../store/app-context';
import firestore from '@react-native-firebase/firestore';

const AddRoomModal = props => {
  const usersFieldRef = useRef();
  const selectedRoom = useAppContext().selectedRoom;

  const addUsersToRoom = () => {
    const selectedUserNames = usersFieldRef.current.getSelectedItems().result;
    if (!selectedUserNames.length) {
      return;
    }
    const selectedUsers =
      usersFieldRef.current.getSelectedItems().entities.item;
    const selectedUserUids = [];
    for (const key in selectedUsers) {
      const uid = selectedUsers[key].uid;
      if (!selectedRoom?.members.includes(uid)) {
        selectedUserUids.push(uid);
      }
    }
    selectedRoom.members = [...selectedRoom.members, ...selectedUserUids];
    updateRoomMembers();
  };

  const updateRoomMembers = () => {
    firestore()
      .collection('Rooms')
      .doc(selectedRoom.id)
      .update({
        members: selectedRoom.members,
      })
      .then(() => {
        Alert.alert('Info', 'Users added successfully!');
      });
    props.closeModalHandler();
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
            <Text style={styles.title}>Add Users!</Text>
          </View>
          <View style={styles.modalBody}>
            <UserField ref={usersFieldRef} />
          </View>

          <View style={styles.footer}>
            <Pressable style={styles.button} onPress={props.closeModalHandler}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCreate]}
              onPress={addUsersToRoom}>
              <Text style={styles.textStyle}>Add</Text>
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
    width: 80,
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

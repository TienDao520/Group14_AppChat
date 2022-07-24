import React, {useRef} from 'react';
import {View, Alert, Text, Modal, StyleSheet, Pressable} from 'react-native';
import {Chip, Selectize} from 'react-native-material-selectize';
import useAppContext from '../store/app-context';
import firestore from '@react-native-firebase/firestore';

const ShareMessageModal = props => {
  const selectRoomsRef = useRef();
  const appCtx = useAppContext();
  const message = props.sharedMessage;
  const user = appCtx.userInfo;
  const selectedRoom = appCtx.selectedRoom;
  const rooms = appCtx.roomList.filter(room => room.id !== selectedRoom.id);

  const addMessageToRooms = () => {
    const selectedRoomTitles = selectRoomsRef.current.getSelectedItems().result;
    if (!selectedRoomTitles.length) {
      return;
    }
    const selectedRooms =
      selectRoomsRef.current.getSelectedItems().entities.item;
    const selectedRoomIds = [];
    for (const key in selectedRooms) {
      const id = selectedRooms[key].id;
      selectedRoomIds.push(id);
    }
    shareMessages(selectedRoomIds);
  };

  const shareMessages = roomIds => {
    if (!message || !roomIds.length) {
      return;
    }
    const batch = firestore().batch();
    roomIds.forEach(id => {
      const newMessage = {
        ...user,
        roomId: id,
        message,
        createdDate: new Date().getTime(),
      };
      const docRef = firestore().collection('Messages').doc();
      batch.set(docRef, newMessage);
    });
    batch.commit().then(() => {
      Alert.alert('Info', 'Message shared successfully!');
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
            <Text style={styles.title}>Select Rooms!</Text>
          </View>
          <View style={styles.modalBody}>
            <Selectize
              ref={selectRoomsRef}
              chipStyle={styles.chip}
              chipIconStyle={styles.chipIcon}
              itemId="title"
              items={rooms}
              selectedItems={[]}
              listStyle={styles.list}
              tintColor="#028fb0"
              textInputProps={{
                placeholder: 'Insert one or more rooms',
              }}
              renderRow={(id, onPress, room) => (
                <Pressable key={id} onPress={onPress} style={styles.listRow}>
                  <Text>{room.title}</Text>
                </Pressable>
              )}
              renderChip={(id, onClose, item, style, iconStyle) => (
                <Chip
                  key={id}
                  iconStyle={iconStyle}
                  onClose={onClose}
                  text={id}
                  style={style}
                />
              )}
            />
          </View>

          <View style={styles.footer}>
            <Pressable style={styles.button} onPress={props.closeModalHandler}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonCreate]}
              onPress={addMessageToRooms}>
              <Text style={styles.textStyle}>Send</Text>
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
  listRow: {
    padding: 10,
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

export default ShareMessageModal;

import React, {useState, useEffect, useLayoutEffect, useMemo} from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';
import AddRoomModal from '../components/AddRoomModal';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

const RoomScreen = props => {
  const {navigation} = props;
  const [isShowCreateRoomModal, setIsShowCreateRoomModal] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [uid, setUid] = useState();

  useMemo(async () => {
    const _uid = await AsyncStorage.getItem('userUid');
    setUid(_uid);
  }, []);

  useEffect(() => {
    if (!uid) {
      return;
    }
    const subscriber = firestore()
      .collection('Rooms')
      // .where('members', 'array-contains', uid)
      .orderBy('createdDate', 'desc')
      .onSnapshot(querySnapshot => {
        const data = [];
        querySnapshot?.forEach(documentSnapshot => {
          const room = documentSnapshot.data();
          data.push({
            id: documentSnapshot.id,
            title: room.title,
            description: room.description,
          });
        });
        setRooms(data);
      });
    return () => subscriber();
  }, [uid]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={showModalHandler}>
          <Image
            style={styles.headerButton}
            source={require('../assets/Plus.png')}
          />
        </Pressable>
      ),
    });
  }, [navigation]);

  const closeModalHandler = () => {
    setIsShowCreateRoomModal(false);
  };

  const showModalHandler = () => {
    setIsShowCreateRoomModal(true);
  };

  const deleteRoom = room => {
    firestore()
      .collection('Rooms')
      .doc(room.id)
      .delete()
      .then(() => {
        Alert.alert('Info', 'Room deleted successfully!');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddRoomModal
        uid={uid}
        visible={isShowCreateRoomModal}
        closeModalHandler={closeModalHandler}
      />
      <View>
        <FlatList
          data={rooms}
          keyExtractor={item => item.id}
          renderItem={value => (
            <View>
              <Pressable>
                <Card>
                  <View style={styles.cardBody}>
                    <View style={styles.roomItem}>
                      <Text style={styles.title}>{value.item.title}</Text>
                      <Text ellipsizeMode="tail" numberOfLines={2}>
                        {value.item.description}
                      </Text>
                    </View>
                    <View>
                      <Pressable onPress={deleteRoom.bind(this, value.item)}>
                        <Image
                          style={styles.headerButton}
                          source={require('../assets/delete.png')}
                        />
                      </Pressable>
                    </View>
                  </View>
                </Card>
              </Pressable>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    position: 'relative',
  },
  headerButton: {
    width: 30,
    height: 30,
    marginEnd: 20,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  roomItem: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    overflow: 'hidden',
  },
});
export default RoomScreen;

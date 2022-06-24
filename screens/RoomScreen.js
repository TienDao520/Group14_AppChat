import React, {useState, useEffect, useLayoutEffect, useMemo} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native';
import AddRoomModal from '../components/AddRoomModal';
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
    
  }, [uid]);

  const getRooms = uid => {};

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

  return (
    <SafeAreaView style={styles.container}>
      <AddRoomModal
        visible={isShowCreateRoomModal}
        closeModalHandler={closeModalHandler}
      />
      <View>
        <FlatList
          data={rooms}
          renderItem={value => (
            <View>
              <Pressable>
                <View>
                  <Text>{value.item.title}</Text>
                  <Text>{value.item.description}</Text>
                </View>
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
});
export default RoomScreen;

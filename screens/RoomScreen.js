import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {auth} from '../firebase/config';
import useFirestore from '../hooks/useFirestore';

const RoomScreen = props => {
  const [userName, setUserName] = useState(
    props.route.params.noteFromLogin.displayName,
  );
  // console.log(
  //   'props.route.params.noteFromLogin.uid',
  //   props.route.params.noteFromLogin.uid,
  // );

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: props.route.params.noteFromLogin.uid,
    };
  }, [props.route.params.noteFromLogin.uid]);

  const rooms = useFirestore('rooms', roomsCondition);
  console.log('rooms', rooms);

  const renderItem = ({item}) => (
    <TouchableOpacity>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>{userName}</Text>
      </View>

      <FlatList
        data={rooms}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
});
export default RoomScreen;

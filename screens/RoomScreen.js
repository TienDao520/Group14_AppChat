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
} from 'react-native';

const RoomScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Room List</Text>
    </View>
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

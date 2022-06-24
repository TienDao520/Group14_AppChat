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
// import {auth} from '../FirebaseConfig';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = props => {
  const {navigation} = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const registerWithFirebase = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter an valid email address.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters.');
      return;
    }

    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        Alert.alert('user registered!');
        setEmail('');
        setPassword('');
        createProfile(user.uid);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        setIsLoading(false);
        if (errorCode === 'auth/weak-password') {
          Alert.alert('The password is too weak.');
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  const createProfile = uid => {
    firestore()
      .collection('Users')
      .doc(uid)
      .set({
        email: email,
        userName: userName,
      })
      .then(async () => {
        await AsyncStorage.setItem('userUid', uid);
        navigation.navigate('RoomScreen');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imgContainer}>
          <Image
            style={styles.image}
            source={require('../assets/chatImage.png')}
          />
        </View>
        <View style={styles.criteriaContainer}>
          <View>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={value => setEmail(value)}
            />
          </View>
          <View>
            <Text>User name</Text>
            <TextInput
              style={styles.input}
              value={userName}
              onChangeText={value => setUserName(value)}
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={value => setPassword(value)}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Sign Up"
              disabled={isLoading || (!email && !password)}
              onPress={registerWithFirebase}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
  criteriaContainer: {
    padding: 12,
  },
  input: {
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  button: {
    marginVertical: 5,
  },
});

export default SignUpScreen;

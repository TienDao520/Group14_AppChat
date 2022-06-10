import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
// import {auth} from '../FirebaseConfig';
import auth from '@react-native-firebase/auth';
//yarn add @react-native-async-storage/async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

import {signInWithCredential} from 'firebase/auth';

//Google signin
//yarn add @react-native-google-signin/google-signin
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const SignInScreen = props => {
  const {navigation} = props;
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //Google configuration
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'], // [Android] what API you want to access on behalf of the user, default is email and profile
    webClientId: '627981801439-flq6koc4vq1tfnbf3fvofefc8e27sn88', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    iosClientId: '627981801439-qu1jor59pg0ks78j3gp105077l0dile6', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
  });

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      console.log(user);
      if (user != null) {
        console.log('The return user information: ', user);
        //ToDo: navigate to room page
      }
    });
    async function fetchToken() {
      const token = await AsyncStorage.getItem('token');
      if (token != '') {
        //ToDo: navigate to room page
      }
    }
    fetchToken();
  }, []);

  const setToken = firebaseUser => {
    firebaseUser.user
      .getIdToken()
      .then(async token => {
        await AsyncStorage.setItem('token', token);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loginWithFirebase = () => {
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(function (_firebaseUser) {
        setToken(_firebaseUser);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        setIsLoading(false);
        if (errorCode === 'auth/wrong-password') {
          Alert.alert('Wrong password.');
        } else {
          Alert.alert(errorMessage);
        }
      });
  };

  const loginWithFacebook = async () => {
    // try {
    //   await Facebook.initializeAsync({
    //     appId: '586041359429016',
    //   });
    //   const {type, token, expirationDate, permissions, declinedPermissions} =
    //     await Facebook.logInWithReadPermissionsAsync({
    //       permissions: ['public_profile'],
    //     });
    //   if (type === 'success') {
    //     // // Get the user's name using Facebook's Graph API
    //     // const response = await fetch(
    //     //   `https://graph.facebook.com/me?access_token=${token}`
    //     // );
    //     // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    //     // Build Firebase credential with the Facebook access token.
    //     const credential = firebase.auth.FacebookAuthProvider.credential(token);
    //     // Sign in with credential from the Facebook user.
    //     signInWithCredential(auth, credential).catch(error => {
    //       // Handle Errors here.
    //       console.log(error);
    //     });
    //   } else {
    //     // type === 'cancel'
    //   }
    // } catch ({message}) {
    //   alert(`Facebook Login Error: ${message}`);
    // }
  };

  const loginWithGoogle = async () => {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log(userInfo);
    //   // this.setState({ userInfo });
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //   } else {
    //     // some other error happened
    //   }
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      console.log('idToken', idToken);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth()
        .signInWithCredential(googleCredential)
        .catch(error => {
          console.log('Something went wrong with sign up: ', error);
        });
    } catch (error) {
      console.log({error});
    }
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
              title="Sign In"
              disabled={isLoading || (!email && !password)}
              onPress={loginWithFirebase}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Sign In With Google"
              disabled={isLoading}
              onPress={() =>
                loginWithGoogle().then(() =>
                  console.log('Signed in with Google!'),
                )
              }
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Sign In With Facebook"
              disabled={isLoading}
              onPress={loginWithFacebook}
            />
          </View>
          <View style={styles.button}>
            <Button title="Sign Up" />
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

export default SignInScreen;

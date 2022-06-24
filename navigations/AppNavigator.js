import React from 'react';
import {View, Text, Platform, StyleSheet, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import RoomScreen from '../screens/RoomScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const {navigation} = props;
  const logout = async () => {
    await AsyncStorage.removeItem('userUid');
    auth()
      .signOut()
      .then(() => {
        Alert('User signed out!');
      });
    navigation.navigate('SignInScreen');
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={logout} />
    </DrawerContentScrollView>
  );
};

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="SignInScreen"
        headerMode="screen"
        screenOptions={{
          headerTintColor: Platform.OS === 'android' ? 'white' : 'blue',
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? 'green' : '',
          },
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{
            headerTitle: () => (
              <View style={styles.loginHeader}>
                <Text style={styles.headerTitle}>Group Chat</Text>
                <Text style={styles.headerTitle}>Group 14</Text>
              </View>
            ),
            title: 'Sign In',
            drawerItemStyle: {
              display: 'none',
            },
          }}
        />
        <Drawer.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerTitle: () => (
              <View style={styles.loginHeader}>
                <Text style={styles.headerTitle}>Group Chat</Text>
                <Text style={styles.headerTitle}>Group 14</Text>
              </View>
            ),
            title: 'Sign Up',
            drawerItemStyle: {
              display: 'none',
            },
          }}
        />

        <Drawer.Screen
          name="RoomScreen"
          component={RoomScreen}
          options={{
            headerTitle: () => (
              <View style={styles.loginHeader}>
                <Text style={styles.headerTitle}>Group Chat</Text>
                <Text style={styles.headerTitle}>Group 14</Text>
              </View>
            ),
            title: 'Room',
          }}
        />

        <Drawer.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            headerTitle: () => (
              <View style={styles.loginHeader}>
                <Text style={styles.headerTitle}>Group Chat</Text>
                <Text style={styles.headerTitle}>Group 14</Text>
              </View>
            ),
            title: 'Profile',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loginHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
  },
  headerContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
  },
});

export default AppNavigator;

import React from 'react';
import {View, Text, Platform, StyleSheet, Pressable, Alert} from 'react-native';
//yarn add @react-navigation/native
import {NavigationContainer} from '@react-navigation/native';
//yarn add @react-navigation/native-stack
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';
import RoomScreen from '../screens/RoomScreen';

const Stack = createNativeStackNavigator();

function AppNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        headerMode="screen"
        screenOptions={{
          headerTintColor: Platform.OS === 'android' ? 'white' : 'blue',
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? 'green' : '',
          },
        }}>
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{
            headerTitle: () => (
              <View style={styles.loginHeader}>
                <Text style={styles.headerTitle}>Group Chat</Text>
                <Text style={styles.headerTitle}>Group 14</Text>
              </View>
            ),
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerTitle: () => (
              <View style={styles.loginHeader}>
                <Text style={styles.headerTitle}>Group Chat</Text>
                <Text style={styles.headerTitle}>Group 14</Text>
              </View>
            ),
          }}
        />

      <Stack.Screen
          name="RoomScreen"
          component={RoomScreen}
          options={{
            headerTitle: () => (
              <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>Group Chat</Text>
                <Text style={styles.headerTitle}>Group 14</Text>
              </View>
            ),
          }}
        />
      </Stack.Navigator>
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

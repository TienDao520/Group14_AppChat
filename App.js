import 'react-native-gesture-handler';
import * as React from 'react';
import AppNavigator from './navigations/AppNavigator';
import {AppContextProvider} from './store/app-context';

export default function App() {
  return (
    <AppContextProvider>
      <AppNavigator />
    </AppContextProvider>
  );
}

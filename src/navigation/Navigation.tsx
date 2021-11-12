import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SplashScreen } from '../screens/SplashScreen';
import { MenuScreen } from '../screens/MenuScreen';
import CarritoScreen from '../screens/CarritoScreen';


export type RootStackParams = {
    SplashScreen: undefined;
    MenuScreen: undefined;
    CarritoScreen: undefined;
  }


  const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
            backgroundColor: 'white'
        }
      }}
    >
      <Stack.Screen name="SplashScreen" component={ SplashScreen } />
      <Stack.Screen name="MenuScreen" component={ MenuScreen } />
      <Stack.Screen name="CarritoScreen" component={ CarritoScreen } />
    </Stack.Navigator>
  );
}
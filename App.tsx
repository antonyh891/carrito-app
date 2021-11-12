import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './src/navigation/Navigation';
import { CarritoProvider } from './src/context/CarritoContext';

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
       
      </AppState>
    </NavigationContainer>
  )
}

const AppState = ({children}:any) => {
  return (
    <CarritoProvider>
      {children}
        
    </CarritoProvider>
  )
}

export default App;
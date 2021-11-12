import React, { useEffect } from 'react'
import { View, StatusBar, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

interface Props extends StackScreenProps<RootStackParams, 'SplashScreen'>{};

export const SplashScreen = ({ route, navigation }: Props) =>  {

    /* No logre que funcione de momento
    type navigationOptions = {
      header: null,
    }*/

    //const navigation = useNavigationigation<Props>();
    
    useEffect(() => {
 
          setTimeout(() => {
           
            navigation.navigate('MenuScreen')
          }, 2000)     
    })
  
      return (
        <View style={styles.image}>
          <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />
          <Animatable.Image
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{
              width: '70%',
              height: 250,
              padding: 10,
              resizeMode: 'contain'
            }}
            source={require('../images/foodMonks.png')}
          />
        </View>
      )
    }

export default SplashScreen

    const styles = StyleSheet.create({
      image: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
     }
    });

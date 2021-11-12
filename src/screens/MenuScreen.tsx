import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import {ActivityIndicator,StyleSheet, Text, View,ScrollView, Image, Dimensions,FlatList, TouchableOpacity} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useMenus } from '../hooks/useMenus';
import { Category, Food } from '../interfaces/MenusInterfaces';
import { RootStackParams } from "../navigation/Navigation";
import { Ionicons } from '@expo/vector-icons';
import { CarritoContext } from '../context/CarritoContext';

const { width: windowWidth } = Dimensions.get('window');
//interface Props extends StackScreenProps<RootStackParams, 'SplashScreen'>{};
type Props = StackNavigationProp<RootStackParams, 'SplashScreen'>

export const MenuScreen = () => {
    const [ selectCategoria, setSelectCategoria ] = useState(0);
    const { menusDisponibles,categorias, isLoading } = useMenus();
    const { top } = useSafeAreaInsets();
    const navigation = useNavigation<Props>()

    const context = useContext(CarritoContext)
   


    if ( isLoading ) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
                <ActivityIndicator color="red" size={ 100 } />
            </View>
        )
    }


    /// podria ir en un componente aparte (creo)
    const renderItem=(item:Category) =>{
        return(
          <TouchableOpacity style={[styles.divCategorie,{backgroundColor:item.color,
            marginHorizontal: 2,
            paddingBottom: 20}]}
          onPress={()=>setSelectCategoria(item.id)}>
            <Image
              style={{width:100,height:80}}
              resizeMode="contain"
              source={{uri : item.image}} />
            <Text style={{fontWeight:'bold',fontSize:22}}>{item.name}</Text>
          </TouchableOpacity>
        )
      }

      const renderItemMenu = (item:Food) => {
        let catg = selectCategoria
        if(catg==0||catg==item.categorie)
    {
        return (
          <TouchableOpacity style={styles.itemContainer} onPress={ () => navigation.navigate('CarritoScreen') }>
            <Image style={{ width: 100, height: 100, marginTop: 20, padding: 10, resizeMode: 'contain' }} source={{ uri: item.image }} />
            <View style={{ paddingLeft: 8, paddingRight: 8, height: 150 }}>
              <Text style={[styles.itemDescripcion, {
                fontWeight: 'bold'
              }]} > {item.name} </Text>
              <Text style={[styles.itemDescripcion, { fontSize: 15 }]}>{item.name}</Text>
              <Text style={[styles.itemDescripcion, { marginTop: 8, fontSize: 15, color:"green" }]}  >{'USD ' + item.price}</Text>
            

            <TouchableOpacity
            onPress={()=>context.agregarProducto(item)}
            style={{
              width:(windowWidth/2)-30,
              backgroundColor:"black",
              flexDirection:'row',
              alignItems:'center',
              justifyContent:"center",
              borderRadius:5,
              padding:4
            }}>
            <Text style={{fontSize:18, color:"white", fontWeight:"bold"}}>Agregar Pedido</Text>
            <View style={{width:10}} />
            <Ionicons name="ios-add-circle" size={30} color={"white"} />
          </TouchableOpacity>
          </View>
          </TouchableOpacity>
        )
    }  
    }








    return (
        
        <ScrollView>
        
        <View style={{ flex: 1,backgroundColor:"#f2f2f2", marginTop: top }}>
          <View style={{width: windowWidth, alignItems:'center'}} >
              <Image style={{height:100,width:350, flex:1 }}  source={require("../images/FoodMonks4.png")}  />
              <Swiper style={{height:windowWidth/2}} showsPagination={false} showsButtons={false} autoplay={true} autoplayTimeout={2}>
                {
                  categorias.map((itembann)=>{
                      const uri = itembann.image
                    return(
                      <Image style={styles.imageBanner} resizeMode="contain" source={{uri}}/>
                    )
                  })
                }
              </Swiper>
              <View style={{height:20}} />
          </View>

          <View style={{width:windowWidth, borderRadius:20, paddingVertical:20, backgroundColor:'white'}}>
            <Text style={styles.titleCatg}>Categorias {selectCategoria}</Text>
            <FlatList
              horizontal={true}
              data={categorias}
              renderItem={({ item }) => renderItem(item)}
              keyExtractor = { (item) => item.id.toString() }
            />
            <View style={{height:20}} />
          </View>
            
          <View style={styles.container}>
        
        <FlatList
         
          data={menusDisponibles}
          renderItem={({ item }: any) => renderItemMenu(item)}
          keyExtractor = { (item, index) =>index.toString() }
          numColumns={2}
          
        />
      
      </View>
        </View>
      </ScrollView>
        
    )
}

export default MenuScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      itemDescripcion: {
        textAlign: 'center',
        fontSize: 18,
        color: '#000000',
      },
      itemContainer: {
        flex: 1,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        height: 250,
      },
    imageBanner: {
      height:windowWidth/2,
      width:windowWidth-40,
      borderRadius:10,
      marginHorizontal:20
    },
    divCategorie:{
      backgroundColor:'red',
      margin:5, alignItems:'center',
      borderRadius:10,
      padding:10
    },
    titleCatg:{
      fontSize:30,
      fontWeight:'bold',
      textAlign:'center',
      marginBottom:10
    } 
  });

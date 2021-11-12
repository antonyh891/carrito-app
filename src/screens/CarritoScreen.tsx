import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { RootStackParams } from '../navigation/Navigation';
import { Ionicons } from '@expo/vector-icons';
import { CarritoContext } from '../context/CarritoContext';

//interface Props extends StackScreenProps<RootStackParams,'CarritoScreen'>{};
const { width: windowWidth } = Dimensions.get('window');

function CarritoScreen() {
   //const menu = route.params
   const context = useContext(CarritoContext)

  const modificarCantidad = (i: number,type : boolean, producto: CarritoContext) => {
  
    const productoModificado = producto;
    if (type) {
      productoModificado.cantidad= productoModificado.cantidad + 1;
     
    } else{
      productoModificado.cantidad= productoModificado.cantidad - 1;
    }
    context.modificarCantidad(i, productoModificado)
    
  }


    return (
        <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
           <View style={{height:20}} />
           <Text style={{fontSize:32,fontWeight:"bold",color:"#33c37d"}}>Carrito</Text>
           <View style={{height:10}} />
  
           <View style={{flex:1}}>
  
             <ScrollView>
  
               {
                 context.listarProductos().productos.map((item, i)=>{
                   return(
                     <View style={{width:windowWidth-20,margin:10,backgroundColor:'transparent', flexDirection:'row', borderBottomWidth:2, borderColor:"#cccccc", paddingBottom:10}}>
                       <Image resizeMode={"contain"} style={{width:windowWidth/3,height:windowWidth/3}} source={{uri: item.producto.image}} />
                       <View style={{flex:1, backgroundColor:'trangraysparent', padding:10, justifyContent:"space-between"}}>
                         <View>
                           <Text style={{fontWeight:"bold", fontSize:20}}>{item.producto.name}</Text>
                           <Text>Lorem Ipsum de food</Text>
                         </View>
                         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                           <Text style={{fontWeight:'bold',color:"#33c37d",fontSize:20}}>${item.producto.price * item.cantidad}</Text>
                           <View style={{flexDirection:'row', alignItems:'center'}}>
                             <TouchableOpacity onPress={()=>modificarCantidad(i,false, item)}>
                               <Ionicons name="ios-remove-circle" size={35} color={"#33c37d"} />
                             </TouchableOpacity>
                             <Text style={{paddingHorizontal:8, fontWeight:'bold', fontSize:18}}>{item.cantidad}</Text>
                             <TouchableOpacity onPress={()=>modificarCantidad(i,true, item)}>
                               <Ionicons name="ios-add-circle" size={35} color={"#33c37d"} />
                             </TouchableOpacity>
                           </View>
                         </View>
                       </View>
                     </View>

                     
                   )
                 })
               }
  
                   <Text style={{fontSize:28, color:"green"}}>${context.calcularTotal().total} </Text>


              
               <View style={{height:20}} />
  
               <TouchableOpacity style={{
                   backgroundColor:"#33c37d",
                   width:windowWidth-40,
                   alignItems:'center',
                   padding:10,
                   borderRadius:5,
                   margin:20
                 }}>
                 <Text style={{
                     fontSize:24,
                     fontWeight:"bold",
                     color:'white'
                   }}>
                   Pagar
                 </Text>
               </TouchableOpacity>
  
               <View style={{height:20}} />
             </ScrollView>
           </View>
           
        </View>
      );
}


export default CarritoScreen

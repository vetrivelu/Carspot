import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import Appearences from '../../../config/Appearences';
import styles from './Styles';
import orderStore from '../../../Stores/orderStore';




export default class Cart extends Component<Props> {
   
  constructor(props){
    super(props);
    this.state = {
    data:[
        {
            name :'Wilko Bell Black Color Good Standard Alarm Clock',
            oldPrice:'$3050',
            price:'$2500',
            isThereDiscount:true,
            quantity:1,
            imageUrl:'',
        },
        {
            name :'Wilko Bell Black Color Good Standard Alarm Clock',
            oldPrice:'$3050',
            price:'$2500',
            isThereDiscount:true,
            quantity:1,
            imageUrl:'',
        },
        {
            name :'Wilko Bell Black Color Good Standard Alarm Clock',
            oldPrice:'$3050',
            price:'$2500',
            isThereDiscount:true,
            quantity:1,
            imageUrl:'',
        },
        {
            name :'Wilko Bell Black Color Good Standard Alarm Clock',
            oldPrice:'$3050',
            price:'$2500',
            isThereDiscount:true,
            quantity:1,
            imageUrl:'',
        },
        {
            name :'Wilko Bell Black Color Good Standard Alarm Clock',
            oldPrice:'$3050',
            price:'$2500',
            isThereDiscount:true,
            quantity:1,
            imageUrl:'',
        },
        {
            name :'Wilko Bell Black Color Good Standard Alarm Clock',
            oldPrice:'$3050',
            price:'$2500',
            isThereDiscount:true,
            quantity:1,
            imageUrl:'',
        },
        {
            name :'Wilko Bell Black Color Good Standard Alarm Clock',
            oldPrice:'$3050',
            price:'$2500',
            isThereDiscount:true,
            quantity:1,
            imageUrl:'',
        },
        {
            name :'Wilko Bell Black Color Good Standard Alarm Clock',
            oldPrice:'$3050',
            price:'$2500',
            isThereDiscount:true,
            quantity:1,
            imageUrl:'',
        },
        {
            name :'Wilko Bell Black Color Good Standard Alarm Clock',
            oldPrice:'$3050',
            price:'$2500',
            isThereDiscount:true,
            quantity:1,
            imageUrl:'',
        },
        {
            name :'Wilko Bell Black Color Good Standard Alarm Clock',
            oldPrice:'$3050',
            price:'$2500',
            isThereDiscount:true,
            quantity:1,
            imageUrl:'',
        },
    ],
    amount:1,    
};
  
  
    }


  



    increment = {
   
    };
    decrement(){
       
    };
  
 
   render() {
        var dataClone = [...this.state.data];
        
       return (

        <View style = {styles.container}>
    
        
        
        
        <FlatList 
      
       data = {this.state.data}
       horizontal = {false}  
       showsHorizontalScrollIndicator = {false}
       
       renderItem = {({item,index}) =>
       <View style = {styles.item}>
       <View style = {styles.imageContainer}>
           {/* <Image
               style = {styles.image}
               source = {require('../../../../res/images/splash_car.png')}
           /> */}
       </View>
       
       <View style = {styles.contentContainer}>
           <Text style = {styles.headingText}>
               {item.name}
           </Text>
           <View style = {styles.row}>
               <Text style ={styles.discountText}>
                   {item.oldPrice}
               </Text>
               <Text style = {[styles.headingTextRed,{color:orderStore.color}]}>
                   {item.price}
               </Text>
           </View>

              <View style = {styles.row}>
               <TouchableOpacity
                   onPress = {()=>{
                       
                        
                        if(item.quantity>0)
                        {   dataClone[index].quantity = item.quantity-1;
                            this.setState({data:dataClone});
                        }
                    
                    }}>
                   <Image
                       style = {styles.cartImage}
                       source = {require('../../../../res/images/minus_circular.png')}/>
               </TouchableOpacity> 
              
               <Text style = {styles.cartText}>
                   {this.state.data[index].quantity} 
               </Text>
               <TouchableOpacity
                   onPress = {()=>{
                    dataClone[index].quantity = item.quantity+1;
                    this.setState({data:dataClone});
                      
                   }}>
                   <Image
                       style = {styles.cartImage}
                       source = {require('../../../../res/images/plus_circular.png')}/>
               </TouchableOpacity> 
           </View>
       </View>

   </View>

       }
       keyExtractor={item => item.imageUrl}
       >    
       </FlatList>

     </View>
     
        
        
        
        );
    }
  
    
  }
  

 


  
  
  
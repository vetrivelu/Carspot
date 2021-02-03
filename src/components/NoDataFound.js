import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';

import Appearences from '../config/Appearences'
import Store from '../Stores';


export default class NoAdsFound extends Component<Props> {

   

   


    constructor(props){
        super(props);
    
        this.state = {
          showSpinner:true,     
          currentItem:1,
          currentImage:0,
          isImageViewVisle:false,
        }
       
      }

    
     
 
    render() {
        let {orderStore} = Store;
        if(this.props.visible === false)
            return null;
        if(this.props.visible === true)       
         return (
            
            <View style = {s.container}>
                <Image 
                style = {s.image}
                source = {!this.props.noData ? require('../../res/images/no_data.png'):require('../../res/images/no_message.png')}/>
                <Text style = {s.text}>{this.props.message}</Text>

            </View>


       );

        


    }
}


const s = StyleSheet.create({
  
    container: {
        //height: '100%',
       flex:1,
        width: '100%',
        alignItems: 'center',
        justifyContent:'center', 
        backgroundColor:'white',    
        borderRadius:Appearences.Radius.radius,
        paddingBottom:15,
    },
    image:{
        resizeMode:'cover',
        width:75,
        height:75,
        marginTop:15,
    },
    text:{
        fontSize:Appearences.Fonts.mainHeadingFontSize,
        fontWeight: 'bold',
        color:Appearences.Colors.headingGrey,
    },


       
});


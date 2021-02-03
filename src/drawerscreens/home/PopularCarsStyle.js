
import React, { Component } from 'react';
import Appearences from '../../config/Appearences';
import {I18nManager} from 'react-native'

import {
  StyleSheet,
} from 'react-native';

  const styles = StyleSheet.create({

    container:{
      //  height:100,
        width:'100%',

        flexDirection:'row',
       // elevation   : Appearences.Shadow.elevation,
        //shadowOpacity: Appearences.Shadow.shadow,
      //  marginVertical:7,
        // marginHorizontal:5,
        marginTop: 5,
       // marginStart:-5,
        backgroundColor:'white',
        borderRadius:Appearences.Radius.radius,

    },
    imageContainer:{
        height:100,
        width:'40%',
        borderTopLeftRadius:Appearences.Radius.radius,
        borderBottomLeftRadius:Appearences.Radius.radius,
        overflow:'hidden',        
        alignSelf:'center',    
    },

    image:{
        height:100,
        width:'100%',
        resizeMode:'cover',
        borderTopLeftRadius:Appearences.Radius.radius,
        borderBottomLeftRadius:Appearences.Radius.radius,
        alignSelf:'center',
    },
    imageContainerOverlay:{
        flex:1,
        position:'absolute',
        
    },
    topRowContainer:{        
        width:'100%',
        flexDirection:'row',
        justifyContent:"flex-end",
       
    },
    topRightContent:{
       width:60,
       height:60,
      
       alignItems:'flex-end',
    },
    topRightContentImage:{
        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
    },
    bottomRowContainer:{      
            height:'50%',
                justifyContent:'flex-end',
        },
    bottomLeftContent:{
        width:22,
        height:22,
        marginStart:3,
        marginBottom:5,
        borderRadius: 100/2,
        alignItems:'center',
        justifyContent:'center',
        marginStart:8,
        marginBottom:8,
    },

    bottomLeftContentImage:{
        width:7,
        height:7,
        
    },
  

    textContainer:{
      flex:1,
       padding:15, 
          
        justifyContent:'center',
        },
        brandTitleStyle:{
            fontSize:Appearences.Fonts.headingFontSize,
            fontWeight:Appearences.Fonts.headingFontWieght,
            color:Appearences.Colors.black,
            alignSelf: 'flex-start',
        },
        brandTextStyle:{
            color:Appearences.Colors.grey,
            fontSize:Appearences.Fonts.paragraphFontSize,
            marginTop:5,
            alignSelf: 'flex-start',
           
        },
        modelTextStyle:{
            color:Appearences.Colors.grey,
            fontSize:Appearences.Fonts.paragraphFontSize,
            
            marginTop:5,    
            alignSelf: 'flex-start',
        },
        priceTextStyle:{
            fontSize:Appearences.Fonts.paragraphFontSize,
            fontFamily:Appearences.Fonts.paragaphFont,
            marginTop:5,
            alignSelf: 'flex-start',
            
            
        },
  
    });
  export default styles;
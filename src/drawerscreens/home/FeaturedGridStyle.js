
import React, { Component } from 'react';
import Appearences from '../../config/Appearences'
import { width,height} from 'react-native-dimension';
import {I18nManager} from 'react-native'


import {
  StyleSheet,
} from 'react-native';

  const styles = StyleSheet.create({

    container:{
        width:width(44),
      //  elevation   : Appearences.Shadow.elevation,
    //    shadowOpacity: Appearences.Shadow.shadow,
        marginHorizontal: 5,
        //marginVertical:5,
        marginTop:5,
        backgroundColor:'white',
        borderRadius:Appearences.Radius.radius,

    },
    imageContainer:{

        height:150,
        width:'100%',
        overflow: 'hidden',
        borderTopRightRadius:Appearences.Radius.radius,
        borderTopLeftRadius:Appearences.Radius.radius,
    },

    image:{
        flex:1,
        resizeMode:'cover',
        borderTopRightRadius:Appearences.Radius.radius,
        borderTopLeftRadius:Appearences.Radius.radius,
    },
    imageContainerOverlay:{
        width:'100%',
        height:'100%', 
        flex:1,
        position:'absolute',
        
    },
    topRowContainer:{
      
        height:'50%',
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
    triangleCorner: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderRightWidth: 50,
        borderTopWidth: 50,
        borderRightColor: 'transparent',
        transform: [
            {rotate: '90deg'},
            {scaleX: I18nManager.isRTL ? -1 : 1}
          ]
    },
    bottomRowContainer:{
        height:'50%',
        
        alignItems:'flex-end',
        flexDirection:'row',
        justifyContent:'space-between',  
    },
    bottomLeftContent:{
       maxWidth:'80%', 
       padding:5,
       alignItems:'center',
       justifyContent:'center',
    },

    bottomRightContent:{
        width:22,
        height:22,
        marginEnd:3,
        marginBottom:3,
        borderRadius: 100/2,
        alignItems:'center',
        justifyContent:'center',
        
    },
    bottomRightContentImage:{
        width:7,
        height:7,
    },
  

    textContainer:{
        flex:1,
        width:'100%',
        padding:10,
    },
    brandTextStyle:{
        fontSize:Appearences.Fonts.headingFontSize,
        alignSelf: 'flex-start',
        fontWeight:Appearences.Fonts.headingFontWieght,
        color:Appearences.Colors.black,
    },
    modelTextStyle:{
        color:Appearences.Colors.grey,
        fontSize:Appearences.Fonts.paragraphFontSize,
        fontFamily:Appearences.Fonts.paragaphFont,
        alignSelf: 'flex-start',
        marginTop:Appearences.Margins.top,
    },
    locationRowContainer:{
       
        alignItems:'center',
        flexDirection:'row',
        marginTop:Appearences.Margins.top,
        justifyContent:'flex-start',

    },
    locationImage:{
        width:8,
        height:8,
      marginTop:3,
      alignSelf:'flex-start',

    },
    locationTextStyle:{
        color:Appearences.Colors.grey,
        fontSize:Appearences.Fonts.paragraphFontSize,
        fontFamily:Appearences.Fonts.paragaphFont,
        marginStart:4,
        alignSelf:'flex-start',
    },
    milageRow:{
        flexDirection:'row',
        
    },
    petrolContainer:{
      
        flexDirection:'row',
    },
    petrolImageStyle:{
        width:8,
        height:8,
        marginTop:8,

    },
    petrolTextStyle:{
        color:Appearences.Colors.grey,
        fontSize:Appearences.Fonts.paragraphFontSize,
        fontFamily:Appearences.Fonts.paragaphFont,
        marginTop:Appearences.Margins.top,
        marginStart:5,
        alignSelf: 'flex-start',
    },
    mileageContainer:{
        flexDirection:'row',
        marginStart:5,
        marginTop:Appearences.Margins.top,
        alignItems:'center',
    },
    mileageImageStyle:{
        width:8,
        height:8,
       
    },
    mileageTextStyle:{
        color:Appearences.Colors.grey,
        fontSize:Appearences.Fonts.paragraphFontSize,
        fontFamily:Appearences.Fonts.paragaphFont,
        alignSelf: 'flex-start',
        marginStart:5,
    },
    
    //width: 0,
    //height: 0,
   // backgroundColor: 'transparent',
    //borderStyle: 'solid',
    //borderLeftWidth: 50,
    //borderRightWidth: 50,
    //borderBottomWidth: 100,
   // borderLeftColor: 'transparent',
    //borderRightColor: 'transparent',
    //borderBottomColor: 'black',
    //transform: [
      //  {rotate: '45deg'}
      //]
  
    });
  export default styles;

import React, { Component } from 'react';
import Appearences from '../../config/Appearences'
import { width, height, totalSize } from 'react-native-dimension';
import {
  StyleSheet,
} from 'react-native';

  const styles = StyleSheet.create({

    container:{
         width: width(21.1),
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
       marginHorizontal: 5,
       marginVertical: 5,
      //  elevation   : Appearences.Shadow.elevation,
      //  shadowOpacity: Appearences.Shadow.shadow,
       padding:10,
      borderRadius:5,
    },
    containerThreeRows:{
      width: width(29),
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'white',
    marginHorizontal: 5,
    marginVertical: 5,
    // elevation   : Appearences.Shadow.elevation,
    // shadowOpacity: Appearences.Shadow.shadow,
    padding:10,
    borderRadius:5,

 },
    image:{
        width:30,
        height:30,
        resizeMode:'contain',
    },
    imageThreeRows:{
      width:50,
      height:50,
      resizeMode:'contain',
  },
    text:{
        color:Appearences.Colors.black,
        fontSize:Appearences.Fonts.paragraphFontSize,
        fontFamily:Appearences.Fonts.paragaphFont,
        marginTop:5,
        textAlign:'center',
    },
  });
  export default styles;
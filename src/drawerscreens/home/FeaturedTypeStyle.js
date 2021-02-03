
import React, { Component } from 'react';
import { width} from 'react-native-dimension';

import Appearences from '../../config/Appearences'
import {
  StyleSheet,
} from 'react-native';

  const styles = StyleSheet.create({

    container:{
         width:90,
        justifyContent:'center',
        alignItems:'center',
    //    elevation   : Appearences.Shadow.elevation,
      //  shadowOpacity: Appearences.Shadow.shadow,
        marginHorizontal: 5,
        marginVertical: 5,
        backgroundColor:'white',
        borderRadius:Appearences.Radius.radius,
        padding:10,
      },
    containerThreeItems:{
      width: width(33),
      justifyContent:'center',
     alignItems:'center',
     elevation   : Appearences.Shadow.elevation,
     shadowOpacity: Appearences.Shadow.shadow,
     marginHorizontal: 5,
     marginVertical: 5,
     backgroundColor:'white',
     borderRadius:Appearences.Radius.radius,
     padding:10,

 },
 imageThreeItems:{
  width:100,
  height:60,
  resizeMode:'contain',
},
    image:{
        width:80,
        height:50,
        resizeMode:'contain',
    },
    text:{
        color:Appearences.Colors.black,
        fontSize:Appearences.Fonts.paragraphFontSize+2,
        fontFamily:Appearences.Fonts.paragaphFont,
        paddingBottom:10,
    },
  });
  export default styles;

import React, { Component } from 'react';
import Appearences from '../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';

  const styles = StyleSheet.create({

    container:{
        height:200,
        width:'100%',
        marginVertical:5,
        marginHorizontal: 1,      
        backgroundColor:'white',
       // elevation   : Appearences.Shadow.elevation,
        //shadowOpacity: Appearences.Shadow.shadow,
        borderRadius:Appearences.Radius.radius,
    },
    imageContainer:{
       
       width:'100%',
       height:'100%',
       position:'absolute',
       backgroundColor:'rgba(0, 0, 0, 0.5)',

       flexDirection:'row',
       borderRadius:Appearences.Radius.radius,

    },
    image:{
        width:'100%',
        height:'100%',
        resizeMode:'stretch',
    },
    textContainer:{
        flex:1,
      
        padding:15,
        justifyContent:'flex-end',
    },
    cityTextStyle:{

        color:'white',
        fontWeight:'bold',
        fontFamily:Appearences.Fonts.headingFont,
        fontSize:Appearences.Fonts.headingFontSize,
        alignSelf: 'flex-start',
    },
    countryTextStyle:{

        color:'white',
        
        fontFamily:Appearences.Fonts.paragaphFont,
        fontSize:Appearences.Fonts.paragraphFontSize,
        alignSelf: 'flex-start',

    },
    });
  export default styles;
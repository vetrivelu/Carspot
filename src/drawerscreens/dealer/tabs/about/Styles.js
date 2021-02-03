
import React, { Component } from 'react';
import Appearences from '../../../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:5,
  dataRowNumberFontSize:12,
  sidePadding:15,

}
const styles = StyleSheet.create({
  

     container:{
         paddingStart:localProps.sidePadding,
         paddingEnd:localProps.sidePadding,
     },
     subHeading:{
      fontSize:Appearences.Fonts.subHeadingFontSize,
      color:Appearences.Colors.black,
      fontWeight:Appearences.Fonts.headingFontWieght,
    },
     pageTitle:{
      fontSize:Appearences.Fonts.headingFontSize+2,
      color:Appearences.Colors.black,
      marginTop:localProps.topMargin,
    },
    wideSeperator:{
      width:30,
      height:1,
      marginTop:localProps.topMargin,
      backgroundColor:Appearences.Colors.black,
    },
    narrowSeperator:{
      width:15,
      height:1,
      marginTop:2,
      backgroundColor:Appearences.Colors.black,

    },
    headingTextBlack:{
      fontSize:Appearences.Fonts.headingFontSize,
      color:Appearences.Colors.black,
      marginTop:localProps.topMargin,
    },
    paragraphTextGrey:{
      color:Appearences.Colors.grey,
      fontSize:Appearences.Fonts.paragraphFontSize,
    },
    paragraphTextBlack:{
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.paragraphFontSize,
      marginTop:localProps.topMargin,
     },
     paragraphTextBlackMarginStart:{
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.paragraphFontSize,
      marginTop:localProps.topMargin,
      marginStart:15,
     },
     mapContainer:{
      height:200,
      justifyContent:'center',
      marginTop:localProps.topMargin,
    },
    videoContent:{
      
      flex:1,},
    
     lineSeperator:{
       width:'100%',
       height:1,
       backgroundColor:Appearences.Colors.lightGrey,
     },
     contactRowContainer:{
       width:'100%',
       paddingTop:15,
       paddingBottom:15,
       flexDirection:'row',
       alignItems:'center'
     },
     aboutImage:{
       width:15,
       height:15,
       resizeMode:'cover',
     },
    });
    export default styles;
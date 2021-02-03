
import React, { Component } from 'react';
import Appearences from '../../../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:10,
  dataRowNumberFontSize:12,
  sidePadding:15,

}
const styles = StyleSheet.create({
  panel:{
    paddingStart:localProps.sidePadding,
    paddingEnd:localProps.sidePadding,
    justifyContent:'center',
    width:'92%',
    alignSelf:'center',
    flex:1,
    backgroundColor:'white',
    marginTop:localProps.topMargin,
    paddingBottom:15,
    paddingTop:15,
  },

    
     subHeading:{
      fontSize:Appearences.Fonts.subHeadingFontSize,
      color:Appearences.Colors.black,
      fontWeight:Appearences.Fonts.headingFontWieght,
      marginTop:localProps.topMargin,
      alignSelf:'flex-start'
    },
     pageTitle:{
      fontSize:Appearences.Fonts.headingFontSize+2,
      color:Appearences.Colors.headingGrey,
      marginTop:localProps.topMargin,
    },
    wideSeperator:{
      width:30,
      height:1,
      marginTop:localProps.topMargin,
    },
    narrowSeperator:{
      width:15,
      height:1,
      marginTop:2,
    },
    headingTextBlack:{
      fontSize:Appearences.Fonts.headingFontSize,
      color:Appearences.Colors.headingGrey,
      marginTop:localProps.topMargin,
    },
    paragraphTextGrey:{
      color:Appearences.Colors.grey,
      fontSize:Appearences.Fonts.paragraphFontSize,
    },
    paragraphTextBlack:{
      color:Appearences.Colors.headingGrey,
      fontSize:Appearences.Fonts.paragraphFontSize,
     },
     TextInput:{
      height:Appearences.Registration.itemHeight,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      flexDirection:'row',
      paddingStart:15,
      paddingEnd:15,
      marginTop:localProps.topMargin,
      paddingBottom:0,
      paddingTop:0,
      fontSize:Appearences.Fonts.headingFontSize,
      color:Appearences.Colors.headingGrey,
      borderRadius:5,
    },
    TextInputError:{
      height:Appearences.Registration.itemHeight,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      flexDirection:'row',
      paddingStart:15,
      paddingEnd:15,
      marginTop:localProps.topMargin,
      paddingBottom:0,
      paddingTop:0,
      fontSize:Appearences.Fonts.headingFontSize,
      borderColor:'red',
      borderWidth:1,
      color:Appearences.Colors.headingGrey,
      borderRadius:5,
    },
    textArea:{
      minHeight:100,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      textAlignVertical: "top",
     padding:15,
      marginTop:localProps.topMargin,
      marginBottom:localProps.topMargin,
    
      fontSize:Appearences.Fonts.headingFontSize,
      borderRadius:5,
      color:Appearences.Colors.headingGrey,
    },
    textAreaError:{
      minHeight:100,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      textAlignVertical: "top",
      padding:15,
      marginTop:localProps.topMargin,
      marginBottom:localProps.topMargin,
      color:Appearences.Colors.headingGrey,
      fontSize:Appearences.Fonts.headingFontSize,
      borderColor:'red',
      borderWidth:1,
      borderRadius:5,
    },
    buttonRow:{
      width:'100%',
      height:Appearences.Registration.itemHeight-10,
      alignItems:'center',
      justifyContent:'center',
      marginTop:localProps.topMargin,
      borderRadius:5,
    },
    progressRow:{
      width:'100%',
      height:Appearences.Registration.itemHeight,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:5,
      marginTop:localProps.topMargin,
      borderRadius:5,
    },
    headingTextWhite:{
      color:'white',
      fontSize:Appearences.Fonts.headingFontSize,
      fontWeight:Appearences.Fonts.headingFontWieght,
    },
    });
    export default styles;
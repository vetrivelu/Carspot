

import React, { Component } from 'react';
import Appearences from '../../config/Appearences';

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
   
// Form Start 
formHeadingContainer:{
  flexDirection:'row',
},
bodyHeadingBlack:{
  fontSize:Appearences.Fonts.subHeadingFontSize,
  color:Appearences.Colors.headingGrey,
  marginTop:localProps.topMargin+5,
  fontWeight:Appearences.Fonts.headingFontWieght,

},
bodyHeadingAppColor:{
  fontSize:Appearences.Fonts.headingFontSize,
  marginTop:localProps.topMargin,
  marginStart:3,
},

paragraphText:{
  color:Appearences.Colors.grey,
  fontSize:Appearences.Fonts.paragraphFontSize,
  marginTop:localProps.topMargin,
},
headingTextContainer:{
  flexDirection:'row',
  marginTop:localProps.topMargin+5,
  alignItems:'center'
},
headingTextBlack:{
  fontWeight:Appearences.Fonts.headingFontWieght,
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.headingGrey,
},

TextInput:{
  height:Appearences.Registration.itemHeight,
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,
  borderRadius:Appearences.Radius.radius,
  paddingStart:15,
  paddingEnd:15,
  marginTop:localProps.topMargin,
  paddingBottom:0,
  paddingTop:0,
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.headingGrey,
},
TextInputMultiline:{
  minHeight:100,
  maxHeight:100,  
  backgroundColor:Appearences.Registration.boxColor,
  fontSize:Appearences.Fonts.headingFontSize,
  marginTop:localProps.topMargin,
  borderRadius:Appearences.Radius.radius,
  textAlignVertical: 'top',
  color:Appearences.Colors.headingGrey,
  
},
footerContainer:{
  alignItems:'center',
 },
 footer:{
   height:Appearences.Registration.itemHeight-10,
   width:'100%',
   alignItems:'center',
   justifyContent:'center',
   margin:localProps.topMargin+5,
   borderRadius:Appearences.Radius.radius,
 },
 footerText:{
   color:'white',
   fontSize:Appearences.Fonts.headingFontSize,
 },
 // Form End
    });

  export default styles;
  
  
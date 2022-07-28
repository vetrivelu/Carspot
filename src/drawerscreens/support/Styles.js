
import React, { Component } from 'react';
import Appearences from '../../config/Appearences';
import {
    StyleSheet,
  } from 'react-native';
  const localProps = {
     topMargin:5,
    sidePadding:15,
  
  };
const styles = StyleSheet.create({
 
  container:{
     
    paddingStart:localProps.sidePadding,
    paddingEnd:localProps.sidePadding, 
},


//Accordin Styling Start

headerContentContainer:{
  flexDirection:'row',
  flex:1,
  justifyContent:'space-between',
  borderRadius:5,
 },
 headerTextSwitched:{
  color:'white',
fontSize:Appearences.Fonts.headingFontSize,
},
headerText:{
  color:'black',
 fontSize:Appearences.Fonts.headingFontSize,

 },
  rotationViewContainer:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignItems:'center',
 },
 rotatingView:{
   width:10,
   height:10,
  transform: [{ rotate: '180deg'}]
 },
 NonrotatingView:{
  width:10,
  height:10,
  transform: [{ rotate: '90deg'}]
 },
 accordingContainer:{
   marginTop:localProps.topMargin,
 },
 sectionContainer:{
   // width:'100%',
   marginVertical:5,
   marginHorizontal: 5,
   backgroundColor:'white',
   elevation   : Appearences.Shadow.elevation,
  shadowOpacity: Appearences.Shadow.shadow,
    padding:10,
    marginTop:localProps.topMargin,
},
headingText:{
    color:Appearences.Colors.black,
    fontSize:Appearences.Fonts.headingFontSize,
    marginTop:localProps.topMargin,
},
paragraphText:{
    color:Appearences.Colors.grey,
    fontSize:Appearences.Fonts.paragraphFontSize,
},
//Accordin Styling End

});
export default styles;

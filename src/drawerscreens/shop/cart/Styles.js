
import React, { Component } from 'react';
import Appearences from '../../../config/Appearences';
import {
    StyleSheet,
  } from 'react-native';
  const localProps = {
     topMargin:5,
    sidePadding:15,
  
  };
const styles = StyleSheet.create({
 
  container:{
    height:'100%',
    backgroundColor:'white',
    padding:localProps.sidePadding,
},
item:{
    width:'100%',
    height:100,
    borderColor:Appearences.Colors.lightGrey,
    borderWidth:1,
    marginTop:localProps.topMargin,
    flexDirection:'row',
},
imageContainer:{
    height:'100%',
    width:'30%',
    borderRightColor:Appearences.Colors.lightGrey,
    borderRightWidth:1,
},
image:{
    width:'100%',
    height:'100%',
    resizeMode:'cover',
},
contentContainer:{
    flex:1,
    padding:5,
},
headingText:{
    color:Appearences.Colors.black,
    fontSize:Appearences.Fonts.headingFontSize,
},
row:{
    marginTop:localProps.topMargin,
    flexDirection:'row',
    alignItems:'center',
},
headingTextRed:{
    fontSize:Appearences.Fonts.headingFontSize,
    marginStart:5,
    
},
discountText:{
    fontSize:Appearences.Fonts.paragraphFontSize,
    color:Appearences.Colors.grey,
    textDecorationLine:'line-through',
},
cartImage:{
    width:Appearences.Fonts.headingFontSize,
    height:Appearences.Fonts.headingFontSize,
    
},
cartText:{
    color:Appearences.Colors.black,
    fontSize:Appearences.Fonts.headingFontSize,
    marginStart:5,
    marginEnd:5,
    
},
});
export default styles;

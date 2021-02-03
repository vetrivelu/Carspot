
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
     
    paddingStart:localProps.sidePadding,
    paddingEnd:localProps.sidePadding, 
},
headingTextContainer:{
  flexDirection:'row',
  marginTop:localProps.topMargin,
  alignItems:'center'
},
headingTextBlack:{

  fontSize:Appearences.Fonts.headingFontSize,
 
  color:Appearences.Colors.black,
},


PopupViewContainer:{
  height:Appearences.Registration.itemHeight,
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,  
  paddingStart:15,
  paddingEnd:15,
  marginTop:localProps.topMargin,
  marginBottom:localProps.topMargin,
  paddingBottom:0,
  paddingTop:0,
   justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row',
},


popupViewImage:{
  width:Appearences.Fonts.paragraphFontSize,
  height:Appearences.Fonts.paragraphFontSize,
},
popupViewText:{
  
  fontSize:Appearences.Fonts.paragraphFontSize,
},


TextInput:{
  height:Appearences.Registration.itemHeight,
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,
  
  paddingStart:15,
  paddingEnd:15,
  marginTop:localProps.topMargin,
  marginBottom:localProps.topMargin,
  paddingBottom:0,
  paddingTop:0,
  fontSize:Appearences.Fonts.paragraphFontSize,
},
 

// Slider Styling Start

circle: {
  width: Appearences.Fonts.headingFontSize+5,
  height: Appearences.Fonts.headingFontSize+5,
  borderRadius: 100/2,
  borderWidth:1,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'white',
  
},
sliderImage:{
 
  resizeMode:'center',
},
// Slider Styling End



// Modal Styling Start


modal: {
   
  width: '80%',
  height:'50%',
},

modalHeadingTextContainer:{
  marginTop:localProps.sidePadding,
  marginStart:localProps.sidePadding-6,
},


modalHeadingSubContainer:{
  height:40,
  flexDirection:'row',
  alignItems:'center',
   
},
modalHedingItemsContainer:{
  flexDirection:'row',
  alignItems:'center',
  paddingStart:5,
  paddingEnd:5,
},

headerImage:{
  resizeMode:'contain',
},
seperator:{
  backgroundColor:Appearences.Colors.grey,
  height:1,
  width:'100%',
  marginTop:localProps.topMargin,
},
sunHeadingseperator:{
  backgroundColor:Appearences.Colors.grey,
  height:1,
  width:'100%',
},
modalHeadingText:{

  fontSize:Appearences.Fonts.headingFontSize,
  
  color:'white',

},
modalText:{

  fontSize:Appearences.Fonts.headingFontSize,
 
  color:Appearences.Colors.black,

},

modalSubText:{

fontSize:Appearences.Fonts.paragraphFontSize,

color:Appearences.Colors.grey,

},

radioLabelStyle:{
fontSize: Appearences.Fonts.headingFontSize,
 color: Appearences.Colors.black,
},
labelWrapStyle:{
justifyContent:'flex-start',
alignItems:'center',
width:'50%',

},
radioButtonStyle:{
alignSelf:'flex-end',

},
buttonWrapStyle:{
  width:'50%',
  justifyContent:'center',
  alignItems:'center',
  paddingRight:localProps.sidePadding,
  
},
countriesContainer:{
  flexDirection:'row',
  width:'100%',
 
  
  flexWrap:'wrap',
},
contriesItemContainer:{

 
  width:'50%',
  
},
contriesTextContainer:{
  paddingStart:localProps.sidePadding,
  paddingTop:5,
  paddingBottom:5,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'flex-start',
},
countryModalBottomContainer:{
  width:'100%',
  height:'100%',
  position:'absolute',
  justifyContent:'flex-end',
},


noStyle:{},


// Modal Styling End  

footerContainer:{
 alignItems:'center',
},
footer:{
  height:Appearences.Registration.itemHeight,
  width:'100%',
  alignItems:'center',
  justifyContent:'center',
  margin:localProps.topMargin,
},
footerText:{
  color:'white',
  fontSize:Appearences.Fonts.headingFontSize,
},
});
export default styles;

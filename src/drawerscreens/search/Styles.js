
import React, { Component } from 'react';
import Appearences from '../../config/Appearences';
import {
    StyleSheet,I18nManager
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
  marginTop:15,
  alignItems:'center'
},
headingTextBlack:{
  fontSize:Appearences.Fonts.headingFontSize,
  fontWeight:Appearences.Fonts.headingFontWieght,
  marginTop:localProps.topMargin,
  color:Appearences.Colors.black,
  alignSelf:'flex-start',
},
modalBoxStyle:{
  alignItems: 'center',
  height: 300,
  borderRadius:10,
},

modalContentContainer:{
  width:'95%',
  backgroundColor:'white',
  paddingBottom:15,
},
maptContainer:{
  height:200,
  justifyContent:'center',
  marginTop:localProps.topMargin,
},
videoContent:{
  
  flex:1,},
  row:{
    flexDirection:'row',
                marginTop:5,
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
  borderRadius:5,

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
  borderRadius:5,

},

PopupViewContainerSmall:{
  height:Appearences.Registration.itemHeight,
  width:"45%",
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
  borderRadius:5,
  color:'#999999',
  fontSize:Appearences.Fonts.headingFontSize,

},
popupViewImage:{
  width:Appearences.Fonts.paragraphFontSize,
  height:Appearences.Fonts.paragraphFontSize,
  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],

},
popupViewText:{
  
  fontSize:Appearences.Fonts.headingFontSize,
  color:'#999999',
},


TextInput:{
  height:Appearences.Registration.itemHeight,
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,
  borderRadius:5,
  paddingStart:15,
  paddingEnd:15,
  marginTop:localProps.topMargin,
  paddingBottom:0,
  paddingTop:0,
  fontSize:Appearences.Fonts.headingFontSize,
  color:'#999999',
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
  tintColor:'#999999',
  resizeMode:'center',
},
// Slider Styling End

fromDateDropdownContainer:{
  height:'100%',
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,  
  paddingStart:15,
  paddingEnd:15,
  paddingBottom:0,
  paddingTop:0,
   justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row',
},



//picker style start
TextInputDate:{
  height:Appearences.Registration.itemHeight,
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,
  paddingStart:15,
  paddingEnd:15,
  marginTop:localProps.topMargin,
  marginBottom:localProps.topMargin,
  paddingBottom:0,
  paddingTop:0,
  justifyContent:'center',
  borderRadius:5,
  fontSize:Appearences.Fonts.headingFontSize,

},
pickerContainer:{
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
  borderRadius:5,
  
},
dropDownTextStyle :{
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.grey,
  padding:5,
},
dorpdownContainerTextStyle:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:'#999999',
  
},
dorpDownRow:{
  width:'100%',
 
  padding:5,
  justifyContent:'center',
},

dorpDownStyle:{
  width:'92%',
  height:250,
  marginStart:-15,
},
dorpDownStyleDate:{
  width:'33%',
  height:250,
  marginStart:-15,
},
dropdownSeperator:{
  width:0,
  height:0,
  margin:0,
},
dropdownArrowContainer:{
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'flex-end',
  position:'absolute',
  height:'100%',
  width:'100%',
  backgroundColor:'transparent',
  paddingEnd:15,
},
hideView:{
  overflow:'hidden',
  borderWidth:5,
  borderColor:'red',
  
},
showView:{
  overflow:'visible',
  borderWidth:5,
  borderColor:'black',
},
//picker style end
yearViewContainer:{
  flexDirection:'row',
  width:'100%',
},
yearSeperatorContainer:{
  width:'5%',
  alignItems:'center',
  justifyContent:'center',
},
milageSeperatorContainer:{
  width:'10%',
  alignItems:'center',
  justifyContent:'center',
},


// Modal Styling Start


modal: {
   
  width: '80%',
  height:'50%',
},

modalHeadingTextContainer:{
  paddingTop:localProps.topMargin,
  paddingBottom:localProps.topMargin,
  marginStart:localProps.sidePadding-6,
  marginTop:localProps.topMargin,
},

modalHeadingContainer:{
  height:40,
  justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row',
  
},
modalHeadingSubContainer:{
  height:40,
  flexDirection:'row',
  alignItems:'center',
   
},
subHeadingText:{
  color:Appearences.Colors.headingGrey,
  fontSize:Appearences.Fonts.subHeadingFontSize,
  marginTop:localProps.topMargin,
  fontWeight:Appearences.Fonts.headingFontWieght,
  alignSelf:'flex-start',
},
modalHedingItemsContainer:{
  flexDirection:'row',
  alignItems:'center',
  paddingStart:5,
  paddingEnd:5,
},
modaBoxInnerContainer:{
  backgroundColor:Appearences.Colors.appBackgroundColor,
  marginTop:15,
  height:200,
  borderRadius:Appearences.Radius.radius,
},
headerImage:{
  resizeMode:'contain',
},
seperator:{
  backgroundColor:Appearences.Colors.lightGrey,
  height:1,
  width:'100%',
  marginTop:localProps.topMargin,
},
sunHeadingseperator:{
  backgroundColor:Appearences.Colors.lightGrey,
  height:1,
  width:'100%',
},
modalHeadingText:{

  fontSize:Appearences.Fonts.headingFontSize,
  
  color:'white',

},
modalText:{

  fontSize:Appearences.Fonts.headingFontSize,
  alignSelf:'center',
  color:Appearences.Colors.headingGrey,
  

},

modalSubText:{

fontSize:Appearences.Fonts.paragraphFontSize,

color:Appearences.Colors.grey,

},

AccordionradioLabelStyle:{
  fontSize: Appearences.Fonts.headingFontSize,
   color: Appearences.Colors.grey,
   
  },


radioLabelStyle:{
fontSize: Appearences.Fonts.headingFontSize,
 color: Appearences.Colors.grey,
 marginStart:localProps.sidePadding, 
},
labelWrapStyle:{
justifyContent:'flex-start',
alignItems:'center',
width:'50%',

},
AccordionlabelWrapStyle:{
  justifyContent:'flex-start',
  alignItems:'center',
  width:'50%',
  
  },
radioButtonStyle:{
alignSelf:'flex-end',

},
AccordionradioButtonStyle:{
  alignSelf:'flex-end',
  },
buttonWrapStyle:{
  width:'50%',
  justifyContent:'center',
  alignItems:'center',
  paddingEnd:localProps.sidePadding,
  
},
AccordionbuttonWrapStyle:{
  width:'50%',
  justifyContent:'center',
  alignItems:'center',
  
},
modalScrollviewContainer:{
 marginTop:localProps.topMargin,
  width:'100%',
  paddingBottom:15,
 
},
modalItemContainer:{

 flex:1,
  
},
modalDataTextContainer:{
  paddingStart:localProps.sidePadding,
  marginTop:15,
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
  countryModalSubmitButtonContainer:{
    height:40,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
  },

noStyle:{},


// Modal Styling End  
yearContainer:{
  height:Appearences.Registration.itemHeight,
  width:"35%",
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
  borderRadius:5,

},
redBoxContainer:{
  width:'10%',
  height:Appearences.Registration.itemHeight,
  alignItems:'center',
  justifyContent:'center',
  alignSelf:'center',
  borderRadius:5,

},
redBoxText:{
  color:'white',
  fontSize:Appearences.Fonts.paragraphFontSize,
},
datePickerStyle:{
  width: '35%',     
backgroundColor:Appearences.Registration.boxColor,
height:Appearences.Registration.itemHeight,
alignSelf:'center',
borderRadius:5,

},

yearParentContainer:{
  flexDirection:'row',
  justifyContent:'space-between',
  marginTop:localProps.topMargin,
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
  color:'#999999',
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
  transform: [{ rotate:I18nManager.isRTL ?'-90deg':'90deg'}]
 },
 accordingContainer:{
   marginTop:15,
 },
 featuresContainer:{
  width:'100%',
  flexDirection:'row',
  flexWrap:'wrap',
  marginTop:localProps.topMargin,
},
checkBox:{
  width:'28%',  
  padding:0,
  margin:0,
  borderWidth:0,
  borderRadius:0,
  backgroundColor:null,
  marginTop:localProps.topMargin,
  
},
checkBoxText:{

  fontSize:Appearences.Fonts.paragraphFontSize,
  color:'#999999',
  fontWeight:'normal',
},
//Accordin Styling End
footerContainer:{
 alignItems:'center',
},
footer:{
  height:Appearences.Registration.itemHeight-10,
  width:'100%',
  alignItems:'center',
  justifyContent:'center',
  margin:localProps.topMargin,
  borderRadius:Appearences.Radius.radius,

},
footerText:{
  color:'white',
  fontSize:Appearences.Fonts.headingFontSize,
},
// new Radio Style Start
itemContainerSelected:{
  paddingStart:25,
  paddingEnd:25,
  paddingTop:7,
  paddingBottom:7,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:20,
  marginTop:localProps.topMargin,
  marginStart:15,

},
itemContainerUnSelected:{
  paddingStart:25,
  paddingEnd:25,
  paddingTop:7,
  paddingBottom:7,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:20,
  backgroundColor:Appearences.Registration.boxColor,
  marginTop:localProps.topMargin,
  marginStart:15,
},
itemTextunSelected:{
  fontSize:Appearences.Fonts.headingFontSize-1,
  color:'#999999',
},
itemTextSelected:{
  fontSize:Appearences.Fonts.headingFontSize-1,
  color:'white',
},

// new Radio Style End
});
export default styles;

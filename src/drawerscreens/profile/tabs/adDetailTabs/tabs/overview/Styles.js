
import Appearences from '../../../../../../config/Appearences';
import {
  StyleSheet,
} from 'react-native';
const localProps = {
  
  headerHeight:200,
  topMargin:5,
  sidePadding:10,
  bodyTopMargin:15,
  sliderArrowContainerWidth:30,
  sliderArrowContainerHeight:70,
  topSliderArrowDimens:15,
};
const styles = StyleSheet.create({
 
  featureSectionConatiner:{
    flexDirection:'row',
    flexWrap:'wrap',
    width:'100%',
  },

container:{
  
    //justifyContent: 'center',
    marginTop:localProps.topMargin,
    borderColor: Appearences.Colors.lightGrey,
    borderWidth: 0.5,
    width:'100%',
   // paddingStart:5,
    //paddingEnd:5,
    borderTopColor:'transparent',
},
marginTop:{marginTop:localProps.topMargin},

border:{ borderColor: Appearences.Colors.lightGrey,
  borderWidth: 0.5,
  borderBottomColor:'transparent',
  marginTop:localProps.topMargin,
},
rowSeperator:{
    width:'100%',
    height:1,
    backgroundColor:Appearences.Colors.lightGrey,
    marginTop:localProps.topMargin,
},
sidePadding:{
    paddingStart:10,
    paddingEnd:10,
   
},
textBlack:{
    color:Appearences.Colors.black,
    fontSize:Appearences.Fonts.headingFontSize,
    paddingTop: localProps.sidePadding,
    paddingBottom: localProps.sidePadding,

},
subHeadingText:{
    color:Appearences.Colors.black,
    fontSize:Appearences.Fonts.subHeadingFontSize,
    alignSelf:'flex-start',
    fontWeight:Appearences.Fonts.headingFontWieght,
},
overviewContentRownContainer:{

    width:'50%',
    justifyContent:'center',
    paddingStart:localProps.sidePadding,
    borderBottomColor:Appearences.Colors.lightGrey,
    borderBottomWidth:1,
    paddingBottom:localProps.topMargin+5,
  },
  seperator:{
    width:"100%",
    height:1,
    backgroundColor:Appearences.Colors.lightGrey,
    marginTop:localProps.topMargin+5,

  },
  overviewContentRownContainerLightGrey:{

    width:'50%',
    justifyContent:'center',
    paddingStart:localProps.sidePadding,
    backgroundColor:Appearences.Colors.lightGrey,
    paddingBottom:localProps.topMargin,
  },
  overviewContentRownContainerNoBorder:{

    width:'50%',
    justifyContent:'center',
    paddingStart:localProps.sidePadding,

    paddingBottom:localProps.topMargin,
  },

textBlackWithNoSidePadding:{
    color:Appearences.Colors.black,
    fontSize:Appearences.Fonts.headingFontSize,
    paddingTop: localProps.sidePadding,
    paddingBottom: 3,

},
textBlackNoPadding:{
  color:Appearences.Colors.black,
  fontSize:Appearences.Fonts.headingFontSize+2,

},
fuelEconomyText:{
  color:Appearences.Colors.black,
  fontSize:Appearences.Fonts.paragraphFontSize,
},
textAppColorNoPadding:{
  fontSize:Appearences.Fonts.paragraphFontSize,
  color:Appearences.Colors.black,

},
textGrey:{
    color:Appearences.Colors.grey,
    fontSize:Appearences.Fonts.headingFontSize,
    paddingTop: localProps.sidePadding,
    paddingBottom: localProps.sidePadding,
},
textGreyNoPadding:{
  color:Appearences.Colors.grey,
  fontSize:Appearences.Fonts.headingFontSize-2,
  
},
// panel start
panelContainer:{
flex:1,
  backgroundColor:'white',
  height:100,
  marginTop:localProps.topMargin,
  justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row',



},
panelLeftContainer:{
flex:1,
justifyContent:'center',
paddingStart:15,  
alignItems:'flex-start',
},
panelSeperator:{
  width:1,
  height:'100%',
},
panelMiddleContainer:{
flex:1,
padding:15,
alignItems: 'center',
justifyContent:'center',
},
panelRightContainer:{
  flex:1,
  justifyContent:'center',
  paddingEnd:15,  
  alignItems:'flex-end',
  
},
meterTextContainer:{
  width:"100%",
  alignItems:'center',
  justifyContent:'center',
},
meterImageContainer:{
  width:"100%",
  flex:1,
  alignItems:'center',
  marginTop:localProps.topMargin,
  justifyContent:'center',
},
meterImage:{
  width:40,
  height:20,
  resizeMode:'contain',
  marginTop:localProps.topMargin,
},
panelAbsoluteContainer:{
  alignItems:'center',
  flexDirection:'row',
  width:'100%',
  height:'100%',
  position:'absolute',
  backgroundColor:'transparent',
  justifyContent:'space-evenly',

},
circle: {
  width: 40,
  height: 40,
  borderRadius: 40/2,
  alignItems:'center',
  justifyContent:'center',
},
circleImage:{
 flex:1,
 resizeMode:"center",
 
},
panelNumericText:{
  color:Appearences.Colors.black,
    fontSize:Appearences.Fonts.headingFontSize+10,
},


//panel end
buttonRow:{
  width:'100%',
  height:Appearences.Registration.itemHeight-10,
  alignItems:'center',
  justifyContent:'center',
  marginTop:localProps.topMargin,
},
headingTextWhite:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:'white',
},
// Functions Row Start
functionsRowContainer:{
  width:'100%',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
  paddingTop:5,
  paddingBottom:5,
  marginTop:localProps.topMargin+10,
},
functionContainer:{
flex:1,
alignItems:'center',
justifyContent:'center',
},
headingTextAppColor:{
  fontSize:Appearences.Fonts.headingFontSize,
  marginTop:localProps.topMargin,
},
functionImageAppColor:{
  width:20,
  height:20,
  tintColor:Appearences.Colors.grey,
  
},
//Fuctions Row End

// Profile Row Start
profileContainer:{
  width:'100%',
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
},
profileLeftContainer:{
flex:1,
flexDirection:'row',
alignItems:'center',
},


profileRightContainer:{
flex:1,
justifyContent:'center',
alignItems:'flex-end'
},
profileButtonContainer:{
  borderRadius:3,
  paddingTop:5,
  paddingBottom:5,
  paddingStart:10,
  paddingEnd:10,
  alignItems:'center',
  justifyContent:'center',
},
headingTextBlack:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.black,
  alignSelf:'flex-start',
},
headingTextBlackTopMaring:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.black,
  marginTop:localProps.topMargin,
},
paragraphTextGrey:{
  fontSize:Appearences.Fonts.paragraphFontSize,
  color:Appearences.Colors.grey,
  marginTop:localProps.topMargin,
},
//Profile Row End
// Modal Styling Start
modalContainer:{
  flex:1,
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'rgba(0, 0, 0, 0.5)',
},
modalContentContainer:{
  width:'80%',
  backgroundColor:'white',
  borderRadius:Appearences.Radius.radius,
  padding:25,
  justifyContent:'center'
},
modalHeaderContainer:{
  width:'100%',
  justifyContent:'space-between',
  
  flexDirection:'row',
  alignItems:'center',
  backgroundColor:'white',
},
modalHeaderText:{
  fontSize:Appearences.Fonts.subHeadingFontSize,
  color:Appearences.Colors.black,
  fontWeight:Appearences.Fonts.headingFontWieght,

},
modalHeadingImage:{
  width:15,
  height:15,
  tintColor:Appearences.Colors.black,
},

modalHeadingText:{
  marginTop:localProps.topMargin+5,
  fontSize:Appearences.Colors.headingFontSize,
  fontWeight:Appearences.Fonts.headingFontWieght,
},
modalTextInput:{
  width:'100%',
  height:Appearences.Registration.itemHeight,
  backgroundColor:Appearences.Registration.boxColor,
  marginTop:localProps.topMargin+5,
  fontSize:Appearences.Fonts.paragraphFontSize,
  paddingStart:localProps.sidePadding,
  borderRadius:5,
  color:Appearences.Colors.black,


},



modalTextInputMultiLine:{
    minHeight:100,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      textAlignVertical: "top",
      borderRadius:5,
      color:Appearences.Colors.black,
    
      fontSize:Appearences.Fonts.headingFontSize,
      padding:15,
      marginTop:localProps.topMargin+5,
    },
modalButtonRow:{
  marginTop:localProps.topMargin+5,
  height:Appearences.Registration.itemHeight-10,
  width:'100%',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:Appearences.Radius.radius,
},
messageModalButtonRow:{
  width:'100%',
  height:Appearences.Registration.itemHeight-10,
  marginTop:localProps.topMargin,
  flexDirection:'row',
  justifyContent:'space-between',
},
messageModalProgressRow:{
  width:'100%',
  height:Appearences.Registration.itemHeight,
  marginTop:localProps.topMargin,
  justifyContent:'center',
  alignItems:'center',
},
paragraphTextWhite:{
  fontSize:Appearences.Fonts.paragraphFontSize,
  color:'white',
  fontWeight:Appearences.Fonts.headingFontWieght,
},
messageMoalButton:{
  width:'49%',
  height:'100%',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:Appearences.Radius.radius,
  backgroundColor:'white',
},
buttonTextWhite:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:'white',
  fontWeight:Appearences.Fonts.headingFontWieght,
},
buttonTextBlack:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.black,
  fontWeight:Appearences.Fonts.headingFontWieght,
},
calculatorButtonRowContainer:{
  width:'100%',
  marginTop:localProps.topMargin+5,
  flexDirection:'row',
  justifyContent:'space-between',
},
calculatorButtonContainer:{
  height:Appearences.Registration.itemHeight-10,
  width:'49%',
  alignItems:'center',
  justifyContent:'center',
  borderRadius:Appearences.Radius.radius,
},
calculationReusltContainer:{
  width:'100%',
  padding:localProps.sidePadding,
  marginTop:localProps.topMargin,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'space-between',
},
calculatedText:{
fontSize:Appearences.Fonts.headingFontSize,
},
calculatedAmount:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:'#0083c9',
},
calculatorSeperator:{
  backgroundColor:Appearences.Colors.grey,
  width:'100%',
  height:1,
},
topButtonContainer:{
  width:'100%',
  flexDirection:'row',
  justifyContent:'space-between',
},

topMargin:{
  marginTop:localProps.topMargin,
},
buttonTextStyle:{
  color:'white',
  fontSize:Appearences.Fonts.paragraphFontSize,
  

},
//Modal Styling End

videoContentContainer:{
  height:180,
  justifyContent:'center',
  marginTop:localProps.topMargin,
},
videoContent:{

  flex:1,},
videoContainerPadding:{
  paddingStart:localProps.sidePadding,
  paddingEnd:localProps.sidePadding,  
},

//Features Start
faturedRowContainer:{

  paddingStart:5,
  width:'50%',
  marginTop:5,

},
featureSection:{
   
  flexDirection:'row',
  paddingBottom:localProps.sidePadding,
},
featureItemImage:{
  width:Appearences.Fonts.paragraphFontSize+5,
  height:Appearences.Fonts.paragraphFontSize+5,

},
featureItemText:{
  marginStart:5,
  fontSize:Appearences.Fonts.paragraphFontSize+2,
  color:Appearences.Colors.grey,
},
overViewRowContainer:{
  flexDirection:'row',
  width:'100%',
  flexWrap:'wrap',
},
panel:{
  paddingStart:15,
  paddingEnd:15,
  justifyContent:'center',
  width:'100%',
  flex:1,
  backgroundColor:'white',
  marginTop:localProps.topMargin,
  paddingBottom:15,
  paddingTop:15,
},
  });
  export default styles;
  
  
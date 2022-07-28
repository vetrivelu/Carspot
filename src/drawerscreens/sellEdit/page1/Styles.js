
import React, { Component } from 'react';
import Appearences from '../../../config/Appearences';
import {
  StyleSheet,I18nManager
} from 'react-native';


  const localProps = {
     topMargin:10,
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
      alignItems:'center',
      justifyContent:'space-between'
    },
    subHeading:{
      fontSize:Appearences.Fonts.subHeadingFontSize-1,
      fontWeight:Appearences.Fonts.fontWeight,
      color:Appearences.Colors.black,
    },

    headingTextBlack:{
      fontSize:Appearences.Fonts.headingFontSize,
      color:Appearences.Colors.headingGrey,
   },
   errorImage:{
    width:25,
    height:25,
   },
   richEditorContainer:{
    borderColor:Appearences.Colors.lightGrey,
    borderWidth:1,
    width:'100%',
    height:120,
    flexDirection: 'column-reverse',
    marginTop:localProps.topMargin,
  },
  richEditorContainerError:{
    borderColor:Appearences.Colors.lightGrey,
    borderWidth:1,
    width:'100%',
    height:120,
    flexDirection: 'column-reverse',
    marginTop:localProps.topMargin,
    borderColor:'red',
    borderWidth:1,
  },
   headingTextGrey:{
    marginStart:3,
    fontSize:Appearences.Fonts.paragraphFontSize,
    color:Appearences.Colors.grey,
  },
  TextInput:{
    height:Appearences.Registration.itemHeight,
    width:"100%",
    backgroundColor:Appearences.Registration.boxColor,
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
    paddingStart:15,
    paddingEnd:15,
    marginTop:localProps.topMargin,
    paddingBottom:0,
    paddingTop:0,
    fontSize:Appearences.Fonts.headingFontSize,
    borderColor:'red',
    borderWidth:1,
    fontSize:Appearences.Fonts.headingFontSize,
    color:Appearences.Colors.headingGrey,
    borderRadius:5,
  },
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
  },

  popupViewText:{
    fontSize:Appearences.Fonts.paragraphFontSize,
  },
  popupViewImage:{
    width:Appearences.Fonts.paragraphFontSize,
    height:Appearences.Fonts.paragraphFontSize,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
    marginTop:10,

  },





// Modal Styling Start
  modal: {
   
    width: '80%',
    height:'50%',
  },

  modalHeadingTextContainer:{
    marginTop:localProps.topMargin,
    marginStart:localProps.sidePadding-6,
    paddingTop:localProps.topMargin,
    paddingBottom:localProps.topMargin,

    
  },
  seperator:{
    backgroundColor:Appearences.Colors.lightGrey,
    height:1,
    width:'100%',
    marginTop:localProps.topMargin,
  },
  modalText:{
    alignSelf:'flex-start',
    fontSize:Appearences.Fonts.headingFontSize,

    color:Appearences.Colors.grey,
  

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
radioButtonStyle:{
  alignSelf:'flex-end',
 
  },
  buttonWrapStyle:{
    width:'50%',
    justifyContent:'center',
    alignItems:'center',
    paddingEnd:localProps.sidePadding,
    
  },
  noStyle:{},
// Modal Styling End  

//picker style start

pickerContainer:{
  height:Appearences.Registration.itemHeight,
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,  
  paddingStart:15,
  paddingEnd:15,
  marginTop:localProps.topMargin,
  borderRadius:5,
  paddingBottom:0,
  paddingTop:0,
   justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row',
},
pickerContainerError:{
  height:Appearences.Registration.itemHeight,
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,  
  paddingStart:15,
  paddingEnd:15,
  marginTop:localProps.topMargin,
  paddingBottom:0,
  paddingTop:0,
   justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row',
  borderColor:'red',
  borderWidth:1,
  borderRadius:5,
},
dropDownTextStyle :{
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.headingGrey,
  paddingStart:5,
  paddingTop:5,

},
dorpdownContainerTextStyle:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.headingGrey,
  
},
dorpDownRow:{
  width:'100%',
  paddingTop:5,
  paddingStart:15,
  justifyContent:'center',
},

dorpDownStyle:{
  width:'92%',
  height:250,
  marginStart:-15,
  elevation:1,
  shadowOpacity: 0.1,

},
TextInputMultiline:{
    
  backgroundColor:Appearences.Registration.boxColor,
  fontSize:Appearences.Fonts.headingFontSize,
  minHeight: 100,
  textAlignVertical: 'top',
  maxHeight:100,
  padding:15,
  color:Appearences.Colors.headingGrey,
  borderRadius:Appearences.Radius.radius,
  marginTop:localProps.topMargin,
},
TextInputMultilineError:{
    
  backgroundColor:Appearences.Registration.boxColor,
  fontSize:Appearences.Fonts.headingFontSize,
  minHeight: 100,
  textAlignVertical: 'top',
  maxHeight:100,
  padding:15,
  color:Appearences.Colors.headingGrey,
  borderRadius:Appearences.Radius.radius,
  marginTop:localProps.topMargin,
  borderWidth:1,
  borderColor:'red',
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

fileUploadContainer:{
  width:'100%',
  height:200,
  backgroundColor:Appearences.Colors.lightGrey,
  alignItems:'center',
  justifyContent:'center',
  marginTop:localProps.topMargin,
  borderRadius:5,
},
fileUploadContainerError:{
  width:'100%',
  height:200,
  backgroundColor:Appearences.Colors.lightGrey,
  alignItems:'center',
  justifyContent:'center',
  marginTop:localProps.topMargin,
  borderWidth:1,
  borderColor:"red",
  borderRadius:5,

},
fileUploadLoaderAbsoluteContainer:{
  width:'100%',
  height:200,
  backgroundColor:'rgba(102,102,102,0.3)',
  alignItems:'center',
  justifyContent:'center',
  marginTop:localProps.topMargin,
  position:'absolute',
  zIndex:1,
},
fileListAbsoluteContainer:{
  width:'100%',
  height:200,
  backgroundColor:'transparent',
  marginTop:localProps.topMargin,
  position:'absolute',
  padding:5,
  flexWrap:'wrap',
  flexDirection:'row',
  zIndex:0,

},

fileThumb:{
  width:90,height:90,
  margin:1,
},
fileThumbAbsolute:{
  alignItems:'flex-end',
  position: 'absolute',
  width:'100%',
  height:30,
},
fileThumbCrossImage:{
  width:20,
  height:20,
  resizeMode:'cover',
},
fileUploadText:{
  color:Appearences.Colors.headingGrey,
  fontSize:Appearences.Fonts.headingFontSize+10,
  fontWeight:'bold',
},
image:{resizeMode:'cover', width:90,height:90,},


main: {
  flex: 1,
  alignItems: 'stretch',
},
toolbarButton: {
  fontSize: 20,
  width: 28,
  height: 28,
  textAlign: 'center'
  
},
italicButton: {
  fontStyle: 'italic'
},
boldButton: {
  fontWeight: 'bold'
},
underlineButton: {
  textDecorationLine: 'underline'
},
lineThroughButton: {
  textDecorationLine: 'line-through'
},


});
export default styles;


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
  TextInputDate:{
    height:Appearences.Registration.itemHeight,
    width:"100%",
    backgroundColor:Appearences.Registration.boxColor,
    paddingStart:15,
    paddingEnd:15,
    marginTop:localProps.topMargin,
    paddingBottom:0,
    paddingTop:0,
    justifyContent:'center',
    borderRadius:5,

  },   TextInputDateError:{
    height:Appearences.Registration.itemHeight,
    width:"100%",
    backgroundColor:Appearences.Registration.boxColor,
    paddingStart:15,
    paddingEnd:15,
    marginTop:localProps.topMargin,
    paddingBottom:0,
    paddingTop:0,
    justifyContent:'center',
    borderColor:'red',
    borderWidth:1,
    borderRadius:5,

  },






    headingTextContainer:{
      flexDirection:'row',
      marginTop:localProps.topMargin,
      alignItems:'center',
      justifyContent:'space-between',
    },
    errorImage:{
      width:25,
      height:25,
     },
     subHeading:{
      fontSize:Appearences.Fonts.subHeadingFontSize-1,
      fontWeight:Appearences.Fonts.fontWeight,
      color:Appearences.Colors.black,
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
      borderRadius:5,
      color:Appearences.Colors.headingGrey,
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
      borderColor: 'red',
      borderWidth:1,
      borderRadius:5,
      color:Appearences.Colors.headingGrey,
    },
  richEditorContainer:{
    borderColor:Appearences.Colors.lightGrey,
    borderWidth:1,
    width:'100%',
    height:120,
    flexDirection: 'column-reverse',
    marginTop:localProps.topMargin,
  },    richEditorContainerError:{
    borderColor:Appearences.Colors.lightGrey,
    borderWidth:1,
    width:'100%',
    height:120,
    flexDirection: 'column-reverse',
    marginTop:localProps.topMargin,
    borderColor:'red',
    borderWidth:1,
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
    paddingBottom:0,
    paddingTop:0,
     justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:5,
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
    paddingBottom:5,
    
  },
  dorpdownContainerTextStyle:{
    fontSize:Appearences.Fonts.headingFontSize,
    color:Appearences.Colors.headingGrey,
  },
dorpDownRow:{
  width:'100%',
  paddingTop:5,
  marginStart:15,
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


//picker style end

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


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
    justifyContent:'space-between',
  },
  
 

  featuresContainer:{
    width:'100%',
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:localProps.topMargin,
  },

  featuresContainerError:{
    width:'100%',
    flexDirection:'row',
    flexWrap:'wrap',
    borderColor:'red',
    borderWidth:1,
    marginTop:localProps.topMargin,
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
    marginTop:5,
    fontSize:Appearences.Fonts.headingFontSize,
    borderColor: 'red',
    borderWidth:1,    
    color:Appearences.Colors.headingGrey,
    borderRadius:5,
  },


  checkBox:{
    width:'44%',  
    padding:0,
    margin:0,
    borderWidth:0,
    borderRadius:0,
    backgroundColor:null,
    marginTop:10, 
    marginStart:-0.5,   
  },
  checkBoxText:{

    fontSize:Appearences.Fonts.headingFontSize,
    color:Appearences.Colors.headingGrey,
    fontWeight:'normal',
  },


    image:{resizeMode:'cover', width:50,height:50,},
 


    // Modal Style Start

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
  fontSize:Appearences.Fonts.headingFont,
  color:Appearences.Colors.headingGrey,
  
},
dorpDownRow:{
  width:'100%',
  paddingTop:5,
  paddingStart:15,
  justifyContent:'center',
},

dorpDownStyle:{
  height:250,
  width:'92%',
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
popupViewImage:{
  width:Appearences.Fonts.paragraphFontSize,
  height:Appearences.Fonts.paragraphFontSize,
  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  marginTop:10,

},
    //Modal Style End
    // Rich Editor Stying Start//

    


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

    //Rich Editor Stying  End//
    subHeading:{
      fontSize:Appearences.Fonts.subHeadingFontSize-1,
      fontWeight:Appearences.Fonts.fontWeight,
      color:Appearences.Colors.black,
    },

    purchasePakcageRowGrey:{
      width:'100%',
      height:Appearences.Registration.itemHeight,
      backgroundColor:Appearences.Colors.grey,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:localProps.topMargin,
      paddingStart:localProps.sidePadding,
      paddingEnd:localProps.sidePadding,
    },
    cautionImage:{
      width:20,
      height:20,
      resizeMode:'cover',
    },
    purchasePakcageRowLightGrey:{
      width:'100%',
      height:Appearences.Registration.itemHeight,
      backgroundColor:Appearences.Colors.lightGrey,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:localProps.topMargin,
      paddingStart:localProps.sidePadding,
      paddingEnd:localProps.sidePadding,
    },
    
 


  });
export default styles;
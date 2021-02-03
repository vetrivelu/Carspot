
import React, { Component } from 'react';
import Appearences from '../../../config/Appearences';
import {
  StyleSheet,I18nManager
} from 'react-native';
import { App } from 'react-native-firebase';
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
headingTextBlack:{
  fontWeight:Appearences.Fonts.headingFontWieght,
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.headingGrey,
},
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
  
        //Modal Style End
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
        errorImage:{
  width:25,
  height:25,
 },

maptContainer:{
  height:200,
  justifyContent:'center',
  marginTop:localProps.topMargin,
},
videoContent:{
  
  flex:1,},

PopupViewContainer:{
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

PopupViewContainerError:{
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
popupViewImage:{
  width:Appearences.Fonts.paragraphFontSize,
  height:Appearences.Fonts.paragraphFontSize,
  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],

},
popupViewText:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.headingGrey,
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
  color:Appearences.Colors.headingGrey,
  borderRadius:5,
  borderColor: 'red',
  borderWidth:1,
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
  color:Appearences.Colors.grey,
  

},

modalSubText:{

fontSize:Appearences.Fonts.paragraphFontSize,

color:Appearences.Colors.grey,

},

AccordionradioLabelStyle:{
  fontSize: Appearences.Fonts.paragraphFontSize,
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
countriesContainer:{
 
  width:'100%',
 
  
 
},
contriesItemContainer:{

 flex:1,
  
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
  countryModalSubmitButtonContainer:{
    height:40,
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
  },

noStyle:{},


// Modal Styling End 


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
featuredBuyButtonContainer:{
  height:30,
  minWidth:50,
  alignItems:'center',
  justifyContent:'center',
  borderRadius:5,
},
headingTextWhite:{
fontSize:Appearences.Fonts.headingFontSize,
color:'white',
fontWeight:Appearences.Fonts.headingFontWieght,
},
subHeading:{
  fontSize:Appearences.Fonts.subHeadingFontSize-1,
  fontWeight:Appearences.Fonts.fontWeight,
  color:Appearences.Colors.black,
},
// new code
adOnsContentContainer:{
  padding:10,
  width:'100%',
  borderWidth:1,
  borderColor:Appearences.Colors.lightGrey,
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center',
  marginTop:localProps.topMargin,
},
paragraphTextGreyAdOns:{
  color:Appearences.Colors.grey,
  marginTop:10,
  fontSize:Appearences.Fonts.paragraphFontSize,
  fontWeight:Appearences.Fonts.headingFontWieght,
},
adOnsButton:{
  padding:5,
  borderRadius:5,
  alignItems:'center',
  justifyContent:'center',
  marginTop:localProps.topMargin/2,
},
adOnsButtonText:{
  fontSize:Appearences.Fonts.paragraphFontSize,
  color:'white',
  fontWeight:Appearences.Fonts.headingFontWieght,
},
adOnsLeftContainer:{
flex:1,
},
adOnsRightContainer:{
alignItems:'flex-end',
justifyContent:'center',
flex:1,
},
adOnsRightInnerContainer:{
  alignItems:'center',
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
  subHeadingText:{
    color:Appearences.Colors.headingGrey,
    fontSize:Appearences.Fonts.subHeadingFontSize,
    marginTop:localProps.topMargin,
    fontWeight:Appearences.Fonts.headingFontWieght,
  
  },
  row:{
    flexDirection:'row',
                marginTop:5,
  },
  sliderImage:{
    tintColor:'#999999',
    resizeMode:'center',
  },
  modaBoxInnerContainer:{
    backgroundColor:Appearences.Colors.appBackgroundColor,
    marginTop:15,
    height:200,
    borderRadius:Appearences.Radius.radius,
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
});
export default styles;

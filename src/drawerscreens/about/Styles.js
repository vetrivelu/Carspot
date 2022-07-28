

import React, { Component } from 'react';
import Appearences from '../../config/Appearences';

import {
  StyleSheet,I18nManager
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
   
formHeadingContainer:{
  flexDirection:'row',
},
bodyHeadingBlack:{
  fontSize:Appearences.Fonts.subHeadingFontSize,
  color:Appearences.Colors.black,
  marginTop:localProps.topMargin+5,
  fontWeight:Appearences.Fonts.headingFontWieght,
  
},


paragraphTextWithTopMargin:{
  color:Appearences.Colors.headingGrey,
  fontSize:Appearences.Fonts.headingFontSize,
  marginTop:localProps.topMargin+localProps.topMargin,
  lineHeight:20,
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
    transform: [{ rotate: I18nManager.isRTL ? '-90deg' : '90deg'}]
   },
   accordingContainer:{
     marginTop:localProps.topMargin,
   },
   sectionContainer:{
      width:'100%',
      padding:5,
      marginTop:localProps.topMargin,
  },
  accordionBacground:{
    backgroundColor:Appearences.Colors.appBackgroundColor,
    borderRadius:Appearences.Radius.radius,
    padding:10,
  },

  paragraphText:{
      color:Appearences.Colors.headingGrey,
      fontSize:Appearences.Fonts.headingFontSize,
    alignSelf: 'flex-start',
    },
  //Accordin Styling End

    });

  export default styles;
  
  
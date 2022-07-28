
import React, { Component } from 'react';
import Appearences from '../../../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:5,
  dataRowNumberFontSize:12,
  sidePadding:15,

}
const styles = StyleSheet.create({
     headingContainer:{
      
      marginTop:localProps.bodyTopMargin,
  
    },
    bodyHeadingBlack:{
      fontSize:Appearences.Fonts.subHeadingFontSize,
      fontWeight:Appearences.Fonts.headingFontWieght,
      color:Appearences.Colors.black,
    },
    dateRowContainer:{
      marginTop:localProps.topMargin,
      flexDirection:'row',
    },
    bodyHeadingAppColor:{
      fontFamily:Appearences.Fonts.headingFont,
      fontSize:Appearences.Fonts.headingFontSize,
    },

    container:{
      paddingStart:localProps.sidePadding,
      paddingEnd:localProps.sidePadding,
    },
    flastListItemContainer:{
      
   //   width:'100%',
      marginTop:5,
    
      backgroundColor:'white',
      flexDirection:'row',
      borderRadius:Appearences.Radius.radius,    
    },
    flatListBackgroundImageContainer:{
      width:'35%',
      borderBottomLeftRadius:Appearences.Radius.radius,
      borderTopLeftRadius:Appearences.Radius.radius,
      overflow:'hidden', 
    },
     flatListBackgroundImage:{
      flex:1,
      resizeMode:'cover',
      borderBottomLeftRadius:Appearences.Radius.radius,
      borderTopLeftRadius:Appearences.Radius.radius,
     },
    
    flatListContentContainer:{
                 
                  width:'65%',
    },
    flatListContentRow1:{
      width:'100%',
      flexDirection:'row',
    },
    flatListContentRow1Text:{
      fontSize:Appearences.Fonts.paragraphFontSize,
      fontFamily:Appearences.Fonts.paragaphFont,
      color:Appearences.Colors.grey,
    },
   
  
    menuItemSperator:{
      height:1,
      width:'100%',
      backgroundColor:Appearences.Colors.lightGrey,
    },
    flatListItemHeadingText:{
      color:Appearences.Colors.black,
      fontWeight:Appearences.Fonts.headingFontWieght,
      fontSize:Appearences.Fonts.headingFontSize,
      marginTop:localProps.topMargin,
      alignSelf: 'flex-start',
    },
    flatListItemMileageText:{
      color:Appearences.Colors.grey,
      fontFamily:Appearences.Fonts.paragaphFont,
      fontSize:Appearences.Fonts.paragraphFontSize,
      marginTop:localProps.topMargin,
      alignSelf: 'flex-start',


    },
    flatListItemPriceText:{
      fontFamily:Appearences.Fonts.paragaphFont,
      fontSize:Appearences.Fonts.paragraphFontSize,
      marginTop:localProps.topMargin,
      alignSelf: 'flex-start',


    },
    flatListItemBottomRowContainer:{
      flexDirection:'row',
      justifyContent:'space-between',

    },
    flatListBottomLeftContainer:{
      flexDirection:'row',
      paddingStart:15,
      paddingBottom:5,
      paddingTop:5,
      paddingEnd:5,
      justifyContent:'center',

    },
    flatListBottomLeftText:{
      color:Appearences.Colors.grey,
      fontFamily:Appearences.Fonts.paragaphFont,
      fontSize:Appearences.Fonts.paragraphFontSize-1,
      marginStart:5,
      
    },
    flatListBottomLeftImage:{
     width:Appearences.Fonts.paragraphFontSize-1,
     height:Appearences.Fonts.paragraphFontSize-1,
     marginTop:2, 
    },
    
    });
  export default styles;
  
  

import React, { Component } from 'react';
import Appearences from '../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:5,
  dataRowNumberFontSize:12,
  sidePadding:10,

}
const styles = StyleSheet.create({
  

     container:{
         paddingStart:localProps.sidePadding,
         paddingEnd:localProps.sidePadding,
     },
     paragraphText:{
         color:Appearences.Colors.grey,
         fontSize:Appearences.Fonts.paragraphFontSize,
         marginTop:localProps.topMargin,
        },
     headingText:{
        color:Appearences.Colors.black,
        fontSize:Appearences.Fonts.subHeadingFontSize,
        marginTop:localProps.topMargin,
        fontWeight:Appearences.Fonts.headingFontWieght,

     },
     headingTextWhite:{
        color:'white',
        fontSize:Appearences.Fonts.headingFontSize,
     },
     listRowContainer:{
        flexDirection:'row',
        width:'100%',
        flexWrap:'wrap',
       
       
        },
     listItemContainer:{
      width:'47%',

         marginHorizontal: 5,
         backgroundColor:'white',
        marginTop:localProps.topMargin,
        borderRadius:Appearences.Radius.radius,
        },
        imageContainer:{
            borderTopLeftRadius:Appearences.Radius.radius,
            borderTopRightRadius:Appearences.Radius.radius,
            overflow: 'hidden',
        },
        image:{
           width:'100%',
           height:150,
            resizeMode:'cover',
            borderTopLeftRadius:Appearences.Radius.radius,
            borderTopRightRadius:Appearences.Radius.radius,
        },
        contentContainer:{
            paddingStart:localProps.sidePadding,
            paddingEnd:localProps.sidePadding,
            paddingBottom:localProps.sidePadding,
            alignItems:'flex-start',
            justifyContent:'center',
        },
        buttonContainer:{
            padding:5,
            alignItems:'center',
            justifyContent:'center',
            marginTop:localProps.topMargin,
            
           
            
        },
    });

  export default styles;
  
  
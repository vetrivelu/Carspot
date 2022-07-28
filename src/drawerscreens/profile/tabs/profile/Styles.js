
import React, { Component } from 'react';
import Appearences from '../../../../config/Appearences';

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
  flatListContainer:{
    paddingStart:11,paddingEnd:11,
  },
     container:{
         paddingStart:15,
         paddingEnd:15,
         paddingBottom:15,
     },
     panel:{
       
        backgroundColor:'white',
            borderRadius:Appearences.Radius.radius,
            paddingStart:5,
            paddingEnd:5,
            paddingTop:10,
            paddingBottom:10,
    },

     headingContainer:{
        paddingStart:localProps.sidePadding,
        paddingEnd:localProps.sidePadding,
        marginTop:localProps.bodyTopMargin,
        width:'100%',
        flexDirection:'row',
        
      },
    
      
      headingText:{
        fontSize:Appearences.Fonts.subHeadingFontSize,
        fontWeight:Appearences.Fonts.headingFontWieght,
        color:Appearences.Colors.black,
      },
  
      overviewContentRownContainer:{
        marginTop:15,
        flexDirection:'row',
       
       
      },
      overviewContetHeading:{
        fontSize:Appearences.Fonts.headingFontSize,
        fontFamily:Appearences.Fonts.headingFont,
        color:Appearences.Colors.black,
        flex:1,
      },
      overViewContentText:{
        fontSize:Appearences.Fonts.headingFontSize,
        fontFamily:Appearences.Fonts.headingFont,
        color:Appearences.Colors.grey,
        flex:1,
      },
      overViewSeperator:{
        backgroundColor:Appearences.Colors.lightGrey,
        width:'100%',
        height:1,
        marginTop:localProps.topMargin,
    },
    noStyle:{
      
  },


  modalContainer:{
    flex:1,
    padding:15,
    width:"100%",
    height:"100%",
    flexDirection:"row",
    backgroundColor: 'rgba(0,0,0,0.5)',
    position:"absolute",
    alignItems:"center",
    
   
  },
  modalInnerContainer:{
    padding:25,
    backgroundColor:'white',
    height:200,
    flex:1,
    
  },
  modalTitle:{
    color:Appearences.Registration.textColor,
//fontFamily:Appearences.Fonts.paragaphFont,
    fontSize:13,

  },

    });

  export default styles;
  
  
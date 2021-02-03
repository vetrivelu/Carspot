
import React, { Component } from 'react';
import Appearences from '../../../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:10,
  dataRowNumberFontSize:12,
  sidePadding:15,

}
const styles = StyleSheet.create({
  

     container:{
         paddingStart:localProps.sidePadding,
         paddingEnd:localProps.sidePadding,
     },
     loadMoreButtonContainer:{
       width:'100%',
       alignItems:'center',
       marginTop:localProps.topMargin,
     },
     loadMoreButton:{
      borderRadius:3,
      paddingTop:5,
      paddingBottom:5,
      paddingStart:10,
      paddingEnd:10,
      alignItems:'center',
      justifyContent:'center',
      },
      
      loadMoreButtonText:{
        color:'white',
        fontWeight:Appearences.Fonts.headingFontWieght,
        fontSize:Appearences.Fonts.headingFontSize,
      },

     pageTitle:{
       fontSize:Appearences.Fonts.headingFontSize+2,
       color:Appearences.Colors.black,
       marginTop:localProps.topMargin,
     },
     wideSeperator:{
       width:30,
       height:1,
       marginTop:localProps.topMargin,
       backgroundColor:'black',
     },
     narrowSeperator:{
       width:20,
       height:1,
       marginTop:2,
       backgroundColor:'black',

     },
     headingTextBlack:{
       fontSize:Appearences.Fonts.headingFontSize,
       color:Appearences.Colors.black,
       marginTop:localProps.topMargin-5,
     },
     paragraphTextGrey:{
       color:Appearences.Colors.grey,
       fontSize:Appearences.Fonts.paragraphFontSize,
       marginTop:5,
     },
     paragraphTextBlack:{
       color:Appearences.Colors.black,
       fontSize:Appearences.Fonts.paragraphFontSize,
       fontWeight:'bold',
       marginTop:localProps.topMargin-10,
       flex:1,
      },
      subHeadingTextGrey:{
        color:Appearences.Colors.grey,
        fontSize:Appearences.Fonts.paragraphFontSize+1,
        marginTop:localProps.topMargin-5,
      },
      
      panel:{
        paddingStart:15,
        paddingEnd:15,
        justifyContent:'center',
        width:'92%',
        alignSelf:'center',
        flex:1,
        backgroundColor:'white',
        marginTop:localProps.topMargin,
        paddingBottom:15,
        paddingTop:15,
      },
    // Flat list styling start
      flatListContainer:{
        flexDirection:'row',
        width:'100%',
        marginTop:localProps.topMargin,
      },
      ratinCountBox:{
        flex:1,
        height:55,
        backgroundColor:Appearences.Colors.black,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:Appearences.Radius.radius,
        marginTop:6.5,
      },
      ratingCountText:{
        color:'white',
        fontSize:Appearences.Fonts.headingFontSize+2,
      },
      flatListContentContiner:{
        marginStart:10,
        flex:4,
        
      },
      title:{
        fontSize:Appearences.Fonts.subHeadingFontSize,
        color:Appearences.Colors.black,
        fontWeight:Appearences.Fonts.headingFontWieght,
        alignSelf:'flex-start',
      },
      subHeading:{
        fontSize:Appearences.Fonts.headingFontSize,
        color:Appearences.Colors.black,
        fontWeight:Appearences.Fonts.headingFontWieght,
        marginTop:localProps.topMargin,
        alignSelf:'flex-start',
      },
      row:{        
      flexDirection:'row',
      marginTop:localProps.topMargin-5,
    },
    switchRow:{        
      flexDirection:'row',
      marginTop:localProps.topMargin,
      justifyContent:'space-between',
    },


      startContainer:{
        marginTop:localProps.topMargin-5,
      },
    
      lineSeperator:{
        height:1,
        width:'100%',
        backgroundColor:Appearences.Colors.lightGrey,
        marginTop:localProps.topMargin,
      },
    //Flat list styling End
    TextInput:{
      height:Appearences.Registration.itemHeight,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      flexDirection:'row',
      paddingStart:15,
      paddingEnd:15,
      marginTop:localProps.topMargin,
      paddingBottom:0,
      paddingTop:0,
      fontSize:Appearences.Fonts.headingFontSize,
      color:Appearences.Colors.black,
      borderRadius:5,
    },
    TextInputError:{
      height:Appearences.Registration.itemHeight,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      flexDirection:'row',
      paddingStart:15,
      paddingEnd:15,
      marginTop:localProps.topMargin,
      paddingBottom:0,
      paddingTop:0,
      fontSize:Appearences.Fonts.paragraphFontSize,
      borderColor:'red',
      borderWidth:1,
      color:Appearences.Colors.black,
    },

    startBorderRow:{
      height:Appearences.Registration.itemHeight,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      flexDirection:'row',
      alignItems:'center',
      paddingStart:15,
      paddingEnd:15,
      marginTop:localProps.topMargin,
      paddingBottom:0,
      paddingTop:0,
      borderRadius:5,
    },
    startTextBlack:{
      fontSize:Appearences.Fonts.headingFontSize-1,
      color:Appearences.Colors.black,
      fontWeight:Appearences.Fonts.headingFontWieght,
     },
     textArea:{
      minHeight:100,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      textAlignVertical: "top",
      padding:15,
      marginTop:localProps.topMargin,
      marginBottom:localProps.topMargin,
      
      fontSize:Appearences.Fonts.headingFontSize,
      borderRadius:5,
    },
    textAppGrey:{
      fontSize:Appearences.Fonts.headingFontSize,
      color:Appearences.Colors.headingGrey,
      marginTop:localProps.topMargin,
      alignSelf:'flex-start',
    },
    textAreaError:{
      minHeight:100,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      textAlignVertical: "top",
   
      marginTop:localProps.topMargin,
      marginBottom:localProps.topMargin,
     padding:15,
      fontSize:Appearences.Fonts.headingFontSize,
      borderColor:'red',
      borderWidth:1,
      borderRadius:5,

    },
    buttonRow:{
      width:'100%',
      height:Appearences.Registration.itemHeight-10,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:5,
      marginTop:localProps.topMargin,
    },
    progressRow:{
      width:'100%',
      height:Appearences.Registration.itemHeight,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:5,
      marginTop:localProps.topMargin,
    },
    headingTextWhite:{
      color:'white',
      fontSize:Appearences.Fonts.headingFontSize,
    },

    });
export default styles;
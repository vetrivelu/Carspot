
import React, { Component } from 'react';
import Appearences from '../../../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:15,
  dataRowNumberFontSize:12,
  sidePadding:15,

}
const styles = StyleSheet.create({
  

     container:{
        paddingStart:15,
        paddingEnd:15,
     },

     panel:{
       padding:10,
       borderRadius:Appearences.Radius.radius,
        
       backgroundColor:'white',
       marginTop:5,
     },

     titleTextContainer:{
         flexDirection:'row',
      
        },
        manageText:{

          fontSize:Appearences.Fonts.subHeadingFontSize,
          fontWeight:Appearences.Fonts.headingFontWieght,

          color:Appearences.Colors.black,
         
       },
     headingTextBlack:{

        fontSize:Appearences.Fonts.headingFontSize,
        fontWeight:Appearences.Fonts.headingFontWieght,
        alignSelf:'flex-start',
        color:Appearences.Colors.black,
        marginTop:localProps.topMargin,
        
     },
    
    
     

     fileUploadContainer:{
      height:Appearences.Registration.itemHeight,
      width:"100%",
      backgroundColor:Appearences.Registration.boxColor,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingStart:15,
      paddingEnd:15,
      marginTop:10,
      paddingBottom:0,
      paddingTop:0,
      borderRadius:Appearences.Radius.radius,
    },
    containerFont:{
      fontSize:Appearences.Fonts.headingFontSize,
      color:Appearences.Colors.headingGrey,
    },
    maptContainer:{
      height:200,
      justifyContent:'center',
      marginTop:localProps.topMargin,
    },
    videoContent:{
      
      flex:1,},
     TextInput:{
        height:Appearences.Registration.itemHeight,
        width:"100%",
        backgroundColor:Appearences.Registration.boxColor,
        borderRadius:5,
        paddingStart:15,
        paddingEnd:15,
        marginTop:10,
        paddingBottom:0,
        paddingTop:0,
        fontSize:Appearences.Fonts.headingFontSize,
        color:Appearences.Colors.headingGrey,
      },
      TextArea:{
        minHeight:100,
        width:"100%",
        backgroundColor:Appearences.Registration.boxColor,
        textAlignVertical: "top",
        padding:15,
        marginTop:localProps.topMargin,
        borderRadius:5,
        fontSize:Appearences.Fonts.headingFontSize,
        color:Appearences.Colors.headingGrey,
      },
  
      forgotPasswordText:{
        fontSize:Appearences.Fonts.headingFontSize,
        fontWeight:Appearences.Fonts.headingFontWieght,
        alignSelf:'flex-start',
        marginTop:localProps.topMargin,
      },
      buttonRow:{
    
        width:"100%",
        justifyContent:'center',
        alignItems:'center',
        marginTop:15,
        
        
      },
      topMargin:{
        marginTop:localProps.topMargin,
      },
    button:{
        width:'100%',
        padding:10,
        height:Appearences.Registration.itemHeight-10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
      },
      buttonTextStyle:{
        color:'white',
        fontSize:Appearences.Fonts.headingFontSize,
        fontWeight:Appearences.Fonts.headingFontWieght,
      },


      modalContainer:{
        flex:1,
        padding:10,
        width:"100%",
        height:"100%",
        flexDirection:"row",
        backgroundColor: 'rgba(0,0,0,0.5)',
        position:"absolute",
        alignItems:"center",

       
      },
      modalCloseContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
      },
  
      modalCloseImage:{
        width:20,
        height:20,
        marginTop:5,
        marginEnd:5,
      },
      modalInnerContainer:{
        backgroundColor:'white',
        flex:1,
        borderRadius:Appearences.Radius.radius,
      },
      modalPadding:{
        paddingStart:10,
        paddingEnd:10,
        paddingBottom:5,
      },
      modalTitle:{
        color:Appearences.Colors.headingGrey,
        fontWeight:Appearences.Fonts.headingFontWieght,
        fontSize:Appearences.Fonts.subHeadingFontSize,
    
      },
    

      sinupButtonRow:{
        
        width:"100%",
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:localProps.topMargin,
         
      },
      signupButton:{
        flex:5,
        padding:10,
        height:Appearences.Registration.itemHeight-10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        
      },
   

    });

  export default styles;
  
  
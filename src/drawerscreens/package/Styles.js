
import React, { Component } from 'react';
import Appearences from '../../config/Appearences';

import {
  StyleSheet,I18nManager
} from 'react-native';
const localProps = {
   topMargin:15,
 
  sidePadding:15,

}
const styles = StyleSheet.create({
  

     container:{
//         padding:localProps.sidePadding,
         paddingStart:localProps.sidePadding,
         paddingRight:localProps.sidePadding,
         marginTop:18,
         alignItems:'center', 
       width:'100%',
       justifyContent:'center',
flex:1,        
     },
     cardParent:{
       width:'100%',
       
      alignItems:'center',
      },
   
    title:{
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.headingFontSize+5,
    },
    subTitle:{
      color:Appearences.Colors.black,
      marginTop:localProps.topMargin,
      alignSelf:'flex-start',
    },
row:{
  flexDirection:'row',
  marginTop:localProps.topMargin,
  alignItems:'center',
},
checkbox:{
  width:Appearences.Fonts.paragraphFontSize,
  height:Appearences.Fonts.paragraphFontSize,
  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],

},

fromDateDropdownContainer:{
  height:'100%',
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,  
  paddingStart:15,
  paddingEnd:15,
  paddingBottom:0,
  paddingTop:0,
   justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row',
},
dorpDownStyle:{
  width:'25%',
  height:100,
},
dropDownTextStyle :{
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.grey,
  paddingBottom:5,
  paddingStart:15,
  marginTop:5,
},
dorpdownContainerTextStyle:{
  fontSize:Appearences.Fonts.paragraphFontSize,
  color:Appearences.Colors.grey,
  
},
dorpDownRow:{
  width:'100%',
 
  justifyContent:'center',
},


price:{
      fontSize:Appearences.Fonts.headingFontSize+12,
      fontWeight:'bold',
},
buttonContainer:{
  alignSelf:'center',
  marginTop:localProps.topMargin,
  zIndex:0,
  borderRadius:Appearences.Radius.radius,
  paddingStart:20,
  paddingEnd:20,
  paddingTop:10,
  paddingBottom:10,
},
buttonText:{
  color:'white',
  fontSize:Appearences.Fonts.paragraphFontSize+2,
  fontWeight:Appearences.Fonts.headingFontWieght,
},
currency:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.grey,
  alignSelf:'flex-start',
  marginStart:5,
},
packageText:{
  fontSize:Appearences.Fonts.paragraphFontSize+2,
  color:Appearences.Colors.grey,
  marginStart:5,
  },

    cardContainerOverlay:{
      width:'100%',
      height:'100%',
      position:'absolute',
      flexDirection:'row',
      zIndex:-1,
    },

    boxOverlayMiddle:{
      height:'100%',
      width:'90%',
      alignItems:'flex-end',
      backgroundColor:'white',
    },

    overlaySides:{
      width:'10%',
      height:'100%',
      backgroundColor:'#f4f6fa',
     
    },
    overlayMiddle:{
      width:'80%',
      height:'100%',
      backgroundColor:'transparent',
    },
    cardContainer:{
      width:'70%',
      height:'100%',
      borderRadius:Appearences.Radius.radius,
      padding:localProps.sidePadding,
      backgroundColor:'white',
      alignItems:'center',
    },

 
 
    });

  export default styles;
  
  
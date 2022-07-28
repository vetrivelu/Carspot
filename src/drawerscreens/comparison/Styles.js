
import React, { Component } from 'react';
import Appearences from '../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:5,
  dataRowNumberFontSize:12,
  sidePadding:8,

}
const styles = StyleSheet.create({
  

     container:{
         paddingStart:localProps.sidePadding,
         paddingEnd:localProps.sidePadding,
     },
   listItemContainer:{
       height:150,
       flexDirection:'row',
        borderRadius:Appearences.Radius.radius,    
       marginTop:localProps.topMargin+5,
       padding:5,            
       marginVertical:5,
       marginHorizontal: 5,
       backgroundColor:'white',
     
    },

   listContentContainer:{
       width:'45%',
       height:'100%',
       justifyContent:'center', 
       alignItems:'center', 
     
   },
   listMiddleContainer:{
       width:'10%',
       height:'100%',
      
       alignItems:'center',
       justifyContent:'center',
   },
   circle: {
    width: 30,
    height: 30,
    borderRadius: 30/2,
    backgroundColor: Appearences.Colors.grey,
    alignItems:'center',
    justifyContent:'center',
    padding:5,
},
vsText:{
    color:'white',
    fontSize:Appearences.Fonts.headingFontSize,
    fontSize:10,

},

imageContaner:{
    width:'80%',
    height:'50%',
},
image:{
    resizeMode:'contain',
    width:'100%',
    height:'100%',
},
ratingBarContainer:{
    flexDirection:'row',

},
heaedrText:{
       
    fontSize:Appearences.Fonts.headingFontSize,
    color:Appearences.Colors.black,
},

bottomRowContainer:{
    width:'100%',
    height:'30%',
    alignItems:'center',
    justifyContent:'center',
},
    });

  export default styles;
  
  
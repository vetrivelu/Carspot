
import React, { Component } from 'react';
import Appearences from '../../config/Appearences';
import {
    StyleSheet,
  } from 'react-native';
  const localProps = {
     topMargin:5,
    sidePadding:10,
  
  };
const styles = StyleSheet.create({
 
  container:{
    backgroundColor:'white',
    height:'100%',  
    paddingStart:localProps.sidePadding,
    paddingEnd:localProps.sidePadding, 
},
gridContainer:{
    width:'100%',
    height:200,
    
    marginTop:localProps.topMargin,
    borderRadius:Appearences.Radius.radius,
    backgroundColor:'white',
    overflow:'hidden',

},
gridBackgroundImage:{
    width:'100%',
    height:'100%',
    resizeMode:'cover',
    flex:1,
},
overlay:{
    width:'100%',
    height:'100%',
    position:'absolute',
    backgroundColor:'rgba(0, 0, 0, 0.5)',

    
},



topContainer:{
    flexDirection:'row',
    alignItems:'flex-start',
    height:'50%',
  
},
bottomContainer:{
    flexDirection:'row',
    height:'50%',
    alignItems:'flex-end',
    paddingStart:5,
    paddingBottom:5,
},

topTextContainer:{
   padding:5,
   paddingTop:5,
   paddingBottom:5,
   paddingStart:10,
   paddingEnd:10,
   
},

bottomTextContainer:{
    padding:5,

},
text:{
    color:'white',
    fontSize:Appearences.Fonts.headingFontSize,
},
});
export default styles;

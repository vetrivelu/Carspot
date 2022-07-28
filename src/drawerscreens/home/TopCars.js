
import React, { Component } from 'react';
import Appearences from '../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:5,
  dataRowNumberFontSize:12,

}
  const styles = StyleSheet.create({

    container:{
        width:250,
        backgroundColor:Appearences.Colors.lightGrey,
        alignItems:'center',
        padding:15,
        elevation   : Appearences.Shadow.elevation,
        shadowOpacity: Appearences.Shadow.shadow,
        marginVertical: 5,
        marginHorizontal: 1,
    
      },
    image:{
    width:'100%',
      height:150,
      resizeMode:'contain',
      
    },
    image2:{
      width:'100%',
        height:150,
        marginTop:5,
        resizeMode:'contain',
      },
    starRowContainer:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'center',
      marginTop:5,
    },
    ratingCount:{
      fontFamily:Appearences.Fonts.paragaphFont,
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.headingFontSize,
      marginStart:3,
     

    },
    titleText:{
      fontFamily:Appearences.Fonts.paragaphFont,
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.headingFontSize,
      marginTop:5,
    },
    vsContainer:{
      width:30,
      height:30,
      marginTop:5,
      borderRadius: 100/2,
      backgroundColor: Appearences.Colors.grey,
      alignItems:'center',
      justifyContent:'center',
     
  },



  container:{

},
listItemContainer:{
  height:150,
  flexDirection:'row',
  width:'100%',    
  marginTop:localProps.topMargin+5,
  padding:5,            
  marginVertical:5,
  backgroundColor:'white',
//  elevation   : Appearences.Shadow.elevation,
 //shadowOpacity: Appearences.Shadow.shadow,
  borderRadius:Appearences.Radius.radius,
  
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
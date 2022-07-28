

import React, { Component } from 'react';
import Appearences from '../../../config/Appearences';

import {
  StyleSheet,
  I18nManager,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:10,
  dataRowNumberFontSize:12,
  sidePadding:15,

}
const styles = StyleSheet.create({
  

     container:{
        padding:localProps.sidePadding,
     },
     headerImageContainer:{
        
     },
     modalContainer:{
       borderRadius:Appearences.Radius.radius,
       backgroundColor:'white',
     },
     modal: {
      borderRadius:Appearences.Radius.radius,
      width: '90%',
      padding:20,
      height:250,
      justifyContent:'center',
    },
    
     headerImage:{
        width:'100%',
         height:200,

         resizeMode:'cover',
     },
     noCommentContainer:{
       alignItems:'center',
       justifyContent:'center',
       width:'100%',
       height:100,
       marginTop:localProps.topMargin,
       backgroundColor:Appearences.Colors.lightGrey,
     },
     loadMoreButtonContainer:{
    
      alignItems:'center',
      justifyContent:'center',
     },
     loadMoreTextContainer:{
       padding:5,
       alignItems:'center',
       justifyContent:'center',
       borderRadius:8,
       marginTop:localProps.topMargin,
       borderRadius:3,
       paddingTop:5,
       paddingBottom:5,
       paddingStart:10,
       paddingEnd:10,
     },
     loadMoreText:{
       fontSize:Appearences.Fonts.paragraphFontSize,
       color:'white',
     },
     noCommentText:{
      color:Appearences.Colors.grey,
      fontSize:Appearences.Fonts.paragraphFontSize,
     },
     noImageStyle:{
      width:'100%',
       height:200,
      marginTop:localProps.topMargin,
       resizeMode:'contain',
   },
     dateCommentContainer:{
       flexDirection:'row',
       marginTop:localProps.topMargin,
     },
     dateText:{
       color:Appearences.Colors.headingGrey,
       fontSize:Appearences.Fonts.paragraphFontSize,
     },
     commentText:{
      color:Appearences.Colors.headingGrey,
      fontSize:Appearences.Fonts.paragraphFontSize,
      marginStart:5,
    },
    blogHeadingText:{
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.subHeadingFontSize,
      alignSelf: 'flex-start',
      fontWeight:Appearences.Fonts.headingFontWieght,
      marginTop:localProps.topMargin,
    },
    blogParagraphText:{
      color:Appearences.Colors.grey,
      fontSize:Appearences.Fonts.paragraphFontSize,
      marginTop:localProps.topMargin,
    },
    blogGridImageRowContainer:{
      flexDirection:'row',
      flexWrap:'wrap',
      width:'100%',
    
    
      justifyContent:'space-between',
    },
    blogGridImageContainer:{
      height:200,
      width:'49%', 
      marginTop:localProps.topMargin,
    },
    blogGridImage:{
      height:'100%',
      width:'100%',
      resizeMode:'cover',
    },
    tagsRow:{
      flexDirection:'row',
      alignItems:'center',
    },
    tagImage:{
      width:Appearences.Fonts.paragraphFontSize,
      height:Appearences.Fonts.paragraphFontSize,
      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],

    },
    tagText:{
     fontSize:Appearences.Fonts.paragraphFontSize,
     marginStart:5, 
     fontWeight:Appearences.Fonts.headingFontWieght,     
    },
    relpyTextContainer:{
//      marginTop:3,
 // margin:0,    
marginTop:-3,
justifyContent:'flex-end',  
},
    // Comments Styling Start
    replyContainer:{
      marginStart:25,
      flexDirection:'row',
      marginTop:localProps.topMargin,
      alignItems:'center',

    },
    commentContainer:{
      flexDirection:'row',
      marginTop:localProps.topMargin,
      alignItems:'center',
    },
    commentRightColumn:{
      marginStart:5,
      flex:1,
      paddingEnd:5,
      
    },    
    listImageContainer:{                      
      alignItems:'center',
      justifyContent:'center',
      width:60,
      height:60,
      backgroundColor:"white",
      borderRadius:60,
      
  },


  
commentTextContainer:{
  flexDirection:'row',
  

},
comment:{
  color:Appearences.Colors.grey,
  fontSize:Appearences.Fonts.paragraphFontSize,
  marginTop:localProps.topMargin,
  alignSelf:'flex-start',
},

commenterName:{
  color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.headingFontSize,
      marginTop:localProps.topMargin,
      alignSelf:'flex-start',
      fontWeight:Appearences.Fonts.headingFontWieght,
},
commentRow:{flexDirection:'row',
justifyContent:'space-between',
flex:1,
},
commenterDate:{
  color:Appearences.Colors.grey,
  fontSize:Appearences.Fonts.paragraphFontSize,
  alignSelf:'flex-start',
},

// Form Start 

bodyHeadingBlack:{
  fontSize:Appearences.Fonts.subHeadingFontSize,
  color:Appearences.Colors.black,
  marginTop:localProps.topMargin,
  fontWeight:Appearences.Fonts.headingFontWieght,
  alignSelf:'flex-start',
},
bodyHeadingAppColor:{
  fontSize:Appearences.Fonts.headingFontSize,
  marginTop:localProps.topMargin,
  marginStart:3,
},

paragraphText:{
  color:Appearences.Colors.grey,
  fontSize:Appearences.Fonts.paragraphFontSize,
  marginTop:localProps.topMargin+3,
  alignSelf:'flex-start',
},
headingTextContainer:{
  flexDirection:'row',
  marginTop:localProps.topMargin,
  alignItems:'center'
},
headingTextBlack:{

  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.black,
},

TextInput:{
  height:Appearences.Registration.itemHeight,
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,
  
  paddingStart:15,
  paddingEnd:15,
  marginTop:localProps.topMargin,
  
  paddingBottom:0,
  paddingTop:0,
  fontSize:Appearences.Fonts.paragraphFontSize,
},

modaHeadingText:{
  color:Appearences.Colors.black,
  fontSize:Appearences.Fonts.headingFontSize,

},

commentSearchBoxContainer:{
  marginTop:localProps.topMargin,
},

modalProgressContainer:{
  width:'100%',
  height:40,
  marginTop:localProps.topMargin,
  flexDirection:'row',
  alignItems:'center',
  justifyContent:'center',
  },
modalButtonRowContainer:{
width:'100%',
marginTop:15,
flexDirection:'row',
justifyContent:'space-between',
},
modalSendButton:{
  paddingStart:10,
  paddingEnd:10,
  
   alignItems:'center',
  justifyContent:'center',
  borderRadius:Appearences.Radius.radius,
  height:Appearences.Registration.itemHeight-10,
  flex:1,

},
modalCancelButton:{
  alignItems:'center',
  justifyContent:'center',
  borderRadius:Appearences.Radius.radius,
  paddingStart:10,
  paddingEnd:10,
  borderColor:Appearences.Colors.grey,
  height:Appearences.Registration.itemHeight-10,
  borderWidth:1,
  flex:1,

},
modalButtonTextStyle:{
  fontSize:Appearences.Fonts.headingFontSize,
  color:'white',
fontWeight:Appearences.Fonts.headingFontWieght,
},

TextInputMultiline:{
    
  backgroundColor:Appearences.Registration.boxColor,
  fontSize:Appearences.Fonts.headingFontSize,
  minHeight: 100,
  textAlignVertical: 'top',
  maxHeight:100,
  padding:15,
  borderRadius:Appearences.Radius.radius,
  marginTop:15,
},
footerContainer:{
  alignItems:'center',
 },
 footer:{
   height:Appearences.Registration.itemHeight-10,
   width:'100%',
   alignItems:'center',
   justifyContent:'center',
   margin:localProps.topMargin,
   borderRadius:Appearences.Radius.radius,
 },
 footerText:{
   color:'white',
   fontSize:Appearences.Fonts.headingFontSize,
 },
    });

  export default styles;
  
  
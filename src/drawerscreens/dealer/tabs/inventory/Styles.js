
import  { I18nManager } from 'react-native';
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
         marginTop:localProps.topMargin,
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
    locatonTextContainer:{
      flexDirection:'row',
      width:'100%',
      justifyContent:'space-between',
    },
    locationImage:{
      tintColor:Appearences.Colors.grey,
      width:12,
      height:12,
      marginEnd:3,
    },
    paragraphTextGrey:{
      color:Appearences.Colors.grey,
      fontSize:Appearences.Fonts.paragraphFontSize,
    },
     subHeading:{
      fontSize:Appearences.Fonts.subHeadingFontSize,
      color:Appearences.Colors.black,
      fontWeight:Appearences.Fonts.headingFontWieght,
      alignSelf:'flex-start',
    },
     flatListContainer:{
     
      flexDirection:'row',
      backgroundColor:'white',
      marginTop:5,
      borderRadius:Appearences.Radius.radius,
  },
     pageTitle:{
       fontSize:Appearences.Fonts.headingFontSize+2,
       color:Appearences.Colors.black,
       marginTop:localProps.topMargin,
     },
     lineSeperator:{
      width:'100%',
      height:1,
      backgroundColor:Appearences.Colors.lightGrey,
    },
    aboutImage:{
      width:15,
      height:15,
      resizeMode:'cover',
    },
    contactRowContainer:{
      width:'100%',
      paddingTop:15,
      paddingBottom:15,
      flexDirection:'row',
      alignItems:'center'
    },
     wideSeperator:{
       width:30,
       height:1,
       marginTop:localProps.topMargin,
       backgroundColor:'black',
     },
     paragraphTextBlack:{
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.paragraphFontSize,
      marginTop:localProps.topMargin,
     },
     headingTextBlack:{
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.headingFontSize,
      marginTop:localProps.topMargin,
     },
     paragraphTextBlackMarginStart:{
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.paragraphFontSize,
      marginTop:localProps.topMargin,
      marginStart:15,
     },
     mapContainer:{
      height:200,
      justifyContent:'center',
      marginTop:localProps.topMargin,
    },
    videoContent:{
      
      flex:1,},
      mapOverlay:{
        height:200,
        width:'100%',
        position:'absolute',
        backgroundColor:'transparent',

      },
     narrowSeperator:{
       width:20,
       height:1,
       marginTop:2,
       backgroundColor:'black',

     },
     popularCars:{
      width:'100%',
      marginTop:localProps.topMargin,
      
    },

    imageContainer:{

      height:'100%',
      width:'40%',
      borderTopLeftRadius:Appearences.Radius.radius,
      borderBottomLeftRadius:Appearences.Radius.radius,
      overflow:'hidden',
  },

  image:{
      height:110,
      width:'100%',
      borderTopLeftRadius:Appearences.Radius.radius,
      borderBottomLeftRadius:Appearences.Radius.radius,
  },
  imageContainerOverlay:{
      flex:1,
      position:'absolute',
      
  },
  topRowContainer:{        
      width:'100%',
      flexDirection:'row',
      justifyContent:"flex-end",
     
  },
  topRightContent:{
     width:60,
     height:60,
    
     alignItems:'flex-end',
  },
  topRightContentImage:{
      transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  bottomRowContainer:{      
      alignItems:'flex-end',
      flexDirection:'row',
      height:'50%',
    },
  bottomLeftContent:{
      width:22,
      height:22,
      borderRadius: 100/2,
      alignItems:'center',
      justifyContent:'center',
      marginStart:10,
      marginBottom:15,
  },

  bottomLeftContentImage:{
      width:7,
      height:7,
  },


  textContainer:{
    flex:1,
     
      padding:15,
      
      justifyContent:'center',
      },
      brandTitleStyle:{
          color:Appearences.Colors.black,
          fontSize:Appearences.Fonts.headingFontSize,
          fontFamily:Appearences.Fonts.paragaphFont,
          fontWeight:Appearences.Fonts.headingFontWieght,
          alignSelf: 'flex-start',
      },
      brandTextStyle:{
          color:Appearences.Colors.grey,
          fontSize:Appearences.Fonts.paragraphFontSize,
          fontFamily:Appearences.Fonts.paragaphFont,
          marginTop:5,
          alignSelf: 'flex-start',
         
      },
      modelTextStyle:{
          color:Appearences.Colors.grey,
          fontSize:Appearences.Fonts.paragraphFontSize,
          marginTop:5,    
          alignSelf: 'flex-start',
      },
      priceTextStyle:{
          fontSize:Appearences.Fonts.headingFontSize,
          fontWeight:Appearences.Fonts.headingFontWieght,
          marginTop:5,
          alignSelf: 'flex-start',
          
      },


    });
export default styles;
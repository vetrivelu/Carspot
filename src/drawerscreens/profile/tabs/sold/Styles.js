
import React, { Component } from 'react';
import Appearences from '../../../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:5,
  dataRowNumberFontSize:12,
  sidePadding:15,

}
const styles = StyleSheet.create({


     headingContainer:{
      
      marginTop:localProps.bodyTopMargin,
      width:'100%',
      flexDirection:'row',
      
    },
    bodyHeadingBlack:{
      fontFamily:Appearences.Fonts.headingFont,
      fontSize:Appearences.Fonts.subHeadingFontSize,
      fontWeight:Appearences.Fonts.headingFontWieght,
      color:Appearences.Colors.black,
    },
    bodyHeadingAppColor:{
      fontFamily:Appearences.Fonts.headingFont,
      fontSize:Appearences.Fonts.headingFontSize,
    },
    bodyHeadingSeperatorContainer:{
      width:'100%',
      height:1,
      marginTop:localProps.topMargin,
      
    },
    bodyHeadingPrimarySeperator:{
      backgroundColor:Appearences.Colors.black,
      width:40,
      height:1,
     
    },
    bodyHeadingSecondarySeperator:{
      backgroundColor:Appearences.Colors.black,
      width:30,
      height:1,
      marginTop:2,
    },
    container:{
      paddingStart:localProps.sidePadding,
      paddingEnd:localProps.sidePadding,
    },
    flastListItemContainer:{
    //  width:'100%',
      marginTop:5,  
      flexDirection:'row',
     borderRadius:Appearences.Radius.radius,
      backgroundColor:'white',

    },
    flatListBackgroundImageContainer:{
      borderBottomLeftRadius:Appearences.Radius.radius,
      borderTopLeftRadius:Appearences.Radius.radius,
      overflow:'hidden',
      width:'35%',
     },
     flatListBackgroundImage:{
      width:'100%',
      flex:1,
      height:50,
      borderBottomLeftRadius:Appearences.Radius.radius,
      borderTopLeftRadius:Appearences.Radius.radius,

     },
    flatListBackgroundImageOverlay:{
      width:'100%',
       height:'100%',  
      position:'absolute',
      flexDirection:'row',
     
     },
     flastListOverLayLeftContainer:{
    
      width:'50%',
      justifyContent:'flex-start',
      alignItems:'flex-start',
     },
    
     flatListOvlerLayRightContainer:{
      
      width:'50%',
      
    },
    flatListOvlerLayRightAbsoluteContainer:{
      position:'absolute',
      width:'100%',
      height:'100%',
      justifyContent:'flex-end',
      alignItems:'flex-end', 
      paddingEnd:10,
      paddingBottom:10,
    },
    flastListOverLayMessageCircle:{
      backgroundColor:Appearences.Colors.black,
      alignItems:'center',
      justifyContent:'center',
      width:35,
      height:35,
      borderRadius:35,
      padding:5,
    },
    flastListOverLayMessageImage:{
      width:15,
      height:15,
    },
    flastListOverLayMessageCountCircleAbosluteContainer:{
    
      position:'absolute',
    },
    flastListOverlayMessaageCountContainer:{
     
      padding:5,
      width:25,
      height:25,
      
      borderRadius:25,
      marginBottom:28,
      marginEnd:5,
      alignItems:'center',
      justifyContent:'center',
     
      
    },
    flastListOverlayMessaageCountText:{
      color:'white',
      fontFamily:Appearences.Fonts.paragaphFont,
      fontSize:Appearences.Fonts.paragraphFontSize-2,
    },
    

    
    flatListContentRow1:{
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-between',  
    },
    flatListContentRow1Text:{
      fontSize:Appearences.Fonts.paragraphFontSize,
      color:Appearences.Colors.grey,
      alignSelf: 'flex-start',
      
    },
    menuItemContainer:{
      justifyContent:'center',
      
    },
    menuTextStyle:{
      fontSize:Appearences.Fonts.headingFontSize,
      color:Appearences.Colors.headingGrey,
      padding:5,
    },
    menuDots:{
      width:12,
      height:12,
      marginTop:5,
    },// new code
    flatListContentContainer:{                
    width:'70%',// new code
},
 
    flatListItemHeadingText:{
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.headingFontSize,
      marginTop:localProps.topMargin,
      fontWeight:Appearences.Fonts.headingFontWieght,
    },
    dateRowContainer:{
      marginTop:localProps.topMargin,
      flexDirection:'row',
    },
    flatListItemMileageText:{
      color:Appearences.Colors.grey,
      fontFamily:Appearences.Fonts.paragaphFont,
      fontSize:Appearences.Fonts.paragraphFontSize,
      marginTop:localProps.topMargin,
      alignSelf: 'flex-start',
    },
    flatListItemPriceText:{
      fontFamily:Appearences.Fonts.paragaphFont,
      fontSize:Appearences.Fonts.paragraphFontSize,
      marginTop:localProps.topMargin,
      alignSelf: 'flex-start',
    },
    flatListItemBottomRowContainer:{
      flexDirection:'row',
      justifyContent:'space-between',

    },
    flatListBottomLeftContainer:{
      flexDirection:'row',
      paddingStart:15,
      paddingBottom:5,
      paddingTop:5,
      paddingEnd:5,
      justifyContent:'center',
    },
    flatListBottomLeftText:{
      color:Appearences.Colors.grey,
      fontFamily:Appearences.Fonts.paragaphFont,
      fontSize:Appearences.Fonts.paragraphFontSize-1,
      marginStart:5,
      
    },
    flatListBottomLeftImage:{
     width:Appearences.Fonts.paragraphFontSize-1,
     height:Appearences.Fonts.paragraphFontSize-1,
     marginTop:2, 
    },
    flatListBottomRightContainer:{
      flexDirection:'row',
    },
    flatListBottomRightImageContainer:{
      borderStartWidth:.5,
      borderStartColor:Appearences.Colors.lightGrey,      
      //borderBottomWidth:.5,
     // borderBottomColor:Appearences.Colors.lightGrey,      
      
      alignItems:'center',
      justifyContent:'center',
      padding:5,
    },
    flatListBottomRightImage:{
      width:Appearences.Fonts.headingFontSize,
      height:Appearences.Fonts.headingFontSize,
    },
    });
  export default styles;
  
  
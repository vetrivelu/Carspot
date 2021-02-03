

import React, { Component } from 'react';
import Appearences from '../../../config/Appearences';

import {
  StyleSheet,I18nManager
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:5,
  dataRowNumberFontSize:12,
  sidePadding:15,

}
const styles = StyleSheet.create({
  

     container:{
         paddingStart:localProps.sidePadding,
         paddingEnd:localProps.sidePadding,
     },
     bodyHeadingBlack:{
        fontSize:Appearences.Fonts.subHeadingFontSize,
        color:Appearences.Colors.headingGrey,
        marginTop:localProps.topMargin,
        alignSelf:'flex-start',
      },
      bodyHeadingAppColor:{
        fontSize:Appearences.Fonts.subHeadingFontSize,
        alignSelf:'flex-start',
      },
      bodyHeadingSeperatorContainer:{
        width:'100%',
        height:1,
        marginTop:localProps.topMargin,
      },
     
      bodyHeadingSecondarySeperator:{
        backgroundColor:Appearences.Colors.black,
        width:30,
        height:1,
        marginTop:2,
      },
    // Modal Styling Start


modal: {
   
    width: '80%',
    height:'50%',
  },
  
  modalHeadingTextContainer:{
    marginTop:localProps.topMargin,
    marginStart:localProps.sidePadding-6,
    paddingTop:localProps.topMargin,
    paddingBottom:localProps.topMargin,
  },
  
 
  modalHeadingSubContainer:{
    height:40,
    flexDirection:'row',
    alignItems:'center',
     
  },
  modalHedingItemsContainer:{
    flexDirection:'row',
    alignItems:'center',
    paddingStart:5,
    paddingEnd:5,
  },
  
  headerImage:{
    resizeMode:'contain',
  },
  seperator:{
    backgroundColor:Appearences.Colors.seperatorColorGrey,
    height:1,
    width:'100%',
    marginTop:localProps.topMargin,
  },
  sunHeadingseperator:{
    backgroundColor:Appearences.Colors.grey,
    height:1,
    width:'100%',
  },
  modalHeadingText:{
  
    fontSize:Appearences.Fonts.headingFontSize,
    fontFamily:Appearences.Fonts.headingFont,
    color:'white',
  
  },
  modalText:{
  
    fontSize:Appearences.Fonts.headingFontSize,
    alignSelf:'flex-start',
    color:Appearences.Colors.grey,
  
  },
  
  modalSubText:{
  
  fontSize:Appearences.Fonts.paragraphFontSize,
   color:Appearences.Colors.grey,
  },
  
  radioLabelStyle:{
  fontSize: Appearences.Fonts.headingFontSize,
   color: Appearences.Colors.grey,
   marginStart:localProps.sidePadding,
  },
  labelWrapStyle:{
  justifyContent:'flex-start',
  alignItems:'center',
  width:'50%',
  
  },
  radioButtonStyle:{
    alignSelf:'flex-end',
    
    },
    buttonWrapStyle:{
      justifyContent:'center',
      alignItems:'center',
      
    },
    flatListItemHeadingText:{
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.headingFontSize,
      alignSelf: 'flex-start',
      fontWeight:Appearences.Fonts.headingFontWieght,
    },
    
  modalItemContainer:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
 
    paddingStart:localProps.sidePadding,
    paddingEnd:localProps.sidePadding,
    paddingTop:5,
    paddingBottom:5,
    marginTop:localProps.topMargin,
  },

  countriesContainer:{
    flexDirection:'row',
    width:'100%',
   
    
    flexWrap:'wrap',
  },
  contriesItemContainer:{
  
   
    width:'50%',
    
  },
  contriesTextContainer:{
    paddingStart:localProps.sidePadding,
    paddingTop:5,
    paddingBottom:5,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
  },
  countryModalBottomContainer:{
    width:'100%',
    height:'100%',
    position:'absolute',
    justifyContent:'flex-end',
  },

  
  noStyle:{},
  
  
  // Modal Styling End  


    fieldsContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:localProps.topMargin,
    },

  PopupViewContainerSmall:{
    height:Appearences.Registration.itemHeight,
    width:"45%",
    backgroundColor:Appearences.Registration.boxColor,  
    paddingStart:15,
    paddingEnd:15,
    marginTop:localProps.topMargin,
    marginBottom:localProps.topMargin,
    paddingBottom:0,
    paddingTop:0,
     justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    borderRadius:Appearences.Radius.radius,
  },
  popupViewImage:{
    width:Appearences.Fonts.paragraphFontSize,
    height:Appearences.Fonts.paragraphFontSize,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],

  },
  popupViewText:{
    fontFamily:Appearences.Fonts.paragaphFont,
    fontSize:Appearences.Fonts.headingFontSize,
    color:Appearences.Colors.headingGrey,
  },
  modalBoxStyle:{
    alignItems: 'center',
    height: 200,
    borderRadius:Appearences.Radius.radius,
  },
  modalContentContainer:{
    width:'95%',
    backgroundColor:'white',
  },
  subHeadingContainer:{
    paddingStart:localProps.sidePadding-10,
    paddingEnd:localProps.sidePadding,
    marginTop:localProps.topMargin+5,
  },
  subHeading:{
    color:Appearences.Colors.black,
    fontWeight:Appearences.Fonts.headingFontWieght,
    fontSize:Appearences.Fonts.subHeadingFontSize,
  },
   button:{
     height:Appearences.Registration.itemHeight-10,
     width:'100%',
     alignItems:'center',
     justifyContent:'center',
     margin:localProps.topMargin,
     alignSelf:'center',
     borderRadius:Appearences.Radius.radius,
   },
   buttonText:{
     color:'white',

     fontSize:Appearences.Fonts.headingFontSize,
   },
  



   listItemContainer:{
    height:150,
    flexDirection:'row',
    marginTop:localProps.topMargin,
    padding:5,            
     justifyContent:'space-between',
     borderRadius:Appearences.Radius.radius,
      },

listContentContainer:{
    width:'50%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
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


//Accordin Styling Start

headerContentContainer:{
    flexDirection:'row',
    flex:1,
    justifyContent:'space-between',
    borderRadius:5,
   },
   headerTextSwitched:{
    color:'white',
  fontSize:Appearences.Fonts.headingFontSize,
  },
  headerText:{
    color:Appearences.Colors.headingGrey,
   fontSize:Appearences.Fonts.headingFontSize-3,
    alignSelf:'flex-start',
   },
    rotationViewContainer:{
      flexDirection:'row',
      justifyContent:'flex-end',
      alignItems:'center',
   },
   rotatingView:{
     width:10,
     height:10,
    transform: [{ rotate: '180deg'}]
   },
   NonrotatingView:{
    width:10,
    height:10,
    transform: [{ rotate: I18nManager.isRTL ? '-90deg' : '90deg'}]

  },
   accordingContainer:{
     marginTop:localProps.topMargin,
    

   },
   accordingDataContainer:{
    marginTop:localProps.topMargin,
    padding:5,

  },
   accodrdinContentContainer:{
     marginTop:localProps.topMargin,
     width:'100%',
   
    },
    accordinSubTextContainer:{
      flexDirection:'row',

      marginTop:localProps.topMargin,
      width:'100%', },
      accordinSubTextLeftContainer:{
        width:'50%',
      }
      ,
      accordinSubTextRightContainer:{
        width:'50%',
        alignItems:'flex-start',
      },
     accordinSubText:{
      fontSize:Appearences.Fonts.paragraphFontSize+2,
      color:Appearences.Colors.black,
      marginTop:localProps.topMargin,
     },
  
  //Accordin Styling End
  

    });

  export default styles;
  
  
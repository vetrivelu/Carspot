
import React, { Component } from 'react';
import Appearences from '../../../config/Appearences';
import {
    StyleSheet,I18nManager
  } from 'react-native';
  const localProps = {
     topMargin:15,
    sidePadding:0,
  
  };
const styles = StyleSheet.create({
 
  container:{
    backgroundColor:'white',
  //  height:'100%',  
    paddingStart:localProps.sidePadding-10,
    paddingEnd:localProps.sidePadding-10, 
},
    headerContainer:{
        height:200,
        width:'100%',
    },
    headerImage:{
        width:'100%',
        height:'100%',
        resizeMode:'cover',
    },
    headerOverlay:{
        width:'100%',
        height:'100%',
        justifyContent:'flex-end',
        backgroundColor:'rgba(96,96,96,0.5)',
        position:'absolute',
    },
    headerContentContainer:{
        paddingStart:10,
        paddingBottom:10,        
    },
    ratingBarContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerTextContainer:{
    },
    heaedrText:{
        alignSelf: 'flex-start',
        fontSize:Appearences.Fonts.subHeadingFontSize+1,
        color:'white',
        marginTop:5,
    },
    starText:{
        alignSelf: 'flex-start',
        fontSize:Appearences.Fonts.headingFontSize,
        color:'white',
        marginStart:3,
    },
    sectionContainer:{
 
        backgroundColor:'white',
        padding:10,
        marginTop:localProps.topMargin,
    },
    headingText:{
        color:Appearences.Colors.black,
        fontSize:Appearences.Fonts.subHeadingFontSize,
        marginTop:localProps.topMargin,
        alignSelf:'flex-start',
        fontWeight:Appearences.Fonts.headingFontWieght,
    },
    paragraphText:{
        color:Appearences.Colors.headingGrey,
        fontSize:Appearences.Fonts.headingFontSize,
      },

    overviewContentRownContainer:{
        marginTop:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
      },
      overviewContetHeading:{
        fontSize:Appearences.Fonts.headingFontSize,
       
        color:Appearences.Colors.black,
      },
      overViewContentText:{
        fontSize:Appearences.Fonts.headingFontSize,
      
        color:Appearences.Colors.grey,
      },
      seperator:{
        backgroundColor:Appearences.Colors.lightGrey,
        width:'100%',
        height:1,
        marginTop:15,
    },
    accordinHeaderLeftSectionContainer:{
        flexDirection:'row',
        alignItems:'center',

    },
    accodrinLeftImgae:{
        width:Appearences.Fonts.headingFontSize+5,
        height:Appearences.Fonts.headingFontSize+5,
        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],

    },
    accordinHeaderContentContainer:{
        flexDirection:'row',
        flex:1,
        justifyContent:'space-between',
        borderRadius:5,
       },
       accordinHeaderText:{
        color:'black',
       fontSize:Appearences.Fonts.headingFontSize,
       fontFamily:Appearences.Fonts.headingFont,
       marginStart:5,
       },
      accordinHeaderTextSwitched:{
        color:'white',
      fontSize:Appearences.Fonts.headingFontSize,
       fontFamily:Appearences.Fonts.headingFont,
        marginStart:5,
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
      transform: [{ rotate: I18nManager.isRTL ? '-90deg' : '90deg'}],
    

     },

     featureSectionConatiner:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:'100%',    
      },
      featureSection:{
         width:'50%',
        flexDirection:'row',
        marginTop:localProps.topMargin,
      },
      featureItemImage:{
        width:Appearences.Fonts.paragraphFontSize+5,
        height:Appearences.Fonts.paragraphFontSize+5,
        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],

      },
      featureItemText:{
        marginStart:15,
        fontFamily:Appearences.Fonts.paragaphFont,
        fontSize:Appearences.Fonts.paragraphFontSize,
        color:Appearences.Colors.black,
      
      },
      exteriorImageContainer:{
          height:200,
          width:'100%',
          resizeMode:'cover',
          marginTop:localProps.topMargin,
      },
      sidePadding:{
          paddingStart:10,
          paddingEnd:10,
      },
      coloredBackground:{
      backgroundColor:Appearences.Colors.appBackgroundColor,
      borderRadius:Appearences.Radius.radius,
      marginTop:localProps.topMargin,
      paddingStart:5,
      },
      videoContent:{
        marginTop:localProps.topMargin,
        flex:1,},
      videoContentContainer:{
        height:200,
        justifyContent:'center',
        paddingStart:10,
        paddingEnd:10,
      },
      gellerySectionContainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:'100%',
        marginTop:localProps.topMargin,    
        paddingStart:10,
        paddingEnd:10,
    },
      galleryItem:{
          width:'30%',
          height:80,
          padding:5,
                   
        },
        galleryImage:{
            width:'100%',
            height:'100%',
            resizeMode:'cover',
            
        },

        galleryHeadingText:{
            color:Appearences.Colors.black,
            fontSize:Appearences.Fonts.subHeadingFontSize,
            marginTop:localProps.topMargin,
            paddingStart:10,
            alignSelf:'flex-start',
            fontWeight:Appearences.Fonts.headingFontWieght,
        },
        verdictContainer:{
            width:'100%',
            flexDirection:'row',
           marginTop:localProps.topMargin,
        },
    
        verdictTextContainer:{
            width:'30%',    
            
            justifyContent:'center',
        },
        progressContainer:{
            width:'70%',
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'space-between'
            
        },
      
        verdictHedingText:{
            fontSize:Appearences.Fonts.headingFontSize,
            color:Appearences.Colors.black,
        },
        summarySectionContainer:{
            width:'100%',
            paddingStart:10,
            paddingEnd:10,
            paddingTop:5,
            paddingBottom:10,
            backgroundColor:Appearences.Colors.lightGrey,
            marginTop:localProps.topMargin,

        },
        summaryHeadingText:{
            fontSize:Appearences.Fonts.subHeadingFontSize,
            marginTop:5,
            alignSelf:'flex-start',
            fontWeight:Appearences.Fonts.headingFontWieght,
        },
        percentageText:{
            fontSize:Appearences.Fonts.headingFontSize,
            color:Appearences.Colors.black,
            marginEnd:10,
        },
    });
export default styles;


import React, { Component } from 'react';
import Appearences from '../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';

const localProps = {
   topMargin:5,
 
  sidePadding:15,

}
const styles = StyleSheet.create({
  

     container:{
         padding:localProps.sidePadding,
         height:'100%',
         backgroundColor:'white',
     },
     PopupViewContainerSmall:{
        height:Appearences.Registration.itemHeight,
        width:"60%",
        backgroundColor:'white',  
        paddingStart:15,
        paddingEnd:15,
       
        paddingBottom:0,
        paddingTop:0,
         justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        borderWidth:1,
        borderColor:Appearences.Colors.lightGrey,
    },
      popupViewImage:{
        width:Appearences.Fonts.paragraphFontSize,
        height:Appearences.Fonts.paragraphFontSize,
      },
      popupViewText:{
         fontSize:Appearences.Fonts.paragraphFontSize,
         color:'black',   
      },
      row:{
          flexDirection:'row',
          
      },
      rowWithTopMargin:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:localProps.topMargin,
    },
      showingContainer:{
          width:'40%',
          height:Appearences.Registration.itemHeight,
          alignItems:'center',
          justifyContent:'center',  
          backgroundColor:Appearences.Registration.boxColor,  
        },
        headingText:{
            fontSize:Appearences.Fonts.headingFontSize,
            color:Appearences.Colors.black,
        },
        itemContainer:{
            width:'49%',
            height:200,
            borderColor:Appearences.Colors.lightGrey,
            borderWidth:1,
            padding:5,
            marginTop:localProps.topMargin,
        },
        imageContainer:{
            width:'100%',
            height:'60%',
        },
        image:{
            width:'100%',
            height:'100%',
            resizeMode:'cover',
        },
        contentContainer:{
            flex:1,
            marginTop:localProps.topMargin,
        },
        reviewsText:{
            color:Appearences.Colors.black,
            fontSize:Appearences.Fonts.paragraphFontSize,
            marginStart:5,
           },
           
           priceText:{
               color:Appearences.Colors.grey,
               fontSize:Appearences.Fonts.paragraphFontSize,
           },
           wrapper:{
            flexDirection:'row',
            flexWrap:'wrap',
            width:'100%',
          
          
            justifyContent:'space-between',
          },












          // Modal Styling Start  


          modal: {
   
            width: '80%',
            height:'50%',
          },
          
          modalHeadingTextContainer:{
            marginTop:localProps.sidePadding,
            marginStart:localProps.sidePadding-6,
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
            backgroundColor:Appearences.Colors.lightGrey,
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
            fontFamily:Appearences.Fonts.headingFont,
            color:Appearences.Colors.black,
          
          },
          
          modalSubText:{
          
          fontSize:Appearences.Fonts.paragraphFontSize,
          fontFamily:Appearences.Fonts.paragaphFont,
          color:Appearences.Colors.grey,
          
          },
          
          radioLabelStyle:{
          fontSize: Appearences.Fonts.headingFontSize,
           color: Appearences.Colors.black,
           fontFamily:Appearences.Fonts.headingFont,
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
            width:'50%',
            justifyContent:'center',
            alignItems:'center',
            paddingRight:localProps.sidePadding,
            
          },
      
        
  
       
         
          
          
          // Modal Styling End  

          
    });

  export default styles;
  
  
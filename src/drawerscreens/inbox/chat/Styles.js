
import React, { Component } from 'react';
import Appearences from '../../../config/Appearences';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens:7,
  topMargin:5,
  dataRowNumberFontSize:12,
  sidePadding:15,
  replyBubbleColor:'#f7fafc',  
}
const styles = StyleSheet.create({
    container:{
      paddingStart:localProps.sidePadding,
      paddingEnd:localProps.sidePadding,
    },

        listItemContainer:{
            alignItems:'center',
            padding:10,
            flexDirection:'row',
            width:'100%',
            backgroundColor:'white',
         
        },
    
        listImage:{
            width:55,
            height:55,
            borderRadius: 55
        },
        listTextContainer:{
            justifyContent:'center',
            marginStart:5,
        },
        listTitleText:{
             fontSize:Appearences.Fonts.headingFontSize,
            color:Appearences.Colors.black,
            alignSelf:'flex-end',   
        },
        listNameText:{
            
            fontSize:Appearences.Fonts.paragraphFontSize,
            color:Appearences.Colors.grey,
            alignSelf:'flex-start',
            marginTop:localProps.topMargin,
        },
            
                
            commentRowContainer:{
               alignItems:'center',    
                marginTop:15,
                flexDirection:'row',  
                paddingStart:localProps.sidePadding,
                paddingEnd:localProps.sidePadding,
                justifyContent:'center',
            },

            talkBubble: {
                backgroundColor: 'transparent',
                width:'80%',
              },
              talkBubbleSquare: {
                padding:15,
                backgroundColor: Appearences.Colors.grey,
                borderRadius: 10,
                width:'80%',

              },



            triangle: {
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderStartWidth: 5,
            borderEndWidth: 5,
            borderBottomWidth: 10,
            borderStartColor: 'transparent',
            borderEndColor: 'transparent',
            borderBottomColor: Appearences.Colors.grey,
            transform: [
                {rotate: '-90deg'}
            ],  
            alignSelf:'center',
            },
            comment:{
                color:Appearences.Colors.black,
                fontSize:Appearences.Fonts.headingFontSize,
                paddingStart:15,
                paddingEnd:15,
            },
            timeText:{

                
                fontSize:Appearences.Fonts.paragraphFontSize,
                marginTop:localProps.topMargin,  
                alignSelf:'center',  
            },          


            replyRowContainer:{
                alignItems:'center',    
                 marginTop:15,
                 flexDirection:'row',  
                justifyContent:'flex-end',
                paddingStart:localProps.sidePadding,
                paddingEnd:localProps.sidePadding,
                justifyContent:'center',
             },
             triangleReply: {
                 
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderStartWidth: 5,
                borderEndWidth: 5,
                borderBottomWidth: 10,
                borderStartColor: 'transparent',
                borderEndColor: 'transparent',
                borderBottomColor: 'white',
                transform: [
                    {rotate: '90deg'}
                ],  
                alignSelf:'center',
                },
                replyTalkBubbleSquare: {
                    padding:15,
                     backgroundColor: 'white',
                     borderRadius: 10,

                    },
                lastRowContainer:{                  
                   
                    justifyContent:'flex-end',
                    height:50,
                    width:'100%',
                },
                lastRow:{
                   
                    height:50,
                    borderColor:Appearences.Colors.lightGrey,
                    borderWidth:1,
                    flexDirection:'row',
                },
                TextInput:{
                    width:'85%',
                    height:'100%',
                    backgroundColor:'white',
                    padding:15,
                    fontSize:Appearences.Fonts.headingFont,
                    color:Appearences.Colors.black,
                    
                  },
                  searchButton: {
                    width:'100%',
                    height:'100%',
                    padding:15,
                   
                    alignItems:"center",
                    justifyContent:"center",
                    
                   
                  },
                  searchImage:{
                     width:'100%',
                     height:'100%',
                     flex:1,
    
                    },
    });
  export default styles;
  
  
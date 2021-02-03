
import Appearences from '../../../../../../config/Appearences';

import {
  StyleSheet,
  I18nManager,
} from 'react-native';
import { App } from 'react-native-firebase';
const localProps = {
  
  headerHeight:200,
  topMargin:5,
  sidePadding:10,
  bodyTopMargin:15,
  sliderArrowContainerWidth:30,
  sliderArrowContainerHeight:70,
  topSliderArrowDimens:15,
};
const styles = StyleSheet.create({
 
container:{
  
    justifyContent: 'center',
   
    width:'100%',
  //  paddingStart:5,
   // paddingEnd:5,
    
},
panel:{
  paddingStart:15,
  paddingEnd:15,
  justifyContent:'center',
  width:'100%',
  flex:1,
  backgroundColor:'white',
  marginTop:localProps.topMargin,
  paddingBottom:15,
  paddingTop:15,
},
border:{ borderColor: Appearences.Colors.lightGrey,
    borderWidth: 0.5,
    borderBottomColor:'transparent',
  },
  celBorder:{ borderColor: Appearences.Colors.lightGrey,
    borderWidth: 0.5,
    marginBottom:localProps.topMargin,
  },
  flatlistBorder:{ borderColor: Appearences.Colors.lightGrey,
    borderWidth: 0.5,
    paddingBottom:10,
},
  borderLessTop:{ borderColor: Appearences.Colors.lightGrey,
    borderWidth: 0.5,
    borderTopColor:null,
},
marginTop:{marginTop:localProps.topMargin,},
rowSeperator:{
    width:'100%',
    height:0.5,
    backgroundColor:Appearences.Colors.lightGrey,
},
cellRow:{
    flexDirection:'row',
    alignItems:'center',
    width:'100%',
    marginTop:localProps.topMargin,
    paddingBottom:10,
    borderRadius:Appearences.Radius.radius,

},
cellContainer:{

    width:'33%',
    height:50,
    flexDirection:'row',
    justifyContent:'space-between',
},
cellTextContainer:{
    justifyContent:'center',    
    width:'100%',
    height:'100%',
},
cellGreyText:{
    fontSize:Appearences.Fonts.headingFontSize,
    color:Appearences.Colors.grey,
    marginTop:localProps.topMargin,
    marginStart:10,


},
cellAppColorText:{
    fontSize:Appearences.Fonts.headingFontSize,
    marginTop:localProps.topMargin,
    marginStart:10,
},
cellSeperator:{
    height:"100%",
    width:1,
    backgroundColor:Appearences.Colors.lightGrey,
},

loadMoreButtonContainer:{
    width:'100%',
    alignItems:'center',
    marginTop:localProps.topMargin,
    height:200,
    backgroundColor:'red',
  },
 
  loadMoreText:{
    fontSize:Appearences.Fonts.paragraphFontSize,
    color:'white',
  },

sidePadding:{
    paddingStart:localProps.sidePadding-5,
    paddingEnd:localProps.sidePadding-5,
    justifyContent:'center',
    width:'100%',
},
sidePaddingBottom:{
    paddingStart:5,
    paddingEnd:5,
    justifyContent:'center',
    width:'100%',
    marginBottom: 5,
},
faturedRowContainer:{

    paddingStart:5,
    width:'50%',
    paddingTop:localProps.sidePadding,
    paddingBottom:localProps.sidePadding,
},
textBlack:{
    color:Appearences.Colors.black,
    fontSize:Appearences.Fonts.subHeadingFontSize,
    paddingTop: localProps.sidePadding,
    paddingBottom: localProps.sidePadding,

},

descriptionData:{
    fontSize:Appearences.Fonts.paragraphFontSize,
    fontFamily:Appearences.Fonts.paragaphFont,
    color:Appearences.Colors.black,
  },

listRowContainer:{
    flexDirection:'row',
    alignItems: 'center',
    paddingTop:localProps.sidePadding,
    paddingBottom:localProps.sidePadding,
    width:'100%',
},
listTextContainer:{
  justifyContent:'center',
  flex:1,
  marginStart:4,
},
dateText:{
    color:Appearences.Colors.grey,
    fontSize:Appearences.Fonts.paragraphFontSize,
    marginTop:localProps.topMargin,
},
  
    messageText:{
        color:Appearences.Colors.grey,
        fontSize:Appearences.Fonts.paragraphFontSize,
         marginTop:localProps.topMargin,
      },
    messageTextRed:{
        fontSize:Appearences.Fonts.headingFontSize,
    },
    bidAmountText:{
      fontSize:Appearences.Fonts.headingFontSize,
      width:'20%',
      color:Appearences.Colors.black,
    },
    absoluteContainer:{
        width:'100%',
        height:'100%',
        position:'absolute',
        justifyContent:'flex-end',
        paddingStart:localProps.sidePadding,
        paddingEnd:localProps.sidePadding,
        alignItems:'center',
    },
 
    TextInput:{
  height:Appearences.Registration.itemHeight,
  width:"100%",
  backgroundColor:Appearences.Registration.boxColor,
  borderRadius:5,
  paddingStart:15,
  paddingEnd:15,
  marginTop:localProps.topMargin,
  paddingBottom:0,
  paddingTop:0,
  fontSize:Appearences.Fonts.headingFontSize,
  color:Appearences.Colors.black,
      
    },
  
    commentsTextinput:{
        height:40,
        width:'50%',
        borderColor:Appearences.Colors.lightGrey,
        borderWidth:0.5,
    },
    sendButtonContainer:{

        height:30,
        width:'25%',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:Appearences.Radius.radius,

    },
    sendButtonContainerWhite:{

      height:40,
      width:'25%',
      alignItems:'center',
      justifyContent:'center',
  },
    sendButtonText:{
        color:'white',
        fontSize:Appearences.Fonts.headingFontSize,
        fontWeight:Appearences.Fonts.headingFontWieght,
    },

    loadMoreContainer:{
        width:'100%',
        height:50,
        marginTop:localProps.topMargin,
        alignItems:'center',
        justifyContent:'center',
    },
 
    loadMoreButtonText:{
        color:'white',
        fontSize:Appearences.Fonts.paragraphFontSize,
    },




    modal: {
        backgroundColor:'white',
        width: '90%',
      
     
        padding:25,
        borderRadius:Appearences.Radius.radius,
      },
      modalContentContainer:{
  
        paddingStart:10,
        paddingEnd:10,
        marginTop:5,
      },
      TextInputMultiline:{
        
        backgroundColor:Appearences.Registration.boxColor,
        fontSize:Appearences.Fonts.headingFontSize,
        marginTop:5,
        minHeight: 100,
        textAlignVertical: 'top',
        maxHeight:100,
        padding:15,
        borderRadius:Appearences.Radius.radius,
      },
      modalHeadingContainer:{
        width:'100%',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        
        
        },
        modaHeadingText:{
          color:'white',
          fontSize:Appearences.Fonts.headingFontSize,
          marginStart:localProps.sidePadding,
        
        },
        modalHeadingImage:{

            tintColor:Appearences.Colors.black,
            width:15,
            height:15,
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
  height:40,
  marginTop:localProps.topMargin,
  flexDirection:'row',
  justifyContent:'space-between',
  },
  cancelButton:{
    height:'100%',
    width:'48%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:Appearences.Radius.radius,
    borderColor:Appearences.Colors.grey,
    borderWidth:1,

  },

  row:{
    flexDirection:'row',
                marginTop:5,
        
              },

  sendButton:{
    height:'100%',
    width:'48%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:Appearences.Radius.radius,
    
  },
  modalButtonTextStyle:{
    fontSize:Appearences.Fonts.headingFontSize,
    fontWeight:Appearences.Fonts.headingFontWieght,
    color:'white',
  },
  modalContainer:{
    width:"100%",
    height:"100%",
    flexDirection:"row",
    backgroundColor: 'rgba(0,0,0,0.5)',
    position:"absolute",
    alignItems:"center",
    justifyContent:'center',
  //  backgroundColor:'white',
  },

  headingTextContainer:{
    flexDirection:'row',
    marginTop:localProps.topMargin,
    alignItems:'center'
  },
  subHeadingText:{
    color:Appearences.Colors.black,
    fontSize:Appearences.Fonts.subHeadingFontSize,
   
    fontWeight:Appearences.Fonts.headingFontWieght,
},
  headingTextBlack:{
  
    fontSize:Appearences.Fonts.headingFontSize,
   marginTop:localProps.topMargin,
    color:Appearences.Colors.black,
  },
  modalHeadingText:{
  
    fontSize:Appearences.Fonts.subHeadingFontSize,
    color:Appearences.Colors.black,
  },
  
  pickerContainer:{
    height:Appearences.Registration.itemHeight,
    width:"100%",
    backgroundColor:Appearences.Registration.boxColor,  
    paddingStart:15,
    paddingEnd:15,
    marginTop:localProps.topMargin,
    marginBottom:localProps.topMargin,
    paddingBottom:0,
    paddingTop:0,
    borderRadius:5,
     justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
  },
  dorpDownStyle:{
    width:'70%',
    marginStart:-15,
  },
  dropDownTextStyle :{
    fontSize:Appearences.Fonts.headingFontSize,
    color:Appearences.Colors.headingGrey,
    padding:10, 
    textAlignVertical:'center',
    marginTop:5,

  },
  dorpdownContainerTextStyle:{
    fontSize:Appearences.Fonts.headingFontSize,
    color:Appearences.Colors.headingGrey,

  },
  dorpDownRow:{
    width:'100%',
   
    justifyContent:'center',
  },

  dropdownArrowContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    position:'absolute',
    height:'100%',
    width:'100%',
    backgroundColor:'transparent',
    paddingEnd:15,
  },
  dropdownSeperatorStyle:{
      width:0,
      height:0,
      backgroundColor:'transparent',
    },
  popupViewImage:{
    width:Appearences.Fonts.paragraphFontSize,
    height:Appearences.Fonts.paragraphFontSize,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  
  },
  

  noDataContainer:{
    alignSelf:'center',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    height:100,
  },
  textArea:{
    minHeight:100,
      width:"100%",
      textAlignVertical: "top",
      marginTop:localProps.topMargin,
    
      padding:15,
      backgroundColor:Appearences.Registration.boxColor,
      borderRadius:5,
      paddingStart:15,
      paddingEnd:15,
      fontSize:Appearences.Fonts.headingFontSize,
      color:Appearences.Colors.black,
},
   
  });
  export default styles;
  
  


import React, { Component } from 'react';
import Appearences from '../../../config/Appearences';
import { I18nManager } from 'react-native'
import { width } from 'react-native-dimension';

import {
  StyleSheet,
} from 'react-native';
const localProps = {
  ratingHeaderDataDimens: 7,
  topMargin: 5,
  dataRowNumberFontSize: 12,
  sidePadding: 15,

}
const styles = StyleSheet.create({





  container: {
    paddingStart: localProps.sidePadding,
    paddingEnd: localProps.sidePadding,

  },
  containerFeatured: {

    marginHorizontal: 5,
    marginTop: 5,
    backgroundColor: 'white',
    width: width(44),
    borderRadius: Appearences.Radius.radius,

  },
  subHeading: {
    color: Appearences.Colors.black,
    fontWeight: Appearences.Fonts.headingFontWieght,
    fontSize: Appearences.Fonts.subHeadingFontSize,
  },
  topSpace: {
    marginTop: localProps.topMargin,
  },
  flastListItemContainer: {
    marginTop: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    borderRadius: Appearences.Radius.radius,

  },
  flatListBackgroundImageContainer: {
    width: '35%',
    borderBottomLeftRadius: Appearences.Radius.radius,
    borderTopLeftRadius: Appearences.Radius.radius,
    overflow: 'hidden',
  },
  flatListBackgroundImage: {
    width: '100%',
    flex: 1,
    height: 50,
    resizeMode: 'cover',
    borderBottomLeftRadius: Appearences.Radius.radius,
    borderTopLeftRadius: Appearences.Radius.radius,
  },




  flatListContentContainer: {

    width: '65%',
  },
  flatListContentRow1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatListContentRow1Text: {
    fontSize: Appearences.Fonts.paragraphFontSize,
    color: Appearences.Colors.grey,
    marginTop: localProps.topMargin,
    alignSelf: 'flex-start',
  },
  menuItemSperator: {
    height: 1,
    width: '100%',
    backgroundColor: Appearences.Colors.lightGrey,
  },

  flatListItemHeadingText: {
    color: Appearences.Colors.black,
    fontSize: Appearences.Fonts.headingFontSize,
    alignSelf: 'flex-start',
    fontWeight: Appearences.Fonts.headingFontWieght,
  },
  flatListItemMileageText: {
    color: Appearences.Colors.grey,
    fontFamily: Appearences.Fonts.paragaphFont,
    fontSize: Appearences.Fonts.paragraphFontSize,
    marginTop: localProps.topMargin,
    alignSelf: 'flex-start',

  },
  flatListItemPriceText: {
    fontSize: Appearences.Fonts.paragraphFontSize,
    marginTop: localProps.topMargin,
    alignSelf: 'flex-start',

  },




  imageContainer: {

    height: 150,
    width: '100%',
    borderTopLeftRadius: Appearences.Radius.radius,
    borderTopRightRadius: Appearences.Radius.radius,
    overflow: 'hidden',


  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    borderTopLeftRadius: Appearences.Radius.radius,
    borderTopRightRadius: Appearences.Radius.radius,
  },
  imageContainerOverlay: {
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',

  },
  topRowContainer: {

    height: '50%',
    flexDirection: 'row',
    justifyContent: "flex-end",

  },
  topRightContent: {
    width: 60,
    height: 60,

    alignItems: 'flex-end',
  },

  bottomRowContainer: {
    height: '50%',

    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomLeftContent: {
    maxWidth: '70%',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomRightContent: {
    width: 22,
    height: 22,
    margin: 5,
    borderRadius: 100 / 2,
    alignItems: 'center',
    justifyContent: 'center',

  },
  bottomRightContentImage: {
    width: 7,
    height: 7,
  },



  textContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
  brandTextStyle: {
    color: Appearences.Colors.grey,
    fontSize: Appearences.Fonts.paragraphFontSize,
    fontFamily: Appearences.Fonts.paragaphFont,
    marginTop: Appearences.Margins.top,
    alignSelf: 'flex-start',

  },
  featuredGrid: {
    width: '100%',
    flexDirection: 'row',
    marginStart: -5,

  },
  buttonTextStyle: {
    color: 'white',
    fontSize: Appearences.Fonts.paragraphFontSize,
  },

  headingFontWhite: {
    fontSize: Appearences.Fonts.headingFontSize,
    color: 'white',
    fontWeight: Appearences.Fonts.headingFontWieght,
  },
  modelTextStyle: {
    color: Appearences.Colors.black,
    fontSize: Appearences.Fonts.headingFontSize,
    alignSelf: 'flex-start',
    fontWeight: Appearences.Fonts.headingFontWieght,
  },
  locationRowContainer: {

    alignItems: 'center',
    flexDirection: 'row',
    marginTop: Appearences.Margins.top,
    justifyContent: 'flex-start',

  },
  locationImage: {
    width: 8,
    height: 8,
    marginTop: 3,
    alignSelf: 'flex-start',

  },
  locationTextStyle: {
    color: Appearences.Colors.grey,
    fontSize: Appearences.Fonts.paragraphFontSize,
    fontFamily: Appearences.Fonts.paragaphFont,
    marginStart: 4,
    alignSelf: 'flex-start',
  },
  milageRow: {
    flexDirection: 'row',

  },
  petrolContainer: {

    flexDirection: 'row',
  },
  petrolImageStyle: {
    width: 8,
    height: 8,
    marginTop: 8,

  },
  petrolTextStyle: {
    color: Appearences.Colors.grey,
    fontSize: Appearences.Fonts.paragraphFontSize,
    fontFamily: Appearences.Fonts.paragaphFont,
    marginTop: Appearences.Margins.top,
    marginStart: 5,
    alignSelf: 'flex-start',
  },
  mileageContainer: {
    flexDirection: 'row',
    marginStart: 5,
    marginTop: Appearences.Margins.top,
    alignItems: 'center',
  },
  mileageImageStyle: {
    width: 8,
    height: 8,

  },
  mileageTextStyle: {
    color: Appearences.Colors.grey,
    fontSize: Appearences.Fonts.paragraphFontSize,
    fontFamily: Appearences.Fonts.paragaphFont,
    alignSelf: 'flex-start',
    marginStart: 5,
  },
  headerSearchbarContainer: {
    width: '100%',
    height: Appearences.Registration.itemHeight + 10,
    flexDirection: 'row',
    paddingStart: 15,
    paddingEnd: 15,
    alignItems: 'center',
  },
  TextInput: {
    flex: 1.5,
    height: Appearences.Registration.itemHeight - 10,
    backgroundColor: 'white',
    paddingStart: localProps.sidePadding,
    paddingEnd: localProps.sidePadding,
    paddingBottom: 0,
    paddingTop: 0,
    fontSize: Appearences.Fonts.headingFontSize,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    color: Appearences.Colors.black,

  },
  searchButton: {
    paddingStart: localProps.sidePadding,
    paddingEnd: localProps.sidePadding,
    height: Appearences.Registration.itemHeight - 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,

  },
  searchImage: {
    width: 15,
    height: 15,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    tintColor: 'black',
  },
  filterRow: {
    width: '100%',
    height: Appearences.Registration.itemHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  filterItemConteiner: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingStart: localProps.sidePadding,
    backgroundColor: Appearences.Colors.black,

  },
  headingTextWhite: {
    color: 'white',
    fontSize: Appearences.Fonts.headingFontSize,
    marginStart: 25,
    marginEnd: 25,
    fontWeight: Appearences.Fonts.headingFontWieght,
  },
  filterImage: {
    width: 15,
    height: 15,
    resizeMode: 'cover',
  },
  filterSeperator: {
    width: 1,
    height: '70%',
    backgroundColor: Appearences.Colors.lightGrey,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentContainer: {
    width: '95%',
    backgroundColor: 'white',
  },
  modalHeaderContainer: {
    width: '100%',
    height: 50,
    justifyContent: 'space-between',
    paddingStart: localProps.sidePadding,
    paddingEnd: localProps.sidePadding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: Appearences.Fonts.subHeadingFontSize,
    color: 'white',
    fontWeight: Appearences.Fonts.headingFontWieght,

  },
  modalHeadingImage: {
    width: 15,
    height: 15,
  },

  subHeadingContainer: {
    paddingStart: localProps.sidePadding,
    paddingEnd: localProps.sidePadding,
    marginTop: localProps.topMargin + 5,
  },
  modalBoxStyle: {
    alignItems: 'center',
    height: 200,
    borderRadius: Appearences.Radius.radius,
  },
  modalItemContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingStart: localProps.sidePadding,
    paddingEnd: localProps.sidePadding,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: localProps.topMargin,
  },

  listItemText: {
    color: Appearences.Colors.black,
    fontSize: Appearences.Fonts.headingFontSize,

    fontWeight: Appearences.Fonts.headingFontWieght,
  },
  rowSeperator: {
    width: '100%',
    height: 1,
    backgroundColor: Appearences.Colors.grey,
  },
  dropDownTextStyle: {
    fontSize: Appearences.Fonts.headingFontSize,
    color: Appearences.Colors.grey,
    padding: 5,
  },
  dorpdownContainerTextStyle: {
    fontSize: Appearences.Fonts.headingFontSize,
    color: '#999999',

  },
  dorpDownRow: {
    width: '100%',

    padding: 5,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    // marginTop: 5,
    // backgroundColor:'red'
  },
  pickerContainer: {
    // height: '26%',
    // width: "50%",
    // backgroundColor: 'red',
    // paddingStart: 15,
    // paddingEnd: 15,
    // marginTop: localProps.topMargin,
    // marginBottom: localProps.topMargin,
    paddingBottom: 0,
    paddingHorizontal:10,
    paddingTop: 0,
    // alignSelf:"flex-end",
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor:'red',
    borderRadius: 5,

  },
  popupViewImage: {
    width: Appearences.Fonts.paragraphFontSize,
    height: Appearences.Fonts.paragraphFontSize,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    // backgroundColor:'red',

  },

  dorpDownStyle: {
    width: '42%',
    height: 150,
    marginRight:-15
    // position:'absolute',
    // right:1
    // marginStart: 100,
  },
  dorpDownStyleDate: {
    width: '33%',
    height: 250,
    marginStart: -15,
  },
  dropdownSeperator: {
    width: 0,
    height: 0,
    margin: 0,
  },
  dropdownArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // position: 'absolute',
    // right:1,
    height: '100%',
    width: '10%',
    // backgroundColor: 'green',
    // paddingEnd: 15,
    
  },
  radioButtonStyle: {
    alignSelf: 'flex-end',

  },
  buttonWrapStyle: {
    justifyContent: 'center',
    alignItems: 'center',

  },

});
export default styles;


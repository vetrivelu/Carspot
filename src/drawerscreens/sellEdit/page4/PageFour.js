import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ActivityIndicator,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import Appearences from '../../../config/Appearences';
import Modal from 'react-native-modalbox';

import styles from './Styles';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Store from '../../../Stores';
import Toast from 'react-native-simple-toast';
import Api, { GoogleApiKey } from '../../../network/Api';
import Spinner from 'react-native-loading-spinner-overlay';
import { observer } from 'mobx-react';
import Loader from '../../../components/Loader';
import s from '../page3/Styles';
import { CheckBox } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import { withNavigation, NavigationActions } from 'react-navigation';
import ConfirmDialogue from '../../../components/ConfirmDialogue';
import ModalBox from 'react-native-modalbox';
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
@observer
class PageFour extends Component<Props> {


  isCategoryRequired = false;

  categoryClear = true;

  textFieldClear = true;
  selectClear = true;
  dateClear = true;
  webClear = true;
  checkClear = true;


  isLatitudeRequired = false;
  isLongitudeRequired = false;
  isLocationReqired = false;
  isCountryRequired = false;
  isPhoneRequired = false;
  isNameRequired = false;

  isNameClear = true;
  isPhoneClear = true;
  isLatitudeClear = true;
  isLongitudeClear = true;
  isCountryClear = true;
  isAddressClear = true;
  constructor() {
    super();

    this.state = {

      nameText: "",
      phoneText: "",
      showPriceOnly: true,

      showNameError: false,
      showPhoneError: false,
      showLatitudeError: false,
      showLongitudeError: false,
      showAddressError: false,
      showCountryError: false,
      showProgress: false,
      showDescriptionError: false,

      predictions: [],
      location: "",
      focus: false,
      latitude: "0",
      longitude: "0",
      showCountrySpinner: false,
      locationsArray: [],
      adsByValue: '',
      isAdsByModalDisabled: false,
      countryId: "",
      showProgress: false,



      showCategorySpinner: false,

      subCategories: [],
      subSubCategories: [],
      subSubSubCategories: [],
      showSubCategories: false,
      showSubSubCategories: false,
      showSubSubSubCategories: false,

      textFieldModel: [],
      webModel: [],
      selectModel: [],
      checkboxModel: [],
      dateModel: [],
      categoryId: "",

      showCategoryError: false,

      pageFour: [],
      priceTypeId: "",
      showPriceTypeError: false,
      selectedTag: 'body',
      selectedStyles: [],
      isBumpupChecked: false,
      isFeaturedChecked: false,

      scrollEnabled: true,
      marginBottom: 1,
      updateLocation: false,

      adOns: [],
      showAdOnSpinner: false,
      totalText: '',
      total: '',

      showConfirmDialogue: false,
      okText: '',
      cancelText: '',
      titleText: '',


      subcategoryShownOnce: false,
      subcategoryShownTwice: false,
      count: 0
    };
    this.editor = null;

  }

  componentDidMount = () => {
    let { orderStore } = Store;
    for (var i = 0; i < orderStore.innerResponse.pageFour.length; i++) {
      if (orderStore.innerResponse.pageFour[i].type == "select" && orderStore.innerResponse.pageFour[i].fieldTypeName == "ad_price_type") {
        if (orderStore.innerResponse.pageFour[i].values[0].id != undefined)
          this.setState({ priceTypeId: orderStore.innerResponse.pageFour[i].values[0].id, showPriceOnly: orderStore.innerResponse.pageFour[i].values[0].is_show });

      }

    }
    this.setState({ pageFour: orderStore.innerResponse.pageFour });
    // console.log('orderstore here in PAGE4 is ', JSON.stringify(orderStore))
  }

  getPageFour = (item, index) => {
    let { orderStore } = Store;
    switch (item.type) {


      case "checkbox":
        var data = item;
        return (
          <DismissKeyboard>
            <View key={index}>

              <View style={styles.headingTextContainer}>
                <Text style={styles.subHeading}>{item.isRequired ? data.title + " * " : data.title}</Text>
              </View>
              <View style={item.showError ? s.featuresContainerError : s.featuresContainer}>
                {
                  data.values.map((item, key) => (

                    <CheckBox
                      checkedColor={orderStore.color}
                      uncheckedColor={Appearences.Colors.headingGrey}
                      title={item.name}
                      key={key}
                      checked={item.is_checked
                        //false

                        //false
                      }
                      containerStyle={s.checkBox}
                      size={Appearences.Fonts.paragraphFontSize}
                      textStyle={s.checkBoxText}
                      key={key}
                      onPress={() => {
                        let checkBoxClone = [...this.state.pageFour];
                        checkBoxClone[index].values[key].is_checked = !item.is_checked;
                        checkBoxClone[index].showError = false;
                        this.setState({ pageFour: checkBoxClone });

                      }}>
                    </CheckBox>

                  )
                  )}
              </View>

            </View>
          </DismissKeyboard>

        );



      case "textfield":
        if (item.fieldTypeName == 'ad_price') {
          if (this.state.showPriceOnly)
            return (
              <DismissKeyboard>

                <View>
                  <View style={styles.headingTextContainer}>
                    <Text style={styles.subHeading}>{item.isRequired ? item.title + " * " : item.title}</Text>
                  </View>
                  <TextInput style={item.showError ? styles.TextInputError : styles.TextInput}
                    underlineColorAndroid='transparent'
                    textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                    placeholderTextColor={Appearences.Registration.textColor}
                    keyboardType="numeric"
                    returnKeyType="done"

                    onChangeText={(message) => item.value = message}></TextInput>
                </View>
              </DismissKeyboard>
            );
          else return null;

        }
        return (
          <DismissKeyboard>

            <View>
              <View style={styles.headingTextContainer}>
                <Text style={styles.subHeading}>{item.isRequired ? item.title + " * " : item.title}</Text>
              </View>
              <TextInput style={item.showError ? styles.TextInputError : styles.TextInput}
                underlineColorAndroid='transparent'
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                value={item.value}
                placeholderTextColor={Appearences.Registration.textColor}
                onChangeText={(message) => item.value = message}

              >
              </TextInput>
            </View>
          </DismissKeyboard>

        );


      // new code
      case "textarea":
        return (
          <DismissKeyboard>

            <View>
              <View style={styles.headingTextContainer}>
                <Text style={styles.subHeading}>{item.isRequired ? item.title + " * " : item.title}</Text>
              </View>
              <TextInput style={item.showError ? styles.TextInputMultilineError : styles.TextInputMultiline}
                underlineColorAndroid='transparent'
                multiline={true}
                numberOfLines={10}
                value={this.state.pageFour[index].value}
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                placeholderTextColor={Appearences.Registration.textColor}
                onChangeText={(message) => {
                  let stateClone = [...this.state.pageFour];
                  if (message.length != 0 && item.isRequired) {
                    stateClone[index].showError = false;
                  }
                  stateClone[index].value = message;
                  this.setState({ pageFour: stateClone })
                }}

              >
              </TextInput>
            </View>
          </DismissKeyboard>

        );
      // new code



      case "select":
        if (item.data.field_type_name === "ad_price_type")
          return this.getPriceTypeField();
        if (item.data.field_type_name === "ad_cats1")
          return this.getCategories(item.data);
        else {
          const reference = index;
          var data = item;
          var names = [];
          var ids = [];

          data.values.map((item, index) => {
            names.push(item.name);
            ids.push(item.value);

          });
          return (
            <DismissKeyboard>

              <View key={index}>

                <View style={styles.headingTextContainer}>
                  <Text style={styles.subHeading}>{item.isRequired ? data.title + " * " : data.title}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                  reference.show();
                }}
                  style={styles.row}
                >
                  <ModalDropdown
                    options={names}
                    ref={el => reference = el}
                    style={item.showError ? styles.pickerContainerError : styles.pickerContainer}
                    // dropdownStyle={{
                    //   width: '92%',
                    //   marginStart: -15,
                    //   height: ((names.length * 27) + 27),
                    //   elevation: 1,
                    //   shadowOpacity: 0.1,
                    // }}
                    dropdownStyle={{
                      width: '92%',
                      marginStart: -15,

                      // height: ((names.length * 27) + 27)>'80%'?'80%': ((names.length * 27) + 27),
                      // elevation: 1,
                      // shadowOpacity: 0.1,
                    }}
                    dropdownTextHighlightStyle={styles.dropDownTextStyle}
                    textStyle={styles.dorpdownContainerTextStyle}
                    defaultValue={item.selectedValue}
                    onSelect={(innerIndex, value) => {
                      item.selectedValue = names[innerIndex];
                      item.selectedId = ids[innerIndex];
                      if (ids[innerIndex].length === 0) {
                        var selecStateClone = [...this.state.selectModel];
                        selecStateClone[index].showError = true;
                        this.setState({ selectModel: selecStateClone });
                      }



                    }}
                    renderSeparator={() => {
                      return (<View style={{
                        width: 0,
                        height: 0,

                      }} />);
                    }}

                    renderRow={(option, index, isSelected) => {
                      return (<View style={styles.dorpDownRow}>
                        <Text style={styles.dropDownTextStyle}>{option}</Text>
                      </View>);
                    }} />
                  <View style={styles.dropdownArrowContainer}>
                    <Image
                      style={styles.popupViewImage}
                      source={require('../../../../res/images/right_arrow.png')}
                    />
                  </View>
                </TouchableOpacity>




              </View>
            </DismissKeyboard>

          );
        }
    }

  }
  getCategories = (item) => {
    this.isCategoryRequired = item.is_required;
    var valuesArray = [];
    var idsArray = [];
    for (var i = 0; i < item.values.length; i++) {
      valuesArray.push(item.values[i].name);
      idsArray.push(item.values[i].id);

    }

    return (
      <DismissKeyboard>

        <View>
          {/* <Spinner
          visible={this.state.showCategorySpinner}
          textContent={''}
          animation='slide'
        /> */}


          {/* Make */}
          <View style={styles.headingTextContainer}>
            <Text style={styles.subHeading}>{this.isCategoryRequired ? item.title + " * " : item.title}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            this.makeDropdownRef.show();
          }}
            style={styles.row}
          >
            <ModalDropdown
              options={valuesArray}
              ref={el => this.makeDropdownRef = el}
              style={this.state.showCategoryError ? styles.pickerContainerError : styles.pickerContainer}
              dropdownStyle={styles.dorpDownStyle}
              dropdownTextHighlightStyle={styles.dropDownTextStyle}
              textStyle={styles.dorpdownContainerTextStyle}
              defaultValue={valuesArray[0]}
              onSelect={(index, value) => {
                let { orderStore } = Store;

                if (idsArray[index].length != 0)
                  this.setState({ categoryId: idsArray[index] });

                if (item.values[index].has_sub) {

                  this.getSubCategories(idsArray[index]);
                }
                this.setState({ showSubCategories: false, showSubSubCategories: false, showSubSubSubCategories: false, });

                if (item.values[index].has_template) {
                  orderStore.optionSelectedModel.hasTemp = true;
                  orderStore.optionSelectedModel.categoryId = idsArray[index];

                }
                else
                  orderStore.optionSelectedModel.hasTemp = false;
                orderStore.setOnDynamicOptionSeleted(true);


              }}
              renderSeparator={() => {
                return (<View style={{
                  width: 0,
                  height: 0,
                }} />);
              }}

              renderRow={(option, index, isSelected) => {

                return (<View style={styles.dorpDownRow}>
                  <Text style={styles.dropDownTextStyle}>{option}</Text>
                </View>);
              }} />
            <View style={styles.dropdownArrowContainer}>
              <Image
                style={styles.popupViewImage}
                source={require('../../../../res/images/right_arrow.png')}
              />
            </View>
          </TouchableOpacity>



        </View>
      </DismissKeyboard>

    );
  }
  postAdOns = async (adOnId, index) => {
    this.setState({ showAdOnSpinner: true });
    let { orderStore } = Store;
    const params = { ad_id: orderStore.settings.data.ad_id, adons_id: adOnId };
    const response = await Api.post("ad_post/adons", params);
    // console.log(JSON.stringify(response));
    if (response.success === true) {
      let adOnsClone = [...this.state.adOns];
      adOnsClone[index].button.btn_txt = response.btn_text;
      this.setState({ adOns: adOnsClone, totalText: response.total_text, total: response.total });
      if (response.text.length != 0)
        Toast.show(response.text);
    }

    this.setState({ showAdOnSpinner: false });
  }
  getSubCategories = async (id) => {
    this.setState({ showCategorySpinner: true, subCategories: [] });
    const params = { subcat: id };
    const response = await Api.post("post_ad/subcats", params);

    if (response.extras.package_type != undefined && response.extras.package_type != 'undefined' && response.extras.package_type.length != 0) {
      const pkgType = response.extras.package_type;
      const obj = { isRedirect: pkgType.is_redirect, redirectUrl: pkgType.redirect_url, total: pkgType.cart_total, totalText: pkgType.cart_total_text };
      let { orderStore } = Store;
      orderStore.cart = obj;
      this.setState({ total: orderStore.cart.total, totalText: orderStore.cart.totalText });

    }

    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      this.checkBoxTemp = [];
      this.setState({ subCategories: tempArray, showSubCategories: true, });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showCategorySpinner: false });

  }
  getSubSubSubCategories = async (id) => {
    this.setState({ showCategorySpinner: true, subSubSubCategories: [] });
    const params = { subcat: id };
    const response = await Api.post("post_ad/subcats", params);
    if (response.extras.package_type != undefined && response.extras.package_type != 'undefined' && response.extras.package_type.length != 0) {
      const pkgType = response.extras.package_type;
      const obj = { isRedirect: pkgType.is_redirect, redirectUrl: pkgType.redirect_url, total: pkgType.cart_total, totalText: pkgType.cart_total_text };
      let { orderStore } = Store;
      orderStore.cart = obj;
      this.setState({ total: orderStore.cart.total, totalText: orderStore.cart.totalText });

    }
    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      this.checkBoxTemp = [];
      this.setState({ subSubSubCategories: tempArray, showSubSubSubCategories: true, });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showCategorySpinner: false });

  }
  getSubSubCategories = async (id) => {
    this.setState({ showCategorySpinner: true, subSubCategories: [] });
    const params = { subcat: id };
    const response = await Api.post("post_ad/subcats", params);

    if (response.extras.package_type != undefined && response.extras.package_type != 'undefined' && response.extras.package_type.length != 0) {
      const pkgType = response.extras.package_type;
      const obj = { isRedirect: pkgType.is_redirect, redirectUrl: pkgType.redirect_url, total: pkgType.cart_total, totalText: pkgType.cart_total_text };
      let { orderStore } = Store;
      orderStore.cart = obj;
      this.setState({ total: orderStore.cart.total, totalText: orderStore.cart.totalText });
    }

    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      this.checkBoxTemp = [];
      this.setState({ subSubCategories: tempArray, showSubSubCategories: true, });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showCategorySpinner: false });

  }
  getPriceTypeField = () => {

    let { orderStore } = Store;
    let priceType = orderStore.settings.extra.price_type_data;
    let extra = orderStore.settings.extra;
    var valuesArray = [];
    var idsArray = [];
    var isShow = [];
    for (var i = 0; i < priceType.length; i++) {

      valuesArray.push(priceType[i].val);
      idsArray.push(priceType[i].key);
      isShow.push(priceType[i].is_show);
    }

    return (
      <DismissKeyboard>

        <View>

          <View style={styles.headingTextContainer}>
            <Text style={styles.subHeading}>{extra.price_type_title + " * "}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            this.priceTypeRef.show();
          }}
            style={styles.row}
          >
            <ModalDropdown
              options={valuesArray}
              ref={el => this.priceTypeRef = el}
              style={this.state.showPriceTypeError ? styles.pickerContainerError : styles.pickerContainer}
              dropdownStyle={{
                width: '92%',
                marginStart: -15,
                height: ((valuesArray.length * 27) + 27),
                elevation: 1,
                shadowOpacity: 0.1,
              }}
              dropdownTextHighlightStyle={styles.dropDownTextStyle}
              textStyle={styles.dorpdownContainerTextStyle}
              defaultValue={valuesArray[0]}
              onSelect={(index, value) => {

                this.setState({ priceTypeId: idsArray[index], showPriceOnly: isShow[index] });
              }}
              renderSeparator={() => {
                return (<View style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: Appearences.Colors.lightGrey
                }} />);
              }}

              renderRow={(option, index, isSelected) => {

                return (<View style={styles.dorpDownRow}>
                  <Text style={styles.dropDownTextStyle}>{option}</Text>
                </View>);
              }} />
            <View style={styles.dropdownArrowContainer}>
              <Image
                style={styles.popupViewImage}
                source={require('../../../../res/images/right_arrow.png')}
              />
            </View>
          </TouchableOpacity>

        </View>
      </DismissKeyboard>

    );

  }
  getSubSubCategoriesView = () => {
    var names = [];
    var ids = [];
    var hasSubs = [];
    var hasTemplate = [];
    this.state.subSubCategories.map((item, index) => {
      names.push(item.name);
      ids.push(item.id);
      hasSubs.push(item.has_sub);
      hasTemplate.push(item.has_template);

    });

    let { orderStore } = Store;
    return (
      <DismissKeyboard>

        <View>

          <TouchableOpacity onPress={() => {
            this.subSubRef.show();
          }}
            style={styles.row}
          >
            <ModalDropdown
              options={names}
              ref={el => this.subSubRef = el}
              style={styles.pickerContainer}
              dropdownStyle={styles.dorpDownStyle}
              dropdownTextHighlightStyle={styles.dropDownTextStyle}
              textStyle={styles.dorpdownContainerTextStyle}
              defaultValue={orderStore.settings.extra.select}
              onSelect={(index, value) => {
                let { orderStore } = Store;

                if (ids[index].length != 0)
                  this.setState({ categoryId: ids[index] });

                if (hasSubs[index]) {
                  this.getSubSubSubCategories(ids[index]);
                }

                this.setState({ showSubSubSubCategories: false });

                if (hasTemplate[index]) {
                  orderStore.optionSelectedModel.hasTemp = true;
                  orderStore.optionSelectedModel.categoryId = ids[index];
                }
                else
                  orderStore.optionSelectedModel.hasTemp = false;
                orderStore.setOnDynamicOptionSeleted(true);
              }}
              renderSeparator={() => {
                return (<View style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: Appearences.Colors.lightGrey
                }} />);
              }}

              renderRow={(option, index, isSelected) => {
                return (<View style={styles.dorpDownRow}>
                  <Text style={styles.dropDownTextStyle}>{option}</Text>
                </View>);
              }} />
            <View style={styles.dropdownArrowContainer}>
              <Image
                style={styles.popupViewImage}
                source={require('../../../../res/images/right_arrow.png')}
              />
            </View>
          </TouchableOpacity>




        </View>
      </DismissKeyboard>

    );
  }

  componentWillMount() {
    let { orderStore } = Store;
    const profile = orderStore.settings.data.profile;
    this.setState({
      latitude: profile.map.location_lat.field_val == "" ? 0 : profile.map.location_lat.field_val,
      longitude: profile.map.location_long.field_val == "" ? 0 : profile.map.location_long.field_val,

      adsByValue: profile.ad_country != undefined ? profile.ad_country.values != undefined ? profile.ad_country.values[0].name : null : null,
      nameText: profile.name.field_val,
      phoneText: profile.phone.field_val,
      location: profile.location.field_val

    })
    if (profile._ad_country_show && profile.ad_country.values != undefined) {
      this.setState({
        countryId: profile.ad_country.values[0].value,
      })
    }


    if (orderStore.pricing.is_show &&
      orderStore.pricing.category_based.is_show) {
      this.setState({ adOns: orderStore.pricing.category_based.pricing });
    }

    for (var i = 0; i < orderStore.innerResponse.pageFour.length; i++) {
      if (orderStore.innerResponse.pageFour[i].fieldTypeName === "ad_cats1") {
        if (orderStore.innerResponse.pageFour[i].values[0].has_sub) {
          this.setState({ categoryId: orderStore.innerResponse.pageFour[i].values[0].id, showSubCategories: false, showSubSubCategories: false, showSubSubSubCategories: false, });

          this.getSubCategories(orderStore.innerResponse.pageFour[i].values[0].id);
        }
        if (orderStore.innerResponse.pageFour[i].values[0].has_template) {

        }
      }
    }
  }

  renderCountry = (item) => {
    return (
      <DismissKeyboard>

        <View>
          {/* <Spinner
        visible={this.state.showCountrySpinner}
        textContent={''}
        animation='slide'
      /> */}

          {/* Ads By Location */}
          <View style={styles.headingTextContainer}>
            <Text style={styles.subHeading}>{item.title + " * "}</Text>
          </View>




          <TouchableOpacity
            onPress={() => {
              this.setState({ locationsArray: item.values });

              this.refs.locationModal.open();

            }}
            style={this.state.showCountryError ? styles.pickerContainerError : styles.PopupViewContainer}>
            <Text style={styles.popupViewText}>{this.state.adsByValue}</Text>
            <Image
              style={styles.popupViewImage}
              source={require('../../../../res/images/right_arrow.png')}
            />
          </TouchableOpacity>

        </View>
      </DismissKeyboard>

    );


  }
  onAdsByModalClose = () => {
    this.setState({ locationsArray: [] });

  }
  onAdsByModalOpen() { }
  onAdsByModalClosingState(state) { }
  places = (text) => {
    const API_KEY = GoogleApiKey;  //old play4team
    fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + text + '&key=' + API_KEY)
      .then((response) => response.json())
      .then(func = async (responseJson) => {
        // console.log('result Places AutoComplete===>>', responseJson);
        if (responseJson.status === 'OK') {
          await this.setState({ predictions: responseJson.predictions, focus: true, updateLocation: false })
        }
      }).catch((error) => {
        // console.log('error', error);
        //  console.warn(error+"error");
      });

  }
  getLatLong = async (address) => {
    let api_key = GoogleApiKey;
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + api_key)
      .then((response) => response.json())
      .then(func = async (responseJson) => {
        if (responseJson.status === 'OK') {
          await this.setState({
            latitude: responseJson.results[0].geometry.location.lat,
            longitude: responseJson.results[0].geometry.location.lng
          })
        }
      })
  }
  getAddressFromLatLong = async (lat, long) => {
    let api_key = GoogleApiKey;
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + api_key)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ location: responseJson.results[0].formatted_address });
        //console.log(JSON.stringify(responseJson.results[0].formatted_address));
        //alert('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
      })

  }
  onSelectCountry = async (data) => {
    var key = "";
    if (data.value === undefined)
      key = data.id;
    else
      key = data.value;
    if (data.name.length != 0) {
      this.setState({ showCountryError: false });
    }
    this.setState({ adsByValue: data.name, countryId: key });

    if (data.has_sub) {
      this.setState({ showCountrySpinner: true });
      let params = {};
      params = { ad_country: data.id };
      const response = await Api.post("ad_post/sublocations", params);
      if (response.success === true) {
        if (this.state.subcategoryShownOnce == false) {
          this.setState({ locationsArray: response.data.values, showCountrySpinner: false, subcategoryShownOnce: true })
        } else {

          this.setState({ locationsArray: response.data.values, showCountrySpinner: false, subcategoryShownOnce: true })
        }
      }
      if (response.message.length != 0)
        Toast.show(response.message);



    }



  }
  constructDynamicObject = () => {
    let { orderStore } = Store;
    const adId = { ad_id: orderStore.settings.data.ad_id };
    orderStore.postAdObject = Object.assign(orderStore.postAdObject, adId);
    const isUpdate = { is_update: orderStore.settings.data.ad_id };
    orderStore.postAdObject = Object.assign(orderStore.postAdObject, isUpdate);
    if (this.state.countryId.length != 0) {
      const data = { ad_country: this.state.countryId };
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
      this.setState({ showCountryError: false });
      this.isCountryClear = true;
    }
    else if (this.state.countryId.length != 0 && this.isCountryRequired) {
      this.setState({ showCountryError: false });
      this.isCountryClear = false;
    }
    if (this.state.nameText.length != 0) {
      const data = { name: this.state.nameText };
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
      this.setState({ showNameError: false });
      this.isNameClear = true;
    }
    else if (this.state.nameText.length === 0 && this.isNameRequired) {
      this.setState({ showNameError: true });
      this.isNameClear = false;
    }
    if (this.state.phoneText.length != 0) {
      const data = { ad_phone: this.state.phoneText };
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
      this.setState({ showPhoneError: false });
      this.isPhoneClear = true;
    }
    else if (this.state.phoneText.length === 0 && this.isPhoneRequired) {
      this.setState({ showPhoneError: true });
      this.isPhoneClear = false;
    }
    if (this.state.location.length != 0) {
      const data = { ad_location: this.state.location }
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
      this.setState({ showAddressError: false });
      this.isAddressClear = true;

    }
    else if (this.state.location.length === 0 && this.isLocationReqired) {
      this.setState({ showAddressError: true });
      this.isAddressClear = false;
    }
    if (this.state.latitude.length != 0) {
      const data = { location_lat: this.state.latitude };
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
      this.setState({ showLatitudeError: false });
      this.isLatitudeClear = true;
    }
    else if (this.state.latitude.length === 0 && this.isLatitudeRequired) {
      this.setState({ showLatitudeError: true });
      this.isLatitudeClear = false;
    }
    if (this.state.longitude.length != 0) {
      const data = { location_long: this.state.longitude };
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
      this.setState({ showLongitudeError: false });
      this.isLongitudeClear = true;
    }
    else if (this.state.longitude.length === 0 && this.isLongitudeRequired) {
      this.setState({ showLongitudeError: true });
      this.isLongitudeClear = false;
    }


  }
  componentDidUpdate = () => {
    let { orderStore } = Store;
    orderStore.setOnForthPageChangeListener(false);
    orderStore.setOnEditAdClickListener(false);

  }
  postAd = async () => {
    let { orderStore } = Store;

    let featuredAd;
    let bumpupAd;
    if (this.state.isFeaturedChecked) {
      featuredAd = { ad_featured_ad: '1' };
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, featuredAd);

    }
    if (this.state.isBumpupChecked) {
      bumpupAd = { ad_bump_ad: '1' };
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, bumpupAd);

    }

    // console.warn(orderStore.isFirstPageClear + " " + orderStore.isSecondPageClear + " " + orderStore.isThirdPageClear + " " + orderStore.isForthPageClear);

    if (orderStore.isFirstPageClear && orderStore.isSecondPageClear && orderStore.isThirdPageClear && orderStore.isForthPageClear) {
      await this.setState({ showProgress: true });

      const response = await Api.post('post_ad', orderStore.postAdObject);
      if (response.success === true) {
        await this.setState({ showProgress: false });
        const { replace } = this.props.navigation;

        //////////////////////////////

        orderStore.profile = await Api.get('profile');

        // console.log('profile is called after edit')
        if (orderStore.profile.success === true) {

          let tabsText = orderStore.profile.data.tabs_text;

          this.tabsText = { profile: tabsText.profile, editProfile: tabsText.edit_profile, featuredAds: tabsText.featured_ads, inactiveAds: tabsText.inactive_ads, myAds: tabsText.my_ads, favouriteAds: tabsText.favorite_ads };
          // this.setState({showSpinner:false});
          // this.props.navigation.navigate('Profile');   

        }


        /////////////////////////////

        replace('AdDetailTabManager', { adId: orderStore.settings.data.ad_id });



      }
      await this.setState({ showProgress: false });
      if (response.message.length != 0)
        Toast.show(response.message);
      //this.props.navigation.navigate("DynamicLinksView",{id:item.key}); 
    }
    else
      Toast.show("Fill All Required Fields");
    // console.log(JSON.stringify(orderStore.postAdObject));

  }
  createData = async () => {
    let pageFourClone = [...this.state.pageFour];
    let { orderStore } = Store;
    for (var i = 0; i < this.state.pageFour.length; i++) {
      switch (this.state.pageFour[i].type) {

        case "checkbox":
          let values = [];
          let valuesClone = [...this.state.pageFour[i].values]
          for (var j = 0; j < valuesClone.length; j++) {
            if (valuesClone[j].is_checked)
              values.push(valuesClone[j].name);

          }
          if (values.length === 0 && this.state.pageFour[i].isRequired) {
            pageFourClone[i].showError = true;
            this.setState({ pageFour: pageFourClone });
          }

          else {
            pageFourClone[i].showError = false;
            this.setState({ pageFour: pageFourClone });
            let data = {};

            data[this.state.pageFour[i].fieldTypeName] = values;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
          }
          break;



        case "textfield":

          if (this.state.pageFour[i].value.length != 0) {
            var dynamicKey = {};
            dynamicKey[data.fieldTypeName] = this.state.pageFour[i].value;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey)
            pageFourClone[i].showError = false;
            this.setState({ pageFour: pageFourClone });
          }
          else {
            if (this.state.pageFour[i].isRequired) {
              if (!this.state.showPriceOnly && pageFourClone[i].fieldTypeName === "ad_price")
                pageFourClone[i].showError = false;
              else
                pageFourClone[i].showError = true;
              this.setState({ pageFour: pageFourClone });
            }
          }
          break;

        // new code
        case "textarea":
          if (this.state.pageFour[i].value.length != 0) {
            var dynamicKey = {};
            dynamicKey[this.state.pageFour[i].fieldTypeName] = this.state.pageFour[i].value;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey);
            pageFourClone[i].showError = false;
            this.setState({ pageFour: pageFourClone });
          }
          else {
            if (this.state.pageThree[i].isRequired) {

              pageFourClone[i].showError = true;
              this.setState({ pageFour: pageFourClone });
            }
          }
          break;
        // new code  
        case "select":
          if (this.state.pageFour[i].data.field_type_name === "ad_price_type") {
            if (this.state.priceTypeId.length != 0) {
              var dynamicKey = {};
              dynamicKey["ad_price_type"] = this.state.priceTypeId;
              orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey);
              this.setState({ showPriceTypeError: false });
            }
            else {
              this.setState({ showPriceTypeError: true });
            }
          }
          if (item.data.field_type_name === "ad_cats1") { }
          else {
            if (this.state.pageFour[i].selectedId.length != 0) {
              var dynamicKey = {};
              const data = this.state.pageFour[i];
              dynamicKey[data.fieldTypeName] = this.state.pageFour[i].selectedId;
              orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey);
              pageFourClone[i].showError = false;
              this.setState({ pageFour: pageFourClone });
            }
            else {
              if (this.state.pageFour[i].isRequired) {
                pageFourClone[i].showError = true;
                this.setState({ pageFour: pageFourClone });
              }
            }
          }
          break;
      }

      // console.warn(JSON.stringify(orderStore.postAdObject));


    }

  }
  checkPageClear = () => {
    // console.warn("page Four" + this.state.categoryId);

    let { orderStore } = Store;
    let areStaticFieldsClear = true;

    for (var i = 0; i < this.state.pageFour; i++) {

      if (this.state.pageFour[i].showError) {
        areStaticFieldsClear = false;
      }

    }

    if (this.isNameClear && this.isPhoneClear && this.isLatitudeClear && this.isLongitudeClear && this.isCountryClear && this.isAddressClear && this.categoryClear && this.textFieldClear && this.webClear && this.dateClear && this.checkClear && this.selectClear && areStaticFieldsClear) {
      orderStore.isForthPageClear = true;
    }
    else {
      orderStore.isForthPageClear = false;
      Toast.show("Please Fill All The Required Fields");
    }
    this.postAd();

  }
  manageDynamicFieldsObject = () => {
    let { orderStore } = Store;
    this.checkForDynamicEmptyFields();
    orderStore.postAdObject = Object.assign(orderStore.postAdObject, { custom_fields: {} });
    if (this.categoryClear) {
      const data = { ad_cats1: this.state.categoryId }
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, data)

    }

    if (this.state.textFieldModel.length != 0) {
      for (var i = 0; i < this.state.textFieldModel.length; i++) {
        if (this.state.textFieldModel[i].fieldTypeName.length != 0 && this.state.textFieldModel[i].value.length != 0) {
          let data = {};
          data[this.state.textFieldModel[i].fieldTypeName] = this.state.textFieldModel[i].value;
          orderStore.postAdObject.custom_fields = Object.assign(orderStore.postAdObject.custom_fields, data);
        }

      }
    }
    if (this.state.checkboxModel.length != 0) {
      let data = {};
      for (var i = 0; i < this.state.checkboxModel.length; i++) {
        let selectedValues = [];
        for (var j = 0; j < this.state.checkboxModel[i].values.length; j++) {
          if (this.state.checkboxModel[i].values[j].isChecked)
            selectedValues.push(this.state.checkboxModel[i].values[j].name);
        }

        if (selectedValues.length === 0)
          continue;
        data[this.state.checkboxModel[i].fieldTypeName] = selectedValues;
        orderStore.postAdObject.custom_fields = Object.assign(orderStore.postAdObject.custom_fields, data);

      }


    }
    if (this.state.dateModel.length != 0) {

      for (var i = 0; i < this.state.dateModel.length; i++) {
        let data = {};
        if (this.state.dateModel[i].value.length === 0)
          continue;
        data[this.state.dateModel[i].fieldTypeName] = this.state.dateModel[i].value;
        orderStore.postAdObject.custom_fields = Object.assign(orderStore.postAdObject.custom_fields, data);
      }
    }
    if (this.state.webModel.length != 0) {
      for (var i = 0; i < this.state.webModel.length; i++) {
        if (this.state.webModel[i].value.length === 0)
          continue;
        let data = {};
        data[this.state.webModel[i].fieldTypeName] = this.state.webModel[i].value;
        orderStore.postAdObject.custom_fields = Object.assign(orderStore.postAdObject.custom_fields, data);
      }
    }
    if (this.state.selectModel.length != 0) {

      for (var i = 0; i < this.state.selectModel.length; i++) {
        if (this.state.selectModel[i].selectedId.length === 0)
          continue;
        let data = {};

        data[this.state.selectModel[i].fieldTypeName] = this.state.selectModel[i].selectedId;
        orderStore.postAdObject.custom_fields = Object.assign(orderStore.postAdObject.custom_fields, data);
      }
    }
  }
  checkForDynamicEmptyFields = () => {
    let emptyTextFields = [];
    let emptyWebFields = [];
    let emptySelectFields = [];
    let emptyCheckFields = [];
    let emptyDateFields = [];
    let textFieldModelClone = this.state.textFieldModel;
    let selectClone = this.state.selectModel;
    let checkBoxClone = this.state.checkboxModel;
    let dateClone = this.state.dateModel;
    let webClone = this.state.webModel;
    for (var i = 0; i < this.state.textFieldModel.length; i++) {
      if (this.state.textFieldModel[i].isRequired && this.state.textFieldModel[i].value.length === 0) {
        textFieldModelClone[i].showError = true;
        this.setState({ textFieldModel: textFieldModelClone });
        emptyTextFields.push(i);
      }
      else {
        textFieldModelClone[i].showError = false;
        this.setState({ textFieldModel: textFieldModelClone });
      }
    }
    for (var i = 0; i < this.state.webModel.length; i++) {
      if (this.state.webModel[i].isRequired && this.state.webModel[i].value.length === 0) {
        webClone[i].showError = true;
        this.setState({ webModel: webClone });
        emptyWebFields.push(i);
      }
      else {
        webClone[i].showError = false;
        this.setState({ webModel: webClone });
      }
    }

    for (var i = 0; i < this.state.dateModel.length; i++) {
      if (this.state.dateModel[i].isRequired && this.state.dateModel[i].value.length === 0) {
        dateClone[i].showError = true;
        this.setState({ dateModel: dateClone });
        emptyDateFields.push(i);
      }
      else {
        dateClone[i].showError = false;
        this.setState({ dateModel: dateClone });
      }
    }


    for (var i = 0; i < this.state.selectModel.length; i++) {
      if (this.state.selectModel[i].isRequired && this.state.selectModel[i].selectedValue.length === 0) {
        selectClone[i].showError = true;
        this.setState({ selectModel: selectClone });
        emptySelectFields.push(i);
      }
      else {
        selectClone[i].showError = false;
        this.setState({ selectModel: selectClone });
      }
    }


    for (var i = 0; i < this.state.checkboxModel.length; i++) {
      let valuesArrayInnerTemp = [];

      for (var j = 0; j < this.state.checkboxModel[i].values.length; j++) {
        let valuesModel = this.state.checkboxModel[i].values[j];
        if (valuesModel.isChecked) {

          valuesArrayInnerTemp.push(valuesModel);
        }
        checkBoxClone[i].selectedValues = valuesArrayInnerTemp;

      }


    }
    this.setState({ checkboxModel: checkBoxClone });

    for (var i = 0; i < this.state.checkboxModel.length; i++) {
      if (this.state.checkboxModel[i].isRequired && this.state.checkboxModel[i].selectedValues.length === 0) {
        checkBoxClone[i].showError = true;
        this.setState({ checkboxModel: checkBoxClone });
        emptyCheckFields.push(i);
      }
      else {
        checkBoxClone[i].showError = false;
        this.setState({ checkboxModel: checkBoxClone });


      }
    }

    if (this.state.categoryId.length === 0 && this.isCategoryRequired) {
      this.setState({ showCategoryError: true });
      this.categoryClear = false;
    }
    else {
      this.setState({ showCategoryError: false });
      this.categoryClear = true;
    }

    if (emptyTextFields.length != 0)
      this.textFieldClear = false;
    else
      this.textFieldClear = true;
    if (emptyWebFields.length != 0)
      this.webClear = false;
    else
      this.webClear = true;
    if (emptyDateFields.length != 0)
      this.dateClear = false;
    else
      this.dateClear = true;
    if (emptyCheckFields.length != 0)
      this.checkClear = false;
    else
      this.checkClear = true;
    if (emptySelectFields.length != 0)
      this.selectClear = false;
    else
      this.selectClear = true;

  }
  _onMapReady = () => {

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      .then(granted => {
        this.setState({ marginBottom: 0 });
      });
  }
  modalClosed = () => {
    this.setState({ subcategoryShownOnce: false, subcategoryShownTwice: false })
  }
  closeModal = () => {
    this.refs.locationModal.close();

  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
  render() {
    let { orderStore } = Store;

    if (orderStore.onEditClick) {
      this.constructDynamicObject();
      this.createData();
      this.checkPageClear();

    }
    if (orderStore.onForthPageChange) {
      if (orderStore.cart != undefined && orderStore.cart != 'undefined') {
        this.setState({ total: orderStore.cart.total, totalText: orderStore.cart.totalText });
      }
    }

    const profile = orderStore.settings.data.profile;
    // console.log('profile in page four is', JSON.stringify(profile))
    const extra = orderStore.settings.extra;
    this.isLatitudeRequired = profile.map.location_lat.is_required;
    this.isLongitudeRequired = profile.map.location_long.is_required;
    this.isLocationReqired = profile.location.is_required;
    if (profile.ad_country_show && profile.ad_country.is_required != undefined) {
      this.isCountryRequired = profile.ad_country.is_required;
    }
    this.isPhoneRequired = profile.phone.is_required;
    this.isNameRequired = profile.name.is_required;
    return (
      <DismissKeyboard>

        <View style={{
          height: '100%',
          backgroundColor: 'white',
        }}>
          {/* <Spinner
          visible={this.state.showAdOnSpinner}
          textContent={''}
          animation='slide'
        /> */}
          {/*Ads By Location Modal Start*/}


          <ModalBox
            style={styles.modalBoxStyle}
            position={"bottom"}
            onClosed={() => this.modalClosed()}
            ref={"locationModal"}>
            <View style={styles.modalContentContainer}>
              <Text style={[styles.subHeadingText, { marginStart: 15, marginTop: 15 }]}>{this.locationTitle}</Text>
              <View style={styles.row}>
                <Image source={require('../../../../res/images/double_arrow_black.png')} style={[styles.sliderImage, { marginBottom: 2.5, marginStart: 10 }]} />
                <Text style={[styles.subHeadingText, { marginStart: 3, marginTop: 0 }]}>{this.state.adsByValue}</Text>

                {
                  this.state.showCountrySpinner ?
                    <ActivityIndicator
                      size="small"
                      style={{ position: 'absolute', zIndex: 10, alignSelf: 'center', right: '10%', bottom: '25%', }}
                    /> :
                    this.state.subcategoryShownOnce == true ? [
                      <TouchableOpacity
                        onPress={() => this.closeModal()}
                        style={{ position: 'absolute', right: 5 }}>
                        <Text style={{ color: orderStore.appColor }}>Done</Text>
                      </TouchableOpacity>

                    ] : []
                }
              </View>

              <View style={style = styles.modaBoxInnerContainer}

              >
                <ScrollView contentContainerStyle={styles.modalScrollviewContainer}>

                  {

                    this.state.locationsArray.map((obj, i) => {
                      return (

                        <View key={i} style={styles.modalItemContainer}>
                          <TouchableOpacity

                            onPress={() => {
                              if (!obj.has_sub)
                                this.refs.locationModal.close();

                              this.onSelectCountry(obj);
                            }}
                            style={styles.modalDataTextContainer}>
                            <Text style={[styles.modalText, { color: Appearences.Colors.grey }]}>{obj.name}</Text>
                          </TouchableOpacity>
                        </View>

                      );
                    })


                  }

                </ScrollView>
              </View>


            </View>


          </ModalBox>






          <ScrollView
            // keyboardShouldPersistTaps='always'
            // scrollEnabled={this.state.scrollEnabled}
            contentContainerStyle={{
              backgroundColor: 'white',
              paddingBottom: 50,
            }}>
            <View style={styles.container}>



              {
                profile.ad_country_show ?

                  this.renderCountry(profile.ad_country)
                  : null
              }

              <View style={styles.headingTextContainer}>
                <Text style={styles.subHeading}>{profile.name.title + " * "}</Text>
              </View>

              <TextInput style={this.state.showNameError ? styles.TextInputError : styles.TextInput}
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                underlineColorAndroid='transparent'
                placeholderTextColor={Appearences.Registration.textColor}
                value={this.state.nameText}
                onChangeText={(message) => {
                  if (message.length != 0)
                    this.setState({ showNameError: false });
                  this.setState({ nameText: message });
                }}
              >
              </TextInput>

              <View style={styles.headingTextContainer}>
                <Text style={styles.subHeading}>{profile.phone.title + " * "}</Text>
              </View>


              <TextInput style={this.state.showPhoneError ? styles.TextInputError : styles.TextInput}
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                underlineColorAndroid='transparent'
                value={this.state.phoneText}
                onChangeText={(message) => {
                  if (message.length != 0)
                    this.setState({ showPhoneError: false });
                  this.setState({ phoneText: message });
                }}
                placeholderTextColor={Appearences.Registration.textColor}
                returnKeyType="done"
                keyboardType='phone-pad'>
              </TextInput>

              <View style={styles.headingTextContainer}>
                <Text style={styles.subHeading}>{profile.location.title + " * "}</Text>
              </View>

              <TextInput style={this.state.showAddressError ? styles.TextInputError : styles.TextInput}
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                underlineColorAndroid='transparent'
                value={this.state.location}
                placeholderTextColor={Appearences.Registration.textColor}
                onChangeText={(message) => {
                  if (message.length != 0)
                    this.setState({ showAddressError: false });
                  this.setState({ location: message, updateLocation: false });
                  this.places(message);
                }}
              >
              </TextInput>

              {
                this.state.focus === true && this.state.predictions.length > 0 ?
                  <View style={{ width: "100%", backgroundColor: 'white', marginVertical: 5, elevation: 3 }}>
                    <ScrollView>
                      {
                        this.state.predictions.map((item, key) => {
                          return (
                            <TouchableOpacity key={key} style={{ height: 50, width: "100%", justifyContent: 'center', marginBottom: 0.5, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: Appearences.Colors.lightGrey }}
                              onPress={() => {
                                this.setState({ location: item.description, focus: false });
                                this.getLatLong(item.description);
                              }}
                            >
                              <Text style={{ marginHorizontal: 10, color: Appearences.Colors.headingGrey }}>{item.description}</Text>
                            </TouchableOpacity>
                          );
                        })
                      }
                    </ScrollView>
                  </View>
                  : null
              }
              {profile.map.on_off ? <View>


                <View style={styles.maptContainer}>
                  <MapView
                    showsScale={true}
                    rotateEnabled={true}
                    // scrollEnabled={false}
                    zoomEnabled={true}
                    zoomControlEnabled={false}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    followsUserLocation={false}
                    toolbarEnabled={false}
                    showsCompass={true}
                    showsBuildings={true}
                    showsIndoors={true}
                    provider={PROVIDER_GOOGLE}
                    minZoomLevel={0}
                    maxZoomLevel={20}
                    mapType={"standard"}

                    onRegionChangeComplete={(region) => {
                      if (!this.state.focus)
                        this.setState({ updateLocation: true });

                      // console.log("Regiosn==>", JSON.stringify(region))

                      if (this.state.updateLocation) {
                        // console.warn("ON Region Change Called");
                        this.setState({
                          latitude: region.latitude + "",
                          longitude: region.longitude + "",
                          updateLocation: false
                        })
                        this.getAddressFromLatLong(region.latitude, region.longitude);
                      }
                    }
                    }
                    onUserLocationChange={() => {
                      // this.setState({updateLocation:true});
                    }}
                    region={{
                      latitude: parseFloat(this.state.latitude),
                      longitude: parseFloat(this.state.longitude),
                      latitudeDelta: 0.922,
                      longitudeDelta: 0.421,
                    }}
                    onMapReady={this._onMapReady}
                    style={{ flex: 1, marginBottom: this.state.marginBottom }}
                  >
                    <Marker
                      draggable
                      tracksViewChanges={false}
                      coordinate={{
                        latitude: parseFloat(this.state.latitude),
                        longitude: parseFloat(this.state.longitude),
                      }}
                      onDragStart={(e) => {
                        this.setState({ scrollEnabled: false, updateLocation: false, });
                      }}
                      onDragEnd={(e) => {
                        // console.warn("ON Drag End Called");
                        this.setState({
                          latitude: e.nativeEvent.coordinate.latitude + "",
                          longitude: e.nativeEvent.coordinate.longitude + "",
                          scrollEnabled: true,
                          updateLocation: false,
                        })
                        this.getAddressFromLatLong(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
                      }}
                    />
                  </MapView>

                </View>


                <View style={styles.headingTextContainer}>
                  <Text style={styles.subHeading}>{profile.map.location_lat.title + " * "}</Text>
                </View>


                {/* <TextInput style={this.state.showLatitudeError ? styles.TextInputError : styles.TextInput}
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                underlineColorAndroid='transparent'
                value={this.state.latitude + ""}
                placeholderTextColor={Appearences.Registration.textColor}
                editable={false}>
              </TextInput> */}
                <View style={[this.state.showLatitudeError ? styles.TextInputError : styles.TextInput, { textAlign: Appearences.Rtl.enabled ? 'right' : 'left', justifyContent: 'center' }]}
                >
                  <Text style={{ color: Appearences.Colors.headingGrey }}>{this.state.latitude + ""}</Text>
                </View>
                <View style={styles.headingTextContainer}>
                  <Text style={styles.subHeading}>{profile.map.location_long.title + " * "}</Text>
                </View>

                {/* <TextInput style={this.state.showLongitudeError ? styles.TextInputError : styles.TextInput}
                underlineColorAndroid='transparent'
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                placeholderTextColor={Appearences.Registration.textColor}
                value={this.state.longitude + ""}
                editable={false}>
              </TextInput> */}


                <View style={[this.state.showLongitudeError ? styles.TextInputError : styles.TextInput, { textAlign: Appearences.Rtl.enabled ? 'right' : 'left', justifyContent: 'center' }]}
                >
                  <Text style={{ color: Appearences.Colors.headingGrey }}>{this.state.longitude + ""}</Text>
                </View>
              </View> : null}


              {

                this.state.pageFour.map((item, key) => (
                  <View key={key}>
                    {this.pageFour(item, key)}
                  </View>
                ))

              }
              {
                orderStore.pricing.is_show ?
                  orderStore.pricing.package_based.bump_ad_is_show ?
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ isBumpupChecked: !this.state.isBumpupChecked })
                      }}
                      style={s.purchasePakcageRowLightGrey}>
                      <Image
                        style={s.cautionImage}
                        source={require('../../../../res/images/caution.png')} />
                      <Text style={[styles.headingTextBlack, { width: '80%', marginStart: 10 }]}>
                        {orderStore.pricing.package_based.bump_ad.title}
                      </Text>
                      <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 7 }}>
                        <CheckBox
                          checkedColor={orderStore.color}
                          uncheckedColor={Appearences.Colors.headingGrey}
                          title={null}
                          onPress={() => {
                            this.setState({ isBumpupChecked: !this.state.isBumpupChecked })
                          }}
                          checked={this.state.isBumpupChecked}
                          containerStyle={[s.checkBox, { alignSelf: 'center' }]}
                          size={Appearences.Fonts.mainHeadingFontSize}
                          textStyle={s.checkBoxText}
                        >
                        </CheckBox>
                      </View>
                    </TouchableOpacity>
                    : null
                  : null
              }
              {
                orderStore.pricing.is_show ?
                  orderStore.pricing.package_based.featured_ad_is_show ?
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ titleText: orderStore.pricing.package_based.featured_ad_text.text, okText: orderStore.pricing.package_based.featured_ad_text.btn_ok, cancelText: orderStore.pricing.package_based.featured_ad_text.btn_no, showConfirmDialogue: true })//new code
                      }}
                      style={s.purchasePakcageRowLightGrey}>
                      <Image
                        style={s.cautionImage}
                        source={require('../../../../res/images/caution.png')} />
                      <Text style={[styles.headingTextBlack, { width: '80%', marginStart: 10 }]}>
                        {orderStore.pricing.package_based.featured_ad.title}
                      </Text>
                      <View style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 7 }}>
                        <CheckBox
                          checkedColor={orderStore.color}
                          uncheckedColor={Appearences.Colors.headingGrey}
                          title={null}
                          checked={this.state.isFeaturedChecked}
                          containerStyle={[s.checkBox, { alignSelf: 'center' }]}
                          size={Appearences.Fonts.mainHeadingFontSize}
                          textStyle={s.checkBoxText}
                          onPress={() => {
                            this.setState({ titleText: orderStore.pricing.package_based.featured_ad_text.text, okText: orderStore.pricing.package_based.featured_ad_text.btn_ok, cancelText: orderStore.pricing.package_based.featured_ad_text.btn_no, showConfirmDialogue: true })//new code
                          }}
                        >
                        </CheckBox>
                      </View>
                    </TouchableOpacity>
                    : null
                  : null
              }


              {
                orderStore.pricing.is_show ?
                  orderStore.pricing.package_based != undefined ?
                    orderStore.pricing.package_based.bump_ad_buy != undefined ?
                      orderStore.pricing.package_based.bump_ad_notify != undefined ?
                        orderStore.pricing.package_based.bump_ad_notify.length != 0 ?
                          <TouchableOpacity
                            onPress={() => {
                              alert("Purchase Ads First!");
                            }}
                            style={s.purchasePakcageRowLightGrey}>

                            <Text style={[styles.headingTextBlack, { width: '80%', marginStart: 10 }]}>
                              {orderStore.pricing.package_based.bump_ad_notify.text}
                            </Text>
                            <View>
                              <View style={[styles.featuredBuyButtonContainer, { backgroundColor: orderStore.color }]}>
                                <Text style={styles.headingTextWhite}>{orderStore.pricing.package_based.bump_ad_notify.btn}</Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                          : null
                        : null
                      : null
                    : null
                  : null
              }
              {
                orderStore.pricing.is_show ?
                  orderStore.pricing.package_based.featured_ad_buy && orderStore.pricing.package_based.featured_ad_notify.length != 0 ?
                    <TouchableOpacity
                      onPress={() => {
                        alert("Purchase Ads First!");
                      }}
                      style={s.purchasePakcageRowLightGrey}>

                      <Text style={[styles.headingTextBlack, { width: '80%', marginStart: 10 }]}>
                        {orderStore.pricing.package_based.featured_ad_notify.text}
                      </Text>
                      <View>
                        <View style={[styles.featuredBuyButtonContainer, { backgroundColor: orderStore.color }]}>
                          <Text style={styles.headingTextWhite}>{orderStore.pricing.package_based.featured_ad_notify.btn}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    : null
                  : null
              }

              {
                orderStore.settings.data.package_type == 'package_type' ?
                  orderStore.pricing.is_show ?
                    orderStore.pricing.category_based.is_show ?
                      <View>
                        <Text style={[styles.subHeading, { marginTop: 10 }]}>
                          {orderStore.pricing.category_based.section_title}
                        </Text>
                        <FlatList
                          data={this.state.adOns}
                          horizontal={false}
                          showsHorizontalScrollIndicator={false}
                          renderItem={({ item, index }) =>
                            <TouchableOpacity
                              onPress={() => { this.postAdOns(item.adonid, index) }}
                              style={styles.adOnsContentContainer}>
                              <View style={styles.adOnsLeftContainer}>
                                <Text style={styles.headingTextBlack}>{item.title}</Text>
                                <Text style={styles.paragraphTextGreyAdOns}>{item.content}</Text>
                              </View>
                              <View style={styles.adOnsRightContainer}>
                                <View style={styles.adOnsRightInnerContainer}>
                                  <Text style={styles.subHeading}>{item.price}</Text>
                                  <View style={[styles.adOnsButton, { backgroundColor: orderStore.color }]}>
                                    <Text style={styles.adOnsButtonText}>{item.button.btn_txt}</Text>
                                  </View>
                                </View>
                              </View>
                            </TouchableOpacity>

                          }
                          keyExtractor={item => item.adonid + ""}
                        />
                        <View

                          style={[styles.adOnsContentContainer, { backgroundColor: Appearences.Registration.boxColor }]}>
                          <View style={styles.adOnsLeftContainer}>
                            <Text style={styles.subHeading}>{this.state.totalText}</Text>
                          </View>
                          <View style={styles.adOnsRightContainer}>
                            <View style={styles.adOnsRightInnerContainer}>
                              <Text style={styles.subHeading}>{this.state.total}</Text>
                            </View>
                          </View>
                        </View>

                      </View>
                      : null
                    : null
                  : null
              }

            </View>
          </ScrollView>
          {this.state.showProgress ? <Loader /> : null}

          <ConfirmDialogue
            visible={this.state.showConfirmDialogue}
            title={this.state.titleText}
            okText={this.state.okText}
            cancelText={this.state.cancelText}
            onConfirm={() => {
              this.setState({ isFeaturedChecked: !this.state.isFeaturedChecked, showConfirmDialogue: false })
            }}
            onCancel={() => { this.setState({ showConfirmDialogue: false }) }}
          />

        </View>

      </DismissKeyboard>


    );
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

}
export default withNavigation(PageFour)








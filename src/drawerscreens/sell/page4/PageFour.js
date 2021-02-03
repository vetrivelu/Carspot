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
  PermissionsAndroid,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Appearences from '../../../config/Appearences';
import Modal from 'react-native-modalbox';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './Styles';
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
import { widthPercentageToDP } from '../../../helper/Responsive';
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

@observer
class PageFour extends Component<Props> {


  isCategoryRequired = false;

  categoryClear = true;




  nameText = "";
  phoneText = "";
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
      showNameError: false,
      showPhoneError: false,
      showLatitudeError: false,
      showLongitudeError: false,
      showAddressError: false,
      showCountryError: false,
      showProgress: false,
      showPriceOnly: true,

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

      nameText: '',
      phoneText: '',


      showCategorySpinner: false,

      subCategories: [],
      subSubCategories: [],
      subSubSubCategories: [],
      showSubCategories: false,
      showSubSubCategories: false,
      showSubSubSubCategories: false,

      scrollEnabled: true,
      marginBottom: 1,
      updateLocation: false,


      categoryId: "",

      showCategoryError: false,

      pageFour: [],


      priceTypeId: "",
      showPriceTypeError: false,
      selectedTag: 'body',
      selectedStyles: [],
      isBumpupChecked: false,
      isFeaturedChecked: false,
      adOns: [],
      showAdOnSpinner: false,
      totalText: '',
      total: '',
      showConfirmDialogue: false,
      okText: '',
      cancelText: '',
      titleText: '',

      subcategoryShownOnce: false,

      decimalpointsLat: 4,
      decimalpointsLng: 4,

      loadingFirstTime: true

    }
    this.editor = null;
  }






  componentWillMount() {
    let { orderStore } = Store;
    const map = orderStore.sell.data.profile.map;
    if (orderStore.pricing.is_show &&
      orderStore.pricing.category_based.is_show) {
      this.setState({ adOns: orderStore.pricing.category_based.pricing });
    }

    var latx = this.countDecimals(parseFloat(map.location_lat.field_val))
    var lngx = this.countDecimals(parseFloat(map.location_long.field_val))
    // console.log('location',orderStore.sell.data.profile.location.values)
    this.setState({
      nameText: orderStore.sell.data.profile.name.values,
      phoneText: orderStore.sell.data.profile.phone.values
      , latitude: map.location_lat.field_val,
      longitude: map.location_long.field_val,
      location: orderStore.sell.data.profile.location.values,
      decimalpointsLat: latx,
      decimalpointsLng: lngx
    })


    // console.log('setting loc' + map.location_lat.field_val + "  --- "+ map.location_long.field_val )


  }
  componentDidMount = () => {
    let { orderStore } = Store;

    this.setState({ pageFour: orderStore.innerResponse.pageFour });
  }





  postAdOns = async (adOnId, index) => {
    this.setState({ showAdOnSpinner: true });
    let { orderStore } = Store;
    const params = { ad_id: orderStore.sell.data.ad_id, adons_id: adOnId };
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
              // await  Keyboard.dismiss()

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
  countDecimals = (value) => {
    if (Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0;
  }
  getAddressFromLatLong = async (lat, long) => {

    lat = lat.toFixed(this.state.decimalpointsLat)
    long = long.toFixed(this.state.decimalpointsLng)

    let api_key = GoogleApiKey;
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + long + '&key=' + api_key)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log('setting loc' + lat + "  --- " + long)
        this.setState({ location: responseJson.results[0].formatted_address });
        // console.log(JSON.stringify(responseJson.results));
        //alert('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
      })

  }

  places = (text) => {
    const API_KEY = GoogleApiKey;  //old play4team
    fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + text + '&key=' + API_KEY)
      .then((response) => response.json())
      .then(async (responseJson) => {
        // console.log('result Places AutoComplete===>>', responseJson);
        if (responseJson.status === 'OK') {
          await this.setState({ predictions: responseJson.predictions, focus: true, updateLocation: false })
        }
      }).catch((error) => {
        console.log('error', error);
        //  console.warn(error+"error");
      });

  }
  getLatLong = async (address) => {
    let api_key = GoogleApiKey;
    // console.log('get lat lng')
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=' + api_key)
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.status === 'OK') {
          await this.setState({
            latitude: responseJson.results[0].geometry.location.lat,
            longitude: responseJson.results[0].geometry.location.lng
          })
        }
      })
  }

  onSelectCountry = async (data) => {
    // console.log("data is ", JSON.stringify(data))
    var key = "";
    if (data.value === undefined)
      key = data.id;
    else
      key = data.value;
    if (data.name.length != 0)
      this.setState({ showCountryError: false });
    this.setState({ adsByValue: data.name, countryId: key });
    if (data.has_sub) {
      this.setState({ showCountrySpinner: true });
      let params = {};
      params = { ad_country: data.id };
      const response = await Api.post("ad_post/sublocations", params);
      if (response.success === true) {
        if (this.state.subcategoryShownOnce == false) {
          this.setState({ locationsArray: response.data.values, showCountrySpinner: false, subcategoryShownOnce: true })
        }
        this.setState({ showCountrySpinner: false, locationsArray: response.data.values, showCountrySpinner: false, })
        // this.setState({ locationsArray: response.data.values, showCountrySpinner: false })
      }
      if (response.message.length != 0)
        Toast.show(response.message);



    }



  }
  constructDynamicObject = () => {
    let { orderStore } = Store;
    const adId = { ad_id: orderStore.sell.data.ad_id };
    orderStore.postAdObject = Object.assign(orderStore.postAdObject, adId);
    const isUpdate = { is_update: orderStore.sell.data.ad_id };
    orderStore.postAdObject = Object.assign(orderStore.postAdObject, isUpdate);
    if (this.state.countryId.length != 0) {
      const data = { ad_country: this.state.countryId };
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
      this.setState({ showCountryError: false });
      this.isCountryClear = true;
    }
    else if (this.state.countryId.length === 0 && this.isCountryRequired) {
      this.setState({ showCountryError: true });
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
    orderStore.setOnPostAdClickListener(false);

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


    if (orderStore.isFirstPageClear && orderStore.isSecondPageClear && orderStore.isThirdPageClear && orderStore.isForthPageClear) {
      // console.log("---->>>", JSON.stringify(orderStore.postAdObject));
      await this.setState({ showProgress: true });

      const response = await Api.post('post_ad', orderStore.postAdObject);
      if (response.success === true) {
        orderStore.postAdObject = {}
        await this.setState({ showProgress: false });

        // if(orderStore.cart.isRedirect)
        // {
        //   this.props.navigation.navigate("DynamicLinksView",{id:orderStore.cart.redirectUrl});
        // }
        // else {
        const { navigate, } = this.props.navigation;
        // this.props.navigation.push('DrawerNav')
        this.props.navigation.navigate('AdDetail', { adId: orderStore.sell.data.ad_id, from: 'postad' });
        // this.props.navigation.replace('AdDetail', { adId: orderStore.sell.data.ad_id, from: 'postad' });
        // }
      }
      await this.setState({ showProgress: false });
      //  if(response.message.length!=0)
      Toast.show(response.message);
      //this.props.navigation.navigate("DynamicLinksView",{id:item.key});


    }
    else
      Toast.show("Fill All Required Fields");
    // console.log(JSON.stringify(orderStore.postAdObject));

  }



  checkPageClear = () => {
    let { orderStore } = Store;
    let areStaticFieldsClear = true;

    for (var i = 0; i < this.state.pageFour; i++) {

      if (this.state.pageFour[i].showError) {
        areStaticFieldsClear = false;
      }

    }

    if (this.isNameClear && this.isPhoneClear && this.isLatitudeClear && this.isLongitudeClear && this.isCountryClear && this.isAddressClear && this.categoryClear && areStaticFieldsClear) {
      orderStore.isForthPageClear = true;
    }
    else {
      orderStore.isForthPageClear = false;
      Toast.show("Please Fill All The Required Fields");
    }

    this.postAd();

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

  componentWillReceiveProps(props) {
    // console.log("props received",props)
    let { orderStore } = Store;
    if (orderStore.onPostClick) {
      if (this.props.uploadingvideo) {
        if (orderStore.sell.extra.videoOptions.inprogress_msg == undefined) {
          Toast.show('Please wait! Video uploading in progress')

        } else {
          Toast.show(orderStore.sell.extra.videoOptions.inprogress_msg)
        }
        
      } else {
        this.constructDynamicObject();
        this.checkPageClear();

      }

    }
  }

  render() {

    let { orderStore } = Store;

    if (orderStore.onForthPageChange) {
      if (orderStore.cart != undefined && orderStore.cart != 'undefined') {
        this.setState({ total: orderStore.cart.total, totalText: orderStore.cart.totalText });
      }
    }

    const profile = orderStore.sell.data.profile;
    const extra = orderStore.sell.extra;
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
              <View style={styles.modaBoxInnerContainer}

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
            // scrollEnabled={this.state.scrollEnabled}
            keyboardShouldPersistTaps='always'
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
                onChangeText={(message) => {
                  if (message.length != 0)
                    this.setState({ showNameError: false });
                  this.setState({ nameText: message });
                }}
                value={profile.name.values}

              >
              </TextInput>

              <View style={styles.headingTextContainer}>
                <Text style={styles.subHeading}>{profile.phone.title + " * "}</Text>
              </View>


              <TextInput style={this.state.showPhoneError ? styles.TextInputError : styles.TextInput}
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                underlineColorAndroid='transparent'
                onChangeText={(message) => {
                  if (message.length != 0)
                    this.setState({ showPhoneError: false });
                  this.setState({ phoneText: message });
                }}
                placeholderTextColor={Appearences.Registration.textColor}
                returnKeyType="done"
                value={this.state.phoneText == '' ? profile.phone.values : this.state.phoneText}

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
                    this.setState({ showAddressError: false, loadingFirstTime: false });
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
                    onMarkerDrag={() => {
                    }}
                    onPanDrag={() => {
                      if (this.state.loadingFirstTime == true) {
                        this.setState({ loadingFirstTime: false })
                      }
                    }}
                    onRegionChangeComplete={(region) => {
                      if (!this.state.focus)
                        this.setState({ updateLocation: true });

                      // console.log("Regiosn==>", JSON.stringify(region))

                      if (this.state.updateLocation) {
                        // console.log("ON Region Change Called",region);
                        this.setState({
                          latitude: region.latitude + "",
                          longitude: region.longitude + "",
                          updateLocation: false
                        })
                        // console.log('region changed called it',this.state)
                        // if (!this.state.loadingFirstTime)
                        if (this.state.loadingFirstTime == false) {
                          this.getAddressFromLatLong(parseFloat(this.state.latitude), parseFloat(this.state.longitude));
                        }
                      }
                    }
                    }
                    onUserLocationChange={() => {
                    }}

                    region={{
                      latitude: parseFloat(this.state.latitude),
                      longitude: parseFloat(this.state.longitude),
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                    onMapReady={this._onMapReady}

                    style={{ flex: 1, marginBottom: this.state.marginBottom }}>
                    <Marker
                      draggable
                      tracksViewChanges={false}
                      coordinate={{
                        latitude: parseFloat(this.state.latitude),
                        longitude: parseFloat(this.state.longitude),
                      }}
                      onDragStart={(e) => {
                        console.log("ON Drag Start Called");

                        this.setState({ scrollEnabled: false, updateLocation: false, loadingFirstTime: false });
                      }}
                      onDragEnd={(e) => {
                        console.log("ON Drag End Called");
                        this.setState({
                          scrollEnabled: true,
                          updateLocation: false,
                          loadingFirstTime: false,
                          latitude: e.nativeEvent.coordinate.latitude + "",
                          longitude: e.nativeEvent.coordinate.longitude + "",

                        })
                        this.getAddressFromLatLong(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);

                        // console.log('drag called it')
                      }}
                    />
                  </MapView>

                </View>


                <TouchableWithoutFeedback >
                  <View
                    style={styles.headingTextContainer}
                  >
                    <Text style={styles.subHeading}>{profile.map.location_lat.title + " * "}</Text>

                  </View>
                </TouchableWithoutFeedback>


                {/* <TextInput style={this.state.showLatitudeError ? styles.TextInputError : styles.TextInput}
                  textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  underlineColorAndroid='transparent'
                  value={this.state.latitude + ""}
                  placeholderTextColor={Appearences.Registration.textColor}
                  >
                </TextInput> */}


                <TouchableWithoutFeedback
                >
                  <View
                    style={[this.state.showLatitudeError ? styles.TextInputError : styles.TextInput, { textAlign: Appearences.Rtl.enabled ? 'right' : 'left', justifyContent: 'center' }]}
                  >
                    <Text style={{ color: Appearences.Colors.headingGrey }}>{this.state.latitude + ""}</Text>

                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback >
                  <View
                    style={styles.headingTextContainer}
                  >
                    <Text style={styles.subHeading}>{profile.map.location_long.title + " * "}</Text>

                  </View>
                </TouchableWithoutFeedback>

                {/* <TextInput style={this.state.showLongitudeError ? styles.TextInputError : styles.TextInput}
                  underlineColorAndroid='transparent'
                  textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  placeholderTextColor={Appearences.Registration.textColor}
                  value={this.state.longitude + ""}
                  >
                </TextInput>
 */}
                <TouchableWithoutFeedback
                >
                  <View
                    style={[this.state.showLongitudeError ? styles.TextInputError : styles.TextInput, { textAlign: Appearences.Rtl.enabled ? 'right' : 'left', justifyContent: 'center' }]}
                  >
                    <Text style={{ color: Appearences.Colors.headingGrey }}>{this.state.longitude + ""}</Text>

                  </View>
                </TouchableWithoutFeedback>


              </View> : null

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
                          checked={this.state.isBumpupChecked}
                          containerStyle={[s.checkBox, { alignSelf: 'center' }]}
                          size={Appearences.Fonts.mainHeadingFontSize}
                          textStyle={s.checkBoxText}
                          onPress={() => {
                            this.setState({ isBumpupChecked: !this.state.isBumpupChecked })
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
                  orderStore.pricing.package_based.featured_ad_is_show ?
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ titleText: orderStore.pricing.package_based.featured_ad_text.text, okText: orderStore.pricing.package_based.featured_ad_text.btn_ok, cancelText: orderStore.pricing.package_based.featured_ad_text.btn_no, showConfirmDialogue: true });
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
                            this.setState({ titleText: orderStore.pricing.package_based.featured_ad_text.text, okText: orderStore.pricing.package_based.featured_ad_text.btn_ok, cancelText: orderStore.pricing.package_based.featured_ad_text.btn_no, showConfirmDialogue: true });
                          }}
                        >
                        </CheckBox>
                      </View>
                    </TouchableOpacity>
                    : null
                  : null
              }

              {/* //////////////////ADONS//////////////////////// */}

              {
                orderStore.sell.data.package_type == 'package_type' ?
                  orderStore.pricing.is_show ?
                    orderStore.pricing.package_based.featured_ad_buy && orderStore.pricing.package_based.featured_ad_notify.length != 0 ?
                      <TouchableOpacity
                        onPress={() => {
                          if (orderStore.pricing.package_based.featured_ad_notify.toaster_text.length != undefined && orderStore.pricing.package_based.featured_ad_notify.toaster_text.length != 0)
                            Toast.show(orderStore.pricing.package_based.featured_ad_notify.toaster_text);
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
                  : null
              }
              {
                orderStore.sell.data.package_type == 'package_type' ?
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
              {/* ////////////////////////////////////////// */}


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


}

export default withNavigation(PageFour)







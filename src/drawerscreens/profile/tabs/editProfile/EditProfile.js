import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Modal,
  RefreshControl,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import LocalDb from '../../../../storage/LocalDb';
import Visibility from '../../../../components/Visibility';
import * as Progress from 'react-native-progress';
import { observer } from 'mobx-react';
import Store from '../../../../Stores';
import Api, { GoogleApiKey } from '../../../../network/Api';
import styles from './Styles';
import ProfileHeader from '../../../../components/ProfileHeader';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


import Appearences from '../../../../config/Appearences'

export default class EditProfile extends Component<Props> {
  static navigationOptions = {

    tabBarLabel: 'Edit Profile',
  }


  constructor(props) {
    let { orderStore } = Store;
    super(props);

    this.state = {
      modalVisible: false,
      hideForgotPasswordProgress: true,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      name: orderStore.profile.data.display_name.value,
      phone: orderStore.profile.data.phone.value,

      refreshing: false,
      reRender: false,
      companyName: '',
      companyLicense: '',
      companyUrl: '',
      companyHours: '',
      uploadingStoreImage: false,
      companyAbout: '',
      predictions: [],
      location: "",
      focus: false,
      latitude: "0",
      longitude: "0",
      uploadingDealerProfile: false,

      address: '',




    }
  }
  componentWillMount() {
    let { orderStore } = Store;
    let dealerDetails = orderStore.profile.data.dealer_details;

    if (orderStore.profile.data.dealer_details_is_show) {
      this.setState({
        companyName: dealerDetails.company_name.value,
        companyUrl: dealerDetails.user_web_url.value,
        companyLicense: dealerDetails.user_lisence.value,
        companyHours: dealerDetails.opening_hours.value,
        location: dealerDetails.company_address.value,
        companyAbout: dealerDetails.about_company.value
      });



      if (dealerDetails.company_address_lat.value === undefined || dealerDetails.company_address_lat.value.length === 0)
        this.setState({ latitude: "0" });
      else
        this.setState({ latitude: dealerDetails.company_address_lat.value });

      if (dealerDetails.company_address_long.value === undefined || dealerDetails.company_address_long.value.length === 0)
        this.setState({ longitude: "0" });
      else
        this.setState({ longitude: dealerDetails.company_address_long.value });

    } 
    else {
      if (orderStore.profile.data.user_addr_field) {
        this.setState({
          location: orderStore.profile.data.addres.value
        })
      }

    }

    if (orderStore.profile.data.is_show_social == true) {
      this.setState({
        fb: dealerDetails.social.facebook.value,
        twitter: dealerDetails.social.twitter.value,
        linkedin: dealerDetails.social.linkedIn.value,
        google: dealerDetails.social.youtube.value
      })
    }
  }



  places = (text) => {
    const API_KEY = GoogleApiKey;  //old play4team
    fetch('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + text + '&key=' + API_KEY)
      .then((response) => response.json())
      .then(async (responseJson) => {
        // console.log('result Places AutoComplete===>>', responseJson);
        if (responseJson.status === 'OK') {
          await this.setState({ predictions: responseJson.predictions, focus: true })
        }
      }).catch((error) => {
        console.log('error', error);
        //  console.warn(error+"error");
      });

  }
  getLatLong = async (address) => {
    let api_key = GoogleApiKey;
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




  updateProfile = async (isShow, sIsShow) => {
    this.setState({ uploadingDealerProfile: true });
    let params;
    // let goog=""
    if (isShow) {
      if (sIsShow) {
        params = {
          sb_camp_name: this.state.companyName,
          sb_user_web_url: this.state.companyUrl,
          sb_user_lisence: this.state.companyLicense,
          sb_user_timings: this.state.companyHours,
          sb_address: this.state.location,
          sb_user_address_lat: this.state.latitude,
          sb_user_address_long: this.state.longitude,
          sb_user_about: this.state.companyAbout,
          user_name: this.state.name,
          phone_number: this.state.phone,
          sb_user_facebook: this.state.fb,
          sb_user_twitter: this.state.twitter,
          sb_user_linkedin: this.state.linkedin,
          sb_user_youtube: this.state.google

        };
      } else {
        params = {
          sb_camp_name: this.state.companyName,
          sb_user_web_url: this.state.companyUrl,
          sb_user_lisence: this.state.companyLicense,
          sb_user_timings: this.state.companyHours,
          sb_address: this.state.location,
          sb_user_address_lat: this.state.latitude,
          sb_user_address_long: this.state.longitude,
          sb_user_about: this.state.companyAbout,
          user_name: this.state.name,
          phone_number: this.state.phone,
        };
      }


    }
    else {
      params = {
        user_name: this.state.name,
        phone_number: this.state.phone,
        ////////////////////////////////
        sb_address: this.state.location,
        sb_user_address_lat: this.state.latitude,
        sb_user_address_long: this.state.longitude,
      };
    }
    let { orderStore } = Store;
    // console.log('updating profile', params);
    orderStore.innerResponse = await Api.post('profile', params);
    if (orderStore.innerResponse.success === true) {
      // console.log('.....->', JSON.stringify(orderStore.innerResponse));
      // console.warn(JSON.stringify(orderStore.innerResponse));
      orderStore.name = orderStore.innerResponse.data.display_name;
      let userProfile = await LocalDb.getUserProfile();
      userProfile.name = orderStore.innerResponse.data.display_name;
      userProfile.phone = orderStore.innerResponse.data.phone;
      await LocalDb.saveProfile(userProfile);

    }
    if (orderStore.innerResponse.message.length != 0)
      Toast.show(orderStore.innerResponse.message);
    this.setState({ uploadingDealerProfile: false });

  }

  resetPassword = async () => {
    this.setState({ hideForgotPasswordProgress: false });
    let localDb = await LocalDb.getUserProfile();
    let { orderStore } = Store;
    let params = {

      old_pass: this.state.oldPassword,
      new_pass: this.state.newPassword,
      new_pass_con: this.state.confirmPassword,
    }

    orderStore.innerResponse = await Api.post('profile/reset_pass', params);
    if (orderStore.innerResponse.success === true) {

      localDb.password = this.state.newPassword;
      await LocalDb.saveProfile(localDb);


    }
    if (orderStore.innerResponse.message.length != 0)
      Toast.show(orderStore.innerResponse.message);
    this.setState({ hideForgotPasswordProgress: true });


  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }


  showImagePicker = () => {
    let { orderStore } = Store;
    ImagePicker.openPicker({
      multiple: false
    }).then(async images => {
      // if (res != null) {
      this.setState({ uploadingStoreImage: true });
      orderStore.innerResponse = await Api.postImage('profile/image_store', 'store_img', images);
      if (orderStore.innerResponse.success === true) {
        // console.log('picked img', orderStore.innerResponse);
        // let locaDb = await LocalDb.getUserProfile();
        // orderStore.dp = orderStore.innerResponse.data.profile_img;
        // locaDb.dp = orderStore.innerResponse.data.profile_img;
        // await LocalDb.saveProfile(locaDb);


      }
      this.setState({ uploadingStoreImage: false });
      if (orderStore.innerResponse.message.length != 0)
        Toast.show(orderStore.innerResponse.message);

      // }
    });


  }
  _onRefresh = async () => {
    // await
    this.setState({ refreshing: true });


    let { orderStore } = Store;
    orderStore.profile = await Api.get('profile');
    if (orderStore.profile.success === true) {
      let tabsText = orderStore.profile.data.tabs_text;

      this.tabsText = { profile: tabsText.profile, editProfile: tabsText.edit_profile, featuredAds: tabsText.featured_ads, inactiveAds: tabsText.inactive_ads, myAds: tabsText.my_ads, favouriteAds: tabsText.favorite_ads };
      this.setState({ showSpinner: false });
      // this.props.navigation.navigate('Profile');   

    }
    if (orderStore.profile.message.length != 0)
      Toast.show(orderStore.profile.message);

    setTimeout(async () => {

      this.setState({ refreshing: false, reRender: !this.state.reRender });

    }, 1000);

  }
  render() {
    let { orderStore } = Store;
    let data = orderStore.profile.data;
    // console.log('data deealer details', JSON.stringify(data))
    let extraText = orderStore.profile.extra_text;
    let profileExtra = orderStore.profile.data.profile_extra;
    return (
      <View style={{
        height: '100%',
        backgroundColor: Appearences.Colors.appBackgroundColor,
        paddingBottom: 5,
      }}>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>

          <View style={styles.modalContainer}>

            <View style={styles.modalInnerContainer}>
              <View style={styles.modalCloseContainer}>
                <TouchableOpacity onPress={() => this.setModalVisible(false)} >
                  <Image
                    source={require('../../../../../res/images/cross_red.png')}
                    style={styles.modalCloseImage} />
                </TouchableOpacity>
              </View>
              <View style={styles.modalPadding}>

                <Text style={styles.modalTitle}>{extraText.change_pass.heading}</Text>

                <TextInput style={styles.TextInput}
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => { this.setState({ oldPassword: text }); }}
                  placeholderTextColor={Appearences.Colors.headingGrey}
                  placeholder={extraText.change_pass.old_pass}
                  textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  secureTextEntry={true}>
                </TextInput>

                <TextInput style={styles.TextInput}
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => { this.setState({ newPassword: text }); }}
                  placeholderTextColor={Appearences.Colors.headingGrey}
                  placeholder={extraText.change_pass.new_pass}
                  textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  secureTextEntry={true}>
                </TextInput>

                <TextInput style={styles.TextInput}
                  underlineColorAndroid='transparent'
                  onChangeText={(text) => { this.setState({ confirmPassword: text }); }}
                  placeholderTextColor={Appearences.Colors.headingGrey}
                  placeholder={extraText.change_pass.new_pass_con}
                  textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  secureTextEntry={true}>
                </TextInput>


                <Visibility hide={this.state.hideForgotPasswordProgress}
                  style={{ marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>
                  <Progress.Circle
                    color={orderStore.color}
                    indeterminate={true}
                    size={Appearences.Fonts.headingFontSize} />
                </Visibility>

                <TouchableOpacity
                  style={styles.sinupButtonRow}
                  onPress={this.resetPassword}
                  disabled={!this.state.hideForgotPasswordProgress}>

                  <View
                    style={[styles.signupButton, { backgroundColor: orderStore.color }]}>
                    <Text style={styles.buttonTextStyle}>{extraText.change_pass.heading}</Text>
                  </View>

                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>




        <ScrollView
          key={this.state.reRender}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >

          <ProfileHeader />
          <View style={styles.container}>
            <View style={styles.panel}>
              <View style={styles.titleTextContainer}>
                <Text style={styles.manageText}>{profileExtra.edit_text}</Text>
              </View>
              <Text style={styles.headingTextBlack}>{data.display_name.key}</Text>
              <TextInput style={styles.TextInput}
                underlineColorAndroid='transparent'
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                placeholderTextColor={Appearences.Colors.headingGrey}
                placeholder={data.display_name.placeholder}
                value={this.state.name}
                onChangeText={(text) => {
                  this.setState({ name: text });
                }}
              >
              </TextInput>

              <Text style={styles.headingTextBlack}>{data.user_email.key}</Text>
              <TextInput style={styles.TextInput}
                editable={false}
                value={orderStore.email}
                underlineColorAndroid='transparent'
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                placeholderTextColor={Appearences.Colors.headingGrey}
              >
              </TextInput>

              <Text style={styles.headingTextBlack}>{data.phone.key}</Text>
              <TextInput style={styles.TextInput}
                underlineColorAndroid='transparent'
                keyboardType='phone-pad'
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                value={this.state.phone}
                onChangeText={(text) => {
                  this.setState({ phone: text });
                }}
                placeholderTextColor={Appearences.Colors.headingGrey}
                placeholder={data.phone.placeholder}>
              </TextInput>

              {
                orderStore.profile.data.user_addr_field &&  data.dealer_details_is_show==false ? [
                  <Text style={styles.headingTextBlack}>{data.addres.key}</Text>

                ] : []
              }

              {
                orderStore.profile.data.user_addr_field && data.dealer_details_is_show==false ? [

                  <TextInput style={styles.TextInput}
                  value={this.state.location}
                  onChangeText={(message) => {
                    this.setState({ location: message });
                    this.places(message);
                  }}
                  underlineColorAndroid='transparent'
                  textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  placeholderTextColor={Appearences.Colors.headingGrey}
                  placeholder={data.addres.placeholder}>
                </TextInput>

                ] : []
              }
              {/* ///////////////////// */}
            

              {
                this.state.focus === true && this.state.predictions.length > 0 ?
                  <View style={{ width: "100%", backgroundColor: 'white', marginVertical: 5, elevation: 3 }}>
                    <ScrollView>
                      {
                        this.state.predictions.map((item, key) => {
                          return (
                            <TouchableOpacity key={key} style={{ height: 50, width: "100%", justifyContent: 'center', marginBottom: 0.5, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: Appearences.Colors.grey }}
                              onPress={() => {
                                this.setState({ location: item.description, focus: false });
                                this.getLatLong(item.description);
                              }}
                            >
                              <Text style={{ marginHorizontal: 10 }}>{item.description}</Text>
                            </TouchableOpacity>
                          );
                        })
                      }
                    </ScrollView>


                  </View>
                  : null
              }
              {/* /////////////////////// */}
              {data.dealer_details_is_show ? null :


                <View>
                  <TouchableOpacity onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                    <Text style={[styles.forgotPasswordText, { color: orderStore.color, marginTop: 15 }]}>{extraText.change_pass.title}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonRow}
                    onPress={() => this.updateProfile(data.dealer_details_is_show)}
                    disabled={this.state.uploadingDealerProfile}>

                    <View
                      style={[styles.button, { backgroundColor: orderStore.color }]}>
                      <Text style={styles.buttonTextStyle}>{extraText.save_btn}</Text>
                    </View>

                  </TouchableOpacity>
                  {this.state.uploadingDealerProfile ?
                    <View style={{ marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>
                      <Progress.Circle
                        color={orderStore.color}
                        indeterminate={true}
                        size={Appearences.Fonts.headingFontSize} />
                    </View>
                    : null}
                </View>

              }
            </View>









            {
              data.dealer_details_is_show ?
                <View style={styles.panel}>
                  <View>
                    <View style={styles.titleTextContainer}>
                      <Text style={styles.manageText}>{data.dealer_details.section_title}</Text>
                    </View>

                    <Text style={styles.headingTextBlack}>{data.dealer_details.company_name.key}</Text>
                    <TextInput style={styles.TextInput}
                      value={this.state.companyName}
                      onChangeText={(text) => {
                        this.setState({ companyName: text });
                      }}
                      underlineColorAndroid='transparent'
                      textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                      placeholderTextColor={Appearences.Colors.headingGrey}
                      placeholder={data.dealer_details.company_name.placeholder}>
                    </TextInput>

                    <Text style={styles.headingTextBlack}>{data.dealer_details.user_web_url.key}</Text>
                    <TextInput style={styles.TextInput}
                      value={this.state.companyUrl}
                      onChangeText={(text) => {
                        this.setState({ companyUrl: text });
                      }}
                      underlineColorAndroid='transparent'
                      textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                      placeholderTextColor={Appearences.Colors.headingGrey}
                      placeholder={data.dealer_details.user_web_url.placeholder}>
                    </TextInput>

                    <Text style={styles.headingTextBlack}>{data.dealer_details.user_lisence.key}</Text>
                    <TextInput style={styles.TextInput}
                      value={this.state.companyLicense}
                      onChangeText={(text) => {
                        this.setState({ companyLicense: text });
                      }}
                      underlineColorAndroid='transparent'
                      textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                      placeholderTextColor={Appearences.Colors.headingGrey}
                      placeholder={data.dealer_details.user_lisence.placeholder}>
                    </TextInput>

                    <Text style={styles.headingTextBlack}>{data.dealer_details.opening_hours.key}</Text>
                    <TextInput style={styles.TextInput}
                      value={this.state.companyHours}
                      onChangeText={(text) => {
                        this.setState({ companyHours: text });
                      }}
                      underlineColorAndroid='transparent'
                      textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                      placeholderTextColor={Appearences.Colors.headingGrey}
                      placeholder={data.dealer_details.opening_hours.placeholder}>
                    </TextInput>
                    <Text style={styles.headingTextBlack}>{data.dealer_details.store_front_image.key}</Text>
                    <TouchableOpacity
                      onPress={this.showImagePicker}
                      style={styles.fileUploadContainer}
                      disabled={this.state.uploadingStoreImage}

                    >
                      <Text style={styles.containerFont}>{data.dealer_details.store_front_image.placeholder}</Text>
                      {this.state.uploadingStoreImage ?
                        <Progress.Circle
                          color={orderStore.color}
                          indeterminate={true}
                          size={Appearences.Fonts.headingFontSize} /> : null}
                    </TouchableOpacity>

                    <Text style={styles.headingTextBlack}>{data.dealer_details.company_address.key}</Text>
                    <TextInput style={styles.TextInput}
                      value={this.state.location}
                      onChangeText={(message) => {
                        this.setState({ location: message });
                        this.places(message);
                      }}
                      underlineColorAndroid='transparent'
                      textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                      placeholderTextColor={Appearences.Colors.headingGrey}
                      placeholder={data.dealer_details.company_address.placeholder}>
                    </TextInput>

                    {
                      this.state.focus === true && this.state.predictions.length > 0 ?
                        <View style={{ width: "100%", backgroundColor: 'white', marginVertical: 5, elevation: 3 }}>
                          <ScrollView>
                            {
                              this.state.predictions.map((item, key) => {
                                return (
                                  <TouchableOpacity key={key} style={{ height: 50, width: "100%", justifyContent: 'center', marginBottom: 0.5, backgroundColor: 'white', borderBottomWidth: 0.5, borderColor: Appearences.Colors.grey }}
                                    onPress={() => {
                                      this.setState({ location: item.description, focus: false });
                                      this.getLatLong(item.description);
                                    }}
                                  >
                                    <Text style={{ marginHorizontal: 10 }}>{item.description}</Text>
                                  </TouchableOpacity>
                                );
                              })
                            }
                          </ScrollView>


                        </View>
                        : null
                    }
                    <View style={styles.maptContainer}>
                      <MapView
                        region={{
                          latitude: parseFloat(this.state.latitude),
                          longitude: parseFloat(this.state.longitude),
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                        }}
                        style={styles.videoContent}>
                        <Marker coordinate={{
                          latitude: parseFloat(this.state.latitude),
                          longitude: parseFloat(this.state.longitude),
                        }} />
                      </MapView>

                    </View>
                    <Text style={styles.headingTextBlack}>{data.dealer_details.company_address_lat.key}</Text>
                    <TextInput style={styles.TextInput}
                      editable={false}
                      value={this.state.latitude + ""}
                      underlineColorAndroid='transparent'
                      textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                      placeholderTextColor={Appearences.Colors.headingGrey}
                      placeholder={data.dealer_details.company_address_lat.placeholder}>
                    </TextInput>

                    <Text style={styles.headingTextBlack}>{data.dealer_details.company_address_long.key}</Text>
                    <TextInput
                      style={styles.TextInput}
                      editable={false}
                      value={this.state.longitude + ""}
                      underlineColorAndroid='transparent'
                      textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                      placeholderTextColor={Appearences.Colors.headingGrey}
                      placeholder={data.dealer_details.company_address_long.placeholder}>
                    </TextInput>

                    <Text style={styles.headingTextBlack}>{data.dealer_details.about_company.key}</Text>
                    <TextInput
                      style={styles.TextArea}
                      multiline={true}
                      onChangeText={(message) => {
                        this.setState({ companyAbout: message });
                      }}
                      value={this.state.companyAbout}
                      underlineColorAndroid='transparent'
                      textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                      placeholderTextColor={Appearences.Colors.headingGrey}
                      placeholder={data.dealer_details.about_company.placeholder}>
                    </TextInput>

                    {
                      data.is_show_social ? [
                        <View>
                          <Text style={styles.headingTextBlack}>{data.dealer_details.social.facebook.key}</Text>
                          <TextInput
                            style={styles.TextInput}
                            autoCapitalize={false}
                            value={this.state.fb + ""}
                            underlineColorAndroid='transparent'
                            textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                            placeholderTextColor={Appearences.Colors.headingGrey}
                            onChangeText={(text) => {
                              this.setState({ fb: text });
                            }}
                            placeholder={data.dealer_details.social.facebook.placeholder}>
                          </TextInput>


                          <Text style={styles.headingTextBlack}>{data.dealer_details.social.twitter.key}</Text>
                          <TextInput
                            style={styles.TextInput}
                            autoCapitalize={false}
                            value={this.state.twitter + ""}
                            underlineColorAndroid='transparent'
                            textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                            placeholderTextColor={Appearences.Colors.headingGrey}
                            onChangeText={(text) => {
                              this.setState({ twitter: text });
                            }}
                            placeholder={data.dealer_details.social.twitter.placeholder}>
                          </TextInput>



                          <Text style={styles.headingTextBlack}>{data.dealer_details.social.linkedIn.key}</Text>
                          <TextInput
                            autoCapitalize={false}
                            style={styles.TextInput}
                            value={this.state.linkedin + ""}
                            underlineColorAndroid='transparent'
                            textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                            placeholderTextColor={Appearences.Colors.headingGrey}
                            onChangeText={(text) => {
                              this.setState({ linkedin: text });
                            }}
                            placeholder={data.dealer_details.social.linkedIn.placeholder}>
                          </TextInput>



                          <Text style={styles.headingTextBlack}>{data.dealer_details.social.youtube.key}</Text>
                          <TextInput
                            autoCapitalize={false}
                            style={styles.TextInput}
                            value={this.state.google + ""}
                            underlineColorAndroid='transparent'
                            textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                            placeholderTextColor={Appearences.Colors.headingGrey}
                            onChangeText={(text) => {
                              this.setState({ google: text });
                            }}
                            placeholder={data.dealer_details.social.youtube.placeholder}>
                          </TextInput>
                        </View>
                      ] : []
                    }


                    <TouchableOpacity onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                      <Text style={[styles.forgotPasswordText, { color: orderStore.color, marginTop: 15 }]}>{extraText.change_pass.title}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonRow}
                      onPress={() => this.updateProfile(data.dealer_details_is_show, data.is_show_social)}
                      disabled={this.state.uploadingDealerProfile}>

                      <View
                        style={[styles.button, { backgroundColor: orderStore.color }]}>
                        <Text style={styles.buttonTextStyle}>{extraText.save_btn}</Text>
                      </View>

                    </TouchableOpacity>
                    {this.state.uploadingDealerProfile ?
                      <View style={{ marginTop: 5, alignItems: 'center', justifyContent: 'center' }}>
                        <Progress.Circle
                          color={orderStore.color}
                          indeterminate={true}
                          size={Appearences.Fonts.headingFontSize} />
                      </View>
                      : null}


                  </View>
                </View>
                : null
            }

          </View>
        </ScrollView>
      </View>
    );
  }



}








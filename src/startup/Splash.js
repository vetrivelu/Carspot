import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  I18nManager,
} from 'react-native';
import Store from './../Stores';
import Api from '../network/Api';
import LocalDb from '../storage/LocalDb';
import Toast from 'react-native-simple-toast';
import { NavigationActions, StackActions } from 'react-navigation';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import DealerPopup from '../components/DealerDialogue';
import ConfrimDialogue from '../components/ConfirmDialogue';
import RNRestart from 'react-native-restart';
import { observer } from 'mobx-react';
import SplashScreen from 'react-native-splash-screen'

@observer
export default class Splash extends Component<Props> {

  constructor(props) {

    super(props);
    this.state = {
      showDealerPopup: false,
      selectedId: '',
      selectedValue: '',
      ids: [],
      values: [],
      confirmDialogueVisible: false,
      showDealerProgress: false,
      confirmDialogueObject: {

        title: '',
        buttonText: '',
        select: [],
        alertTitleText: '',
        alertConfrimText: '',
        alertCancelText: '',

      },

    };
  }

  postAccountType = async () => {
    const obj = { user_type: this.state.selectedId }
    const response = await Api.post('save_user_type', obj);
    await this.setState({ showDealerProgress: false });
    if (response.message.length != 0)
      await Toast.show(response.message);
    RNRestart.Restart();
  }
  reset(route) {
    return this.props
      .navigation
      .dispatch(StackActions.reset(
        {
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: route })
          ]
        }));




  }

  postSocail = async (email, name) => {
    let { orderStore } = Store;
    orderStore.isSocailLogin = true;
    let id = '';
    const obj = { email: email, type: 'social' };
    orderStore.innerResponse = await Api.post('login', obj);
    if (orderStore.innerResponse.message.length != 0)
      Toast.show(orderStore.innerResponse.message + "");
    if (orderStore.innerResponse.success === true) {
      id = orderStore.innerResponse.data.id;
      orderStore.dealerConfirmDialogue = orderStore.innerResponse.data.dealer_cinfirm_dialog;
      if (orderStore.dealerConfirmDialogue.is_show) {
        const confirmDialogue = orderStore.dealerConfirmDialogue;
        var ids = [];
        var values = [];
        for (var i = 0; i < confirmDialogue.select.length; i++) {
          ids.push(confirmDialogue.select[i].key);
          values.push(confirmDialogue.select[i].value);

        }
        confirmObjectClone = {
          title: '',
          buttonText: '',
          alertTitleText: '',
          alertConfrimText: '',
          alertCancelText: '',
        }
        confirmObjectClone.title = confirmDialogue.title;
        confirmObjectClone.buttonText = confirmDialogue.button;
        confirmObjectClone.alertTitleText = confirmDialogue.alert.text;
        confirmObjectClone.alertConfrimText = confirmDialogue.alert.confirm;
        confirmObjectClone.alertCancelText = confirmDialogue.alert.cancel;
        this.setState({
          selectedId: confirmDialogue.select[0].key,
          selectedValue: confirmDialogue.select[0].value,
          values: values,
          ids: ids,
          showDealerPopup: confirmDialogue.is_show,
          confirmDialogueObject: confirmObjectClone
        });

      }
      userData = {
        id: id,
        isSocial: true,
        email: email,
        password: '1122',
        name: name,
        dp: orderStore.innerResponse.data.profile_img

      };
      orderStore.email = email;
      orderStore.name = name;
      if (orderStore.innerResponse.data.profile_img != null)
        orderStore.dp = orderStore.innerResponse.data.profile_img;
      // console.log('from point 1')

      await LocalDb.saveProfile(userData);
      await LocalDb.saveIsProfilePublic('0');
      orderStore.isPublicProfile = false;
      //      this.props.navigation.navigate('DrawerNav');
      if (orderStore.dealerConfirmDialogue.is_show)
        return;
      this.reset('DrawerNav');
    }
    else {
      await LocalDb.saveProfile(null);
      await LocalDb.saveIsProfilePublic('1');
      orderStore.isPublicProfile = true;
      //    this.props.navigation.navigate('DrawerNav');
      this.reset('DrawerNav');
    }


  }

  signIn = async (email, password) => {



    let { orderStore } = Store;
    const obj = {
      email: email,
      password: password,
    };

    orderStore.isSocailLogin = false;
    orderStore.innerResponse = await Api.post('login', obj);
    if (orderStore.innerResponse.message.length != 0)
      Toast.show(orderStore.innerResponse.message + "");

    if (orderStore.innerResponse.success === true) {
      orderStore.email = orderStore.innerResponse.data.user_email;
      orderStore.dp = orderStore.innerResponse.data.profile_img;
      orderStore.name = orderStore.innerResponse.data.display_name;

      //Dealer popup section Start
      orderStore.dealerConfirmDialogue = orderStore.innerResponse.data.dealer_cinfirm_dialog;
      const confirmDialogue = orderStore.dealerConfirmDialogue;

      if (confirmDialogue.is_show) {
        var ids = [];
        var values = [];
        for (var i = 0; i < confirmDialogue.select.length; i++) {
          ids.push(confirmDialogue.select[i].key);
          values.push(confirmDialogue.select[i].value);
        }


        confirmObjectClone = {
          title: '',
          buttonText: '',
          alertTitleText: '',
          alertConfrimText: '',
          alertCancelText: '',
        }
        confirmObjectClone.title = confirmDialogue.title;
        confirmObjectClone.buttonText = confirmDialogue.button;
        confirmObjectClone.alertTitleText = confirmDialogue.alert.text;
        confirmObjectClone.alertConfrimText = confirmDialogue.alert.confirm;
        confirmObjectClone.alertCancelText = confirmDialogue.alert.cancel;

        this.setState({
          selectedId: confirmDialogue.select[0].key,
          selectedValue: confirmDialogue.select[0].value,
          values: values,
          ids: ids,
          showDealerPopup: confirmDialogue.is_show,
          confirmDialogueObject: confirmObjectClone
        });

      }
      //Dealer popup section End



      const userData = {

        isSocial: false,
        id: orderStore.innerResponse.data.id,
        email: orderStore.innerResponse.data.user_email,
        password: password,
        name: orderStore.innerResponse.data.display_name,
        phone: orderStore.innerResponse.data.phone,
        dp: orderStore.innerResponse.data.profile_img,
        isAccount: orderStore.innerResponse.data.is_account_confirm,

      };
      await LocalDb.saveIsProfilePublic('0');
      orderStore.isPublicProfile = false;
      // console.log('from point 2')
      await LocalDb.saveProfile(userData);
      //  this.props.navigation.navigate('DrawerNav');
      if (orderStore.dealerConfirmDialogue.is_show)
        return;
      this.reset('DrawerNav');


    }
    else {
      await LocalDb.saveIsProfilePublic('1');
      orderStore.isPublicProfile = true;
      await LocalDb.saveProfile(null);
      this.reset('Signin');
    }


  }



  manageFcmToken = async () => {
    //console.warn("inside");

    let { orderStore } = Store;
    const fcmToken = await firebase.messaging().getToken();

    if (fcmToken) {
      const userData = await LocalDb.getUserProfile();
      //  console.warn(userData.id)          
      const params = { firebase_id: fcmToken, user_id: userData.id };

      //  console.warn("home Params==>",JSON.stringify(params));

      const response = await Api.post('home', params);
      // console.log("Home response===>", response);
      // console.warn("Response==>",JSON.stringify(response));
      if (response.success === true)
        orderStore.fcmToken = fcmToken;
      else {
        if (response.message.length != 0)
          Toast.show(response.message);
      }
    }

  }



  async  componentDidMount() {
    SplashScreen.hide()

    await this.settings();
    // console.warn(isPublic);
    // if(!isPublic)
    // { console.warn("Inside If");
    //    await this.manageFcmToken();}
    const rememberMe = await LocalDb.getRememberMe();
    if (!rememberMe) {
      let { orderStore } = Store;
      await LocalDb.saveProfile(null);
      await LocalDb.saveIsProfilePublic('1');
      orderStore.isPublicProfile = true;

    }

    const userData = await LocalDb.getUserProfile();
    // console.log('user datra in splsh', userData)
    const isPublic = await LocalDb.isProfilePublic();
    // console.warn("Here "+isPublic);

    if (!isPublic) { //console.warn("Inside If");
      await this.manageFcmToken();
    }

    if (userData != null) {
      if (userData.isSocial) {
        //Alert.alert('is social');
        await this.postSocail(userData.email, userData.name);

      }
      else {
        //Alert.alert('Not social'+userData.email +' '+userData.password);
        await this.signIn(userData.email, userData.password);

      }


    }
    else { //Alert.alert('Logged');
      let { orderStore } = Store;
      orderStore.isProfilePublic = true;
      await LocalDb.saveIsProfilePublic('1');

      this.reset('DrawerNav');
    }



  }


  settings = async () => {
    // throw new Error("My first Sentry error!");

    let { orderStore } = Store;
    // console.log('api call s')
    const response = await Api.get("settings");
    if (response.success) {
      const data = response.data;
      I18nManager.forceRTL(data.is_rtl);
      if (data.is_rtl) {

        if (!I18nManager.isRTL)
          RNRestart.Restart();
      }
      if (!data.is_rtl) {
        if (I18nManager.isRTL)
          RNRestart.Restart();

      }

      // console.log('data.api_body_sec_views;', data.api_body_sec_views)
      // console.log('data.api_list_sec_views', data.api_list_sec_views)
      // console.log('data.api_body_sec_views;',data.api_body_sec_views)
      // orderStore.bodyType = data.api_body_sec_views;
      // orderStore.featuredListingType = data.api_list_sec_views;
      // orderStore.makeType = data.api_body_make_views;

      orderStore.appColor = data.main_color;
      orderStore.color = data.main_color;
      orderStore.screenTitles = data.screen_titles;
      orderStore.drawerMenu = data.menu;
      orderStore.appRating = data.app_rating;
      orderStore.dp = data.guest_image;
      orderStore.name = data.guest_name;
      orderStore.defaultDp = data.guest_image;
      orderStore.defaultName = data.guest_name;
      orderStore.showFacebook = data.registerBtn_show.facebook;
      orderStore.showGoogle = data.registerBtn_show.google;
      orderStore.showApple = data.registerBtn_show.apple;
      orderStore.dealerConfirmDialogue = data.dealer_cinfirm_dialog;
      orderStore.settingsobj = data;

      if (data.ad_mob != undefined) {
        orderStore.setBanner(data.ad_mob.banner);
        orderStore.setInter(data.ad_mob.interstitial);
      }
    }
  }
  render() {

    let { orderStore } = Store;

    return (
      <View style={styles.container}>


        <View style={styles.topContainer}>
          <Image
            style={styles.logo}
            source={require('../../res/images/logo.png')}
            resizeMode="contain"
          />
        </View>
        <Animatable.View
          duration={2000}
          animation="zoomIn"
          iterationCount={1}
          direction="alternate"
          style={styles.bottomContainer}>
          <Image
            style={styles.car}
            source={require('../../res/images/splash_car.gif')} />

        </Animatable.View >

        <DealerPopup
          visible={this.state.showDealerPopup}
          title={this.state.confirmDialogueObject.title}
          buttonText={this.state.confirmDialogueObject.buttonText}
          showProgressCircle={this.state.showDealerProgress}

          onClickButton={(shouldDismiss) => {
            if (this.state.selectedId.length != 0) {
              this.setState({ confirmDialogueVisible: true })

            }
          }}
          ids={this.state.ids}
          defaultValue={(id, value) => {
            if (this.state.selectedId === '')
              this.setState({ selectedId: id, selectedValue: value });
          }}
          selectedValue={(value, id) => {
            this.setState({ selectedValue: value, selectedId: id });
            if (id === 'individual') {
              orderStore.isDealer = false;
              orderStore.isIndividual = true;
            }
            if (id === 'dealer') {
              orderStore.isDealer = true;
              orderStore.isIndividual = false;

            }
            if (id.length === 0) {
              orderStore.isDealer = false;
              orderStore.isIndividual = false;
            }
          }}
          values={this.state.values}
        />
        <ConfrimDialogue
          visible={this.state.confirmDialogueVisible}
          title={this.state.confirmDialogueObject.alertTitleText}
          okText={this.state.confirmDialogueObject.alertConfrimText}
          cancelText={this.state.confirmDialogueObject.alertCancelText}
          onConfirm={() => {

            this.setState({ showDealerProgress: true, confirmDialogueVisible: false })
            this.postAccountType();


          }}
          onCancel={() => {
            this.setState({ confirmDialogueVisible: false })
          }}
        />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
  },
  topContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomContainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  car: {
    width: '80%',
    height: 400,
    resizeMode: 'contain',

  },
  logo: {

    width: 250,
    height: 90,
    marginTop: 50,
  }
});

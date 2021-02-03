import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  BackHandler,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Appearences from '../config/Appearences'
import { observer } from 'mobx-react';
import Store from './../Stores';
import Api from '../network/Api';
import Spinner from '../components/Loader';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import Toast from 'react-native-simple-toast';
import LocalDb from '../storage/LocalDb';
import Visibility from '../components/Visibility';
import * as Progress from 'react-native-progress';
import { NavigationActions, StackActions } from 'react-navigation';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import DealerPopup from '../components/DealerDialogue';
import ConfrimDialogue from '../components/ConfirmDialogue';
import RNRestart from 'react-native-restart';
import {widthPercentageToDP as wp} from '../helper/Responsive'

import firebase from 'react-native-firebase';
import appleAuth, {
  AppleButton,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';



export default class Signin extends Component<Props> {
  backHandler;
  constructor(porps) {
    super(porps);
    this.state = {
      checked: false,
      modalVisible: false,
      overlayVisibility: true,
      progressVisibility: false,
      hideForgotPasswordProgress: true,
      email: '',
      password: '',
      forgotPassword: '',


      // dealer states
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
      }
      //dealer states end
    }
  }
  postAccountType = async () => {
    const obj = { user_type: this.state.selectedId }
    const response = await Api.post('save_user_type', obj);
    await this.setState({ showDealerProgress: false });
    if (response.message.length != 0)
      await Toast.show(response.message);
    RNRestart.Restart();

  }
  handleBackButton = async () => {
    await this.reset('DrawerNav');
    //  

  }
  componentWillUnmount = async () => {
    await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);


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

  showOverlay = () => this.setState({ overlayVisibility: true });
  hideOverlay = () => this.setState({ overlayVisibility: false });

  showProgress = () => this.setState({ progressVisibility: true });
  hideProgress = () => this.setState({ progressVisibility: false });
  fbsdk = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      functionFun = (result) => {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          // console.warn(
          //   "Login success with permissions: " +
          //   JSON.stringify(result)
          // );
          // Create a graph request asking for user information with a callback to handle the response.
          const infoRequest = new GraphRequest(
            '/me?fields=id,first_name,last_name,name,picture.type(large),email,gender',
            null,
            this._responseInfoCallback,
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();

          AccessToken.getCurrentAccessToken().then((data) => {
            // console.warn('datae',data);
            // console.log(data.accessToken.toString())

          })
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }
  _responseInfoCallback = (error: ?Object, result: ?Object) => {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      this.postSocail(result.email, result.name);
      console.log('Success fetching data: ' + JSON.stringify(result));
    }
  }


  signIn = async () => {
    this.showProgress();
    let { orderStore } = Store;
    const obj = {
      email: this.state.email,
      password: this.state.password,
    };

    orderStore.isSocailLogin = false;
    orderStore.innerResponse = await Api.post('login', obj);
    this.hideProgress();
    if (orderStore.innerResponse.message.length != 0)
      Toast.show(orderStore.innerResponse.message);

    if (orderStore.innerResponse.success === true) {
      if (this.state.checked) {
        await LocalDb.saveRememberMe('yes');
      }
      else
        await LocalDb.saveRememberMe('yes');
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



      orderStore.email = orderStore.innerResponse.data.user_email;
      orderStore.dp = orderStore.innerResponse.data.profile_img;
      orderStore.name = orderStore.innerResponse.data.display_name;
      userData = {

        isSocial: false,
        id: orderStore.innerResponse.data.id,
        email: orderStore.innerResponse.data.user_email,
        password: this.state.password,
        name: orderStore.innerResponse.data.display_name,
        phone: orderStore.innerResponse.data.phone,
        dp: orderStore.innerResponse.data.profile_img,


      };
      await LocalDb.saveProfile(userData);
      await LocalDb.saveIsProfilePublic('0');
      orderStore.isPublicProfile = false;
      if (orderStore.dealerConfirmDialogue.is_show)
        return;
      this.reset('DrawerNav');


    }
    else {
    }


  }

  postSocail = async (email, name) => {
    this.showProgress();
    let { orderStore } = Store;
    orderStore.isSocailLogin = true;
    const obj = { email: email, type: 'social' };
    orderStore.innerResponse = await Api.post('login', obj);
    this.hideProgress();
    if (orderStore.innerResponse.message.length != 0)
      Toast.show(orderStore.innerResponse.message);
    let id = '';
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



      if (this.state.checked) {
        await LocalDb.saveRememberMe('yes');
      }
      else
        await LocalDb.saveRememberMe('yes');
      userData = {

        isSocial: true,
        // id:orderStore.innerResponse.data.id,
        email: email,
        password: '1122',
        name: name,
        id: id,
        // name:orderStore.innerResponse.data.display_name,
        // phone:orderStore.innerResponse.data.phone,
        // dp:orderStore.innerResponse.data.profile_img,
        //isAccount:orderStore.innerResponse.data.is_account_confirm,

      };
      orderStore.email = email;
      orderStore.name = name;
      await LocalDb.saveProfile(userData);
      await LocalDb.saveIsProfilePublic('0');
      orderStore.isPublicProfile = false;
      if (orderStore.dealerConfirmDialogue.is_show)
        return;
      this.reset('DrawerNav');
    }



  }

  googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // console.log("Info", userInfo);
      this.postSocail(userInfo.user.email, userInfo.user.name);
      //      userInfo.name;
      //    userInfo.photo;
      //    Alert.alert(userInfo.email);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Toast.show(error + '');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Toast.show(error + '');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Toast.show(error + '');

      } else {
        // some other error happened
        Toast.show(error + '');

      }
    }
  };




  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '168494380313-j7533q2p386s46srnktvf830cdcb4ujs.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      iosClientId: '168494380313-62teeq7udk6d6kvjd8datldrpqkicn0m.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      forceCodeForRefreshToken: true,

  
    });

    let { orderStore } = Store;
    orderStore.settings = await Api.get('login');

    if (orderStore.settings.success === true)
      this.hideOverlay();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  forgotPassword = async () => {
    this.setState({ hideForgotPasswordProgress: false });
    const param = { email: this.state.forgotPassword };
    const response = await Api.post('forgot', param);
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ hideForgotPasswordProgress: true });
  }

  onAppleButtonPress  = async ()=> {
    // 1). start a apple sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: AppleAuthRequestOperation.LOGIN,
      requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
    });
  
    // 2). if the request was successful, extract the token and nonce
    const { identityToken, nonce, email } = appleAuthRequestResponse;
    // console.log('EMAIL:', email)
  
    // can be null in some scenarios
    if (identityToken) {
      // 3). create a Firebase `AppleAuthProvider` credential
      const appleCredential = firebase.auth.AppleAuthProvider.credential(identityToken, nonce);
  
      // 4). use the created `AppleAuthProvider` credential to start a Firebase auth request,
      //     in this example `signInWithCredential` is used, but you could also call `linkWithCredential`
      //     to link the account to an existing user
      const userCredential = await firebase.auth().signInWithCredential(appleCredential);
      // console.log('user credentials :', JSON.stringify(userCredential))

      if(userCredential.user.email!=null){
          if (userCredential.user.displayName != null)
            this.postSocail(userCredential.user.email, userCredential.user.displayName);
          else
            this.postSocail(userCredential.user.email, userCredential.user.email);
       
        // if(userCredential.user.displayName!=null)
        // this.socialSignUp(userCredential.user.email,userCredential.user.displayName,'apple@321')
        // else
        // this.socialSignUp(userCredential.user.email,userCredential.user.email,'apple@321')
      }
      // user is now signed in, any Firebase `onAuthStateChanged` listeners you have will trigger
      // console.log(`Firebase authenticated via Apple, UID: ${JSON.stringify(userCredential.user)}`);
      
      // console.log(`Firebase authenticated via Apple additional, UID: ${JSON.stringify(userCredential.additionalUserInfo)}`);
    } else {
      // handle this - retry?
    }
  }
  render() {
    let { orderStore } = Store;

    if (this.state.overlayVisibility) {
      return (
        <Spinner />
      );
    }
    return (

      <View style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={{

            backgroundColor: 'white',

          }}>
          <TouchableOpacity onPress={() => this.reset('DrawerNav')}>
            <Image style={styles.backButton} source={require('../../res/images/left_arrow.png')} />
          </TouchableOpacity>
          <View style={styles.container}>




            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                this.setModalVisible(false);
              }}>

              <View style={styles.modalContainer}>
                <View style={styles.modalInnerContainer}>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={styles.modalTitle}>{orderStore.settings.data.popup_forgot_title}</Text>

                    <TouchableOpacity
                      onPress={() => this.setModalVisible(false)}
                    >
                      <Image
                        source={require('../../res/images/close_black.png')}
                        style={styles.modalCloseImage}
                      />
                    </TouchableOpacity>

                  </View>
                  <View style={{ paddingBottom: 25, paddingStart: 25, paddingEnd: 25 }}>


                    <TextInput style={styles.TextInput}
                      underlineColorAndroid='transparent'

                      textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                      onChangeText={(text) => { this.setState({ forgotPassword: text }); }}
                      placeholderTextColor={Appearences.Colors.headingGrey}
                      placeholder={orderStore.settings.data.email_placeholder}
                    >
                    </TextInput>

                    <Visibility hide={this.state.hideForgotPasswordProgress}
                      style={{ marginTop: properties.Dimen.consistentMargin, alignItems: 'center', justifyContent: 'center' }}>
                      <Progress.Circle
                        color={orderStore.color}
                        indeterminate={true}
                        size={Appearences.Fonts.headingFontSize} />
                    </Visibility>

                    <TouchableOpacity
                      style={[styles.sinupButtonRow, { borderRadius: Appearences.Radius.radius, height: Appearences.Registration.itemHeight - 10, backgroundColor: orderStore.color }]}
                      onPress={this.forgotPassword}
                      disabled={!this.state.hideForgotPasswordProgress}>


                      <Text style={styles.buttonTextStyle}>{orderStore.settings.data.popup_forgot_button_text}</Text>

                    </TouchableOpacity>


                  </View>

                </View>


              </View>
            </Modal>




            <Image
              style={styles.logo}
              source={{ uri: orderStore.settings.data.logo }} />
            {orderStore.showFacebook ? <TouchableOpacity
              onPress={() => this.fbsdk()}
              disabled={this.state.hideProgress}
              style={styles.facebookButtonRow}>
              <View
                style={styles.facebookButton}
              >
                <Image source={require('../../res/images/fb_logo.png')}
                  style={{ width: 25, height: 25, resizeMode: 'cover' }}
                >
                </Image>
              </View >
              <View style={styles.facebookSeperator}></View>

              <View
                style={styles.facebookLogo}>
                <Text style={[styles.buttonTextStyle, { marginStart: 15, alignSelf: 'flex-start' }]}>{orderStore.settings.data.facebook_btn}</Text>
              </View>
            </TouchableOpacity>
              : null}



            {orderStore.showGoogle ? <TouchableOpacity
              onPress={this.googleLogin}
              style={styles.googleButtonRow}
              disabled={this.state.hideProgress}
            >
              <View
                style={styles.googleButton}
              >
                <Image source={require('../../res/images/google_plus_logo.png')}
                  style={{ width: 25, height: 25, resizeMode: 'cover' }}
                >
                </Image>
              </View >
              <View style={styles.googleSeperator}></View>

              <View
                style={styles.googleLogo}>
                <Text style={[styles.buttonTextStyle, { marginStart: 15, alignSelf: 'flex-start' }]}>{orderStore.settings.data.google_btn}</Text>
              </View>
            </TouchableOpacity> : null}
            {
            Platform.OS == 'ios'  && orderStore.showApple ?
            // <TouchableOpacity
            // onPress={() => this.onAppleButtonPress()}>
            //   <Text>Sign in with apple</Text>
            // </TouchableOpacity>
              <AppleButton
                cornerRadius={5}
                // style={styles.googleButtonRow}
                style={{ width: '100%',height:wp('12'),marginTop:wp(4)}}
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.CONTINUE}
                onPress={() => this.onAppleButtonPress()}
              />
              // <TouchableOpacity
              // onPress={() => this.onAppleButtonPress()}
              
              //   style={[styles.googleButtonRow,{backgroundColor:"black"}]}>
              //   <View
              //     style={[styles.googleButton,{backgroundColor:'black'}]}
              //   >
              //     <Image source={require('../../res/images/apple_logo_white.png')}
              //       style={{ resizeMode: 'cover', width: 25, height: 25, }}

              //     >
              //     </Image>
              //   </View >
              //   <View style={[styles.googleSeperator,{backgroundColor:"black"}]}></View>

              //   <View
              //     style={[styles.googleLogo,{backgroundColor:"black"}]}>
              //     <Text style={[styles.buttonTextStyle, { marginStart: 15, alignSelf: 'flex-start' }]}>Sign in with Apple</Text>
              //   </View>
              // </TouchableOpacity>

              :
              null
          }


            <View style={styles.orSeperatorRow}>
              <View style={styles.orSeperator}></View>
              <Text style={styles.orTextView}> {orderStore.settings.data.separator} </Text>
              <View style={styles.orSeperator}></View>
            </View>





            <TextInput style={styles.TextInput}
              underlineColorAndroid='transparent'
              textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
              placeholderTextColor={Appearences.Colors.headingGrey}
              placeholder={orderStore.settings.data.email_placeholder}
              onChangeText={(text) => { this.setState({ email: text }) }}>
            </TextInput>


            <TextInput style={styles.TextInput}
              underlineColorAndroid='transparent'
              placeholderTextColor={Appearences.Colors.headingGrey}
              textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
              placeholder={orderStore.settings.data.password_placeholder}
              secureTextEntry={true}
              onChangeText={(text) => { this.setState({ password: text }) }}
            ></TextInput>



            <View style={styles.checkBoxRow}>


              <Text style={[styles.forgotPassword, { color: orderStore.color }]}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >{orderStore.settings.data.forgot_text}</Text>
            </View>
            <Visibility hide={!this.state.progressVisibility}
              style={{ marginTop: 5, }}>
              <Progress.Circle
                style={styles.progress}
                color={orderStore.color}
                indeterminate={true} />
            </Visibility>
            <TouchableOpacity style={styles.sinupButtonRow}
              onPress={this.signIn}
              disabled={this.state.hideProgress}
            >


              <View
                style={[styles.signupButton, { backgroundColor: orderStore.color }]}>
                <Text style={styles.buttonTextStyle}>{orderStore.settings.data.form_btn}</Text>
              </View>
            </TouchableOpacity>




            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}
              style={styles.bottomTextContaier}

            >

              <Text
                style={styles.bottomText}>
                {orderStore.settings.data.register_text}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
          onConfirm={async () => {

            this.setState({ showDealerProgress: true, confirmDialogueVisible: false })
            await this.postAccountType();


          }}
          onCancel={() => {
            this.setState({ confirmDialogueVisible: false })
          }}
        />
      </View>);
  }


}


const properties = {
  Border: {
    width: .5,
    radius: 2,
  },
  Dimen: {
    consistentMargin: 15,
  }

}

const styles = StyleSheet.create({

  container: {

    // height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    flex: 1,
    backgroundColor: 'white',

  },
  logo: {
    marginTop: 15,
    width: 250,
    height: 90,
    resizeMode: 'contain',

  },

  facebookButtonRow: {

    width: "100%",
    flexDirection: 'row',
    backgroundColor: Appearences.Colors.facebookBlue,
    marginTop: 15,
  },
  googleButtonRow: {

    width: "100%",
    flexDirection: 'row',
    marginTop: properties.Dimen.consistentMargin,

    backgroundColor: Appearences.Colors.googleRed,
  },
  sinupButtonRow: {

    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: properties.Dimen.consistentMargin,

  },
  facebookSeperator: {
    backgroundColor: '#486cb8',
    height: '100%',
    width: 1,
  },
  googleSeperator: {
    height: '100%',
    width: 1,
    backgroundColor: '#de5645',

  },
  facebookLogo: {
    flex: 5,
    backgroundColor: Appearences.Colors.facebookBlue,
    height: Appearences.Registration.itemHeight,
    justifyContent: 'center',

  },
  facebookButton: {
    flex: .7,
    height: Appearences.Registration.itemHeight,
    backgroundColor: Appearences.Colors.facebookBlue,
    alignItems: "center",
    justifyContent: "center",
    paddingStart: 5,
    paddingEnd: 5,
  },
  googleLogo: {
    flex: 5,
    backgroundColor: Appearences.Colors.googleRed,
    height: Appearences.Registration.itemHeight,
    justifyContent: 'center',

  },
  googleButton: {
    flex: .7,

    height: Appearences.Registration.itemHeight,
    backgroundColor: Appearences.Colors.googleRed,
    alignItems: "center",
    justifyContent: "center",
    paddingStart: 5,
    paddingEnd: 5,

  },
  orSeperatorRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"

  },
  orSeperator: {
    width: "40%",
    height: 1,
    marginTop: properties.Dimen.consistentMargin,
    backgroundColor: Appearences.Registration.boxColor,
  },
  orTextView: {
    width: "20%",
    textAlign: 'center',
    color: Appearences.Colors.headingGrey,
    //fontFamily:Appearences.Fonts.paragaphFont,
    marginTop: properties.Dimen.consistentMargin,
    fontSize: 13,
  },
  TextInput: {
    height: Appearences.Registration.itemHeight,
    width: "100%",
    backgroundColor: Appearences.Registration.boxColor,
    // fontFamily:Appearences.Fonts.paragaphFont,
    paddingStart: 15,
    paddingEnd: 15,
    marginTop: properties.Dimen.consistentMargin,
    paddingBottom: 0,
    paddingTop: 0,
    fontSize: Appearences.Registration.fontSize,
    color: Appearences.Colors.headingGrey,
  },
  checkBoxRow: {

    flexDirection: "row",
    justifyContent: "space-between",
    width: '100%',
    marginTop: properties.Dimen.consistentMargin,

  },
  checkBox: {

    padding: 0,
    margin: 0,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: null,


  },

  forgotPassword: {

    marginBottom: 2.3,
    // fontFamily:Appearences.Fonts.paragaphFont,
    fontSize: Appearences.Registration.fontSize,
    color: '#e52d27',


  },
  signupButton: {
    flex: 5,
    backgroundColor: '#e52d27',
    padding: 10,
    height: Appearences.Registration.itemHeight,
    alignItems: 'center',
    justifyContent: 'center',

  },

  bottomTextContaier: {
    marginTop: properties.Dimen.consistentMargin,

  },
  bottomText: {
    color: Appearences.Colors.headingGrey,
    // fontFamily:Appearences.Fonts.paragaphFont,
    fontSize: 11,

  },
  buttonTextStyle: {
    color: 'white',
    // fontFamily:Appearences.Fonts.paragaphFont,
    fontSize: Appearences.Registration.fontSize,
  },
  modalContainer: {
    flex: 1,
    padding: 15,
    width: "100%",
    height: "100%",
    flexDirection: "row",
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: "absolute",
    alignItems: "center",
    justifyContent: 'center',
  },
  modalCloseAbsoluteContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: 200,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    paddingEnd: 5,
    paddingTop: 5,
    justifyContent: 'flex-end',
  },
  modalCloseImage: {
    width: 20,
    height: 20,
    marginEnd: 5,
    marginTop: 5,
  },
  modalInnerContainer: {
    backgroundColor: 'white',
    height: 200,
    flex: 1,
    borderRadius: Appearences.Radius.radius,

  },
  modalTitle: {
    color: Appearences.Colors.black,
    //fontFamily:Appearences.Fonts.paragaphFont,
    fontSize: Appearences.Fonts.headingFontSize,
    marginTop: 25,
    marginStart: 25,
  },
  backButton: {

    width: 20,
    height: 20,
    marginTop: 15,
    marginStart: 5,

  },
});




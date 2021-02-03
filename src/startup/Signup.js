import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  BackHandler
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Appearences from '../config/Appearences';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { observer } from 'mobx-react';
import Store from './../Stores';
import Api from '../network/Api';
import Spinner from '../components/Loader';
import Toast from 'react-native-simple-toast';
import LocalDb from '../storage/LocalDb';
import Visibility from '../components/Visibility';
import * as Progress from 'react-native-progress';
import { NavigationActions, StackActions } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import DealerPopup from '../components/DealerDialogue';
import ConfrimDialogue from '../components/ConfirmDialogue';
import RNRestart from 'react-native-restart';
import SwitchButton from '../components/SwitchButton';
import { widthPercentageToDP as wp } from '../helper/Responsive'

import firebase from 'react-native-firebase';
import appleAuth, {
  AppleButton,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';




export default class Signup extends Component<Props> {
  backHandler;

  handleBackButton = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.reset('DrawerNav');
  }
  postAccountType = async () => {
    const obj = { user_type: this.state.selectedId }
    // console.warn(this.state.selectedId);
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

  constructor(porps) {
    super(porps);
    this.state = {
      checked: false,
      overlayVisibility: true,
      progressVisibility: false,
      name: '',
      phone: '',
      email: '',
      password: '',
      userTypes: [],
      userIds: [],
      selectedUserValue: '',
      selectedUserId: '',
      activeSwitch: 0,


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
  fbsdk = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      functionFun = (result) => {
        if (result.isCancelled) {
          // console.log("Login cancelled");
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
            console.log(data.accessToken.toString())

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
  validate = (text) => {
    // console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      Toast.show("Enter Valid Email")
      return false;
    }
    else {
      return true;
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton = async () => {
    await this.reset('DrawerNav');
  }
  componentWillUnmount = async () => {
    await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);

  }
  componentWillMount = async () => {
 
    GoogleSignin.configure({
      // scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '168494380313-j7533q2p386s46srnktvf830cdcb4ujs.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      iosClientId: '168494380313-62teeq7udk6d6kvjd8datldrpqkicn0m.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
      forceCodeForRefreshToken: true,
    });
    let { orderStore } = Store;
    orderStore.settings = await Api.get('register');
    if (orderStore.settings.success === true)
      this.hideOverlay();

    var values = [];
    var ids = [];
    for (var i = 0; i < orderStore.settings.data.fields.values.length; i++) {
      values.push(orderStore.settings.data.fields.values[i].value);
      ids.push(orderStore.settings.data.fields.values[i].key);
    }

    this.setState({
      selectedValue: orderStore.settings.data.fields.values[1].value,
      selectedUserId: orderStore.settings.data.fields.values[1].key,
      userTypes: values,
      userIds: ids,
    });

  }

  showOverlay = () => this.setState({ overlayVisibility: true });
  hideOverlay = () => this.setState({ overlayVisibility: false });

  showProgress = () => this.setState({ progressVisibility: true });
  hideProgress = () => this.setState({ progressVisibility: false });

  facebookLogin = async () => {
    LoginManager.logInWithReadPermissions(['email']).then(
      onResult = (result) => {
        if (result.isCancelled) {
          this.hideOverlay();
        } else {
          this.postSocail(result.email, result.name);
        }
      },
      onError = (error) => {
        Toast.show(error + '');
        this.hideOverlay();
      }
    );

  }

  singUp = async () => {
    if (!this.validate(this.state.email))
      return;
    if (this.state.checked) {
      if (this.state.selectedUserId.length === 0) {
        Toast.show("Please select a user type.");
        return;
      }
      this.showProgress();

      let { orderStore } = Store;

      var obj = {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
        user_type: this.state.selectedUserId,
      };


      orderStore.isSocailLogin = false;
      if (this.state.selectedUserId === 'individual') {
        orderStore.isIndividual = true;
        orderStore.isDealer = false;
      }
      if (this.state.selectedUserId === 'dealer') {
        orderStore.isIndividual = false;
        orderStore.isDealer = true;
      }
      if (this.state.selectedUserId.length === 0) {
        orderStore.isIndividual = false;
        orderStore.isDealer = false;
      }
      orderStore.innerResponse = await Api.post('register', obj);
      this.hideProgress();
      if (orderStore.innerResponse.message.length != 0)
        Toast.show(orderStore.innerResponse.message);
      this.hideOverlay();
      if (orderStore.innerResponse.success === true) {
        orderStore.email = orderStore.innerResponse.data.user_email;
        orderStore.dp = orderStore.innerResponse.data.profile_img;
        orderStore.name = orderStore.innerResponse.data.display_name;
        const userData = {

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
        await LocalDb.saveRememberMe('yes');
        orderStore.isPublicProfile = false;
        if (!orderStore.settings.data.is_verify_on)
          this.reset('DrawerNav');

      }
      else {

      }
    }

    else {
      Toast.show("Please Agree To Our Terms & Conditions");
    }
  }

  postSocail = async (email, name) => {


    this.showProgress();
    let { orderStore } = Store;
    orderStore.isSocailLogin = true;
    const obj = { email: email, type: 'social' };
    orderStore.innerResponse = await Api.post('login', obj);
    if (orderStore.innerResponse.message.length != 0)
      Toast.show(orderStore.innerResponse.message);
    this.hideProgress();
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
      await LocalDb.saveRememberMe('yes');
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
        Toast.show(error + '');
      }
    }
  };


  onAppleButtonPress = async () => {
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

      if (userCredential.user.email != null) {
        if (userCredential.user.displayName != null)
          this.postSocail(userCredential.user.email, userCredential.user.displayName);
        else
          this.postSocail(userCredential.user.email, userCredential.user.email);
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

      <ScrollView
        keyboardShouldPersistTaps='always'
        contentContainerStyle={{ backgroundColor: 'white', }}>

        <TouchableOpacity onPress={() => this.reset('DrawerNav')}>
          <Image style={styles.backButton} source={require('../../res/images/left_arrow.png')} />
        </TouchableOpacity>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={{ uri: orderStore.settings.data.logo }} />


          {orderStore.showFacebook ? <TouchableOpacity
            onPress={() => this.fbsdk()}
            style={styles.facebookButtonRow}
            disabled={this.state.hideProgress}

          >
            <View
              style={styles.facebookButton}>
              <Image
                style={{ resizeMode: 'cover', width: 25, height: 25, }}

                source={require('../../res/images/fb_logo.png')} />
            </View >
            <View style={styles.facebookSeperator}></View>
            <View style={styles.facebookLogo}>
              <Text style={[styles.buttonTextStyle, { marginStart: 15, alignSelf: 'flex-start' }]}>{orderStore.settings.data.facebook_btn}</Text>
            </View>
          </TouchableOpacity>
            : null

          }

          {orderStore.showGoogle ? <TouchableOpacity
            onPress={this.googleLogin}
            disabled={this.state.hideProgress}
            style={styles.googleButtonRow}>
            <View
              style={styles.googleButton}
            >
              <Image source={require('../../res/images/google_plus_logo.png')}
                style={{ resizeMode: 'cover', width: 25, height: 25, }}

              >
              </Image>
            </View >
            <View style={styles.googleSeperator}></View>

            <View
              style={styles.googleLogo}>
              <Text style={[styles.buttonTextStyle, { marginStart: 15, alignSelf: 'flex-start' }]}>{orderStore.settings.data.google_btn}</Text>
            </View>
          </TouchableOpacity>
            : null
          }

          {
            Platform.OS == 'ios' && orderStore.showApple  ?
              // <TouchableOpacity
              // onPress={() => this.onAppleButtonPress()}>
              //   <Text>Sign in with apple</Text>
              // </TouchableOpacity>
              <AppleButton
                cornerRadius={5}
                // style={styles.googleButtonRow}
                style={{ width: '100%', height: wp('12'), marginTop: wp(4) }}
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


          <TextInput
            style={styles.TextInput}
            underlineColorAndroid='transparent'
            placeholderTextColor={Appearences.Colors.headingGrey}
            textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}

            placeholder={orderStore.settings.data.name_placeholder}
            onChangeText={(text) => {
              this.setState({ name: text });
            }}
          />


          <TextInput style={styles.TextInput}
            underlineColorAndroid='transparent'
            keyboardType='phone-pad'
            placeholderTextColor={Appearences.Colors.headingGrey}
            textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
            placeholder={orderStore.settings.data.phone_placeholder}
            onChangeText={(text) => {
              this.setState({ phone: text });
            }}
          ></TextInput>


          <TextInput style={styles.TextInput}
            underlineColorAndroid='transparent'
            placeholderTextColor={Appearences.Colors.headingGrey}
            textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
            placeholder={orderStore.settings.data.email_placeholder}
            onChangeText={(text) => {
              this.setState({ email: text });
            }}
          ></TextInput>


          <TextInput style={styles.TextInput}
            underlineColorAndroid='transparent'
            placeholderTextColor={Appearences.Colors.headingGrey}
            placeholder={orderStore.settings.data.password_placeholder}
            textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({ password: text });
            }}
          ></TextInput>
          <TouchableOpacity
            style={[styles.dropDown, { backgroundColor: 'transparent', paddingStart: 0 }]}
            onPress={() => { this.dropdownRef.show(); }}
          >
            <SwitchButton
              onValueChange={async (val) => {
                //  console.warn(this.state.userIds[val]);
                this.setState({ selectedUserId: this.state.userIds[val] });
                this.setState({ activeSwitch: val, })

              }
              }      // this is necessary for this component
              text1={this.state.userTypes[1]}                        // optional: first text in switch button --- default ON
              text2={this.state.userTypes[2]}                      // optional: second text in switch button --- default OFF
              switchWidth={180}                 // optional: switch width --- default 44
              switchHeight={40}                 // optional: switch height --- default 100
              switchdirection='rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
              switchBorderRadius={100}          // optional: switch border radius --- default oval
              switchSpeedChange={500}           // optional: button change speed --- default 100
              switchBorderColor={Appearences.Colors.lightGrey}       // optional: switch border color --- default #d4d4d4
              switchBackgroundColor={Appearences.Colors.lightGrey}     // optional: switch background color --- default #fff
              btnBorderColor={orderStore.color}          // optional: button border color --- default #00a4b9
              btnBackgroundColor={orderStore.color}   // optional: button background color --- default #00bcd4
              fontColor={Appearences.Colors.black}               // optional: text font color --- default #b1b1b1
              activeFontColor={Appearences.Colors.lightGrey}            // optional: active font color --- default #fff
            />

            {this.state.activeSwitch === 1 ? console.log('view1') : console.log('view2')}
            {/* <ModalDropdown 
                            options={this.state.userTypes}
                            ref={el => this.dropdownRef = el}    
                            
                            dropdownStyle = {styles.dorpDownStyle}
                            dropdownTextHighlightStyle = {[styles.dropDownTextStyle,{color:Appearences.Colors.headingGrey}]}
                            defaultValue = {this.state.userTypes[0]}
                            textStyle = {styles.dorpdownContainerTextStyle}

                            onSelect = {(index,value)=>{
                              this.setState({selectedUserId:this.state.userIds[index]});
                             // this.adManager(item,paymentKeys[index]);

                            }}
                            renderSeparator = {()=>{return(<View style = {{
                              width:0,
                              height:0,
                              backgroundColor:'transparent'}}/>);}}
                            renderRow = {(option,index,isSelected)=>{
                            return(<View style = {styles.dorpDownRow}>
                                    <Text style = {styles.dropDownTextStyle}>{option}</Text>
                                    </View>);
                            }}/> 

          */}
          </TouchableOpacity>




          <CheckBox
            checkedColor='black'
            uncheckedColor='black'
            title={orderStore.settings.data.terms_text}
            checked={this.state.checked}
            containerStyle={styles.checkBox}
            size={18}
            textStyle={{
              //fontFamily: Appearences.Fonts.paragaphFont,
              fontWeight: 'normal',
              alignItems: "center",
              fontSize: Appearences.Registration.fontSize,
              marginBottom: 2.3,
              color: Appearences.Colors.headingGrey,

            }}
            onPress={() => {
              this.setState({ checked: !this.state.checked, });
            }}

          ></CheckBox>

          <Visibility hide={!this.state.progressVisibility}
            style={{ marginTop: 5, }}>
            <Progress.Circle
              style={styles.progress}
              color={orderStore.color}
              indeterminate={true} />
          </Visibility>

          <TouchableOpacity style={styles.sinupButtonRow}
            onPress={this.singUp}
            disabled={this.state.hideProgress}

          >


            <View
              style={[styles.signupButton, { backgroundColor: orderStore.color }]}>
              <Text style={styles.buttonTextStyle}>{orderStore.settings.data.form_btn}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Signin')}
            style={styles.bottomTextContaier}

          >

            <Text
              style={[styles.bottomText, { color: orderStore.color }]}>
              {orderStore.settings.data.login_text}
            </Text>
          </TouchableOpacity>

        </View>
        <DealerPopup
          visible={this.state.showDealerPopup}
          title={this.state.confirmDialogueObject.title}
          buttonText={this.state.confirmDialogueObject.buttonText}
          showProgressCircle={this.state.showDealerProgress}
          defaultValue={(id, value) => {
            if (this.state.selectedId === '')
              this.setState({ selectedId: id, selectedValue: value });
          }}
          onClickButton={(shouldDismiss) => {
            if (this.state.selectedId.length != 0) {
              this.setState({ confirmDialogueVisible: true })

            }
          }}
          ids={this.state.ids}
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
            // console.warn("selected value "+value +" Selected Id "+id )
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
      </ScrollView>
    );
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


    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    // paddingStart:55,
    // paddingEnd:55,
    // paddingTop:15,
    // paddingBottom:15,
    flex: 1,


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

    marginTop: 15,

  },
  googleButtonRow: {

    width: "100%",
    flexDirection: 'row',
    backgroundColor: Appearences.Colors.googleRed,

    marginTop: properties.Dimen.consistentMargin,

  },
  sinupButtonRow: {

    width: "100%",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: properties.Dimen.consistentMargin,


  },
  seperator: {
    backgroundColor: 'white',
    height: '100%',
    width: 1,
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
    // fontFamily:Appearences.Fonts.paragaphFont,
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

  dropDown: {
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
    justifyContent: 'center',
  },

  checkBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: '100%',
    padding: 0,
    margin: 0,
    backgroundColor: 'white',
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: null,
    marginTop: properties.Dimen.consistentMargin,

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
    // fontFamily:Appearences.Fonts.paragaphFont,
    fontSize: 11,

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
  buttonTextStyle: {
    color: 'white',
    // fontFamily:Appearences.Fonts.paragaphFont,
    fontSize: Appearences.Registration.fontSize,
    // textAlign:'center',


  },
  backButton: {

    width: 20,
    height: 20,
    marginTop: 15,
    marginStart: 5,
  },
  dorpDownStyle: {
    width: '80%',
    height: 90,
    marginStart: -15,
  },

  dorpdownContainerTextStyle: {
    fontSize: Appearences.Registration.fontSize,
    color: Appearences.Colors.headingGrey,

  },
  dorpDownRow: {
    width: '100%',

    justifyContent: 'center',
  },
  dropDownTextStyle: {
    fontSize: Appearences.Registration.fontSize,
    color: Appearences.Colors.headingGrey,
    paddingStart: 5,
    paddingTop: 5,
    paddingBottom: 5,
  },


});



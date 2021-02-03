
import React, { Component } from 'react';
import { View, Text, AsyncStorage, Alert, I18nManager, Platform, AppState, SafeAreaView, StatusBar } from 'react-native';

import StackNav from './src/config/StackNav';
import StackNav01 from './src/config/StackNav01';
import StackNav02 from './src/config/StackNav02';
import StackNav03 from './src/config/StackNav03';
import StackNav04 from './src/config/StackNav04';
import StackNav05 from './src/config/StackNav05';
import StackNav06 from './src/config/StackNav06';
import StackNav07 from './src/config/StackNav07';
import StackNav08 from './src/config/StackNav08';
import StackNav09 from './src/config/StackNav09';
import StackNav10 from './src/config/StackNav10';


import { MenuProvider } from 'react-native-popup-menu';
import firebase, { NotificationOpen, Notification } from 'react-native-firebase';
import Store from './src/Stores';
import LocalDb from './src/storage/LocalDb';
// import * as Sentry from '@sentry/react-native';

import { getIntertial } from './src/components/adMob/Intertial';
import Banner from './src/components/adMob/Banner';
//import type { RemoteMessage } from 'react-native-firebase';
import { observer } from 'mobx-react';

import Api from './src/network/Api'
import {
  AdMobInterstitial,
} from 'react-native-admob'
@observer
export default class App extends Component<Props> {


  constructor(props) {
    super(props);
    this.state = {
      tabBarColor: '#000000',
      showIntertial: false,
      showBannerTop: false,
      showBannerBottom: false,
      homePage: 0,
      move: false
    };
    // Sentry.init({ 
    //   dsn: 'https://b41e06a967314a148a08e46430b3ad4f@sentry.io/2118948', 
    // });

  }
  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive') {
      console.log('the app is closed');
    }
  }


  componentDidUpdate() {


    let { orderStore } = Store;
    if (orderStore.banner.isShow == 'true') {
      orderStore.banner.isShow = false;
      if (orderStore.banner.position === 'top')
        this.setState({ showBannerTop: true });
      if (orderStore.banner.position === 'bottom')
        this.setState({ showBannerBottom: true });
    }

    if (orderStore.inter.isShow == 'true') {
      orderStore.inter.isShow = false;
      getIntertial();

    }




  }
  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }
  async componentDidMount() {

    const response = await Api.get("settings");
    if (response.success) {
      this.setState({ move: true, homePage: response.data.home_theme_type })



      // this.setState({ move:true,homePage: 0 })
    }
    await this.subToTopic();
    await this.createNotificationListeners(); //add this line
    AppState.addEventListener('change', this.handleAppStateChange);

    let { orderStore } = Store;

    // console.log('Didmount');

    const channel = new firebase.notifications.Android.Channel(
      'channelId',
      'Channel Name',
      firebase.notifications.Android.Importance.Max
    ).setDescription('A natural description of the channel');
    firebase.notifications().android.createChannel(channel);

    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          firebase.messaging().getToken().then(token => {
            orderStore.DEVICE_TOKEN = token
            // console.warn("LOG: ", token);
          })

          if (Platform.OS === 'ios') {
            this.notificationListenerIOS = firebase.messaging().onMessage(notification => {
              // console.warn('notification===>>>',notification);

              //Showing Local notification IOS
              const localNotification = new firebase.notifications.Notification()
                .setNotificationId(notification._messageId)
                .setTitle(notification._data.title)
                .setSubtitle(notification._data.subtitle)
                .setBody(notification._data.text)
                .setData(notification._data)
                .ios.setBadge(1);

              firebase.notifications()
                .displayNotification(localNotification)
                .catch(err => console.error(err));
            })
          } else {
            this.notificationListenerANDROID = firebase.notifications().onNotification(notification => {
              //Showing local notification Android
              console.log('notification===>>>', notification);
              const localNotification = new firebase.notifications.Notification({
                sound: 'default',
                show_in_foreground: true,
              })
                .setNotificationId(notification.notificationId)
                .setTitle(notification.title)
                .setSubtitle(notification.subtitle)
                .setBody(notification.body)
                .setData(notification.data)
                .android.setChannelId('channelId') // e.g. the id you chose above
                // .android.setSmallIcon('ic_stat_notification') // create this icon in Android Studio
                .android.setColor('#000000') // you can set a color here
                .android.setPriority(firebase.notifications.Android.Priority.High);

              firebase.notifications()
                .displayNotification(localNotification)
                .catch(err => console.error(err));
              console.log('notification===>>>', notification);
            })
          }
        } else {
          firebase.messaging().requestPermission()
            .then(() => {
              firebase.messaging().registerForNotifications()
              alert("User Now Has Permission")
            })
            .catch(error => {
              console.log(error)
              //  alert("Error", error)
              // User has rejected permissions  
            });
        }

      });


    const notificationOpen = await firebase.notifications().getInitialNotification();
    console.log('killed', notificationOpen);
    if (notificationOpen) {
      console.log('killed', notificationOpen);
      // App was opened by a notification
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;
    }

  }

  componentWillUnmount = async () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
    if (Platform.OS === 'ios')
      this.notificationListenerIOS();
    else
      this.notificationListenerANDROID();
    //this.getInitialNotification()
    // let {orderStore} = Store;
    // await LocalDb.saveProfile(null);
    // await LocalDb.saveIsProfilePublic('1');
    // orderStore.isPublicProfile = true;

  }

  async subToTopic() {
    let topic = 'global';
    firebase.messaging().subscribeToTopic(topic);
  }

  async componentWillMount() {
    let { orderStore } = Store;
    const launchType = await LocalDb.getLaunchType();
   
    if (launchType === "first") {
      orderStore.isPublicProfile = true;
      await LocalDb.setLaunchType();
    }
  }

  async createNotificationListeners() {
    // console.warn('called');



    firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.log('inside onNotificationDisplayed');
    });


    /*
    * Triggered when a particular notification has been received in foreground
    * */
    firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
      console.log('inside onNotificaion', title);
    });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;

      this.showAlert(title, body);
      console.log('inside onNotificaion Opened', title);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
      console.log('inside onInitial Notificaion', title);
    }

  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }


  render() {
    let { orderStore } = Store;
    setTimeout(() => {
      this.setState({ tabBarColor: orderStore.appColor })
    }, 5000);
    return (
      <View style={{ flex: 1, }}>
        <MenuProvider>
          <StatusBar
            hidden={false}
            animated={true}
            backgroundColor={this.state.tabBarColor}
            barStyle="light-content"
            networkActivityIndicatorVisible={Platform.OS === 'ios' ? false : false}
            showHideTransition={Platform.OS === 'ios' ? 'slide' : null}
          />
          <SafeAreaView style={{ flex: 1, backgroundColor: this.state.tabBarColor }}>
            {this.state.showBannerTop ? <Banner /> : null}
            {
              this.state.move ?
                this.state.homePage == '1' || this.state.homePage == 1 ? [
                  <StackNav01 />

                ] : [
                    this.state.homePage == '2' || this.state.homePage == 2 ? [
                      <StackNav02 />

                    ] : [
                        this.state.homePage == '3' || this.state.homePage == 3 ? [
                          <StackNav03 />

                        ] : [
                            this.state.homePage == '4' || this.state.homePage == 4 ? [
                              <StackNav04 />

                            ] : [
                                this.state.homePage == '5' || this.state.homePage == 5 ? [
                                  <StackNav05 />

                                ] : [
                                    this.state.homePage == '6' || this.state.homePage == 6 ? [
                                      <StackNav06 />

                                    ] : [
                                        this.state.homePage == '7' || this.state.homePage == 7 ? [
                                          <StackNav07 />

                                        ] : [
                                            this.state.homePage == '8' || this.state.homePage == 8 ? [
                                              <StackNav08 />

                                            ] : [
                                                this.state.homePage == '9' || this.state.homePage == 9 ? [
                                                  <StackNav09 />

                                                ] : [
                                                    this.state.homePage == '10' || this.state.homePage == 10 ? [
                                                      <StackNav10 />

                                                    ] : [
                                                        <StackNav />

                                                      ]

                                                  ]

                                              ]

                                          ]

                                      ]

                                  ]

                              ]

                          ]

                      ]

                  ] : null
            }
            {this.state.showBannerBottom ? <Banner /> : null}

          </SafeAreaView>

        </MenuProvider>

      </View>
    );
  }
}



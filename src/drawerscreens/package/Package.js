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
  FlatList,
  I18nManager

} from 'react-native';
import Appearences from '../../config/Appearences';
import styles from './Styles';
import Store from '../../Stores';
import stores from '../../Stores/orderStore';

import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import RNPaypal from 'react-native-paypal-lib';
import ModalDropdown from 'react-native-modal-dropdown';
import * as RNIap from 'react-native-iap';
import Loader from '../../components/Loader';
import stripe from 'tipsi-stripe';
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';

import Modal from 'react-native-modalbox';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../helper/Responsive'
const paymentOptions = [];
const paymentKeys = [];
var paypal = {};
let iosSkews = [];
let androidSkews = [];
const theme = {
  primaryBackgroundColor: Appearences.Colors.lightGrey,
  secondaryBackgroundColor: "#FFFFFF",
  primaryForegroundColor: "#000000",
  secondaryForegroundColor: Appearences.Colors.green,
  accentColor: Appearences.Colors.grey,
  errorColor: Appearences.Colors.black,
};
@observer
class Package extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: stores.screenTitles.sell,
    headerStyle: {
      backgroundColor: stores.color,
    },

  });

  inAppPurchase = async (pkgId, pkgType, item) => {
    try {
      if (Platform.OS === 'ios') {
        if (item.inApp.ios.length == 0) {
          Toast.show(item.inApp.message);

        }

        else {
          await RNIap.requestSubscription(item.inApp.ios);
          await this.checkout(pkgId, pkgType);
        }
      }

      else if(Platform.OS === 'android') {
        if (item.inApp.android.length == 0) {
          await RNIap.requestSubscription(item.inApp.android);
        }
        else {
          await RNIap.requestSubscription(item.inApp.android);
          await this.checkout(pkgId, pkgType);
        }
      }
      //ios: com.scriptsbundle.DWT.business , android: 12
      // await RNIap.purchaseUpdatedListener(async (purchase) => {

      //     RNIap.consumePurchaseAndroid(purchase.purchaseToken);
      //     await this.checkout(pkgId, pkgType, 'in_app');
      //     // RNIap.consumeAllItemsAndroid();


      // })
    } catch (err) {
      Toast.show(err.message);
      //   console.warn('inAppPurchase ERROR===>>>', err.code, err.message);
    }
  }



  componentWillMount = async () => {
    let { orderStore } = Store;
    orderStore.settings = await Api.get('packages');

    

  

    const response = orderStore.settings;
    //   const staticText = data.static_text;
    if (orderStore.settings.success === true) {
      orderStore.stripeKey = response.extra.android.stripe_publish_key;
      if (orderStore.settings.data.is_paypal_key === true)
        paypal = orderStore.settings.data.paypal;

      const paymentOptionsArray = response.data.payment_types;
      for (var i = 0; i < paymentOptionsArray.length; i++) {

        paymentOptions.push(paymentOptionsArray[i].value);
        paymentKeys.push(paymentOptionsArray[i].key);

      }

      const products = response.data.products;
      var listData = [];
      for (var i = 0; i < products.length; i++) {

        var featuresList = [];
        const data = products[i];
        if (data.days_text.length != 0) {

          const key = data.days_text;
          const value = data.days_value;
          featuresList.push(key + " : " + value);


        }
        if (data.free_ads_text.length != 0) {


          const key = data.free_ads_text;
          const value = data.free_ads_value;
          featuresList.push(key + " : " + value);
        }
        if (data.featured_ads_text.length != 0) {


          const key = data.featured_ads_text;
          const value = data.featured_ads_value;
          featuresList.push(key + " : " + value);
        }
        if (data.bump_ads_text.length != 0) {


          const key = data.bump_ads_text;
          const value = data.bump_ads_value;
          featuresList.push(key + " : " + value);
        }
        var obj = {};
        obj.featuresList = featuresList;
        obj.title = data.product_title;
        obj.id = data.product_id;
        obj.price = data.product_amount.value;
        obj.subTitle = data.product_amount.product_desc;
        obj.currency = data.product_amount.symbol;
        obj.inApp = data.product_appCode;
        iosSkews.push(data.product_appCode.ios);
        androidSkews.push(data.product_appCode.android);
        listData.push(obj);

      }


      // this.setState({listData: orderStore.settings.data.products});  
    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false, listData: listData });



    let itemSkus = Platform.select({
      ios: iosSkews,
      android: androidSkews
    });
    // console.warn(itemSkus.length + " " + JSON.stringify(itemSkus))
    // await RNIap.initConnection()
    try {
      //  await RNIap.initConnection();
      // const products = await RNIap.getProducts(itemSkus);
      // console.log("skues",itemSkus)
      // console.warn('product created====>>>', products);
      // console.log("Hi",products)
    } catch (err) {
       Toast.show(err.message); 
      console.warn('getProducts ERROR', err); // standardized err.code and err.message available
    }

  }



  checkout = async (adId, adTypeId) => {

    this.setState({ showSpinner: true });
    const params = { package_id: adId, payment_from: adTypeId }
    const response = await Api.post("payment", params);
    if (response.success === true) {
      const { navigate } = this.props.navigation;
      navigate('ThankYou');
    }
    this.setState({ showSpinner: false });
    if (response.message.length != 0)
      Toast.show(response.message);

  }

  paypalRequest = (item, adTypeId) => {
    var paymentClient = {};
    paymentClient.amount = item.price;
    paymentClient.currency_code = paypal.currency;
    paymentClient.short_description = item.title;
    paymentClient.intent = "sale";
    var env;
    if (paypal.mode === "sandbox")
      env = RNPaypal.ENVIRONMENT.SANDBOX;
    else
      env = RNPaypal.ENVIRONMENT.PRODUCTION;

    RNPaypal.paymentRequest({
      clientId: paypal.api_key,
      environment: env,
      intent: RNPaypal.INTENT.SALE,
      price: Number(item.price),
      currency: paypal.currency,
      description: 'Android testing',
      acceptCreditCards: false
    }).then(response => {
      this.paypalCheckout(item.id, adTypeId, response, paymentClient);
      //alert(JSON.stringify(response))
    }).catch(err => {
      alert(JSON.stringify(err.message))
    })



  }


  checkoutStripe = async (adId, adTypeId, token) => {

    this.setState({ showSpinner: true });
    const params = { package_id: adId, payment_from: adTypeId, source_token: token }
    const response = await Api.post("payment", params);
    if (response.success === true) {
      const { navigate } = this.props.navigation;
      navigate('ThankYou');
      if (response.message.length != 0)
        Toast.show(response.message);

    }
    else
      alert(response.message);

    this.setState({ showSpinner: false });
  }

  paypalCheckout = async (adId, adTypeId, paypalObject, paymentClient) => {
    // alert(JSON.stringify(paymentClient));  

    this.setState({ showSpinner: true });
    const params = { package_id: adId, payment_from: adTypeId, source_token: paypalObject.response.id, payment_client: JSON.stringify(paymentClient) };
    alert(JSON.stringify(params));
    const response = await Api.post("payment", params);
    //alert(JSON.stringify(response));
    if (response.success === true) {
      const { navigate } = this.props.navigation;
      navigate('ThankYou');
    }
    this.setState({ showSpinner: false });
    if (response.message.length != 0)
      Toast.show(response.message);

  }
  stripPayment(itemValue, pkgId, pkgType, amount, currency) {
    let { orderStore } = Store;
    this.setState({ showSpinner: false });
    stripe.setOptions({
      publishableKey: orderStore.stripeKey,
    });
    const options = {
      smsAutofillDisabled: true,
      requiredBillingAddressFields: 'zip', // or 'full'
      theme
    };
    stripe.paymentRequestWithCardForm(options)
      .then(response => {
        // Get the token from the response, and send to your server
        // this.paidPackage(response.tokenId, 'stripe', itemValue, pkgId, pkgType, amount, currency)
        this.checkoutStripe(pkgId, pkgType, response.tokenId);
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        this.setState({ loading: false })
        // Handle error
      });
  }
  navigateToStripePage = (adId, adTypeId) => {

    const { navigate } = this.props.navigation;
    //    navigate('Stripe',{id:adId,adName:adTypeId});
    this.stripPayment('', adId, adTypeId, '', '')
  }

  adManager = (item, adTypeId) => {
    this.refs.modal3.close()
    // console.log('irem', JSON.stringify(item));
    // console.log('adTypeId', adTypeId);
    // console.log('itemxxxx', JSON.stringify(item));
    switch (adTypeId) {

      case "stripe":
        this.stripPayment(item.price, item.id, adTypeId, item.price, item.currency);
        break;
      case "paypal":
        this.paypalRequest(item, adTypeId);
        break;
      case "bank_transfer":
        this.checkout(item.id, adTypeId);
        break;
      case "cash_on_delivery":
        this.checkout(item.id, adTypeId);
        break;
      case "cheque":
        this.checkout(item.id, adTypeId);
        break;
      case "app_inapp":
        this.inAppPurchase(item.id, adTypeId, item);
        break;


    }
  }

  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true,

      listData: [

      ],
    };
  }

  openModal = (item) => {
    console.log('modal open')
    this.setState({ currentItem: item })
    this.refs.modal3.open()
  }

  render() {
    let { orderStore } = Store;
    if (this.state.showSpinner)
      return (
        <Loader />

      );


    return (

      <View style={{
        height: '100%',
        backgroundColor: '#f4f6fa',
        paddingBottom: 5,
      }}>

        <FlatList
          data={this.state.listData}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) =>

            <View style={styles.container}>

              <View style={styles.cardParent}>
                <View style={styles.cardContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={styles.row}>
                    <Text style={[styles.price, { color: orderStore.color }]}>
                      {item.price}
                    </Text>
                    <Text style={styles.currency}>
                      {item.currency}
                    </Text>
                  </View>

                  {
                    item.featuresList.map((item, key) => (
                      <View
                        key={key}
                        style={styles.row}>

                        <Text style={styles.packageText}>
                          {item}
                        </Text>
                      </View>
                    ))
                  }



                  <TouchableOpacity
                    onPress={() => { this.openModal(item) }}

                    // onPress={() => { index.show(); }}
                    style={[styles.buttonContainer, { backgroundColor: orderStore.color }]}>
                    <Text style={{ fontSize: wp('3'), color: "#fff" }}>{paymentOptions[0]}</Text>
                    {/* <ModalDropdown
                      options={paymentOptions}
                      ref={el => index = el}

                      dropdownStyle={{
                        width: '48%',
                        height: (item.featuresList.length * 25) + 25,
                        marginStart: -20,
                      }}
                      dropdownTextHighlightStyle={styles.dropDownTextStyle}
                      textStyle={styles.buttonText}
                      defaultValue={paymentOptions[0]}
                      onSelect={(index, value) => {
                        this.adManager(item, paymentKeys[index]);

                      }}
                      renderSeparator={() => { return (<View style={{ height: 0, width: 0, padding: 0, backgroundColor: 'transparent' }} />); }}
                      renderRow={(option, index, isSelected) => {
                        return (<View style={styles.dorpDownRow}>
                          <Text style={styles.dropDownTextStyle}>{option}</Text>
                        </View>);
                      }} /> */}


                  </TouchableOpacity>
                </View>



              </View>
            </View>
          }
          keyExtractor={item => item.price}>
        </FlatList>






        <Modal style={[{ position: 'absolute',  alignContent: 'center', alignItems: 'center' }, {
          height: paymentOptions.length * wp('11'), width: wp('72')
        },I18nManager.isRTL?{right: hp('17')}:{right: hp('16')}]} position={"center"} ref={"modal3"} isDisabled={false}>
          <Text style={{ marginTop: wp('5'), marginBottom: wp('5') }}>{paymentOptions[0]}</Text>
          <View style={{ paddingLeft: wp('5'), paddingRight: wp('2'), alignSelf: 'center', height: paymentOptions.length * wp('9'), width: wp('72'), justifyContent: 'center' }}>
            <FlatList
              data={paymentOptions}
              horizontal={false}
              style={{}}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                index == 0 ? [null] : [
                  <View style={{ marginBottom: wp('4'), flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                    <Text style={{ fontSize: wp('4') }}>{item}</Text>
                    <RadioGroup
                      size={wp('4')}
                      style={{ position: 'absolute', right: 0 }}

                      onSelect={(index, value) => { this.adManager(this.state.currentItem, paymentKeys[value]); }}
                    >
                      <RadioButton

                        value={index} >

                      </RadioButton>

                    </RadioGroup>
                  </View>
                ]

              }
            />
          </View>

        </Modal>



      </View>
    );
  }


}







export default withNavigation(Package)









//////////////////////////////////////////////////////////
// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,

// } from 'react-native';
// import Appearences from '../../config/Appearences';
// import styles from './Styles';
// import Store from '../../Stores';
// import stores from '../../Stores/orderStore';

// import Toast from 'react-native-simple-toast';
// import Api from '../../network/Api';
// import RNPaypal from 'react-native-paypal-lib';
// import ModalDropdown from 'react-native-modal-dropdown';
// import Modal from 'react-native-modalbox'
// import * as RNIap from 'react-native-iap';
// import Loader from '../../components/Loader';
// import stripe from 'tipsi-stripe';
// import { observer } from 'mobx-react';
// import { withNavigation } from 'react-navigation';


// const paymentOptions = [];
// const paymentKeys = [];
// var paypal = {};
// let iosSkews = [];
// let androidSkews = [];
// const theme = {
//   primaryBackgroundColor: Appearences.Colors.lightGrey,
//   secondaryBackgroundColor: "#FFFFFF",
//   primaryForegroundColor: "#000000",
//   secondaryForegroundColor: Appearences.Colors.green,
//   accentColor: Appearences.Colors.grey,
//   errorColor: Appearences.Colors.black,
// };
// @observer
// class Package extends Component<Props> {

//   static navigationOptions = ({ navigation }) => ({
//     headerTitle: stores.screenTitles.sell,
//     headerStyle: {
//       backgroundColor: stores.color,
//     },

//   });

// inAppPurchase = async (pkgId, pkgType, item) => {
//   try {
//     if (Platform.OS === 'ios') {
//       if (item.inApp.ios.length == 0) {
//         Toast.show(item.inApp.message);

//       }

//       else {
//         await RNIap.buyProduct(item.inApp.ios);
//         await this.checkout(pkgId, pkgType);
//       }
//     }

// else {
//   if (item.inApp.android.length == 0) {
//     Toast.show(item.inApp.message);
//   }
//   else {
//     await RNIap.buyProduct(item.inApp.message);
//     await this.checkout(pkgId, pkgType);
//   }
// }
//ios: com.scriptsbundle.DWT.business , android: 12
// await RNIap.purchaseUpdatedListener(async (purchase) => {

//     RNIap.consumePurchaseAndroid(purchase.purchaseToken);
//     await this.checkout(pkgId, pkgType, 'in_app');
//     // RNIap.consumeAllItemsAndroid();


// })
// } catch (err) {
//   Toast.show(err.message);
//   console.warn('inAppPurchase ERROR===>>>', err.code, err.message);
//   }
// }



// componentWillMount = async () => {
//   let { orderStore } = Store;
//   orderStore.settings = await Api.get('packages');

//   const response = orderStore.settings;
//   const staticText = data.static_text;
// if (orderStore.settings.success === true) {
//   orderStore.stripeKey = response.extra.android.stripe_publish_key;
//   if (orderStore.settings.data.is_paypal_key === true)
//     paypal = orderStore.settings.data.paypal;

//   const paymentOptionsArray = response.data.payment_types;
//   for (var i = 0; i < paymentOptionsArray.length; i++) {

//     paymentOptions.push(paymentOptionsArray[i].value);
//     paymentKeys.push(paymentOptionsArray[i].key);

//   }

//   const products = response.data.products;
//   var listData = [];
//   for (var i = 0; i < products.length; i++) {

//     var featuresList = [];
//     const data = products[i];
//     if (data.days_text.length != 0) {

//       const key = data.days_text;
//       const value = data.days_value;
//       featuresList.push(key + " : " + value);


//     }
//     if (data.free_ads_text.length != 0) {


//       const key = data.free_ads_text;
//       const value = data.free_ads_value;
//       featuresList.push(key + " : " + value);
//     }
//     if (data.featured_ads_text.length != 0) {


//       const key = data.featured_ads_text;
//       const value = data.featured_ads_text;
//       featuresList.push(key + " : " + value);
//     }
//     if (data.bump_ads_text.length != 0) {


//       const key = data.bump_ads_text;
//       const value = data.bump_ads_value;
//       featuresList.push(key + " : " + value);
//     }
//     var obj = {};
//     obj.featuresList = featuresList;
//     obj.title = data.product_title;
//     obj.id = data.product_id;
//     obj.price = data.product_amount.value;
//     obj.subTitle = data.product_amount.product_desc;
//     obj.currency = data.product_amount.symbol;
//     obj.inApp = data.product_appCode;
//     iosSkews.push(data.product_appCode.ios);
//     androidSkews.push(data.product_appCode.android);
//     listData.push(obj);

//   }


// this.setState({listData: orderStore.settings.data.products});  
// }
// if (response.message.length != 0)
//   Toast.show(response.message);
// this.setState({ showSpinner: false, listData: listData });



// let itemSkus = Platform.select({
//   ios: iosSkews,
//   android: androidSkews
// });
// console.warn(itemSkus.length + " " + JSON.stringify(itemSkus))
// try {
// await RNIap.initConnection();
// const products = await RNIap.getProducts(itemSkus);
//console.warn('product created====>>>', products);
// } catch (err) {
// Toast.show(err.message); 
//console.warn('getProducts ERROR', err); // standardized err.code and err.message available
// }

// }



// checkout = async (adId, adTypeId) => {

//   this.setState({ showSpinner: true });
//   const params = { package_id: adId, payment_from: adTypeId }
//   const response = await Api.post("payment", params);
//   if (response.success === true) {
//     const { navigate } = this.props.navigation;
//     navigate('ThankYou');
//   }
//   this.setState({ showSpinner: false });
//   if (response.message.length != 0)
//     Toast.show(response.message);

// }

// paypalRequest = (item, adTypeId) => {
//   var paymentClient = {};
//   paymentClient.amount = item.price;
//   paymentClient.currency_code = paypal.currency;
//   paymentClient.short_description = item.title;
//   paymentClient.intent = "sale";
//   var env;
//   if (paypal.mode === "sandbox")
//     env = RNPaypal.ENVIRONMENT.SANDBOX;
//   else
//     env = RNPaypal.ENVIRONMENT.PRODUCTION;

//   RNPaypal.paymentRequest({
//     environment: env,
//     intent: RNPaypal.INTENT.SALE,
//     price: Number(item.price),
//     currency: paypal.currency,
//     description: 'Android testing',
//     acceptCreditCards: false
//   }).then(response => {
//     this.paypalCheckout(item.id, adTypeId, response, paymentClient);
//alert(JSON.stringify(response))
//   }).catch(err => {
//     alert(JSON.stringify(err.message))
//   })

// }


// checkoutStripe = async (adId, adTypeId, token) => {

//   this.setState({ showSpinner: true });
//   const params = { package_id: adId, payment_from: adTypeId, source_token: token }
//   const response = await Api.post("payment", params);
//   if (response.success === true) {
//     const { navigate } = this.props.navigation;
//     navigate('ThankYou');
//     if (response.message.length != 0)
//       Toast.show(response.message);

//   }
//   else
//     alert(response.message);

//   this.setState({ showSpinner: false });
// }

// paypalCheckout = async (adId, adTypeId, paypalObject, paymentClient) => {
// alert(JSON.stringify(paymentClient));  

// this.setState({ showSpinner: true });
// const params = { package_id: adId, payment_from: adTypeId, source_token: paypalObject.response.id, payment_client: JSON.stringify(paymentClient) };
// alert(JSON.stringify(params));
// const response = await Api.post("payment", params);
//alert(JSON.stringify(response));
//   if (response.success === true) {
//     const { navigate } = this.props.navigation;
//     navigate('ThankYou');
//   }
//   this.setState({ showSpinner: false });
//   if (response.message.length != 0)
//     Toast.show(response.message);

// }
// stripPayment(itemValue, pkgId, pkgType, amount, currency) {
//   let { orderStore } = Store;
//   this.setState({ showSpinner: false });
//   stripe.setOptions({
//     publishableKey: orderStore.stripeKey,
//   });
//   const options = {
//     smsAutofillDisabled: true,
//     requiredBillingAddressFields: 'zip', // or 'full'
//     theme
//   };
// stripe.paymentRequestWithCardForm(options)
//   .then(response => {
// Get the token from the response, and send to your server
// this.paidPackage(response.tokenId, 'stripe', itemValue, pkgId, pkgType, amount, currency)
// this.checkoutStripe(pkgId, pkgType, response.tokenId);
//     })
//     .catch(error => {
//       console.log(JSON.stringify(error));
//       this.setState({ loading: false })
//       // Handle error
//     });
// }
// navigateToStripePage = (adId, adTypeId) => {

//   const { navigate } = this.props.navigation;
//    navigate('Stripe',{id:adId,adName:adTypeId});
// this.stripPayment('', adId, adTypeId, '', '')
// }

// adManager = (item, adTypeId) => {
// console.warn(JSON.stringify(item));
//   switch (adTypeId) {

//     case "stripe":
//       this.navigateToStripePage(item.id, adTypeId);
//       this.stripPayment(item.price, item.id, adTypeId, item.price, item.currency);
//       break;
//     case "paypal":
//       this.paypalRequest(item, adTypeId);
//       break;
//     case "bank_transfer":
//       this.checkout(item.id, adTypeId);
//       break;
//     case "cash_on_delivery":
//       this.checkout(item.id, adTypeId);
//       break;
//     case "cheque":
//       this.checkout(item.id, adTypeId);
//       break;
//     case "app_inapp":
//       this.inAppPurchase(item.id, adTypeId, item);
//       break;


//   }
// }

// constructor(props) {
//   super(props);
//   this.state = {
//     showSpinner: true,

//     listData: [

//     ],
//   };
//   this.modal3 =''
// }



// render() {
//   let { orderStore } = Store;
//   if (this.state.showSpinner)
//     return (
//       <Loader />

//     );


//   return (

//     <View style={{
//       height: '100%',
//       backgroundColor: '#f4f6fa',
//       paddingBottom: 5,
//     }}>

//       <FlatList
//         data={this.state.listData}
//         horizontal={false}
//         showsVerticalScrollIndicator={false}
//         renderItem={({ item, index }) =>

//           <View style={styles.container}>

//             <View style={styles.cardParent}>
//               <View style={styles.cardContainer}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <View style={styles.row}>
//                   <Text style={[styles.price, { color: orderStore.color }]}>
//                     {item.price}
//                   </Text>
//                   <Text style={styles.currency}>
//                     {item.currency}
//                   </Text>
//                 </View>

//                 {
//                   item.featuresList.map((item, key) => (
//                     <View
//                       key={key}
//                       style={styles.row}>

//                       <Text style={styles.packageText}>
//                         {item}
//                       </Text>
//                     </View>
//                   ))
//                 }



//                 <TouchableOpacity
// onPress={() => {console.log('this refs are:',this)} }
// onPress={() => {this.refs.modal3.open()} }
// style={[styles.buttonContainer, { backgroundColor: orderStore.color }]}>

// <Modal 

// style={[{justifyContent: 'center',alignItems: 'center'}, { height: 300,width: 300}]}  ref={"modal3"} position={"center"} ref={"modal3"}>
//   <Text style={styles.text}>Modal centered</Text>
{/* <Button title={`Disable (${this.state.isDisabled ? "true" : "false"})`} onPress={() => this.setState({ isDisabled: !this.state.isDisabled })} style={styles.btn} /> */ }
// </Modal>
{/* <ModalDropdown
                      options={paymentOptions}
                      ref={el => index = el}

                      dropdownStyle={{
                        width: '48%',
                        height: (item.featuresList.length * 25) + 25,
                        marginStart: -20,
                      }}
                      dropdownTextHighlightStyle={styles.dropDownTextStyle}
                      textStyle={styles.buttonText}
                      defaultValue={paymentOptions[0]}
                      onSelect={(index, value) => {
                        // console.warn(paymentKeys[index]);
                        this.adManager(item, paymentKeys[index]);

                      }}
                      renderSeparator={() => { return (<View style={{ height: 0, width: 0, padding: 0, backgroundColor: 'transparent' }} />); }}
                      renderRow={(option, index, isSelected) => {
                        return (<View style={styles.dorpDownRow}>
                          <Text style={styles.dropDownTextStyle}>{option}</Text>
                        </View>);
                      }} /> */}


{/* </TouchableOpacity>
                </View>


              </View>
            </View>
          }
          keyExtractor={item => item.price}>
        </FlatList>










      </View>
    );
  }


} */}







// export default withNavigation(Package)

//////////////////////////////////////////////////////////
import { observer } from 'mobx-react';
import Store from './../Stores';
import LocalDb from '../storage/LocalDb';
import { Buffer } from 'buffer';
import { Platform, Alert } from 'react-native'
import RNRestart from 'react-native-restart';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-fetch-blob'
import Upload from 'react-native-background-upload'
import axios from 'axios';

export const GoogleApiKey = "AIzaSyAc7OQqmjVUeNkqcvMoEXT8WkrOBlJ9810"

const host = 'https://opulentcarz.com/wp-json/carspot/v1';
const PURCHASE_CODE = 'd0b43638-e6cf-4930-9f12-e9b917170323';
const CUSTOM_SECURITY = 'Digisailor#20*';


class Api {
  static headers() {
    let { orderStore } = Store;
    if (orderStore.isSocailLogin) {
      if (Platform.OS === 'ios') {

        return {
          'Purchase-Code': PURCHASE_CODE,
          'Custom-Security': CUSTOM_SECURITY,
          'Content-Type': 'application/json',
          'Carspot-Request-From': 'ios',
          'CARSPOT-LOGIN-TYPE': 'social',
        }

      }
      else
        return {
          'Purchase-Code': PURCHASE_CODE,
          'Custom-Security': CUSTOM_SECURITY,
          'Content-Type': 'application/json',
          'Carspot-Request-From': 'android',
          'CARSPOT-LOGIN-TYPE': 'social',
        }
    }
    else {

      if (Platform.OS === 'ios') {
        return {

          'Purchase-Code': PURCHASE_CODE,
          'Custom-Security': CUSTOM_SECURITY,
          'Content-Type': 'application/json',
          'Carspot-Request-From': 'ios',

        }

      }
      else
        return {
          'Purchase-Code': PURCHASE_CODE,
          'Custom-Security': CUSTOM_SECURITY,
          'Content-Type': 'application/json',
          'Carspot-Request-From': 'android',


        }
    }
  }
  static msg(msg) {
    return console.warn(msg);
  }
  static get(route) {
    console.log('here')
    return this.func(route, null, 'GET');
  }

  static put(route, params) {
    return this.func(route, params, 'PUT')
  }

  static post(route, params) {
    return this.func(route, params, 'POST')
  }

  static delete(route, params) {
    return this.func(route, params, 'DELETE')
  }
  static postAxios(route, key, image, paramKey, paramValue,config) {
    return this.axios(route, key, image, paramKey, paramValue, config)
  }

  static async postImage(route, key, image) {
    let { orderStore } = Store;
    const url = `${host}/${route}`;
    const formData = new FormData();
    let options = {};

    const extension = image.mime.substring(image.mime.indexOf("/") + 1, image.mime.length);
    let imgname = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length);

    const photo = {

      uri: image.path,
      type: image.mime,
      name: Platform.OS == 'ios' && image.filename!=null ? image.filename : imgname,
    };
    // const photo = {

    //   uri: image.uri,
    //   type: image.type,
    //   name: image.fileName,
    // };

    formData.append(key, photo);


    if (orderStore.isSocailLogin) {

      if (Platform.OS === 'ios') {

        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        };
    }

    else {

      if (Platform.OS === 'ios') {
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
          },
        };
    }

    const data = await LocalDb.getUserProfile();

    if (data != null) {
      const username = data.email;
      const password = data.password;
      const hash = new Buffer(`${username}:${password}`).toString('base64');
      options.headers['Authorization'] = `Basic ${hash}`;


    }
    return fetch(url, options).then(resp => {
      // console.log('Api response is ------------->>>>>>', resp);

      let json = resp.json();

      if (resp.ok) {
        return json
      }
      return json.then(err => { throw err });
    }).then(json => {
      // console.log('Api response is ------------->>>>>>', json);

      return json;
    });

  }

  static async postImageMulti(route, key, image, paramKey, paramValue) {
    let { orderStore } = Store;
    const url = `${host}/${route}`;
    const formData = new FormData();
    formData.append(paramKey, paramValue + "");

    let options = {};
    // console.log('here image is', image.length)
    if (image.length != undefined)
    {  for (var i = 0; i < image.length; i++) {
        console.log('size=>y', image[i]);

        const extension = image[i].mime.substring(image[i].mime.indexOf("/") + 1, image[i].mime.length);
        let imgname = image[i].path.substring(image[i].path.lastIndexOf('/') + 1, image[i].path.length);

        const photo = {

          uri: image[i].path,
          type: image[i].mime,
          name: Platform.OS == 'ios' && image[i].filename!=null ? image[i].filename : imgname,
        };
        formData.append(key + i, photo);

      }
    }else{
      console.log('size=>x', image);

      const extension = image.mime.substring(image.mime.indexOf("/") + 1, image.mime.length);
      let imgname = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.length);
      console.log('name?', imgname);

      const photo = {

        uri: image.path,
        type: image.mime,
        name: Platform.OS == 'ios' && image.filename!=null ? image.filename : imgname,
      };
      formData.append(key + i, photo);

    }
    // console.log("Form Data", formData);
    if (orderStore.isSocailLogin) {

      if (Platform.OS === 'ios') {

        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        };
    }

    else {

      if (Platform.OS === 'ios') {
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
          },
        };
    }

    const data = await LocalDb.getUserProfile();

    if (data != null) {
      const username = data.email;
      const password = data.password;
      const hash = new Buffer(`${username}:${password}`).toString('base64');
      options.headers['Authorization'] = `Basic ${hash}`;


    }
    return fetch(url, options).then(resp => {
      // console.log('Api response is ------------->>>>>>', resp);

      let json = resp.json();

      if (resp.ok) {
        return json
      }
      return json.then(err => { throw err });
    }).then(json => {
      // console.log('Api response is ------------->>>>>>', json);

      return json;
    });

  }

  static async postVideo(route, key, image, paramKey, paramValue) {
    let { orderStore } = Store;
    const url = `${host}/${route}`;
    const formData = new FormData();
    formData.append(paramKey, paramValue + "");

    let options = {};
    var namex = Math.ceil(Math.random() * 1000);
    // console.log('here image is', image.length)
    const video = {

      name: namex + '.mp4',
      type: 'video/mp4',
      uri: image,
    };
    formData.append(key, video);


    console.log("Form Data", formData);
    if (orderStore.isSocailLogin) {

      if (Platform.OS === 'ios') {

        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        

        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
          onUploadProgess:(progressEvent)=>{
            const {loaded,total}=progressEvent
            let percent = Math.floor(loaded*100/total)
            console.log(`${loaded} of ${total} | ${percent}`)
          }
        };
    }

    else {

      if (Platform.OS === 'ios') {
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
          },
          onUploadProgess:(progressEvent)=>{
            const {loaded,total}=progressEvent
            let percent = Math.floor(loaded*100/total)
            console.log(`${loaded} of ${total} | ${percent}`)
          }
        };
    }

    const data = await LocalDb.getUserProfile();

    if (data != null) {
      const username = data.email;
      const password = data.password;
      const hash = new Buffer(`${username}:${password}`).toString('base64');
      options.headers['Authorization'] = `Basic ${hash}`;


    }
    // console.log('options',options)
   


    let configration = Object.assign(config, options)
    // console.log('before post formdata is',formData)
    // console.log('before post config is',config)

    return axios.post(url,
      formData,
      configration,
    );

  }
  static axios = async (route, key, image, paramKey, paramValue,config) => {
   
    let { orderStore } = Store;
    const url = `${host}/${route}`;

    const formData = new FormData();
    formData.append(paramKey, paramValue + "");

    let options = {};
    var namex = Math.ceil(Math.random() * 1000);
    const video = {

      name: namex + '.mp4',
      type: 'video/mp4',
      uri: image,
    };
    formData.append(key, video);
    // let configration = Object.assign(config, options)
   
    ///////////////
    if (orderStore.isSocailLogin) {

      if (Platform.OS === 'ios') {

        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        

        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
          
        };
    }

    else {

      if (Platform.OS === 'ios') {
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
          },
        
        };
    }

    const data = await LocalDb.getUserProfile();

    if (data != null) {
      const username = data.email;
      const password = data.password;
      const hash = new Buffer(`${username}:${password}`).toString('base64');
      options.headers['Authorization'] = `Basic ${hash}`;


    }
    ///////////////
    console.log('configuration',config)
    console.log('options',options)
    let configration = Object.assign(config, options)


    return axios.post(url,
      formData,
      configration,
    );
   
  }
  static async postVideoOld(route, key, image, paramKey, paramValue) {
    let { orderStore } = Store;
    const url = `${host}/${route}`;
    const formData = new FormData();
    formData.append(paramKey, paramValue + "");

    let options = {};
    var namex = Math.ceil(Math.random() * 1000);
    // console.log('here image is', image.length)
    const video = {

      name: namex + '.mp4',
      type: 'video/mp4',
      uri: image,
    };
    formData.append(key, video);


    // console.log("Form Data", formData);
    if (orderStore.isSocailLogin) {

      if (Platform.OS === 'ios') {

        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
        

        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
            'CARSPOT-LOGIN-TYPE': 'social',
          },
          onUploadProgess:(progressEvent)=>{
            const {loaded,total}=progressEvent
            let percent = Math.floor(loaded*100/total)
            console.log(`${loaded} of ${total} | ${percent}`)
          }
        };
    }

    else {

      if (Platform.OS === 'ios') {
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'ios',
          },
        };
      }
      else
        options = {
          method: 'POST',
          body: formData,
          headers: {
            'Purchase-Code': PURCHASE_CODE,
            'Custom-Security': CUSTOM_SECURITY,
            'Carspot-Request-From': 'android',
          },
          onUploadProgess:(progressEvent)=>{
            const {loaded,total}=progressEvent
            let percent = Math.floor(loaded*100/total)
            console.log(`${loaded} of ${total} | ${percent}`)
          }
        };
    }

    const data = await LocalDb.getUserProfile();

    if (data != null) {
      const username = data.email;
      const password = data.password;
      const hash = new Buffer(`${username}:${password}`).toString('base64');
      options.headers['Authorization'] = `Basic ${hash}`;


    }
    console.log('options',options)
    return fetch(url, options).then(resp => {
      // console.log('Api response is ------------->>>>>>', resp);

      let json = resp.json();

      if (resp.ok) {
        return json
      }
      return json.then(err => { throw err });
    }).then(json => {
      // console.log('Api response is ------------->>>>>>', json);

      return json;
    });

  }
  // static async postVideo(route, key, image, paramKey, paramValue) {
  //   let { orderStore } = Store;
  //   const url = `${host}/${route}`;
  //   const formData = new FormData();
  //   formData.append(paramKey, paramValue + "");

  //   let options = {};
  //   // console.log('here image is', image.length)
  //   const video = {

  //     name: 'test1',
  //     type: 'video/mp4',
  //     uri: RNFetchBlob.wrap(image),
  //   };
  //   formData.append(key, video);


  //   console.log("Form Data", formData);
  //   if (orderStore.isSocailLogin) {

  //     if (Platform.OS === 'ios') {

  //       options = {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           'Purchase-Code': PURCHASE_CODE,
  //           'Custom-Security': CUSTOM_SECURITY,
  //           'Carspot-Request-From': 'ios',
  //           'CARSPOT-LOGIN-TYPE': 'social',
  //         },
  //       };
  //     }
  //     else
  //       options = {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           'Purchase-Code': PURCHASE_CODE,
  //           'Custom-Security': CUSTOM_SECURITY,
  //           'Carspot-Request-From': 'android',
  //           'CARSPOT-LOGIN-TYPE': 'social',
  //         },
  //       };
  //   }

  //   else {

  //     if (Platform.OS === 'ios') {
  //       options = {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           'Purchase-Code': PURCHASE_CODE,
  //           'Custom-Security': CUSTOM_SECURITY,
  //           'Carspot-Request-From': 'ios',
  //         },
  //       };
  //     }
  //     else
  //       options = {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           'Purchase-Code': PURCHASE_CODE,
  //           'Custom-Security': CUSTOM_SECURITY,
  //           'Carspot-Request-From': 'android',
  //         },
  //       };
  //   }

  //   const data = await LocalDb.getUserProfile();

  //   if (data != null) {
  //     const username = data.email;
  //     const password = data.password;
  //     const hash = new Buffer(`${username}:${password}`).toString('base64');
  //     options.headers['Authorization'] = `Basic ${hash}`;


  //   }
  //   return RNFetchBlob.fetch('POST',url, {
  //     'Purchase-Code': PURCHASE_CODE,
  //     'Custom-Security': CUSTOM_SECURITY,
  //     'Carspot-Request-From': 'android',
  //     'CARSPOT-LOGIN-TYPE': 'social',
  //     'Authorization':'Basic ZmF6YWxAZ21haWwuY29tOmZhemFs'
  //   },[
  //     {ad_id:paramValue+""},
  //     {videos:video}
  //   ]).then(resp => {
  //     console.log('Api response is ------------->>>>>>', resp);

  //     let json = resp.json();

  //     if (resp.ok) {
  //       return json
  //     }
  //     return json.then(err => { throw err });
  //   }).then(json => {
  //     // console.log('Api response is ------------->>>>>>', json);

  //     return json;
  //   });

  // }


  // static async func(route, params, verb) {


  //   const host = 'https://carspot-api.scriptsbundle.com/wp-json/carspot/v1';
  //   const url = `${host}/${route}`
  //   let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null );


  //   options.headers = Api.headers()

  //   const data = await LocalDb.getUserProfile();

  //   if(data!=null){
  //     const username = data.email;
  //     const password = data.password;
  //     const hash = new Buffer(`${username}:${password}`).toString('base64');
  //     options.headers['Authorization'] = `Basic ${hash}`;

  //   }

  //   let {orderStore} = {Store};
  // if(orderStore.isSocailLogin){
  //     const username = params.email;
  //     const password = '123';
  //     const hash = new Buffer(`${username}:${password}`).toString('base64');
  //     options.headers['Authorization'] = `Basic ${hash}`;
  // }      

  //   return fetch(url, options).then( resp => {
  //     console.log('Api response is ------------->>>>>>', resp);

  //     let json = resp.json();

  //     if (resp.ok) {
  //       return json
  //     }
  //     return json.then(err => {throw err});
  //   }).catch( json => { 
  //     console.log('Api response is ------------->>>>>>', json);
  //       //Api.showAlert();
  //     //return json;
  //   });
  // }

  static async func(route, params, verb) {
    //  console.warn(JSON.stringify(params));
    let { orderStore } = Store;

    const url = `${host}/${route}`
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);


    options.headers = Api.headers()


      // ..... >>>> Getting language key
      let nxxx = await LocalDb.getItem('language')
      options.headers['Carspot-Lang-Locale'] = nxxx;

    const data = await LocalDb.getUserProfile();
    if (params != null && params.type === 'social') {

      const username = params.email;
      const password = '123';
      const hash = new Buffer(`${username}:${password}`).toString('base64');
      options.headers['Authorization'] = `Basic ${hash}`;
    }
    else
      if (data != null) {
        const username = data.email;
        const password = data.password;
        const hash = new Buffer(`${username}:${password}`).toString('base64');
        options.headers['Authorization'] = `Basic ${hash}`;


      }

    return fetch(url, options).then(resp => {
      console.log('Api response is ------------->>>>>>', resp);

      let json = resp.json();

      if (resp.ok) {
        return json
      }
      return json.then(err => { throw err });
    }).catch(json => {
      console.log('error is ', json)
      // console.log('Api response is ------------->>>>>>', json);
      Api.showAlert();
      return;
    });
  }
  static showAlert() {
    // Works on both iOS and Android
    Alert.alert(
      'Network Error!',
      'Click Ok To Restart App.',
      [

        { text: 'OK', onPress: () => RNRestart.Restart() },
      ],
      { cancelable: false },
    );
  }
}
export default Api;
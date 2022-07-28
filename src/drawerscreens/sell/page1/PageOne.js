

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
  Modal,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  FlatList,
  Dimensions
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Appearences from '../../../config/Appearences';
import styles from './Styles';
import Store from '../../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../../network/Api';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalDropdown from 'react-native-modal-dropdown';
import s from '../page3/Styles';
import Visibility from '../../../components/Visibility';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';
import ConfirmDialogue from '../../../components/ConfirmDialogue';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { observer } from 'mobx-react';
import ActionSheet from 'react-native-actionsheet'

import VideoRecorder from 'react-native-beautiful-video-recorder';
import ImagePickerSingle from 'react-native-image-picker';
import Video from 'react-native-video';
import ModalBox from 'react-native-modalbox';

import { widthPercentageToDP as wp } from '../../../helper/Responsive'
import { WebView } from 'react-native-webview';
import HTMLView from 'react-native-htmlview';

import RNFetchBlob from 'react-native-fetch-blob'
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { stat } from 'react-native-fs';

import { ProcessingManager } from 'react-native-video-processing';

import MediaMeta from "rn-media-meta";


var imageId;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const DEFAULT_EXTENSION = {
  AUDIO: 'mp3',
  VIDEO: 'mp4',
};

// @observer
export default class PageOne extends Component<Props> {
  isCategoryRequired = false;
  isTitleRequired = false;
  categoryClear = true;
  titleClear = true;

  constructor(props) {

    super(props);


    this.state = {
      showPriceOnly: true,
      showSpinner: false,
      showCategorySpinner: false,
      categoryId: "",
      showCategoryError: false,
      showImageError: false,
      showVideoError: false,
      images: [],

      isImageViewVisle: false,
      hideImageIndicator: true,
      fullImages: [],
      currentImage: 0,
      showConfirmDialogue: false,
      showConfirmDialogueVideo: false,


      subCategories: [],
      subSubCategories: [],
      subSubSubCategories: [],


      showSubCategories: false,
      showSubSubCategories: false,
      showSubSubSubCategories: false,
      showPriceTypeError: false,
      priceTypeId: "",

      pageOne: [],

      selectedTag: 'body',
      selectedStyles: [],
      videouri: '',

      videomodal: false,
      uploadingVideo: false,
      uploadedVideo: '',
      fetchingNumberPlate: false,
      titleFilled: false,
      titletxt: '',
      titletxtTop: '',
      uploadedVideoId: '',
      newCarObj: '',

      showsubnew: false,
      showsubsubnew: false,
      progressValue: 0,
      deleting: 0,

      loadingVideoFromGallery: false,

      compressingVideo: false,

      isRegFieldEditing: false,
      fullscreenmodal: false,
      pauseVideo: false,


      cameratype: 'back',
      startoption1: '', startoption2: '',
      // registrationFormatType: 'both'


      // mediaTools:''

    };
    this.editor = null;
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

  }
  _keyboardDidShow() {
    // console.log('Keyboard Shown');
  }


  _keyboardDidHide = () => {
    // console.log('Keyboard Hidden',this.state);
    // if (this.state.isRegFieldEditing) {
    //   this.setState({ fetchingNumberPlate: true, isRegFieldEditing: false })
    //   this.getVehicleDetails('xyz', this.state.titletxt)
    // if (this.state.registrationFormatType == 'both') {
    //   if (this.state.titletxt.length == 9) {
    //     if (this.state.titletxt[2] == '-' && this.state.titletxt[6] == '-') {
    //       this.setState({ fetchingNumberPlate: true })
    //       this.getVehicleDetails('xyz', this.state.titletxt)
    //     }
    //   }
    //   else if (this.state.titletxt.length == 8) {

    //     var firstFour = true
    //     for (var x = 0; x < 4; x++) {

    //       if (this.state.titletxt[x] >= '0' && this.state.titletxt[x] <= '9') {

    //       } else {
    //         firstFour = false
    //       }
    //     }
    //     // console.log('first four', firstFour)
    //     if (firstFour) {
    //       var alpha1 = this.isLetter(this.state.titletxt[4])
    //       var alpha2 = this.isLetter(this.state.titletxt[5])
    //       if (alpha1 && alpha2) {
    //         // var
    //         // console.log('second 2 ', true)
    //         // console.log('second 8',(stateClone[index].value[7] >= '0' && stateClone[index].value[7] <= '9') )

    //         var last1 = (this.state.titletxt[6] >= '0' && this.state.titletxt[6] <= '9')
    //         var last2 = (this.state.titletxt[7] >= '0' && this.state.titletxt[7] <= '9')

    //         if (last1 && last2) {
    //           this.setState({ fetchingNumberPlate: true, isRegFieldEditing: false })
    //           this.getVehicleDetails('xyz', this.state.titletxt)
    //         }
    //       }
    //     }

    //   }
    // } else if (this.state.registrationFormatType == 'one') {
    //   if (this.state.titletxt.length == 9) {
    //     if (this.state.titletxt[2] == '-' && this.state.titletxt[6] == '-') {
    //       this.setState({ fetchingNumberPlate: true })
    //       this.getVehicleDetails('xyz', this.state.titletxt)
    //     }
    //   }
    // } else if (this.state.registrationFormatType == 'two') {
    //   if (this.state.titletxt.length == 8) {

    //     var firstFour = true
    //     for (var x = 0; x < 4; x++) {

    //       if (this.state.titletxt[x] >= '0' && this.state.titletxt[x] <= '9') {

    //       } else {
    //         firstFour = false
    //       }
    //     }
    //     // console.log('first four', firstFour)
    //     if (firstFour) {
    //       var alpha1 = this.isLetter(this.state.titletxt[4])
    //       var alpha2 = this.isLetter(this.state.titletxt[5])
    //       if (alpha1 && alpha2) {
    //         // var
    //         // console.log('second 2 ', true)
    //         // console.log('second 8',(stateClone[index].value[7] >= '0' && stateClone[index].value[7] <= '9') )

    //         var last1 = (this.state.titletxt[6] >= '0' && this.state.titletxt[6] <= '9')
    //         var last2 = (this.state.titletxt[7] >= '0' && this.state.titletxt[7] <= '9')

    //         if (last1 && last2) {
    //           this.setState({ fetchingNumberPlate: true, isRegFieldEditing: false })
    //           this.getVehicleDetails('xyz', this.state.titletxt)
    //         }
    //       }
    //     }

    //   }
    // }
    // }
  }
  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  showActionSheet = () => {
    // console.log('xxxxx')
    this.ActionSheet.show()
  }

  showActionSheetVideo = () => {
    // console.log('xxxxx')
    if (this.state.uploadedVideo == '')
      this.ActionSheetVideo.show()
  }

  componentDidMount = () => {
    // this.getVehicleDetails()
    // this.getSearchResults()
    // this.player2.presentFullscreenPlayer()
    // Toast.show('mounted')

    let { orderStore } = Store;
    let priceType = orderStore.sell.extra.price_type_data;
    if (priceType[0].key != undefined) {
      this.setState({ priceTypeId: priceType[0].key, showPriceOnly: priceType[0].is_show });
    }
    const imagesArray = orderStore.sell.data.ad_images;
    if (imagesArray.length != 0) {
      var images = [];
      var fullImages = [];
      for (var i = 0; i < imagesArray.length; i++) {
        var model = {};
        var fullImage;
        model.thumb = imagesArray[i].thumb;
        model.id = imagesArray[i].img_id;
        images.push(model);
        fullImages.push({ url: imagesArray[i].thumb });
      }
      this.setState({ images: orderStore.sell.data.ad_images, fullImages: fullImages });

    }
    // if (orderStore.sell.extra.api_registration_text_format != undefined) {
    //   this.setState({ registrationFormatType: orderStore.sell.extra.api_registration_text_forma })
    // }
    this.setState({ pageOne: orderStore.innerResponse.pageOne });
  }


  getVehicleDetails = (name, number) => {
    const params = {
      registration_number: 'DC-109-AA',
      userName: 'tomberapic'
    };

    fetch('https://www.immatriculationapi.com/api/reg.asmx/CheckFrance?RegistrationNumber=' + number + '&username=tomberapic')
      .then(async (responsexml) => {
        let { orderStore } = Store;

        // console.log('response is', responsexml)
        // parseString(responsexml, function (err, result) {
        //   console.log('responsess is', responsexml)
        // });
        if (responsexml.status == 500) {
          var newresponsexml = await responsexml.text()
          Toast.show(orderStore.sell.extra.api_toast_mesg)
          this.setState({ fetchingNumberPlate: false })
        }
        if (responsexml.status == 200) {


          var newresponsexml = await responsexml.text()
          //  console.log('response is',responsexml)

          var newstring = newresponsexml.split('<vehicleJson>')
          var newnewstring = newstring[1].split('</vehicleJson>')
          // console.log('new is',newstring)
          // console.log('new new  is',newnewstring)
          var result = newnewstring[0].substring(1, newnewstring[0].length - 1);
          // console.log('new result  is',result)

          var newjson = JSON.parse("{" + result + "}")
          console.log('new json  is', newjson)
          this.setState({ newCarObj: newjson })
          const params = {
            api_car_reg_year: newjson.RegistrationYear,
            api_car_make: newjson.CarMake.CurrentTextValue,
            api_car_model: newjson.CarModel.CurrentTextValue,
            api_car_engine_size: newjson.EngineSize.CurrentTextValue,
            api_car_body_style: newjson.BodyStyle.CurrentTextValue,
            api_car_fuel_type: newjson.FuelType.CurrentTextValue,
            api_car_libVersion: newjson.ExtendedData.libVersion,
            api_car_transmission: newjson.ExtendedData.boiteDeVitesse
          };

          const response = await Api.post("post_ad/apiSearchResult", params);
          if (response.success) {

            const fields = response.data.fields;
            var model = { pageOne: [], pageTwo: [], pageThree: [], pageFour: [] };
            for (var i = 0; i < fields.length; i++) {

              if (fields[i].field_type === "select") {
                var selectedValue = "";
                var selectedId = "";
                if (fields[i].values.length != 0) {
                  if (fields[i].values[0].value != undefined)
                    selectedId = fields[i].values[0].value;
                  selectedValue = fields[i].values[0].name;
                }
                let fieldsModel = {
                  title: fields[i].title, isRequired: fields[i].is_required,
                  fieldTypeName: fields[i].field_type_name, values: fields[i].values, showError: false,
                  selectedValue: selectedValue, selectedId: selectedId,
                  type: "select", data: fields[i]
                };
                if (fields[i].has_page_number === "1")
                  model.pageOne.push(fieldsModel);
                if (fields[i].has_page_number === "2")
                  model.pageTwo.push(fieldsModel);
                if (fields[i].has_page_number === "3")
                  model.pageThree.push(fieldsModel);
                if (fields[i].has_page_number === "4")
                  model.pageFour.push(fieldsModel);


              }
              if (fields[i].field_type === "textfield") {

                let fieldsModel = { title: fields[i].title, isRequired: fields[i].is_required, fieldTypeName: fields[i].field_type_name, value: "", showError: false, type: "textfield" };
                if (fields[i].has_page_number === "1")
                  model.pageOne.push(fieldsModel);
                if (fields[i].has_page_number === "2")
                  model.pageTwo.push(fieldsModel);
                if (fields[i].has_page_number === "3")
                  model.pageThree.push(fieldsModel);
                if (fields[i].has_page_number === "4")
                  model.pageFour.push(fieldsModel);

              }
              if (fields[i].field_type === "textarea") {
                let fieldsModel = { title: fields[i].title, isRequired: fields[i].is_required, fieldTypeName: fields[i].field_type_name, value: "", showError: false, type: "textarea" };
                if (fields[i].has_page_number === "1")
                  model.pageOne.push(fieldsModel);
                if (fields[i].has_page_number === "2")
                  model.pageTwo.push(fieldsModel);
                if (fields[i].has_page_number === "3")
                  model.pageThree.push(fieldsModel);
                if (fields[i].has_page_number === "4")
                  model.pageFour.push(fieldsModel);

              }

              if (fields[i].field_type === "checkbox") {
                let values = fields[i].values;
                // if(fields[i].values[0].id.length === 0)
                //   {
                //     values.splice(0,1);
                //   }
                let fieldsModel = { title: fields[i].title, isRequired: fields[i].is_required, fieldTypeName: fields[i].field_type_name, values: values, selectedValues: [], showError: false, isChecked: false, type: "checkbox" };
                if (fields[i].has_page_number === "1")
                  model.pageOne.push(fieldsModel);
                if (fields[i].has_page_number === "2")
                  model.pageTwo.push(fieldsModel);
                if (fields[i].has_page_number === "3")
                  model.pageThree.push(fieldsModel);
                if (fields[i].has_page_number === "4")
                  model.pageFour.push(fieldsModel);

              }


            }
            orderStore.pricing = response.data.profile.pricing;

            orderStore.innerResponse = model;
            // console.log('orderstore modal',JSON.stringify(orderStore.innerResponse))
            orderStore.innerResponse.pageOne[1].value = this.state.titletxt
            orderStore.innerResponse.pageOne[0].value = this.state.titletxtTop
            // let stateClone = [...this.state.pageOne];



            orderStore.sell = response;
            this.setState({ pageOne: orderStore.innerResponse.pageOne, fetchingNumberPlate: false, isRegFieldEditing: false })



            ////////////////////////////
            // console.log('orderstore innerresponse page1', orderStore.innerResponse.pageOne)

            for (var i = 0; i < orderStore.innerResponse.pageOne.length; i++) {
              if (orderStore.innerResponse.pageOne[i].fieldTypeName === "ad_cats1") {
                if (orderStore.innerResponse.pageOne[i].values != undefined && orderStore.innerResponse.pageOne[i].values.length != 0) {
                  // console.log('show category id 1', orderStore.innerResponse.pageOne[i].values[0].id)
                  this.setState({ categoryId: orderStore.innerResponse.pageOne[i].values[0].id });
                }

                if (orderStore.innerResponse.pageOne[i].values[0].has_sub) {
                  // console.log('show category id 2', orderStore.innerResponse.pageOne[i].values[0].id)

                  this.setState({ categoryId: orderStore.innerResponse.pageOne[i].values[0].id, showSubCategories: false, showSubSubCategories: false, showSubSubSubCategories: false, });

                  // this.getSubCategories(orderStore.innerResponse.pageOne[i].values[0].id);
                }
                if (orderStore.innerResponse.pageOne[i].values[0].has_template) {
                  orderStore.optionSelectedModel.hasTemp = true;
                  orderStore.optionSelectedModel.categoryId = orderStore.innerResponse.pageOne[i].values[0].id;
                  orderStore.setOnDynamicOptionSeleted(true);
                  // console.log('here inside vehicle details option selection modal is set tru', orderStore.optionSelectedModel)

                }
                else {
                  orderStore.optionSelectedModel.hasTemp = false;
                  orderStore.setOnDynamicOptionSeleted(false);
                  // console.log('here inside vehicle details option selection modal is set fal', orderStore.optionSelectedModel)

                }
              }
            }
            ////////////////////////////

            // var subcatparam={
            //   api_car_model: this.state.newCarObj.CarModel.CurrentTextValue
            // }
            // console.log('subcats param',subcatparam)
            // const responsexyz = await Api.post("post_ad/subcats", subcatparam);

            this.getSubCategoriesNew(this.state.newCarObj.CarModel.CurrentTextValue)

            this.makeDropdownRef.select(-1)


            // this.createData()
            // orderStore.setPageOneReload(true)
            // this.createData()
            // console.log('now store is',JSON.stringify(orderStore.sell))
          }
        }

      })
      .catch((error) => {
        console.log('error', error)
        this.setState({ fetchingNumberPlate: false })
      })
  }

  uploadMultipleImages = async (images) => {
    // console.log('images are',images)
    this.setState({ hideImageIndicator: false });
    let { orderStore } = Store;
    const response = await Api.postImageMulti("post_ad/image", "file", images, "ad_id", orderStore.sell.data.ad_id);
    if (response.success === true) {
      var images = [];
      var fullImages = [];
      for (var i = 0; i < response.data.ad_images.length; i++) {
        var model = {};
        model.thumb = response.data.ad_images[i].thumb;
        model.id = response.data.ad_images[i].img_id;
        images.push(model);
        fullImages.push({ url: response.data.ad_images[i].thumb });
      }
      // console.log('images ->', response.data.ad_images)
      // console.log('full images ->', fullImages)
      // console.log('full images ->',fullImages)
      this.setState({ images: response.data.ad_images, fullImages: fullImages, showImageError: false });
    }
    this.setState({ hideImageIndicator: true });
    if (response.message.length != 0)
      Toast.show(response.message);
  }




  /* 
  * Start recording
  */

  start = (duration, imageExtra) => {


    this.videoRecorder.open({ maxLength: duration }, async (data) => {
      console.log('captured data', data);

      this.setState({ videomodal: true, loadingVideoFromGallery: true })

      if (Platform.OS == 'ios') {
        const statResult = await stat(data.uri);
        var sizeMB = this.newformatBytes(statResult.size)
        console.log('size ', sizeMB)

        if (imageExtra.videoOptions.allow_upload_video_compress) { }
        else {
          if (sizeMB.type != 'bytes' && sizeMB.type != 'KB') {
            if (+sizeMB.value > +imageExtra.videoOptions.sb_upload_video_limit_mb) {
              this.setState({ videomodal: false, loadingVideoFromGallery: false, isSizeGreater: true })
            }
            else {
              this.setState({ videouri: data.uri, videomodal: true, loadingVideoFromGallery: false })
            }
          } else {
            this.setState({ videouri: data.uri, videomodal: true, loadingVideoFromGallery: false })

          }
        }

      }
      /////// Android recording part ///////
      else {
        RNFetchBlob.fs.stat(data.uri)
          .then(async (stats) => {
            console.log('stas', stats)

            var sizeMB = this.newformatBytes(stats.size)
            console.log('size ', sizeMB)


            if (imageExtra.videoOptions.allow_upload_video_compress) { }
            else {
              if (sizeMB.type != 'bytes' || sizeMB.type != 'KB') {
                if (+sizeMB.value > +imageExtra.videoOptions.sb_upload_video_limit_mb) {
                  Toast.show(imageExtra.videoOptions.sb_ad_post_video_size_label)
                  this.setState({ videouri: '', pauseVideo: true, videomodal: false, loadingVideoFromGallery: false })

                }
                else {
                  this.setState({ videouri: data.uri, videomodal: true, loadingVideoFromGallery: false })
                }
              } else {
                this.setState({ videouri: data.uri, videomodal: true, loadingVideoFromGallery: false })

              }
            }



          })
          .catch((err) => {
            console.log('error ', err)

          })

      }

    });
  }

  /* 
  * End recording
  */


  uploadVideo = async (video) => {
    let { orderStore } = Store;
    this.props.uploadingvideo(true)
    let config = {
      onUploadProgress: function (progressEvent) {
        this.setState({ progressValue: parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)) })
      }.bind(this)
    }

    this.setState({ uploadingVideo: true, videomodal: false, pauseVideo: true });
    var response = await Api.postAxios("post_ad/video", "videos", this.state.videouri, "ad_id", orderStore.sell.data.ad_id, config);
    console.log('response from video is', response)
    response = response.data
    this.props.uploadingvideo(false)


    if (response.success === true) {
      Toast.show(response.message);

      this.setState({ uploadedVideo: response.data.video.ad_video.vid_url_path, 
        uploadedVideoId: response.data.video.ad_video.video_id, progressValue: 0 })
    }
    if(Platform.OS=='android'){
      this.setState({ uploadingVideo: false,pauseVideo:true });

    }else{
      this.setState({ uploadingVideo: false,pauseVideo:false });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
  }



  formatBytes = (bytes, decimals = 2) => {
    console.log(decimals)
    if (bytes === 0) return 0;

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  }

  newformatBytes = (bytes) => {
    console.log("bytes", bytes)
    var marker = 1024; // Change to 1000 if required
    var decimal = 3; // Change as required
    var kiloBytes = marker; // One Kilobyte is 1024 bytes
    var megaBytes = marker * marker; // One MB is 1024 KB
    var gigaBytes = marker * marker * marker; // One GB is 1024 MB
    var teraBytes = marker * marker * marker * marker; // One TB is 1024 GB

    var returnobj = {}
    // return bytes if less than a KB
    if (bytes < kiloBytes) {
      returnobj.value = bytes
      returnobj.type = 'bytes'
    }
    // return KB if less than a MB
    else if (bytes < megaBytes) {
      returnobj.value = (bytes / kiloBytes).toFixed(decimal)
      returnobj.type = 'KB'
    }

    // return MB if less than a GB
    else if (bytes < gigaBytes) {
      returnobj.value = (bytes / megaBytes).toFixed(decimal)
      returnobj.type = 'MB'
    }
    else {
      returnobj.value = (bytes / gigaBytes).toFixed(decimal)
      returnobj.type = 'GB'
    }
    // console.log('return obj',returnobj)
    return returnobj
    // return + " MB";
    // return GB if less than a TB

  }

  getSubCategoriesNew = async (id) => {
    let { orderStore } = Store;

    this.setState({ showCategorySpinner: true, subCategories: [], showsubnew: true });
    const params = { api_car_model: id };

    const response = await Api.post("post_ad/subcats", params);
    if (response.extras.package_type != undefined && response.extras.package_type != 'undefined' && response.extras.package_type.length != 0) {
      const pkgType = response.extras.package_type;
      const obj = { isRedirect: pkgType.is_redirect, redirectUrl: pkgType.redirect_url, total: pkgType.cart_total, totalText: pkgType.cart_total_text };
      // let { orderStore } = Store;
      orderStore.cart = obj;
    }
    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      // console.log('categoryId:response.data.values',tempArray[0])
      this.setState({
        categoryId: tempArray[0].id,
        showCategorySpinner: false, subCategories: tempArray, showSubCategories: true,
      });

      if (tempArray[0].has_template) {
        orderStore.optionSelectedModel.hasTemp = true;
      }
      else
        orderStore.optionSelectedModel.hasTemp = false;

      orderStore.optionSelectedModel.categoryId = tempArray[0].id;
      orderStore.setOnDynamicOptionSeleted(true);

      for (var i = 0; i < orderStore.innerResponse.pageOne.length; i++) {
        if (orderStore.innerResponse.pageOne[i].fieldTypeName) {
          orderStore.innerResponse.pageOne[i].selectedId = tempArray[0].id
          orderStore.innerResponse.pageOne[i].selectedValue = tempArray[0].name
        }
      }
      // console.log('here inside vehicle details get cate new', orderStore.optionSelectedModel)


      if (this.state.newCarObj.ExtendedData.libVersion != undefined && this.state.newCarObj.ExtendedData.libVersion != null && this.state.newCarObj.ExtendedData.libVersion != '') {
        this.getSubSubCategoriesNew(tempArray[0].id, this.state.newCarObj.ExtendedData.libVersion)
      }
    }
    if (response.message.length != 0)
      setTimeout(() => {
        Toast.show(response.message);
      }, 1000)

    // console.log('show category spinner turning off')

    this.setState({ showCategorySpinner: false }, () => {
      this.setState({ showCategorySpinner: false })
    });

    // console.log('show category spinner turning ofxf')


  }
  getSubSubCategoriesNew = async (id, lib) => {
    // let {orderStore}=
    let { orderStore } = Store;

    this.setState({ showCategorySpinner: true, subSubCategories: [], showsubsubnew: true });
    // const params = { subcat: id };
    const params = { subcat: id, api_car_model: this.state.newCarObj.ExtendedData.libVersion };

    const response = await Api.post("post_ad/subcats", params);
    if (response.extras.package_type != undefined && response.extras.package_type != 'undefined' && response.extras.package_type.length != 0) {
      const pkgType = response.extras.package_type;
      const obj = { isRedirect: pkgType.is_redirect, redirectUrl: pkgType.redirect_url, total: pkgType.cart_total, totalText: pkgType.cart_total_text };
      // let { orderStore } = Store;
      orderStore.cart = obj;
    }

    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      this.setState({
        categoryId: tempArray[0].id,
        showCategorySpinner: false, subSubCategories: tempArray, showSubSubCategories: true,
      });


      if (tempArray[0].has_template) {
        orderStore.optionSelectedModel.hasTemp = true;
      }
      else
        orderStore.optionSelectedModel.hasTemp = false;

      orderStore.optionSelectedModel.categoryId = tempArray[0].id;
      orderStore.setOnDynamicOptionSeleted(true);
      for (var i = 0; i < orderStore.innerResponse.pageOne.length; i++) {
        if (orderStore.innerResponse.pageOne[i].fieldTypeName) {
          orderStore.innerResponse.pageOne[i].selectedId = tempArray[0].id
          orderStore.innerResponse.pageOne[i].selectedValue = tempArray[0].name
        }
      }
      // console.log('here inside vehicle details option selection modal is set tru get sub sub', orderStore.optionSelectedModel)

    }
    if (response.message.length != 0)
      setTimeout(() => {
        Toast.show(response.message);
      }, 1000)
    // console.log('show category spinner turning off')
    this.setState({ showCategorySpinner: false }, () => {
      this.setState({ showCategorySpinner: false })
    });
    // console.log('show category spinner turning ofxf')


  }



  getSubCategories = async (id) => {

    this.setState({ showCategorySpinner: true, subCategories: [], showsubnew: false });
    const params = { subcat: id };

    const response = await Api.post("post_ad/subcats", params);
    if (response.extras.package_type != undefined && response.extras.package_type != 'undefined' && response.extras.package_type.length != 0) {
      const pkgType = response.extras.package_type;
      const obj = { isRedirect: pkgType.is_redirect, redirectUrl: pkgType.redirect_url, total: pkgType.cart_total, totalText: pkgType.cart_total_text };
      let { orderStore } = Store;
      orderStore.cart = obj;
    }
    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      this.setState({ showCategorySpinner: false, subCategories: tempArray, showSubCategories: true, });

    }
    if (response.message.length != 0)
      setTimeout(() => {
        Toast.show(response.message);
      }, 1000)

    // console.log('show category spinner turning off')

    this.setState({ showCategorySpinner: false }, () => {
      this.setState({ showCategorySpinner: false })
    });

    // console.log('show category spinner turning ofxf')


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
    }
    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      this.setState({ showCategorySpinner: false, subSubSubCategories: tempArray, showSubSubSubCategories: true, });

    }
    if (response.message.length != 0)
      setTimeout(() => {
        Toast.show(response.message);
      }, 1000)
    // console.log('show category spinner turning off')

    this.setState({ showCategorySpinner: false }, () => {
      this.setState({ showCategorySpinner: false })
    });
    // console.log('show category spinner turning ofxf')


  }
  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    // console.log('****************** INSIDE RENDER *******************')
    // console.log('item', JSON.stringify(item))
    // console.log('index', index)
    // console.log('move', move)
    // console.log('moveEnd', moveEnd)
    // console.log('****************************************************')

    return (
      <DismissKeyboard>
        <TouchableOpacity style={styles.fileThumb}

          key={index}
          //onPress = {()=>{this.onImageClick(index)}}
          onLongPress={move}
          onPressOut={moveEnd}
        >
          <Image source={{ uri: item.thumb + '?date=' + (new Date()).getTime() }}
            style={styles.image}
            key={index}

          />
          <View style={styles.fileThumbAbsolute}>
            <TouchableOpacity
              onPress={() => {
                imageId = item.img_id;
                this.setState({ showConfirmDialogue: true })

              }
              }
              style={{ backgroundColor: 'white', width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
              <Image style={styles.fileThumbCrossImage}
                source={require('../../../../res/images/cross_red.png')}

              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </DismissKeyboard>
    );
  }
  getSubSubCategories = async (id) => {
    this.setState({ showCategorySpinner: true, subSubCategories: [], showsubsubnew: false });
    const params = { subcat: id };
    const response = await Api.post("post_ad/subcats", params);
    if (response.extras.package_type != undefined && response.extras.package_type != 'undefined' && response.extras.package_type.length != 0) {
      const pkgType = response.extras.package_type;
      const obj = { isRedirect: pkgType.is_redirect, redirectUrl: pkgType.redirect_url, total: pkgType.cart_total, totalText: pkgType.cart_total_text };
      let { orderStore } = Store;
      orderStore.cart = obj;
    }

    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      this.setState({ showCategorySpinner: false, subSubCategories: tempArray, showSubSubCategories: true, });

    }
    if (response.message.length != 0)
      setTimeout(() => {
        Toast.show(response.message);
      }, 1000)
    // console.log('show category spinner turning off')
    this.setState({ showCategorySpinner: false }, () => {
      this.setState({ showCategorySpinner: false })
    });
    // console.log('show category spinner turning ofxf')


  }

  onStyleKeyPress = (toolType) => {
    this.editor.applyToolbar(toolType);
  }

  onSelectedTagChanged = (tag) => {
    this.setState({
      selectedTag: tag
    })
  }

  onSelectedStyleChanged = (styles) => {
    this.setState({
      selectedStyles: styles,
    })
  }

  getPriceTypeField = () => {

    let { orderStore } = Store;
    let priceType = orderStore.sell.extra.price_type_data;
    let extra = orderStore.sell.extra;
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
              dropdownStyle={styles.dorpDownStyle}
              dropdownTextHighlightStyle={styles.dropDownTextStyle}
              textStyle={styles.dorpdownContainerTextStyle}
              defaultValue={valuesArray[0]}
              onSelect={(index, value) => {

                this.setState({ priceTypeId: idsArray[index], showPriceOnly: isShow[index] });
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

  getCategories = (item) => {
    this.isCategoryRequired = item.is_required;
    // Keyboard.dismiss()
    var valuesArray = [];
    var idsArray = [];
    for (var i = 0; i < item.values.length; i++) {
      valuesArray.push(item.values[i].name);
      idsArray.push(item.values[i].id);

    }

    // if(this.state.showCategorySpinner){
    //  return( 
    // }
    // console.log('here names is',valuesArray)
    // console.log('here ids is',idsArray)
    // console.log('here item is',item.values)
    return (

      <DismissKeyboard>



        <View>


          {/* Make */}
          <View style={[styles.headingTextContainer]}>
            <Text style={styles.subHeading}>{item.is_required ? item.title + " * " : item.title}</Text>


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
                  this.setState({ categoryId: idsArray[index], showCategoryError: false });

                if (item.values[index].has_sub) {

                  this.getSubCategories(idsArray[index]);

                }
                this.setState({ showSubCategories: false, showSubSubCategories: false, showSubSubSubCategories: false, });

                if (item.values[index].has_template) {
                  orderStore.optionSelectedModel.hasTemp = true;


                }
                else
                  orderStore.optionSelectedModel.hasTemp = false;
                orderStore.optionSelectedModel.categoryId = idsArray[index];
                orderStore.setOnDynamicOptionSeleted(true);
                // console.log('here modal dropdown on press', orderStore.optionSelectedModel)


              }}
              renderSeparator={() => {
                return (<View style={{
                  width: 0,
                  height: 0,
                }} />);
              }}

              renderRow={(option, index, isSelected) => {
                // console.log('option',option)
                // console.log('index',index)
                // console.log('isSecl',isSelected)
                return (<View style={styles.dorpDownRow}>
                  <Text style={styles.dropDownTextStyle}>{option}</Text>
                </View>);
              }}


            />
            <View style={styles.dropdownArrowContainer}>
              {
                this.state.showCategorySpinner ?
                  <ActivityIndicator
                    size="small"
                    style={{ position: 'absolute', zIndex: 10, alignSelf: 'center', right: '10%', bottom: '25%', }}
                  /> : null
              }
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

  getSubCategoriesView = () => {
    // console.log('I run')
    var names = [];
    var ids = [];
    var hasSubs = [];
    var hasTemplate = [];
    this.state.subCategories.map((item, index) => {
      names.push(item.name);
      ids.push(item.id);
      hasSubs.push(item.has_sub);
      hasTemplate.push(item.has_template);
    });
    // console.log('im called',names)
    let { orderStore } = Store;
    return (
      <DismissKeyboard>
        <View >
          {/* Model */}


          <TouchableOpacity onPress={() => {
            this.subRef.show();
          }}
            style={styles.row}
          >
            <ModalDropdown
              options={names}
              ref={el => this.subRef = el}
              style={styles.pickerContainer}
              dropdownStyle={styles.dorpDownStyle}
              dropdownTextHighlightStyle={styles.dropDownTextStyle}
              textStyle={styles.dorpdownContainerTextStyle}
              defaultValue={this.state.showsubnew == true ? names[0] : orderStore.sell.extra.select}
              // defaultValue={orderStore.sell.extra.select}
              onSelect={(index, value) => {
                let { orderStore } = Store;
                if (ids[index].length != 0)
                  this.setState({ categoryId: ids[index] });

                if (hasSubs[index]) {
                  this.getSubSubCategories(ids[index]);
                }

                this.setState({ showSubSubCategories: false, showSubSubSubCategories: false });
                if (hasTemplate[index]) {
                  orderStore.optionSelectedModel.hasTemp = true;

                }
                else
                  orderStore.optionSelectedModel.hasTemp = false;
                orderStore.optionSelectedModel.categoryId = ids[index];
                orderStore.setOnDynamicOptionSeleted(true);
                // console.log('here inside get sub sub on press', orderStore.optionSelectedModel)




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
              {
                this.state.showCategorySpinner ?
                  <ActivityIndicator
                    size="small"
                    style={{ position: 'absolute', zIndex: 10, alignSelf: 'center', right: '10%', bottom: '25%', }}
                  /> : null
              }
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
    // console.log('i run 2')
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
    // console.log('names',names)
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
              // defaultValue={orderStore.sell.extra.select}
              defaultValue={this.state.showsubsubnew == true ? names[0] : orderStore.sell.extra.select}

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

                }
                else
                  orderStore.optionSelectedModel.hasTemp = false;
                orderStore.optionSelectedModel.categoryId = ids[index];
                orderStore.setOnDynamicOptionSeleted(true);
                console.log('here iget sub sub sub on press', orderStore.optionSelectedModel)



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
  getSubSubSubCategoriesView = () => {
    // console.log('i run 3')

    var names = [];
    var ids = [];
    var hasSubs = [];
    var hasTemplate = [];
    this.state.subSubSubCategories.map((item, index) => {
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
            this.subSubSubRef.show();
          }}
            style={styles.row}
          >
            <ModalDropdown
              options={names}
              ref={el => this.subSubSubRef = el}
              style={styles.pickerContainer}
              dropdownStyle={styles.dorpDownStyle}
              dropdownTextHighlightStyle={styles.dropDownTextStyle}
              textStyle={styles.dorpdownContainerTextStyle}
              defaultValue={orderStore.sell.extra.select}
              onSelect={(index, value) => {
                let { orderStore } = Store;
                if (ids[index].length != 0)
                  this.setState({ categoryId: ids[index] });

                if (hasTemplate[index]) {
                  orderStore.optionSelectedModel.hasTemp = true;


                }
                else
                  orderStore.optionSelectedModel.hasTemp = false;
                orderStore.optionSelectedModel.categoryId = ids[index];
                orderStore.setOnDynamicOptionSeleted(true);
                console.log('here inside vget syxsxasjnxksnxket tru', orderStore.optionSelectedModel)


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


  onImageClick = (index) => {
    this.setState({ currentImage: index, isImageViewVisle: true })
  }
  deleteImage = async () => {
    this.setState({ hideImageIndicator: false, showConfirmDialogue: false });

    let { orderStore } = Store;
    const params = { ad_id: orderStore.sell.data.ad_id, img_id: imageId };
    const response = await Api.post("post_ad/image/delete", params);
    if (response.success === true) {
      var fullImages = [];
      for (var i = 0; i < response.data.ad_images.length; i++) {
        var model = {};
        model.thumb = response.data.ad_images[i].thumb;
        model.id = response.data.ad_images[i].img_id;
        fullImages.push({ url: response.data.ad_images[i].thumb });
      }

      this.setState({ images: response.data.ad_images, fullImages: fullImages });
    }
    this.setState({ hideImageIndicator: true });
    if (response.message.length != 0)
      Toast.show(response.message);
  }

  check = (s) => {
    var toks = s.split('-');
    console.log(toks);
    switch (toks.length) {
      case 3:
        if (!/^[A-Za-z]{0,2}$/.test(toks[2].trim())) return false;
      case 2:
        if (!/^\d{0,3}$/.test(toks[1].trim())) return false;
      case 1:
        return /^[A-Za-z]{0,2}$/.test(toks[0].trim());
      default:
        return false;
    }
  }

  isLetter = (str) => {
    return str.length === 1 && str.match(/[A-Z]/i);
  }

  deleteVideo = async () => {
    this.setState({ uploadingVideo: true, deleting: true, showConfirmDialogueVideo: false });

    let { orderStore } = Store;
    const params = { ad_id: orderStore.sell.data.ad_id, video_id: this.state.uploadedVideoId };
    const response = await Api.post("post_ad/video/delete", params);
    if (response.success === true) {

      this.setState({ videouri: '', uploadedVideo: '' });
    }
    this.setState({ uploadingVideo: false, deleting: false });
    if (response.message.length != 0)
      Toast.show(response.message);
  }


  getPageOne = (item, index) => {
    // console.log('get page one')
    let { orderStore } = Store;
    switch (item.type) {

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

                    onChangeText={(message) => {
                      let stateClone = [...this.state.pageOne];
                      if (message.length != 0 && item.isRequired) {
                        stateClone[index].showError = false;
                      }
                      stateClone[index].value = message;
                      this.setState({ pageOne: stateClone })
                    }}
                  ></TextInput>
                </View>
              </DismissKeyboard>
            );
          else return null;

        }
        if (item.fieldTypeName == 'api_registration_num') {
          return (

            <DismissKeyboard>
              <View>
                <View style={styles.headingTextContainer}>
                  <Text style={styles.subHeading}>{item.isRequired ? item.title + " * " : item.title}</Text>
                </View>
                <TextInput style={item.showError ? styles.TextInputError : styles.TextInput}
                  underlineColorAndroid='transparent'
                  textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  placeholder={item.placeholder == undefined ? 'AA-123-BB ou 1234AA75' : item.placeholder}
                  placeholderTextColor={Appearences.Registration.textColor}
                  value={this.state.titletxt}
                  // autoCapitalize = {'characters'}
                  keyboardType={Platform.OS === 'ios' ? 'default' : 'visible-password'}



                  onChangeText={(message) => {
                    let stateClone = [...this.state.pageOne];
                    // console.log('message fresh',message)
                    var oldvalue = this.state.titletxt
                    // if (!this.check(message)) {
                    //   message = oldvalue;
                    // } else {
                    //   oldvalue = message = message.toUpperCase()
                    // }
                    // console.log('mess',message)

                    if (message[message.length - 1] == ' ') {
                      message = this.state.titletxt
                    }
                    message = message.toUpperCase()
                    // console.log('message',message)



                    if (message.length != 0 && item.isRequired) {
                      stateClone[index].showError = false;
                    }
                    // console.log('mess',message.length)
                    // if (message.length == 2) {
                    //   message = message + "-"
                    // }

                    // if (message.length == 6) {
                    //   message = message + "-"
                    // }
                    // console.log('mess',message)
                    stateClone[index].value = message;

                    this.setState({ pageOne: stateClone, titletxt: message, isRegFieldEditing: true })
                  }}

                  onBlur={() => {
                    let stateClone = [...this.state.pageOne];

                    this.setState({ fetchingNumberPlate: true, isRegFieldEditing: true })
                    this.getVehicleDetails('xyz', stateClone[index].value)
                  }}
                  onSubmitEditing={(e) => {
                    let stateClone = [...this.state.pageOne];

                    this.setState({ fetchingNumberPlate: true, isRegFieldEditing: true })
                    this.getVehicleDetails('xyz', stateClone[index].value)
                    // registration_number: 'DC-109-AA',
                    // if (this.state.registrationFormatType == 'both') {
                    //   if (stateClone[index].value.length == 9) {
                    //     if (stateClone[index].value[2] == '-' && stateClone[index].value[6] == '-') {

                    //     }

                    //   }
                    //   else if (stateClone[index].value.length == 8) {

                    //     var firstFour = true
                    //     for (var x = 0; x < 4; x++) {

                    //       if (stateClone[index].value[x] >= '0' && stateClone[index].value[x] <= '9') {

                    //       } else {
                    //         firstFour = false
                    //       }
                    //     }
                    //     // console.log('first four', firstFour)
                    //     if (firstFour) {
                    //       var alpha1 = this.isLetter(stateClone[index].value[4])
                    //       var alpha2 = this.isLetter(stateClone[index].value[5])
                    //       if (alpha1 && alpha2) {
                    //         // var
                    //         // console.log('second 2 ', true)
                    //         // console.log('second 8',(stateClone[index].value[7] >= '0' && stateClone[index].value[7] <= '9') )

                    //         var last1 = (stateClone[index].value[6] >= '0' && stateClone[index].value[6] <= '9')
                    //         var last2 = (stateClone[index].value[7] >= '0' && stateClone[index].value[7] <= '9')

                    //         if (last1 && last2) {
                    //           this.setState({ fetchingNumberPlate: true, isRegFieldEditing: false })
                    //           this.getVehicleDetails('xyz', stateClone[index].value)
                    //         }
                    //       }
                    //     }

                    //   }
                    // } else if (this.state.registrationFormatType == 'one') {
                    //   if (stateClone[index].value.length == 9) {
                    //     if (stateClone[index].value[2] == '-' && stateClone[index].value[6] == '-') {
                    //       this.setState({ fetchingNumberPlate: true, isRegFieldEditing: true })
                    //       this.getVehicleDetails('xyz', stateClone[index].value)
                    //     }

                    //   }
                    // } else if (this.state.registrationFormatType == 'two') {
                    //   if (stateClone[index].value.length == 8) {

                    //     var firstFour = true
                    //     for (var x = 0; x < 4; x++) {

                    //       if (stateClone[index].value[x] >= '0' && stateClone[index].value[x] <= '9') {

                    //       } else {
                    //         firstFour = false
                    //       }
                    //     }
                    //     // console.log('first four', firstFour)
                    //     if (firstFour) {
                    //       var alpha1 = this.isLetter(stateClone[index].value[4])
                    //       var alpha2 = this.isLetter(stateClone[index].value[5])
                    //       if (alpha1 && alpha2) {
                    //         // var
                    //         // console.log('second 2 ', true)
                    //         // console.log('second 8',(stateClone[index].value[7] >= '0' && stateClone[index].value[7] <= '9') )

                    //         var last1 = (stateClone[index].value[6] >= '0' && stateClone[index].value[6] <= '9')
                    //         var last2 = (stateClone[index].value[7] >= '0' && stateClone[index].value[7] <= '9')

                    //         if (last1 && last2) {
                    //           this.setState({ fetchingNumberPlate: true, isRegFieldEditing: false })
                    //           this.getVehicleDetails('xyz', stateClone[index].value)
                    //         }
                    //       }
                    //     }

                    //   }
                    // }
                  }}
                >
                </TextInput>
                {
                  this.state.fetchingNumberPlate ?
                    <ActivityIndicator
                      size="small"
                      style={{ position: 'absolute', zIndex: 10, alignSelf: 'center', right: '5%', bottom: '15%', }}
                    /> : null
                }
              </View>


            </DismissKeyboard>
          );
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
                placeholderTextColor={Appearences.Registration.textColor}
                onChangeText={(message) => {
                  let stateClone = [...this.state.pageOne];
                  if (message.length != 0 && item.isRequired) {
                    stateClone[index].showError = false;
                  }
                  stateClone[index].value = message;

                  this.setState({ pageOne: stateClone, titletxtTop: message, })
                }}
              // onSubmitEditing={(e) => {
              //   let stateClone = [...this.state.pageOne];
              //   if (stateClone[index].value.length == 9) {
              //     if (stateClone[index].value[2] == '-' && stateClone[index].value[6] == '-') {
              //       this.setState({ fetchingNumberPlate: true })
              //       this.getVehicleDetails('xyz', stateClone[index].value)
              //     }

              //   }
              // }}
              >
              </TextInput>
              {/* {
                this.state.fetchingNumberPlate ?
                  <ActivityIndicator
                    size="small"
                    style={{ position: 'absolute', zIndex: 10, alignSelf: 'center', right: '5%', bottom: '15%', }}
                  /> : null
              } */}
            </View>

            {/* //////////// reg num text field ////////// */}

            {/* ////////////////////////////////////////// */}
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
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                placeholderTextColor={Appearences.Registration.textColor}
                onChangeText={(message) => {
                  let stateClone = [...this.state.pageOne];
                  if (message.length != 0 && item.isRequired) {
                    stateClone[index].showError = false;
                  }
                  stateClone[index].value = message;
                  this.setState({ pageOne: stateClone })
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
          const data = item;
          var names = [];
          var ids = [];

          data.values.map((item, index) => {
            names.push(item.name);
            if (item.value == undefined)
              ids.push("");
            else
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
                      // var selecStateClone = [...this.state.selectModel];
                      item.selectedValue = names[innerIndex];
                      item.selectedId = ids[innerIndex];
                      //     this.setState({selectModel:selecStateClone});


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
      case "checkbox":
        const data = item;
        return (
          <DismissKeyboard>
            <View key={index}>

              <View style={styles.headingTextContainer}>
                <Text style={styles.subHeading}>{item.isRequired ? data.title + "*" : data.title}</Text>
              </View>
              <View style={item.showError ? s.featuresContainerError : s.featuresContainer}>
                {
                  data.values.map((item, key) => (

                    <CheckBox
                      checkedColor={orderStore.color}
                      uncheckedColor={Appearences.Colors.black}
                      title={item.name}
                      key={key}
                      checked={item.is_checked}
                      containerStyle={s.checkBox}
                      size={Appearences.Fonts.paragraphFontSize}
                      textStyle={s.checkBoxText}
                      key={key}
                      onPress={() => {
                        let checkBoxClone = [...this.state.pageOne];
                        checkBoxClone[index].values[key].is_checked = !item.is_checked;
                        checkBoxClone[index].showError = false;
                        this.setState({ pageOne: checkBoxClone });

                      }}>
                    </CheckBox>

                  )
                  )}
              </View>

            </View>
          </DismissKeyboard>
        );


    }

  }

  render() {

    let { orderStore } = Store;

    if (orderStore.onFirstPageChange) {
      this.createData();
    }
    if (this.props.onNextClick) {
      if (orderStore.isFirstPageClear) {
        this.props.callBackFunc();
      }
    }

    // if(orderStore.pageOneReload){
    //   console.log('herrxiodiaosidoasid')
    // }


    // if (this.state.showSpinner)
    //   return (
    //     <Spinner
    //       visible={this.state.showSpinner}
    //       textContent={''}
    //       animation='slide'
    //     />

    //   );


    let data = orderStore.sell.data;
    let fields = [...data.fields];
    let extra = data.extra;
    let imageExtra = orderStore.sell.extra;
    const barWidth = parseInt((Dimensions.get('window').width / 100) * 50);

    return (
      <DismissKeyboard>

        <View style={{ height: '100%', backgroundColor: 'white' }}>

          <Modal visible={this.state.isImageViewVisle}
            onRequestClose={() => { this.setState({ isImageViewVisle: false }) }}
            transparent={true}>
            <ImageViewer
              imageUrls={this.state.fullImages}
              index={this.state.currentImage}
              enableSwipeDown={true}
              onSwipeDown={() => { this.setState({ isImageViewVisle: false }) }}
            />

          </Modal>

          <ScrollView
            keyboardShouldPersistTaps='always'
            contentContainerStyle={{
              backgroundColor: 'white',
              paddingBottom: 50,
            }}>
            <View style={styles.container}>



              {

                this.state.pageOne.map((item, key) => (
                  <View key={key}>
                    {this.getPageOne(item, key)}
                  </View>
                ))

              }

              {this.state.showSubCategories ? this.getSubCategoriesView() : null}
              {this.state.showSubSubCategories ? this.getSubSubCategoriesView() : null}
              {this.state.showSubSubSubCategories ? this.getSubSubSubCategoriesView() : null}



              <View style={styles.headingTextContainer}>
                <Text style={styles.subHeading}>{imageExtra.image_text + " * "}</Text>
              </View>


              <TouchableOpacity
                onPress={
                  this.showActionSheet

                  // () => {

                  // ImagePicker.openPicker({
                  //   multiple: true
                  // }).then(images => {
                  //   this.uploadMultipleImages(images);
                  // });
                  // }

                }
                style={this.state.showImageError ? styles.fileUploadContainerError : styles.fileUploadContainer}>
                <Visibility hide={!this.state.hideImageIndicator}>
                  {this.state.fullImages.length === 0 ? <Text style={styles.fileUploadText}>{}</Text> : null}
                </Visibility>
                <Visibility
                  hide={this.state.hideImageIndicator}
                  style={styles.fileUploadLoaderAbsoluteContainer}
                >
                  <Progress.Circle
                    size={Appearences.Fonts.headingFontSize + 20}
                    indeterminate={true}
                    color={orderStore.color} />
                </Visibility>

                <View style={styles.fileListAbsoluteContainer}>


                  <DraggableFlatList
                    data={this.state.images}
                    horizontal={true}
                    extraData={this.state.images}
                    renderItem={this.renderItem}
                    showsHorizontalScrollIndicator={false}
                    scrollPercent={5}
                    onMoveEnd={({ data }) => this.setState({ images: data })}
                    keyExtractor={item => item.img_id}
                  >
                  </DraggableFlatList>





                </View>

              </TouchableOpacity>


              <Text style={{ marginTop: 5, color: Appearences.Colors.headingGrey, fontSize: Appearences.Fonts.paragraphFontSize }}>{imageExtra.sort_image_msg}</Text>

            </View>

            <View style={styles.container}>


              {

                imageExtra.videoOptions.allow_video_on_ad ?
                  <View style={styles.headingTextContainer}>
                    <Text style={styles.subHeading}>{imageExtra.videoOptions.sb_ad_post_video_label}</Text>
                  </View>
                  : null
              }

              {
                imageExtra.videoOptions.allow_video_on_ad ?
                  this.state.uploadedVideo != '' && !this.state.uploadingVideo ?
                    [
                      <View

                        style={this.state.showVideoError ? styles.fileUploadContainerError : styles.fileUploadContainer}>

                        {
                          this.state.uploadingVideo && !this.state.deleting ?
                            <View style={styles.progressContainer}>
                              <ProgressBarAnimated
                                width={barWidth}
                                height={12}
                                value={Number(this.state.progressValue)}
                                backgroundColor={orderStore.appColor}
                                maxValue={100}
                                borderColor={Appearences.Colors.lightGrey} />
                              <Text style={styles.verdictHedingText}>{this.state.progressValue + '%'}</Text>
                            </View> : null
                        }

                        {
                          this.state.compressingVideo ?
                            <ActivityIndicator
                              animating={this.state.compressingVideo}
                              color='#bc2b78'
                              size="large"
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 80
                              }}
                            /> : null
                        }


                        <View style={[styles.fileListAbsoluteContainer]}>
                          {
                            this.state.uploadedVideo != '' && !this.state.uploadingVideo ?
                              // <WebView
                              //   useWebKit={false}
                              //   source={{ uri: 'https://carspot-api.scriptsbundle.com/wp-content/uploads/2020/05/351.mp4' }}

                              //   style={styles.videoContent}
                              //   allowsFullscreenVideo

                              // />
                              <View style={[{ height: '100%', width: '100%' }]}>
                                <Video source={{ uri: this.state.videouri }}
                                  ref={(ref) => {
                                    this.player2 = ref
                                  }}

                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                  }}
                                  controls
                                  playInBackground={false}
                                  playWhenInactive={false}
                                  onLoad ={ () => this.setState({ pauseVideo: true }) }
                                
                                  // paused={false}
                                
                                  paused={this.state.fullscreenmodal || this.state.pauseVideo}
                              


                                />
                                {/* {
                                  Platform.OS=='ios'?[]:[ */}
                                   
                                  {/* ]
                                } */}
                             
                             <TouchableOpacity
                                  onPress={() => {
                                    this.setState({ fullscreenmodal: true, fullscreenuri: this.state.videouri })
                                  }}
                                  style={{ position: 'absolute', left: wp(1), top: wp(0), backgroundColor: 'white', padding: wp(2) }}
                                >
                                  <Image
                                    source={require('../../../../res/images/interface.png')}
                                    style={{ tintColor: '#000', height: wp(3), width: wp(3) }}

                                  />
                                </TouchableOpacity>

                                {/* <View style={styles.fileThumbAbsolute}> */}
                                <TouchableOpacity
                                  onPress={() => {
                                    imageId = item.img_id;
                                    this.setState({ showConfirmDialogueVideo: true })

                                  }}
                                  
                                  style={{ position: 'absolute', right: wp(1), top: wp(0), backgroundColor: 'white', padding: wp(1) }}

                                  // style={{ backgroundColor: 'white', width: 25, height: 25, alignItems: 'center', justifyContent: 'center' ,zIndex:10}}
                                  >
                                  <Image style={styles.fileThumbCrossImage}
                                    source={require('../../../../res/images/cross_red.png')}

                                  />
                                </TouchableOpacity>
                              </View>

                              : null
                          }
                          {/* {
                            this.state.uploadedVideo != '' && !this.state.uploadingVideo ?

                              <View style={styles.fileThumbAbsolute}>
                                <TouchableOpacity
                                  onPress={() => {
                                    imageId = item.img_id;
                                    this.setState({ showConfirmDialogueVideo: true })

                                  }
                                  }
                                  style={{ backgroundColor: 'white', width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                                  <Image style={styles.fileThumbCrossImage}
                                    source={require('../../../../res/images/cross_red.png')}

                                  />
                                </TouchableOpacity>
                              </View>
                              : null
                          } */}

                          {/* {
                            this.state.uploadedVideo != '' && !this.state.uploadingVideo ?
                            <View style={styles.fileThumbAbsolute}>

                             <TouchableOpacity
                             onPress={() => {
                               this.setState({ fullscreenmodal: true, fullscreenuri: this.state.videouri })
                             }}
                             style={{ position: 'absolute', left: wp(1), top: wp(0), backgroundColor: 'white', padding: wp(2),zIndex:10 }}
                           >
                             <Image
                               source={require('../../../../res/images/interface.png')}
                               style={{ tintColor: '#000', height: wp(3), width: wp(3) }}

                             />
                           </TouchableOpacity></View>:null
                          } */}

                        </View>

                      </View>
                    ]
                    :
                    [
                      <TouchableOpacity
                        onPress={this.showActionSheetVideo}
                        disabled={this.state.uploadingVideo}
                        style={this.state.showVideoError ? styles.fileUploadContainerError : styles.fileUploadContainer}>

                        {
                          this.state.uploadingVideo && !this.state.deleting ?
                            <View style={styles.progressContainer}>
                              <ProgressBarAnimated
                                width={barWidth}
                                height={12}
                                value={Number(this.state.progressValue)}
                                backgroundColor={orderStore.appColor}
                                maxValue={100}
                                borderColor={Appearences.Colors.lightGrey} />
                              <Text style={styles.verdictHedingText}>{this.state.progressValue + '%'}</Text>
                            </View> : null
                        }

                        {
                          this.state.compressingVideo ?
                            <ActivityIndicator
                              animating={this.state.compressingVideo}
                              color='#bc2b78'
                              size="large"
                              style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 80
                              }}
                            /> : null
                        }


                        <View style={[styles.fileListAbsoluteContainer]}>
                          {
                            this.state.uploadedVideo != '' && !this.state.uploadingVideo ?
                              // <WebView
                              //   useWebKit={false}
                              //   source={{ uri: 'https://carspot-api.scriptsbundle.com/wp-content/uploads/2020/05/351.mp4' }}

                              //   style={styles.videoContent}
                              //   allowsFullscreenVideo

                              // />
                              <View style={[{ height: '100%', width: '100%' }]}>
                                <Video source={{ uri: this.state.videouri }}
                                  ref={(ref) => {
                                    this.player3 = ref
                                  }}

                                  style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    bottom: 0,
                                    right: 0,
                                  }}
                                  controls
                                  onLoad ={ () => this.setState({ pauseVideo: true }) }


                                  paused={this.state.fullscreenmodal || this.state.pauseVideo}
                                  playInBackground={false}
                                  playWhenInactive={false}
                                />

                                <TouchableOpacity
                                  onPress={() => {
                                    this.setState({ fullscreenmodal: true, fullscreenuri: this.state.videouri })
                                  }}
                                  style={{ position: 'absolute', left: wp(1), top: wp(0), backgroundColor: 'white', padding: wp(2) }}
                                >
                                  <Image
                                    source={require('../../../../res/images/interface.png')}
                                    style={{ tintColor: '#000', height: wp(3), width: wp(3) }}

                                  />
                                </TouchableOpacity>

                                {/* <View style={styles.fileThumbAbsolute}> */}
                                <TouchableOpacity
                                  onPress={() => {
                                    imageId = item.img_id;
                                    this.setState({ showConfirmDialogueVideo: true })

                                  }}
                                  
                                  style={{ position: 'absolute', right: wp(1), top: wp(0), backgroundColor: 'white', padding: wp(1) }}

                                  // style={{ backgroundColor: 'white', width: 25, height: 25, alignItems: 'center', justifyContent: 'center' ,zIndex:10}}
                                  >
                                  <Image style={styles.fileThumbCrossImage}
                                    source={require('../../../../res/images/cross_red.png')}

                                  />
                                </TouchableOpacity>
                              {/* </View> */}

                              </View>

                              : null
                          }
                          {/* {
                            this.state.uploadedVideo != '' && !this.state.uploadingVideo ?

                              <View style={styles.fileThumbAbsolute}>
                                <TouchableOpacity
                                  onPress={() => {
                                    imageId = item.img_id;
                                    this.setState({ showConfirmDialogueVideo: true })

                                  }
                                  }
                                  style={{ backgroundColor: 'white', width: 25, height: 25, alignItems: 'center', justifyContent: 'center' ,zIndex:10}}>
                                  <Image style={styles.fileThumbCrossImage}
                                    source={require('../../../../res/images/cross_red.png')}

                                  />
                                </TouchableOpacity>
                              </View>
                              : null
                          } */}

                        </View>

                      </TouchableOpacity>
                    ]

                  :
                  null
              }


              {
                imageExtra.videoOptions.allow_video_on_ad ?
                  <View>
                    <Text style={{ marginTop: 5, color: Appearences.Colors.headingGrey, fontSize: Appearences.Fonts.paragraphFontSize }}>{imageExtra.videoOptions.sb_ad_post_video_duration_label}</Text>
                    <Text style={{ marginTop: 5, color: Appearences.Colors.headingGrey, fontSize: Appearences.Fonts.paragraphFontSize }}>{imageExtra.videoOptions.sb_ad_post_video_size_label}</Text>

                  </View>
                  : null
              }
            </View>


            <ConfirmDialogue
              visible={this.state.showConfirmDialogue}
              onConfirm={() => { this.deleteImage() }}
              onCancel={() => { this.setState({ showConfirmDialogue: false }) }}
            />

            <ConfirmDialogue
              visible={this.state.showConfirmDialogueVideo}
              onConfirm={() => { this.deleteVideo() }}
              onCancel={() => { this.setState({ showConfirmDialogueVideo: false }) }}
            />


            <ActionSheet
              ref={o => this.ActionSheet = o}
              title={'Select Media'}
              options={['Select from Camera', 'Select from Library', 'Cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={(index) => {
                if (index == 0) {
                  ImagePicker.openCamera({
                    mediaType: 'photo',
                    width: 500,
                    height: 500,
                    includeExif: true
                  }).then(images => {
                    this.uploadMultipleImages(images);
                  });
                }
                if (index == 1) {
                  ImagePicker.openPicker({
                    multiple: true
                  }).then(images => {
                    this.uploadMultipleImages(images);
                  });
                }

              }}
            />

            {/* /////////////////////////////////// */}
            <ActionSheet
              ref={o => this.ActionSheetVideo = o}
              title={'Select Media'}
              options={['Select Video from Camera', 'Select Video from Library', 'Cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={(index) => {

                if (index == 0) {

                  this.start(+imageExtra.videoOptions.sb_upload_video_limit_duration, imageExtra)

                }
                if (index == 1) {
                  ImagePickerSingle.launchImageLibrary({
                    title: 'Select Avatar',
                    mediaType: 'video',
                    durationLimit: +imageExtra.videoOptions.sb_upload_video_limit_duration,
                    allowsEditing: true
                  }, async (response) => {

                    const compressoptions = {
                      width: 720,
                      height: 480,
                      bitrateMultiplier: 3,
                      minimumBitrate: 300000,
                      saveToCameraRoll: true, // default is false // iOS only
                      saveWithCurrentDate: true, // default is false // iOS only
                    };
                    console.log('Response = ', response);
                    // this.uploadVideo(response.uri)
                    // console.log('path', 'file://' + response.path)
                    this.setState({ videomodal: true, loadingVideoFromGallery: true })
                    var options = {
                      startTime: 0,
                      endTime: +imageExtra.videoOptions.sb_upload_video_limit_duration,
                      saveToCameraRoll: true, // default is false // iOS only
                      saveWithCurrentDate: true, // default is false // iOS only


                    }

                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                      this.setState({
                        loadingVideoFromGallery:false,videomodal:false
                      });
                    } else if (response.error) {
                      console.log('ImagePicker Error: ', response.error);

                      this.setState({
                        loadingVideoFromGallery:false,videomodal:false
                      });
                    } else if (response.customButton) {
                      console.log('User tapped custom button: ', response.customButton,);

                      this.setState({
                        loadingVideoFromGallery:false,videomodal:false
                      });

                    } else {
                             ///////////// iOS part //////////////////////

                             if (Platform.OS == 'ios') {

                              const statResult = await stat(response.uri);
                              var sizeMB = this.newformatBytes(statResult.size)
        
                              if (imageExtra.videoOptions.allow_upload_video_compress == true) { }
                              else {
        
                                console.log('size mb type', sizeMB.type);
                                // console.log('size mb limit',+imageExtra.videoOptions.sb_upload_video_limit_mb);
        
                                if (sizeMB.type != 'bytes' && sizeMB.type != 'KB') {
                                  if (+sizeMB.value > +imageExtra.videoOptions.sb_upload_video_limit_mb) {
                                    Toast.show(imageExtra.videoOptions.sb_ad_post_video_size_label)
                                    this.setState({ videouri: '', loadingVideoFromGallery: false, videomodal: false, pauseVideo: true })
                                  }
                                  else {
                                    ProcessingManager.getVideoInfo(response.uri)
                                      .then(async (resp) => {
                                        console.log('resp', resp)
                                        if (resp.duration > +imageExtra.videoOptions.sb_upload_video_limit_duration) {
                                          Toast.show(imageExtra.videoOptions.sb_ad_post_video_duration_label)
                                          this.setState({ videomodal: false, loadingVideoFromGallery: false })
                                        }
                                        else {
                                          this.setState({ videouri: response.uri,pauseVideo: false, videomodal: true, loadingVideoFromGallery: false })
                                        }
                                      }).catch((err) => {
                                        console.log('eror', err)
        
                                      })
                                    // // let videoTools = new VideoTools(response.uri)
                                    // // let resp = videoTools.getDetails()
                                    // // resp.duration = parseInt(resp.duration / 1000)
        
                                    // // // ProcessingManager.getVideoInfo(response.uri)
                                    // // //   .then(async (resp) => {
                                    // // // console.log('resp', resp)
                                    // let resp
        
                                    // try {
                                    //   resp = await MediaMeta.get(response.uri);
                                    //   console.log(resp);
                                    // } catch (error) {
                                    //   console.log(error);
                                    // }
                                    // resp.duration= parseInt(resp.duration)/1000
                                    // if (resp.duration > +imageExtra.videoOptions.sb_upload_video_limit_duration && !imageExtra.videoOptions.allow_upload_video_trim) {
                                    //   Toast.show(imageExtra.videoOptions.sb_ad_post_video_duration_label)
                                    //   this.setState({ videomodal: false, loadingVideoFromGallery: false })
        
                                    // }
                                    // else {
                                    //   // if (imageExtra.videoOptions.allow_upload_video_trim) {
                                    //   // let trimpath = await ProcessingManager.trim(response.uri, options) // like VideoPlayer compress options
                                    //   // this.setState({ videouri: trimpath, videomodal: true, loadingVideoFromGallery: false })
        
                                    //   // } else {
                                    //   this.setState({ videouri: response.uri, videomodal: true, loadingVideoFromGallery: false })
        
                                    //   // }
        
                                    // }
                                    // // }).catch((err) => {
                                    // //   console.log('eror', err)
        
                                    // // })
        
        
                                  }
        
                                } else {
                                  // ProcessingManager.getVideoInfo(response.uri)
                                  // .then(async (resp) => {
                                  // console.log('resp', resp)
                                  // let videoTools = new VideoTools(response.uri)
                                  // let resp = videoTools.getDetails()
                                  // resp.duration = parseInt(resp.duration / 1000)
                                  ProcessingManager.getVideoInfo(response.uri)
                                    .then(async (resp) => {
                                      console.log('resp', resp)
                                      if (resp.duration > +imageExtra.videoOptions.sb_upload_video_limit_duration) {
                                        Toast.show(imageExtra.videoOptions.sb_ad_post_video_duration_label)
                                        this.setState({ videouri: '', videomodal: false, pauseVideo: true, loadingVideoFromGallery: false })
        
                                      }
                                      else {
                                        this.setState({ videouri: response.uri, pauseVideo: false,videomodal: true, loadingVideoFromGallery: false })
                                      }
                                    }).catch((err) => {
                                      console.log('eror', err)
        
                                    })
                                  // let resp
        
                                  // try {
                                  //   resp = await MediaMeta.get( response.uri);
                                  //   console.log(resp);
                                  // } catch (error) {
                                  //   console.log(error);
                                  // }
                                  // resp.duration= parseInt(resp.duration)/1000
                                  // if (resp.duration > +imageExtra.videoOptions.sb_upload_video_limit_duration && !imageExtra.videoOptions.allow_upload_video_trim) {
                                  //   Toast.show(imageExtra.videoOptions.sb_ad_post_video_duration_label)
                                  //   this.setState({ videouri: '', videomodal: false, pauseVideo: true, loadingVideoFromGallery: false })
        
                                  // }
                                  // else {
                                  //   // if (imageExtra.videoOptions.allow_upload_video_trim) {
                                  //   // let trimpath = await ProcessingManager.trim(response.uri, options) // like VideoPlayer compress options
                                  //   // this.setState({ videouri: trimpath, videomodal: true, loadingVideoFromGallery: false })
        
                                  //   // } else {
                                  //   this.setState({ videouri: response.uri, videomodal: true, loadingVideoFromGallery: false })
        
                                  //   // }
        
                                  // }
                                  // }).catch((err) => {
                                  //   console.log('eror', err)
        
                                  // })
                                }
                              }
        
                            }
                            ///////////// ------------ //////////
        
                            ///////////// Android part //////////////////////
                            else {
                              RNFetchBlob.fs.stat('file://' + response.path)
                                .then(async (stats) => {
                                  console.log('stas', stats)
                                  var formattype = stats.path.split('.')
        
                                  if (formattype[1] != "mp4") {
                                    Toast.show(imageExtra.videoOptions.sb_ad_post_video_format_msg)
                                    this.setState({ videouri: '', videomodal: false, pauseVideo: true, loadingVideoFromGallery: false })
        
                                  }
        
        
                                  else {
                                    var sizeMB = this.newformatBytes(stats.size)
                                    console.log("size before", sizeMB)
        
                                    if (imageExtra.videoOptions.allow_upload_video_compress) { }
                                    else {
        
        
                                      if (sizeMB.type != 'bytes' || sizeMB.type != 'KB') {
                                        if (+sizeMB.value > +imageExtra.videoOptions.sb_upload_video_limit_mb) {
                                          Toast.show(imageExtra.videoOptions.sb_ad_post_video_size_label)
                                          this.setState({ videouri: '', videomodal: false, pauseVideo: true, loadingVideoFromGallery: false })
        
                                          // this.setState({videouri:'',videomodal:false,loadingVideoFromGallery:false})
                                        }
                                        else {
                                          let resp
        
                                          try {
                                            resp = await MediaMeta.get(response.path);
                                            console.log(resp);
                                          } catch (error) {
                                            console.log(error);
                                          }
                                          resp.duration = parseInt(resp.duration) / 1000
        
                                          if (resp.duration > +imageExtra.videoOptions.sb_upload_video_limit_duration && !imageExtra.videoOptions.allow_upload_video_trim) {
                                            Toast.show(imageExtra.videoOptions.sb_ad_post_video_duration_label)
                                            this.setState({ videouri: '', videomodal: false, pauseVideo: true, loadingVideoFromGallery: false })
        
                                          }
                                          else {
                                            // if (imageExtra.videoOptions.allow_upload_video_trim) {
                                            // let trimpath = await ProcessingManager.trim('file://' + response.path, options) // like VideoPlayer compress options
                                            // this.setState({ videouri: trimpath, videomodal: true, loadingVideoFromGallery: false })
        
                                            // } else {
                                            this.setState({ videouri: 'file://' + response.path, videomodal: true, loadingVideoFromGallery: false })
        
                                            // }
        
                                          }
                                          // })
        
        
                                        }
        
                                      } else {
                                        let resp
        
                                        try {
                                          resp = await MediaMeta.get(response.path);
                                          console.log(resp);
                                        } catch (error) {
                                          console.log(error);
                                        }
        
        
                                        if (resp.duration > +imageExtra.videoOptions.sb_upload_video_limit_duration && !imageExtra.videoOptions.allow_upload_video_trim) {
                                          Toast.show(imageExtra.videoOptions.sb_ad_post_video_duration_label)
                                          this.setState({ videouri: '', videomodal: false, pauseVideo: true, loadingVideoFromGallery: false })
        
                                        }
                                        else {
        
                                          this.setState({ videouri: 'file://' + response.path, videomodal: true, loadingVideoFromGallery: false })
        
                                        }
                                      }
                                    }
        
                                  }
                                })
                                .catch((err) => {
                                  console.log('eror', err)
        
                                })
                            }
        
                            ///////////// ------------ //////////
        
        
                    }



         
                    // console.log('trim is', trimpath)
                   
                  });
                }

              }}
            />
            {/* ///////////////////////////////// */}
            <VideoRecorder
              recordOptions={{
                quality: imageExtra.videoOptions.allow_video_quality,
                maxDuration: +imageExtra.videoOptions.sb_upload_video_limit_duration
              }}
              ref={(ref) => { this.videoRecorder = ref; }}
              camtype={this.state.cameratype}

            />



            <Modal visible={this.state.videomodal}
              ref={ref => this.modalView = ref}
              onRequestClose={() => {
                this.setState({ videomodal: false, pauseVideo: false })
                // Toast.show('yo bro')
              }}
              style={{ height: '80%', width: '100%', }}

            >
              {
                this.state.loadingVideoFromGallery ?
                  <ActivityIndicator
                    animating={this.state.loadingVideoFromGallery}
                    color='#bc2b78'
                    size="large"
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 80
                    }}
                  /> :
                  <View style={{ height: '100%', width: '100%' }}>
                    {
                      Platform.OS == 'ios' ? [
                        <View style={[{ flexDirection: 'row', marginTop: wp(10), paddingHorizontal: wp(6), width: '100%', zIndex: 10 }]}>
                          <TouchableOpacity
                            onPress={() => {
                              this.setState({ videouri: '', videomodal: false, pauseVideo: false })
                            }}
                          >
                            <Image
                              source={require('../../../../res/images/close.png')}
                              style={{ height: wp(6), width: wp(6), tintColor: 'red' }}
                              resizeMode="contain"
                            />
                            {/* <Text>Cancel</Text> */}
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => this.uploadVideo()}
                            style={{ position: 'absolute', right: wp(6) }}
                          >
                            {/* <Text>Upload</Text> */}
                            <Image
                              source={require('../../../../res/images/file_upload.png')}
                              style={{ height: wp(7), width: wp(7), tintColor: 'green' }}
                              resizeMode="contain"
                            />
                          </TouchableOpacity>
                        </View>
                      ] : [
                          <View style={[{ flexDirection: 'row', marginTop: wp(3), paddingHorizontal: wp(6), width: '100%' }]}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({ videouri: '', videomodal: false, pauseVideo: true })
                              }}
                            >
                              <Image
                                source={require('../../../../res/images/close.png')}
                                style={{ height: wp(6), width: wp(6), tintColor: 'red' }}
                                resizeMode="contain"
                              />
                              {/* <Text>Cancel</Text> */}
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress={() => this.uploadVideo()}
                              style={{ position: 'absolute', right: wp(6) }}
                            >
                              {/* <Text>Upload</Text> */}
                              <Image
                                source={require('../../../../res/images/file_upload.png')}
                                style={{ height: wp(7), width: wp(7), tintColor: 'green' }}
                                resizeMode="contain"
                              />
                            </TouchableOpacity>
                          </View>

                        ]
                    }



                    {
                      this.state.videouri != '' ?

                        <Video source={{ uri: this.state.videouri }}   // Can be a URL or a local file.
                          ref={(ref) => {
                            this.player = ref
                          }}                                      // Store reference

                          style={{
                            position: 'absolute',
                            top: wp(10),
                            left: 0,
                            bottom: wp(10),
                            right: 0,
                          }}

                        /> : null}


                  </View>

              }

            </Modal>



            <Modal visible={this.state.fullscreenmodal}
              onRequestClose={() => { this.setState({ fullscreenmodal: false }) }}
              style={{ height: '80%', width: '100%', backgroundColor: '#000' }}

            >
             


              <View style={{ height: '100%', width: '100%' }}>
              {
                Platform.OS == 'ios' ? [
                  <View style={[{ flexDirection: 'row', marginTop: wp(10), paddingHorizontal: wp(6), width: '100%', zIndex: 10 }]}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({fullscreenuri: '', fullscreenmodal: false})
                      }}
                    >
                      <Image
                        source={require('../../../../res/images/close.png')}
                        style={{ height: wp(6), width: wp(6), tintColor: 'red' }}
                        resizeMode="contain"
                      />
                      {/* <Text>Cancel</Text> */}
                    </TouchableOpacity>


                  </View>
                ] : [
                    <View style={[{ flexDirection: 'row', marginTop: wp(3), paddingHorizontal: wp(6), width: '100%' }]}>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({ videouri: '', videomodal: false, pauseVideo: true })
                        }}
                      >
                        <Image
                          source={require('../../../../res/images/close.png')}
                          style={{ height: wp(6), width: wp(6), tintColor: 'red' }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>

                    </View>

                  ]
              }
 {/*
                <View style={{ flexDirection: 'row', marginTop: wp(3), paddingHorizontal: wp(6), width: '100%' }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ fullscreenuri: '', fullscreenmodal: false })
                    }}
                  >
                    <Image
                      source={require('../../../../res/images/close.png')}
                      style={{ height: wp(6), width: wp(6), tintColor: 'red' }}
                      resizeMode="contain"
                    />

                  </TouchableOpacity>


                </View> */}

              {
                this.state.fullscreenuri != '' ?

                  <Video source={{ uri: this.state.fullscreenuri }}   // Can be a URL or a local file.
                    ref={(ref) => {
                      this.playerFullscreen = ref
                    }}                                      // Store reference

                    style={{
                      position: 'absolute',
                      top: wp(10),
                      left: 0,
                      bottom: 0,
                      right: 0,
                    }}
                    controls


                  /> : null}


              </View>



            </Modal>


          <ModalBox
            ref={"modalbox"}
            style={{ height: wp(30), width: wp(60), alignItems: 'center', borderRadius: wp(2) }}
            position="center"
          >

            <Text style={{ marginTop: wp(2), fontSize: wp(4.5) }}>Choose camera</Text>
            <View style={{ flexDirection: 'row', marginTop: wp(5), width: '100%', justifyContent: 'space-evenly' }}>
              <TouchableOpacity

                onPress={() => this.setState({ cameratype: 'front' },
                  () => {
                    this.refs.modalbox.close()
                    this.start(this.state.startoption1, this.state.startoption2)
                  }
                )}
              >
                <Text>Front</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => this.setState({ cameratype: 'back' },
                  () => {
                    this.refs.modalbox.close()
                    this.start(this.state.startoption1, this.state.startoption2)
                  }
                )}

              >
                <Text>Back</Text>
              </TouchableOpacity>
            </View>

          </ModalBox>
          </ScrollView>


        </View>
      </DismissKeyboard >

    );



  }


  checkPageClear = () => {
    // console.log('checkPageclear', this.state)
    let { orderStore } = Store;
    let areStaticFieldsClear = true;
    if (this.state.categoryId.length === 0) {
      this.setState({ showCategoryError: true });
      this.categoryClear = false;
    }
    else {
      this.setState({ showCategoryError: false });
      this.categoryClear = true;
    }
    for (var i = 0; i < this.state.pageOne.length; i++) {
      if (this.state.pageOne[i].showError) {
        if (this.state.pageOne[i].fieldTypeName === "ad_cats1")
          continue;
        areStaticFieldsClear = false;


      }

    }
    if (orderStore.sell.extra.videoOptions.allow_video_on_ad) {
      if (this.categoryClear && this.isImagesClear && areStaticFieldsClear && this.isVideoClear) {
        orderStore.isFirstPageClear = true;
        this.setState({ pauseVideo: true })
        // this.player2.paused=true

      }
      else {
        orderStore.isFirstPageClear = false;
        Toast.show("Please Fill All The Required Fields");
      }
    } else {
      if (this.categoryClear && this.isImagesClear && areStaticFieldsClear) {
        orderStore.isFirstPageClear = true;
        this.setState({ pauseVideo: true })
        // this.player2.paused=true

      }
      else {
        orderStore.isFirstPageClear = false;
        Toast.show("Please Fill All The Required Fields");
      }
    }

  }
  createDataAgain = async () => {
    let pageOneClone = [...this.state.pageOne];
    let { orderStore } = Store;
    for (var i = 0; i < this.state.pageOne.length; i++) {

      const data = this.state.pageOne[i];
      switch (data.type) {

        case "checkbox":
          let values = [];
          let valuesClone = [...this.state.pageOne[i].values]
          for (var j = 0; j < valuesClone.length; j++) {
            if (valuesClone[j].is_checked)
              values.push(valuesClone[j].name);

          }
          if (values.length === 0 && this.state.pageOne[i].isRequired) {
            pageOneClone[i].showError = true;
            this.setState({ pageOne: pageOneClone });
          }

          else {
            pageOneClone[i].showError = false;
            this.setState({ pageOne: pageOneClone });
            let data = {};
            data[this.state.pageOne[i].fieldTypeName] = values;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
          }
          break;


        case "select":
          if (this.state.pageOne[i].data.field_type_name === "ad_cats1") {

            // this.manageDynamicFieldsObject();

          }
          if (this.state.pageOne[i].data.field_type_name === "ad_price_type") {
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
          else {
            if (this.state.pageOne[i].selectedId != undefined) {
              if (this.state.pageOne[i].selectedId.length != 0) {
                var dynamicKey = {};
                const data = this.state.pageOne[i];
                dynamicKey[data.fieldTypeName] = this.state.pageOne[i].selectedId;
                orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey)
                pageOneClone[i].showError = false;
                this.setState({ pageOne: pageOneClone });
              }
              else {
                if (this.state.pageOne[i].isRequired) {
                  pageOneClone[i].showError = true;
                  this.setState({ pageOne: pageOneClone });
                }
              }
            }
          }
          break;
        case "textfield":
          if (this.state.pageOne[i].value.length != 0) {
            var dynamicKey = {};
            dynamicKey[this.state.pageOne[i].fieldTypeName] = this.state.pageOne[i].value;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey);
            pageOneClone[i].showError = false;
            this.setState({ pageOne: pageOneClone });
          }
          else {
            if (this.state.pageOne[i].isRequired) {
              if (!this.state.showPriceOnly && pageOneClone[i].fieldTypeName === "ad_price")
                pageOneClone[i].showError = false;
              else
                pageOneClone[i].showError = true;
              this.setState({ pageOne: pageOneClone });
            }
          }

          break;
        // new code
        case "textarea":
          if (this.state.pageOne[i].value.length != 0) {
            var dynamicKey = {};
            dynamicKey[this.state.pageOne[i].fieldTypeName] = this.state.pageOne[i].value;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey);
            pageOneClone[i].showError = false;
            this.setState({ pageOne: pageOneClone });
          }
          else {
            if (this.state.pageOne[i].isRequired) {

              pageOneClone[i].showError = true;
              this.setState({ pageOne: pageOneClone });
            }
          }
          break;
        // new code
      }



    }
    if (this.state.images.length === 0) {
      this.setState({ showImageError: true });
      this.isImagesClear = false;

    }
    else if (this.state.images.length != 0) {
      this.setState({ showImageError: false });
      this.isImagesClear = true;
    }

    if (this.state.videouri == '' && orderStore.sell.extra.videoOptions.allow_video_on_ad == true) {
      this.setState({ showVideoError: true });
      this.isVideoClear = false;
      // console.log('vid clear false')
    }
    else if (this.state.videouri != '' && orderStore.sell.extra.videoOptions.allow_video_on_ad == true) {
      this.setState({ showVideoError: false });
      this.isVideoClear = true;
      // console.log('vid clear true')

    }

    // this.checkPageClear();
    // console.warn(JSON.stringify(orderStore.postAdObject));

  }

  createData = async () => {
    let pageOneClone = [...this.state.pageOne];
    let { orderStore } = Store;

    if (this.categoryClear) {
      // console.log('clear an').
      const data = { ad_cats1: this.state.categoryId }
      console.log('here data', data)
      // console.log('here store obj', orderStore.postAdObject)

      orderStore.postAdObject = Object.assign(orderStore.postAdObject, data)
      console.log('here store obj', orderStore.postAdObject)

    }

    for (var i = 0; i < this.state.pageOne.length; i++) {

      const data = this.state.pageOne[i];
      switch (data.type) {

        case "checkbox":
          let values = [];
          let valuesClone = [...this.state.pageOne[i].values]
          for (var j = 0; j < valuesClone.length; j++) {
            if (valuesClone[j].is_checked)
              values.push(valuesClone[j].name);

          }
          if (values.length === 0 && this.state.pageOne[i].isRequired) {
            pageOneClone[i].showError = true;
            this.setState({ pageOne: pageOneClone });
          }

          else {
            pageOneClone[i].showError = false;
            this.setState({ pageOne: pageOneClone });
            let data = {};
            data[this.state.pageOne[i].fieldTypeName] = values;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
          }
          break;


        case "select":
          if (this.state.pageOne[i].data.field_type_name === "ad_cats1") {

            // this.manageDynamicFieldsObject();

          }
          if (this.state.pageOne[i].data.field_type_name === "ad_price_type") {
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
          else {
            if (this.state.pageOne[i].selectedId != undefined) {
              if (this.state.pageOne[i].selectedId.length != 0) {
                var dynamicKey = {};
                const data = this.state.pageOne[i];
                dynamicKey[data.fieldTypeName] = this.state.pageOne[i].selectedId;
                orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey)
                pageOneClone[i].showError = false;
                console.log('here store obj', orderStore.postAdObject)

                this.setState({ pageOne: pageOneClone });
              }
              else {
                if (this.state.pageOne[i].isRequired) {
                  pageOneClone[i].showError = true;
                  this.setState({ pageOne: pageOneClone });
                }
              }
            }
          }
          break;
        case "textfield":
          if (this.state.pageOne[i].value.length != 0) {
            var dynamicKey = {};
            dynamicKey[this.state.pageOne[i].fieldTypeName] = this.state.pageOne[i].value;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey);
            pageOneClone[i].showError = false;
            this.setState({ pageOne: pageOneClone });
          }
          else {
            if (this.state.pageOne[i].isRequired) {
              if (!this.state.showPriceOnly && pageOneClone[i].fieldTypeName === "ad_price")
                pageOneClone[i].showError = false;
              else
                pageOneClone[i].showError = true;
              this.setState({ pageOne: pageOneClone });
            }
          }

          break;
        // new code
        case "textarea":
          if (this.state.pageOne[i].value.length != 0) {
            var dynamicKey = {};
            dynamicKey[this.state.pageOne[i].fieldTypeName] = this.state.pageOne[i].value;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey);
            pageOneClone[i].showError = false;
            this.setState({ pageOne: pageOneClone });
          }
          else {
            if (this.state.pageOne[i].isRequired) {

              pageOneClone[i].showError = true;
              this.setState({ pageOne: pageOneClone });
            }
          }
          break;
        // new code
      }



    }
    if (this.state.images.length === 0) {
      this.setState({ showImageError: true });
      this.isImagesClear = false;

    }
    else if (this.state.images.length != 0) {
      this.setState({ showImageError: false });
      this.isImagesClear = true;
    }

    if (this.state.videouri == '' && orderStore.sell.extra.videoOptions.allow_video_on_ad == true) {
      this.setState({ showVideoError: true });
      this.isVideoClear = false;
      // console.log('vid clear false')
    }
    else if (this.state.videouri != '' && orderStore.sell.extra.videoOptions.allow_video_on_ad == true) {
      this.setState({ showVideoError: false });
      this.isVideoClear = true;
      // console.log('vid clear true')

    }

    this.checkPageClear();
    // console.warn(JSON.stringify(orderStore.postAdObject));

  }






  componentDidUpdate = () => {
    // console.log('did update is here')

    let { orderStore } = Store;
    orderStore.setOnFirstPageChangeListener(false);

    // if(this.state.videomodal==false && this.state.loadingVideoFromGallery==false && this.state.isSizeGreater){
    // Toast.show(orderStore.sell.extra.videoOptions.sb_ad_post_video_size_label)
    // }
  }

}







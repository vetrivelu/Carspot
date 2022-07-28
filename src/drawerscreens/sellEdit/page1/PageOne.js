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
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Appearences from '../../../config/Appearences';
import styles from './Styles';
import Store from '../../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../../network/Api';
// import Spinner from 'react-native-loading-spinner-overlay';
import ModalDropdown from 'react-native-modal-dropdown';
import s from '../page3/Styles';
// import DatePicker from 'react-native-datepicker'
// import { observer } from 'mobx-react';
import Visibility from '../../../components/Visibility';
import ImageViewer from 'react-native-image-zoom-viewer';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';
import ConfirmDialogue from '../../../components/ConfirmDialogue';
import DraggableFlatList from 'react-native-draggable-flatlist'
import ActionSheet from 'react-native-actionsheet'


import VideoRecorder from 'react-native-beautiful-video-recorder';
import ImagePickerSingle from 'react-native-image-picker';
import Video from 'react-native-video';
import ModalBox from 'react-native-modalbox';


import { WebView } from 'react-native-webview';
import { widthPercentageToDP as wp } from '../../../helper/Responsive'
import RNFetchBlob from 'react-native-fetch-blob'


var imageId;

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export default class PageOne extends Component<Props> {
  isCategoryRequired = false;
  isTitleRequired = false;

  categoryClear = true;
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  showActionSheetVideo = () => {
    // console.log('xxxxx')

    this.ActionSheetVideo.show()
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





  componentDidMount = () => {
    let { orderStore } = Store;
    for (var i = 0; i < orderStore.innerResponse.pageOne.length; i++) {
      if (orderStore.innerResponse.pageOne[i].type == "select" && orderStore.innerResponse.pageOne[i].fieldTypeName == "ad_price_type") {
        if (orderStore.innerResponse.pageOne[i].values[0].id != undefined)
          this.setState({ priceTypeId: orderStore.innerResponse.pageOne[i].values[0].id, showPriceOnly: orderStore.innerResponse.pageOne[i].values[0].is_show });

      }

    }
    this.setState({ pageOne: orderStore.innerResponse.pageOne });

  }
  componentWillMount = async () => {
    let { orderStore } = Store;
    let response = orderStore.settings;
    console.log('im')
    var fullImages = [];
    for (var i = 0; i < response.data.ad_images.length; i++) {
      var model = {};
      model.thumb = response.data.ad_images[i].thumb;
      model.id = response.data.ad_images[i].img_id;
      var fullImage = { url: response.data.ad_images[i].thumb };
      fullImages.push(fullImage);
    }
    for (var i = 0; i < orderStore.innerResponse.pageOne.length; i++) {
      if (orderStore.innerResponse.pageOne[i].fieldTypeName === "ad_cats1") {
        if (orderStore.innerResponse.pageOne[i].values != undefined && orderStore.innerResponse.pageOne[i].values.length != 0)
          this.setState({ categoryId: orderStore.innerResponse.pageOne[i].values[0].id });
        if (orderStore.innerResponse.pageOne[i].values[0].has_sub) {

          this.setState({ categoryId: orderStore.innerResponse.pageOne[i].values[0].id, showSubCategories: false, showSubSubCategories: false, showSubSubSubCategories: false, });

          this.getSubCategories(orderStore.innerResponse.pageOne[i].values[0].id);
        }
        if (orderStore.innerResponse.pageOne[i].values[0].has_template) {
          orderStore.optionSelectedModel.hasTemp = true;
          orderStore.optionSelectedModel.categoryId = orderStore.innerResponse.pageOne[i].values[0].id;
          orderStore.setOnDynamicOptionSeleted(true);

        }
        else {
          orderStore.optionSelectedModel.hasTemp = false;
          orderStore.setOnDynamicOptionSeleted(false);

        }
      }
    }
    // if()
    this.setState({ images: response.data.ad_images, fullImages: fullImages });
    if (orderStore.settings.extra.uploaded_video != undefined && orderStore.settings.extra.uploaded_video != null) {
      this.setState({
        uploadedVideo: orderStore.settings.extra.uploaded_video.uploaded_video_url, videouri: 'xyz',
        uploadedVideoId: orderStore.settings.extra.uploaded_video.uploaded_video_id
      });

    }
  }


  start = (duration) => {
    // 30 seconds
    this.videoRecorder.open({ maxLength: duration }, (data) => {
      console.log('captured data', data);
      // this.refs.videomodal.open()
      this.setState({ videouri: data.uri, videomodal: true })
      // this.uploadVideo(data.uri)

    });
  }
  uploadVideo = async (video) => {
    // console.log('images are',images)



    this.setState({ uploadingVideo: true, videomodal: false });
    let { orderStore } = Store;
    const response = await Api.postVideo("post_ad/video", "videos", this.state.videouri, "ad_id", orderStore.settings.data.ad_id);
    console.log('response from video is', response)
    if (response.success === true) {
      Toast.show(response.message);
      // response.data.
      this.setState({ uploadedVideo: response.data.video.ad_video.vid_url_path, uploadedVideoId: response.data.video.ad_video.video_id })
    }
    this.setState({ uploadingVideo: false });
    if (response.message.length != 0)
      Toast.show(response.message);
  }
  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return 0;

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  }


  deleteVideo = async () => {
    this.setState({ uploadingVideo: true, showConfirmDialogueVideo: false });

    let { orderStore } = Store;
    const params = { ad_id: orderStore.settings.data.ad_id, video_id: this.state.uploadedVideoId };
    const response = await Api.post("post_ad/video/delete", params);
    if (response.success === true) {

      this.setState({ videouri: '', uploadedVideo: '' });
    }
    this.setState({ uploadingVideo: false });
    if (response.message.length != 0)
      Toast.show(response.message);
  }
  uploadMultipleImages = async (images) => {
    this.setState({ hideImageIndicator: false });
    let { orderStore } = Store;
    const response = await Api.postImageMulti("post_ad/image", "file", images, "ad_id", orderStore.settings.data.ad_id);
    if (response.success === true) {
      var images = [];
      var fullImages = [];
      for (var i = 0; i < response.data.ad_images.length; i++) {
        var model = {};
        model.thumb = response.data.ad_images[i].thumb;
        model.id = response.data.ad_images[i].img_id;
        images.push(model);
        fullImage = { url: response.data.ad_images[i].thumb };
        fullImages.push(fullImage);
      }

      this.setState({ images: response.data.ad_images, fullImages: fullImages, showImageError: false });
    }
    this.setState({ hideImageIndicator: true });
    if (response.message.length != 0)
      Toast.show(response.message);
  }





  renderItem = ({ item, index, move, moveEnd, isActive }) => {
    return (
      <DismissKeyboard>
        <TouchableOpacity style={styles.fileThumb}
          key={index}
          //onPress = {()=>{this.onImageClick(index)}}

          onLongPress={move}
          onPressOut={moveEnd}
        >
          <Image source={{ uri: item.thumb + '?date=' + (new Date()).getTime() }}
            style={styles.image} />
          <View style={styles.fileThumbAbsolute}>
            <TouchableOpacity
              onPress={() => {
                imageId = item.img_id;
                this.setState({ showConfirmDialogue: true })

              }
              }
              style={{ backgroundColor: 'white', width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={styles.fileThumbCrossImage}
                source={require('../../../../res/images/cross_red.png')}

              />


            </TouchableOpacity>
          </View>

        </TouchableOpacity>
      </DismissKeyboard>
    );
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


  constructor(props) {

    super(props);


    this.state = {
      showSpinner: false,
      showCategorySpinner: false,
      categoryId: "",
      showCategoryError: false,
      titleText: "",
      showTitleError: false,
      showImageError: false,
      images: [],
      showPriceOnly: true,

      isImageViewVisle: false,
      hideImageIndicator: true,
      fullImages: [],
      currentImage: 0,
      showConfirmDialogue: false,


      subCategories: [],
      subSubCategories: [],
      subSubSubCategories: [],


      showSubCategories: false,
      showSubSubCategories: false,
      showSubSubSubCategories: false,

      pageOne: [],





      selectedTag: 'body',
      selectedStyles: [],

      videouri: '',

      videomodal: false,
      uploadingVideo: false,
      uploadedVideo: '',

      showVideoError: false,

      fetchingNumberPlate: false,
      titleFilled: false,
      titletxt: '',

      uploadedVideoId: ''

    };
    this.editor = null;

  }



  getVehicleDetails = (name, number) => {
    const params = {
      registration_number: 'DC-109-AA',
      userName: 'tomberapic'
    };
    fetch('https://www.immatriculationapi.com/api/reg.asmx/CheckFrance?RegistrationNumber=' + number + '&username=tomberapic')
      .then(async (responsex) => {
        // console.log('response is',response._bodyText)
        var newstring = responsex._bodyText.split('<vehicleJson>')
        var newnewstring = newstring[1].split('</vehicleJson>')
        // console.log('new is',newstring)
        // console.log('new new  is',newnewstring)
        var result = newnewstring[0].substring(1, newnewstring[0].length - 1);
        // console.log('new result  is',result)

        var newjson = JSON.parse("{" + result + "}")
        console.log('new json  is', newjson)

        const params = {
          api_car_reg_year: newjson.RegistrationYear,
          api_car_make: newjson.CarMake.CurrentTextValue,
          api_car_model: newjson.CarModel.CurrentTextValue,
          api_car_engine_size: newjson.EngineSize.CurrentTextValue,
          api_car_body_style: newjson.BodyStyle.CurrentTextValue,
          api_car_fuel_type: newjson.FuelType.CurrentTextValue
        };

        const response = await Api.post("post_ad/apiSearchResult", params);
        if (response.success) {
          let { orderStore } = Store;
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
              let fieldsModel = { title: fields[i].title, isRequired: fields[i].is_required, fieldTypeName: fields[i].field_type_name, values: fields[i].values, showError: false, selectedValue: selectedValue, selectedId: selectedId, type: "select", data: fields[i] };
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
              let fieldsModel = { title: fields[i].title, isRequired: fields[i].is_required, fieldTypeName: fields[i].field_type_name, value: fields[i].field_val, showError: false, type: "textfield", showField: true };
              if (fields[i].has_page_number === "1")
                model.pageOne.push(fieldsModel);
              if (fields[i].has_page_number === "2") {
                // console.log("text field values", fields[i].field_val);
                model.pageTwo.push(fieldsModel);
              }
              if (fields[i].has_page_number === "3")
                model.pageThree.push(fieldsModel);
              if (fields[i].has_page_number === "4")
                model.pageFour.push(fieldsModel);

            }
            if (fields[i].field_type === "textarea") {
              let fieldsModel = { title: fields[i].title, isRequired: fields[i].is_required, fieldTypeName: fields[i].field_type_name, value: fields[i].field_val, showError: false, type: "textarea" };
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
              if (fields[i].values[0].id != undefined) {
                if (fields[i].values[0].id.length === 0) {
                  values.splice(0, 1);
                }
              }

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

          orderStore.innerResponse.pageOne[0].value = this.state.titletxt

          orderStore.settings = response;

          this.setState({ pageOne: orderStore.innerResponse.pageOne, fetchingNumberPlate: false })



          ////////////////////////////
          // for (var i = 0; i < orderStore.innerResponse.pageOne.length; i++) {
          //   if (orderStore.innerResponse.pageOne[i].fieldTypeName === "ad_cats1") {
          //     if (orderStore.innerResponse.pageOne[i].values != undefined && orderStore.innerResponse.pageOne[i].values.length != 0)
          //       this.setState({ categoryId: orderStore.innerResponse.pageOne[i].values[0].id });
          //     if (orderStore.innerResponse.pageOne[i].values[0].has_sub) {

          //       this.setState({ categoryId: orderStore.innerResponse.pageOne[i].values[0].id, showSubCategories: false, showSubSubCategories: false, showSubSubSubCategories: false, });

          //       this.getSubCategories(orderStore.innerResponse.pageOne[i].values[0].id);
          //     }
          //     if (orderStore.innerResponse.pageOne[i].values[0].has_template) {
          //       orderStore.optionSelectedModel.hasTemp = true;
          //       orderStore.optionSelectedModel.categoryId = orderStore.innerResponse.pageOne[i].values[0].id;
          //       orderStore.setOnDynamicOptionSeleted(true);

          //     }
          //     else {
          //       orderStore.optionSelectedModel.hasTemp = false;
          //       orderStore.setOnDynamicOptionSeleted(false);

          //     }
          //   }
          // }
          ////////////////////////////





          // this.createData()
          // orderStore.setPageOneReload(true)
          // this.createData()
          // console.log('now store is',JSON.stringify(orderStore.sell))
        }


      })
      .catch((error) => {
        this.setState({ fetchingNumberPlate: false })
      })
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
                  this.setState({ categoryId: idsArray[index] });

                if (item.values[index].has_sub) {

                  this.getSubCategories(idsArray[index]);
                }
                if (idsArray[index].length != 0)
                  this.setState({ showCategoryError: false });
                this.setState({ showSubCategories: false, showSubSubCategories: false, showSubSubSubCategories: false, });
                orderStore.optionSelectedModel.categoryId = idsArray[index];

                if (item.values[index].has_template) {
                  orderStore.optionSelectedModel.hasTemp = true;

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
              defaultValue={orderStore.settings.extra.select}
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
                }
                else
                  orderStore.optionSelectedModel.hasTemp = false;
                orderStore.optionSelectedModel.categoryId = ids[index];
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
  getSubSubSubCategoriesView = () => {
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
              defaultValue={orderStore.settings.extra.select}
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
    const params = { ad_id: orderStore.settings.data.ad_id, img_id: imageId };
    const response = await Api.post("post_ad/image/delete", params);
    if (response.success === true) {
      var fullImages = [];
      for (var i = 0; i < response.data.ad_images.length; i++) {
        var model = {};
        model.thumb = response.data.ad_images[i].thumb;
        model.id = response.data.ad_images[i].img_id;
        fullImage = { url: response.data.ad_images[i].thumb };
        fullImages.push(fullImage);
      }

      this.setState({ images: response.data.ad_images, fullImages: fullImages });
    }
    this.setState({ hideImageIndicator: true });
    if (response.message.length != 0)
      Toast.show(response.message);
  }




  getPageOne = (item, index) => {
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
                    keyboardType="numeric"
                    returnKeyType="done"
                    placeholderTextColor={Appearences.Registration.textColor}
                    onChangeText={(message) => {
                      let stateClone = [...this.state.pageOne];
                      stateClone[index].value = message;
                      if (message.length != 0 && item.isRequired) {
                        stateClone[index].showError = false;
                      }
                      this.setState({ pageOne: stateClone })
                    }}
                  ></TextInput>
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
                value={this.state.pageOne[index].value}
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                placeholderTextColor={Appearences.Registration.textColor}
                // onChangeText={(message) => {
                //   let stateClone = [...this.state.pageOne];
                //   if (message.length != 0 && item.isRequired) {
                //     stateClone[index].showError = false;
                //   }
                //   stateClone[index].value = message;
                //   this.setState({ pageOne: stateClone })
                // }}

                onChangeText={(message) => {
                  let stateClone = [...this.state.pageOne];
                  if (message.length != 0 && item.isRequired) {
                    stateClone[index].showError = false;
                  }
                  stateClone[index].value = message;

                  this.setState({ pageOne: stateClone, titletxt: message })
                }}
              // onSubmitEditing={(e) => {
              //   let stateClone = [...this.state.pageOne];
              //   // registration_number: 'DC-109-AA',

              //   if (stateClone[index].value.length == 9) {
              //     if (stateClone[index].value[2] == '-' && stateClone[index].value[6] == '-') {
              //       this.setState({ fetchingNumberPlate: true })
              //       this.getVehicleDetails('xyz', stateClone[index].value)
              //     }

              //   }
              // }}

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
                value={this.state.pageOne[index].value}
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
        if (item.data.field_type_name === "ad_price_type") {
          return this.getPriceTypeField(item.data);
        }
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
                      item.selectedValue = names[innerIndex];
                      item.selectedId = ids[innerIndex];
                      if (item.selectedId.length != 0) {
                        var clone = [...this.state.pageOne];
                        clone[index].showError = false;
                        this.setState({ pageOne: selecStateClone });
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
    // console.warn("Cat id :" + this.state.categoryId);
    let { orderStore } = Store;

    if (orderStore.onFirstPageChange) {
      this.createData();
    }
    if (this.props.onNextClick) {
      if (orderStore.isFirstPageClear)
        this.props.callBackFunc();
    }


    // if (this.state.showSpinner)
    //   return (
    //     <Spinner
    //       visible={this.state.showSpinner}
    //       textContent={''}
    //       animation='slide'
    //     />

    //   );


    let data = orderStore.settings.data;
    let fields = [...data.fields];
    let extra = data.extra;
    let imageExtra = orderStore.settings.extra;

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

                  // () => {
                  this.showActionSheet
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
                    renderItem={this.renderItem}
                    scrollPercent={5}
                    onMoveEnd={({ data }) => this.setState({ images: data })}
                    showsHorizontalScrollIndicator={false}

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

                  <TouchableOpacity
                    onPress={
                      this.showActionSheetVideo


                    }
                    disabled={this.state.uploadingVideo}
                    style={this.state.showVideoError ? styles.fileUploadContainerError : styles.fileUploadContainer}>
                    {/* <Visibility hide={!this.state.hideVideoIndicator}>
        {this.state.fullImages.length === 0 ? <Text style={styles.fileUploadText}>{}</Text> : null}
      </Visibility>
      <Visibility
        hide={this.state.hideVideoIndicator}
        style={styles.fileUploadLoaderAbsoluteContainer}
      >
        <Progress.Circle
          size={Appearences.Fonts.headingFontSize + 20}
          indeterminate={true}
          color={orderStore.color} />
      </Visibility> */}

                    <ActivityIndicator
                      animating={this.state.uploadingVideo}
                      color='#bc2b78'
                      size="large"
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 80
                      }}
                    />

                    <View style={styles.fileListAbsoluteContainer}>
                      {this.state.uploadedVideo != '' && !this.state.uploadingVideo ?
                        <WebView
                          useWebKit={true}
                          androidHardwareAccelerationDisabled={true}
                          source={{ uri: this.state.uploadedVideo }}
                          style={styles.videoContent}
                          javaScriptEnabled={true}
                        /> : null
                      }
                      {
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
                      }
                    </View>

                  </TouchableOpacity>
                  : null}

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
              title={'Select Photos'}
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
                // console.log('index',index)
              }}
            />

            <ActionSheet
              ref={o => this.ActionSheetVideo = o}
              title={'Select Media'}
              options={['Select Video from Camera', 'Select Video from Library', 'Cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={2}
              onPress={(index) => {

                if (index == 0) {
                  this.start(+imageExtra.videoOptions.sb_upload_video_limit_duration)
                }
                if (index == 1) {
                  ImagePickerSingle.launchImageLibrary({
                    title: 'Select Avatar',
                    mediaType: 'video',
                    durationLimit: +imageExtra.videoOptions.sb_upload_video_limit_duration,
                    allowsEditing: true
                  }, async (response) => {
                    console.log('Response = ', response);
                   
                    var options = {
                      startTime: 0,
                      endTime: +imageExtra.videoOptions.sb_upload_video_limit_duration,

                    }


                    RNFetchBlob.fs.stat('file://' + response.path)
                      .then((stats) => {
                        console.log('stas', stats)
                        var sizeMB = this.formatBytes(stats.size)
                        // if (+sizeMB > 2) {
                        if (+sizeMB > +imageExtra.videoOptions.sb_upload_video_limit_mb) {
                          Toast.show(imageExtra.videoOptions.sb_ad_post_video_size_label)
                        }
                        else {
                          // ProcessingManager.getVideoInfo('file://' + response.path)
                          //   .then(async (resp) => {
                          //     if (resp.duration > +imageExtra.videoOptions.sb_upload_video_limit_duration && !imageExtra.videoOptions.allow_upload_video_trim) {
                          //       Toast.show(imageExtra.videoOptions.sb_ad_post_video_duration_label)
                          //     }
                          //     else {
                          //       if (imageExtra.videoOptions.allow_upload_video_trim) { } 
                          //       else {
                          //         this.setState({ videouri: response.uri, videomodal: true })

                          //       }

                          //     }
                          //   })


                        }


                      })
                      .catch((err) => {


                      })



                    // let trimpath = await ProcessingManager.trim('file://' + response.path, options) // like VideoPlayer compress options
                    // this.setState({ videouri: trimpath })

                    // console.log('trim is', trimpath)
                    if (response.didCancel) {
                      console.log('User cancelled image picker');
                    } else if (response.error) {
                      console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                      console.log('User tapped custom button: ', response.customButton);
                    } else {
                      const source = { uri: response.uri };

                      // You can also display the image using data:
                      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                      this.setState({
                        avatarSource: source,
                      });
                    }
                  });
                }
                // console.log('index',index)
              }}
            />
            {/* ///////////////////////////////// */}
            <VideoRecorder

              ref={(ref) => { this.videoRecorder = ref; }}
            // recordOptions={{orientation:'landscapeLeft'}}
            // orientation="landscapeLeft"
            />
            <Modal visible={this.state.videomodal}
              onRequestClose={() => { this.setState({ videomodal: false }) }}
              style={{ height: '80%', width: '100%', }}

            >
              <View style={{ height: '100%', width: '100%' }}>
                <View style={{ flexDirection: 'row', marginTop: wp(3), paddingHorizontal: wp(6), width: '100%' }}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ videomodal: false })
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

            </Modal>

          </ScrollView>


        </View>
      </DismissKeyboard>
    );



  }


  checkPageClear = () => {
    // console.warn(this.state.categoryId);
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
        areStaticFieldsClear = false;
        if (this.state.pageOne[i].fieldTypeName === "ad_cats1")
          continue;
        areStaticFieldsClear = false;
      }

    }
    if (orderStore.settings.extra.videoOptions.allow_video_on_ad) {
      if (this.categoryClear && this.isImagesClear && areStaticFieldsClear && this.isVideoClear) {
        orderStore.isFirstPageClear = true;
      }
      else {
        orderStore.isFirstPageClear = false;
        Toast.show("Please Fill All The Required Fields");
      }
    } else {
      if (this.categoryClear && this.isImagesClear && areStaticFieldsClear) {
        orderStore.isFirstPageClear = true;
      }
      else {
        orderStore.isFirstPageClear = false;
        Toast.show("Please Fill All The Required Fields");
      }
    }


  }
  createData = async () => {
    let pageOneClone = [...this.state.pageOne];
    let { orderStore } = Store;

    if (this.categoryClear) {
      const data = { ad_cats1: this.state.categoryId }
      orderStore.postAdObject = Object.assign(orderStore.postAdObject, data)

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


          }
          else {
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

    if (this.state.videouri == '' && orderStore.settings.extra.videoOptions.allow_video_on_ad == true) {
      this.setState({ showVideoError: true });
      this.isVideoClear = false;
      // console.log('vid clear false')
    }
    else if (this.state.videouri != '' && orderStore.settings.extra.videoOptions.allow_video_on_ad == true) {
      this.setState({ showVideoError: false });
      this.isVideoClear = true;
      // console.log('vid clear true')

    }
    this.checkPageClear();
    // console.warn(JSON.stringify(orderStore.postAdObject));

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

  componentDidUpdate = () => {
    let { orderStore } = Store;
    orderStore.setOnFirstPageChangeListener(false);

  }

}







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

} from 'react-native';
import { CheckBox } from 'react-native-elements';
import Appearences from '../../../config/Appearences';
import Store from '../../../Stores';
import ModalDropdown from 'react-native-modal-dropdown';

import Toast from 'react-native-simple-toast';
import styles from './Styles'
import s from '../page3/Styles';
import Api from '../../../network/Api';
import Spinner from 'react-native-loading-spinner-overlay';
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
export default class PageThree extends Component<Props> {



  isCategoryRequired = false;

  categoryClear = true;



  constructor(porps) {
    super(porps);
    this.state = {
      checkboxDummyData: [],
      showPriceOnly: true,


      showCategorySpinner: false,

      subCategories: [],
      subSubCategories: [],
      subSubSubCategories: [],
      showSubCategories: false,
      showSubSubCategories: false,
      showSubSubSubCategories: false,



      showCategoryError: false,

      showFeaturesError: false,
      showDescriptionError: false,
      showImageError: false,
      showVideoLinkError: false,
      showTagError: false,
      categoryId: "",
      priceTypeId: "",
      showPriceTypeError: false,
      pageThree: [],

      selectedTag: 'body',
      selectedStyles: [],
    }
    this.editor = null;

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
          <Spinner
            visible={this.state.showCategorySpinner}
            textContent={''}
            animation='slide'
          />


          {/* Make */}
          <View style={styles.headingTextContainer}>
            <Text style={styles.subHeading}>{this.isCategoryRequired ? item.title + " * " : item.title}</Text>
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
                this.checkBoxTemp = [];
                this.setState({ showSubCategories: false, showSubSubCategories: false, showSubSubSubCategories: false, });

                if (item.values[index].has_template) {
                  orderStore.optionSelectedModel.hasTemp = true;
                  orderStore.optionSelectedModel.categoryId = idsArray[index];

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
                  orderStore.optionSelectedModel.categoryId = ids[index];
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
                  orderStore.optionSelectedModel.categoryId = ids[index];
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
                  orderStore.optionSelectedModel.categoryId = ids[index];

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







  getPageThree = (item, index) => {
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
                    blurOnSubmit={true}
                    placeholderTextColor={Appearences.Registration.textColor}
                    onChangeText={(message) => item.value = message}></TextInput>
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
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                placeholderTextColor={Appearences.Registration.textColor}
                onChangeText={(message) => item.value = message}
                value={item.value}

              >
              </TextInput>

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
                value={this.state.pageThree[index].value}
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                placeholderTextColor={Appearences.Registration.textColor}
                onChangeText={(message) => {
                  let stateClone = [...this.state.pageThree];
                  if (message.length != 0 && item.isRequired) {
                    stateClone[index].showError = false;
                  }
                  stateClone[index].value = message;
                  this.setState({ pageThree: stateClone })
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
                      if (ids[innerIndex].length != 0) {
                        var selecStateClone = [...this.state.selectModel];
                        selecStateClone[index].showError = false;
                        this.setState({ selectModel: selecStateClone });
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
                <Text style={styles.subHeading}>{item.isRequired ? data.title + " * " : data.title}</Text>
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
                      size={Appearences.Fonts.headingFontSize + 1}
                      textStyle={s.checkBoxText}
                      key={key}
                      onPress={() => {
                        let checkBoxClone = [...this.state.pageThree];
                        // console.warn(JSON.stringify(item.name));
                        checkBoxClone[index].values[key].is_checked = !item.is_checked;
                        checkBoxClone[index].showError = false;
                        //  console.warn(JSON.stringify(this.state.pageThree[index].values[key].name)); 
                        // checkBoxClone.values[key].isChecked = !item.isChecked;
                        this.setState({ pageThree: checkBoxClone });

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
  componentDidMount = () => {
    let { orderStore } = Store;
    for (var i = 0; i < orderStore.innerResponse.pageThree.length; i++) {
      if (orderStore.innerResponse.pageThree[i].type == "select" && orderStore.innerResponse.pageThree[i].fieldTypeName == "ad_price_type") {
        if (orderStore.innerResponse.pageThree[i].values[0].id != undefined)
          this.setState({ priceTypeId: orderStore.innerResponse.pageThree[i].values[0].id, showPriceOnly: orderStore.innerResponse.pageThree[i].values[0].is_show });

      }


    }
    this.setState({ pageThree: orderStore.innerResponse.pageThree });

  }















  componentDidUpdate = () => {
    let { orderStore } = Store;
    orderStore.setOnThirdPageChangeListener(false);

  }

  render() {

    let { orderStore } = Store;

    if (orderStore.onThirdPageChange) {
      this.createData();
    }
    if (this.props.onNextClick) {

    }
    let data = orderStore.settings.data;
    let fields = [...data.fields];
    let extra = orderStore.settings.extra;
    return (
      <DismissKeyboard>
        <View style={{
          height: '100%',
          backgroundColor: 'white',
        }}>

          <ScrollView
            keyboardShouldPersistTaps='always'
            contentContainerStyle={{
              backgroundColor: 'white',
              paddingBottom: 50,
            }}>
            <View style={styles.container}>


              {

                this.state.pageThree.map((item, key) => (
                  <View key={key}>
                    {this.getPageThree(item, key)}
                  </View>
                ))

              }
              {this.state.showSubCategories ? this.getSubCategoriesView() : null}
              {this.state.showSubSubCategories ? this.getSubSubCategoriesView() : null}
              {this.state.showSubSubSubCategories ? this.getSubSubSubCategoriesView() : null}



            </View>
          </ScrollView>


        </View>
      </DismissKeyboard>
    );

  }


  createData = async () => {
    let pageThreeClone = [...this.state.pageThree];

    let { orderStore } = Store;
    for (var i = 0; i < this.state.pageThree.length; i++) {
      switch (this.state.pageThree[i].type) {


        case "checkbox":

          let values = [];
          let valuesClone = [...this.state.pageThree[i].values]
          for (var j = 0; j < valuesClone.length; j++) {
            if (valuesClone[j].is_checked) {
              // console.log('is checked ',JSON.stringify(valuesClone[j]))
              values.push(valuesClone[j].name);

            }

          }
          if (values.length === 0 && this.state.pageThree[i].isRequired) {
            pageThreeClone[i].showError = true;
            this.setState({ pageThree: pageThreeClone });
          }

          else {
            pageThreeClone[i].showError = false;
            this.setState({ pageThree: pageThreeClone });
            let data = {};
            data[this.state.pageThree[i].fieldTypeName] = values;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, data);
          }



          break;




        case "textfield":
          if (this.state.pageThree[i].value.length != 0) {
            var dynamicKey = {};
            dynamicKey[this.state.pageThree[i].fieldTypeName] = this.state.pageThree[i].value;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey);
            pageThreeClone[i].showError = false;
            this.setState({ pageThree: pageThreeClone });
          }
          else {
            if (this.state.pageThree[i].isRequired) {
              if (!this.state.showPriceOnly && pageThreeClone[i].fieldTypeName === "ad_price")
                pageThreeClone[i].showError = false;
              else
                pageThreeClone[i].showError = true;
              this.setState({ pageThree: pageThreeClone });

            }
          }
          break;

        // new code
        case "textarea":
          if (this.state.pageThree[i].value.length != 0) {
            var dynamicKey = {};
            dynamicKey[this.state.pageThree[i].fieldTypeName] = this.state.pageThree[i].value;
            orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey);
            pageThreeClone[i].showError = false;
            this.setState({ pageThree: pageThreeClone });
          }
          else {
            if (this.state.pageThree[i].isRequired) {

              pageThreeClone[i].showError = true;
              this.setState({ pageThree: pageThreeClone });
            }
          }
          break;
        // new code  
        case "select":

          if (this.state.pageThree[i].data.field_type_name === "ad_cats1") {

            //this.manageDynamicFieldsObject();


          }
          if (this.state.pageThree[i].data.field_type_name === "ad_price_type") {
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
            if (this.state.pageThree[i].selectedId.length != 0) {
              var dynamicKey = {};
              const data = this.state.pageThree[i];
              dynamicKey[data.fieldTypeName] = this.state.pageThree[i].selectedId;
              orderStore.postAdObject = Object.assign(orderStore.postAdObject, dynamicKey);
              pageThreeClone[i].showError = false;
              this.setState({ pageThree: pageThreeClone });
            }
            else {
              if (this.state.pageThree[i].isRequired) {
                pageThreeClone[i].showError = true;
                this.setState({ pageThree: pageThreeClone });
              }
            }
          }
          break;
      }





    }
    this.checkPageClear();
    // console.warn(JSON.stringify(orderStore.postAdObject));

  }



  checkPageClear = () => {
    // console.warn("page Three"+this.state.categoryId);

    let { orderStore } = Store;
    let areStaticFieldsClear = true;

    for (var i = 0; i < this.state.pageThree.length; i++) {

      if (this.state.pageThree[i].showError) {
        areStaticFieldsClear = false;
      }

    }

    if (this.categoryClear && areStaticFieldsClear) {
      orderStore.isThirdPageClear = true;
      this.props.callBackFunc();

    }
    else {
      orderStore.isThirdPageClear = false;
      Toast.show("Please Fill All The Required Fields");
    }


  }






}








import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import Appearences from '../../config/Appearences';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './Styles';
import Modal from 'react-native-modalbox';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ModalDropdown from 'react-native-modal-dropdown';
import MyView from './MyView';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Store from '../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import Spinner from 'react-native-loading-spinner-overlay';
import Loader from '../../components/Loader';

import DatePicker from 'react-native-datepicker'
import { CheckBox } from 'react-native-elements';
import store from '../../Stores/orderStore';
import ModalBox from 'react-native-modalbox';
import { observer } from 'mobx-react';

@observer
export default class AdvancedSearch extends Component<Props> {
  conditionPreviousIndex = 0;
  transmissionPreviousIndex = 0;
  assemblyPreviousIndex = 0;
  adTypePreviousIndex = 0;
  insaurancePreviouIndex = 0;
  warrantyPreviousIndex = 0;

  conditionTitle = '';
  transmissionTitle = '';
  assemblyTitle = '';
  adTypeTitle = '';
  insauranceTitle = '';
  warrantyTitle = '';
  locationTitle = '';
  static navigationOptions = ({ navigation }) => ({
    headerTitle: store.screenTitles.advance_search,
    headerStyle: {
      backgroundColor: store.color,
    },
  });
  categoryIdsArray = [];

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
            defaultValue={orderStore.advanceSearch.extra.select}
            onSelect={(index, value) => {
              let { orderStore } = Store;
              if (ids[index].length != 0)
                this.setState({ categoryId: ids[index] });

              if (hasSubs[index]) {
                this.getSubSubCategories(ids[index]);
              }

              this.setState({ showSubSubCategories: false, showSubSubSubCategories: false });
              if (hasTemplate[index]) {
                this.getDynamicFields(ids[index]);
              }




            }}
            renderSeparator={() => { return (<View style={styles.dropdownSeperator} />); }}

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
                  style={{ position: 'absolute', zIndex: 10, alignSelf: 'center', right: '10%', bottom: '30%', }}
                /> : null
            }
            <Image
              style={styles.popupViewImage}
              source={require('../../../res/images/right_arrow.png')}
            />
          </View>
        </TouchableOpacity>




      </View>
    );
  }


  getSubCategories = async (id) => {

    this.setState({ showCategorySpinner: true, subCategories: [] });
    const params = { ad_cats1: id };

    const response = await Api.post("ad_post/subcats", params);
    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      this.setState({ subCategories: tempArray, showSubCategories: true, });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showCategorySpinner: false });

  }
  getSubSubCategories = async (id) => {
    this.setState({ showCategorySpinner: true, subSubCategories: [] });
    const params = { ad_cats1: id };
    const response = await Api.post("ad_post/subcats", params);
    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      this.setState({ subSubCategories: tempArray, showSubSubCategories: true, });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showCategorySpinner: false });

  }
  getSubSubSubCategories = async (id) => {
    this.setState({ showCategorySpinner: true, subSubSubCategories: [] });
    const params = { ad_cats1: id };
    const response = await Api.post("ad_post/subcats", params);
    var tempArray = [];
    if (response.success === true) {

      response.data.values.map((item, index) => {

        tempArray.push(item);

      });
      this.setState({ subSubSubCategories: tempArray, showSubSubSubCategories: true, });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showCategorySpinner: false });

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
            defaultValue={orderStore.advanceSearch.extra.select}
            onSelect={(index, value) => {
              let { orderStore } = Store;
              if (ids[index].length != 0)
                this.setState({ categoryId: ids[index] });

              if (hasSubs[index]) {
                this.getSubSubSubCategories(ids[index]);
              }

              this.setState({ showSubSubSubCategories: false });

              if (hasTemplate[index]) {
                this.getDynamicFields(ids[index]);
              }


            }}
            renderSeparator={() => { return (<View style={styles.dropdownSeperator} />); }}


            renderRow={(option, index, isSelected) => {
              return (<View style={styles.dorpDownRow}>
                <Text style={styles.dropDownTextStyle}>{option}</Text>
              </View>);
            }} />
          <View style={styles.dropdownArrowContainer}>
            <Image
              style={styles.popupViewImage}
              source={require('../../../res/images/right_arrow.png')}
            />
          </View>
        </TouchableOpacity>




      </View>
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
            defaultValue={orderStore.advanceSearch.extra.select}
            onSelect={(index, value) => {
              let { orderStore } = Store;
              if (ids[index].length != 0)
                this.setState({ categoryId: ids[index] });

              if (hasTemplate[index]) {
                this.getDynamicFields(ids[index]);

              }


            }}
            renderSeparator={() => { return (<View style={styles.dropdownSeperator} />); }}


            renderRow={(option, index, isSelected) => {
              return (<View style={styles.dorpDownRow}>
                <Text style={styles.dropDownTextStyle}>{option}</Text>
              </View>);
            }} />
          <View style={styles.dropdownArrowContainer}>
            <Image
              style={styles.popupViewImage}
              source={require('../../../res/images/right_arrow.png')}
            />
          </View>
        </TouchableOpacity>




      </View>
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

      <View>

        <View style={styles.headingTextContainer}>
          <Text style={styles.headingTextBlack}></Text>
        </View>
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
            defaultValue={orderStore.advanceSearch.extra.select}
            onSelect={(index, value) => {
              let { orderStore } = Store;
              if (ids[index].length != 0)
                this.setState({ categoryId: ids[index] });

              if (hasSubs[index]) {
                this.getSubSubSubCategories(ids[index]);
              }

              this.setState({ showSubSubSubCategories: false });

              if (hasTemplate[index]) {

              }



            }}
            renderSeparator={() => { return (<View style={styles.dropdownSeperator} />); }}


            renderRow={(option, index, isSelected) => {
              return (<View style={styles.dorpDownRow}>
                <Text style={styles.dropDownTextStyle}>{option}</Text>
              </View>);
            }} />
          <View style={styles.dropdownArrowContainer}>
            <Image
              style={styles.popupViewImage}
              source={require('../../../res/images/right_arrow.png')}
            />
          </View>
        </TouchableOpacity>




      </View>
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

      <View>


        <View style={styles.headingTextContainer}>
          <Text style={styles.headingTextBlack}></Text>
        </View>
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
            defaultValue={orderStore.advanceSearch.extra.select}
            onSelect={(index, value) => {
              let { orderStore } = Store;
              if (ids[index].length != 0)
                this.setState({ categoryId: ids[index] });

              if (hasTemplate[index]) {


              }


            }}
            renderSeparator={() => { return (<View style={styles.dropdownSeperator} />); }}


            renderRow={(option, index, isSelected) => {
              return (<View style={styles.dorpDownRow}>
                <Text style={styles.dropDownTextStyle}>{option}</Text>
              </View>);
            }} />
          <View style={styles.dropdownArrowContainer}>
            <Image
              style={styles.popupViewImage}
              source={require('../../../res/images/right_arrow.png')}
            />
          </View>
        </TouchableOpacity>




      </View>
    );
  }


  onPressSubmit = async () => {
    let { orderStore } = Store;
    let param = this.constructRequestObject();
    await orderStore.setIsCallAdvance(true);
    const { push } = this.props.navigation;
    push('SearchDetail', { params: param });
  }

  renderAdTitle = (item) => {

    return (
      <View>
        <View style={styles.headingTextContainer}>
          <Text style={styles.headingTextBlack}>{item.title}</Text>
        </View>
        <TextInput style={styles.TextInput}
          underlineColorAndroid='transparent'
          textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
          onChangeText={(text) => { this.setState({ searchByTitleText: text }); }}

          placeholderTextColor={Appearences.Colors.grey}
          placeholder={item.values}>
        </TextInput>
      </View>
    );
  }


  renderSubCategories = (title) => {
    let { orderStore } = Store;
    return (
      <View>

        {/* Model */}

        <MyView hide={this.state.hideMake}>
          <View style={styles.headingTextContainer}>
            <Text style={styles.headingTextBlack}>{title}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            this.modelDropdownRef.show();
          }}
            style={styles.row}
          >
            <ModalDropdown
              options={this.state.subCategoriesArray}
              ref={el => this.modelDropdownRef = el}
              style={styles.pickerContainer}
              dropdownStyle={styles.dorpDownStyle}
              dropdownTextHighlightStyle={styles.dropDownTextStyle}
              textStyle={styles.dorpdownContainerTextStyle}
              defaultValue={orderStore.advanceSearch.extra.select}
              onSelect={(index, value) => {
                if (this.categoryIdsArray[index].length != 0)
                  this.setState({ categoryId: this.categoryIdsArray[index] });



              }}
              renderSeparator={() => { return (<View style={styles.dropdownSeperator} />); }}


              renderRow={(option, index, isSelected) => {
                return (<View style={styles.dorpDownRow}>
                  <Text style={styles.dropDownTextStyle}>{option}</Text>
                </View>);
              }} />
            <View style={styles.dropdownArrowContainer}>
              <Image
                style={styles.popupViewImage}
                source={require('../../../res/images/right_arrow.png')}
              />
            </View>
          </TouchableOpacity>
        </MyView>




      </View>
    );
  }

  renderCategories = (item) => {
    var valuesArray = [];
    var idsArray = [];
    for (var i = 0; i < item.values.length; i++) {
      valuesArray.push(item.values[i].name);
      idsArray.push(item.values[i].id);

    }


    return (

      <View>
        {/* <Spinner
          visible={this.state.showCategorySpinner}
          textContent={''}
          animation='slide'
        /> */}


        {/* Categories */}
        <View style={styles.headingTextContainer}>
          <Text style={styles.headingTextBlack}>{item.title}</Text>
          {this.state.showCategoryError ? <Image source={require('../../../res/images/required.png')} style={styles.errorImage} /> : null}
        </View>
        <TouchableOpacity onPress={() => {
          this.makeDropdownRef.show();
        }}
          style={styles.row}
        >
          <ModalDropdown
            options={valuesArray}
            ref={el => this.makeDropdownRef = el}
            style={styles.pickerContainer}
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
              this.setState({ showSubCategories: false, showSubSubCategories: false, showSubSubSubCategories: false, });

              if (item.values[index].has_template) {
                this.getDynamicFields(idsArray[index]);

              }

            }}
            renderSeparator={() => { return (<View style={styles.dropdownSeperator} />); }}

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
                  style={{ position: 'absolute', zIndex: 10, alignSelf: 'center', right: '10%', bottom: '30%', }}
                /> : null
            }
            <Image
              style={styles.popupViewImage}
              source={require('../../../res/images/right_arrow.png')}
            />
          </View>
        </TouchableOpacity>


        {this.state.showSubCategories ? this.getSubCategoriesView() : null}
        {this.state.showSubSubCategories ? this.getSubSubCategoriesView() : null}
        {this.state.showSubSubSubCategories ? this.getSubSubSubCategoriesView() : null}
      </View>);
  }




  getDynamicFields = async (categoryId) => {
    let textFieldsTemp = [];
    let selectTemp = [];
    let checkboxTemp = [];
    let dateTemp = [];
    let webTemp = [];
    let rangeFieldTemp = [];
    let radioTemp = [];
    this.setState({ showCategorySpinner: true });
    const params = { cat_id: categoryId };
    // console.warn(params);

    const response = await Api.post("ad_post/dynamic_widget", params);

    if (response.success === true) {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].field_type === "checkbox") {
          let model = { title: "", isRequired: false, fieldTypeName: "", values: [], showError: false, selectedValues: [] }
          model.title = response.data[i].title;
          model.isRequired = response.data[i].is_required;
          model.fieldTypeName = response.data[i].field_type_name;
          for (var j = 0; j < response.data[i].values.length; j++) {

            var valueModel = { name: "", isChecked: false }
            valueModel.name = response.data[i].values[j].name;
            valueModel.isChecked = response.data[i].values[j].is_checked;
            model.values.push(valueModel);
          }
          checkboxTemp.push(model);

        }
        if (response.data[i].field_type === "textfield") {
          let model = { title: "", isRequired: false, fieldTypeName: "", value: "", showError: false };
          model.title = response.data[i].title;
          model.isRequired = response.data[i].is_required;
          model.fieldTypeName = response.data[i].field_type_name;
          textFieldsTemp.push(model);
        }
        if (response.data[i].field_type === "select") {
          let model = { title: "", isRequired: false, fieldTypeName: "", values: [], showError: false, selectedValue: "", selectedId: "" }
          model.title = response.data[i].title;
          model.isRequired = response.data[i].is_required;
          model.fieldTypeName = response.data[i].field_type_name;
          for (var j = 0; j < response.data[i].values.length; j++) {
            if (response.data[i].values[j].value === undefined) {
              var valueModel = { id: "", name: "" }
              valueModel.id = response.data[i].values[j].id;
              valueModel.name = response.data[i].values[j].name;
              if (response.data[i].field_type_name === "ad_price_type") {
                valueModel.isShow = response.data[i].values[j].is_show;
              }
              model.values.push(valueModel);
            }
            else {
              var valueModel = { id: "", name: "" }
              valueModel.id = response.data[i].values[j].value;
              valueModel.name = response.data[i].values[j].name;
              model.values.push(valueModel);
            }
          }
          selectTemp.push(model);
        }
        if (response.data[i].field_type === "date") {
          let model = { title: "", isRequired: false, fieldTypeName: "", value: "", showError: false };
          model.title = response.data[i].title;
          model.isRequired = response.data[i].is_required;
          model.fieldTypeName = response.data[i].field_type_name;

          dateTemp.push(model);

        }
        if (response.data[i].field_type === "link") {
          let model = { title: "", isRequired: false, fieldTypeName: "", value: "", showError: false };
          model.title = response.data[i].title;
          model.isRequired = response.data[i].is_required;
          model.fieldTypeName = response.data[i].field_type_name;
          webTemp.push(model);
        }
        if (response.data[i].field_type === "range_textfield") {
          let model = { title: "", fieldTypeName: "", values: [0, 0], minTitle: "", maxTitle: "" }
          model.title = response.data[i].title;
          model.fieldTypeName = response.data[i].field_type_name;
          model.minTitle = response.data[i].data[0].title;
          model.maxTitle = response.data[i].data[1].title;
          rangeFieldTemp.push(model);

        }
        if (response.data[i].field_type === "radio") {
          let model = { title: "", fieldTypeName: "", values: [], selectedValue: "", selectedId: "", isChecked: [] }
          model.title = response.data[i].title;
          model.fieldTypeName = response.data[i].field_type_name;
          model.values = response.data[i].values;
          model.isChecked.push(false);
          radioTemp.push(model);

        }
      }
      this.setState({
        showCategorySpinner: false, textFieldModel: textFieldsTemp,
        selectModel: selectTemp, checkboxModel: checkboxTemp,
        dateModel: dateTemp, webModel: webTemp,
        rengeTextfieldModel: rangeFieldTemp,
        radioFieldModel: radioTemp,

      });
    }


  }






  renderItems = (item) => {
    switch (item.field_type_name) {

      case "ad_title":
        return this.renderAdTitle(item);
      case "ad_cats1":
        return this.renderCategories(item);
      case "ad_country":
        return this.renderCountry(item);
      case "ad_price":
        return this.renderPrice(item);
      case "ad_millage":
        return this.renderAdMilage(item);
      case "ad_years":
        return this.renderYears(item);
      case "ad_transmissions":
        return this.renderTransmission("ad_transmissions");
      case "ad_engine_capacities":
        return this.renderAccordion(item, this.state.engineCapacitySelectedIndex, "ad_engine_capacities");
      case "ad_engine_types":
        return this.renderAccordion(item, this.state.engineTypeSelectedIndex, "ad_engine_types");
      case "ad_assembles":
        return this.renderAssembly('ad_assembles');
      case "ad_colors":
        return this.renderAccordion(item, this.state.colorSelectedIndex, "ad_colors");
      case "ad_type":
        return this.renderAdType("ad_type");
      case "ad_insurance":
        return this.renderInsaurance("ad_insurance");
      case "ad_condition":
        return this.renderCondition("ad_condition");
      case "ad_warranty":
        return this.renderWarranty("ad_warranty");
      case "ad_body_types":
        return this.renderAccordion(item, this.state.carBodyTypeSelectedIndex, "ad_body_types");


    }
  }



  renderCondition = (type) => {
    let { orderStore } = Store;
    return (
      <View style={{ marginTop: 15 }}>
        <Text style={styles.headingTextBlack}>{this.conditionTitle}</Text>
        <View style={[styles.featuresContainer, { marginStart: -15 }]}>
          {
            this.state.conditionContainer.map((obj, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={async () => {
                    let clone = [...this.state.conditionContainer];
                    clone[this.conditionPreviousIndex].isChecked = false;
                    clone[i].isChecked = !this.state.conditionContainer[i].isChecked;
                    await this.setState({ conditionContainer: clone });
                    this.conditionPreviousIndex = i;
                    this.onPressRadio(obj, i, type);
                  }}
                  // onPress = {()=>{this.onPressRadio(obj,i,type)}}
                  style={this.state.conditionContainer[i].isChecked ? [styles.itemContainerSelected, { backgroundColor: orderStore.color }] : styles.itemContainerUnSelected}

                >
                  <Text style={this.state.conditionContainer[i].isChecked ? [styles.itemTextSelected, { color: 'white' }] : styles.itemTextunSelected}>{obj.name.toUpperCase()}</Text>
                </TouchableOpacity>

              );
            })}
        </View>
      </View>

    );
  }

  renderWarranty = (type) => {
    let { orderStore } = Store;
    return (
      <View style={{ marginTop: 15 }}>
        <Text style={styles.headingTextBlack}>{this.warrantyTitle}</Text>
        <View style={[styles.featuresContainer, { marginStart: -10 }]}>
          {
            this.state.warrantyContainer.map((obj, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={async () => {
                    let clone = [...this.state.warrantyContainer];
                    clone[this.warrantyPreviousIndex].isChecked = false;
                    clone[i].isChecked = !this.state.warrantyContainer[i].isChecked;
                    await this.setState({ warrantyContainer: clone });
                    this.warrantyPreviousIndex = i;
                    this.onPressRadio(obj, i, type);
                  }}
                  // onPress = {()=>{this.onPressRadio(obj,i,type)}}
                  style={this.state.warrantyContainer[i].isChecked ? [styles.itemContainerSelected, { backgroundColor: orderStore.color }] : styles.itemContainerUnSelected}

                >
                  <Text style={this.state.warrantyContainer[i].isChecked ? [styles.itemTextSelected, { color: 'white' }] : styles.itemTextunSelected}>{obj.name.toUpperCase()}</Text>
                </TouchableOpacity>

              );
            })}
        </View>
      </View>

    );
  }
  renderTransmission = (type) => {
    let { orderStore } = Store;
    return (
      <View style={{ marginTop: 15 }}>
        <Text style={styles.headingTextBlack}>{this.transmissionTitle}</Text>
        <View style={[styles.featuresContainer, { marginStart: -10 }]}>
          {
            this.state.transmissionContainer.map((obj, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={async () => {
                    let clone = [...this.state.transmissionContainer];
                    clone[this.transmissionPreviousIndex].isChecked = false;
                    clone[i].isChecked = !this.state.transmissionContainer[i].isChecked;
                    await this.setState({ transmissionContainer: clone });
                    this.transmissionPreviousIndex = i;
                    this.onPressRadio(obj, i, type);
                  }}
                  // onPress = {()=>{this.onPressRadio(obj,i,type)}}
                  style={this.state.transmissionContainer[i].isChecked ? [styles.itemContainerSelected, { backgroundColor: orderStore.color }] : styles.itemContainerUnSelected}

                >
                  <Text style={this.state.transmissionContainer[i].isChecked ? [styles.itemTextSelected, { color: 'white' }] : styles.itemTextunSelected}>{obj.name.toUpperCase()}</Text>
                </TouchableOpacity>

              );
            })}
        </View>
      </View>

    );
  }

  renderAssembly = (type) => {
    let { orderStore } = Store;
    return (
      <View style={{ marginTop: 15 }}>
        <Text style={styles.headingTextBlack}>{this.assemblyTitle}</Text>
        <View style={[styles.featuresContainer, { marginStart: -10 }]}>
          {
            this.state.assemblyContainer.map((obj, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={async () => {
                    let clone = [...this.state.assemblyContainer];
                    clone[this.assemblyPreviousIndex].isChecked = false;
                    clone[i].isChecked = !this.state.assemblyContainer[i].isChecked;
                    await this.setState({ assemblyContainer: clone });
                    this.assemblyPreviousIndex = i;
                    this.onPressRadio(obj, i, type);
                  }}
                  // onPress = {()=>{this.onPressRadio(obj,i,type)}}
                  style={this.state.assemblyContainer[i].isChecked ? [styles.itemContainerSelected, { backgroundColor: orderStore.color }] : styles.itemContainerUnSelected}

                >
                  <Text style={this.state.assemblyContainer[i].isChecked ? [styles.itemTextSelected, { color: 'white' }] : styles.itemTextunSelected}>{obj.name.toUpperCase()}</Text>
                </TouchableOpacity>

              );
            })}
        </View>
      </View>

    );
  }


  renderInsaurance = (type) => {
    let { orderStore } = Store;
    return (
      <View style={{ marginTop: 15 }}>
        <Text style={styles.headingTextBlack}>{this.insauranceTitle}</Text>
        <View style={[styles.featuresContainer, { marginStart: -10 }]}>
          {
            this.state.insauranceContaier.map((obj, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={async () => {
                    let clone = [...this.state.insauranceContaier];
                    clone[this.insaurancePreviouIndex].isChecked = false;
                    clone[i].isChecked = !this.state.insauranceContaier[i].isChecked;
                    await this.setState({ insauranceContaier: clone });
                    this.insaurancePreviouIndex = i;
                    this.onPressRadio(obj, i, type);
                  }}
                  // onPress = {()=>{this.onPressRadio(obj,i,type)}}
                  style={this.state.insauranceContaier[i].isChecked ? [styles.itemContainerSelected, { backgroundColor: orderStore.color }] : styles.itemContainerUnSelected}

                >
                  <Text style={this.state.insauranceContaier[i].isChecked ? [styles.itemTextSelected, { color: 'white' }] : styles.itemTextunSelected}>{obj.name.toUpperCase()}</Text>
                </TouchableOpacity>

              );
            })}
        </View>
      </View>

    );
  }

  renderAdType = (type) => {
    let { orderStore } = Store;
    return (
      <View style={{ marginTop: 15 }}>
        <Text style={styles.headingTextBlack}>{this.adTypeTitle}</Text>
        <View style={[styles.featuresContainer, { marginStart: -10 }]}>
          {
            this.state.adTypeContainer.map((obj, i) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={async () => {
                    let clone = [...this.state.adTypeContainer];
                    clone[this.adTypePreviousIndex].isChecked = false;
                    clone[i].isChecked = !this.state.adTypeContainer[i].isChecked;
                    await this.setState({ adTypeContainer: clone });
                    this.adTypePreviousIndex = i;
                    this.onPressRadio(obj, i, type);
                  }}
                  // onPress = {()=>{this.onPressRadio(obj,i,type)}}
                  style={this.state.adTypeContainer[i].isChecked ? [styles.itemContainerSelected, { backgroundColor: orderStore.color }] : styles.itemContainerUnSelected}

                >
                  <Text style={this.state.adTypeContainer[i].isChecked ? [styles.itemTextSelected, { color: 'white' }] : styles.itemTextunSelected}>{obj.name.toUpperCase()}</Text>
                </TouchableOpacity>

              );
            })}
        </View>
      </View>

    );
  }

  renderAccordion = (item, state, key) => {
    const sectionObj = { title: item.title };
    const section = [sectionObj];
    return (<View style={styles.accordingContainer}>
      <Accordion
        sections={section}
        underlayColor={'transparend'}
        renderHeader={this._renderHeader}
        renderContent={() => this.renderAccordingDataRadioButton(item.values, state, key)}
      />
    </View>);
  }

  renderYears = (item) => {
    let { orderStore } = Store;

    var valuesArray = [];
    var idsArray = [];
  
    var valuesArraySecond = [];
    var idsArraySecond = [];

    for (var i = 0; i < item.values.length; i++) {
      valuesArray.push(item.values[i].name);
      idsArray.push(item.values[i].id);

      valuesArraySecond.push(item.values[i].name);
      idsArraySecond.push(item.values[i].id);

    }


    valuesArraySecond.reverse()
    idsArray.reverse()



    


    return (<View>

      <View style={styles.headingTextContainer}>
        <Text style={styles.headingTextBlack}>{item.title}</Text>
      </View>

      <View style={styles.yearParentContainer}>
        <View style={[styles.redBoxContainer, { backgroundColor: orderStore.color }]}>
          <Text style={styles.redBoxText}>{orderStore.advanceSearch.extra.from}</Text>
        </View>
        <TouchableOpacity
          style={styles.datePickerStyle}
          onPress={() => {
            this.fromYearDropdownRef.show();
          }}
        >


          <ModalDropdown
            options={valuesArray}
            ref={el => this.fromYearDropdownRef = el}
            style={styles.fromDateDropdownContainer}
            dropdownStyle={styles.dorpDownStyleDate}
            dropdownTextHighlightStyle={styles.dropDownTextStyle}
            textStyle={styles.dorpdownContainerTextStyle}
            defaultValue={valuesArray[0]}
            onSelect={(index, value) => {
              this.setState({ fromDate: idsArray[index] });
            }}
            renderSeparator={() => { return (<View style={styles.dropdownSeperator} />); }}


            renderRow={(option, index, isSelected) => {

              return (<View style={styles.dorpDownRow}>
                <Text style={styles.dropDownTextStyle}>{option}</Text>
              </View>);
            }} />





        </TouchableOpacity>

        <View style={{ width: '10%' }}></View>


        <View style={[styles.redBoxContainer, { backgroundColor: orderStore.color }]}>
          <Text style={styles.redBoxText}>{orderStore.advanceSearch.extra.to}</Text>
        </View>
        <TouchableOpacity
          style={styles.datePickerStyle}
          onPress={() => {
            this.toYearDropdownRef.show();
          }}
        >

          <ModalDropdown
            options={valuesArraySecond}
            ref={el => this.toYearDropdownRef = el}
            style={styles.fromDateDropdownContainer}
            dropdownStyle={[styles.dorpDownStyleDate, { marginEnd: 0, marginStart: 0, }]}
            dropdownTextHighlightStyle={styles.dropDownTextStyle}
            textStyle={styles.dorpdownContainerTextStyle}
            defaultValue={valuesArraySecond[0]}
            onSelect={(index, value) => {
              this.setState({ toDate: idsArraySecond[index] });
            }}
            renderSeparator={() => { return (<View style={styles.dropdownSeperator} />); }}


            renderRow={(option, index, isSelected) => {

              return (<View style={styles.dorpDownRow}>
                <Text style={styles.dropDownTextStyle}>{option}</Text>
              </View>);
            }} />


        </TouchableOpacity>





      </View>

    </View>
    );

  }
  renderAdMilage = (item) => {

    return (<View>

      {/* Milage */}
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingTextBlack}>{item.title}</Text>
      </View>
      <View style={styles.row}>
        <TextInput
          textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
          onChangeText={(text) => { this.setState({ fromMilageValue: text }); }}
          placeholder={item.data[0].title}
          placeholderTextColor={Appearences.Colors.grey}
          style={styles.PopupViewContainerSmall}>

        </TextInput>
        <View style={styles.milageSeperatorContainer}>
          <Text>-</Text>
        </View>
        <TextInput
          textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
          onChangeText={(text) => { this.setState({ toMilageValue: text }); }}
          style={styles.PopupViewContainerSmall}
          placeholder={item.data[1].title}
          placeholderTextColor={Appearences.Colors.grey}
        >


        </TextInput>


      </View>

    </View>);

  }
  renderPrice = (item) => {
    let { orderStore } = Store;
    var extra = orderStore.advanceSearch.extra;
    var { width } = Dimensions.get('window');

    return (
    <View>

      {/* Price */}
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingTextBlack}>{item.title}</Text>
      </View>
      
      <TouchableOpacity
        style={styles.PopupViewContainer}>
        <Text style={styles.popupViewText}>{item.data[0].title + " " + this.state.multiSliderValue[0] + " - " + item.data[1].title + " " + this.state.multiSliderValue[1]}</Text>
      </TouchableOpacity>

      <MultiSlider
        isMarkersSeparated={true}
        markerOffsetY={5}
        selectedStyle={{
          backgroundColor: orderStore.color,
        }}

        unselectedStyle={{
          backgroundColor: Appearences.Colors.lightGrey,
        }}

        containerStyle={{
          height: 40,
          marginStart: 10,
        }}

        trackStyle={{
          height: Appearences.Fonts.headingFontSize,
          backgroundColor: orderStore.color,
          borderRadius: 5,
        }}
        touchDimensions={{
          height: 40,
          width: 40,
          borderRadius: 20,
          slipDisplacement: 40,
        }}
        customMarkerLeft={(e) => {
          var currentValue = e.currentValue;
          return (
            <View style={[styles.circle, { borderColor: orderStore.color }]}>
              <Image source={require('../../../res/images/minus_red.png')} style={[styles.sliderImage, { tintColor: orderStore.color }]} />
            </View>
          );
        }}

        customMarkerRight={(e) => {
          var currentValue = e.currentValue;
          return (
            <View style={[styles.circle, { borderColor: orderStore.color }]}>
              <Image source={require('../../../res/images/plus_red.png')} style={[styles.sliderImage, { tintColor: orderStore.color }]} />
            </View>
          );
        }}
        sliderLength={width / 2}
        min={Number(extra.range_value[0])}
        max={Number(extra.range_value[1])}
        step={50}
        values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
        
        onValuesChange={this.multiSliderValuesChange}
        
      />


    </View>);
  }
  renderCountry = (item) => {
    this.locationTitle = item.title;



    return (<View>
      {/* <Spinner
        visible={this.state.showCountrySpinner}
        textContent={''}
        animation='slide'
      /> */}

      {/* Ads By Location */}
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingTextBlack}>{item.title}</Text>
      </View>




      <TouchableOpacity
        onPress={() => {
          this.setState({ locationsArray: item.values });

          this.refs.locationModal.open();

        }}
        style={styles.PopupViewContainer}>
        <Text style={styles.popupViewText}>{this.state.adsByValue}</Text>
        <Image
          style={styles.popupViewImage}
          source={require('../../../res/images/right_arrow.png')}
        />
      </TouchableOpacity>

    </View>);

  }

  componentWillMount = async () => {
    let { orderStore } = Store;
    const response = await Api.get("ad_post/search");

     this.state.custom_fields_key=response.extra.category_template_switch
   
    if (response.success === true) {
      orderStore.advanceSearch = response;
      this.setState({ adsByValue: response.extra.location })



      for (var i = 0; i < response.data.length; i++) {

        switch (response.data[i].field_type_name) {
          case "ad_transmissions":
            this.transmissionTitle = response.data[i].title;
            var dataClone = [];
            for (var j = 0; j < response.data[i].values.length; j++) {
              if (response.data[i].values[j].id.length === 0)
                continue;
              else {
                let model = response.data[i].values[j];
                model.isChecked = false;
                dataClone.push(model);
              }
            }
            this.setState({ transmissionContainer: dataClone });


            break;
          case "ad_assembles":
            this.assemblyTitle = response.data[i].title;

            var dataClone = [];
            for (var j = 0; j < response.data[i].values.length; j++) {
              if (response.data[i].values[j].id.length === 0)
                continue;
              else {
                let model = response.data[i].values[j];
                model.isChecked = false;
                dataClone.push(model);
              }
            }
            this.setState({ assemblyContainer: dataClone });


            break;

          case "ad_type":
            this.adTypeTitle = response.data[i].title;

            var dataClone = [];
            for (var j = 0; j < response.data[i].values.length; j++) {
              if (response.data[i].values[j].id.length === 0)
                continue;
              else {
                let model = response.data[i].values[j];
                model.isChecked = false;
                dataClone.push(model);
              }
            }
            this.setState({ adTypeContainer: dataClone });


            break;
          case "ad_insurance":
            this.insauranceTitle = response.data[i].title;

            var dataClone = [];
            for (var j = 0; j < response.data[i].values.length; j++) {
              if (response.data[i].values[j].id.length === 0)
                continue;
              else {
                let model = response.data[i].values[j];
                model.isChecked = false;
                dataClone.push(model);
              }
            }
            this.setState({ insauranceContaier: dataClone });

            break;
          case "ad_condition":
            this.conditionTitle = response.data[i].title;

            var dataClone = [];
            for (var j = 0; j < response.data[i].values.length; j++) {
              if (response.data[i].values[j].id.length === 0)
                continue;
              else {
                let model = response.data[i].values[j];
                model.isChecked = false;
                dataClone.push(model);
              }
            }
            this.setState({ conditionContainer: dataClone });

            break;
          case "ad_warranty":
            this.warrantyTitle = response.data[i].title;

            var dataClone = [];
            for (var j = 0; j < response.data[i].values.length; j++) {
              if (response.data[i].values[j].id.length === 0)
                continue;
              else {
                let model = response.data[i].values[j];
                model.isChecked = false;
                dataClone.push(model);
              }
            }
            this.setState({ warrantyContainer: dataClone });
            break;

        }




      }



    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false });


  }

  constructor(props) {
    super(props);
    this.state = {
      searchByTitleText: "",
      multiSliderValue: [0, 0],
      hideMake: true,
      showSpinner: true,
      categoryId: "",
      countryId: "",
      subCategoriesArray: [],
      locationsArray: [],
      fromMilageValue: "",
      toMilageValue: "",

      customFields:"",

      transmissionSelectedIndex: -1,
      transmissionSelectedValue: "",
      transmissionId: "",

      engineCapacitySelectedIndex: -1,
      engineCapacitySelectedValue: "",
      engineCapacityId: "",

      engineTypeSelectedIndex: -1,
      engineTypeSelectedValue: "",
      engineTypeId: "",

      engineAssemblySelectedIndex: -1,
      engineAssemblySelectedValue: "",
      engineAssemblyId: "",

      colorSelectedIndex: -1,
      colorSelectedValue: "",
      colorSelectedId: "",

      carTypeSelectedIndex: -1,
      carTypeSelectedValue: "",
      carTypeSelectedId: "",

      carBodyTypeSelectedIndex: -1,
      carBodyTypeSelectedValue: "",
      carBodyTypeSelectedId: "",

      carInsauranceSelectedIndex: -1,
      carInsauranceSelectedValue: "",
      carInsauranceSelectedId: "",

      carConditionSelectedIndex: -1,
      carConditionSelectedValue: "",
      carConditionSelectedId: "",

      carWarrantySelectedIndex: -1,
      carWarrantySelectedValue: "",
      carWarrantySelectedId: "",

      isAdsByModalDisabled: false,
      adsByValue: '',

      fromDate: '',
      toDate: '',

      showCountrySpinner: false,
      showCategorySpinner: false,



      subCategories: [],
      subSubCategories: [],
      subSubSubCategories: [],


      showSubCategories: false,
      showSubSubCategories: false,
      showSubSubSubCategories: false,

      textFieldModel: [],
      webModel: [],
      selectModel: [],
      checkboxModel: [],
      dateModel: [],
      rengeTextfieldModel: [],
      radioFieldModel: [],
      showCategorySpinner: false,

      refreshing: false,


      conditionContainer: [],
      warrantyContainer: [],
      adTypeContainer: [],
      transmissionContainer: [],
      assemblyContainer: [],
      insauranceContaier: [],

       custom_fields_key:"",

    };
  }








  getTextFields = (item, index) => {


    return (<View>
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingTextBlack}>{item.title}</Text>
        {this.state.textFieldModel[index].showError ? <Image source={require('../../../res/images/required.png')} style={styles.errorImage} /> : null}
      </View>
      <TextInput style={styles.TextInput}
        underlineColorAndroid='transparent'
        textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
        placeholderTextColor={Appearences.Colors.grey}
        onChangeText={(message) => item.value = message}
      >
      </TextInput>

    </View>);

  }

  getRangeField = (item, index) => {
    let { orderStore } = Store;
    var extra = orderStore.advanceSearch.extra;
    var { width } = Dimensions.get('window');
   
    return (<View>

      <View style={styles.headingTextContainer}>
        <Text style={styles.headingTextBlack}>{item.title}</Text>
      </View>
      
      <TouchableOpacity
        style={styles.PopupViewContainer}>
        <Text style={styles.popupViewText}>{item.minTitle + " " + item.values[0] + " - " + item.maxTitle + " " + item.values[1]}</Text>
      </TouchableOpacity>

      <MultiSlider
        isMarkersSeparated={true}
        markerOffsetY={5}
        selectedStyle={{
          backgroundColor: orderStore.color,
        }}

        unselectedStyle={{
          backgroundColor: Appearences.Colors.lightGrey,
        }}

        containerStyle={{
          height: 40,
          marginStart: 10,
          marginTop: 5,
        }}

        trackStyle={{
          height: Appearences.Fonts.headingFontSize,
          backgroundColor: orderStore.color,
          borderRadius: 5,
        }}
        touchDimensions={{
          height: 40,
          width: 40,
          borderRadius: 20,
          slipDisplacement: 40,
        }}
        customMarkerLeft={(e) => {
          var currentValue = e.currentValue;
          return (
            <View style={styles.circle}>
              <Image source={require('../../../res/images/minus_red.png')} style={styles.sliderImage} />
            </View>
          );
        }}

        customMarkerRight={(e) => {
          var currentValue = e.currentValue;
          return (
            <View style={styles.circle}>
              <Image source={require('../../../res/images/plus_red.png')} style={styles.sliderImage} />
            </View>
          );
        }}
        sliderLength={width / 2}
        //min={100}
         //max={500}
        
        min =  {Number(extra.range_value[0])}
        max =  {Number(extra.range_value[1])}

        step={50}
        values={[ Number(item.values[0]), Number(item.values[1])]}

        
        onValuesChange={(values) => {
          console.log("assasasa", values);
          let rangeFieldClone = [...this.state.rengeTextfieldModel];
          rangeFieldClone[index].values = [...values];
          this.setState({
            rengeTextfieldModel: rangeFieldClone,
          });
        }}

      />

    </View>);
  }

  getWebLinks = (item, index) => {

    return (<View>
      <View style={styles.headingTextContainer}>
        <Text style={styles.headingTextBlack}>{item.title}</Text>
        {this.state.webModel[index].showError ? <Image source={require('../../../res/images/required.png')} style={styles.errorImage} /> : null}
      </View>
      <TextInput style={styles.TextInput}
        underlineColorAndroid='transparent'
        textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
        placeholderTextColor={Appearences.Colors.grey}
        onChangeText={(message) => item.value = message}>

      </TextInput>

    </View>);

  }
  getRadio = (item, index) => {
    const sectionObj = { title: item.title };
    const section = [sectionObj];
    return (<View style={styles.accordingContainer}>
      <Accordion
        sections={section}
        underlayColor={'transparend'}
        renderHeader={this._renderHeader}
        renderContent={() => this.getRadioView(item, index)}
      />
    </View>);
  }
  getRadioView = (data, index) => {

    let { orderStore } = Store;
    var radioData = [];
    for (var i = 0; i < data.values.length; i++) {
      var obj = { label: data.values[i].name, value: data.values[i].id }
      radioData.push(obj);
    }
    return (
      <View style={styles.featuresContainer}>

        <RadioForm


          formHorizontal={false}
          animation={true}
        >
          {
            radioData.map((obj, i) => {
              return (
                <TouchableOpacity key={i}
                  activeOpacity={1}
                  onPress={() => {
                    var radioModelClone = [...this.state.radioFieldModel];
                    for (var j = 0; j < radioModelClone[index].isChecked.length; j++) {
                      radioModelClone[index].isChecked[j] = false;
                    }
                    radioModelClone[index].isChecked[i] = !radioModelClone[index].isChecked[i];
                    radioModelClone[index].selectedValue = obj.label;
                    radioModelClone[index].selectedId = obj.value;
                    this.setState({ radioFieldModel: radioModelClone });

                  }}
                >
                  <RadioButton
                    labelHorizontal={true}
                    style={{ marginTop: 5, }}

                  >

                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={() => {
                        var radioModelClone = [...this.state.radioFieldModel];
                        for (var j = 0; j < radioModelClone[index].isChecked.length; j++) {
                          radioModelClone[index].isChecked[j] = false;
                        }
                        radioModelClone[index].isChecked[i] = !radioModelClone[index].isChecked[i];
                        radioModelClone[index].selectedValue = obj.label;
                        radioModelClone[index].selectedId = obj.value;
                        this.setState({ radioFieldModel: radioModelClone });

                      }}
                      isSelected={data.isChecked[i]}

                      labelStyle={styles.AccordionradioLabelStyle}
                      labelWrapStyle={styles.AccordionlabelWrapStyle} />

                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      onPress={() => {
                        var radioModelClone = [...this.state.radioFieldModel];

                        for (var j = 0; j < radioModelClone[index].isChecked.length; j++) {
                          radioModelClone[index].isChecked[j] = false;
                        }

                        radioModelClone[index].isChecked[i] = !radioModelClone[index].isChecked[i];
                        radioModelClone[index].selectedValue = obj.label;
                        radioModelClone[index].selectedId = obj.value;
                        this.setState({ radioFieldModel: radioModelClone });

                      }}
                      isSelected={data.isChecked[i]}
                      borderWidth={1}
                      buttonInnerColor={orderStore.color}
                      buttonOuterColor={data === i ? orderStore.color : Appearences.Colors.grey}
                      buttonSize={3}
                      buttonStyle={styles.AccordionradioButtonStyle}
                      buttonWrapStyle={styles.AccordionbuttonWrapStyle} />


                  </RadioButton>
                  <View style={data.length - 1 == i ? styles.noStyle : styles.seperator} />
                </TouchableOpacity>
              );
            })}

        </RadioForm>


      </View>

    );
  }
  getSelectMenu = (data, index, reference) => {
    var names = [];
    var ids = [];

    data.values.map((item, index) => {
      names.push(item.name);
      ids.push(item.id);

    });

    let { orderStore } = Store;
    return (

      <View key={index}>

        <View style={styles.headingTextContainer}>
          <Text style={styles.headingTextBlack}>{data.title}</Text>
          {this.state.selectModel[index].showError ? <Image source={require('../../../res/images/required.png')} style={styles.errorImage} /> : null}
        </View>
        <TouchableOpacity onPress={() => {
          reference.show();
        }}
          style={styles.row}
        >
          <ModalDropdown
            options={names}
            ref={el => reference = el}
            dropdownStyle={{
              width: '92%',
              marginStart: -15,

              // height: ((names.length * 27) + 27)>'80%'?'80%': ((names.length * 27) + 27),
              // elevation: 1,
              // shadowOpacity: 0.1,
            }}
            dropdownTextHighlightStyle={styles.dropDownTextStyle}
            textStyle={styles.dorpdownContainerTextStyle}
            defaultValue={orderStore.advanceSearch.extra.select}
            onSelect={(innerIndex, value) => {
              var selecStateClone = [...this.state.selectModel];
              selecStateClone[index].selectedValue = names[innerIndex];
              selecStateClone[index].selectedId = ids[innerIndex];



              this.setState({ selectModel: selecStateClone });


            }}
            renderSeparator={() => { return (<View style={styles.dropdownSeperator} />); }}


            renderRow={(option, index, isSelected) => {
              return (<View style={styles.dorpDownRow}>
                <Text style={styles.dropDownTextStyle}>{option}</Text>
              </View>);
            }} />
          <View style={styles.dropdownArrowContainer}>
            <Image
              style={styles.popupViewImage}
              source={require('../../../res/images/right_arrow.png')}
            />
          </View>
        </TouchableOpacity>




      </View>
    );
  }


  getCheckBox = (data, index) => {
    let { orderStore } = Store;
    return (<View key={index}>

      <View style={styles.headingTextContainer}>
        <Text style={styles.headingTextBlack}>{data.title}</Text>
        {this.state.checkboxModel[index].showError ? <Image source={require('../../../res/images/required.png')} style={styles.errorImage} /> : null}
      </View>
      <View style={s.featuresContainer}>
        {
          this.state.checkboxModel[index].values.map((item, key) => (

            <CheckBox
              checkedColor={orderStore.color}
              uncheckedColor={Appearences.Colors.black}
              title={item.name}
              key={key}
              checked={this.state.checkboxModel[index].values[key].isChecked
                //false

                //false
              }
              containerStyle={s.checkBox}
              size={Appearences.Fonts.paragraphFontSize}
              textStyle={s.checkBoxText}
              key={key}
              onPress={() => {
                let checkBoxClone = [...this.state.checkboxModel];
                checkBoxClone[index].values[key].isChecked = !item.isChecked;
                this.setState({ checkboxModel: checkBoxClone });
                //    this.checkBoxTemp[index].values[key].is_checked = !item.is_checked;
                //this.setState({checkboxStates:this.checkBoxTemp});  
              }}>
            </CheckBox>

          )
          )}
      </View>

    </View>);

  }

  getDates = (item, index) => {
    var datesClone = [...this.state.dateModel];
    return (

      <View>

        <View style={styles.headingTextContainer}>
          <Text style={styles.headingTextBlack}>{item.title}</Text>
          {this.state.dateModel[index].showError ? <Image source={require('../../../res/images/required.png')} style={styles.errorImage} /> : null}
        </View>
        <DatePicker
          style={styles.TextInputDate}
          date={this.state.dateModel[index].value}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{ dateInput: { borderWidth: 0 } }}
          onDateChange={(date) => {

            datesClone[index].value = date;
            this.setState({ dateModel: datesClone });
          }}
        />

      </View>);


  }







  constructRequestObject = () => {
    let param = {};
    let catTempData = {};



    if (this.state.searchByTitleText.length != 0) {
      param.ad_title = this.state.searchByTitleText;
    }

    if (this.state.categoryId.length != 0) {
      param.ad_cats1 = this.state.categoryId;
    }

    if (this.state.transmissionId.length != 0) {
      param.transmission = this.state.transmissionSelectedValue;
      // param.transmission = this.state.transmissionId;

    }

    if (this.state.fromDate.length != 0) {
      param.year_from = this.state.fromDate;
    }

    if (this.state.toDate.length != 0) {
      param.year_to = this.state.toDate;
    }

    if (this.state.carBodyTypeSelectedId.length != 0) {

      param.body_type = this.state.carBodyTypeSelectedValue;
      // param.body_type = this.state.carBodyTypeSelectedId;


    }
  
    if (this.state.engineTypeId.length != 0) {

      param.engine_type = this.state.engineTypeSelectedValue;

    }

    if (this.state.engineCapacityId.length != 0) {

      param.engine_capacity = this.state.engineCapacitySelectedValue;

    }

    if (this.state.engineAssemblyId.length != 0) {

      param.assembly = this.state.engineAssemblySelectedValue;
      // param.engineAssemblyId = this.state.engineAssemblyId;

    }

    if (this.state.colorSelectedId.length != 0) {

      param.color_family = this.state.colorSelectedValue;

    }

    if (this.state.carInsauranceSelectedId.length != 0) {

      param.insurance = this.state.carInsauranceSelectedValue;
      catTempData.insurance = this.state.carInsauranceSelectedValue;
    }

    if (this.state.fromMilageValue.length != 0) {

      param.mileage_from = this.state.fromMilageValue;

    }

    if (this.state.toMilageValue.length != 0) {

      param.mileage_to = this.state.toMilageValue;

    }
   
    if (this.state.multiSliderValue[0] != 0) {
      
      param.min_price = this.state.multiSliderValue[0];
    }
    
    if (this.state.multiSliderValue[1] != 0) {
      
      param.max_price = this.state.multiSliderValue[1];
      


    }
  
 

    if (this.state.countryId.length != 0) {
      param.ad_country = this.state.countryId;

    }
    if (this.state.carConditionSelectedId.length != 0) {
      param.ad_condition = this.state.carConditionSelectedValue;
    }
    if (this.state.carTypeSelectedId.length != 0) {
      param.ad_type = this.state.carTypeSelectedValue;
    }
    if (this.state.carWarrantySelectedId.length != 0) {
      param.ad_warranty = this.state.carWarrantySelectedValue;
    }

    if (this.state.textFieldModel.length != 0) {
      for (var i = 0; i < this.state.textFieldModel.length; i++) {
        if (this.state.textFieldModel[i].fieldTypeName.length != 0 && this.state.textFieldModel[i].value.length != 0) {

          let data = {};
          data[this.state.textFieldModel[i].fieldTypeName] = this.state.textFieldModel[i].value;
          param = Object.assign(param, data);
        }

      }
    }
    if (this.state.checkboxModel.length != 0) {
      let data = {};
      for (var i = 0; i < this.state.checkboxModel.length; i++) {
        let selectedValues = [];
        for (var j = 0; j < this.state.checkboxModel[i].values.length; j++) {
          if (this.state.checkboxModel[i].values[j].isChecked)
            selectedValues.push(this.state.checkboxModel[i].values[j].name);
        }

        if (selectedValues.length === 0)
          continue;
        data[this.state.checkboxModel[i].fieldTypeName] = selectedValues;
        param = Object.assign(param, data);

      }


    }
    if (this.state.dateModel.length != 0) {

      for (var i = 0; i < this.state.dateModel.length; i++) {
        let data = {};
        if (this.state.dateModel[i].value.length === 0)
          continue;
        data[this.state.dateModel[i].fieldTypeName] = this.state.dateModel[i].value;
        param = Object.assign(param, data);
      }
    }

    if (this.state.webModel.length != 0) {
      for (var i = 0; i < this.state.webModel.length; i++) {
        if (this.state.webModel[i].value.length === 0)
          continue;
        let data = {};
        data[this.state.webModel[i].fieldTypeName] = this.state.webModel[i].value;
        param = Object.assign(param, data);
      }
    }
    if (this.state.selectModel.length != 0) {

      for (var i = 0; i < this.state.selectModel.length; i++) {
        if (this.state.selectModel[i].selectedId.length === 0)
          continue;
        let data = {};

        data[this.state.selectModel[i].fieldTypeName] = this.state.selectModel[i].selectedId;
        param = Object.assign(param, data);
        // catTempData = Object.assign(param,data)
      }
    }
    
    if (this.state.rengeTextfieldModel.length != 0) {
      

      let data = {};
      for (var i = 0; i < this.state.rengeTextfieldModel.length; i++) {
        
        value = this.state.rengeTextfieldModel[i].values[0] + "-" + this.state.rengeTextfieldModel[i].values[1];

        if (this.state.rengeTextfieldModel[i].values[1] != "0")
          data[this.state.rengeTextfieldModel[i].fieldTypeName] = value;

        param = Object.assign(param, data);
        console.log("new value" ,param)
      }
      //  console.warn(this.state.rengeTextfieldModel);
    }
    if (this.state.radioFieldModel.length != 0) {
      for (var i = 0; i < this.state.radioFieldModel.length; i++) {
        if (this.state.radioFieldModel[i].selectedId.length === 0)
          continue;

        let data = {};

        data[this.state.radioFieldModel[i].fieldTypeName] = this.state.radioFieldModel[i].selectedId;
        param = Object.assign(param, data);
      }
    }
 

   if( this.state.custom_fields_key === 1)
   {

   return {"custom_fields":param,};
  
}

else{

  return param;

}


  }

 



  _renderHeader(section, index, isActive, sections) {
    let { orderStore } = Store;

    return (
      <View>

        <Animatable.View
          duration={300}
          transition="backgroundColor"
          style={{
            backgroundColor: (isActive ? orderStore.color : Appearences.Colors.lightGrey),
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            paddingStart: 15,
            paddingEnd: 15,
            borderRadius: 5,
            marginTop: 5,
          }}>
          <View style={styles.headerContentContainer}>
            <Text style={isActive ? styles.headerTextSwitched : styles.headerText}>{section.title}</Text>
            <View style={styles.rotationViewContainer}>
              <Image style={isActive ? styles.rotatingView : styles.NonrotatingView}
                source={isActive ? require('../../../res/images/up_arrow_white.png') : require('../../../res/images/up_arrow.png')}

              />


            </View>
          </View>
        </Animatable.View>
      </View>
    );
  }




  onAdsByModalClose = () => {
    this.setState({ locationsArray: [] });

  }
  onAdsByModalOpen() { }
  onAdsByModalClosingState(state) { }


  _onRefresh = async () => {
    await this.setState({ refreshing: true });

    setTimeout(async () => {
      this.setState({ showSpinner: true });

      let { orderStore } = Store;
      const response = await Api.get("ad_post/search");

      if (response.success === true) {
        orderStore.advanceSearch = response;

        this.setState({
          adsByValue: response.extra.location
          , textFieldModel: [], selectModel: [], checkboxModel: [],
          dateModel: [], rengeTextfieldModel: [], radioFieldModel: [],
          subCategories: [], subSubCategories: [], subSubSubCategories: [],
          showSubCategories: false, showSubSubCategories: false, showSubSubSubCategories: false,

        });
      }
      if (response.message.length != 0)
        Toast.show(response.message);
      this.setState({ showSpinner: false });
      this.setState({ showSpinner: false, refreshing: false });

    }, 1000);

  }




  onSelectCountry = async (data) => {
    this.setState({ adsByValue: data.name, countryId: data.id });
    if (data.has_sub) {
      this.setState({ showCountrySpinner: true });
      let params = {};
      params = { ad_country: data.id };
      const response = await Api.post("ad_post/sublocations", params);
      if (response.success === true) {
        this.setState({ locationsArray: response.data.values, showCountrySpinner: false })
      }
      if (response.message.length != 0)
        Toast.show(response.message);



    }



  }



  onPressRadio = (data, index, type) => {

    switch (type) {
      case "ad_transmissions":
        this.setState({ transmissionSelectedIndex: index, transmissionSelectedValue: data.name, transmissionId: data.id })
        break;
      case "ad_engine_capacities":
        this.setState({ engineCapacitySelectedIndex: index, engineCapacitySelectedValue: data.label, engineCapacityId: data.value })
        break;
      case "ad_engine_types":
        this.setState({ engineTypeSelectedIndex: index, engineTypeSelectedValue: data.label, engineTypeId: data.value })
        break;
      case "ad_assembles":
        this.setState({ engineAssemblySelectedIndex: index, engineAssemblySelectedValue: data.name, engineAssemblyId: data.id })
        break;
      case "ad_colors":
        this.setState({ colorSelectedIndex: index, colorSelectedValue: data.label, colorSelectedId: data.value })
        break;
      case "ad_type":
        this.setState({ carTypeSelectedIndex: index, carTypeSelectedValue: data.name, carTypeSelectedId: data.id })
        break;
      case "ad_insurance":
        this.setState({ carInsauranceSelectedIndex: index, carInsauranceSelectedValue: data.name, carInsauranceSelectedId: data.id })
        break;
      case "ad_condition":
        this.setState({ carConditionSelectedIndex: index, carConditionSelectedValue: data.name, carConditionSelectedId: data.id })
        break;
      case "ad_warranty":
        this.setState({ carWarrantySelectedIndex: index, carWarrantySelectedValue: data.name, carWarrantySelectedId: data.id })
        break;
      case "ad_body_types":
        this.setState({ carBodyTypeSelectedIndex: index, carBodyTypeSelectedValue: data.label, carBodyTypeSelectedId: data.value })

    }



    //  this.setState({state:index});
  }

  

  renderAccordingDataRadioButton = (data, state, type) => {
    let { orderStore } = Store;
    var radioData = [];
    for (var i = 0; i < data.length; i++) {
      var obj = { label: data[i].name, value: data[i].id }
      radioData.push(obj);
    }
    return (
      <View style={styles.featuresContainer}>

        <RadioForm


          formHorizontal={false}
          animation={true}
        >
          {
            radioData.map((obj, i) => {
              return (
                <TouchableOpacity key={i}
                  activeOpacity={1}
                  onPress={() => { this.onPressRadio(obj, i, type) }}
                >
                  <RadioButton
                    labelHorizontal={true}
                    style={{
                      marginTop: 5,
                      paddingTop: 5,
                      paddingBottom: 5,

                    }}

                  >

                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={() => this.onPressRadio(obj, i, type)}
                      isSelected={state === i}

                      labelStyle={styles.AccordionradioLabelStyle}
                      labelWrapStyle={styles.AccordionlabelWrapStyle} />

                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      onPress={() => this.onPressRadio(obj, i, type)}
                      isSelected={state === i}
                      borderWidth={1}
                      buttonInnerColor={orderStore.color}
                      buttonOuterColor={state === i ? orderStore.color : Appearences.Colors.grey}
                      buttonSize={7}
                      buttonStyle={styles.AccordionradioButtonStyle}
                      buttonWrapStyle={styles.AccordionbuttonWrapStyle} />


                  </RadioButton>
                  <View style={data.length - 1 == i ? styles.noStyle : styles.seperator} />
                </TouchableOpacity>
              );
            })}

        </RadioForm>


      </View>

    );
  }



  multiSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });
    console.log("asdhjfjaklsdfhasdf" ,this.state.multiSliderValue)
  }
  
  render() {


    if (this.state.showSpinner)
      return (
        <Loader />

      );


    let { orderStore } = Store;
    let data = [...orderStore.advanceSearch.data];

    let extra = orderStore.advanceSearch.extra;

    return (

      <View style={{
        height: '100%',
        backgroundColor: 'white',
      }}>


        <ModalBox
          style={styles.modalBoxStyle}
          position={"bottom"}
          ref={"locationModal"}>
          <View style={styles.modalContentContainer}>
            <Text style={[styles.subHeadingText, { marginStart: 15, marginTop: 15 }]}>{this.locationTitle}</Text>
            <View style={styles.row}>
              <Image source={require('../../../res/images/double_arrow_black.png')} style={[styles.sliderImage, { marginBottom: 2.5, marginStart: 10 }]} />
              <Text style={[styles.subHeadingText, { marginStart: 3, marginTop: 0 }]}>{this.state.adsByValue}</Text>

              {
                this.state.showCountrySpinner ?
                  <ActivityIndicator
                    size="small"
                    style={{ position: 'absolute', zIndex: 10, alignSelf: 'center', right: '10%', bottom: '25%', }}
                  /> : null
              }
            </View>


            <View style={style = styles.modaBoxInnerContainer}

            >
              <ScrollView contentContainerStyle={styles.modalScrollviewContainer}>

                {

                  this.state.locationsArray.map((obj, i) => {
                    return (

                      <View key={i} style={styles.modalItemContainer}>
                        <TouchableOpacity

                          onPress={() => {
                            if (!obj.has_sub)
                              this.refs.locationModal.close();

                            this.onSelectCountry(obj);
                          }}
                          style={styles.modalDataTextContainer}>
                          <Text style={[styles.modalText, { color: Appearences.Colors.grey }]}>{obj.name}</Text>
                        </TouchableOpacity>
                      </View>

                    );
                  })


                }

              </ScrollView>
            </View>


          </View>


        </ModalBox>




        {/*Ads By Location Modal Start*/}

        <Modal
          style={styles.modal}
          position={"center"} ref={"adsByModal"}
          isDisabled={this.state.isAdsByModalDisabled}
          onClosed={this.onAdsByModalClose}
          onOpened={this.onAdsByModalOpen}
          onClosingState={this.onAdsByModalClosingState}
          swipeThreshold={50}>
          <View style={[styles.modalHeadingContainer, { backgroundColor: orderStore.color }]}>
            <View style={styles.modalHedingItemsContainer}>
              <Image source={require('../../../res/images/gears_white.png')} style={styles.headerImage} />
              <Text style={styles.modalHeadingText}>  {extra.select}</Text>
            </View>
            <View style={styles.modalHedingItemsContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.refs.adsByModal.close();
                }}>
                <Image
                  source={require('../../../res/images/cross_white.png')}
                  style={styles.sliderImage}
                />
              </TouchableOpacity>
            </View>
          </View>


          <View style={styles.modalHeadingSubContainer}>
            <View style={styles.modalHedingItemsContainer}>
              <Image source={require('../../../res/images/double_arrow_black.png')} style={styles.sliderImage} />
              <Text style={styles.modalText}>{this.state.adsByValue}</Text>
            </View>

          </View>
          <View style={styles.sunHeadingseperator} />

          <ScrollView contentContainerStyle={{
            backgroundColor: 'white',
            paddingBottom: 15,
          }}

          >
            <View style={styles.countriesContainer}>
              {

                this.state.locationsArray.map((obj, i) => {
                  return (

                    <View key={i} style={styles.contriesItemContainer}>
                      <TouchableOpacity

                        onPress={() => this.onSelectCountry(obj)}
                        style={styles.contriesTextContainer}>
                        <Text style={styles.modalText}>{obj.name}</Text>
                        {/* <Text style = {styles.modalSubText}>{'    ('+obj.value+')'}</Text> */}
                      </TouchableOpacity>
                      <View style={styles.sunHeadingseperator} />
                    </View>

                  );
                })


              }

            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={() => this.refs.adsByModal.close()}
            style={[styles.countryModalSubmitButtonContainer, { backgroundColor: orderStore.color }]}>
            <View style={[styles.countryModalSubmitButtonContainer, { backgroundColor: orderStore.color }]}>
              <Text style={styles.modalHeadingText}>{extra.dialog_send}</Text>
            </View>

          </TouchableOpacity>
        </Modal>
        {/*Ads By Location Modal End*/}


        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={{
            backgroundColor: 'white',
            paddingBottom: 50,
          }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }

        >
          <View style={styles.container}>

            {
              data.map((item, key) => (
                <View key={key}>
                  {this.renderItems(item)}
                </View>

              )
              )}

            {this.state.webModel.map((item, index) => { return this.getWebLinks(item, index) })}
            {this.state.dateModel.map((item, index) => { return this.getDates(item, index) })}
            {this.state.textFieldModel.map((item, index) => { return this.getTextFields(item, index) })}
            {this.state.selectModel.map((item, index) => { return this.getSelectMenu(item, index, index) })}
            {this.state.checkboxModel.map((item, index) => { return this.getCheckBox(item, index) })}
            {this.state.rengeTextfieldModel.map((item, index) => { return this.getRangeField(item, index) })}
            {this.state.radioFieldModel.map((item, index) => { return this.getRadio(item, index) })}


            <View style={styles.footerContainer}>
              <TouchableOpacity
                onPress={this.onPressSubmit}
                style={[styles.footer, { backgroundColor: orderStore.color }]}>
                <Text style={styles.footerText}>{extra.search_btn}</Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>

      </View>
    );
  }


}
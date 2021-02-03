import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  I18nManager,
  TextInput,
} from 'react-native';
import Appearences from '../../../config/Appearences';
import styles from './Styles';
import Store from '../../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../../network/Api';
import Loader from '../../../components/Loader';
import NoFeaturedAdsFound from '../../../components/NoDataFound';
import NoAdsFound from '../../../components/NoDataFound';
import stores from '../../../Stores/orderStore';
import { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import ModalBox from 'react-native-modalbox';
import { observer } from 'mobx-react';
import * as Progress from 'react-native-progress';
import ModalDropdown from 'react-native-modal-dropdown';

import { NavigationActions } from 'react-navigation';


const sortOptions = [];
const sortKeys = [];

@observer
export default class SearchDetail extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: stores.color,
    },
  });
  adsDefaulValue = [];
  adsPaginationDefaultValue;
  searchFromText = async () => {

    this.setState({ showSpinner: true });
    let { orderStore } = Store;
    const params = this.props.navigation.state.params.params;
    orderStore.innerResponse = await Api.post('ad_post/search', params);
    const data = orderStore.innerResponse.data;

    if (orderStore.innerResponse.success === true) {
      if (orderStore.innerResponse.data.featured_ads.ads.length === 0) {
        this.setState({ noFeaturedAdsVisibility: true });
      }
      if (orderStore.innerResponse.data.ads.length === 0) {
        this.setState({ noAdsVisibility: true });
      }
      orderStore.innerResponse.data.ads = [...this.adsDefaulValue];
      orderStore.innerResponse.pagination = this.adsPaginationDefaultValue;
      this.setState({ listData: orderStore.innerResponse.data.ads, featuredGridData: orderStore.innerResponse.data.featured_ads.ads });


    }

    this.setState({ showSpinner: false, reCaller: false, });

  }

  componentWillMount = async () => {
    let { orderStore } = Store;
    const params = this.props.navigation.state.params.params;
    //  console.warn(params);
    orderStore.innerResponse = await Api.post('ad_post/search', params);
    // console.log('after search results are', JSON.stringify(orderStore.innerResponse))
    const data = orderStore.innerResponse.data;
    const extra = orderStore.innerResponse.extra;
    //   const staticText = data.static_text;
    if (orderStore.innerResponse.success === true) {
      if (orderStore.innerResponse.data.featured_ads.ads.length === 0) {
        this.setState({ noFeaturedAdsVisibility: true });
      }
      if (orderStore.innerResponse.data.ads.length === 0) {
        this.setState({ noAdsVisibility: true });
      }
      this.adsDefaulValue = [...orderStore.innerResponse.data.ads];
      this.adsPaginationDefaultValue = orderStore.innerResponse.pagination;
      this.setState({ listData: orderStore.innerResponse.data.ads, featuredGridData: orderStore.innerResponse.data.featured_ads.ads, noAdsMessage: extra.no_ads_found, noFeaturedAdsMessage: extra.no_ads_found });

      const sortOptionsArray = orderStore.innerResponse.topbar.sort_arr;
      for (var i = 0; i < sortOptionsArray.length; i++) {

        sortOptions.push(sortOptionsArray[i].value);
        sortKeys.push(sortOptionsArray[i].key);

      }
    }
    this.setState({ showSpinner: false });

  }
  _onSwipeUp = async () => {
    // console.log('onswipeup called')
    await this.setState({ swipeUp: true });

    setTimeout(async () => {
      this.setState({ showSpinner: true });
      let { orderStore } = Store;
      const params = this.props.navigation.state.params.params;
      orderStore.innerResponse = await Api.post('ad_post/search', params);

      const data = orderStore.innerResponse.data;

      if (orderStore.innerResponse.success === true) {
        if (orderStore.innerResponse.data.featured_ads.ads.length === 0) {
          this.setState({ noFeaturedAdsVisibility: true });
        }
        if (orderStore.innerResponse.data.ads.length === 0) {
          this.setState({ noAdsVisibility: true });
        }
        orderStore.innerResponse.data.ads = [...this.adsDefaulValue];
        orderStore.innerResponse.pagination = this.adsPaginationDefaultValue;
        this.setState({ listData: orderStore.innerResponse.data.ads, featuredGridData: orderStore.innerResponse.data.featured_ads.ads });


      }

      this.setState({ showSpinner: false, swipeUp: false, reCaller: false, });

    }, 1000);
  }
  _onRefresh = () => {

    let { orderStore } = Store;
    let pagination = orderStore.innerResponse.pagination;
    // console.log('pagination next pas ?', JSON.stringify(pagination))
    if (pagination.has_next_page === true) {

      this.setState({ refreshing: true });
      this.loadMore(pagination.next_page);
    }
  }
  loadMore = async (nextPage) => {

    let { orderStore } = Store;
    let params = this.props.navigation.state.params.params;

    params.page_number = nextPage;
    let response = await Api.post('ad_post/search', params);
    // console.log("search res after refresh", response)

    if (response.success === true) {
      // console.warn("before ", this.state.listData.length);
      orderStore.innerResponse.pagination = response.pagination;
      orderStore.innerResponse.data.ads = [...orderStore.innerResponse.data.ads, ...response.data.ads];
      // console.warn('response', JSON.stringify(orderStore.innerResponse.ads));

      await this.setState({ listData: orderStore.innerResponse.data.ads });
      // console.warn("after ", this.state.listData.length);

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ refreshing: false, reCaller: false, });
  }


  constructor(props) {
    super(props);

    this.state = {
      showSpinner: true,
      refreshing: false,
      listData: [],
      featuredGridData: [],
      noFeaturedAdsMessage: "",
      noFeaturedAdsVisibility: false,
      noAdsMessage: "",
      noAdsVisibility: false,
      reCaller: false,
      swipeUp: false,
      searchText: '',
      showModal: false,
      sortList: [{ title: 'Newest To Oldest', checked: false },
      { title: 'Oldest To New', checked: false },
      { title: 'Alphabatically[a-z]', checked: false },
      { title: 'Alphabatically[z-a]', checked: false },],
      firstModalCurrentIndex: 0,

    }
  }
  renderFeaturedAds = () => {
    let { orderStore } = Store;
    if (orderStore.innerResponse.extra != undefined) {
      if (orderStore.innerResponse.extra.is_show_featured === true) {
        return (<View style={[styles.container, { backgroundColor: 'black', paddingBottom: 25, paddingTop: 15 }]}>



          <View style={styles.topSpace} />
          <Text style={[styles.subHeading, { color: 'white' }]}>{orderStore.innerResponse.data.featured_ads.text}</Text>
          <View style={styles.topSpace} />
          <View style={styles.featuredGrid}>


            <FlatList
              data={this.state.featuredGridData}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <TouchableOpacity
                  style={styles.containerFeatured}
                  onPress={() => {
                    const { navigate } = this.props.navigation;
                    navigate('AdDetailTabManager', { adId: item.ad_id });

                  }}

                >

                  <View style={styles.imageContainer}>

                    <Image
                      style={styles.image}
                      source={{ uri: item.ad_images[0].thumb }} />
                    <View
                      style={styles.imageContainerOverlay}>
                      <View style={styles.topRowContainer}>
                        <View style={styles.topRightContent}>
                          <View
                            style={

                              {
                                width: 0,
                                height: 0,
                                backgroundColor: 'transparent',
                                borderStyle: 'solid',
                                borderRightWidth: 40,
                                borderTopWidth: 40,
                                borderRightColor: 'transparent',
                                borderTopColor: orderStore.color,
                                borderTopLeftRadius: Appearences.Radius.radius,
                                transform: [
                                  { rotate: I18nManager.isRTL ? '360deg' : '90deg' },

                                  { scaleX: I18nManager.isRTL ? -1 : 1 }
                                ]
                              }

                            } />

                          <View style={{ width: '100%', height: '100%', position: 'absolute', alignItems: 'flex-end' }}>
                            <Image
                              style={{ width: 10, height: 10, marginTop: 8, marginEnd: 8 }}
                              source={require('../../../../res/images/star_white.png')} />
                          </View>

                        </View>
                      </View>
                      <View style={styles.bottomRowContainer}>
                        <View style={[styles.bottomLeftContent, { backgroundColor: orderStore.color }]}>
                          <Text style={styles.headingFontWhite}>{item.ad_price.price}
                            <Text style={styles.buttonTextStyle}>
                              {' (' + item.ad_price.price_type + ')'}
                            </Text>
                          </Text>
                        </View>

                        <View style={[styles.bottomRightContent, { backgroundColor: orderStore.color }]}>
                          <Image
                            style={styles.bottomRightContentImage}
                            source={require('../../../../res/images/play.png')} />
                        </View>
                      </View>
                    </View>

                  </View>

                  <View style={styles.textContainer}>

                    <Text style={styles.modelTextStyle}>
                      {item.ad_title}
                    </Text>
                    <Text style={styles.brandTextStyle}>
                      {item.ad_desc}
                    </Text>
                    {item.ad_location.address.length != 0 ?
                      <View style={styles.locationRowContainer}>
                        <Image
                          style={[styles.locationImage, { tintColor: orderStore.color }]}
                          source={require('../../../../res/images/location_red.png')}
                        />
                        <Text style={styles.locationTextStyle}>
                          {item.ad_location.address}
                        </Text>
                      </View>
                      : null}
                    <View style={styles.milageRow} >

                      <View style={styles.petrolContainer}>
                        <Image
                          source={require('../../../../res/images/petrol_pump_red.png')}
                          style={[styles.petrolImageStyle, { tintColor: orderStore.color }]}
                        />
                        <Text
                          style={styles.petrolTextStyle}>
                          {item.ad_engine}
                        </Text>
                      </View>

                      <View style={styles.mileageContainer}>
                        <Image
                          source={require('../../../../res/images/meter_red.png')}
                          style={[styles.mileageImageStyle, { tintColor: orderStore.color }]}
                        />
                        <Text
                          style={styles.mileageTextStyle}>
                          {item.ad_milage}
                        </Text>
                      </View>


                    </View>
                  </View>
                </TouchableOpacity>



              }
              keyExtractor={item => item.ad_id + "" + item.ad_title}
            >
            </FlatList>


            <NoFeaturedAdsFound
              message={this.state.noFeaturedAdsMessage}
              visible={this.state.noFeaturedAdsVisibility}
            />



          </View>




        </View>);

      }
    }

    else
      return null;
  }
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  onPressFirstModal(index) {

    this.setState({
      firstModalCurrentIndex: index,
    });

  }
  componentDidUpdate = () => {
    let { orderStore } = Store;

    orderStore.setOnClickSearchListener(false);


  }
  sort = async (index) => {
    this.setState({ showSpinner: true });

    let { orderStore } = Store;

    // const pa .rams = sortKeys[index];

    const param = {
      sort: sortKeys[index]
    }
    //  console.warn(params);
    orderStore.innerResponse = await Api.post('ad_post/search', param);
    // console.log('after search results are', JSON.stringify(orderStore.innerResponse))
    const data = orderStore.innerResponse.data;
    const extra = orderStore.innerResponse.extra;
    //   const staticText = data.static_text;
    if (orderStore.innerResponse.success === true) {
      if (orderStore.innerResponse.data.featured_ads.ads.length === 0) {
        this.setState({ noFeaturedAdsVisibility: true });
      }
      if (orderStore.innerResponse.data.ads.length === 0) {
        this.setState({ noAdsVisibility: true });
      }
      this.adsDefaulValue = [...orderStore.innerResponse.data.ads];
      this.adsPaginationDefaultValue = orderStore.innerResponse.pagination;
      this.setState({ listData: orderStore.innerResponse.data.ads, featuredGridData: orderStore.innerResponse.data.featured_ads.ads, noAdsMessage: extra.no_ads_found, noFeaturedAdsMessage: extra.no_ads_found });

      //   const sortOptionsArray = orderStore.innerResponse.topbar.sort_arr;
      //   for (var i = 0; i < sortOptionsArray.length; i++) {

      //     sortOptions.push(sortOptionsArray[i].value);
      //     sortKeys.push(sortOptionsArray[i].key);

      //   }
      // }
    }
    this.setState({ showSpinner: false });

  }
  render() {
    let { orderStore } = Store;
    if (orderStore.onClickSearch) {
      // console.warn(orderStore.isCallAdvance);
      // if(orderStore.isCallAdvance)
      //   { console.warn("calllleddddd");
      //     this.props.navigation.dispatch(NavigationActions.back())
      //   }
      //   else
      this.props.navigation.replace("Search");

    }
    if (this.state.showSpinner)
      return (
        <Loader />

      );

    return (
      <View style={{
        height: '100%',
        backgroundColor: Appearences.Colors.appBackgroundColor,
        paddingBottom: 5,
      }}>

        <ScrollView contentContainerStyle={{
          backgroundColor: Appearences.Colors.appBackgroundColor,
        }}

          refreshControl={
            <RefreshControl
              refreshing={this.state.swipeUp}
              onRefresh={this._onSwipeUp}
            />
          }
          showsVerticalScrollIndicator={false}
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              if (this.state.reCaller === false) {
                this._onRefresh();
              }
              this.setState({ reCaller: true })

            }
          }}
          scrollEventThrottle={400}>
          {this.renderFeaturedAds() }

          <View style={styles.container}>

            <View style={styles.topSpace} />
            <View style={styles.topSpace} />

            <View style={{ paddingStart: 20, paddingVertical: 8, borderRadius: 5, flexDirection: 'row', backgroundColor: '#fff', justifyContent: 'space-between', width: '100%' }}>
              {
                orderStore.innerResponse.topbar != undefined ?
                  orderStore.innerResponse.topbar.count_ads != undefined ? [
                    <Text>{orderStore.innerResponse.topbar.count_ads}</Text>

                  ] : [] : null
              }
              <View>
                {/* Model */}
                <TouchableOpacity onPress={() => {
                  this.subRef.show();
                }}
                  style={styles.row}
                >
                  <ModalDropdown
                    options={sortOptions}
                    ref={el => this.subRef = el}
                    style={styles.pickerContainer}
                    dropdownStyle={styles.dorpDownStyle}

                    dropdownTextHighlightStyle={styles.dropDownTextStyle}
                    textStyle={styles.dorpdownContainerTextStyle}
                    defaultValue={orderStore.innerResponse.topbar != undefined ? orderStore.innerResponse.topbar.sort_arr_key != undefined ? orderStore.innerResponse.topbar.sort_arr_key.value : "" : ""}
                    onSelect={(index, value) => {
                      this.sort(index)
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
                      source={require('../../../../res/images/right_arrow.png')}
                    />
                  </View>
                </TouchableOpacity>




              </View>

            </View>

            <View style={styles.topSpace} />

            <FlatList

              data={this.state.listData}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <TouchableOpacity

                  onPress={() => {
                    const { navigate } = this.props.navigation;
                    navigate('AdDetailTabManager', { adId: item.ad_id });

                  }}

                  style={styles.flastListItemContainer}>
                  <View style={styles.flatListBackgroundImageContainer}>
                    <Image
                      style={styles.flatListBackgroundImage}
                      source={{ uri: item.images[0].thumb }} />

                  </View>

                  <View style={styles.flatListContentContainer}>
                    <View style={{ padding: 15, }}>
                      <View style={styles.flatListContentRow1}>
                        <Text
                          numberOfLines={1}
                          style={styles.flatListItemHeadingText}>
                          {item.ad_title}
                        </Text>
                      </View>

                      <Text style={styles.flatListContentRow1Text}>
                        {item.ad_cats_name}
                      </Text>

                      {item.ad_engine == undefined && item.ad_milage == undefined ? null
                        : <Text style={styles.flatListItemMileageText}>
                          {item.ad_engine + ' | ' + item.ad_milage}
                        </Text> ||
                          item.ad_engine == undefined && item.ad_milage != undefined ?
                          <Text style={styles.flatListItemMileageText}>
                            {item.ad_engine}
                          </Text>
                          : <Text style={styles.flatListItemMileageText}>
                            {item.ad_engine + ' | ' + item.ad_milage}
                          </Text>
                            ||
                            item.ad_engine != undefined && item.ad_milage == undefined ?
                            <Text style={styles.flatListItemMileageText}>
                              {item.ad_milage}
                            </Text>
                            : <Text style={styles.flatListItemMileageText}>
                              {item.ad_engine + ' | ' + item.ad_milage}
                            </Text>
                      }
                      <Text style={[styles.flatListItemPriceText, { color: orderStore.color, fontSize: Appearences.Fonts.headingFontSize, fontWeight: Appearences.Fonts.headingFontWieght }]}>
                        {item.ad_price.price}
                        <Text style={[styles.flatListItemPriceText, { color: orderStore.color }]}>
                          {
                            item.ad_price.price_type != '' ? [
                              ' (' + item.ad_price.price_type + ')'

                            ] : []
                          }
                        </Text>
                      </Text>
                    </View>
                    <View style={styles.menuItemSperator} />

                  </View>

                </TouchableOpacity>

              }
              keyExtractor={item => item.ad_author_id + "" + item.ad_title}
            >
            </FlatList>



            <NoAdsFound
              message={this.state.noAdsMessage}
              visible={this.state.noAdsVisibility}
            />



          </View>

          {this.state.refreshing ?
            <View
              style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: 40, }}
            >
              <Progress.Circle
                size={20}
                style={{ alignSelf: 'center' }}
                color={orderStore.color}
                indeterminate={true} />
            </View> : null}

        </ScrollView>
     
     
        <ModalBox
          style={styles.modalBoxStyle}
          position={"bottom"}
          ref={"modal4"}>
          <View style={styles.modalContentContainer}>
            <ScrollView>
              <View style={styles.subHeadingContainer}>
                <Text style={[styles.subHeading, { color: '#999999' }]}>Filter By</Text>

              </View>
              <FlatList
                data={this.state.sortList}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>

                  <TouchableOpacity
                    onPress={() => { this.onPressFirstModal(index); }}
                  >
                    <View style={styles.modalItemContainer}>

                      <Text style={[styles.flatListItemHeadingText, { alignSelf: 'center', color: '#999999' }]}>
                        {item.title}
                      </Text>

                      <RadioButton

                      >

                        <RadioButtonInput
                          obj={item}
                          index={index}
                          isSelected={this.state.firstModalCurrentIndex === index}
                          borderWidth={1}
                          buttonInnerColor={stores.color}
                          buttonOuterColor={this.state.firstModalCurrentIndex === index ? stores.color : Appearences.Colors.grey}
                          buttonSize={6}
                          buttonStyle={styles.radioButtonStyle}
                          buttonWrapStyle={styles.buttonWrapStyle} />

                      </RadioButton>




                    </View>

                  </TouchableOpacity>
                }
                keyExtractor={item => item.title}
              >
              </FlatList>


            </ScrollView>
          </View>


        </ModalBox>

      </View>
    );
  }


}









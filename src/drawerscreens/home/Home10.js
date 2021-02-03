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
  Dimensions,
  Animated,
  BackHandler,
  RefreshControl,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Appearences from '../../config/Appearences';
import styles from './Styles';
import FeaturedTypeStyle from './FeaturedTypeStyle';
import MakersTypeStyle from './MakersTypeStyle';
import FeaturedGridStyle from './FeaturedGridStyle';
import PopularCarsStyle from './PopularCarsStyle';
import ExploreCountryStyle from './ExploreCountryStyle';
import TopCars from './TopCars';
import Carousel from 'react-native-snap-carousel';
import Store from '../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import Loader from '../../components/Loader';
import * as Animatable from 'react-native-animatable';
let { height } = Dimensions.get('window');
import { I18nManager } from 'react-native'
import { observer } from 'mobx-react';
import Banner from '../../components/adMob/Banner';
import { widthPercentageToDP as wp } from '../../helper/Responsive'
@observer
export default class Home extends Component<Props> {


  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    //getIntertial();
  }


  constructor(props) {
    super(props);

    this.springValue = new Animated.Value(100);

    this.state = {
      cats: [],
      showSpinner: true,
      backClickCount: 0,
      refreshing: false,
      searchText: '',
    };
  }

  _spring() {

    this.setState({ backClickCount: 1 }, () => {
      Animated.sequence([
        Animated.spring(
          this.springValue,
          {
            toValue: -.15 * height,
            friction: 5,
            duration: 300,
            useNativeDriver: true,
          }
        ),
        Animated.timing(
          this.springValue,
          {
            toValue: 100,
            duration: 300,
            useNativeDriver: true,
          }
        ),

      ]).start(() => {
        this.setState({ backClickCount: 0 });
      });
    });

  };

  componentWillUnmount = async () => {
    await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = async () => {
    if (this.state.backClickCount == 0)
      Toast.show("Press back again to exit");
    this.state.backClickCount == 1 ? await BackHandler.exitApp() : this._spring();

    return true;
  };
  onTopCarsClick = async (item) => {

    const { navigate } = this.props.navigation;
    await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);

    navigate('ComparisonDetail', { car1: item[0].post_id, car2: item[1].post_id });


  };




  managePostions = (itemAtPosition) => {

    switch (itemAtPosition) {
      case 'body_type':
        return this.renderBodyType();
      case 'featured_ads':
        return this.renderFeaturedAdsGrid();
      case 'latest_ads':
        return this.renderLatestAds();
      case 'cat_icons':
        return this.renderFearuredMaker();
      case 'cat_locations':
        return this.renderExplore();
      case 'comparison':
        return this.renderComparison();
      case 'blogNews':
        return this.renderBlog();
      default:
        break;

    }
  }


  componentWillMount = async () => {

    let { orderStore } = Store;
    const response = await Api.get('home');
    if (response.success === true) {
      // console.log("Resssaase==>", response);
      orderStore.home = response.data;
      orderStore.drawerMenu = response.data.menu.home_menu

      orderStore.bodyType = response.data.api_body_sec_views;
      orderStore.featuredListingType = response.data.api_list_sec_views;
      orderStore.makeType = response.data.api_body_make_views;

      this.jobsPositions = response.data.ads_position;
    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false });

  }

  onPressViewAll = async () => {
    const params = { ad_title: "" }

    const { navigate } = this.props.navigation;
    await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    let { orderStore } = Store;
    orderStore.setIsCallAdvance(false);
    navigate('SearchDetail', { params: params });
  }

  onFeaturedTypeClick = async (item) => {
    const params = { body_type: item.name }

    const { navigate } = this.props.navigation;
    await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    let { orderStore } = Store;
    orderStore.setIsCallAdvance(false);
    navigate('SearchDetail', { params: params });

  };
  onFeaturedGridClick = async (item) => {
    const { navigate } = this.props.navigation;
    await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);

    navigate('AdDetailTabManager', { adId: item.ad_id });
  };

  renderFunction = (item, index) => {

  }


  renderBodyType = () => {
    let { orderStore } = Store;
    const data = orderStore.home;
    if (!data.body_type_is_show)
      return null;


    let bodyType = orderStore.bodyType

    switch (bodyType) {
      case '1':
        return (<View style={{ marginTop: wp(5) }}>
          <View style={[{ justifyContent: 'center', backgroundColor: '#1d2127', paddingVertical: wp(2), paddingLeft: wp(1) }]}>


            <FlatList
              data={data.body_type_icons}
              horizontal={true}
              showsHorizontalScrollIndicator={false}

              ref={(ref) => { this.flatListRef = ref; }}
              renderItem={({ item, index }) =>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.onFeaturedTypeClick(item)}
                  style={{ marginRight: wp('4'), alignSelf: 'center' }}>
                  {/* <Animatable.View
                  duration={2000}
                  animation="zoomIn"
                  iterationCount={1}
                  direction="alternate">
                  <Image
                    style={FeaturedTypeStyle.image}
                    source={{ uri: item.img }} />
                </Animatable.View> */}
                  <Text style={[FeaturedTypeStyle.text, { color: '#fff', paddingBottom: 0 }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={item => item.body_type_id + ''}
            >
            </FlatList>




          </View>










        </View>);
      case "2":
        return (<View>




          <View style={styles.headingContainer}>
            <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.body_type_txt1}</Text>
            <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.body_type_txt2}</Text>
          </View>
          <View style={styles.startPadding}>


          </View>
          <View style={styles.featuredTypeListContainer}>


            <FlatList
              data={data.body_type_icons}
              horizontal={true}
              showsHorizontalScrollIndicator={false}

              ref={(ref) => { this.flatListRef = ref; }}
              renderItem={({ item, index }) =>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.onFeaturedTypeClick(item)}
                  style={FeaturedTypeStyle.container}>

                  <Text style={[FeaturedTypeStyle.text, { paddingBottom: 0 }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={item => item.body_type_id + ''}
            >
            </FlatList>




          </View>
        </View>);
      case '3':
        return (<View>




          <View style={styles.headingContainer}>
            <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.body_type_txt1}</Text>
            <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.body_type_txt2}</Text>
          </View>
          <View style={styles.startPadding}>


          </View>
          <View style={styles.featuredTypeListContainer}>


            <FlatList
              data={data.body_type_icons}
              horizontal={true}
              showsHorizontalScrollIndicator={false}

              ref={(ref) => { this.flatListRef = ref; }}
              renderItem={({ item, index }) =>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.onFeaturedTypeClick(item)}
                  style={[{ alignContent: 'center', alignItems: 'center' }]}
                >
                  <Animatable.View
                    duration={2000}
                    animation="zoomIn"
                    iterationCount={1}
                    style={[FeaturedTypeStyle.container, { paddingHorizontal: wp('2'), paddingVertical: wp('0'), borderWidth: wp('0.3'), borderColor: '#f1f1f1', backgroundColor: "#f8f8f8" }]}
                    direction="alternate">
                    <Image
                      style={FeaturedTypeStyle.image}
                      source={{ uri: item.img }} />
                  </Animatable.View>

                  <Text style={[FeaturedTypeStyle.text, { color: '#fff' }]}>
                    {item.name}
                  </Text>



                </TouchableOpacity>
              }
              keyExtractor={item => item.body_type_id + ''}
            >
            </FlatList>




          </View>

        </View>);
      case '4':
        return (<View>

          <View style={styles.headingContainer}>
            <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.body_type_txt1}</Text>
            <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.body_type_txt2}</Text>
          </View>
          <View style={styles.startPadding}>


          </View>
          <View style={styles.featuredTypeListContainer}>


            <FlatList
              data={data.body_type_icons}
              horizontal={true}
              showsHorizontalScrollIndicator={false}

              ref={(ref) => { this.flatListRef = ref; }}
              renderItem={({ item, index }) =>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.onFeaturedTypeClick(item)}
                  style={[{ alignContent: 'center', alignItems: 'center', backgroundColor: "#f8f8f8", marginRight: wp(2) }]}
                >
                  <Animatable.View
                    duration={2000}
                    animation="zoomIn"
                    iterationCount={1}
                    style={[FeaturedTypeStyle.container, { width: wp(30), paddingHorizontal: wp('2'), paddingVertical: wp('0'), backgroundColor: "#f8f8f8" }]}
                    direction="alternate">
                    <Image
                      style={[FeaturedTypeStyle.image, { height: wp(20), width: wp(26) }]}
                      source={{ uri: item.img }} />
                  </Animatable.View>

                  <Text style={[{ color: '#000', fontSize: wp(3), backgroundColor: '#fff', paddingVertical: wp(2), marginBottom: wp(2), paddingHorizontal: wp(4), fontWeight: '600' }]}>
                    {item.name}
                  </Text>



                </TouchableOpacity>
              }
              keyExtractor={item => item.body_type_id + ''}
            >
            </FlatList>




          </View>


        </View>);
      case '5':
        return (<View>
          <View style={styles.startPadding}>


          </View>
          <View style={[styles.featuredTypeListContainer, { marginLeft: wp(0), paddingVertical: wp(2), backgroundColor: '#1D2127' }]}>


            <FlatList
              data={data.body_type_icons}
              horizontal={true}
              showsHorizontalScrollIndicator={false}

              ref={(ref) => { this.flatListRef = ref; }}
              renderItem={({ item, index }) =>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.onFeaturedTypeClick(item)}
                  style={[FeaturedTypeStyle.container, { backgroundColor: '#171A1F' }]}>
                  {/* <Animatable.View
                    duration={2000}
                    animation="zoomIn"
                    iterationCount={1}
                    direction="alternate">
                    <Image
                      style={FeaturedTypeStyle.image}
                      source={{ uri: item.img }} />
                  </Animatable.View> */}
                  <Text style={[FeaturedTypeStyle.text, { color: '#fff', paddingBottom: 0 }]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              }
              keyExtractor={item => item.body_type_id + ''}
            >
            </FlatList>




          </View>


        </View>);
      case '6':
        return (<View>




          <View style={styles.headingContainer}>
            <Text style={[styles.bodyHeadingBlack, { color: "#fff" }]}>{data.body_type_txt1}</Text>
            <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.body_type_txt2}</Text>
          </View>
          <View style={styles.startPadding}>


          </View>
          <View style={styles.featuredTypeListContainer}>


            <FlatList
              data={data.body_type_icons}
              horizontal={true}
              showsHorizontalScrollIndicator={false}

              ref={(ref) => { this.flatListRef = ref; }}
              renderItem={({ item, index }) =>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.onFeaturedTypeClick(item)}
                  style={[{ alignContent: 'center', alignItems: 'center' }]}
                >
                  <Animatable.View
                    duration={2000}
                    animation="zoomIn"
                    iterationCount={1}
                    style={[FeaturedTypeStyle.container, { paddingHorizontal: wp('2'), paddingVertical: wp('0'), backgroundColor: '#171A1F' }]}
                    direction="alternate">
                    <Image
                      style={FeaturedTypeStyle.image}
                      source={{ uri: item.img }} />
                  </Animatable.View>

                  <Text style={[FeaturedTypeStyle.text, { color: '#fff' }]}>
                    {item.name}
                  </Text>



                </TouchableOpacity>
              }
              keyExtractor={item => item.body_type_id + ''}
            >
            </FlatList>

          </View>

        </View>);
      case '7':
        return (<View>
          <View style={styles.startPadding}>


          </View>
          <View style={[styles.featuredTypeListContainer, { flexDirection: 'row', alignItems: 'center' }]}>
            <Image
              style={[FeaturedTypeStyle.image, { height: wp(9), width: wp(26), alignSelf: 'center', marginBottom: wp(2), marginRight: wp(3) }]}
              source={require('../../../res/images/logo.png')} />

            <FlatList
              data={data.body_type_icons}
              horizontal={true}
              showsHorizontalScrollIndicator={false}

              ref={(ref) => { this.flatListRef = ref; }}
              renderItem={({ item, index }) =>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => this.onFeaturedTypeClick(item)}
                  style={[{ alignContent: 'center', alignItems: 'center', backgroundColor: "#fff", marginRight: wp(2) }]}
                >


                  <Text style={[{ color: '#000', fontSize: wp(3), backgroundColor: '#f8f8f8', paddingVertical: wp(2), paddingHorizontal: wp(4), fontWeight: '600' }]}>
                    {item.name}
                  </Text>



                </TouchableOpacity>
              }
              keyExtractor={item => item.body_type_id + ''}
            >
            </FlatList>




          </View>



        </View>);

    }
    return (<View>




      <View style={styles.headingContainer}>
        <Text style={styles.bodyHeadingBlack}>{data.body_type_txt1}</Text>
        <Text style={styles.bodyHeadingAppColor}> {data.body_type_txt2}</Text>
      </View>
      <View style={styles.startPadding}>


      </View>
      <View style={styles.featuredTypeListContainer}>


        <FlatList
          data={data.body_type_icons}
          horizontal={true}
          showsHorizontalScrollIndicator={false}

          ref={(ref) => { this.flatListRef = ref; }}
          renderItem={({ item, index }) =>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.onFeaturedTypeClick(item)}
              style={[{ alignContent: 'center', alignItems: 'center' }]}
            >
              <Animatable.View
                duration={2000}
                animation="zoomIn"
                iterationCount={1}
                style={[FeaturedTypeStyle.container, { paddingHorizontal: wp('2'), paddingVertical: wp('0'), borderWidth: wp('0.3'), borderColor: '#f1f1f1', backgroundColor: "#f8f8f8" }]}
                direction="alternate">
                <Image
                  style={FeaturedTypeStyle.image}
                  source={{ uri: item.img }} />
              </Animatable.View>

              <Text style={FeaturedTypeStyle.text}>
                {item.name}
              </Text>



            </TouchableOpacity>
          }
          keyExtractor={item => item.body_type_id + ''}
        >
        </FlatList>




      </View>




    </View>);

  }
  renderFeaturedAdsGrid = () => {
    let { orderStore } = Store;
    if (!orderStore.home.is_show_featured)
      return null;
    const data = orderStore.home.featured_ads;


    let featuredAdType = orderStore.featuredListingType

    switch (featuredAdType) {
      case '1':
        return (
          <View>


            <View style={styles.headingWithButtonContainer}>
              <View style={styles.headingContainer}>
                <View>
                  <View style={styles.textRowConrainer}>
                    <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.text}</Text>
                    <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.text2}</Text>
                  </View>

                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.smallButtonContainer}
                  onPress={() => { this.onPressViewAll() }}>
                  <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}>
                    <Text style={styles.buttonTextStyle}>{data.view_all}</Text>

                  </View>
                </TouchableOpacity>
              </View>



            </View>


            <View style={[styles.featuredGrid, { backgroundColor: "#1D2127" }]}>



              {/* featured ads */}

              <FlatList
                data={data.ads}
                // horizontal={true}
                numColumns={2}
                showsHorizontalScrollIndicator={false}

                renderItem={({ item, index }) =>
                  <TouchableOpacity
                    activeOpacity={1}
                    style={[FeaturedGridStyle.container, { marginTop: wp('3'), width: wp('45'), backgroundColor: "#1D2127", borderTopLeftRadius: wp('3'), borderTopRightRadius: wp('3') }]}
                    onPress={() => this.onFeaturedGridClick(item)}
                  >
                    <View style={[FeaturedGridStyle.imageContainer, { borderTopLeftRadius: wp('3'), backgroundColor: "#1D2127", borderTopRightRadius: wp('3') }]}>
                      <Image
                        style={FeaturedGridStyle.image}
                        source={{ uri: item.ad_images[0].thumb }} />
                      <View
                        style={FeaturedGridStyle.imageContainerOverlay}>
                        <View style={FeaturedGridStyle.topRowContainer}>

                        </View>

                      </View>


                    </View>


                    <View style={{ height: wp('26'), width: wp('42'), paddingVertical: wp("4"), borderRadius: wp('2'), marginTop: wp('-5'), paddingHorizontal: wp('2'), alignSelf: 'center', borderWidth: wp('0.3'), borderColor: '#f1f1f1', backgroundColor: "#f8f8f8" }}>
                      <View >
                        <Text style={[styles.buttonTextStyle, { color: 'red', fontSize: wp('3'), fontWeight: '600' }]}>{item.ad_price.price}
                          {
                            item.ad_price.price_type != undefined && item.ad_price.price_type != null && item.ad_price.price_type != '' ?
                            <Text style={[styles.buttonTextStyle, { color: '#000', fontSize: wp('2.4') }]}>{' (' + item.ad_price.price_type + ')'}</Text>
                            :null
                          }
                       
                        </Text>
                        <Text style={[FeaturedGridStyle.brandTextStyle, { maxHeight: wp('9'), marginTop: wp('1'), width: wp('38') }]}>
                          {item.ad_title}
                        </Text>
                        <View style={[FeaturedGridStyle.locationRowContainer, { height: wp('8'), width: wp('38') }]}>
                          <Image
                            style={[FeaturedGridStyle.locationImage, { tintColor: orderStore.color }]}
                            source={require('../../../res/images/location_red.png')}
                          />
                          <Text style={[FeaturedGridStyle.locationTextStyle, { width: wp('33'), tintColor: orderStore.color }]}>
                            {item.ad_location.address}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>



                }
                keyExtractor={item => item.ad_id + ''}
              >
              </FlatList>

              {/* ///////////// */}

            </View>





          </View>
        );
      case '2':
        return (
          <View >


            <View style={styles.headingWithButtonContainer}>
              <View style={styles.headingContainer}>
                <View>
                  <View style={styles.textRowConrainer}>
                    <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.text}</Text>
                    <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.text2}</Text>
                  </View>

                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.smallButtonContainer, { alignSelf: 'center' }]}
                  onPress={() => { this.onPressViewAll() }}>
                  {/* <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}> */}
                  <Text style={[styles.buttonTextStyle, { color: orderStore.appColor, fontWeight: 'bold' }]}>{data.view_all}</Text>
                  {/* </View> */}
                </TouchableOpacity>
              </View>



            </View>


            <View style={[styles.featuredGrid, { backgroundColor: '#1d2127' }]}>


              <FlatList
                data={data.ads}

                // horizontal={true}
                showsHorizontalScrollIndicator={false}

                renderItem={({ item, index }) =>


                  <TouchableOpacity
                    activeOpacity={1}
                    style={[{ marginBottom: wp(4), borderRadius: 0, flexDirection: 'row', backgroundColor: '#1d2127' }]}
                    onPress={() => this.onFeaturedGridClick(item)}
                  >

                    <View style={[{
                      height: 100,
                      width: '40%',
                      // overflow: 'hidden',
                      // borderTopRightRadius:Appearences.Radius.radius,
                      // borderTopLeftRadius:Appearences.Radius.radius,
                    }]}>

                      <Image
                        style={[{
                          flex: 1,
                          resizeMode: 'cover', borderTopRightRadius: 0,
                          borderTopLeftRadius: 0,
                        }]}
                        source={{ uri: item.ad_images[0].thumb }} />
                      <View
                        style={FeaturedGridStyle.imageContainerOverlay}>
                        <View style={FeaturedGridStyle.topRowContainer}>
                          <View style={FeaturedGridStyle.topRightContent}>
                          </View>
                        </View>


                      </View>

                    </View>
                    <View style={{ width: '100%', height: 100 }}>
                      <View style={[FeaturedGridStyle.textContainer, { width: '100%', backgroundColor: '#F8F8F8' }]}>
                        <Text style={[styles.buttonTextStyle, { color: 'red', fontSize: wp(2.4), fontWeight: '700' }]}>{item.ad_price.price}
                          {
                            item.ad_price.price_type != undefined && item.ad_price.price_type != null && item.ad_price.price_type != '' ?
                              <Text style={[styles.buttonTextStyle, { color: '#000' }]}>{' (' + item.ad_price.price_type + ')'}</Text>
                              : null
                          }
                        </Text>
                        <Text style={[FeaturedGridStyle.brandTextStyle, { fontWeight: '800', width: wp(52) }]}>
                          {item.ad_title}
                        </Text>


                        {/* <Text style = {FeaturedGridStyle.modelTextStyle}>
                      {item.ad_desc}
                      </Text> */}
                        <View style={[{ flexDirection: 'row', backgroundColor: '#F8F8F8', }]} >

                          <View style={FeaturedGridStyle.petrolContainer}>

                            <Text
                              style={[FeaturedGridStyle.petrolTextStyle, { marginStart: 0 }]}>
                              {item.ad_engine}
                            </Text>
                          </View>
                          {
                            item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                              <Text style={[FeaturedGridStyle.petrolTextStyle, { marginLeft: wp(2) }]}>|</Text>
                              : []
                          }

                          {
                            item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                              <View style={FeaturedGridStyle.mileageContainer}>

                                <Text
                                  style={[FeaturedGridStyle.mileageTextStyle]}>
                                  {item.ad_milage}
                                </Text>
                              </View> : []

                          }


                        </View>
                        <View style={FeaturedGridStyle.locationRowContainer}>
                          <Image
                            style={[FeaturedGridStyle.locationImage, { tintColor: 'red' }]}
                            source={require('../../../res/images/location_red.png')}
                          />
                          <Text style={[FeaturedGridStyle.locationTextStyle]}>
                            {item.ad_location.address}
                          </Text>
                        </View>


                      </View>
                      {/* <View style={[FeaturedGridStyle.milageRow, { backgroundColor: '#F8F8F8', padding: wp(1), paddingLeft: wp(2.5) }]} >
    
                        <View style={FeaturedGridStyle.petrolContainer}>
                         
                          <Text
                            style={[FeaturedGridStyle.petrolTextStyle]}>
                            {item.ad_engine}
                          </Text>
                        </View>
                        {
                          item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                            <Text style={[FeaturedGridStyle.petrolTextStyle, {  marginLeft: wp(2) }]}>|</Text>
                            : []
                        }
    
                        {
                          item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                            <View style={FeaturedGridStyle.mileageContainer}>
    
                              <Text
                                style={[FeaturedGridStyle.mileageTextStyle]}>
                                {item.ad_milage}
                              </Text>
                            </View> : []
    
                        }
    
    
                      </View> */}
                    </View>
                  </TouchableOpacity>



                }
                keyExtractor={item => item.ad_id + ''}
              >
              </FlatList>






            </View>

          </View>
        );
      case '3':
        return (
          <View style={{ backgroundColor: '#1d2127' }}>


            <View style={styles.headingWithButtonContainer}>
              <View style={styles.headingContainer}>
                <View>
                  <View style={styles.textRowConrainer}>
                    <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.text}</Text>
                    <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.text2}</Text>
                  </View>

                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.smallButtonContainer, { alignSelf: 'center' }]}
                  onPress={() => { this.onPressViewAll() }}>
                  {/* <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}> */}
                  <Text style={[styles.buttonTextStyle, { color: orderStore.color, fontWeight: 'bold' }]}>{data.view_all}</Text>
                  {/* </View> */}
                </TouchableOpacity>
              </View>



            </View>


            <View style={[styles.featuredGrid, { backgroundColor: '#1d2127' }]}>


              <FlatList
                data={data.ads}
                numColumns={2}
                // horizontal={true}
                showsHorizontalScrollIndicator={false}

                renderItem={({ item, index }) =>


                  <TouchableOpacity
                    activeOpacity={1}
                    style={[FeaturedGridStyle.container, { marginTop: wp(4), borderRadius: 0 }]}
                    onPress={() => this.onFeaturedGridClick(item)}
                  >

                    <View style={[{
                      height: 150,
                      width: '100%',
                      // overflow: 'hidden',
                      // borderTopRightRadius:Appearences.Radius.radius,
                      // borderTopLeftRadius:Appearences.Radius.radius,
                    }]}>

                      <Image
                        style={[{
                          flex: 1,
                          resizeMode: 'cover', borderTopRightRadius: 0,
                          borderTopLeftRadius: 0,
                        }]}
                        source={{ uri: item.ad_images[0].thumb }} />
                      <View
                        style={FeaturedGridStyle.imageContainerOverlay}>
                        <View style={FeaturedGridStyle.topRowContainer}>
                          <View style={FeaturedGridStyle.topRightContent}>




                          </View>
                        </View>


                      </View>

                    </View>

                    <View style={FeaturedGridStyle.textContainer}>
                      <Text style={[styles.buttonTextStyle, { color: 'red', fontSize: wp(3), fontWeight: '700' }]}>{item.ad_price.price}
                        {
                          item.ad_price.price_type != undefined && item.ad_price.price_type != null && item.ad_price.price_type != '' ?
                            <Text style={[styles.buttonTextStyle, { color: 'gray' }]}>{' (' + item.ad_price.price_type + ')'}</Text>
                            : null
                        }
                      </Text>
                      <Text style={[FeaturedGridStyle.brandTextStyle, { fontWeight: '800' }]}>
                        {item.ad_title}
                      </Text>
                      {/* <Text style = {FeaturedGridStyle.modelTextStyle}>
                      {item.ad_desc}
                      </Text> */}

                      <View style={FeaturedGridStyle.locationRowContainer}>
                        <Image
                          style={[FeaturedGridStyle.locationImage, { tintColor: orderStore.color }]}
                          source={require('../../../res/images/location_red.png')}
                        />
                        <Text style={[FeaturedGridStyle.locationTextStyle, { tintColor: orderStore.color }]}>
                          {item.ad_location.address}
                        </Text>
                      </View>


                    </View>
                    <View style={[FeaturedGridStyle.milageRow, { backgroundColor: '#F8F8F8', padding: wp(1), paddingLeft: wp(2.5) }]} >

                      <View style={FeaturedGridStyle.petrolContainer}>
                        {/* <Image
                          source={require('../../../res/images/petrol_pump_red.png')}
                          style={[FeaturedGridStyle.petrolImageStyle, { tintColor: orderStore.color }]}
                        /> */}
                        <Text
                          style={FeaturedGridStyle.petrolTextStyle}>
                          {item.ad_engine}
                        </Text>
                      </View>
                      {
                        item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                          <Text style={[FeaturedGridStyle.petrolTextStyle, { marginLeft: wp(2) }]}>|</Text>
                          : []
                      }

                      {
                        item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                          <View style={FeaturedGridStyle.mileageContainer}>

                            <Text
                              style={FeaturedGridStyle.mileageTextStyle}>
                              {item.ad_milage}
                            </Text>
                          </View> : []

                      }


                    </View>
                  </TouchableOpacity>



                }
                keyExtractor={item => item.ad_id + ''}
              >
              </FlatList>






            </View>





          </View>
        );
      case '4':
        return (
          <View>


            <View style={styles.headingWithButtonContainer}>
              <View style={styles.headingContainer}>
                <View>
                  <View style={styles.textRowConrainer}>
                    <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.text}</Text>
                    <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.text2}</Text>
                  </View>

                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.smallButtonContainer, { alignSelf: 'center' }]}
                  onPress={() => { this.onPressViewAll() }}>
                  {/* <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}> */}
                  <Text style={[styles.buttonTextStyle, { color: '#fff', fontWeight: 'bold' }]}>{data.view_all}</Text>
                  {/* </View> */}
                </TouchableOpacity>
              </View>



            </View>


            <View style={[styles.featuredGrid, { backgroundColor: '#1D2127' }]}>


              <FlatList
                data={data.ads}
                numColumns={2}
                // horizontal={true}
                showsHorizontalScrollIndicator={false}

                renderItem={({ item, index }) =>


                  <TouchableOpacity
                    activeOpacity={1}
                    style={[FeaturedGridStyle.container, { marginTop: wp(4), borderRadius: 0 }]}
                    onPress={() => this.onFeaturedGridClick(item)}
                  >

                    <View style={[{
                      height: 150,
                      width: '100%',
                      // overflow: 'hidden',
                      // borderTopRightRadius:Appearences.Radius.radius,
                      // borderTopLeftRadius:Appearences.Radius.radius,
                    }]}>

                      <Image
                        style={[{
                          flex: 1,
                          resizeMode: 'cover', borderTopRightRadius: 0,
                          borderTopLeftRadius: 0,
                        }]}
                        source={{ uri: item.ad_images[0].thumb }} />
                      <View
                        style={FeaturedGridStyle.imageContainerOverlay}>
                        <View style={FeaturedGridStyle.topRowContainer}>
                          <View style={FeaturedGridStyle.topRightContent}>




                          </View>
                        </View>


                      </View>

                    </View>

                    <View style={[FeaturedGridStyle.textContainer, { backgroundColor: '#171A1F' }]}>
                      <Text style={[styles.buttonTextStyle, { color: '#fff', fontSize: wp(3), fontWeight: '700' }]}>{item.ad_price.price}
                        {
                          item.ad_price.price_type != undefined && item.ad_price.price_type != null && item.ad_price.price_type != '' ?
                            <Text style={[styles.buttonTextStyle, { color: '#fff' }]}>{' (' + item.ad_price.price_type + ')'}</Text>
                            : null
                        }
                      </Text>
                      <Text style={[FeaturedGridStyle.brandTextStyle, { color: '#fff', fontWeight: '800' }]}>
                        {item.ad_title}
                      </Text>
                      {/* <Text style = {FeaturedGridStyle.modelTextStyle}>
                      {item.ad_desc}
                      </Text> */}

                      <View style={FeaturedGridStyle.locationRowContainer}>
                        <Image
                          style={[FeaturedGridStyle.locationImage, { tintColor: '#fff' }]}
                          source={require('../../../res/images/location_red.png')}
                        />
                        <Text style={[FeaturedGridStyle.locationTextStyle, { tintColor: orderStore.color }]}>
                          {item.ad_location.address}
                        </Text>
                      </View>


                    </View>
                    <View style={[FeaturedGridStyle.milageRow, { backgroundColor: '#101216', padding: wp(1), paddingLeft: wp(2.5) }]} >

                      <View style={FeaturedGridStyle.petrolContainer}>
                        {/* <Image
                          source={require('../../../res/images/petrol_pump_red.png')}
                          style={[FeaturedGridStyle.petrolImageStyle, { tintColor: orderStore.color }]}
                        /> */}
                        <Text
                          style={[FeaturedGridStyle.petrolTextStyle, { color: '#fff' }]}>
                          {item.ad_engine}
                        </Text>
                      </View>
                      {
                        item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                          <Text style={[FeaturedGridStyle.petrolTextStyle, { color: '#fff', marginLeft: wp(2) }]}>|</Text>
                          : []
                      }

                      {
                        item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                          <View style={FeaturedGridStyle.mileageContainer}>

                            <Text
                              style={[FeaturedGridStyle.mileageTextStyle, { color: '#fff' }]}>
                              {item.ad_milage}
                            </Text>
                          </View> : []

                      }


                    </View>
                  </TouchableOpacity>



                }
                keyExtractor={item => item.ad_id + ''}
              >
              </FlatList>






            </View>





          </View>
        );
      case '5':
        return (
          <View >

            <View style={styles.headingWithButtonContainer}>
              <View style={styles.headingContainer}>
                <View>
                  <View style={styles.textRowConrainer}>
                    <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.text}</Text>
                    <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.text2}</Text>
                  </View>

                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.smallButtonContainer, { alignSelf: 'center' }]}
                  onPress={() => { this.onPressViewAll() }}>
                  <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}>
                    <Text style={[styles.buttonTextStyle, { color: '#fff', fontWeight: 'bold' }]}>{data.view_all}</Text>
                  </View>
                </TouchableOpacity>
              </View>



            </View>


            <View style={[styles.featuredGrid, { backgroundColor: '#1d2127',marginLeft:wp(0) }]}>


              <FlatList
                data={data.ads}

                // horizontal={true}
                showsHorizontalScrollIndicator={false}

                renderItem={({ item, index }) =>


                  <TouchableOpacity
                    activeOpacity={1}
                    style={[{ marginTop: wp(4), borderRadius: 0, flexDirection: 'row', backgroundColor: '#f8f8f8' }]}
                    onPress={() => this.onFeaturedGridClick(item)}
                  >

                    <View style={[{
                      height: 100,
                      width: '40%',
                      // overflow: 'hidden',
                      // borderTopRightRadius:Appearences.Radius.radius,
                      // borderTopLeftRadius:Appearences.Radius.radius,
                    }]}>

                      <Image
                        style={[{
                          flex: 1,
                          resizeMode: 'cover', borderTopRightRadius: 0,
                          borderTopLeftRadius: 0,
                        }]}
                        source={{ uri: item.ad_images[0].thumb }} />
                      <View
                        style={FeaturedGridStyle.imageContainerOverlay}>
                        <View style={FeaturedGridStyle.topRowContainer}>
                          <View style={FeaturedGridStyle.topRightContent}>




                          </View>
                        </View>


                      </View>

                    </View>
                    <View style={{ width: '100%',height:100 }}>
                      <View style={[FeaturedGridStyle.textContainer, { width: '100%', backgroundColor: '#fff' }]}>
                        <Text style={[FeaturedGridStyle.brandTextStyle, { fontSize:wp(3),width:wp(50),fontWeight: '800' }]}>
                          {item.ad_title}
                        </Text>
                        <Text style={[styles.buttonTextStyle, { color: 'red', fontSize: wp(2.4), fontWeight: '700' }]}>{item.ad_price.price}
                          {
                            item.ad_price.price_type != undefined && item.ad_price.price_type != null && item.ad_price.price_type != '' ?
                              <Text style={[styles.buttonTextStyle, { color: '#000' }]}>{' (' + item.ad_price.price_type + ')'}</Text>
                              : null
                          }
                        </Text>

                        {/* <Text style = {FeaturedGridStyle.modelTextStyle}>
                      {item.ad_desc}
                      </Text> */}

                        <View style={FeaturedGridStyle.locationRowContainer}>
                          <Image
                            style={[FeaturedGridStyle.locationImage, { tintColor: 'red' }]}
                            source={require('../../../res/images/location_red.png')}
                          />
                          <Text style={[FeaturedGridStyle.locationTextStyle]}>
                            {item.ad_location.address}
                          </Text>
                        </View>


                      </View>
                      <View style={[FeaturedGridStyle.milageRow, { backgroundColor: '#F0F0F0', padding: wp(1), paddingLeft: wp(2.5) }]} >

                        <View style={FeaturedGridStyle.petrolContainer}>
                          {/* <Image
                          source={require('../../../res/images/petrol_pump_red.png')}
                          style={[FeaturedGridStyle.petrolImageStyle, { tintColor: orderStore.color }]}
                        /> */}
                          <Text
                            style={[FeaturedGridStyle.petrolTextStyle]}>
                            {item.ad_engine}
                          </Text>
                        </View>
                        {
                          item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                            <Text style={[FeaturedGridStyle.petrolTextStyle, { marginLeft: wp(2) }]}>|</Text>
                            : []
                        }

                        {
                          item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                            <View style={FeaturedGridStyle.mileageContainer}>

                              <Text
                                style={[FeaturedGridStyle.mileageTextStyle]}>
                                {item.ad_milage}
                              </Text>
                            </View> : []

                        }


                      </View>
                    </View>
                  </TouchableOpacity>



                }
                keyExtractor={item => item.ad_id + ''}
              >
              </FlatList>






            </View>





          </View>
        );
      case '6':
        return (
          <View>
            <View style={styles.headingWithButtonContainer}>
              <View style={styles.headingContainer}>
                <View>
                  <View style={styles.textRowConrainer}>
                    <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.text}</Text>
                    <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.text2}</Text>
                  </View>

                </View>
                <TouchableOpacity
                  activeOpacity={1}
                  style={[styles.smallButtonContainer, { alignSelf: 'center' }]}
                  onPress={() => { this.onPressViewAll() }}>
                  {/* <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}> */}
                  <Text style={[styles.buttonTextStyle, { color: '#fff', fontWeight: 'bold' }]}>{data.view_all}</Text>
                  {/* </View> */}
                </TouchableOpacity>
              </View>



            </View>


            <View style={[styles.featuredGrid, { backgroundColor: '#1D2127',marginLeft:wp(0) }]}>


              <FlatList
                data={data.ads}

                // horizontal={true}
                showsHorizontalScrollIndicator={false}

                renderItem={({ item, index }) =>


                  <TouchableOpacity
                    activeOpacity={1}
                    style={[{ marginTop: wp(4), borderRadius: 0, flexDirection: 'row' }]}
                    onPress={() => this.onFeaturedGridClick(item)}
                  >

                    <View style={[{
                      height: 120,
                      width: '45%',
                      // overflow: 'hidden',
                      // borderTopRightRadius:Appearences.Radius.radius,
                      // borderTopLeftRadius:Appearences.Radius.radius,
                    }]}>

                      <Image
                        style={[{
                          flex: 1,
                          resizeMode: 'cover', borderTopRightRadius: 0,
                          borderTopLeftRadius: 0,
                        }]}
                        source={{ uri: item.ad_images[0].thumb }} />
                      <View
                        style={FeaturedGridStyle.imageContainerOverlay}>
                        <View style={FeaturedGridStyle.topRowContainer}>
                          <View style={FeaturedGridStyle.topRightContent}>




                          </View>
                        </View>


                      </View>

                    </View>
                    <View style={{ width: '100%',height:120 }}>
                      <View style={[FeaturedGridStyle.textContainer, { width: '100%', backgroundColor: '#171A1F' }]}>
                        <Text style={[FeaturedGridStyle.brandTextStyle, { width:wp(50),fontSize:wp(3),color: '#fff', fontWeight: '800' }]}>
                          {item.ad_title}
                        </Text>
                        <Text style={[styles.buttonTextStyle, { color: '#fff', fontSize: wp(2.4), fontWeight: '700' }]}>{item.ad_price.price}
                          {
                            item.ad_price.price_type != undefined && item.ad_price.price_type != null && item.ad_price.price_type != '' ?
                              <Text style={[styles.buttonTextStyle, { color: '#fff' }]}>{' (' + item.ad_price.price_type + ')'}</Text>
                              : null
                          }
                        </Text>

                        {/* <Text style = {FeaturedGridStyle.modelTextStyle}>
                      {item.ad_desc}
                      </Text> */}

                        <View style={FeaturedGridStyle.locationRowContainer}>
                          <Image
                            style={[FeaturedGridStyle.locationImage, { tintColor: '#fff' }]}
                            source={require('../../../res/images/location_red.png')}
                          />
                          <Text style={[FeaturedGridStyle.locationTextStyle, { color: '#fff' }]}>
                            {item.ad_location.address}
                          </Text>
                        </View>


                      </View>
                      <View style={[FeaturedGridStyle.milageRow, { backgroundColor: '#101216', padding: wp(1), paddingLeft: wp(2.5) }]} >

                        <View style={FeaturedGridStyle.petrolContainer}>
                          {/* <Image
                          source={require('../../../res/images/petrol_pump_red.png')}
                          style={[FeaturedGridStyle.petrolImageStyle, { tintColor: orderStore.color }]}
                        /> */}
                          <Text
                            style={[FeaturedGridStyle.petrolTextStyle, { color: '#fff' }]}>
                            {item.ad_engine}
                          </Text>
                        </View>
                        {
                          item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                            <Text style={[FeaturedGridStyle.petrolTextStyle, { color: '#fff', marginLeft: wp(2) }]}>|</Text>
                            : []
                        }

                        {
                          item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
                            <View style={FeaturedGridStyle.mileageContainer}>

                              <Text
                                style={[FeaturedGridStyle.mileageTextStyle, { color: '#fff' }]}>
                                {item.ad_milage}
                              </Text>
                            </View> : []

                        }


                      </View>
                    </View>
                  </TouchableOpacity>



                }
                keyExtractor={item => item.ad_id + ''}
              >
              </FlatList>


            </View>

          </View>
        );
    }
    return (

      <View>


        <View style={styles.headingWithButtonContainer}>
          <View style={styles.headingContainer}>
            <View>
              <View style={styles.textRowConrainer}>
                <Text style={styles.bodyHeadingBlack}>{data.text}</Text>
                <Text style={styles.bodyHeadingAppColor}> {data.text2}</Text>
              </View>

            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.smallButtonContainer}
              onPress={() => { this.onPressViewAll() }}>
              <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}>
                <Text style={styles.buttonTextStyle}>{data.view_all}</Text>

              </View>
            </TouchableOpacity>
          </View>



        </View>


        <View style={[styles.featuredGrid, { backgroundColor: '#fff' }]}>



          {/* featured ads */}

          <FlatList
            data={data.ads}
            // horizontal={true}
            numColumns={2}
            showsHorizontalScrollIndicator={false}

            renderItem={({ item, index }) =>
              <TouchableOpacity
                activeOpacity={1}
                style={[FeaturedGridStyle.container, { marginTop: wp('3'), backgroundColor: '#fff', width: wp('45'), borderTopLeftRadius: wp('3'), borderTopRightRadius: wp('3') }]}
                onPress={() => this.onFeaturedGridClick(item)}
              >
                <View style={[FeaturedGridStyle.imageContainer, { borderTopLeftRadius: wp('3'), borderTopRightRadius: wp('3') }]}>
                  <Image
                    style={FeaturedGridStyle.image}
                    source={{ uri: item.ad_images[0].thumb }} />
                  <View
                    style={FeaturedGridStyle.imageContainerOverlay}>
                    <View style={FeaturedGridStyle.topRowContainer}>
                      {/* <View style={FeaturedGridStyle.topRightContent}>
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
                            source={require('../../../res/images/star_white.png')} />
                        </View>
                      </View> */}
                    </View>
                    {/* <View style={FeaturedGridStyle.bottomRowContainer}>
                      <View style={[FeaturedGridStyle.bottomLeftContent, { backgroundColor: orderStore.color }]}>
                        <Text style={[styles.buttonTextStyle, { fontSize: Appearences.Fonts.headingFontSize, fontWeight: Appearences.Fonts.headingFontWieght }]}>{item.ad_price.price}
                          <Text style={styles.buttonTextStyle}>{' (' + item.ad_price.price_type + ')'}</Text>
                        </Text>
                      </View>
                      <View style={[FeaturedGridStyle.bottomRightContent, { backgroundColor: orderStore.color }]}>
                        <Image
                          style={FeaturedGridStyle.bottomRightContentImage}
                          source={require('../../../res/images/play.png')} />
                      </View>
                    </View> */}
                  </View>


                </View>

                {/* <View style={FeaturedGridStyle.textContainer}>
                  <Text style={FeaturedGridStyle.brandTextStyle}>
                    {item.ad_title}
                  </Text>
            
                  <View style={FeaturedGridStyle.locationRowContainer}>
                    <Image
                      style={[FeaturedGridStyle.locationImage, { tintColor: orderStore.color }]}
                      source={require('../../../res/images/location_red.png')}
                    />
                    <Text style={[FeaturedGridStyle.locationTextStyle, { tintColor: orderStore.color }]}>
                      {item.ad_location.address}
                    </Text>
                  </View>
                  <View style={FeaturedGridStyle.milageRow} >
                    <View style={FeaturedGridStyle.petrolContainer}>
                      <Image
                        source={require('../../../res/images/petrol_pump_red.png')}
                        style={[FeaturedGridStyle.petrolImageStyle, { tintColor: orderStore.color }]}
                      />
                      <Text
                        style={FeaturedGridStyle.petrolTextStyle}>
                        {item.ad_engine}
                      </Text>
                    </View>
                    <View style={FeaturedGridStyle.mileageContainer}>
                      <Image
                        source={require('../../../res/images/meter_red.png')}
                        style={[FeaturedGridStyle.mileageImageStyle, { tintColor: orderStore.color }]}
                      />
                      <Text
                        style={FeaturedGridStyle.mileageTextStyle}>
                        {item.ad_milage}
                      </Text>
                    </View>
                  </View> 
                </View>*/}
                <View style={{ height: wp('26'), width: wp('42'), paddingVertical: wp("4"), borderRadius: wp('2'), marginTop: wp('-5'), paddingHorizontal: wp('2'), alignSelf: 'center', borderWidth: wp('0.3'), borderColor: '#f1f1f1', backgroundColor: "#f8f8f8" }}>
                  <View >
                    <Text style={[styles.buttonTextStyle, { color: 'red', fontSize: wp('3'), fontWeight: '600' }]}>{item.ad_price.price}
                      {
                            item.ad_price.price_type != undefined && item.ad_price.price_type != null && item.ad_price.price_type !='' ?
                            <Text style={[styles.buttonTextStyle, { color: '#000', fontSize: wp('2.4') }]}>{' (' + item.ad_price.price_type + ')'}</Text>
                            :null
                      }
                    </Text>
                    <Text style={[FeaturedGridStyle.brandTextStyle, { maxHeight: wp('9'), marginTop: wp('1'), width: wp('38') }]}>
                      {item.ad_title}
                    </Text>
                    <View style={[FeaturedGridStyle.locationRowContainer, { height: wp('8'), width: wp('38') }]}>
                      <Image
                        style={[FeaturedGridStyle.locationImage, { tintColor: orderStore.color }]}
                        source={require('../../../res/images/location_red.png')}
                      />
                      <Text style={[FeaturedGridStyle.locationTextStyle, { width: wp('33'), tintColor: orderStore.color }]}>
                        {item.ad_location.address}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>



            }
            keyExtractor={item => item.ad_id + ''}
          >
          </FlatList>

          {/* ///////////// */}

        </View>





      </View>

    );


  }
  renderFearuredMaker = () => {
    let { orderStore } = Store;
    const data = orderStore.home;
    if (!orderStore.home.featured_makes_is_show)
      return null;

    let makeType = orderStore.makeType

    switch (makeType) {
      case '1':
        return (
          <View>


            <View style={styles.headingContainer}>
              <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.featured_makes_txt1}</Text>
              <Text style={[styles.bodyHeadingAppColor, { color: "#fff" }]}> {data.featured_makes_txt2}</Text>
            </View>



            <View style={styles.featuredMakersListContainer}>
              <FlatList
                data={data.featured_makes}
                horizontal
                renderItem={({ item, key }) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={async () => {

                      const params = { ad_cats1: item.cat_id }

                      const { navigate } = this.props.navigation;
                      await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
                      let { orderStore } = Store;
                      orderStore.setIsCallAdvance(false);
                      navigate('SearchDetail', { params: params });

                    }}
                    key={key}
                    style={[{
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white',
                      marginHorizontal: 5,
                      marginVertical: 5,
                      //  elevation   : Appearences.Shadow.elevation,
                      //  shadowOpacity: Appearences.Shadow.shadow,
                      padding: 10,
                      borderRadius: 5,
                    }, { backgroundColor: '#f8f8f8', borderWidth: wp('0.3'), borderColor: '#f1f1f1', flexDirection: 'row', paddingHorizontal: wp('4'), paddingVertical: wp('2') }]}
                  // style={data.featured_makes_column === "3" ? MakersTypeStyle.containerThreeRows : MakersTypeStyle.container}
                  >
                    <Animatable.View
                      duration={2000}
                      animation="zoomIn"
                      iterationCount={1}
                      direction="alternate">
                      <Image
                        style={[MakersTypeStyle.image, { height: wp('8'), width: wp('8') }]}
                        // style={data.featured_makes_column === "3" ? MakersTypeStyle.imageThreeRows : MakersTypeStyle.image}
                        source={{ uri: item.img }}
                      />
                    </Animatable.View>
                    <View style={{ marginLeft: wp('2'), }}>
                      <Text
                        style={[MakersTypeStyle.text, { fontSize: wp('3.2'), fontWeight: '800' }]}>
                        {item.name}
                      </Text>
                      <Text style={[FeaturedTypeStyle.text, { fontSize: wp('2.2') }]}>
                         {item.cat_count} {data.featured_cat_count}
                      </Text>
                    </View>

                  </TouchableOpacity>

                )}
                //Setting the number of column
                // numColumns={data.featured_makes_column === "3" ? 3 : 4}
                keyExtractor={(item, index) => index}
              />

            </View>

          </View>
        );
      case '2':
        return (
          <View style={{ backgroundColor: '#1d2127', marginTop: wp(2), paddingLeft: wp(1) }}>


            <View style={styles.headingContainer}>
              <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.featured_makes_txt1}</Text>
              <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.featured_makes_txt2}</Text>
            </View>



            <View style={styles.featuredMakersListContainer}>
              <FlatList
                data={data.featured_makes}
                horizontal
                renderItem={({ item, key }) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={async () => {

                      const params = { ad_cats1: item.cat_id }

                      const { navigate } = this.props.navigation;
                      await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
                      let { orderStore } = Store;
                      orderStore.setIsCallAdvance(false);
                      navigate('SearchDetail', { params: params });

                    }}
                    key={key}
                    style={MakersTypeStyle.container}>
                    <Animatable.View
                      duration={2000}
                      animation="zoomIn"
                      iterationCount={1}
                      direction="alternate">
                      <Image
                        style={MakersTypeStyle.image}
                        source={{ uri: item.img }}
                      />
                    </Animatable.View>
                    <Text
                      style={MakersTypeStyle.text}>
                      {item.name}
                    </Text>
                    <Text
                      style={{ fontSize: wp(2) }}>
                       {item.cat_count} {data.featured_cat_count}
                    </Text>
                  </TouchableOpacity>

                )}
                //Setting the number of column
                keyExtractor={(item, index) => index}
              />

            </View>

          </View>
        );
      case '3':
        return (
          <View style={{ backgroundColor: '#1D2127', marginTop: wp(2), paddingLeft: wp(1) }}>


            <View style={styles.headingContainer}>
              <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.featured_makes_txt1}</Text>
              <Text style={styles.bodyHeadingAppColor, { color: '#fff' }}> {data.featured_makes_txt2}</Text>
            </View>



            <View style={[styles.featuredMakersListContainer]}>
              <FlatList
                data={data.featured_makes}
                horizontal
                renderItem={({ item, key }) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={async () => {

                      const params = { ad_cats1: item.cat_id }

                      const { navigate } = this.props.navigation;
                      await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
                      let { orderStore } = Store;
                      orderStore.setIsCallAdvance(false);
                      navigate('SearchDetail', { params: params });

                    }}
                    key={key}
                    style={[MakersTypeStyle.container, { backgroundColor: '#101216' }]}>
                    <Animatable.View
                      duration={2000}
                      animation="zoomIn"
                      iterationCount={1}
                      direction="alternate">
                      <Image
                        style={MakersTypeStyle.image}
                        source={{ uri: item.img }}
                      />
                    </Animatable.View>
                    <Text
                      style={[MakersTypeStyle.text, { color: '#fff' }]}>
                      {item.name}
                    </Text>
                    <Text
                      style={{ fontSize: wp(2), color: '#fff' }}>
                       {item.cat_count} {data.featured_cat_count}
                    </Text>
                  </TouchableOpacity>

                )}
                //Setting the number of column
                keyExtractor={(item, index) => index}
              />

            </View>

          </View>
        );
    }

    return (

      <View>


        <View style={styles.headingContainer}>
          <Text style={styles.bodyHeadingBlack}>{data.featured_makes_txt1}</Text>
          <Text style={styles.bodyHeadingAppColor}> {data.featured_makes_txt2}</Text>
        </View>



        <View style={styles.featuredMakersListContainer}>
          <FlatList
            data={data.featured_makes}
            horizontal
            renderItem={({ item, key }) => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={async () => {

                  const params = { ad_cats1: item.cat_id }

                  const { navigate } = this.props.navigation;
                  await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
                  let { orderStore } = Store;
                  orderStore.setIsCallAdvance(false);
                  navigate('SearchDetail', { params: params });

                }}
                key={key}
                style={[{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  marginHorizontal: 5,
                  marginVertical: 5,
                  //  elevation   : Appearences.Shadow.elevation,
                  //  shadowOpacity: Appearences.Shadow.shadow,
                  padding: 10,
                  borderRadius: 5,
                }, { backgroundColor: '#f8f8f8', borderWidth: wp('0.3'), borderColor: '#f1f1f1', flexDirection: 'row', paddingHorizontal: wp('4'), paddingVertical: wp('2') }]}
              // style={data.featured_makes_column === "3" ? MakersTypeStyle.containerThreeRows : MakersTypeStyle.container}
              >
                <Animatable.View
                  duration={2000}
                  animation="zoomIn"
                  iterationCount={1}
                  direction="alternate">
                  <Image
                    style={[MakersTypeStyle.image, { height: wp('8'), width: wp('8') }]}
                    // style={data.featured_makes_column === "3" ? MakersTypeStyle.imageThreeRows : MakersTypeStyle.image}
                    source={{ uri: item.img }}
                  />
                </Animatable.View>
                <View style={{ marginLeft: wp('2'), }}>
                  <Text
                    style={[MakersTypeStyle.text, { fontSize: wp('3.2'), fontWeight: '800' }]}>
                    {item.name}
                  </Text>
                  <Text style={[FeaturedTypeStyle.text, { fontSize: wp('2.2') }]}>
                     {item.cat_count} {data.featured_cat_count}
                  </Text>
                </View>

              </TouchableOpacity>

            )}
            //Setting the number of column
            // numColumns={data.featured_makes_column === "3" ? 3 : 4}
            keyExtractor={(item, index) => index}
          />

        </View>


      </View>

    );

  }




  // renderBodyType = () => {
  //   let { orderStore } = Store;
  //   const data = orderStore.home;
  //   if (!data.body_type_is_show)
  //     return null;
  //   return (<View>




  //     <View style={styles.headingContainer}>
  //       <Text style={[styles.bodyHeadingBlack, { color: "#fff" }]}>{data.body_type_txt1}</Text>
  //       <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.body_type_txt2}</Text>
  //     </View>
  //     <View style={styles.startPadding}>


  //     </View>
  //     <View style={styles.featuredTypeListContainer}>


  //       <FlatList
  //         data={data.body_type_icons}
  //         horizontal={true}
  //         showsHorizontalScrollIndicator={false}

  //         ref={(ref) => { this.flatListRef = ref; }}
  //         renderItem={({ item, index }) =>

  //           <TouchableOpacity
  //             activeOpacity={1}
  //             onPress={() => this.onFeaturedTypeClick(item)}
  //             style={[{ alignContent: 'center', alignItems: 'center' }]}
  //           >
  //             <Animatable.View
  //               duration={2000}
  //               animation="zoomIn"
  //               iterationCount={1}
  //               style={[FeaturedTypeStyle.container, { paddingHorizontal: wp('2'), paddingVertical: wp('0'), backgroundColor: '#171A1F' }]}
  //               direction="alternate">
  //               <Image
  //                 style={FeaturedTypeStyle.image}
  //                 source={{ uri: item.img }} />
  //             </Animatable.View>

  //             <Text style={[FeaturedTypeStyle.text, { color: '#fff' }]}>
  //               {item.name}
  //             </Text>



  //           </TouchableOpacity>
  //         }
  //         keyExtractor={item => item.body_type_id + ''}
  //       >
  //       </FlatList>

  //     </View>

  //   </View>);

  // }

  // renderFeaturedAdsGrid = () => {
  //   let { orderStore } = Store;
  //   if (!orderStore.home.is_show_featured)
  //     return null;
  //   const data = orderStore.home.featured_ads;
  //   return (

  //     <View>


  //       <View style={styles.headingWithButtonContainer}>
  //         <View style={styles.headingContainer}>
  //           <View>
  //             <View style={styles.textRowConrainer}>
  //               <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.text}</Text>
  //               <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.text2}</Text>
  //             </View>

  //           </View>
  //           <TouchableOpacity
  //             activeOpacity={1}
  //             style={[styles.smallButtonContainer, { alignSelf: 'center' }]}
  //             onPress={() => { this.onPressViewAll() }}>
  //             {/* <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}> */}
  //             <Text style={[styles.buttonTextStyle, { color: '#fff', fontWeight: 'bold' }]}>{data.view_all}</Text>
  //             {/* </View> */}
  //           </TouchableOpacity>
  //         </View>



  //       </View>


  //       <View style={[styles.featuredGrid, { backgroundColor: '#1D2127' }]}>


  //         <FlatList
  //           data={data.ads}

  //           // horizontal={true}
  //           showsHorizontalScrollIndicator={false}

  //           renderItem={({ item, index }) =>


  //             <TouchableOpacity
  //               activeOpacity={1}
  //               style={[{ marginTop: wp(4), borderRadius: 0, flexDirection: 'row' }]}
  //               onPress={() => this.onFeaturedGridClick(item)}
  //             >

  //               <View style={[{
  //                 height: 120,
  //                 width: '45%',
  //                 // overflow: 'hidden',
  //                 // borderTopRightRadius:Appearences.Radius.radius,
  //                 // borderTopLeftRadius:Appearences.Radius.radius,
  //               }]}>

  //                 <Image
  //                   style={[{
  //                     flex: 1,
  //                     resizeMode: 'cover', borderTopRightRadius: 0,
  //                     borderTopLeftRadius: 0,
  //                   }]}
  //                   source={{ uri: item.ad_images[0].thumb }} />
  //                 <View
  //                   style={FeaturedGridStyle.imageContainerOverlay}>
  //                   <View style={FeaturedGridStyle.topRowContainer}>
  //                     <View style={FeaturedGridStyle.topRightContent}>




  //                     </View>
  //                   </View>


  //                 </View>

  //               </View>
  //               <View style={{width:'100%'}}>
  //                 <View style={[FeaturedGridStyle.textContainer, { width:'100%',backgroundColor: '#171A1F' }]}>
  //                 <Text style={[FeaturedGridStyle.brandTextStyle, { color: '#fff', fontWeight: '800' }]}>
  //                     {item.ad_title}
  //                   </Text>
  //                   <Text style={[styles.buttonTextStyle, { color: '#fff', fontSize: wp(2.4), fontWeight: '700' }]}>{item.ad_price.price}
  //                     {
  //                       item.ad_price.price_type != undefined && item.ad_price.price_type != null && item.ad_price.price_type != '' ?
  //                         <Text style={[styles.buttonTextStyle, { color: '#fff' }]}>{' (' + item.ad_price.price_type + ')'}</Text>
  //                         : null
  //                     }
  //                   </Text>

  //                   {/* <Text style = {FeaturedGridStyle.modelTextStyle}>
  //                 {item.ad_desc}
  //                 </Text> */}

  //                   <View style={FeaturedGridStyle.locationRowContainer}>
  //                     <Image
  //                       style={[FeaturedGridStyle.locationImage, { tintColor: '#fff' }]}
  //                       source={require('../../../res/images/location_red.png')}
  //                     />
  //                     <Text style={[FeaturedGridStyle.locationTextStyle, { color: '#fff' }]}>
  //                       {item.ad_location.address}
  //                     </Text>
  //                   </View>


  //                 </View>
  //                 <View style={[FeaturedGridStyle.milageRow, { backgroundColor: '#101216', padding: wp(1), paddingLeft: wp(2.5) }]} >

  //                   <View style={FeaturedGridStyle.petrolContainer}>
  //                     {/* <Image
  //                     source={require('../../../res/images/petrol_pump_red.png')}
  //                     style={[FeaturedGridStyle.petrolImageStyle, { tintColor: orderStore.color }]}
  //                   /> */}
  //                     <Text
  //                       style={[FeaturedGridStyle.petrolTextStyle, { color: '#fff' }]}>
  //                       {item.ad_engine}
  //                     </Text>
  //                   </View>
  //                   {
  //                     item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
  //                       <Text style={[FeaturedGridStyle.petrolTextStyle, { color: '#fff', marginLeft: wp(2) }]}>|</Text>
  //                       : []
  //                   }

  //                   {
  //                     item.ad_milage != undefined && item.ad_milage != null && item.ad_milage != "" ?
  //                       <View style={FeaturedGridStyle.mileageContainer}>

  //                         <Text
  //                           style={[FeaturedGridStyle.mileageTextStyle, { color: '#fff' }]}>
  //                           {item.ad_milage}
  //                         </Text>
  //                       </View> : []

  //                   }


  //                 </View>
  //               </View>
  //             </TouchableOpacity>



  //           }
  //           keyExtractor={item => item.ad_id + ''}
  //         >
  //         </FlatList>






  //       </View>





  //     </View>

  //   );


  // }


  // renderFearuredMaker = () => {
  //   let { orderStore } = Store;
  //   const data = orderStore.home;
  //   if (!orderStore.home.featured_makes_is_show)
  //     return null;
  //   return (

  //     <View>


  //       <View style={styles.headingContainer}>
  //         <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.featured_makes_txt1}</Text>
  //         <Text style={styles.bodyHeadingAppColor, { color: '#fff' }}> {data.featured_makes_txt2}</Text>
  //       </View>



  //       <View style={[styles.featuredMakersListContainer]}>
  //         <FlatList
  //           data={data.featured_makes}
  //           horizontal
  //           renderItem={({ item, key }) => (
  //             <TouchableOpacity
  //               activeOpacity={1}
  //               onPress={async () => {

  //                 const params = { ad_cats1: item.cat_id }

  //                 const { navigate } = this.props.navigation;
  //                 await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  //                 let { orderStore } = Store;
  //                 orderStore.setIsCallAdvance(false);
  //                 navigate('SearchDetail', { params: params });

  //               }}
  //               key={key}
  //               style={[MakersTypeStyle.container, { backgroundColor: '#101216' }]}>
  //               <Animatable.View
  //                 duration={2000}
  //                 animation="zoomIn"
  //                 iterationCount={1}
  //                 direction="alternate">
  //                 <Image
  //                   style={MakersTypeStyle.image}
  //                   source={{ uri: item.img }}
  //                 />
  //               </Animatable.View>
  //               <Text
  //                 style={[MakersTypeStyle.text, { color: '#fff' }]}>
  //                 {item.name}
  //               </Text>
  //               <Text
  //                 style={{ fontSize: wp(2), color: '#fff' }}>
  //                  {item.cat_count} ads
  //               </Text>
  //             </TouchableOpacity>

  //           )}
  //           //Setting the number of column
  //           keyExtractor={(item, index) => index}
  //         />

  //       </View>

  //     </View>

  //   );

  // }

  renderLatestAds = () => {
    let { orderStore } = Store;


    const data = orderStore.home.latest_ads;
    if (!orderStore.home.is_show_latest)
      return null;
    return (

      <View>



        <View style={styles.headingWithButtonContainer}>
          <View style={styles.headingContainer}>
            <View>
              <View style={styles.textRowConrainer}>
                <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.text}</Text>
                <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.text2}</Text>
              </View>


            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.smallButtonContainer, { alignSelf: 'center' }]}
              onPress={() => {
                this.onPressViewAll();
              }}>
              {/* <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}> */}
              <Text style={styles.buttonTextStyle}>{data.view_all}</Text>
              {/* </View> */}
            </TouchableOpacity>
          </View>



        </View>


        <View style={styles.popularCars}>




          <FlatList
            data={data.ads}
            horizontal={false}
            showsVerticalScrollIndicator={false}

            renderItem={({ item, index }) =>

              <TouchableOpacity
                activeOpacity={1}
                onPress={async () => {
                  const { navigate } = this.props.navigation;
                  await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton)

                  navigate('AdDetailTabManager', { adId: item.ad_id });
                }}
                style={[PopularCarsStyle.container, { backgroundColor: '#101216' }]}>

                <View style={PopularCarsStyle.imageContainer}>

                  <Image
                    style={PopularCarsStyle.image}
                    source={{ uri: item.ad_images[0].thumb }} />
                  <View
                    style={PopularCarsStyle.imageContainerOverlay}>
                    <View style={PopularCarsStyle.topRowContainer}>
                      <View style={FeaturedGridStyle.topRightContent}>

                      </View>
                    </View>


                    {/* <View style = {PopularCarsStyle.bottomRowContainer}>
                                <View style = {[PopularCarsStyle.bottomLeftContent,{backgroundColor:orderStore.color}]}>
                                  <Image
                                    style = {PopularCarsStyle.bottomLeftContentImage} 
                                    source = {require('../../../res/images/play.png')}/>
                                </View>
                                
                              
                              </View> */}
                  </View>

                </View>

                <View style={PopularCarsStyle.textContainer}>
                  <Text
                    adjustsFontSizeToFit
                    numberOfLines={1}
                    style={[PopularCarsStyle.brandTitleStyle, { color: '#fff' }]}>
                    {item.ad_title}
                  </Text>
                  <Text
                    style={PopularCarsStyle.modelTextStyle}>
                    {item.ad_desc}
                  </Text>
                  <Text
                    style={PopularCarsStyle.brandTextStyle}>
                    {item.ad_engine + ' | ' + item.ad_milage}
                  </Text>
                  <Text
                    style={[PopularCarsStyle.priceTextStyle, { color: orderStore.color, fontSize: Appearences.Fonts.headingFontSize, fontWeight: Appearences.Fonts.headingFontWieght }]}>
                    {item.ad_price.price}
                    {
                            item.ad_price.price_type != undefined && item.ad_price.price_type != null && item.ad_price.price_type != '' ?
                            
                    <Text style={PopularCarsStyle.priceTextStyle}>{' (' + item.ad_price.price_type + ')'} </Text> : null}
                  </Text>

                </View>


              </TouchableOpacity>

            }
            keyExtractor={item => item.ad_id + ''}
          >
          </FlatList>



        </View>




      </View>

    );


  }
  renderExplore = () => {

    const horizontalMargin = 1;
    const slideWidth = 270;

    const sliderWidth = Dimensions.get('window').width;
    const itemWidth = slideWidth + horizontalMargin * 2;
    let { orderStore } = Store;
    const data = orderStore.home;

    if (!orderStore.home.locations_is_show)
      return null;
    return (

      <View>


        <View style={styles.headingWithButtonContainer}>
          <View style={styles.headingContainer}>
            <View>
              <View style={styles.textRowConrainer}>
                <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.locations_txt1}</Text>
                <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.locations_txt2}</Text>
              </View>


            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.smallButtonContainer, { alignSelf: 'center' }]}
              onPress={() => { this.onPressViewAll() }}>
              {/* <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}> */}
              <Text style={styles.buttonTextStyle}>{data.view_all}</Text>
              {/* </View> */}
            </TouchableOpacity>
          </View>



        </View>





        <View style={styles.exploreCountry}>

          <Carousel
            layout={'default'}
            loop={true}
            data={data.locations.slice()}
            renderItem={({ item, index }) =>

              <TouchableOpacity
                onPress={async () => {
                  const params = { ad_country: item.loc_id }

                  const { navigate } = this.props.navigation;
                  await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
                  let { orderStore } = Store;
                  orderStore.setIsCallAdvance(false);
                  navigate('SearchDetail', { params: params });



                }}
                activeOpacity={1}
                style={ExploreCountryStyle.container}>



                <View style={ExploreCountryStyle.imageContainer}>

                  <Image
                    style={ExploreCountryStyle.image}
                    source={{ uri: item.img }} />
                  <View style={ExploreCountryStyle.imageContainer} />
                </View>

                <View style={ExploreCountryStyle.textContainer}>
                  <Text style={ExploreCountryStyle.cityTextStyle}>
                    {item.name}
                  </Text>
                  <Text style={ExploreCountryStyle.countryTextStyle}>
                    {item.count}
                  </Text>
                </View>

              </TouchableOpacity>

            }
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            keyExtractor={item => item.cat_id + ''} >
          </Carousel>

        </View>






      </View>


    );
  }
  renderComparison = () => {
    let { orderStore } = Store;
    const data = orderStore.home.comparisonData;
    if (orderStore.home.comparisonData == undefined)
    return null;

      if (!data.comp_is_show)
      return null;
    return (

      <View>



        <View style={styles.headingWithButtonContainer}>
          <View style={styles.headingContainer}>

            <View>
              <View style={styles.textRowConrainer}>
                <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.txt1}</Text>
                <Text style={[styles.bodyHeadingAppColor, { color: '#fff' }]}> {data.txt2}</Text>
              </View>


            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.smallButtonContainer}
              onPress={() => { this.onPressViewAll() }}>
              {/* <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}> */}
              <Text style={[styles.buttonTextStyle, { alignSelf: 'center' }]}>{data.view_all}</Text>
              {/* </View> */}
            </TouchableOpacity>
          </View>



        </View>

        <View>


          <FlatList
            data={data.comparison}
            horizontal={false}
            showsHorizontalScrollIndicator={false}

            renderItem={({ item, index }) =>



              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.onTopCarsClick(item)}
                style={[TopCars.listItemContainer, { backgroundColor: '#101216' }]}>


                <View style={TopCars.listContentContainer}>
                  <View style={TopCars.imageContaner}>
                    <Image
                      style={TopCars.image}
                      source={{ uri: item[0].image }}
                    />
                  </View>
                  <View style={TopCars.bottomRowContainer}>
                    <Text style={[TopCars.heaedrText, { color: '#fff' }]}>{item[0].title}</Text>
                    <View style={TopCars.ratingBarContainer}>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={parseInt(item[0].rating)}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                        starSize={14}
                        fullStarColor='#D4AF37'
                      />
                    </View>
                  </View>
                </View>

                <View style={TopCars.listMiddleContainer}>
                  <View style={TopCars.circle}>
                    <Text style={TopCars.vsText}>{data.vs_txt}</Text>
                  </View>
                </View>






                <View style={TopCars.listContentContainer}>
                  <View style={TopCars.imageContaner}>
                    <Image
                      style={TopCars.image}
                      source={{ uri: item[1].image }}
                    />
                  </View>
                  <View style={TopCars.bottomRowContainer}>
                    <Text style={[TopCars.heaedrText, { color: "#fff" }]}>{item[1].title}</Text>
                    <View style={TopCars.ratingBarContainer}>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={parseInt(item[1].rating)}
                        selectedStar={(rating) => this.onStarRatingPress(rating)}
                        starSize={14}
                        fullStarColor='#D4AF37'
                      />
                    </View>
                  </View>
                </View>




              </TouchableOpacity>





            }
            keyExtractor={item => item[0].post_id + ""}
          >
          </FlatList>




        </View>




      </View>

    );
  
  

  }
  renderBlog = () => {
    let { orderStore } = Store;
    const data = orderStore.home.latest_blog;
    if (!orderStore.home.is_show_blog)
      return null;

    return (
      <View>
        <View style={styles.headingWithButtonContainer}>
          <View style={styles.headingContainer}>
            <View>
              <View style={styles.textRowConrainer}>
                <Text style={[styles.bodyHeadingBlack, { color: '#fff' }]}>{data.text}</Text>
                <Text style={styles.bodyHeadingAppColor}> </Text>
              </View>


            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.smallButtonContainer, { alignSelf: 'center' }]}
              onPress={() => { }}>
              {/* <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}> */}
              <Text style={styles.buttonTextStyle}>{orderStore.home.view_all}</Text>
              {/* </View> */}
            </TouchableOpacity>
          </View>



        </View>

        <View style={styles.listRowContainer}>
          <FlatList
            contentContainerStyle={{

            }}
            data={data.blogs}
            renderItem={({ item, key }) => (
              <TouchableOpacity
                activeOpacity={1}
                style={[styles.listItemContainer, { backgroundColor: '#101216' }]}
                onPress={async () => {
                  const { navigate } = this.props.navigation;
                  await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);

                  navigate('BlogDetail', { id: item.post_id });

                }}
                key={key}
              >
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.image }}
                  />
                </View>
                <View style={styles.contentContainer}>
                  <Text style={[styles.paragraphText, { color: '#fff', marginTop: 0 }]}>{item.date}</Text>
                  <Text style={[styles.headingText, { color: "#fff" }]}>{item.title}</Text>
                  {/* <Text style = {styles.paragraphText}>{item.details.length > 20 ? item.details.substring(0, 20)+" ..." : item.details}</Text>
              <View 
              style = {[styles.buttonContainer,{backgroundColor:orderStore.color}]}>
                <Text style = {styles.headingTextWhite}>{item.read_more}</Text>
              </View> */}
                </View>
              </TouchableOpacity>


            )}
            //Setting the number of column
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
        </View>
      </View>
    )


  }
  _onRefresh = async () => {
    await this.setState({ refreshing: true });

    setTimeout(async () => {

      this.setState({ showSpinner: true });
      let { orderStore } = Store;
      const response = await Api.get('home');
      if (response.success === true) {
        orderStore.drawerMenu = response.data.menu.home_menu

        orderStore.home = response.data;

        orderStore.bodyType = response.data.api_body_sec_views;
        orderStore.featuredListingType = response.data.api_list_sec_views;
        orderStore.makeType = response.data.api_body_make_views;

        this.jobsPositions = response.data.ads_position;
      }
      if (response.message.length != 0)
        Toast.show(response.message);
      this.setState({ showSpinner: false, refreshing: false });

    }, 1000);

  }

  render() {

    if (this.state.showSpinner)
      return (
        <Loader />

      );

    let { orderStore } = Store;
    const data = orderStore.home;


    return (
      <ScrollView contentContainerStyle={{
        backgroundColor: '#1D2127',
        paddingBottom: 15,
      }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={{ marginLeft: wp('4'), marginTop: wp('5') }}>
          <Text style={{ color: '#fff', fontSize: wp('5'), fontWeight: 'bold' }}>{data.home_thme_header_title}</Text>
          <Text style={{ color: '#fff', fontSize: wp('3') }}>{data.home_thme_header_sub_title}</Text>
        </View>
        {/* <View> */}
        {/* Header Start */}
        {/* <View style={styles.header}> */}

        {/* <Image source={{ uri: data.img }}
              style={styles.headerImage}>
            </Image> */}


        {/* </View> */}
        {/*Header End*/}
        {/* </View> */}

        <View style={[styles.container, { backgroundColor: 'F0F0F0' }]}>



          {/*Body Start*/}


          <View style={styles.body}>



            <View
              style={{
                marginTop: 5,
                backgroundColor: '#1D2127',
                paddingStart: 15,
                paddingEnd: 15,
              }}
            >
              {this.renderFearuredMaker()}
              {this.renderFeaturedAdsGrid()}

              {this.renderBodyType()}
              {this.renderLatestAds()}
              {this.renderExplore()}
              {this.renderComparison()}
              {this.renderBlog()}
            </View>



          </View>
          {/*Body End*/}



        </View>
      </ScrollView>
    );

  }

  onStarRatingPress(rating) {
    console.log("Rating is: " + rating)
  }
}





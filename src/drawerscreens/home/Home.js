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
import { NavigationActions, StackActions } from 'react-navigation';


@observer
export default class Home extends Component<Props> {


  componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    // console.log('this props',this.props.getParam('callbackss'))
  }

  nav = (route, title) => {
    firebase.analytics().setCurrentScreen(title);

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    // console.log('title is',title)
    this.props.navigation.setParams({ otherParam: title });
    this.props.navigation.dispatch(navigateAction);
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
      // orderStore.drawerMenu=response.data.menu.home_menu
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
              style={FeaturedTypeStyle.container}>
              <Animatable.View
                duration={2000}
                animation="zoomIn"
                iterationCount={1}
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


      {orderStore.isPublicProfile ? null :
        <TouchableOpacity style={styles.buttonRow}
          activeOpacity={1}

          onPress={async () => {
            await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);

            this.props.navigation.navigate("Selll");
          }}>
          <View
            style={[styles.button, { backgroundColor: orderStore.color }]}>
            <Text style={styles.buttonTextStyle}>{data.extra.ad_post}</Text>
          </View>
        </TouchableOpacity>

      }








    </View>);

  }

  renderFeaturedAdsGrid = () => {
    let { orderStore } = Store;
    if (!orderStore.home.is_show_featured)
      return null;
    const data = orderStore.home.featured_ads;
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


        <View style={styles.featuredGrid}>


          <FlatList
            data={data.ads}
            horizontal={true}
            showsHorizontalScrollIndicator={false}

            renderItem={({ item, index }) =>


              <TouchableOpacity
                activeOpacity={1}
                style={FeaturedGridStyle.container}
                onPress={() => this.onFeaturedGridClick(item)}
              >

                <View style={FeaturedGridStyle.imageContainer}>

                  <Image
                    style={FeaturedGridStyle.image}
                    source={{ uri: item.ad_images[0].thumb }} />
                  <View
                    style={FeaturedGridStyle.imageContainerOverlay}>
                    <View style={FeaturedGridStyle.topRowContainer}>
                      <View style={FeaturedGridStyle.topRightContent}>
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

                      </View>
                    </View>
                    <View style={FeaturedGridStyle.bottomRowContainer}>
                      <View style={[FeaturedGridStyle.bottomLeftContent, { backgroundColor: orderStore.color }]}>
                        <Text style={[styles.buttonTextStyle, { fontSize: Appearences.Fonts.headingFontSize, fontWeight: Appearences.Fonts.headingFontWieght }]}>{item.ad_price.price}
                          {
                            item.ad_price.price_type != undefined && item.ad_price.price_type != null && item.ad_price.price_type != '' ?
                              <Text style={styles.buttonTextStyle}>{' (' + item.ad_price.price_type + ')'}</Text>
                              : null
                          }
                        </Text>
                      </View>

                      <View style={[FeaturedGridStyle.bottomRightContent, { backgroundColor: orderStore.color }]}>
                        <Image
                          style={FeaturedGridStyle.bottomRightContentImage}
                          source={require('../../../res/images/play.png')} />
                      </View>
                    </View>
                  </View>

                </View>

                <View style={FeaturedGridStyle.textContainer}>

                  <Text style={FeaturedGridStyle.brandTextStyle}>
                    {item.ad_title}
                  </Text>
                  {/* <Text style = {FeaturedGridStyle.modelTextStyle}>
                  {item.ad_desc}
                  </Text> */}

                  {
                    item.ad_location.address != undefined && item.ad_location.address != null && item.ad_location.address != "" ?
                      <View style={FeaturedGridStyle.locationRowContainer}>
                        <Image
                          style={[FeaturedGridStyle.locationImage, { tintColor: orderStore.color }]}
                          source={require('../../../res/images/location_red.png')}
                        />
                        <Text style={[FeaturedGridStyle.locationTextStyle, { tintColor: orderStore.color }]}>
                          {item.ad_location.address}
                        </Text>
                      </View>
                      : null
                  }

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

  renderFearuredMaker = () => {
    let { orderStore } = Store;
    const data = orderStore.home;
    if (!orderStore.home.featured_makes_is_show)
      return null;
    return (

      <View>


        <View style={styles.headingContainer}>
          <Text style={styles.bodyHeadingBlack}>{data.featured_makes_txt1}</Text>
          <Text style={styles.bodyHeadingAppColor}> {data.featured_makes_txt2}</Text>
        </View>



        <View style={styles.featuredMakersListContainer}>
          <FlatList
            data={data.featured_makes}
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
                style={data.featured_makes_column === "3" ? MakersTypeStyle.containerThreeRows : MakersTypeStyle.container}>
                <Animatable.View
                  duration={2000}
                  animation="zoomIn"
                  iterationCount={1}
                  direction="alternate">
                  <Image
                    style={data.featured_makes_column === "3" ? MakersTypeStyle.imageThreeRows : MakersTypeStyle.image}
                    source={{ uri: item.img }}
                  />
                </Animatable.View>
                <Text
                  style={MakersTypeStyle.text}>
                  {item.name}
                </Text>
              </TouchableOpacity>

            )}
            //Setting the number of column
            numColumns={data.featured_makes_column === "3" ? 3 : 4}
            keyExtractor={(item, index) => index}
          />

        </View>

        {data.featured_makes_view_all.length === 0 || data.featured_makes_view_all.length === undefined || data.featured_makes_view_all.length === null ? "" :
          <TouchableOpacity
            activeOpacity={1}
            style={styles.buttonRow}
            onPress={async () => {
              let param = { ad_title: '' }
              const { navigate } = this.props.navigation;
              await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
              let { orderStore } = Store;
              orderStore.setIsCallAdvance(false);
              navigate('SearchDetail', { params: param });
            }}>
            <View
              style={[styles.button, { backgroundColor: orderStore.color }]}>
              <Text style={styles.buttonTextStyle}>{data.featured_makes_view_all}</Text>
            </View>
          </TouchableOpacity>
        }
      </View>

    );

  }

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
                <Text style={styles.bodyHeadingBlack}>{data.text}</Text>
                <Text style={styles.bodyHeadingAppColor}> {data.text2}</Text>
              </View>


            </View>
            <TouchableOpacity
              activeOpacity={1}
              style={styles.smallButtonContainer}
              onPress={() => {
                this.onPressViewAll();
              }}>
              <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}>
                <Text style={styles.buttonTextStyle}>{data.view_all}</Text>
              </View>
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
                style={PopularCarsStyle.container}>

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
                    style={PopularCarsStyle.brandTitleStyle}>
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
                <Text style={styles.bodyHeadingBlack}>{data.locations_txt1}</Text>
                <Text style={styles.bodyHeadingAppColor}> {data.locations_txt2}</Text>
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

    if (!data.comp_is_show)
      return null;
    return (

      <View>



        <View style={styles.headingWithButtonContainer}>
          <View style={styles.headingContainer}>

            <View>
              <View style={styles.textRowConrainer}>
                <Text style={styles.bodyHeadingBlack}>{data.txt1}</Text>
                <Text style={styles.bodyHeadingAppColor}> {data.txt2}</Text>
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

        <View>


          <FlatList
            data={data.comparison}
            horizontal={false}
            showsHorizontalScrollIndicator={false}

            renderItem={({ item, index }) =>



              <TouchableOpacity
                activeOpacity={1}
                onPress={() => this.onTopCarsClick(item)}
                style={TopCars.listItemContainer}>


                <View style={TopCars.listContentContainer}>
                  <View style={TopCars.imageContaner}>
                    <Image
                      style={TopCars.image}
                      source={{ uri: item[0].image }}
                    />
                  </View>
                  <View style={TopCars.bottomRowContainer}>
                    <Text style={TopCars.heaedrText}>{item[0].title}</Text>
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
                    <Text style={TopCars.heaedrText}>{item[1].title}</Text>
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
                <Text style={styles.bodyHeadingBlack}>{data.text}</Text>
                <Text style={styles.bodyHeadingAppColor}> </Text>
              </View>


            </View>
            <TouchableOpacity
              // activeOpacity={1}
              style={styles.smallButtonContainer}
              onPress={() => {
                orderStore.setOnBlogViewAll(true);
                // for (let i = 0; i < orderStore.drawerMenu.length; i++) {
                //   if (orderStore.drawerMenu[i].key == 'blog') {
                //     this.onItemSelected(orderStore.drawerMenu[i], orderStore.drawerMenu[i].key);
                //     this.onPressLink(orderStore.drawerMenu[i]);

                //   }
                // }

              }}>
              <View style={[styles.smallButton, { backgroundColor: orderStore.color }]}>
                <Text style={styles.buttonTextStyle}>{orderStore.home.view_all}</Text>
              </View>
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
                style={styles.listItemContainer}
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
                  <Text style={[styles.paragraphText, { marginTop: 0 }]}>{item.date}</Text>
                  <Text style={styles.headingText}>{item.title}</Text>
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
        backgroundColor: Appearences.Colors.appBackgroundColor,
        paddingBottom: 15,
      }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View>
          {/* Header Start */}
          <View style={styles.header}>

            <Image source={{ uri: data.img }}
              style={styles.headerImage}>
            </Image>

            <View style={[styles.headerImageOverlay, { paddingStart: 0, paddingEnd: 0 }]}>

              <View style={styles.headerInnerContainer}>

                <Text style={styles.headerTitleText}>
                  {data.tagline}
                </Text>

                <View style={[styles.headerUnderline, { backgroundColor: orderStore.color }]} />

                <Text style={styles.headerSubtitleText}>
                  {data.heading}
                </Text>

                <View style={[styles.headerSearchbarContainer, { marginTop: 8 }]}>

                  <TextInput
                    style={[styles.TextInput, { borderTopLeftRadius: Appearences.Radius.radius, borderBottomLeftRadius: Appearences.Radius.radius }]}
                    underlineColorAndroid='transparent'
                    placeholderTextColor={Appearences.Colors.placeholderTextColor}
                    placeholder={data.placehldr}
                    onChangeText={(text) => {
                      this.setState({ searchText: text });
                    }}
                    textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  />

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={async () => {
                      let param = { ad_title: this.state.searchText }
                      const { navigate } = this.props.navigation;
                      await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
                      let { orderStore } = Store;
                      orderStore.setIsCallAdvance(false);
                      navigate('SearchDetail', { params: param });

                    }}
                  >
                    <View style={[styles.searchButton, { backgroundColor: orderStore.color, borderTopEndRadius: Appearences.Radius.radius, borderBottomEndRadius: Appearences.Radius.radius }]}>
                      <Image source={require('../../../res/images/search_white.png')}
                        style={styles.searchImage}
                      />
                    </View >
                  </TouchableOpacity>

                </View>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={async () => {
                    await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);

                    this.props.navigation.navigate("Search")
                  }}
                >
                  <Text style={styles.advencedSearcTextStyle}>{data.advance_search}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>

          </View>
          {/*Header End*/}
        </View>

        <View style={styles.container}>



          {/*Body Start*/}
          <View style={styles.body}>


            {
              data.ads_position != undefined ?
                data.ads_position.map((item, key) => (
                  <View
                    style={{
                      marginTop: 5,
                      backgroundColor: Appearences.Colors.lightGrey,
                      paddingStart: 15,
                      paddingEnd: 15,
                    }}
                    key={key}>
                    {this.managePostions(item)}
                  </View>

                )
                )
                : null
            }
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





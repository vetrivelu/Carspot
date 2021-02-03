import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
  Modal,
  Animated, ActivityIndicator
} from 'react-native';

import Appearences from '../config/Appearences'
import I18nManager from 'react-native';
import Visbility from './Visibility';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Store from '../Stores';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as Animatable from 'react-native-animatable';

import {
  ParallaxSwiper,
  ParallaxSwiperPage
} from "react-native-parallax-swiper";
import Video from 'react-native-video';
import { widthPercentageToDP as wp } from '../helper/Responsive';


var widths = Dimensions.get('window').width;



let fullImages = [];
let { orderStore } = Store;

export default class ProfileHeader extends Component<Props> {


  constructor(props) {
    super(props);

    this.state = {
      showSpinner: true,
      currentItem: 1,
      currentImage: 0,
      isImageViewVisle: false,
      sliderImageCurrentIndex: 0,
      activeSlide: 0,
      pauseVideo: true,
      showControl: true,
      fullscreenuri: '',
      fullscreenmodal: false,
      sliderImages: [
        {
          uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
          // uri: 'https://carspot-api.scriptsbundle.com/wp-content/uploads/2020/05/351.mp4'
        }
      ],
      loadingVideo: true
    }

  }
  myCustomAnimatedValue = new Animated.Value(0);

  componentWillMount = () => {
    const data = orderStore.adDetail.data;
    // console.log('data is', JSON.stringify(data))
    //if(fullImages.length === 0 )

    fullImages = [];
    data.ad_detail.images.map((item, index) => {
      if (item.type == 'image') {
        let imagesSource = {

          url: item.full,


        }
        fullImages.push(imagesSource);
      }



    });
  }
  _snapToItem = (item) => {
    // console.log('item', item)
    if (item != this.state.activeSlide) {
      this.setState({ currentItem: item + 1, sliderImageCurrentIndex: item, activeSlide: item, pauseVideo: true, showControl: true });
    } else {
      this.setState({ currentItem: item + 1, sliderImageCurrentIndex: item, activeSlide: item });
    }
    // this.setState({xyz:item})
  }

  onImageClick = async (index) => {
    // if()
    let { orderStore } = Store;
    const data = orderStore.adDetail.data;
    const adDetail = data.ad_detail;
    const sliderImages = adDetail.images;

    if (sliderImages[0].type == 'image') {
      this.setState({ currentImage: index, isImageViewVisle: true })

    } else {
      this.setState({ currentImage: index - 1, isImageViewVisle: true })

    }
  }
  get pagination() {
    const { entries, activeSlide } = this.state;
    let { orderStore } = Store;
    const data = orderStore.adDetail.data;
    const adDetail = data.ad_detail;
    const sliderImages = adDetail.images;

    return (
      <Pagination
        dotsLength={sliderImages.length}
        activeDotIndex={activeSlide}
        containerStyle={{ position: 'absolute', bottom: 0, alignSelf: 'center' }}
        dotStyle={{
          width: 10,
          height: 10,

          borderRadius: 5,
          // marginHorizontal: 8,
          backgroundColor: 'rgba(255,255,255,1)'
        }}
        inactiveDotStyle={{
          // Define styles for inactive dots here
        }}
      // inactiveDotOpacity={0.4}
      // inactiveDotScale={0.6}
      />
    );
  }



  getPageTransformStyle = index => ({

    transform: [
      {
        scale: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (widths + 8), // Add 8 for dividerWidth
            index * (widths + 8),
            (index + 1) * (widths + 8)
          ],
          outputRange: [0, 1, 0],
          extrapolate: "clamp"
        })
      },
      {
        rotate: this.myCustomAnimatedValue.interpolate({
          inputRange: [
            (index - 1) * (widths + 8),
            index * (widths + 8),
            (index + 1) * (widths + 8)
          ],
          outputRange: ["180deg", "0deg", "-180deg"],
          extrapolate: "clamp"
        })
      }
    ]
  });



  render() {
    let { orderStore } = Store;
    const data = orderStore.adDetail.data;
    const adDetail = data.ad_detail;
    const sliderImages = adDetail.images;
    // console.log('full images',fullImages)
    var sliderWidth = Dimensions.get('window').width;
    sliderWidth = (sliderWidth / 100) * 100;
    return (

      <View>
        <Modal
          visible={this.state.isImageViewVisle}
          onRequestClose={() => { this.setState({ isImageViewVisle: false }) }}
          transparent={true}>

          <ImageViewer
            imageUrls={fullImages}
            index={this.state.currentImage}
            enableSwipeDown={true}
            onSwipeDown={() => { this.setState({ isImageViewVisle: false }) }}
            renderHeader={() => (
              <TouchableOpacity
                onPress={() => this.setState({ isImageViewVisle: false })}
                style={s.imageViewHeaderContainer}
              >
                <Image style={s.imageViewClose}
                  source={require('../../res/images/cross_white.png')} />
              </TouchableOpacity>
            )}
          />
        </Modal>

        {/* Slider Section Start */}
        <View style={s.container}>
          {/* <View style={s.left}>
            <Image
              source={{ uri: sliderImages[this.state.sliderImageCurrentIndex].thumb }}
              style={s.headerImageStyle}
            />
            <View style={s.leftSideAbsoluteContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.sliderImageCurrentIndex - 1 >= 0) {
                    this.setState({ sliderImageCurrentIndex: this.state.sliderImageCurrentIndex - 1 });
                  }
                  this.carousel.snapToPrev();

                }}
                style={[s.arrowContainer, { backgroundColor: orderStore.color  }]}>
                <Image style={s.topSliderArrow}
                  source={require('../../res/images/left_arrow_white.png')}
                />
              </TouchableOpacity>
            </View>
          </View> */}

          {/* <View style={s.middle}>
            <Carousel
              Carousel layout={'default'}
              data={sliderImages.slice()}
              vertical={false}
              ref={(c) => { this.carousel = c; }}
              onSnapToItem={this._snapToItem}
              renderItem={({ item, index }) =>

                <View

                >
                  <Image
                    source={{ uri: item.thumb }}
                    style={s.headerImageStyle}
                  />
                  <TouchableOpacity

                    onPress={() => { this.onImageClick(index) }}

                    style={s.middleSectionAbsoluteContainer}>
                    {adDetail.is_feature ?
                      <View style={s.featuredRow}>

                        <View style={[s.featuredContainer, { backgroundColor: orderStore.color }]}>
                          <Text style={[s.featuredText]}>{adDetail.is_feature_text}</Text>
                        </View>
                      </View>
                      : null}
                    <View style={[s.sliderRow, { position: 'absolute', bottom: 0 }]}>
                      <Image source={require('../../res/images/gallery.png')}
                        style={s.topSliderMiddleGalleryImage} />
                      <Text style={s.topSliderMiddleGalleryImageText}>
                        {data.ad_detail.images_count}
                      </Text>
                    </View>
                    {
                      <Visbility

                        hide={!data.is_feature}
                        style={[s.topSliderMiddleRighTextContainer, { backgroundColor: orderStore.color }]}>
                        <Text style={s.topSliderMiddleRightText}>
                          {data.is_feature_text}
                        </Text>
                      </Visbility>

                    }
                  </TouchableOpacity>
                </View>

              }
              sliderWidth={parseInt(sliderWidth)}
              itemWidth={parseInt(sliderWidth)}
              keyExtractor={item => item.img_id + ''} >
            </Carousel>
            {this.pagination}

          </View> */}
          <View style={s.middle}>
            <ParallaxSwiper
              speed={0.5}
              // animatedValue={this.myCustomAnimatedValue}
              // dividerWidth={8}
              // dividerColor="black"
              backgroundColor="black"
              onMomentumScrollEnd={activePageIndex => this._snapToItem(activePageIndex)}
              scrollToIndex={this.state.activeSlide}
            // showProgressBar={true}
            // progressBarBackgroundColor="rgba(0,0,0,0.25)"
            // progressBarValueBackgroundColor="white"
            >
              {
                sliderImages.map((item, index) => {
                  return (
                    <ParallaxSwiperPage
                      BackgroundComponent={
                        item.full != undefined ?

                          <View>

                            <Image
                              style={{ height: 200, width: wp(100) }}
                              source={{ uri: item.thumb }}
                              resizeMode="cover"
                            />
                            {adDetail.is_feature ?
                              <View style={[s.featuredRow, { position: 'absolute', top: 0, right: 5, }]}>

                                <View style={[s.featuredContainer, { backgroundColor: orderStore.color }]}>
                                  <Text style={[s.featuredText]}>{adDetail.is_feature_text}</Text>
                                </View>
                              </View>
                              : null}


                            <View style={[s.sliderRow, { position: 'absolute', bottom: 15 }]}>
                              <Image source={require('../../res/images/gallery.png')}
                                style={s.topSliderMiddleGalleryImage} />
                              <Text style={s.topSliderMiddleGalleryImageText}>
                                {data.ad_detail.images_count}
                              </Text>
                            </View>
                            {
                              <Visbility

                                hide={!data.is_feature}
                                style={[s.topSliderMiddleRighTextContainer, { backgroundColor: orderStore.color }]}>
                                <Text style={s.topSliderMiddleRightText}>
                                  {data.is_feature_text}
                                </Text>
                              </Visbility>

                            }
                          </View>
                          :

                          <View style={{ height: 200, width: wp(100) }}>
                            <Video
                              source={{ uri: item.vid_url }}
                              rate={1.0}
                              muted={false}
                              paused={this.state.fullscreenmodal || this.state.pauseVideo}
                              resizeMode="conatin"
                              onLoadStart={() => { this.setState({ loadingVideo: true }) }}
                              onLoad={() => { this.setState({ loadingVideo: false }) }}
                              // on={()=>{console.log('onLoad')}}

                              // controls
                              style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                              }} />


                          </View>
                        // <Text>Hererere hererehrherheh</Text>
                      }
                      ForegroundComponent={
                        item.full ?
                          <View style={s.foregroundTextContainer}>
                            <TouchableOpacity
                              onPress={() => {

                                this.onImageClick(index)
                              }}
                              style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}

                            >

                            </TouchableOpacity>
                          </View>

                          :
                          <View style={[s.foregroundTextContainer]}>
                            <TouchableOpacity
                              onPress={() => {
                                this.setState({ showControl: !this.state.showControl })
                              }}
                              style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            >

                              {
                                this.state.loadingVideo ? [
                                  <ActivityIndicator />
                                ] : [
                                    this.state.showControl ?
                                      <TouchableOpacity
                                        style={{ alignSelf: 'center', }}
                                        onPress={() => {

                                          this.setState({ pauseVideo: !this.state.pauseVideo }, () => {
                                            if (!this.state.pauseVideo) {
                                              setTimeout(() => { this.setState({ showControl: false }) }, 2000)
                                            }
                                          })

                                        }}
                                      >

                                        <Image
                                          source={this.state.pauseVideo ? require('../../res/images/play_vid.png') : require('../../res/images/pause.png')}
                                          style={{ height: 40, width: 40, tintColor: '#fff' }}
                                          resizeMode="cover"

                                        />
                                      </TouchableOpacity> : null

                                  ]
                              }
                              {


                              }

                              <TouchableOpacity
                                onPress={() => {
                                  this.setState({ fullscreenmodal: true, fullscreenuri: item.vid_url })
                                }}
                                style={{ position: 'absolute', left: wp(1), top: wp(1), backgroundColor: 'white', padding: wp(2) }}
                              >
                                <Image
                                  source={require('../../res/images/interface.png')}
                                  style={{ tintColor: '#000', height: wp(3), width: wp(3) }}

                                />
                              </TouchableOpacity>
                            </TouchableOpacity>
                            {adDetail.is_feature ?
                              <View style={[s.featuredRow, { position: 'absolute', top: 0, right: 5, }]}>

                                <View style={[s.featuredContainer, { backgroundColor: orderStore.color }]}>
                                  <Text style={[s.featuredText]}>{adDetail.is_feature_text}</Text>
                                </View>
                              </View>
                              : null}
                          </View>
                      }
                    />)
                })
              }
            </ParallaxSwiper>
            {this.pagination}

          </View>




          {/* <View style={s.right}>
            <Image
              source={{ uri: sliderImages[this.state.sliderImageCurrentIndex].thumb }}
              style={s.headerImageStyle}
            />
            <View style={s.rightSideAbsoluteContainer}>
              <TouchableOpacity
                onPress={() => {
                  if (this.state.sliderImageCurrentIndex + 1 < sliderImages.length) {
                    this.setState({ sliderImageCurrentIndex: this.state.sliderImageCurrentIndex + 1 });
                  }
                  this.carousel.snapToNext();

                }}
                style={[s.arrowContainer, { backgroundColor: orderStore.color  }]}>
                <Image style={s.topSliderArrow}
                  source={require('../../res/images/right_arrow_white.png')}
                />
              </TouchableOpacity>
            </View>
          </View> */}
        </View>
        <Modal visible={this.state.fullscreenmodal}
          onRequestClose={() => { this.setState({ fullscreenmodal: false, pauseVideo: true, showControl: true }) }}
          style={{ height: '80%', width: '100%', backgroundColor: '#000' }}

        >


          <View style={{ height: '100%', width: '100%' }}>
            {
              Platform.OS == 'ios' ? [
                <View style={{ flexDirection: 'row', marginTop: wp(10), paddingHorizontal: wp(6), width: '100%', zIndex: 10  }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ fullscreenuri: '', fullscreenmodal: false, pauseVideo: true, showControl: true })
                  }}
                >
                  <Image
                    source={require('../../res/images/close.png')}
                    style={{ height: wp(6), width: wp(6), tintColor: 'red' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
  
  
              </View>
              ] : [
                <View style={{ flexDirection: 'row', marginTop: wp(3), paddingHorizontal: wp(6), width: '100%' }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ fullscreenuri: '', fullscreenmodal: false, pauseVideo: true, showControl: true })
                  }}
                >
                  <Image
                    source={require('../../res/images/close.png')}
                    style={{ height: wp(6), width: wp(6), tintColor: 'red' }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
  
  
              </View>
                ]

            }
           

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
                // paused={this.}


                /> : null}


          </View>



        </Modal>


      </View>


    );




  }
}

const localProps = {

  headerHeight: 200,
  topMargin: 5,
  sidePadding: 10,
  bodyTopMargin: 15,
  sliderArrowContainerWidth: 20,
  sliderArrowContainerHeight: 60,
  topSliderArrowDimens: 15,
};
const s = StyleSheet.create({
  showingOutOfRow: {
    paddingStart: localProps.sidePadding,
    paddingEnd: localProps.sidePadding,
    height: 35,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  container: {
    height: 200,
    width: '100%',
    flexDirection: 'row',
    // marginTop: localProps.topMargin,
  },

  left: {
    width: '5%',
    height: '100%',
  },
  middle: {
    width: '100%',
    height: '100%',
  },

  right: {
    width: '5%',
    height: '100%',
  },
  headerImageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  leftSideAbsoluteContainer: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  middleSectionAbsoluteContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    position: 'absolute',


  },

  rightSideAbsoluteContainer: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  arrowContainer: {

    width: localProps.sliderArrowContainerWidth,
    height: localProps.sliderArrowContainerHeight,
    alignItems: 'center',
    justifyContent: 'center',

  },

  topSliderArrow: {
    width: localProps.topSliderArrowDimens,
    height: localProps.topSliderArrowDimens,
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],

  },


  topSliderMiddleGalleryImage: {
    width: Appearences.Fonts.paragraphFontSize + 5,
    height: Appearences.Fonts.paragraphFontSize + 5,
    marginStart: 10,
  },
  topSliderMiddleGalleryImageText: {
    fontSize: Appearences.Fonts.paragraphFontSize,
    color: 'white',
    marginStart: 5,
  },
  topSliderMiddleRighTextContainer: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    paddingStart: 5,
    paddingEnd: 5,
  },
  topSliderMiddleRightText: {

    color: 'white',
    fontSize: Appearences.Fonts.paragraphFontSize - 1,
  },
  featuredRow: {
    width: '100%',
    height: 20,
    alignItems: 'flex-end',
  },
  featuredContainer: {
    // padding: 10,
    // paddingHorizontal:10,
    // paddingTop:10,
    // borderRadius: Appearences.Radius.radius,
    height: '102%',
    width: '15%',
    marginTop: 5, marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredText: {
    color: 'white',
    fontSize: Appearences.Fonts.paragraphFontSize,
  },

  sliderRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    paddingEnd: 10,
    paddingStart: 10,
    paddingBottom: 10,

  },
  showingOutOfRowImageStyle: {
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],

    width: 10,
    height: 10,
  },
  showingOutOfRowText: {
    fontFamily: Appearences.Fonts.headingFont,
    fontSize: Appearences.Fonts.headingFontSize,
    color: Appearences.Colors.black,
  },
  showingOutOfRowImageStyle: {
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],

    width: 10,
    height: 10,
  },
  carInfoRow: {

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: localProps.topMargin,
  },
  row: {
    flexDirection: 'row',
  },
  carInfoRowLeftTitle: {
    fontSize: Appearences.Fonts.headingFontSize,
    marginTop: localProps.topMargin,
    fontWeight: Appearences.Fonts.headingFontWieght,

  },
  carInfoRowLeftDetail: {
    fontSize: Appearences.Fonts.mainHeadingFontSize,
    color: Appearences.Colors.black,
    marginTop: localProps.topMargin,
    fontWeight: Appearences.Fonts.headingFontWieght,

  },
  carInfoRowLeftDate: {
    fontSize: Appearences.Fonts.headingFontSize,
    color: Appearences.Colors.grey,
    marginTop: localProps.topMargin,
    marginBottom: localProps.topMargin,

  },
  carInfoRowRightContainer: {
    flexDirection: 'row',
    alignItems: 'center'

  },
  triangle: {
    width: 0,
    height: 0,
    borderTopColor: 'transparent',
    borderTopWidth: Appearences.Fonts.trianagleHeight,
    borderEndWidth: 12,
    borderBottomWidth: Appearences.Fonts.trianagleHeight,
    borderBottomColor: 'transparent'
  },
  carInfoRowRightTextContainer: {
    height: Appearences.Fonts.trianagleHeight * 2,
    //paddingBottom:Appearences.Fonts.headingFontSize,
    paddingStart: 10,
    paddingEnd: 10,
    justifyContent: 'center',

  },
  carInfoRowRightContainerPrice: {
    color: 'white',
    fontSize: Appearences.Fonts.headingFontSize,
    fontFamily: Appearences.Fonts.headingFont,
  },
  triangleRowcontainer: {
    paddingStart: 15,
    paddingEnd: 15,
    flex: 1,
    backgroundColor: 'white',
  },
  triangleRowcontainerAbsolute: {
    position: 'absolute',
    marginTop: 300,
    alignSelf: 'center',
    backgroundColor: 'white',
    flex: 1,
    paddingStart: 15,
    paddingEnd: 15,
    width: '100%'
  },
  imageViewHeaderContainer: {
    alignSelf: 'flex-end',
    padding: 15,
    marginTop: 5,

  },
  imageViewClose: {
    width: 15,
    height: 15,

  },
  eyeImage: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    tintColor: Appearences.Colors.grey,
  },


  foregroundTextContainer: {
    height: 200, width: wp(100),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  foregroundText: {
    fontSize: 34,
    fontWeight: "700",
    letterSpacing: 0.41,
    color: "white"
  }
});


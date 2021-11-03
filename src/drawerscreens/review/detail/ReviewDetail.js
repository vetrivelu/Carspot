import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,

} from 'react-native';
import Appearences from '../../../config/Appearences';
import styles from './Styles';
import StarRating from 'react-native-star-rating';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Store from '../../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../../network/Api';
import ImageViewer from 'react-native-image-zoom-viewer';
import Loader from '../../../components/Loader';
import stores from '../../../Stores/orderStore';
import LinearGradient from 'react-native-linear-gradient';
import HTMLView from 'react-native-htmlview';
import WebView from 'react-native-webview';
import HTML from 'react-native-render-html';
// import { height } from 'react-native-dimension';
import { widthPercentageToDP as wp } from '../../../helper/Responsive'


let fullImages = [];
export default class ReviewDetail extends Component<Props> {


  static navigationOptions = ({ navigation }) => ({
    headerTitle: stores.screenTitles.review_detail,
    headerStyle: {
      backgroundColor: stores.color,
    },
  });
  componentWillMount = async () => {
    let { orderStore } = Store;
    const params = { review_id: this.props.navigation.state.params.id };
    // console.log("id for review detail",JSON.stringify(params))

    const response = await Api.post("review/detail", params);

    fullImages = [];

    // console.log("response from review detail",JSON.stringify(response))
    if (response.success === true) {
      //  postIdGlobal = response.data.post.review_id;
      orderStore.innerResponse = response;
      //  orderStore.innerResponse = response.extra;
      var doSection = { title: response.data.post.like_heading };
      var doSectionArray = [doSection];
      var dontSection = { title: response.data.post.unlike_heading }
      var dontSectionArray = [dontSection];

      this.setState({ doSection: doSectionArray, dontSection: dontSectionArray });

      response.data.post.gallery.map((item, index) => {

        let imagesSource = {

          url: item,


        }
        fullImages.push(imagesSource);


      });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false });


  }

  onImageClick = async (index) => {
    this.setState({ currentImage: index, isImageViewVisle: true })
  }

  _renderDontHeader(section, index, isActive, sections) {
    let { orderStore } = Store;
    var trxt: string;


    return (
      <View style={styles.sidePadding}>

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
            marginTop: 15,
          }}>
          <View style={styles.accordinHeaderContentContainer}>
            <View style={styles.accordinHeaderLeftSectionContainer}>
              <Image style={styles.accodrinLeftImgae} source={isActive ? require('../../../../res/images/thumbsdown_white.png') : require('../../../../res/images/thumbsdow_black.png')} />
              <Text style={isActive ? styles.accordinHeaderTextSwitched : styles.accordinHeaderText}>{section.title}</Text>
            </View>
            <View style={styles.rotationViewContainer}>
              <Image style={isActive ? styles.rotatingView : styles.NonrotatingView}
                source={isActive ? require('../../../../res/images/up_arrow_white.png') : require('../../../../res/images/up_arrow.png')}

              />


            </View>
          </View>
        </Animatable.View>
      </View>
    );
  }




  _renderDoHeader(section, index, isActive, sections) {
    let { orderStore } = Store;
    var trxt: string;


    return (
      <View style={styles.sidePadding}>

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
            marginTop: 15,
          }}>
          <View style={styles.accordinHeaderContentContainer}>
            <View style={styles.accordinHeaderLeftSectionContainer}>
              <Image style={styles.accodrinLeftImgae} source={isActive ? require('../../../../res/images/thumbsup_white.png') : require('../../../../res/images/thumbsup_black.png')} />
              <Text style={isActive ? styles.accordinHeaderTextSwitched : styles.accordinHeaderText}>{section.title}</Text>
            </View>
            <View style={styles.rotationViewContainer}>
              <Image style={isActive ? styles.rotatingView : styles.NonrotatingView}
                source={isActive ? require('../../../../res/images/up_arrow_white.png') : require('../../../../res/images/up_arrow.png')}

              />


            </View>
          </View>
        </Animatable.View>
      </View>
    );
  }





  onStarRatingPress(rating) {
    console.log("Rating is: " + rating)
  }

  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      showSpinner: true,
      doSection: [{ title: "" }],

      dontSection: [{ title: "" }],
      isImageViewVisle: false,




    }
  }

  render() {

    if (this.state.showSpinner)
      return (
        <Loader />

      );


    let { orderStore } = Store;
    const post = orderStore.innerResponse.data.post;
    const extra = orderStore.innerResponse.extra;
    const barWidth = parseInt((Dimensions.get('window').width / 100) * 50);
    return (



      <View style={{ height: '100%', backgroundColor: 'white', }}>

        <Modal visible={this.state.isImageViewVisle}
          onRequestClose={() => { this.setState({ isImageViewVisle: false }) }}
          transparent={true}>
          <ImageViewer
            imageUrls={fullImages}
            index={this.state.currentImage}
            enableSwipeDown={true}
            onSwipeDown={() => { this.setState({ isImageViewVisle: false }) }}
          />

        </Modal>


        <ScrollView contentContainerStyle={{ paddingBottom: 50, }}>

          <View style={styles.headerContainer}>
            <Image
              style={styles.headerImage}
              source={{ uri: post.image }}
            />
            <LinearGradient
              colors={['#00000020', '#00000020', '#00000090', 'black']}
              style={{ flex: 1 }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.headerOverlay}>
              <View style={styles.headerContentContainer}>
                <View style={styles.ratingBarContainer}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    rating={Number(post.rating)}
                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                    starSize={14}
                    fullStarColor='#D4AF37'
                  />
                  <Text style={styles.starText}>{post.rating + "/5"}</Text>
                </View>
                <Text style={styles.heaedrText}>{post.title}</Text>
              </View>
            </LinearGradient>
          </View>



          <View style={{ marginTop: 15,padding:wp(3) }}>

            <HTML
              html={post.desc}
              imagesInitialDimensions={
                { height: wp('60'), width: wp('94') }
              }
            // stylesheet = {{

            //   h1:{color: Appearences.Colors.black,
            //       fontSize:Appearences.Fonts.subHeadingFontSize,
            //       paddingStart:10,
            //       paddingEnd:10,
            //       marginTop:5,

            //     },
            //     h2:{color: Appearences.Colors.black,
            //       marginTop:5,
            //       fontSize:Appearences.Fonts.subHeadingFontSize,
            //       paddingStart:10,
            //       paddingEnd:10,
            //     },
            //     h3:{color: Appearences.Colors.black,
            //       marginTop:5,
            //       fontSize:Appearences.Fonts.subHeadingFontSize,
            //       paddingStart:10,
            //       paddingEnd:10,
            //     },
            //     h4:{color: Appearences.Colors.black,
            //       marginTop:5,
            //       fontSize:Appearences.Fonts.subHeadingFontSize,
            //       paddingStart:10,
            //       paddingEnd:10,
            //     },
            //     h5:{color: Appearences.Colors.black,
            //       marginTop:5,
            //       fontSize:Appearences.Fonts.subHeadingFontSize,
            //       paddingStart:10,
            //       paddingEnd:10,
            //     },
            //     h6:{color: Appearences.Colors.black,
            //       marginTop:5,
            //       fontSize:Appearences.Fonts.subHeadingFontSize,
            //       paddingStart:10,
            //       paddingEnd:10,
            //     },
            //     p:{
            //       color: Appearences.Colors.headingGrey,
            //       marginTop:5,
            //       fontSize:Appearences.Fonts.headingFontSize,
            //       paddingStart:10,
            //       paddingEnd:10,

            //     },
            //     span:{
            //       color: Appearences.Colors.headingGrey,
            //       marginTop:5,
            //       fontSize:Appearences.Fonts.headingFontSize,
            //       paddingStart:10,
            //       paddingEnd:10,
            //     },


            // }
            // }

            />

          </View>
          {/* Do Section */}

          <Accordion
            sections={this.state.doSection}
            underlayColor='transparent'
            renderHeader={this._renderDoHeader}
            renderContent={() => {

              return (
                <View style={styles.sidePadding}>
                  <View style={styles.coloredBackground}>
                    <HTMLView

                      value={post.likes}
                      stylesheet={{
                        li: { color: Appearences.Colors.headingGrey, fontSize: Appearences.Fonts.headingFontSize },
                        ul: { color: Appearences.Colors.headingGrey, margin: 0, padding: 0 },
                        ol: { color: Appearences.Colors.headingGrey, margin: 0, padding: 0 },
                      }}
                    />

                  </View>
                </View>
              );
            }}
          />

          <Accordion
            sections={this.state.dontSection}
            underlayColor='transparent'
            renderHeader={this._renderDontHeader}
            renderContent={() => {

              return (
                <View style={styles.sidePadding}>
                  <View style={styles.coloredBackground}>

                    <HTMLView value={post.unlikes}
                      stylesheet={{
                        li: { color: Appearences.Colors.headingGrey, fontSize: Appearences.Fonts.headingFontSize },
                        ul: { color: Appearences.Colors.headingGrey, margin: 0, padding: 0 },
                        ol: { color: Appearences.Colors.headingGrey, margin: 0, padding: 0 },
                      }}
                    />
                  </View>
                </View>

              );
            }}
          />
          {/* Dont Section End*/}


          {/* Video Review Section Start */}
            {
              post.video!=""?
              <View style={styles.videoContentContainer}>
              <Text style={styles.headingText}>{extra.video_review}</Text>
              <WebView
                useWebKit={true}
                source={{ uri: 'https://www.youtube.com/embed/' + post.video + '?rel=0&autoplay=0&showinfo=0&controls=0' }}
                style={styles.videoContent}
                javaScriptEnabled={true}
              />
            </View>:null
            }
        
          {/* Video Review Section End */}

          {/* Gallery Section Start */}
          <Text style={styles.galleryHeadingText}>{extra.gallert}</Text>
          <View style={styles.gellerySectionContainer}>
            {
              post.gallery.map((item, key) => (

                <TouchableOpacity
                  key={key}
                  style={styles.galleryItem}
                  onPress={() => { this.onImageClick(key) }}
                >


                  <Image style={styles.galleryImage}
                    source={{ uri: item }} />

                </TouchableOpacity>

              ))}
          </View>
          {/* Gallery Section End */}

          {/* Rating Section Start */}

          <Text style={styles.galleryHeadingText}>{post.verdict_title}</Text>
          {
            post.verdict.map((item, key) => (

              <View
                key={key}
                style={styles.sidePadding}>
                <View style={styles.verdictContainer}>
                  <View style={styles.verdictTextContainer}>
                    <Text style={styles.verdictHedingText}>{item.name}</Text>
                  </View>
                  <View style={styles.progressContainer}>
                    <ProgressBarAnimated
                      width={barWidth}
                      height={8}
                      value={Number(item.value)}
                      backgroundColor={orderStore.color}
                      maxValue={100}
                      borderColor={Appearences.Colors.lightGrey} />
                    <Text style={styles.verdictHedingText}>{item.value + '%'}</Text>
                  </View>
                </View>
              </View>

            ))}

          <View style={styles.summarySectionContainer}>
            <Text style={[styles.summaryHeadingText, { marginTop: 5, color: orderStore.color }]}>{extra.verdict}</Text>
            <Text style={styles.paragraphText}>
              {post.verdict_details}
            </Text>
          </View>
          {/* Rating Section End */}
        </ScrollView>
      </View>
    );
  }


}





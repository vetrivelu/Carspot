import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  Share,
  RefreshControl,
  StyleSheet,
  I18nManager,
} from 'react-native';
import styles from './Styles';
import Store from '../../../../../../Stores';
import AdDetailHeader from '../../../../../../components/AdDetailHeader';
import { Avatar, Card } from 'react-native-elements';
import Visibility from '../../../../../../components/Visibility';
import * as Progress from 'react-native-progress';
import Appearences from '../../../../../../config/Appearences';
import { observer } from 'mobx-react';
import ModalDropdown from 'react-native-modal-dropdown';
import Toast from 'react-native-simple-toast';
import Api from '../../../../../../network/Api';
import Loader from '../../../../../../components/Loader';
import * as Animatable from 'react-native-animatable';

@observer
export default class Bids extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      hidePostReportProgress: true,
      shittyArray: [],
      reportMessage: '',
      reportOption: '',
      showSpinner: false,
      hideBidButtonProgress: true,
      isBidListEmpty: false,
      bidAmount: "",
      bidComment: "",
      swipeUp: false,
      reRender: false,
      isAboslute: false,
    }
  }
  _onSwipeUp = async () => {
    await this.setState({ swipeUp: true });

    setTimeout(async () => {
      this.setState({ swipeUp: false, reRender: !this.state.reRender });

    }, 1000);
  }

 
  componentDidMount() {
    let { orderStore } = Store;
    const data = orderStore.adDetail.data;

    if (data.bid_popup.bid_details.data.bids.length === 0)
      this.setState({ isBidListEmpty: false });
    else
      this.setState({ isBidListEmpty: true });

    this.setState({ shittyArray: [...data.report_popup.select.name] });
  }
  share = () => {
    console.log('here')
    let { orderStore } = Store;
    orderStore.setOnClickShareListener(false);
    const shareInfo = orderStore.adDetail.data.share_info;
    Share.share({
      message:
        shareInfo.title + "\n" + shareInfo.text + "\n" + shareInfo.link,
    });



  }


  componentWillUpdate() {
    let { orderStore } = Store;

    if (orderStore.detailToolbarModel.onClickFavourute)
      this.addToFavourites();
    if (orderStore.detailToolbarModel.onClickShare)
      this.share();
  }

  postBid = async () => {

    this.setState({ hideBidButtonProgress: false });
    let { orderStore } = Store;

    let adId = orderStore.adDetail.data.ad_detail.ad_id;
    let params = { ad_id: adId, bid_amount: this.state.bidAmount, bid_comment: this.state.bidComment };
    const response = await Api.post("ad_post/bid/post", params);

    if (response.success === true) {
      let params = { ad_id: adId};

      const responsex = await Api.post("ad_post", params);
      orderStore.adDetail.data.static_text.ad_bids=responsex.data.static_text.ad_bids
      // console.log('consolex',responsex)
      //it(this.state.isBidListEmpty === false)
      this.setState({ isBidListEmpty: true });
      // console.log('bids',response)
      orderStore.adDetail.data.bid_popup.bid_details.data.bids = response.data.bids;

    }

    this.setState({ hideBidButtonProgress: true });
    if (response.message.length != 0)
      Toast.show(response.message);

  }

  addToFavourites = async () => {
    this.setState({ showSpinner: true });
    let { orderStore } = Store;
    orderStore.setOnClickFavouritetListener(false);
    let adId = orderStore.adDetail.data.ad_detail.ad_id;
    let params = { ad_id: adId };
    const response = await Api.post("ad_post/favourite", params);

    if (response.success === true) {

    }

    this.setState({ showSpinner: false });
    if (response.message.length != 0)
      Toast.show(response.message);
  }

  reportAd = async () => {
    this.setState({ hidePostReportProgress: false });
    let { orderStore } = Store;
    let adId = orderStore.adDetail.data.ad_detail.ad_id;
    let params = { ad_id: adId, option: this.state.reportOption, comments: this.state.reportMessage };
    const response = await Api.post("ad_post/report", params);
    if (response.success === true) {

    }

    this.setState({ hidePostReportProgress: true });
    if (response.message.length != 0)
      Toast.show(response.message);

  }




  render() {
    if (this.state.showSpinner)
      return (
        <Loader />

      );

    let { orderStore } = Store;
    const data = orderStore.adDetail.data;

    const adDetail = data.ad_detail;
    orderStore.detailToolbarModel.onClickFavourute;
    orderStore.detailToolbarModel.onClickShare;
    return (


      <View style={{

        paddingBottom: 5,

      }}>


        <Modal

          visible={orderStore.detailToolbarModel.reportPopup.onClickReport}
          animationType="slide"
          transparent={false}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>

          <View style={styles.modalContainer}>
            <View style={styles.modal}>




              <View style={styles.modalHeadingContainer}>

                <Text style={styles.modalHeadingText}>{data.report_popup.select.text}</Text>
                <TouchableOpacity

                  onPress={() =>
                    orderStore.setOnClickReportListener(false)
                  }
                >
                  <Image source={require('../../../../../../../res/images/cross_white.png')}
                    style={styles.modalHeadingImage} />


                </TouchableOpacity>
              </View>

              {/* Make */}
              <View>
                <TouchableOpacity onPress={() => {
                  this.makeDropdownRef.show();
                }}
                  style={styles.row}
                >
                  <ModalDropdown
                    options={this.state.shittyArray}
                    ref={el => this.makeDropdownRef = el}
                    style={styles.pickerContainer}
                    dropdownStyle={styles.dorpDownStyle}
                    dropdownTextHighlightStyle={styles.dropDownTextStyle}
                    textStyle={styles.dorpdownContainerTextStyle}
                    defaultValue={data.report_popup.select.key}
                    onSelect={(index, value) => {
                      this.setState({ reportOption: value });

                    }}
                    renderSeparator={() => { return (<View style={styles.dropdownSeperatorStyle} />); }}
                    renderRow={(option, index, isSelected) => {
                      return (<View style={styles.dorpDownRow}>
                        <Text style={styles.dropDownTextStyle}>{option}</Text>
                      </View>);
                    }} />
                  <View style={styles.dropdownArrowContainer}>
                    <Image
                      style={styles.popupViewImage}
                      source={require('../../../../../../../res/images/right_arrow.png')}
                    />
                  </View>
                </TouchableOpacity>

              </View>
              <View>
                <TextInput
                  multiline={true}
                  numberOfLines={10}
                  textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  style={styles.TextInputMultiline}
                  placeholder={data.report_popup.input_textarea}
                  onChangeText={(message) => this.setState({ reportMessage: message })}
                  placeholderTextColor={Appearences.Colors.grey}
                />

              </View>
              <Visibility
                hide={this.state.hidePostReportProgress}
                style={styles.modalProgressContainer}>
                <Progress.Circle
                  color={orderStore.color}
                  indeterminate={true}
                  size={Appearences.Fonts.headingFontSize} />
              </Visibility>


              <Visibility
                hide={!this.state.hidePostReportProgress}>






                <View style={[styles.modalButtonRowContainer]}>

                  <TouchableOpacity

                    onPress={() =>
                      orderStore.setOnClickReportListener(false)
                    }
                    style={styles.cancelButton}>
                    <Text style={[styles.modalButtonTextStyle, { color: Appearences.Colors.black }]}> {data.report_popup.btn_cancel} </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.reportAd}
                    style={[styles.sendButton, { backgroundColor: orderStore.color }]}>
                    <Text style={styles.modalButtonTextStyle}>{data.report_popup.btn_send} </Text>
                  </TouchableOpacity>
                </View>
              </Visibility>

            </View>

          </View>
        </Modal>







        <ScrollView
          keyboardShouldPersistTaps='always'
          key={this.state.reRender}
          contentContainerStyle={{ backgroundColor: Appearences.Colors.appBackgroundColor }}
          
          refreshControl={
            <RefreshControl
              refreshing={this.state.swipeUp}
              onRefresh={this._onSwipeUp}
            />
          }
        >
          <AdDetailHeader />

          <View
            style={s.triangleRowcontainer}>

            <View
              style={s.carInfoRow}>
              <View style={{ width: '60%' }}>
                <Text style={[s.carInfoRowLeftTitle, { color: orderStore.color }]}>{adDetail.ad_cat}</Text>
                <Text style={s.carInfoRowLeftDetail}>{adDetail.ad_title}</Text>
                <View style={s.row}>
                  <Text style={s.carInfoRowLeftDate}>{Appearences.Rtl.enabled ? "   |   " + adDetail.ad_date : adDetail.ad_date + "   |   "}</Text>
                  <Image style={s.eyeImage}
                    source={require('../../../../../../../res/images/eye.png')} />
                  <Text style={s.carInfoRowLeftDate}>{Appearences.Rtl.enabled ? adDetail.ad_view_count + "  " : "  " + adDetail.ad_view_count}</Text>
                </View>
              </View>
              <View style={s.carInfoRowRightContainer}>
                {adDetail.ad_price.price.length != undefined && adDetail.ad_price.price.length != 0 ? <View style={[s.triangle, { borderEndColor: orderStore.color }]} /> : null}
                {adDetail.ad_price.price.length != undefined && adDetail.ad_price.price.length != 0 ?
                  <View style={[s.carInfoRowRightTextContainer, { backgroundColor: orderStore.color }]}>
                    <Text style={s.carInfoRowRightContainerPrice}>
                      {adDetail.ad_price.price}
                    </Text>
                  </View> : null}
              </View>
            </View>



          </View>



                    {/* ////////////Bid Stats////////////// */}


          <View style={styles.container}>

            <View style={styles.panel}>
              <Text style={styles.subHeadingText}>
                {data.section_title.bid_title}
              </Text>
              <View style={[styles.cellRow, { backgroundColor: orderStore.color + '20' }]}>

                <View style={styles.cellContainer}>
                  <View style={styles.cellTextContainer}>
                    <Text style={styles.cellGreyText}>{orderStore.adDetail.data.static_text.ad_bids.total_text}</Text>
                    <Text style={[styles.cellAppColorText, { color: orderStore.color }]}>{orderStore.adDetail.data.static_text.ad_bids.total + ""}</Text>
                  </View>
                </View>

                <View style={styles.cellContainer}>
                  <View style={styles.cellTextContainer}>
                    <Text style={styles.cellGreyText}>{orderStore.adDetail.data.static_text.ad_bids.max_text}</Text>
                    <Text style={[styles.cellAppColorText, { color: orderStore.color }]}>{orderStore.adDetail.data.static_text.ad_bids.max.price}</Text>
                  </View>
                </View>

                <View style={styles.cellContainer}>
                  <View style={styles.cellTextContainer}>
                    <Text style={styles.cellGreyText}>{orderStore.adDetail.data.static_text.ad_bids.min_text}</Text>
                    <Text style={[styles.cellAppColorText, { color: orderStore.color }]}>{orderStore.adDetail.data.static_text.ad_bids.min.price}</Text>
                  </View>

                </View>

              </View>






              <Visibility hide={!this.state.isBidListEmpty}>
                <View style={styles.container}>
                  <View
                  >
                    <View style={styles.sidePadding}>
                      <Text style={styles.textBlack}>{data.bid_popup.bid_section_title}</Text>
                    </View>
                    <View style={styles.rowSeperator} />

                  </View>
                  <View >


                    <FlatList
                      data={data.bid_popup.bid_details.data.bids}
                      horizontal={false}
                      showsVerticalScrollIndicator={false}
                      renderItem={({ item, index }) =>

                        <View style={styles.sidePadding}>
                          <View style={styles.listRowContainer}>
                            <Avatar
                              size='medium'
                              rounded
                              source={{ uri: item.profile }}
                              activeOpacity={0.7} />
                            <View style={styles.listTextContainer}>
                              <View style={styles.row}>
                                <View style={{ width: '80%' }}>
                                  <Text style={[styles.messageTextRed, { color: orderStore.color, alignSelf: 'flex-start' }]}>{item.name}</Text>
                                </View>

                                <Text style={[styles.bidAmountText]}>{item.price.price}</Text>
                              </View>
                              <Text style={[styles.dateText, { alignSelf: 'flex-start' }]}>
                                {item.date}
                              </Text>

                              <Text style={[styles.messageText, { alignSelf: 'flex-start' }]}>{item.comment}
                              </Text>

                            </View>
                          </View>
                        </View>

                      }
                      keyExtractor={item => item.ad_id + ''}
                    >
                    </FlatList>


                  </View>

                </View>

              </Visibility>
              <Visibility hide={this.state.isBidListEmpty}>
                <View style={styles.noDataContainer}>
                  <Text style={styles.headingTextBlack}>
                    {data.bid_popup.no_bid}
                  </Text>
                </View>
              </Visibility>

            </View>
          </View>
          <View
          >
            <View style={styles.panel}>
              <TextInput
                placeholder={" " + data.bid_popup.input_text}
                underlineColorAndroid="transparent"
                keyboardType="numeric"
                returnKeyType="done"
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                onChangeText={(message) => this.setState({ bidAmount: message })}
                style={styles.TextInput} />
              <TextInput
                placeholder={" " + data.bid_popup.input_textarea}
                multiline={true}
                textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                onChangeText={(message) => this.setState({ bidComment: message })}
                style={styles.textArea}
                underlineColorAndroid="transparent"

              />
              <View style={{ width: '100%', alignItems: 'flex-end', marginTop: 5 }}>
                <Visibility hide={this.state.hideBidButtonProgress} style={styles.sendButtonContainerWhite}>

                  <Progress.Circle
                    color={orderStore.color}
                    indeterminate={true}
                    size={Appearences.Fonts.headingFontSize} />

                </Visibility>
                    {/* ////////////Bid Post////////////// */}
                <Visibility hide={!this.state.hideBidButtonProgress} style={[styles.sendButtonContainer, { backgroundColor: orderStore.color }]}>
                  <TouchableOpacity onPress={() => this.postBid()}>
                    <Text style={styles.sendButtonText}>{data.bid_popup.btn_send}</Text>
                  </TouchableOpacity>
                </Visibility>
              </View>
            </View>
          </View>


        </ScrollView>


        {/* Absolute view start */}
        {this.state.isAboslute ?

          <Animatable.View
            animation={this.state.isAboslute ? "fadeInDown" : "fadeOut"} iterationCount={1} direction="normal"
            style={s.triangleRowcontainerAbsolute}>

            <View
              style={s.carInfoRow}>
              <View style={{ width: '60%' }}>
                {/* <Text style = {[s.carInfoRowLeftTitle,{color:orderStore.color}]}>{adDetail.ad_cat}</Text> */}
                <Text style={s.carInfoRowLeftDetail}>{adDetail.ad_title}</Text>
                <View style={s.row}>
                  <Text style={s.carInfoRowLeftDate}>{Appearences.Rtl.enabled ? "   |   " + adDetail.ad_date : adDetail.ad_date + "   |   "}</Text>
                  <Image style={s.eyeImage}
                    source={require('../../../../../../../res/images/eye.png')} />
                  <Text style={s.carInfoRowLeftDate}>{Appearences.Rtl.enabled ? adDetail.ad_view_count + "  " : "  " + adDetail.ad_view_count}</Text>
                </View>
              </View>
              <View style={s.carInfoRowRightContainer}>
                {adDetail.ad_price.price.length != undefined && adDetail.ad_price.price.length != 0 ? <View style={[s.triangle, { borderEndColor: orderStore.color }]} /> : null}
                {adDetail.ad_price.price.length != undefined && adDetail.ad_price.price.length != 0 ?
                  <View style={[s.carInfoRowRightTextContainer, { backgroundColor: orderStore.color }]}>
                    <Text style={s.carInfoRowRightContainerPrice}>
                      {adDetail.ad_price.price}
                    </Text>
                  </View> : null}
              </View>
            </View>



          </Animatable.View>

          : null



        }


        {/* Absolute view end */}





      </View>);
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
    marginTop: localProps.topMargin,
  },

  left: {
    width: '10%',
    height: '100%',
  },
  middle: {
    width: '80%',
    height: '100%',
  },

  right: {
    width: '10%',
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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    position: 'absolute',
    paddingEnd: 10,
    paddingStart: 10,
    paddingBottom: 10,

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
  sliderRow: {
    flexDirection: 'row',
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
    alignSelf: 'flex-start',
  },
  carInfoRowLeftDetail: {
    fontSize: Appearences.Fonts.mainHeadingFontSize,
    color: Appearences.Colors.black,
    marginTop: localProps.topMargin,
    fontWeight: Appearences.Fonts.headingFontWieght,
    alignSelf: 'flex-start',
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
    width: '100%',
    backgroundColor: 'white',
  },
  triangleRowcontainerAbsolute: {
    position: 'absolute',
    backgroundColor: 'white',
    flex: 1,
    paddingStart: 15,
    paddingEnd: 15,
    width: '100%',
    elevation: 5,
    shadowOpacity: 0.5,
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
});
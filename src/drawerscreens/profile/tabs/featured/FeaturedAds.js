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
} from 'react-native';

import ProfileHeader from '../../../../components/ProfileHeader';
import styles from './Styles';
import Store from '../../../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../../../network/Api';
import Spinner from 'react-native-loading-spinner-overlay';
import { withNavigation } from 'react-navigation';
import NoDataFound from '../../../../components/NoDataFound';
import ConfirmDialogue from '../../../../components/ConfirmDialogue';
import * as Progress from 'react-native-progress';
import Appearences from '../../../../config/Appearences';
var deleteIndex = 0;
var deleteItem;
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
class FeaturedAds extends Component<Props> {

  defaultData = [];
  paginationDefault;
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      listData: [],
      showSpinner: false,
      noDataVisivility: false,
      noDataMessage: "",
      showConfirmDialogue: false,
      reCaller: false,
      swipeUp: false,
      reRender: false,
    }
  }


  _onSwipeUp = async () => {
    await this.setState({ swipeUp: true });

    setTimeout(async () => {
      let { orderStore } = Store;
      orderStore.profile.data.featured_add.ads = [...this.defaultData];
      orderStore.profile.data.featured_add.pagination = this.paginationDefault;
      this.setState({ listData: this.defaultData, swipeUp: false, reCaller: false, refreshing: false, reRender: !this.state.reRender });
      if (orderStore.profile.data.featured_add.ads.length === 0)
        this.setState({ noDataVisivility: true, noDataMessage: orderStore.profile.data.featured_add.msg });

    }, 1000);
  }

  componentWillMount() {
    let { orderStore } = Store;
    this.defaultData = [...orderStore.profile.data.featured_add.ads];
    this.paginationDefault = orderStore.profile.data.featured_add.pagination;
    this.setState({ listData: orderStore.profile.data.featured_add.ads });
    if (orderStore.profile.data.featured_add.ads.length === 0)
      this.setState({ noDataVisivility: true, noDataMessage: orderStore.profile.data.featured_add.msg });

  }

  deleteItem = async (item, index) => {
    this.setState({ showSpinner: true });

    const params = { ad_id: item.ad_id, }
    let response = await Api.post('ad/featured/remove', params);
    if (response.success === true) {

      let { orderStore } = Store;
      let data = [...orderStore.profile.data.featured_add.ads];
      data.splice(index, 1);
      orderStore.profile.data.featured_add.ads = data;
      this.setState({ listData: orderStore.profile.data.featured_add.ads });

    }

    this.setState({ showConfirmDialogue: false });
    if (response.message.length != 0)
      Toast.show(response.message);
    this.recallService(1);
  }

  loadMore = async (nextPage) => {

    let { orderStore } = Store;

    let params = { page_number: nextPage };
    let response = await Api.post('ad/featured', params);
    if (response.success === true) {
      orderStore.profile.data.featured_add.pagination = response.data.pagination;
      orderStore.profile.data.featured_add.ads = [...orderStore.profile.data.featured_add.ads, ...response.data.ads];
      this.setState({ listData: orderStore.profile.data.featured_add.ads });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ refreshing: false, reCaller: false });
  }

  recallService = async (nextPage) => {

    let { orderStore } = Store;
    //comments.unshift({ reply: 'Reply Q' });

    let params = { page_number: nextPage };
    let response = await Api.post('ad/featured', params);
    if (response.success === true) {

      orderStore.profile.data.featured_add.pagination = response.data.pagination;
      orderStore.profile.data.featured_add.ads = response.data.ads;
      this.setState({ listData: orderStore.profile.data.featured_add.ads, reCaller: false });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false });
  }


  _onRefresh = () => {

    let { orderStore } = Store;
    let pagination = orderStore.profile.data.featured_add.pagination;
    if (pagination.has_next_page === true) {
      this.setState({ refreshing: true });
      this.loadMore(pagination.next_page);
    }
  }



  _onRefreshControl = async () => {
    this.setState({ refreshing: true });


    let { orderStore } = Store;
    orderStore.profile = await Api.get('profile');
    if (orderStore.profile.success == true) {
      this.defaultData = [...orderStore.profile.data.featured_add.ads];
      this.paginationDefault = orderStore.profile.data.featured_add.pagination;
      this.setState({ listData: orderStore.profile.data.featured_add.ads,refreshing:false });
      if (orderStore.profile.data.featured_add.ads.length === 0)
        this.setState({ noDataVisivility: true, noDataMessage: orderStore.profile.data.featured_add.msg,refreshing:false });
  
    }
  }

  static navigationOptions = {
    tabBarLabel: 'Featured Ads',
  };
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  render() {

    let { orderStore } = Store;
    let statusText = orderStore.profile.extra_text.status_text;
    return (
      <View style={{
        height: '100%',
        backgroundColor: Appearences.Colors.appBackgroundColor,
        paddingBottom: 15,
      }}>

        <Spinner
          visible={this.state.showSpinner}
          textContent={''}
          animation='slide'
        />


        <ScrollView
          key={this.state.reRender}
          contentContainerStyle={{ backgroundColor: Appearences.Colors.appBackgroundColor }}
          //  refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.swipeUp}
          //     onRefresh={this._onSwipeUp}
          //   />
          // }
          //   showsVerticalScrollIndicator={false}

          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefreshControl}
            />
          }
          onScroll={({ nativeEvent }) => {
            if (this.isCloseToBottom(nativeEvent)) {
              if (this.state.reCaller === false) {
                this._onRefresh();
              }
              this.setState({ reCaller: true })

            }
          }}
          scrollEventThrottle={400}>




          <ProfileHeader />



          <View style={styles.container}>
            {this.state.listData.length != 0 ? <View style={styles.headingContainer}>
              <Text style={styles.bodyHeadingBlack}>{orderStore.profile.extra_text.feature_title + ' ' + orderStore.profile.extra_text.ads_title}</Text>
            </View> : null}






            <FlatList
              contentContainerStyle={{ marginTop: 5 }}
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
                      source={{ uri: item.ad_images[0].thumb }} />
                    <View style={styles.flatListBackgroundImageOverlay}>
                      <View style={styles.flastListOverLayLeftContainer}>
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
                                { scaleX: I18nManager.isRTL ? -1 : 1 },
                                { rotate: I18nManager.isRTL ? '360deg' : '-360deg' },

                              ]
                            }

                          } />
                        <View style={{ width: '100%', height: '100%', position: 'absolute', }}>
                          <Image
                            style={{ width: 10, height: 10, marginTop: 8, marginStart: 8 }}
                            source={require('../../../../../res/images/star_white.png')} />
                        </View>
                      </View>

                      {/* <View style = {styles.flatListOvlerLayRightContainer}>
                          <View style = {styles.flatListOvlerLayRightAbsoluteContainer}>
                            <View style = {styles.flastListOverLayMessageCircle}>
                                <Image
                                style = {styles.flastListOverLayMessageImage}
                                source = {require("../../../../../res/images/envelope_white.png")}
                                />
                            </View>
                            <View style = {styles.flastListOverLayMessageCountCircleAbosluteContainer}>
                              <View style = {[styles.flastListOverlayMessaageCountContainer,{backgroundColor:orderStore.color}]}>
                                <Text style = {styles.flastListOverlayMessaageCountText}>
                                  {item.totalMessages}
                                </Text>
                              </View>
                            </View>
                            
                            
                          </View>
                        </View>
                  */}
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.flatListContentContainer}>
                      <View style={{ padding: 15, }}>
                        <View style={styles.flatListContentRow1}>
                          <Text style={styles.flatListContentRow1Text}>
                            {item.ad_cats_name}
                          </Text>

                        </View>

                        <Text style={styles.flatListItemHeadingText}>
                          {item.ad_title}
                        </Text>
                        <Text style={styles.flatListItemMileageText}>
                          {item.ad_engine + '  |  ' + item.ad_milage}
                        </Text>

                        <Text style={[styles.flatListItemPriceText, { color: orderStore.color, fontSize: Appearences.Fonts.headingFontSize, fontWeight: Appearences.Fonts.headingFontWieght }]}>
                          {item.ad_price.price}
                          <Text style={[styles.flatListItemPriceText, { color: orderStore.color }]}>
                            {item.ad_price.price_type.length != 0 ? ' (' + item.ad_price.price_type + ')' : ''}
                          </Text>
                        </Text>

                        <View style={styles.dateRowContainer}>
                          <Image
                            source={require('../../../../../res/images/calender_grey.png')}
                            style={styles.flatListBottomLeftImage}
                          />
                          <Text style={styles.flatListBottomLeftText}>
                            {item.ad_date}
                          </Text>
                        </View>


                      </View>

                    </View>

                    <View style={{ width: "10%" }}>

                      <Menu>

                        <MenuTrigger>
                          <View style={{ paddingStart: 5, paddingEnd: 5, paddingTop: 5, paddingBottom: 20 }}>
                            <Image
                              source={require('../../../../../res/images/menu_dots.png')}
                              style={styles.menuDots}
                            />
                          </View>
                        </MenuTrigger>

                        <MenuOptions>
                          <MenuOption onSelect={() => {
                            const { navigate } = this.props.navigation;
                            //  navigate('AdDetail', { adId: item.ad_id });
                            this.props.navigation.navigate('SellEdit', { adId: item.ad_id, isUpdate: true });

                          }}>
                            <View style={styles.menuItemContainer}>
                              <Text style={styles.menuTextStyle}>
                                {statusText.status_dropdown_name[3]}
                              </Text>

                            </View>
                          </MenuOption>

                          {/* <MenuOption onSelect={ async() => {
                                 await this.setState({showConfirmDialogue:true});
                                 deleteIndex = index;
                                 deleteItem = item;
                                                    }}>
                                <View style = {styles.menuItemContainer}>
                                  <Text style = {styles.menuTextStyle}>
                                  {statusText.status_dropdown_name[4]}
                                  </Text>
                                </View>  
                            </MenuOption> */}


                        </MenuOptions>
                      </Menu>

                    </View>
                    {/* new code */}
                  </View>
                  {/* new code above tag only*/}
                </TouchableOpacity>

              }
              keyExtractor={item => item.ad_id + ''}
            >
            </FlatList>


            <NoDataFound
              message={this.state.noDataMessage}
              visible={this.state.noDataVisivility}
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
            </View>
            : null}
        </ScrollView>
        <ConfirmDialogue
          visible={this.state.showConfirmDialogue}
          onConfirm={() => { this.deleteItem(deleteItem, deleteIndex) }}
          onCancel={() => { this.setState({ showConfirmDialogue: false }) }}
        />
      </View>
    );
  }


}
export default withNavigation(FeaturedAds)








import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ProfileHeader from '../../../../components/ProfileHeader';
import Store from '../../../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../../../network/Api';
import Spinner from 'react-native-loading-spinner-overlay';
import { withNavigation } from 'react-navigation';
import NoDataFound from '../../../../components/NoDataFound';
import ConfirmDialogue from '../../../../components/ConfirmDialogue';
import * as Progress from 'react-native-progress';
import Appearences from '../../../../config/Appearences';
import MenuConfirmDialogue from '../../../../components/ConfirmDialogue';
import styles from './Styles';
var deleteIndex = 0;
var deleteItem;
class MyAds extends Component<Props> {
  item; option; text; index;
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
      showMenuConfirmDialogue: false,
      reCaller: false,
      swipeUp: false,
      reRender: false,
    }
  }
  _onSwipeUp = async () => {
    await this.setState({ swipeUp: true });

    setTimeout(async () => {
      let { orderStore } = Store;
      orderStore.profile.data.active_add.ads = [...this.defaultData];
      orderStore.profile.data.active_add.pagination = this.paginationDefault;
      this.setState({ listData: this.defaultData, swipeUp: false, reCaller: false, refreshing: false, reRender: !this.state.reRender });
      if (orderStore.profile.data.active_add.ads.length === 0)
        this.setState({ noDataVisivility: true, noDataMessage: orderStore.profile.data.active_add.msg });

    }, 1000);
  }
  onOptionSelected = async (item, option, text, index) => {
    this.setState({ showSpinner: true, showMenuConfirmDialogue: false });

    let params = {
      ad_id: item.ad_id,
      ad_status: option,
    };
    let response = await Api.post('ad/update/status', params);
    if (response.success === true) {
      let stateClone = [...this.state.listData];
      stateClone[index].ad_status.status = option;
      stateClone[index].ad_status.status_text = text;
      this.setState({ listData: stateClone, reCaller: false });
      //this.recallService(1);
      item.ad_status.status = option + '';
    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false });
  }

  componentWillMount() {
    let { orderStore } = Store;
    this.defaultData = [...orderStore.profile.data.active_add.ads];
    this.paginationDefault = orderStore.profile.data.active_add.pagination;
    this.setState({ listData: orderStore.profile.data.active_add.ads });
    if (orderStore.profile.data.active_add.ads.length === 0)
      this.setState({ noDataVisivility: true, noDataMessage: orderStore.profile.data.active_add.msg });

  }

  deleteItem = async (item, index) => {
    this.setState({ showSpinner: true });

    const params = { ad_id: item.ad_id, }
    let response = await Api.post('ad/delete', params);
    if (response.success === true) {

      let { orderStore } = Store;
      let data = [...orderStore.profile.data.active_add.ads];
      data.splice(index, 1);
      orderStore.profile.data.active_add.ads = data;
      this.setState({ listData: orderStore.profile.data.active_add.ads });

    }

    this.setState({ showConfirmDialogue: false });
    if (response.message.length != 0)
      Toast.show(response.message);
    this.recallService(1);
  }

  loadMore = async (nextPage) => {

    let { orderStore } = Store;
    //comments.unshift({ reply: 'Reply Q' });

    let params = { page_number: nextPage };
    let response = await Api.post('ad/active', params);
    if (response.success === true) {
      orderStore.profile.data.active_add.pagination = response.data.pagination;
      orderStore.profile.data.active_add.ads = [...orderStore.profile.data.active_add.ads, ...response.data.ads];
      this.setState({ listData: orderStore.profile.data.active_add.ads });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ refreshing: false, reCaller: false });
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  recallService = async (nextPage) => {

    let { orderStore } = Store;
    //comments.unshift({ reply: 'Reply Q' });

    let params = { page_number: nextPage };
    let response = await Api.post('ad/active', params);
    if (response.success === true) {

      orderStore.profile.data.active_add.pagination = response.data.pagination;
      orderStore.profile.data.active_add.ads = response.data.ads;
      this.setState({ listData: orderStore.profile.data.active_add.ads, reCaller: false });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false });
  }



  static navigationOptions = {
    tabBarLabel: 'My Ads',
  };


  _onRefresh = () => {

    let { orderStore } = Store;
    let pagination = orderStore.profile.data.active_add.pagination;
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
      this.defaultData = [...orderStore.profile.data.active_add.ads];
      this.paginationDefault = orderStore.profile.data.active_add.pagination;
      this.setState({ listData: orderStore.profile.data.active_add.ads,refreshing:false });
      if (orderStore.profile.data.active_add.ads.length === 0)
        this.setState({ noDataVisivility: true, noDataMessage: orderStore.profile.data.active_add.msg,refreshing:false });
    }
  }
  render() {
    let { orderStore } = Store;
    let myAds = orderStore.profile.data.active_add.ads;
    let activeAds = orderStore.profile.data.active_add;
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
          //    <RefreshControl
          //      refreshing={this.state.swipeUp}
          //      onRefresh={this._onSwipeUp}
          //    />
          //  }
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefreshControl}
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

          <ProfileHeader />





          <View style={styles.container}>
            {this.state.listData.length != 0 ? <View style={styles.headingContainer}>
              <Text style={styles.bodyHeadingBlack}>{orderStore.profile.extra_text.my_title + ' ' + orderStore.profile.extra_text.ads_title}</Text>
            </View>
              : null}





            <FlatList
              contentContainerStyle={{ marginTop: 5 }}
              data={this.state.listData}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>

                <TouchableOpacity

                  onPress={() => {
                    const { navigate } = this.props.navigation;
                    //  navigate('AdDetail', { adId: item.ad_id });
                    navigate('AdDetailTabManager', { adId: item.ad_id });

                  }}


                  style={styles.flastListItemContainer}>
                  <View style={styles.flatListBackgroundImageContainer}>
                    <Image
                      style={styles.flatListBackgroundImage}
                      source={{ uri: item.ad_images[0].thumb }} />
                    <View style={styles.flatListBackgroundImageOverlay}>
                      <View style={styles.flastListOverLayLeftContainer}>
                        <View style={item.ad_status.status === 'sold' ? styles.flatListOverLayLeftTextContainerSold : item.ad_status.status === 'expired' ? styles.flatListOverLayLeftTextContainerExpired : styles.flatListOverLayLeftTextContainerActive}>
                          <Text style={styles.flastListOverLayLeftContainerText}>
                            {item.ad_status.status_text}
                          </Text>
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
                        </View> */}

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
                            this.item = item;
                            this.option = statusText.status_dropdown_value[0];
                            this.text = statusText.status_dropdown_value[0];
                            this.index = index;
                            this.setState({ showMenuConfirmDialogue: true });
                            // this.onOptionSelected(item,statusText.status_dropdown_value[0],statusText.status_dropdown_name[0],index)
                          }}>
                            <View style={styles.menuItemContainer}>
                              <Text style={styles.menuTextStyle}>
                                {statusText.status_dropdown_name[0]}
                              </Text>

                            </View>
                          </MenuOption>

                          <MenuOption onSelect={() => {

                            this.item = item;
                            this.option = statusText.status_dropdown_value[1];
                            this.text = statusText.status_dropdown_value[1];
                            this.index = index;
                            this.setState({ showMenuConfirmDialogue: true });
                            //  this.onOptionSelected(item,statusText.status_dropdown_value[1],statusText.status_dropdown_name[1],index)
                          }}>
                            <View style={styles.menuItemContainer}>
                              <Text style={styles.menuTextStyle}>
                                {statusText.status_dropdown_name[1]}
                              </Text>

                            </View>
                          </MenuOption>

                          <MenuOption onSelect={() => {
                            this.item = item;
                            this.option = statusText.status_dropdown_value[2];
                            this.text = statusText.status_dropdown_value[2];
                            this.index = index;
                            this.setState({ showMenuConfirmDialogue: true });

                            //this.onOptionSelected(item,statusText.status_dropdown_value[2],statusText.status_dropdown_name[2],index)
                          }}>
                            <View style={styles.menuItemContainer}>
                              <Text style={styles.menuTextStyle}>
                                {statusText.status_dropdown_name[2]}
                              </Text>

                            </View>
                          </MenuOption>











                          <MenuOption onSelect={async () => {
                            await this.setState({ showConfirmDialogue: true });
                            deleteIndex = index;
                            deleteItem = item;
                          }}>
                            <View style={styles.menuItemContainer}>
                              <Text style={styles.menuTextStyle}>
                                {statusText.status_dropdown_name[4]}
                              </Text>

                            </View>
                          </MenuOption>


                          <MenuOption onSelect={() => {
                            this.props.navigation.navigate('SellEdit', { adId: item.ad_id, isUpdate: true });

                          }}>
                            <View style={styles.menuItemContainer}>
                              <Text style={styles.menuTextStyle}>
                                {statusText.status_dropdown_name[3]}
                              </Text>

                            </View>
                          </MenuOption>







                        </MenuOptions>
                      </Menu>

                    </View>
                    {/* new code */}
                  </View>
                  {/* new code above tag only*/}
                </TouchableOpacity>

              }
              keyExtractor={item => item.ad_author_id + ''}
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
            </View> : null}
        </ScrollView>
        <ConfirmDialogue
          visible={this.state.showConfirmDialogue}
          onConfirm={() => { this.deleteItem(deleteItem, deleteIndex) }}
          onCancel={() => { this.setState({ showConfirmDialogue: false }) }}
        />
        <MenuConfirmDialogue
          visible={this.state.showMenuConfirmDialogue}
          onConfirm={() => { this.onOptionSelected(this.item, this.option, this.text, this.index) }}
          onCancel={() => { this.setState({ showMenuConfirmDialogue: false }) }}
        />
      </View>);
  }


}
export default withNavigation(MyAds)








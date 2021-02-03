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

import ProfileHeader from '../../../../components/ProfileHeader';
import Store from '../../../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../../../network/Api';
import styles from './Styles';
import NoDataFound from '../../../../components/NoDataFound';
import * as Progress from 'react-native-progress';
import Appearences from '../../../../config/Appearences';
import { withNavigation } from 'react-navigation';
import { observer } from 'mobx-react';

@observer
class InActiveAds extends Component<Props> {
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
      reCaller: false,
      swipeUp: false,
      reRender: false,

    }
  }
  componentWillMount() {
    let { orderStore } = Store;
    this.defaultData = [...orderStore.profile.data.inactive_add.ads];
    this.paginationDefault = orderStore.profile.data.inactive_add.pagination;
    this.setState({ listData: orderStore.profile.data.inactive_add.ads });
    if (orderStore.profile.data.inactive_add.ads.length === 0)
      this.setState({ noDataVisivility: true, noDataMessage: orderStore.profile.data.inactive_add.msg });

  }

  _onSwipeUp = async () => {
    await this.setState({ swipeUp: true });

    setTimeout(async () => {
      let { orderStore } = Store;
      orderStore.profile.data.inactive_add.ads = [...this.defaultData];
      orderStore.profile.data.inactive_add.pagination = this.paginationDefault;
      this.setState({ listData: this.defaultData, swipeUp: false, reCaller: false, refreshing: false, reRender: !this.state.reRender });
      if (orderStore.profile.data.inactive_add.ads.length === 0)
        this.setState({ noDataVisivility: true, noDataMessage: orderStore.profile.data.inactive_add.msg, });

    }, 1000);
  }
  _onRefresh = () => {

    let { orderStore } = Store;
    let pagination = orderStore.profile.data.inactive_add.pagination;
    if (pagination.has_next_page === true) {
      this.setState({ refreshing: true });
      this.loadMore(pagination.next_page);
    }
  }

  loadMore = async (nextPage) => {

    let { orderStore } = Store;

    let params = { page_number: nextPage };
    let response = await Api.post('ad/inactive', params);
    if (response.success === true) {

      orderStore.profile.data.inactive_add.pagination = response.data.pagination;
      orderStore.profile.data.inactive_add.ads = [...orderStore.profile.data.inactive_add.ads, ...response.data.ads];
      this.setState({ listData: orderStore.profile.data.inactive_add.ads });

    }
    Toast.show(response.message);
    this.setState({ refreshing: false, reCaller: false });
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };


  static navigationOptions = {

    tabBarLabel: 'Inactive Ads',
  }
  _onRefreshControl = async () => {
    this.setState({ refreshing: true });


    let { orderStore } = Store;
    orderStore.profile = await Api.get('profile');
    if (orderStore.profile.success == true) {
   
      this.defaultData = [...orderStore.profile.data.inactive_add.ads];
      this.paginationDefault = orderStore.profile.data.inactive_add.pagination;
      this.setState({ listData: orderStore.profile.data.inactive_add.ads,refreshing:false });
      if (orderStore.profile.data.inactive_add.ads.length === 0)
        this.setState({ noDataVisivility: true, noDataMessage: orderStore.profile.data.inactive_add.msg,refreshing:false });
    }
  }

  render() {


    let { orderStore } = Store;
    let ads = orderStore.profile.data.inactive_add.ads;
    let inactiveAds = orderStore.profile.data.inactive_add;

    return (


      <View style={{
        height: '100%',
        backgroundColor: Appearences.Colors.appBackgroundColor,
        paddingBottom: 15,
      }}>
        <ScrollView
          key={this.state.reRender}
          contentContainerStyle={{ backgroundColor: Appearences.Colors.appBackgroundColor }}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.swipeUp}
          //     onRefresh={this._onSwipeUp}
          //   />
          // }

          //     showsVerticalScrollIndicator={false}

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
          scrollEventThrottle={400}
        >

          <ProfileHeader />

          <View style={styles.container}>
            {this.state.listData.length != 0 ? <View style={styles.headingContainer}>
              <Text style={styles.bodyHeadingBlack}>{orderStore.profile.extra_text.inactive_title + ' ' + orderStore.profile.extra_text.ads_title}</Text>
            </View> : null}





            <FlatList
              contentContainerStyle={{ marginTop: 5 }}
              // data={this.state.listData}
              data={orderStore.profile.data.inactive_add.ads}
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

                  </View>

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
                      <Text style={[styles.flatListItemPriceText, { color: orderStore.color, fontWeight: Appearences.Fonts.headingFontWieght, fontSize: Appearences.Fonts.headingFontSize, }]}>
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
                    <View style={styles.menuItemSperator} />
                  </View>

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

                color={orderStore.color}
                indeterminate={true} />
            </View> : null}
        </ScrollView>
      </View>);
  }


}

export default withNavigation(InActiveAds)






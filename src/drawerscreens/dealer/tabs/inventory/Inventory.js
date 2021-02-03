import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  RefreshControl,
  Linking,
  Platform,
} from 'react-native';
import Store from '../../../../Stores';
import styles from './Styles';
import DealerHeader from '../../../../components/DealerHeader';
import * as Progress from 'react-native-progress';
import Appearences from '../../../../config/Appearences';
import Api from '../../../../network/Api';
import { withNavigation } from 'react-navigation';
import { I18nManager } from 'react-native'

class Inventory extends Component<Props> {
  defaultData = [];
  paginationDefault;

  constructor(props) {
    let { orderStore } = Store;
    super(props);

    this.state = {
      serviceRating: 3,
      buyingRating: 4,
      vehicleRating: 5,
      reviewTitle: '',
      reviewText: '',
      latitude: '0',
      longitude: '0',
      switchValue: true,
      listData: [],

      refreshing: false,
      reCaller: false,
      swipeUp: false,
      reRender: false,
    }
  }

  componentWillMount = async () => {
    let { orderStore } = Store;
    this.defaultData = [...orderStore.publicProfile.inventory.lists.ads];
    this.paginationDefault = orderStore.publicProfile.inventory.lists.pagination;
    this.setState({ listData: orderStore.publicProfile.inventory.lists.ads });
  }

  setLatLong = () => {
    let { orderStore } = Store;
    const profile = orderStore.publicProfile;
    const latLong = profile.lat_long;
    this.setState({ latitude: latLong.lat, longitude: latLong.long });

    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latLong.lat},${latLong.long}`;
    let label = ""
    if (profile.list.text[0].val != "") {
      label = profile.list.text[0].val;

    } else {
      label = profile.list.text[0].key;

    }
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url);




  }

  _onSwipeUp = async () => {
    await this.setState({ swipeUp: true });

    setTimeout(async () => {
      let { orderStore } = Store;
      orderStore.publicProfile.inventory.lists.ads = [...this.defaultData];
      orderStore.publicProfile.inventory.lists.pagination = this.paginationDefault;
      this.setState({ listData: this.defaultData, swipeUp: false, reCaller: false, refreshing: false, reRender: !this.state.reRender });

    }, 1000);
  }
  _onRefresh = () => {

    let { orderStore } = Store;
    let pagination = orderStore.publicProfile.inventory.lists.pagination;
    if (pagination.has_next_page === true) {
      this.setState({ refreshing: true });
      this.loadMore(pagination.next_page);
    }

  }
  loadMore = async (nextPage) => {

    let { orderStore } = Store;

    let params = { user_id: orderStore.publicProfile.id, page_number: nextPage };
    // let params = { dealer_id: orderStore.publicProfile.id, page_number: nextPage  };
    // console.log('inventory params', JSON.stringify(params))
    let response = await Api.post('profile/public/inventory', params);
    if (response.success === true) {
      // console.log('inventory result', JSON.stringify(orderStore.publicProfile.inventory))
      orderStore.publicProfile.inventory.lists.pagination = response.data.pagination;
      orderStore.publicProfile.inventory.lists.ads = [...orderStore.publicProfile.inventory.lists.ads, ...response.data.ads];
      this.setState({ listData: orderStore.publicProfile.inventory.lists.ads });

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

  render() {
    const { orderStore } = Store;
    const profile = orderStore.publicProfile;
    const inventory = orderStore.publicProfile.inventory;
    const latLong = profile.lat_long;
    return (
      <View style={{
        height: '100%',
        backgroundColor: Appearences.Colors.appBackgroundColor,
        paddingBottom: 5,
      }}>

        <ScrollView

          key={this.state.reRender}
          contentContainerStyle={{ backgroundColor: Appearences.Colors.appBackgroundColor }}
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

          <DealerHeader />

          {/* {item.is_show ? */}
          {/* <View style={styles.container}>

            <FlatList
              data={profile.list.text}
              horizontal={false}
              showsVerticalScrollIndicator={false}

              renderItem={({ item, index }) =>

                <View>
                  <View style={styles.contactRowContainer}>
                    <Image style={styles.aboutImage} source={item.key === 'Address' ? require('../../../../../res/images/placeholder.png') : item.key === 'Contact Number' ? require('../../../../../res/images/placeholder.png') : item.key === 'Website' ? require('../../../../../res/images/world.png') : null} />
                    <Text style={styles.paragraphTextBlackMarginStart}>{item.val}</Text>
                  </View>
                  <View style={styles.lineSeperator} />

                </View>

              }
              keyExtractor={item => item.val + ''}
            >
            </FlatList>
          </View> */}
          {
            profile.list.text[0].is_show || profile.list.text[1].is_show || profile.list.text[2].is_show ? [
              <View style={[styles.panel, { borderRadius: 5 }]}>


                <View style={styles.locatonTextContainer}>
                  <Text style={styles.subHeading}>
                    {profile.list.title}
                  </Text>

                </View>
                <FlatList
                  data={profile.list.text}
                  horizontal={false}
                  showsVerticalScrollIndicator={false}

                  renderItem={({ item, index }) =>
                    item.is_show ?
                      <View>
                        <View style={[styles.contactRowContainer, { alignContent: 'center', alignItems: 'center', alignSelf: 'center' }]}>
                          <Image style={[styles.aboutImage, { marginTop: 5 }]} source={item.key === 'Address' ? require('../../../../../res/images/placeholder.png') : item.key === 'Contact Number' ? require('../../../../../res/images/phone.png') : item.key === 'Website' ? require('../../../../../res/images/world.png') : null} />
                          <Text style={styles.paragraphTextBlackMarginStart}>{item.val}</Text>
                        </View>
                        {
                          index + 1 == profile.list.text.length ? [] : [
                            <View style={styles.lineSeperator} />

                          ]
                        }

                      </View> : null

                  }
                  keyExtractor={item => item.val + ''}
                >
                </FlatList>
                {/* <Text style={styles.headingTextBlack}>
                {profile.intro.desc}
              </Text> */}


              </View>
            ] : [

              ]
          }

          {/* : null} */}
          {latLong.is_show ?
            <View style={[styles.panel, { borderRadius: 5 }]}>


              <View style={styles.locatonTextContainer}>
                <Text style={styles.subHeading}>
                  {profile.intro.desc_title}
                </Text>
                {/* <TouchableOpacity
                  onPress={() => { this.setLatLong() }}
                  style={{ flexDirection: 'row' }}>
                  <Image
                    style={styles.locationImage}
                    source={require('../../../../../res/images/placeholder.png')}
                  />
                  <Text style={styles.paragraphTextGrey}>
                    {latLong.text}
                  </Text>
                </TouchableOpacity> */}
              </View>
              <Text style={styles.headingTextBlack}>
                {profile.intro.desc}
              </Text>


            </View>

            : null}





          <View style={styles.container}>

            {
              inventory.lists.ads == undefined ? [
                <Text style={[styles.subHeading, { marginTop: 5 }]}>
                  {inventory.no_inventory_msg}
                </Text>
              ] : [
                  inventory.lists.ads.length == 0 ? [
                    <Text style={[styles.subHeading, { marginTop: 5 }]}>
                      {inventory.no_inventory_msg}
                    </Text>

                  ] : [
                      <Text style={[styles.subHeading, { marginTop: 5 }]}>
                        {inventory.title}
                      </Text>
                    ]


                ]
            }



            <View style={styles.popularCars}>




              <FlatList
                data={inventory.lists.ads}
                horizontal={false}
                showsVerticalScrollIndicator={false}

                renderItem={({ item, index }) =>

                  <TouchableOpacity
                    onPress={async () => {
                      const { navigate, push } = this.props.navigation;
                      push('AdDetailTabManager', { adId: item.ad_id });
                    }}
                    style={styles.flatListContainer}>

                    <View style={styles.imageContainer}>

                      <Image
                        style={styles.image}
                        source={{ uri: item.ad_images[0].thumb }} />
                    </View>

                    <View style={styles.textContainer}>
                      <Text
                        style={styles.brandTitleStyle}>
                        {item.ad_title}
                      </Text>
                      <Text
                        style={styles.modelTextStyle}>
                        {item.ad_desc}
                      </Text>
                      <Text
                        style={styles.brandTextStyle}>
                        {item.ad_engine + ' | ' + item.ad_milage}
                      </Text>
                      <Text
                        style={[styles.priceTextStyle, { color: orderStore.color }]}>
                        {item.ad_price.price}
                      </Text>

                    </View>


                  </TouchableOpacity>

                }
                keyExtractor={item => item.ad_id + ''}
              >
              </FlatList>


            </View>
          </View>





          {this.state.refreshing ?
            <Progress.Circle
              size={20}
              style={{ alignSelf: 'center', marginTop: 15, paddingBottom: 15 }}
              color={orderStore.color}
              indeterminate={true} /> : null}

        </ScrollView>
      </View>
    );
  }



}
export default withNavigation(Inventory)








import React, { Component } from 'react';

import {
  Text,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
}
  from 'react-native';

import ProfileHeader from '../../../../components/ProfileHeader';
import styles from './Styles';
import Store from '../../../../Stores';
import Appearences from '../../../../config/Appearences';
import { widthPercentageToDP as wp } from '../../../../helper/Responsive';
import { withNavigation } from 'react-navigation';
import Api from '../../../../network/Api';


class Profile extends Component<Props> {

  static navigationOptions = {

    tabBarLabel: 'Profile',
  }


  constructor(props) {
    super(props);
    // console.log('herexxxxx')
    let { orderStore } = Store;
    let data = orderStore.profile.data;

    // console.log('in profile data is ',JSON.stringify(data))
    this.state = {
      refreshing: false,
      reRender: false,
      profileData: [
        {
          heading: data.display_name.key,
          text: data.display_name.value,
          show: true,
        },
        {
          heading: data.user_email.key,
          text: data.user_email.value,
          show: true,
        },

        {
          heading: data.phone.key,
          text: data.phone.value,
          show: true,
        },

        {
          heading: data.simple_ads.key,
          text: data.simple_ads.value,
          show: true,
        },

        {
          heading: data.featured_ads.key,
          text: data.featured_ads.value,
          show: true,
        },
        {
          heading: data.bump_ads.key,
          text: data.bump_ads.value,
          show: data.bump_ads_is_show,
        },
        {
          heading: data.expire_date.key,
          text: this.convertDate(data.expire_date.value),
          show: true,
        },
        // {
        //   heading: data.profile_extra.package_expiry.key,
        //   text: data.profile_extra.package_expiry.value,
        //   show: true,
        // },
      ],




    }
  }
  convertDate = (date) => {
    if (date.includes('-')) {
      let splitted = date.split('-')
      return splitted[2] + " - " + splitted[1] + " - " + splitted[0]
    } else {
      return date
    }
  }
  // convertNumToMonth = (num) => {
  //   switch (num) {
  //     case '1' || 1:
  //       return 'Janruary'
  //     case '2' || 2:
  //       return 'Febuary'
  //     case '3' || 3:
  //       return 'March'
  //     case '4' || 4:
  //       return 'April'
  //     case '5' || 5:
  //       return 'May'
  //     case '6' || 6:
  //       return 'June'
  //     case '7' || 7:
  //       return 'July'
  //     case '8' || 8:
  //       return 'Aug'
  //     case '9' || 9:
  //       return 'Sep'
  //     case '10' || 10:
  //       return 'Oct'
  //     case '11' || 11:
  //       return 'Nov'
  //     case '12' || 12:
  //       return 'Dec'
  //   }
  // }



  _onRefresh = async () => {
    // await
    this.setState({ refreshing: true });


    let { orderStore } = Store;
    orderStore.profile = await Api.get('profile');
    if (orderStore.profile.success === true) {
      let tabsText = orderStore.profile.data.tabs_text;

      this.tabsText = { profile: tabsText.profile, editProfile: tabsText.edit_profile, featuredAds: tabsText.featured_ads, inactiveAds: tabsText.inactive_ads, myAds: tabsText.my_ads, favouriteAds: tabsText.favorite_ads,expireAds:tabsText.expired_ads,soldAds:tabsText.sold_ads };
      this.setState({ showSpinner: false });
      // this.props.navigation.navigate('Profile');   

    }
    if (orderStore.profile.message.length != 0)
      Toast.show(orderStore.profile.message);

    setTimeout(async () => {

      this.setState({ refreshing: false, reRender: !this.state.reRender });

    }, 1000);

  }

  render() {


    let { orderStore } = Store;
    let data = orderStore.profile.data;
    let extraText = orderStore.profile.extra_text;
    // console.log('profile is ',JSON.stringify(orderStore.profile))

    return (
      <View style={{
        height: '100%',
        backgroundColor: Appearences.Colors.appBackgroundColor,
        paddingBottom: 5,
      }}>

        <ScrollView
          key={this.state.reRender}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >


          <ProfileHeader />

          <View style={styles.container}>
            <View style={styles.panel}>
              <View style={[styles.headingContainer]}>
                <Text style={styles.headingText}>{extraText.profile_title}</Text>

                <TouchableOpacity

                  onPress={() => {
                    this.props.navigation.navigate('DealerTabManager', { dealerId: orderStore.profile.data.id });
                  }}
                  style={{ top: wp('1'), position: 'absolute', right: wp('1') }}>
                  <Text style={[styles.headingText, { fontSize: wp('3'), fontWeight: 'bold', color: orderStore.color }]}>{orderStore.profile.data.profile_extra.view_public_prfile_text}</Text>
                </TouchableOpacity>
              </View>





              <FlatList
                data={this.state.profileData}
                horizontal={false}
                showsVerticalScrollIndicator={false}

                renderItem={({ item, index }) => {
                  if (!item.show)
                    return null;
                  return (
                    <View style={styles.flatListContainer} >
                      <View style={styles.overviewContentRownContainer}>
                        <Text style={styles.overviewContetHeading}>{item.heading}</Text>
                        <Text style={styles.overViewContentText}>{item.text}</Text>
                      </View>
                      <View style={this.state.profileData.length - 1 == index ? styles.noStyle : styles.overViewSeperator} />
                    </View>
                  );
                }
                }
                keyExtractor={item => item.heading}>
              </FlatList>

            </View>
          </View>
        </ScrollView>
      </View>
    );
  }


}

export default withNavigation(Profile);






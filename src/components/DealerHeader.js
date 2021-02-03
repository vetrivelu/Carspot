import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  FlatList,
  Platform,
} from 'react-native';
import Appearences from '../config/Appearences'
import Store from './../Stores';
import { Avatar } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import Toast from 'react-native-simple-toast';

export default class Profile extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {

    };
  }


  openInBrowser = (url) => {
    if (url.length === 0)
      return;
    if (url.includes('https')) {
      Linking.openURL(url)
    } else {
      Linking.openURL('https://' + url)
    }

    // Linking.canOpenURL(url).then(supported => {
    //   if (supported) {
    //     Linking.openURL(url);
    //   } else {
    //     Toast.show("Invalid URL");
    //   }
    // });
  };


  setLatLong = () => {
    let { orderStore } = Store;
    const profile = orderStore.publicProfile;
    const latLong = profile.lat_long;

    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${latLong.lat},${latLong.long}`;
    const label = 'label';
    const url = Platform.select({
      ios: `${scheme}@${latLng}`,
      android: `${scheme}${latLng}`
    });


    Linking.openURL(url);




  }
  componentWillMount(){
    let { orderStore } = Store;
    const profile = orderStore.publicProfile;
    console.log('inside public profile header',JSON.stringify(profile))
  }

  render() {
    let { orderStore } = Store;
    const profile = orderStore.publicProfile;
    // profile.verify
    // console.log('profile.verify', JSON.stringify(profile.verify))
    const latLong = profile.lat_long;
    return (
      <View style={[styles.container, profile.intro != undefined ? { height: 240 } : {}]}>
        <View style={[styles.headerContainer]}>


          <Image style={styles.headerImage}
            source={{ uri: profile.intro.image }}
          />

        </View>
        <View style={styles.absoluteContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.profileContainer}>
              <Avatar
                size='large'
                rounded
                source={{ uri: profile.profile_img }}
                activeOpacity={0.7}
              />
              <View style={styles.profileInfoContainer}>
                <View style={[styles.row, { justifyContent: 'space-between' }]}>
                  {profile.boxes[0].is_show ?

                    <View style={styles.row}>
                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={parseInt(profile.boxes[0].val)}
                        // selectedStar={(rating) => this.onStarRatingPress(rating)}
                        starSize={14}
                        fullStarColor='#D4AF37'
                      />
                      <Text style={[styles.profileInfoStartCountText, { color: orderStore.color }]}>{"(" + profile.boxes[1].val + ")"}</Text>
                    </View>

                    : null}

                  {latLong.is_show && latLong.lat.length != 0 && latLong.long.length != 0 ?
                    <View style={styles.row}>
                      <TouchableOpacity
                        onPress={() => { this.setLatLong() }}
                        style={styles.row}>
                        <Image
                          style={styles.locationImage}
                          source={require('../../res/images/placeholder.png')}
                        />
                        <Text style={[styles.paragraphTextGrey, { marginTop: 0 }]}>
                          {latLong.text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    : null}

                </View>

                <Text style={[styles.headingTextBlack, { fontWeight: Appearences.Fonts.headingFontWieght, fontSize: Appearences.Fonts.subHeadingFontSize, alignSelf: 'flex-start', }]}>
                  {profile.name}
                </Text>
                {profile.verify.text.length != 0 ?
                  <View style={{
                    marginTop: localProps.topMargin,
                    borderRadius: 3,
                    backgroundColor: profile.verify.color,
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    width: '40%',
                  }}>
                    <Text style={styles.paragraphTextWhite}>{profile.verify.text}</Text>
                  </View>
                  : null}
              </View>
            </View>
            <View style={styles.profileHeaderSeperator} />
            <View style={styles.headerContentContainer}>
              <View style={styles.headerContentRow}>
                {profile.boxes[2].is_show ?

                  <View style={[styles.memberSinceColumn]}>
                    <Image style={[styles.headerColumnImage, { tintColor: orderStore.color }]}
                      source={require('../../res/images/calendar.png')} />
                    <Text style={styles.headingTextBlack}>{profile.boxes[2].key}</Text>
                    <Text style={styles.paragraphTextGrey}>{profile.boxes[2].val}</Text>
                  </View>
                  : null}
                {profile.boxes[3].is_show && profile.boxes[2].is_show ? <View style={styles.verticalSeperator} /> : null}
                {profile.boxes[3].is_show ?

                  <View style={[styles.workingHoursColumn]}>
                    <Image style={[styles.headerColumnImage, { tintColor: orderStore.color }]}
                      source={require('../../res/images/clock.png')} />
                    <Text style={styles.headingTextBlack}>{profile.boxes[3].key}</Text>
                    <Text style={styles.paragraphTextGrey}>{profile.boxes[3].val}</Text>
                  </View>

                  : null}
              </View>
              {profile.social.is_show ?
                <FlatList
                  data={profile.social.loop}
                  horizontal={true}
                  contentContainerStyle={{
                    marginTop: localProps.topMargin,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) =>


                    <TouchableOpacity
                      onPress={() => { this.openInBrowser(item.url) }}
                    >
                      {item.url.length != 0 ?
                        <Image style={styles.socialIcon}
                          source=
                          {item.name === "Facebook" ? require('../../res/images/facebook_round.png') :
                            item.name === "Twitter" ? require('../../res/images/twitter_round.png') :
                              item.name === "Linkedin" ? require('../../res/images/linkedin_round.png') :
                                item.name === "Google" ? require('../../res/images/google_round.png') :
                                  item.name === "Youtube" ? require('../../res/images/youtube.png')
                                    : null

                          } /> : null}
                    </TouchableOpacity>


                  }
                  keyExtractor={item => item.name}
                >
                </FlatList>

                : null}


            </View>
          </View>
        </View>
      </View>
    );
  }

}


const localProps = {
  ratingHeaderDataDimens: 7,
  topMargin: 5,
  dataRowNumberFontSize: 12,
  sidePadding: 15,

}

const styles = StyleSheet.create({

  container: {
    height: 350,
    width: '100%',
  },
  headerContainer: {
    height: 200,
    width: '100%',
  },
  headerImage: {
    width: '100%',
    flex: 1,
    resizeMode: 'cover',
  },
  absoluteContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    paddingStart: localProps.sidePadding,
    paddingEnd: localProps.sidePadding,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 5,
    width: '100%',
    height: 220,
    marginVertical: 5,
    marginHorizontal: 5,
    backgroundColor: 'white',
    elevation: Appearences.Shadow.elevation,
    shadowOpacity: Appearences.Shadow.shadow,
    padding: localProps.sidePadding,
  },
  profileContainer: {
    width: "100%",
    height: 75,
    alignItems: 'center',
    flexDirection: 'row',
  },
  profileInfoContainer: {
    marginStart: 10,
    flex: 1,
  },
  profileInfoStarRow: {
    flexDirection: 'row',
  },
  profileInfoStartCountText: {
    fontSize: Appearences.Fonts.paragraphFontSize,
    marginStart: 10,
  },
  profileDealerTypeContainer: {

  },
  profileHeaderSeperator: {
    width: '100%',
    marginTop: localProps.topMargin,
    backgroundColor: Appearences.Colors.lightGrey,
    height: 1,
  },
  paragraphTextWhite: {
    fontSize: Appearences.Fonts.paragraphFontSize,
    color: 'white',
  },
  headingTextBlack: {
    marginTop: localProps.topMargin,
    fontSize: Appearences.Fonts.headingFontSize,
    color: 'black',
  },
  headerContentContainer: {
    width: '100%',
    marginTop: localProps.topMargin,
    alignItems: 'center',
  },
  headerContentRow: {
    flexDirection: 'row',
    width: '100%',
  },
  memberSinceColumn: {
    alignItems: 'flex-end',
    marginEnd: 15,
    flex: 1,
  },
  verticalSeperator: {
    width: 1,
    backgroundColor: Appearences.Colors.lightGrey,
    height: 30,
  },
  workingHoursColumn: {
    marginStart: 15,
    flex: 1,
  },
  headerColumnImage: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
    marginTop: localProps.topMargin,
  },
  paragraphTextGrey: {
    color: Appearences.Colors.grey,
    fontSize: Appearences.Fonts.paragraphFontSize,
    marginTop: localProps.topMargin,
  },


  socialIcon: {
    width: 20,
    height: 20,
    marginStart: 10,
  },
  getDirectionRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: localProps.topMargin,
  },
  row: {
    flexDirection: 'row',
  },
  locationImage: {
    tintColor: Appearences.Colors.grey,
    width: 15,
    height: 15,
    marginEnd: 3,
  },
});
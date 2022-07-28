import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Appearences from '../config/Appearences'
import Visibility from './Visibility';
import { observer } from 'mobx-react';
import Store from './../Stores';
import Api from '../network/Api';
import * as Progress from 'react-native-progress';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';

import LocalDb from '../storage/LocalDb';
import Toast from 'react-native-simple-toast';
import { toJS } from 'mobx';
import { Avatar } from 'react-native-elements';

@observer
export default class Profile extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      hideImageUploadOverlay: true,

    };
  }

  showImagePicker = () => {

    ImagePicker.openPicker({
      multiple: false
    }).then(images => {
      this.uploadImages(images);
    });

  }
  uploadImages=async(img)=>{
    let { orderStore } = Store;
    // console.log('image is',img)
    this.setState({ hideImageUploadOverlay: false });
    // Api.postImageMulti("profile/image", "profile_img", img);
    // orderStore.innerResponse = await Api.postImageMulti("profile/image", "profile_img", img);
    orderStore.innerResponse = await Api.postImage('profile/image', 'profile_img', img);
    if (orderStore.innerResponse.success === true) {

      let locaDb = await LocalDb.getUserProfile();
      orderStore.dp = orderStore.innerResponse.data.profile_img;
      locaDb.dp = orderStore.innerResponse.data.profile_img;
      // console.log('user profile local',locaDb)
      await LocalDb.saveProfile(locaDb);


    }
    this.setState({ hideImageUploadOverlay: true });
    if (orderStore.innerResponse.message.length != 0)
      Toast.show(orderStore.innerResponse.message);
  }

  componentWillMount(){
    let { orderStore } = Store;
    // console.log('profile header===>',JSON.stringify(orderStore.profile))    
  }
  render() {
    let { orderStore } = Store;
    let profileExtra = orderStore.profile.data.profile_extra;
    return (
      <View style={styles.headerContainer}>
        <View style={[styles.headerColoredBackground, { backgroundColor: orderStore.color }]} />

        <View style={styles.headerAbsoluteContainer}>
          <View style={styles.headerAbsoluteContainerContent}>
            <View style={styles.headerAbsoluteContent}>
              <Text style={styles.headerAbsoluteContentName}>
                {orderStore.name}
              </Text>
              <Text style={[styles.headerAbsoluteContentLastLoggedIn, { color: orderStore.color }]}>

                {profileExtra.last_login}


              </Text>
              <View style={styles.headerAbsoluteDataRowContainer}>
                <View>
                  <Text style={styles.headerAbsoluteDataRowNumerics}>



                    {profileExtra.ads_solds.value}



                  </Text>
                  <Text style={styles.headerAbsoluteDataRowText}>

                    {profileExtra.ads_solds.key}


                  </Text>
                </View>


                <View>
                  <Text style={styles.headerAbsoluteDataRowNumerics}>

                    {profileExtra.ads_total.value}



                  </Text>
                  <Text style={styles.headerAbsoluteDataRowText}>

                    {profileExtra.ads_total.key}


                  </Text>
                </View>

                <View>
                  <Text style={styles.headerAbsoluteDataRowNumerics}>

                    {profileExtra.ads_inactive.value}


                  </Text>
                  <Text style={styles.headerAbsoluteDataRowText}>

                    {profileExtra.ads_inactive.key}


                  </Text>
                </View>

              </View>




            </View>
          </View>
        </View>

        <View
          disabled={!this.state.hideImageUploadOverlay}
          style={styles.headerAbsoluteImageContainer}

        >
          <TouchableOpacity
            onPress={this.showImagePicker}
            style={styles.headerImageContainer}>

            <Avatar
              size='large'
              rounded
              source={{ uri: orderStore.dp }}
              activeOpacity={0.7}
              containerStyle={{ alignSelf: 'center', marginVertical: 20, marginHorizontal: 10 }}
            />



            <View style={styles.headerRatingAbsoluteContainer}>

              <Visibility
                hide={this.state.hideImageUploadOverlay}
                style={styles.headerImageContainerOverlay}>
                <Progress.Circle
                  size={Appearences.Fonts.paragraphFontSize}
                  indeterminate={true}
                  color={orderStore.color}
                />

              </Visibility>

              <View style={[styles.headerRatingContainer, { backgroundColor: orderStore.color }]}>
                <Image
                  style={styles.headerRatingContainerImage}
                  source={require('../../res/images/star_white.png')}
                />
                <Text style={styles.headerRatingContainerText}>

                  {profileExtra.rate_bar.avg}

                </Text>
              </View>

            </View>


          </TouchableOpacity>

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

  headerContainer: {
    height: 250,

  },
  headerColoredBackground: {
    height: 180,
  },
  headerAbsoluteContainer: {
    position: 'absolute',
    justifyContent: 'center',
    padding: localProps.sidePadding,
    width: '100%',
    height: '100%',


  },
  //this
  headerAbsoluteContainerContent: {
    backgroundColor: 'white',
    height: 210,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: Appearences.Radius.radius,
    padding: localProps.sidePadding,
  },
  headerAbsoluteContent: {
    marginTop: 60,
    alignItems: 'center',
  },
  headerAbsoluteContentName: {
    fontSize: Appearences.Fonts.subHeadingFontSize,
    color: Appearences.Colors.black,
    marginTop: localProps.topMargin,
    fontWeight: Appearences.Fonts.headingFontWieght,
  },
  headerAbsoluteContentLastLoggedIn: {
    fontSize: Appearences.Fonts.paragraphFontSize,
    fontFamily: Appearences.Fonts.paragaphFont,
    marginTop: localProps.topMargin,
  },
  headerAbsoluteContentProfileRow: {
    marginTop: localProps.topMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerAbsoluteContentProfileRowImage: {
    width: Appearences.Fonts.paragraphFontSize,
    height: Appearences.Fonts.paragraphFontSize,
    marginTop: 1.5,
  },
  headerAbsoluteContentProfileRowText: {

    fontSize: Appearences.Fonts.paragraphFontSize,
    fontFamily: Appearences.Fonts.paragaphFont,
    color: Appearences.Colors.headingGrey,
    marginStart: 3,
  },

  headerAbsoluteDataRowContainer: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: Appearences.Colors.appBackgroundColor,
    borderRadius: Appearences.Radius.radius,
    paddingTop: 13,
    paddingBottom: 13,
  },

  headerAbsoluteDataRowNumerics: {
    fontSize: Appearences.Fonts.subHeadingFontSize,
    color: Appearences.Colors.black,
    textAlign: 'center',
  },
  headerAbsoluteDataRowText: {
    fontSize: Appearences.Fonts.headingFontSize,
    color: Appearences.Colors.black,
  },

  headerAbsoluteImageContainer: {
    position: 'absolute',
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: localProps.sidePadding,
  },//this
  headerImageContainer: {
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 80,
    position: 'absolute',
    backgroundColor: "#0000",

  },
  headerImageContainerOverlay: {
    borderRadius: 80,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.5)',

  },
  headerImage: {

    width: 75,
    height: 75,
    borderRadius: 75
  },
  headerRatingAbsoluteContainer: {
    width: '100%',
    height: '100%',

    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  headerRatingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
    borderRadius: 5,
    borderColor: 'white',
    borderWidth: 0.5,
    flexDirection: 'row',
    width: 35,
  },
  headerRatingContainerImage: {
    width: localProps.ratingHeaderDataDimens,
    height: localProps.ratingHeaderDataDimens,
    marginBottom: 2,
    marginEnd: 1,
  },
  headerRatingContainerText: {

    fontSize: localProps.ratingHeaderDataDimens,
    fontFamily: Appearences.Fonts.paragaphFont,
    color: 'white',
    marginStart: 1,
  },


});
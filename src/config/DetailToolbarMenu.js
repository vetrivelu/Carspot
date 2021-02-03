import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  Share,
  Modal,
  TextInput, KeyboardAvoidingView
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Appearences from '../config/Appearences';
import Store from './../Stores';
import { observer } from 'mobx-react';
import { withNavigation } from 'react-navigation';
import Api from '../network/Api'
import ModalDropdown from 'react-native-modal-dropdown';
import Toast from 'react-native-simple-toast';
import Visibility from '../components/Visibility'
import * as Progress from 'react-native-progress';
import { widthPercentageToDP as wp } from '../helper/Responsive'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

@observer
class DetailToolbarMenu extends Component<Props>  {

  constructor(props) {
    super(props);
    this.state = {
      hidePostReportProgress: false,
      showEditOption: false,
      showReportModal: false,
      hidePostReportProgress: true,
      shittyArray: [],


    }
  }

  share = () => {
    let { orderStore } = Store;
    const shareInfo = orderStore.adDetail.data.share_info;
    Share.share({
      message:
        shareInfo.title + "\n" + shareInfo.text + "\n" + shareInfo.link,
    });

  }
  reportAd = async () => {
    this.setState({ hidePostReportProgress: false });
    let { orderStore } = Store;
    let adId = orderStore.adDetail.data.ad_detail.ad_id;
    let params = { ad_id: adId, option: this.state.reportOption, comments: this.state.reportMessage };
    const response = await Api.post("ad_post/report", params);
    if (response.success === true) {
      this.setState({ reportAd: false })
      Toast.show('Reported successfully')
    }

    this.setState({ hidePostReportProgress: true });
    if (response.message.length != 0)
      Toast.show(response.message);

  }

  addToFavourites = async () => {
    // this.setState({ showSpinner: true });
    console.log('here')
    let { orderStore } = Store;
    // orderStore.setOnClickFavouritetListener(false);
    let adId = orderStore.adDetail.data.ad_detail.ad_id;
    let params = { ad_id: adId };
    const response = await Api.post("ad_post/favourite", params);

    if (response.success === true) {

    }

    // this.setState({ showSpinner: false });
    if (response.message.length != 0)
      Toast.show(response.message);
  }

  componentDidMount() {
    let { orderStore } = Store;
    const data = orderStore.adDetail.data;
    // console.log('im atleast here',JSON.stringify(orderStore.adDetail))
    // if (data.bid_popup.bid_details.data.bids.length === 0)
    //   this.setState({ isBidListEmpty: false });
    // else
    //   this.setState({ isBidListEmpty: true });
    // console.log('report', [...data.report_popup.select.name])
    // this.setState({ shittyArray: [...data.report_popup.select.name] });
    console.log('ordr', data)
  }

  componentWillReceiveProps(nextProps) {
    console.log('here coming are', nextProps)
  }
  render() {
    let { orderStore } = Store;
    const data = orderStore.adDetail.data;
    // console.log('data is',JSON.stringify(data))
    if (orderStore.adDetailComponentMounted) {

      this.setState({ showEditOption: true });
      orderStore.setAdDetailComponentMounted(false);

    }
    else {


    }
    // const staticText = orderStore.innerResponse.data.static_text;

    return (

      <View>
        <View style={styles.twoButtonView}>
          {

            this.state.showEditOption ?
              <TouchableOpacity
                onPress={() => {
                  let { orderStore } = Store;
                  this.props.navigation.replace('SellEdit', { adId: orderStore.adDetail.data.ad_detail.ad_id, isUpdate: true });
                }}
              >
                <Image
                  style={styles.icons}
                  source={require('../../res/images/edit_white.png')} />
              </TouchableOpacity>
              : null
          }

          <Menu>
            <MenuTrigger>
              <Image
                source={require('../../res/images/menu_white.png')}
                style={styles.icons} />
            </MenuTrigger>

            <MenuOptions>
              <MenuOption onSelect={() =>
                // this.refs.reportModal.open();
                // orderStore.setOnClickShareListener(true);
                this.share()
              }>
                <View style={styles.menuContainer}>
                  <Image
                    style={styles.menuImage}
                    source={require('../../res/images/share_grey.png')} />
                  <Text style={styles.menuTextStyle}>{orderStore.detailToolbarModel.shareText}</Text>
                </View>
                <View style={styles.menuItemSperator} />
              </MenuOption>

              <MenuOption onSelect={() =>
                // this.refs.reportModal.open();
                // orderStore.setOnClickFavouritetListener(true);
                this.addToFavourites()

              }>
                <View style={styles.menuContainer}>
                  <Image
                    style={styles.menuImage}
                    source={require('../../res/images/heart_red.png')} />
                  <Text style={styles.menuTextStyle}>{orderStore.detailToolbarModel.favouriteText}</Text>
                </View>
                <View style={styles.menuItemSperator} />
              </MenuOption>

              <MenuOption onSelect={() =>
                // this.refs.reportModal.open();
                // orderStore.setOnClickReportListener(true);
                this.setState({ showReportModal: true })
              }>
                <View style={styles.menuContainer}>
                  <Image
                    style={styles.menuImage}
                    source={require('../../res/images/caution_grey.png')} />
                  <Text style={styles.menuTextStyle}>{orderStore.detailToolbarModel.reportText}</Text>
                </View>
              </MenuOption>



            </MenuOptions>
          </Menu>

        </View>


        <Modal

          visible={this.state.showReportModal}
          animationType="slide"
          transparent={false}
          
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.modalContainer}>

              <View style={styles.modal}>




                <View style={styles.modalHeadingContainer}>
                  {
                    data != undefined ?
                      <Text style={styles.modalHeadingText}>{data.report_popup.select.text}</Text>
                      :
                      <Text style={styles.modalHeadingText}></Text>

                  }
                  <TouchableOpacity

                    onPress={() =>
                      // orderStore.setOnClickReportListener(false)
                      this.setState({ showReportModal: false })
                    }
                  >
                    <Image source={require('../../res/images/cross_white.png')}
                      style={styles.modalHeadingImage} />


                  </TouchableOpacity>
                </View>

                {/* Make */}
                {
                  data != undefined ?

                    <View>
                      <TouchableOpacity onPress={() => {
                        this.makeDropdownRef.show();
                      }}
                        style={styles.row}
                      >
                        <ModalDropdown
                          options={[...data.report_popup.select.name]}
                          ref={el => this.makeDropdownRef = el}
                          style={styles.pickerContainer}
                          dropdownStyle={styles.dorpDownStyle}
                          dropdownTextHighlightStyle={styles.dropDownTextStyle}
                          textStyle={styles.dorpdownContainerTextStyle}
                          defaultValue={data != undefined ? data.report_popup.select.key : ''}
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
                            source={require('../../res/images/right_arrow.png')}
                          />
                        </View>
                      </TouchableOpacity>

                    </View>
                    : null}

                <View>
                  <TextInput
                    multiline={true}
                    numberOfLines={10}
                    textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                    style={styles.TextInputMultiline}
                    placeholder={data != undefined ? data.report_popup.input_textarea : ''}
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
                        // orderStore.setOnClickReportListener(false)
                        this.setState({ showReportModal: false })
                      }
                      style={styles.cancelButton}>
                      {
                        data != undefined ?
                          <Text style={[styles.modalButtonTextStyle, { color: Appearences.Colors.black }]}> {data.report_popup.btn_cancel} </Text>
                          : null
                      }
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={this.reportAd}
                      style={[styles.sendButton, { backgroundColor: orderStore.color }]}>
                      {
                        data != undefined ?
                          <Text style={styles.modalButtonTextStyle}>{data.report_popup.btn_send} </Text>
                          : null
                      }
                    </TouchableOpacity>
                  </View>
                </Visibility>

              </View>
            </KeyboardAvoidingView>
        </Modal>




      </View>
    );


  }

}
const localProps = {
  ratingHeaderDataDimens: 7,
  topMargin: 5,
  dataRowNumberFontSize: 12,
  sidePadding: 15,

};
const styles = StyleSheet.create({


  icons: {
    width: 20,
    height: 20,
    marginEnd: 10,
    padding: 10,

  },
  modalButtonTextStyle: {
    fontSize: Appearences.Fonts.headingFontSize,
    fontWeight: Appearences.Fonts.headingFontWieght,
    color: 'white',
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: "absolute",
    alignItems: "center",
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: wp(15)
    //  backgroundColor:'white',
  },

  modalHeadingContainer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',


  },
  TextInputMultiline: {

    backgroundColor: Appearences.Registration.boxColor,
    fontSize: Appearences.Fonts.headingFontSize,
    marginTop: 5,
    minHeight: 100,
    textAlignVertical: 'top',
    maxHeight: 100,
    padding: 15,
    borderRadius: Appearences.Radius.radius,
  },
  modaHeadingText: {
    color: 'white',
    fontSize: Appearences.Fonts.headingFontSize,
    marginStart: localProps.sidePadding,

  },
  modalHeadingImage: {

    tintColor: Appearences.Colors.black,
    width: 15,
    height: 15,
  },

  modalProgressContainer: {
    width: '100%',
    height: 40,
    marginTop: localProps.topMargin,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonRowContainer: {
    width: '100%',
    height: 40,
    marginTop: localProps.topMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    height: '100%',
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Appearences.Radius.radius,
    borderColor: Appearences.Colors.grey,
    borderWidth: 1,

  },
  pickerContainer: {
    height: Appearences.Registration.itemHeight,
    width: "100%",
    backgroundColor: Appearences.Registration.boxColor,
    paddingStart: 15,
    paddingEnd: 15,
    marginTop: localProps.topMargin,
    marginBottom: localProps.topMargin,
    paddingBottom: 0,
    paddingTop: 0,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dorpDownStyle: {
    width: '70%',
    marginStart: -15,
  },
  dropDownTextStyle: {
    fontSize: Appearences.Fonts.headingFontSize,
    color: Appearences.Colors.headingGrey,
    padding: 10,
    textAlignVertical: 'center',
    marginTop: 5,

  },
  dorpdownContainerTextStyle: {
    fontSize: Appearences.Fonts.headingFontSize,
    color: Appearences.Colors.headingGrey,

  },
  dorpDownRow: {
    width: '100%',

    justifyContent: 'center',
  },

  dropdownArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    paddingEnd: 15,
  },
  dropdownSeperatorStyle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    marginTop: 5,

  },

  sendButton: {
    height: '100%',
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Appearences.Radius.radius,

  },

  twoButtonView: {
    flexDirection: 'row',
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingStart: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  menuTextStyle: {
    fontSize: Appearences.Fonts.headingFontSize,
    color: Appearences.Colors.grey,
    marginStart: 5,
  },

  menuItemSperator: {
    height: 1,
    width: '100%',
    backgroundColor: Appearences.Colors.lightGrey,
    marginTop: 5,
  },
  menuImage: {
    width: Appearences.Fonts.headingFontSize,
    height: Appearences.Fonts.headingFontSize,
  },

});
export default withNavigation(DetailToolbarMenu)


// import React, { Component } from 'react';
// import {
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   View,
//   Text,
//   TextInput,
// } from 'react-native';
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';
// import Appearences from '../config/Appearences';
// import Store from './../Stores';
// import { observer } from 'mobx-react';
// import { withNavigation } from 'react-navigation';


// @observer
// class DetailToolbarMenu extends Component<Props>  {

//   constructor(props) {
//     super(props);
//     this.state = {
//       hidePostReportProgress: false,
//       showEditOption: false,
//     }
//   }


//   render() {
//     let { orderStore } = Store;
//     if (orderStore.adDetailComponentMounted) {

//       this.setState({ showEditOption: true });
//       orderStore.setAdDetailComponentMounted(false);

//     }
//     else {


//     }
//     // const staticText = orderStore.innerResponse.data.static_text;

//     return (

//       <View>







//         <View style={styles.twoButtonView}>


//           {

//             this.state.showEditOption ?
//               <TouchableOpacity
//                 onPress={() => {
//                   let { orderStore } = Store;
//                   this.props.navigation.replace('SellEdit', { adId: orderStore.adDetail.data.ad_detail.ad_id, isUpdate: true });
//                 }}
//               >
//                 <Image
//                   style={styles.icons}
//                   source={require('../../res/images/edit_white.png')} />
//               </TouchableOpacity>
//               : null
//           }

//           <Menu>
//             <MenuTrigger>
//               <Image
//                 source={require('../../res/images/menu_white.png')}
//                 style={styles.icons} />
//             </MenuTrigger>

//             <MenuOptions>
//               <MenuOption onSelect={() => {
//                 // this.refs.reportModal.open();
//                 orderStore.setOnClickShareListener(true);
//               }}>
//                 <View style={styles.menuContainer}>
//                   <Image
//                     style={styles.menuImage}
//                     source={require('../../res/images/share_grey.png')} />
//                   <Text style={styles.menuTextStyle}>{orderStore.detailToolbarModel.shareText}</Text>
//                 </View>
//                 <View style={styles.menuItemSperator} />
//               </MenuOption>

//               <MenuOption onSelect={() => {
//                 // this.refs.reportModal.open();
//                 orderStore.setOnClickFavouritetListener(true);
//               }}>
//                 <View style={styles.menuContainer}>
//                   <Image
//                     style={styles.menuImage}
//                     source={require('../../res/images/heart_red.png')} />
//                   <Text style={styles.menuTextStyle}>{orderStore.detailToolbarModel.favouriteText}</Text>
//                 </View>
//                 <View style={styles.menuItemSperator} />
//               </MenuOption>

//               <MenuOption onSelect={() => {
//                 // this.refs.reportModal.open();
//                 orderStore.setOnClickReportListener(true);
//               }}>
//                 <View style={styles.menuContainer}>
//                   <Image
//                     style={styles.menuImage}
//                     source={require('../../res/images/caution_grey.png')} />
//                   <Text style={styles.menuTextStyle}>{orderStore.detailToolbarModel.reportText}</Text>
//                 </View>
//               </MenuOption>



//             </MenuOptions>
//           </Menu>

//         </View>
//       </View>
//     );


//   }

// }
// const localProps = {
//   ratingHeaderDataDimens: 7,
//   topMargin: 5,
//   dataRowNumberFontSize: 12,
//   sidePadding: 15,

// };
// const styles = StyleSheet.create({


//   icons: {
//     width: 20,
//     height: 20,
//     marginEnd: 10,
//     padding: 10,

//   },


//   twoButtonView: {
//     flexDirection: 'row',
//   },
//   menuContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     paddingStart: 10,
//     paddingBottom: 5,
//     paddingTop: 5,
//   },
//   menuTextStyle: {
//     fontSize: Appearences.Fonts.headingFontSize,
//     color: Appearences.Colors.grey,
//     marginStart: 5,
//   },

//   menuItemSperator: {
//     height: 1,
//     width: '100%',
//     backgroundColor: Appearences.Colors.lightGrey,
//     marginTop: 5,
//   },
//   menuImage: {
//     width: Appearences.Fonts.headingFontSize,
//     height: Appearences.Fonts.headingFontSize,
//   },

// });
// export default withNavigation(DetailToolbarMenu)

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';

import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import Appearences from '../../src/config/Appearences';
import LocalDb from '../storage/LocalDb';
import Api from '../network/Api';

import firebase from 'react-native-firebase';

import Store from './../Stores';
import { Avatar } from 'react-native-elements';

import Toast from 'react-native-simple-toast';
import { observer } from 'mobx-react';
import Language from '../drawerscreens/language/Language';
data = ""
@observer
class SideMenu extends Component {
  previousIndex = 0;
  backgroundOpacity = '20';
  navigateToScreen = (route, title) => () => {

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.setParams({ otherParam: title });
    this.props.navigation.dispatch(navigateAction);
    this.setState({
      selecetedItemName: route,
    });
  }
  rateUs = (link) => {
    Linking.canOpenURL(link).then(supported => {
      supported && Linking.openURL(link);
    }, (err) => alert(err));
  }
  nav = (route, title) => {
    firebase.analytics().setCurrentScreen(title);

    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    // console.log('title is',title)
    this.props.navigation.setParams({ otherParam: title });
    this.props.navigation.dispatch(navigateAction);
  }
  constructor(props) {
    super(props);
    let { orderStore } = Store;
    // console.warn(orderStore.isPublicProfile);
    this.state = {

      selecetedItemName: "Home",
      active: false,
      dialogueVisible: false,
      backgroundColor: [],
      // data: ''
    }

  }
  async componentDidMount() {
    let { orderStore } = Store;

    const response = await Api.get('post_ad');
    // console.log('xyxy',JSON.stringify(response))

    if (response.success == true) {
      // console.log('here with success true')

      orderStore.isSell = true
      data = await LocalDb.getUserProfile();
      // this.setState({ userObj: data })

    } else {
      // console.log('xyxy',response.message)
      orderStore.isSellResMsg = response.message
      orderStore.isSell = false
    }
  }
  componentWillMount = () => {
    // const response = await Api.get('post_ad');


    let { orderStore } = Store;
    // if(response.success==true){
    //   orderStore.isSell=true
    // }else{
    //   orderStore.isSell=false
    // }
    let bgColor = [];
    let menuClone = [...orderStore.drawerMenu];
    let model = { key: 'app_rating', value: orderStore.appRating.title, is_show: orderStore.appRating.is_show, menu_for: 'both' }
    if (orderStore.drawerMenu[orderStore.drawerMenu.length - 1].key != model.key) {
      menuClone.push(model);
      orderStore.drawerMenu = [...menuClone];
    }
    for (let i = 0; i < orderStore.drawerMenu.length; i++) {
      let customStyle = { bgColor: 'white', tintColor: Appearences.Colors.black, textColor: Appearences.Colors.black }
      bgColor.push(customStyle);
    }
    if (bgColor.length != 0) {
      bgColor[0].bgColor = orderStore.color + this.backgroundOpacity;

      bgColor[0].tintColor = orderStore.color;

      bgColor[0].textColor = orderStore.color;
    }
    this.setState({ backgroundColor: bgColor });
  }
  shouldShowMenuItem = (menuFor, isPublic, isVisible,value) => {
    
    if (!isVisible)
      return false;
    if (value=='')
    return false
    switch (menuFor) {
      case "not_login":
        if (isPublic)
          return true;
        else
          return
        false;
      case "only_login":
        if (!isPublic)
          return true;
        else
          return false;
      case "both":
        return true;
    }


  }
  onItemSelected = (item, index) => {
    customStyle = { bgColor: 'white', tintColor: Appearences.Colors.black, textColor: Appearences.Colors.black }

    let { orderStore } = Store;
    let bgColorClone = [...this.state.backgroundColor];
    bgColorClone[this.previousIndex].bgColor = 'white';
    bgColorClone[index].bgColor = orderStore.color + this.backgroundOpacity;

    bgColorClone[this.previousIndex].tintColor = Appearences.Colors.black;
    bgColorClone[index].tintColor = orderStore.color;

    bgColorClone[this.previousIndex].textColor = Appearences.Colors.black;
    bgColorClone[index].textColor = orderStore.color;


    this.setState({ backgroundColor: bgColorClone });
    this.previousIndex = index;
  }
  onPressLink = async (item) => {
    let { orderStore } = Store;
    let data = await LocalDb.getUserProfile();
    // this.setState({ userObj: data })

    // console.log("orderStore is",JSON.stringify(orderStore))
    const screenTitle = orderStore.screenTitles;
    switch (item.key) {
      case "home":
        this.nav('Home', screenTitle.home)
        break;
      case "profile":
        this.nav('Profile', screenTitle.profile);
        break;
      case "search":
        this.nav('AdvancedSearch', screenTitle.advance_search);
        break;
      case "inbox_list":
        this.nav('Inbox', screenTitle.inbox)
        break;
        // ....>>>> Languague Addition Screen
        case "language":
          this.nav('Language',screenTitle.language)
          break;
      case "sell_your_car":
        if (data != null && data != '') {
          if (orderStore.isSell == true) {
            // console.log('here when navigating true')

            if (!orderStore.isPublicProfile)
              this.nav('Sell', screenTitle.sell)
            else
              this.nav('Signin', screenTitle.sell)
          } else {
            // console.log('here when navigating false')
            Toast.show('Please subscribe package for ad posting.');

            this.nav('Package', screenTitle.packages)
          }
        } else {
          this.nav('Signin', 'Sign In')
        }


        break;
      case "comparison_search":
        this.nav('Comparison', screenTitle.camparison_search)
        break;
      case "packages":
        if (data != null && data != '') {
          this.nav('Package', screenTitle.packages)

        } else {
          this.nav('Signin', 'Sign In')
        }
        break;
      case "review":
        this.nav('ReviewGrid', screenTitle.review)
        break;
      case "about_us":
        this.nav('About', screenTitle.about_us)
        break;
      case "contact_us":
        this.nav('ContactUs', screenTitle.contact_us)
        break;
      case "blog":
        this.nav('Blog', screenTitle.blog)
        break;
      case "login":
        this.nav('Signin', 'Sign In')
        break;
      case "register":
        this.nav('Signup', 'Sign Up')
        break;
      case "logout":
        await LocalDb.saveRememberMe("no");
        await LocalDb.saveProfile(null);
        await LocalDb.saveIsProfilePublic('1');
        orderStore.dp = orderStore.defaultDp;
        orderStore.name = orderStore.defaultName;
        orderStore.email = '';
        orderStore.isPublicProfile = true;
        this.reset("Signin");
        break;
      case "app_rating":
        this.rateUs(orderStore.appRating.url);
        break;
      default:
        if (item.key.length != 0 && item.key != undefined && item.key != null && item.key != "null")
          this.props.navigation.navigate("DynamicLinksView", { id: item.key });
    }
  }

UNSAFE_componentWillUpdate = ()=>{
  let { orderStore } = Store;
  if(orderStore.onBlogsViewAllClicked)
    {
      for(let x=0;x<orderStore.drawerMenu.length;x++){
        if(orderStore.drawerMenu[x].key=='blog'){
          // console.log('keyxx',orderStore.drawerMenu[x].key)
          this.onItemSelected(orderStore.drawerMenu[x],x)
          this.onPressLink(orderStore.drawerMenu[x])
        }
      }
      orderStore.setOnBlogViewAll(false);
 
    }
  
  // console.log('clicked on blog view all')
  // console.log('calledß')
}
  
  render() {
    let { orderStore } = Store;
    if(orderStore.onBlogsViewAllClicked)
      console.log('blog view all clicked')
    return (
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>

            <Avatar
              size='large'
              rounded
              source={{ uri: orderStore.dp }}
              activeOpacity={0.7}
              containerStyle={{ marginStart: 15 }}
            />

            <View style={styles.sidePadding}>
              <Text style={[styles.nameText, { color: orderStore.color }]}>{orderStore.name}</Text>
              <Text style={styles.emailText}>{orderStore.email}</Text>
            </View>
          </View>

          {/* Dynamic Links */}
          <View style={styles.sidePadding}>
            <View style={styles.sectionHeadingStyle} />
            {
              orderStore.drawerMenu.map((item, key) => (

                !this.shouldShowMenuItem(item.menu_for, orderStore.isPublicProfile, item.is_show,item.value) ? null :
                  <View key={key}>


                    <TouchableOpacity style={[styles.navSectionStyle, { backgroundColor: this.state.backgroundColor[key].bgColor, }]} onPress={() => {
                      if (orderStore.isSell == false && key == 4) {

                        this.onItemSelected(item, key + 2);
                        this.onPressLink(item);
                      } else {
                        // console.log('item is',JSON.stringify(item))
                        this.onItemSelected(item, key);
                        this.onPressLink(item);
                      }

                    }}>
                      <Image source={this.getImagesSource(item.key)}
                        style={[styles.iconStyle, { tintColor: this.state.backgroundColor[key].tintColor }]}
                      />
                      {
                        item.key == 'inbox_list' ?
                          <Text style={[styles.navItemStyle, { color: this.state.backgroundColor[key].textColor }]}>
                            {item.value} {item.message_count}
                          </Text> :
                          <Text style={[styles.navItemStyle, { color: this.state.backgroundColor[key].textColor }]}>
                            {item.value}
                          </Text>
                      }
                    </TouchableOpacity>
                  </View>



              ))}
          </View>
          {/*Dynamic Links End */}





        </ScrollView>
      </View>
    );
  }
  getImagesSource = (key) => {


    switch (key) {
      case "home":
        return require('../../res/images/home.png');
      case "profile":
        return require('../../res/images/profile.png');
      case "search":
        return require('../../res/images/search_drawer.png');
      case "inbox_list":
        return require('../../res/images/inbox.png');
        case "language":
          return require('../../res/images/language.png')
      case "sell_your_car":
        return require('../../res/images/deal.png');
      case "comparison_search":
        return require('../../res/images/compare.png');
      case "packages":
        return require('../../res/images/package.png');
      case "review":
        return require('../../res/images/review.png');
      case "about_us":
        return require('../../res/images/about.png');
      case "contact_us":
        return require('../../res/images/contact.png');
      case "blog":
        return require('../../res/images/blog.png');
      case "login":
        return require('../../res/images/login.png');
      case "register":
        return require('../../res/images/register.png');
      case "logout":
        return require('../../res/images/logout.png');
      case "app_rating":
        return require('../../res/images/rate_us.png');
      default:
        return require('../../res/images/web.png');
    }
  }

  reset(route) {
    return this.props
      .navigation
      .dispatch(StackActions.reset(
        {
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: route })
          ]
        }));
  }

}

SideMenu.propTypes = {
  navigation: PropTypes.object
};
const styles = StyleSheet.create({


  headerContainer: {

    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
  },


  nameText: {
    marginTop: 10,
    fontSize: Appearences.Fonts.mainHeadingFontSize,
    fontWeight: Appearences.Fonts.headingFontWieght,
  },
  emailText: {
    fontSize: Appearences.Fonts.headingFontSize,
    color: Appearences.Colors.grey,
    marginTop: 1,
  },


  navItemStyle: {

    color: Appearences.Colors.black,
    // fontWeight:"bold",
    fontSize: Appearences.Fonts.drawerItemTextSize,
    fontWeight: Appearences.Fonts.headingFontWieght,
    marginStart: 15,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 2,

  },
  navSectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 3,
  },


  sectionHeadingStyle: {

    width: '100%',
    height: 1,
    backgroundColor: Appearences.Colors.lightGrey,
    marginBottom: 5,
  },
  iconStyle: {
    width: Appearences.Fonts.drawerItemTextSize + 5,
    height: Appearences.Fonts.drawerItemTextSize + 5,
    marginStart: 15,

  },
  sidePadding: {
    paddingStart: 15,
    paddingEnd: 15,
  },
}

);
export default SideMenu;
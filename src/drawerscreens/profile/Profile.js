import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import Appearences from '../../config/Appearences'
import FeaturedAds from './tabs/featured/FeaturedAds';
import InActiveAds from './tabs/inactive/InActiveAds';
import ExpiredAds from './tabs/expired/ExpiredAds';
import SoldAds from './tabs/sold/SoldAds';
import MyAds from './tabs/my/MyAds';
import FavouriteAds from './tabs/favourite/FavouriteAds';
import EditProfile from './tabs/editProfile/EditProfile'
import Profile from './tabs/profile/Profile'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Store from '../../Stores';
import Api from '../../network/Api';
import Toast from 'react-native-simple-toast';
import Loader from '../../components/Loader';
import orderStore from '../../Stores/orderStore';


  
export default class TabManager extends React.Component {
  tabsText = {profile:'',editProfile:'',featuredAds:'',inactiveAds:'',myAds:'',favouriteAds:'',expiredAds:'',soldAds:'',};
  constructor(props){
    super(props);

    this.state = {
      showSpinner:true,     
      refreshing:false,
      index:0,

    }
  }
  componentWillMount=async()=>{

    let {orderStore} = Store;
    orderStore.profile = await Api.get('profile');
    // console.log('profile is=>',JSON.stringify(orderStore.profile))
    if(orderStore.profile.success === true)
       {
        let tabsText = orderStore.profile.data.tabs_text; 
        
        this.tabsText = {profile:tabsText.profile,editProfile:tabsText.edit_profile,featuredAds:tabsText.featured_ads,inactiveAds:tabsText.inactive_ads,myAds:tabsText.my_ads,favouriteAds:tabsText.favorite_ads,expiredAds:tabsText.expired_ads,soldAds:tabsText.sold_ads};
        this.setState({showSpinner:false});
      // this.props.navigation.navigate('Profile');   
        
       }
       if(orderStore.profile.message.length!=0)
       Toast.show(orderStore.profile.message);
    }
  
    
    _renderLabel = ({ route }) => (
      <Text>{route.title}</Text>
    );
   
    getNavigationStates = ()=>{
      return routes = {
        index: this.state.index,
        routes: [
          { key: 'Profile', title: this.tabsText.profile },
          { key: 'EditProfile', title: this.tabsText.editProfile },
          { key: 'MyAds', title: this.tabsText.myAds },
          { key: 'FeaturedAds', title: this.tabsText.featuredAds },
          { key: 'InActiveAds', title: this.tabsText.inactiveAds },
          { key: 'FavouriteAds', title: this.tabsText.favouriteAds },
          { key: 'ExpiredAds', title: this.tabsText.expiredAds },
          { key: 'SoldAds', title: this.tabsText.soldAds },
        ],
      }
    }

    _renderTabBar = props => (
      <TabBar
        {...props}
        scrollEnabled
        pressColor = {orderStore.appColor}
        indicatorStyle={{backgroundColor:orderStore.appColor,top:0,}}
        style={{backgroundColor:'white',height:45,justifyContent:'center'}}
        labelStyle = {{color:'black'}}
        renderLabel = {this._renderLabel}
        
       />
    );
  
    render() {
      if(this.state.showSpinner)
      return(
      <Loader/>
  
      );
      return (
        <TabView
         navigationState={this.getNavigationStates()}
          renderScene={SceneMap({
            Profile: Profile,
            EditProfile: EditProfile,
            FeaturedAds: FeaturedAds,
            InActiveAds: InActiveAds,
            MyAds: MyAds,
            FavouriteAds: FavouriteAds,
            ExpiredAds: ExpiredAds,
            SoldAds: SoldAds,
          })}
          tabBarPosition = "bottom"
          renderTabBar={this._renderTabBar}
          onIndexChange={index => this.setState({ index:index })}
          initialLayout={{ height:0,width: Dimensions.get('window').width }}
        />
      );
    }
  }

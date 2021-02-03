import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
} from 'react-native';
import Appearences from '../../../../config/Appearences';
import Overview from './tabs/overview/Overview';
import Bids from './tabs/bids/Bids';
import Store from '../../../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../../../network/Api';
import Loader from '../../../../components/Loader';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Db from '../../../../storage/LocalDb';
import { observer } from 'mobx-react';
import stores from '../../../../Stores/orderStore';

@observer
export default class AdDetailTabManager extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: stores.screenTitles.ad_detail,
    headerStyle: {
      backgroundColor: stores.color,
    },
  });

  constructor(props) {
    super(props);

    this.state = {
      showSpinner: true,
      currentItem: 1,
      currentImage: 0,
      isImageViewVisle: false,
      screenTitle: "title",
      bidsVisible: true,
      index: 0,
      descriptionTitle: [{
        title: '',

      }],
      mapTitle: [{
        title: '',

      }],





    }

  }

  componentWillUpdate = () => {
    let { orderStore } = Store;
    orderStore.setAdDetailComponentMounted(false);
  }
  componentWillMount = async () => {
    let { orderStore } = Store;

    const params = { ad_id: this.props.navigation.state.params.adId };
    // console.warn('ad id is',JSON.stringify(params));

    orderStore.adDetail = await Api.post('ad_post', params);
    // console.log('so res is',JSON.stringify(orderStore.adDetail))
    const data = orderStore.adDetail.data;
    const staticText = data.static_text;
    this.setState({ bidsVisible: data.bid_popup.is_show });
    orderStore.setDetailToolbarModel(staticText, data.report_popup.select);
    orderStore.detailToolbarModel.shareText = staticText.share_btn;
    if (orderStore.adDetail.success === true) {

      // console.log('ad detail', JSON.stringify(data))
      let descriptionTitleClone = [...this.state.descriptionTitle];
      let mapTitleClone = [...this.state.mapTitle];

      descriptionTitleClone[0].title = staticText.description_title;
      mapTitleClone[0].title = data.ad_detail.location.title;
      const profile = await Db.getUserProfile();
      if (profile != null) {


        if (profile.id == data.profile_detail.id) {
          orderStore.setAdDetailComponentMounted(true);

        }
        else {
          orderStore.setAdDetailComponentMounted(false);
        }
      }







      this.setState({ descriptionTitle: descriptionTitleClone, mapTitle: mapTitleClone });




    }
    this.setState({ showSpinner: false });

  }


  _renderLabel = ({ route }) => (
    <Text>{route.title}</Text>
  );

  getNavigationState = () => {
    let { orderStore } = Store
    return navigationState = {
      index: this.state.index,
      routes: [
        { key: 'Overview', title: orderStore.adDetail.data.tabs_text.overview_tab_text },
        { key: 'Bids', title: orderStore.adDetail.data.tabs_text.bid_tab_text },

      ],
    };
  }
  getNavigationStateNoBid = () => {
    return navigationStateNoBid = {
      index: this.state.index,
      routes: [
        { key: 'Overview', title: 'Overview' },

      ],

    };
  }

  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      pressColor={stores.color}
      indicatorStyle={{ backgroundColor: stores.color, top: 0, }}
      style={this.state.bidsVisible ? { backgroundColor: 'white', height: 45, justifyContent: 'center', } : { height: 0, width: 0 }}
      labelStyle={{ color: 'black' }}
      renderLabel={this._renderLabel}

    />
  );

  renderScene = ({ route, jumpTo }) => {

    let { orderStore } = Store;
    switch (route.key) {
      case 'Overview':
        return <Overview
          callBackFunc={async (item) => {


            this.setState({ showSpinner: true });

            let { orderStore } = Store;


            const params = { ad_id: item.ad_id };
            orderStore.adDetail = await Api.post('ad_post', params);
            const data = orderStore.adDetail.data;
            const staticText = data.static_text;
            this.setState({ bidsVisible: data.bid_popup.is_show });
            orderStore.setDetailToolbarModel(staticText, data.report_popup.select);
            orderStore.detailToolbarModel.shareText = staticText.share_btn;
            if (orderStore.adDetail.success === true) {


              let descriptionTitleClone = [...this.state.descriptionTitle];
              let mapTitleClone = [...this.state.mapTitle];

              descriptionTitleClone[0].title = staticText.description_title;
              mapTitleClone[0].title = data.ad_detail.location.title;

              const profile = await Db.getUserProfile();
              if (profile != null) {


                if (profile.id == data.profile_detail.id) {
                  orderStore.setAdDetailComponentMounted(true);

                }
                else {
                  orderStore.setAdDetailComponentMounted(false);
                }
              }







              this.setState({ descriptionTitle: descriptionTitleClone, mapTitle: mapTitleClone });




            }

            this.setState({ showSpinner: false });





          }}
        />;
      case 'Bids':
        if (this.state.bidsVisible)
          return <Bids
          // callBackFunc = {()=>{
          //   this.setState({onPageTwoNextClick:false,index:2,indexToShow:3})
          // }}
          />;
        return null;

      default:
        return null;
    }
  }


  render() {
    if (this.state.showSpinner)
      return (

        <Loader />


      );
    return (

      <TabView
        navigationState={this.state.bidsVisible ? this.getNavigationState() : this.getNavigationStateNoBid()}
        renderScene={this.renderScene}
        tabBarPosition="bottom"
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index: index })}
        initialLayout={{ height: 0, width: Dimensions.get('window').width }}
        swipeEnabled={false}
      />
    );
  }
}


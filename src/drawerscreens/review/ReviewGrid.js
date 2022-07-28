import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,

} from 'react-native';
import Store from '../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import styles from './Styles';
import Loader from '../../components/Loader'
import * as Progress from 'react-native-progress';
import Appearences from '../../config/Appearences';

export default class ReviewGrid extends Component<Props> {


  defaultData = [];
  defaultPagination;

  componentWillMount = async () => {

    let { orderStore } = Store;
    const response = await Api.get('reviews');
    orderStore.settings = response;

    if (response.success === true) {
      this.setState({ listData: orderStore.settings.data.post });
      this.defaultData = [...orderStore.settings.data.post];
      this.defaultPagination = orderStore.settings.data.pagination;
    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false });
  }

  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true,
      refreshing: false,
      listData: [],
      reCaller: false,
      swipeUp: false,

    }
  }
  _onSwipeUp = async () => {
    await this.setState({ swipeUp: true });

    setTimeout(async () => {
      this.setState({ showSpinner: true });

      let { orderStore } = Store;
      const response = await Api.get('reviews');
      orderStore.settings = response;

      if (response.success === true) {
        this.setState({ listData: orderStore.settings.data.post });
        orderStore.settings.data.post = [...this.defaultData];
        orderStore.settings.data.pagination = this.defaultPagination;
      }
      if (response.message.length != 0)
        Toast.show(response.message);

      this.setState({ showSpinner: false, swipeUp: false, reCaller: false, });

    }, 1000);
  }
  _onRefresh = () => {

    let { orderStore } = Store;
    let pagination = orderStore.settings.data.pagination;
    if (pagination.has_next_page === true) {
      this.setState({ refreshing: true });
      this.loadMore(pagination.next_page);
    }
  }
  loadMore = async (nextPage) => {

    let { orderStore } = Store;

    let params = { page_number: nextPage };
    let response = await Api.post('reviews', params);
    if (response.success === true) {
      orderStore.settings.data.pagination = response.data.pagination;
      orderStore.settings.data.post = [...orderStore.settings.data.post, ...response.data.post];
      this.setState({ listData: orderStore.settings.data.post });

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

    let { orderStore } = Store;
    if (this.state.showSpinner)
      return (
        <Loader />

      );


    return (
      <View style={{
        height: '100%',
        backgroundColor: Appearences.Colors.appBackgroundColor,
        paddingBottom: 5,
      }}>

        <ScrollView

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
          <View style={styles.container}>

            <FlatList

              data={this.state.listData}
              horizontal={false}
              showsVerticalScrollIndicator={false}


              renderItem={({ item, index }) =>


                <TouchableOpacity style={styles.gridContainer}
                  onPress={() => {

                    const { navigate } = this.props.navigation;
                    navigate('ReviewDetail', { id: item.post_id });
                  }}
                >
                  <Image style={styles.gridBackgroundImage} source={{ uri: item.image }} />
                  <View style={styles.overlay}>

                    <View style={styles.topContainer}>
                      <View style={[styles.topTextContainer, { backgroundColor: orderStore.color }]}>
                        <Text style={[styles.text, { fontSize: Appearences.Fonts.paragraphFontSize }]}>{item.cats}</Text>
                      </View>
                    </View>

                    <View style={styles.bottomContainer}>
                      <View style={styles.bottomTextContainer}>
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={styles.text}>{item.date}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>


              }
              keyExtractor={item => item.post_id + ""}
            >
            </FlatList>




          </View>
          {this.state.refreshing ?
            <Progress.Circle
              size={20}
              style={{ alignSelf: 'center' }}
              color={orderStore.color}
              indeterminate={true} /> : null}
        </ScrollView>
      </View>
    );
  }


}





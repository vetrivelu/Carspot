import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  RefreshControl,

} from 'react-native';
import Store from '../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import styles from './Styles';
import StarRating from 'react-native-star-rating';
import Loader from '../../components/Loader';
import * as Progress from 'react-native-progress';
import Appearences from '../../config/Appearences';
export default class Comparison extends Component<Props> {


  paginationDefaultValue;
  defaultData = [];

  onStarRatingPress(rating) {
    console.log("Rating is: " + rating)
  }

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      showSpinner: true,
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
      orderStore.comparison = await Api.get("comparison");
      if (orderStore.comparison.success === true) {
        orderStore.comparison.data.pagination = this.paginationDefaultValue;
        orderStore.comparison.data.comparison = [...this.defaultData];

        this.setState({ listData: orderStore.comparison.data.comparison });
      }
      if (orderStore.comparison.message.length != 0)
        Toast.show(orderStore.comparison.message);
      this.setState({ showSpinner: false, swipeUp: false, reCaller: false, });

    }, 1000);
  }
  componentWillMount = async () => {
    let { orderStore } = Store;
    let    response = await Api.get("comparison");
    orderStore.comparison=response
    // orderStore.comparison = await Api.get("comparison");
    if (response.success === true) {
      this.paginationDefaultValue = response.data.pagination;
      this.defaultData = [...response.data.comparison];
      this.setState({ listData: response.data.comparison });
    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false });

  }
  _onRefresh = () => {

    let { orderStore } = Store;
    let pagination = orderStore.comparison.data.pagination;
    if (pagination.has_next_page === true) {
      this.setState({ refreshing: true });
      this.loadMore(pagination.next_page);
    }
  }
  loadMore = async (nextPage) => {

    let { orderStore } = Store;

    let params = { page_number: nextPage };
    let response = await Api.post('comparison', params);
    if (response.success === true) {
      orderStore.comparison.data.pagination = response.data.pagination;
      orderStore.comparison.data.comparison = [...orderStore.comparison.data.comparison, ...response.data.comparison];
      this.setState({ listData: orderStore.comparison.data.comparison });

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
    if (this.state.showSpinner)
      return (
        <Loader />);

    let { orderStore } = Store;
    const vsText = orderStore.comparison.extra.vs_txt;
    return (

      <View style={{ height: '100%', backgroundColor: Appearences.Colors.appBackgroundColor, }}>
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

                <TouchableOpacity style={styles.listItemContainer}

                  onPress={() => {
                    const { navigate } = this.props.navigation;

                    navigate('ComparisonDetail', { car1: item[0].post_id, car2: item[1].post_id });
                  }}
                >
                  <View style={styles.listContentContainer}>
                    <View style={styles.imageContaner}>
                      {
                        item[0].has_image?
                        <Image source={{ uri: item[0].image }} style={styles.image} />
                        :null
                      }
                    </View>
                    <View style={styles.bottomRowContainer}>
                      <Text style={styles.heaedrText}>{item[0].title}</Text>
                      <View style={styles.ratingBarContainer}>
                        <StarRating
                          disabled={true}
                          maxStars={item.maxStars}
                          rating={parseInt(item[0].rating)}
                          selectedStar={(rating) => this.onStarRatingPress(rating)}
                          starSize={14}
                          fullStarColor='#D4AF37'
                        />
                        <Text style={styles.heaedrText}>  {"( " + item[0].rating + " )"}</Text>
                      </View>
                    </View>
                  </View>
               
                  <View style={styles.listMiddleContainer}>
                    <View style={styles.circle}>
                      <Text style={styles.vsText}>{vsText}</Text>
                    </View>
                  </View>
                 
                  <View style={styles.listContentContainer}>
                    <View style={styles.imageContaner}>
                      {
                        item[1].has_image?
                        <Image source={{ uri: item[1].image }} style={styles.image} />
                        :null
                      }
                    </View>
                    <View style={styles.bottomRowContainer}>
                      <Text style={styles.heaedrText}>{item[1].title}</Text>
                      <View style={styles.ratingBarContainer}>
                        <StarRating
                          disabled={true}
                          maxStars={item.maxStars}
                          rating={item[1].rating}
                          selectedStar={(rating) => this.onStarRatingPress(rating)}
                          starSize={14}
                          fullStarColor='#D4AF37'
                        />
                        <Text style={styles.heaedrText}>  {"( " + item[1].rating + " )"}</Text>
                      </View>
                    </View>
                  </View>
               
                </TouchableOpacity>
              }
              keyExtractor={item => item[0].post_id + ""}>
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








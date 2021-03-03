import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
  Switch,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import StarRating from 'react-native-star-rating';

import Store from '../../../../Stores';
import styles from './Styles';
import DealerHeader from '../../../../components/DealerHeader';
import Api from '../../../../network/Api';
import Appearences from '../../../../config/Appearences'
import * as Progress from 'react-native-progress';

export default class Review extends Component<Props> {

  defaultData = [];

  paginationDefault;
  constructor(props) {

    super(props);

    this.state = {
      serviceRating: 3,
      buyingRating: 4,
      vehicleRating: 5,
      reviewTitle: '',
      reviewText: '',
      switchValue: true,
      listData: [],
      showProgress: false,

      refreshing: false,
      reCaller: false,
      swipeUp: false,
      reRender: false,

      showReviewError: false,
      showMessageError: false,

      isReviewRequired: false,
      isMessageRequired: false,

      hideLoadMoreButton: false,
      hasNexPage: false,

    }
  }


  _onSwipeUp = async () => {
    await this.setState({ swipeUp: true });

    setTimeout(async () => {
      let { orderStore } = Store;
      orderStore.publicProfile.reviews.lists.reviews = [...this.defaultData];
      orderStore.publicProfile.reviews.lists.pagination = this.paginationDefault;
      this.setState({ listData: this.defaultData, swipeUp: false, reCaller: false, hideLoadMoreButton: false, reRender: !this.state.reRender, hasNexPage: this.paginationDefault.has_next_page });

    }, 1000);
  }
  _onRefresh = () => {

    let { orderStore } = Store;
    let pagination = orderStore.publicProfile.reviews.lists.pagination;
    if (pagination.has_next_page === true) {
      this.setState({ hideLoadMoreButton: true });
      this.loadMore(pagination.next_page);
    }

  }
  loadMore = async (nextPage) => {

    let { orderStore } = Store;

    let params = { dealer_id: orderStore.publicProfile.id, page_number: nextPage };
    let response = await Api.post('profile/public/dealer/reviews', params);

    if (response.success === true) {
      orderStore.publicProfile.reviews.lists.pagination = response.data.ratings.pagination;
      orderStore.publicProfile.reviews.lists.reviews = [...orderStore.publicProfile.reviews.lists.reviews, ...response.data.ratings.reviews];
      this.setState({ listData: orderStore.publicProfile.reviews.lists.reviews });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ hideLoadMoreButton: false, reCaller: false, hasNexPage: response.data.ratings.pagination.has_next_page });
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };





  componentWillMount() {
    let { orderStore } = Store;
    this.defaultData = [...orderStore.publicProfile.reviews.lists.reviews];
    this.paginationDefault = orderStore.publicProfile.reviews.lists.pagination;
    this.setState({ hasNexPage: this.paginationDefault.has_next_page });
    const lists = orderStore.publicProfile.reviews.lists.reviews;
    // console.log('here in reviews order store is ',JSON.stringify(orderStore))
    const form = orderStore.publicProfile.review_form.form;
    this.setState({
      isReviewRequired: form.subject.is_required,
      isMessageRequired: form.textarea.is_required
    });


    this.setState({ listData: lists });
  }


  postReview = async () => {
    ///here///
    let { orderStore } = Store;
    this.setState({ showProgress: true });
    const switchVal = this.state.switchValue ? "yes" : "no";

    if (orderStore.innerResponse.data.id == orderStore.publicProfile.id) {
      Toast.show('You cannot rate yourself')
      this.setState({ showProgress: false });
      return
    }
    const params = {
      "user_id": orderStore.publicProfile.id,
      "form_type": "public_profile_review_form",
      "star_1": this.state.serviceRating,
      "star_2": this.state.buyingRating,
      "star_3": this.state.vehicleRating,
      "subject": this.state.reviewTitle,
      "message": this.state.reviewText,
      'recommend': switchVal,
    };
    // console.log('params are', params)

    if (this.state.reviewTitle.length === 0 && this.state.isReviewRequired) {
      this.setState({ showReviewError: true });
    }
    else
      this.setState({ showReviewError: false });

    if (this.state.reviewText.length === 0 && this.state.isMessageRequired) {
      this.setState({ showMessageError: true });
    }
    else
      this.setState({ showMessageError: false });

    // console.log('params before submitting review are', params)
    const response = await Api.post("profile/public/submit/form", params);
    // console.log('response after is', JSON.stringify(response))

    if (response.success === true) {
      this.setState({
        listData: response.data.reviews,
        reviewTitle: '', reviewText: ''
      });
    }
    this.setState({ showProgress: false });
    if (response.message.length != 0) {
      this.setState({
        reviewTitle: '', reviewText: ''
      });

      Toast.show(response.message);

    }
  }

  render() {
    let { orderStore } = Store;
    const reviews = orderStore.publicProfile.reviews;
    const reviewForm = orderStore.publicProfile.review_form;
    return (
      <View style={{
        height: '100%',
        backgroundColor: Appearences.Colors.appBackgroundColor,
        paddingBottom: 5,
      }}>






        <ScrollView
          keyboardShouldPersistTaps='always'
          key={this.state.reRender}
          refreshControl={
            <RefreshControl
              refreshing={this.state.swipeUp}
              onRefresh={this._onSwipeUp}
            />
          }
          showsVerticalScrollIndicator={false}
          // onScroll={({ nativeEvent }) => {
          //   if (this.isCloseToBottom(nativeEvent)) {
          //     if (this.state.reCaller === false) {
          //          this._onRefresh();
          //     }
          //     this.setState({ reCaller: true })

          //   }
          // }}
          scrollEventThrottle={400}
        >

          <DealerHeader />
          <View>

            <View style={styles.panel}>
              <Text style={styles.title}>
                {reviews.title}
              </Text>



              <FlatList
                data={this.state.listData}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) =>


                  <View>
                    <View style={styles.flatListContainer}>
                      <View style={styles.ratinCountBox}>
                        <Text style={styles.ratingCountText}>{item.average_rating}</Text>
                        <StarRating
                          disabled={true}
                          maxStars={5}
                          rating={parseFloat(item.average_rating)}
                          // selectedStar={(rating) => this.onStarRatingPress(rating)}
                          starSize={9}
                          fullStarColor='#D4AF37'
                        />
                      </View>
                      <View style={styles.flatListContentContiner}>
                        <Text style={[styles.subHeading, { marginTop: 5 }]}>
                          {item.rating_title}
                        </Text>
                        <Text style={styles.subHeadingTextGrey}>{item.rating_content}</Text>
                        <Text style={[styles.subHeadingTextGrey, { color: orderStore.color }]}>{item.rating_poster_name}
                          <Text style={styles.subHeadingTextGrey}>{" " + item.rating_recommended_text}</Text>
                        </Text>

                        <View style={styles.row}>
                          <Text style={styles.paragraphTextBlack}>
                            {item.ratings.star_1.title}
                          </Text>
                          <View style={styles.startContainer}>
                            <StarRating
                              disabled={true}
                              maxStars={parseFloat(item.ratings.star_1.total)}
                              rating={parseFloat(item.ratings.star_1.current)}
                              containerStyle={{ alignSelf: 'flex-end', }}
                              // selectedStar={(rating) => this.onStarRatingPress(rating)}
                              starSize={12}
                              fullStarColor='#D4AF37'
                            />
                          </View>
                        </View>

                        <View style={styles.row}>
                          <Text style={styles.paragraphTextBlack}>
                            {item.ratings.star_2.title}
                          </Text>
                          <View style={styles.startContainer}>
                            <StarRating
                              disabled={true}
                              maxStars={parseFloat(item.ratings.star_2.total)}
                              rating={parseFloat(item.ratings.star_2.current)}
                              containerStyle={{ alignSelf: 'flex-end', }}
                              // selectedStar={(rating) => this.onStarRatingPress(rating)}
                              starSize={12}
                              fullStarColor='#D4AF37'
                            />
                          </View>
                        </View>


                        <View style={styles.row}>
                          <Text style={styles.paragraphTextBlack}>
                            {item.ratings.star_3.title}
                          </Text>
                          <View style={styles.startContainer}>
                            <StarRating
                              disabled={true}
                              maxStars={parseFloat(item.ratings.star_3.total)}
                              rating={parseFloat(item.ratings.star_3.current)}
                              containerStyle={{ alignSelf: 'flex-end', }}
                              // selectedStar={(rating) => this.onStarRatingPress(rating)}
                              starSize={12}
                              fullStarColor='#D4AF37'
                            />
                          </View>
                        </View>





                        {item.author_reply.desc.length === 0 ? null :
                          <Text style={styles.headingTextBlack}>
                            {item.author_reply.title}
                          </Text>}
                        <Text style={styles.paragraphTextGrey}>
                          {item.author_reply.desc}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.lineSeperator} />
                  </View>



                }
                keyExtractor={item => item.price}
              >
              </FlatList>

              {this.state.listData.length === 0 ? <Text style={styles.textAppGrey}>{orderStore.publicProfile.reviews_msg}</Text> : null}

              {!this.state.hasNexPage ? null :
                <View style={styles.loadMoreButtonContainer}>
                  {this.state.hideLoadMoreButton ? null :
                    <TouchableOpacity
                      onPress={() => {
                        this._onRefresh();
                      }}
                      style={[styles.loadMoreButton, { backgroundColor: orderStore.color }]}>
                      <Text style={styles.loadMoreButtonText}> Load More </Text>
                    </TouchableOpacity>
                  }
                  {this.state.hideLoadMoreButton ?
                    <Progress.Circle
                      size={20}
                      style={{ alignSelf: 'center' }}
                      color={orderStore.color}
                      indeterminate={true} /> : null}
                </View>
              }
            </View>
            {reviewForm.is_show ?
              <View style={styles.panel}>

                <Text style={styles.title}>
                  {reviewForm.title}
                </Text>

                <Text style={styles.subHeading}>
                  {reviewForm.form.subject.field_name}
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  value={this.state.reviewTitle}
                  textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  style={this.state.showReviewError ? styles.TextInputError : styles.TextInput}
                  onChangeText={(text) => {
                    this.setState({ reviewTitle: text })
                  }}>
                </TextInput>



                <View style={styles.startBorderRow}>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[styles.startTextBlack, { alignSelf: 'flex-start' }]}>
                      {reviewForm.form.stars_1.field_name}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3,alignItems:"flex-end"}}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={this.state.serviceRating}
                      selectedStar={(rating) => { this.setState({ serviceRating: rating }) }}
                      starSize={Appearences.Fonts.subHeadingFontSize}
                      fullStarColor='#D4AF37'
                    />
                  </View>
                </View>


                <View style={styles.startBorderRow}>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[styles.startTextBlack, { alignSelf: 'flex-start' }]}>
                      {reviewForm.form.stars_2.field_name}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, }}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={this.state.buyingRating}
                      containerStyle={{ alignSelf: 'flex-end', }}
                      selectedStar={(rating) => { this.setState({ buyingRating: rating }) }}
                      starSize={Appearences.Fonts.subHeadingFontSize}
                      fullStarColor='#D4AF37'
                    />
                  </View>
                </View>


                <View style={styles.startBorderRow}>
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={[styles.startTextBlack, { alignSelf: 'flex-start' }]}>
                      {reviewForm.form.stars_3.field_name}
                    </Text>
                  </View>
                  <View style={{ flex: 0.3, }}>
                    <StarRating
                      disabled={false}
                      maxStars={5}
                      rating={this.state.vehicleRating}
                      containerStyle={{ alignSelf: 'flex-end', }}
                      selectedStar={(rating) => { this.setState({ vehicleRating: rating }) }}
                      starSize={Appearences.Fonts.subHeadingFontSize}
                      fullStarColor='#D4AF37'
                    />
                  </View>
                </View>





                <View style={[styles.switchRow]}>
                  <Text style={[styles.subHeading]}>
                    {reviewForm.form.recommend.field_name}
                  </Text>
                  <Switch
                    onTintColor={orderStore.color}
                    thumbColor={'#ffffff'}
                    thumbTintColor={'#ffffff'}
                    style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    disabled={false}
                    value={this.state.switchValue}
                    onValueChange={(value) => {
                      this.setState({ switchValue: value });
                    }}
                  >

                  </Switch>
                </View>

                <Text style={styles.subHeading}>
                  {reviewForm.form.textarea.field_name}
                </Text>
                <TextInput
                  multiline={true}
                  value={this.state.reviewText}
                  underlineColorAndroid="transparent"
                  textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
                  style={this.state.showMessageError ? styles.textAreaError : styles.textArea}
                  onChangeText={(text) => {

                    this.setState({ reviewText: text })

                  }}>
                </TextInput>
                {this.state.showProgress ?
                  <View style={styles.progressRow}>
                    <Progress.Circle
                      size={Appearences.Fonts.paragraphFontSize}
                      indeterminate={true}
                      color={orderStore.color}
                    />
                  </View>

                  : <TouchableOpacity
                    onPress={() => {
                      this.postReview();
                    }}
                    style={[styles.buttonRow, { backgroundColor: orderStore.color }]}>
                    <Text style={styles.headingTextWhite}>
                      {reviewForm.form.btn_submit}
                    </Text>
                  </TouchableOpacity>
                }


              </View>
              : null}
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








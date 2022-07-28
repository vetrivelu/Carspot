import React, { Component } from 'react';
import {
  Platform,
  Dimensions,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  I18nManager
} from 'react-native';

import Store from '../../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../../network/Api';
import { Avatar } from 'react-native-elements';
import styles from './Styles';
import Modal from 'react-native-modalbox';
import * as Progress from 'react-native-progress';
import Visibility from '../../../components/Visibility'
import Loader from '../../../components/Loader';
import Appearences from '../../../config/Appearences';
import stores from '../../../Stores/orderStore';
import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-render-html';
import { widthPercentageToDP as wp } from '../../../helper/Responsive'
import { observer } from 'mobx-react'
import LocalDb from '../../../storage/LocalDb'



var postIdGlobal = "";
@observer export default class BlogDetail extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    headerTitle: stores.screenTitles.blog_detail,
    headerStyle: {
      backgroundColor: stores.color,
    },
  });
  componentWillMount = async () => {
    let { orderStore } = Store;
    const params = { post_id: this.props.navigation.state.params.id };
    const response = await Api.post("posts/detail", params);
    if (response.success === true) {
      postIdGlobal = response.data.post.post_id;
      orderStore.settings = response;
      
      //  orderStore.innerResponse = response.extra;
      this.setState({ hasNextPage: response.data.post.comments.pagination.has_next_page, comments: response.data.post.comments.comments,emptyMsg:response.extra.empty_text,loginMsg:response.extra.login_text });

    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false });


  }
  replyModel = {
    post_id: '',
    comment_id: '',
    message: '',
  };
  commentModel = {

    post_id: '',
    message: '',
  };


  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true,
      hasNextPage: false,
      data: '',
      hidePostReplyProgress: true,
      hidePostCommentProgress: true,
      hideLoadMoreProgress: true,
      commentMessage: '',
      replyMessage: '',
      comments: [],
    }

  }
  loadMore = async () => {
    this.setState({ hideLoadMoreProgress: false })
    let { orderStore } = Store;
    const params = { post_id: postIdGlobal, page_number: orderStore.settings.data.post.comments.pagination.next_page }

    const response = await Api.post("posts/comments/get/", params);
    if (response.success === true) {
      orderStore.settings.data.post.comments.pagination = response.data.pagination;
      orderStore.settings.data.post.comments.comments = [...orderStore.settings.data.post.comments.comments, ...response.data.comments];

      this.setState({
        comments: orderStore.settings.data.post.comments.comments,
        hideLoadMoreProgress: true,
        hasNextPage: orderStore.settings.data.post.comments.pagination.has_next_page
      })
    }
    if (response.message.length != 0)
      Toast.show(response.message);

  }

  renderLoadMoreButton() {
    let { orderStore } = Store;
    if (!this.state.hasNextPage)
      return null;

    return (

      <View>
        <Visibility hide={!this.state.hideLoadMoreProgress}>
          <TouchableOpacity
            onPress={this.loadMore}
            style={styles.loadMoreButtonContainer}>
            <View style={[styles.loadMoreTextContainer, { backgroundColor: Appearences.Colors.black }]}>
              <Text style={styles.loadMoreText}>Load more</Text>
            </View>
          </TouchableOpacity>
        </Visibility>
        <Visibility
          style={styles.loadMoreButtonContainer}
          hide={this.state.hideLoadMoreProgress}>
          <Progress.Circle
            color={orderStore.color}
            indeterminate={true}
            size={Appearences.Fonts.headingFontSize} />
        </Visibility>
      </View>
    )
  }
  render() {
    if (this.state.showSpinner)
      return (
        <Loader />
      );

    let { orderStore } = Store;
    const post = orderStore.settings.data.post;
    const extra = orderStore.settings.extra;
    return (

      <View style={{ height: '100%', backgroundColor: 'white', }}>


        <Modal
          style={[styles.modal,{left:'10%'}]}
          position={"center"} ref={"replyModal"}
          swipeThreshold={50}
          isDisabled={false}>
          <Text style={styles.modaHeadingText}>{extra.comment_form.popup.title}</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
            style={styles.TextInputMultiline}
            placeholder={extra.comment_form.popup.textarea}
            underlineColorAndroid='transparent'
            onChangeText={(message) => this.replyModel.message = message}
            textAlign={I18nManager.isRTL ? 'right' : 'left'}
          />
          <Visibility hide={this.state.hidePostReplyProgress}
            style={styles.modalProgressContainer}>
            <Progress.Circle
              color={orderStore.color}
              indeterminate={true}
              size={Appearences.Fonts.headingFontSize} />
          </Visibility>
          <Visibility
            hide={!this.state.hidePostReplyProgress}
            style={styles.modalButtonRowContainer}>
            <TouchableOpacity
              onPress={() => { this.refs.replyModal.close(); }}
              style={styles.modalCancelButton}>
              <Text style={[styles.modalButtonTextStyle, { color: Appearences.Colors.black }]}>{extra.comment_form.btn_cancel}</Text>
            </TouchableOpacity>
            <View style={{ height: '100%', width: 5, backgroundColor: 'white' }} />
            <TouchableOpacity
              onPress={this.postReply}
              style={[styles.modalSendButton, { backgroundColor: orderStore.color }]}>
              <Text style={styles.modalButtonTextStyle}>{extra.comment_form.popup.btn_submit}</Text>
            </TouchableOpacity>

          </Visibility>
        </Modal>



        <ScrollView contentContainerStyle={{ paddingBottom: 20, }}>


          <View style={styles.container}>



            <View style={styles.headerImageContainer}>
              <Image
                style={post.has_image ? styles.headerImage : styles.noImageStyle}
                source={post.has_image ? { uri: post.image } : require('../../../../res/images/no_image.jpg')}
              />
            </View>
            <View style={styles.dateCommentContainer}>
              <Text style={styles.dateText}>{post.date}</Text>
              <Text style={styles.commentText}>{extra.comment_title + " " + post.comment_count}</Text>
            </View>
            <Text style={styles.blogHeadingText}>{post.title}</Text>

            <View>
              <HTML
                html={post.desc}
                imagesInitialDimensions={
                  { height: wp('60'), width: wp('90') }
                } />
              {/* <HTMLView
                  value={post.desc}
                  stylesheet = {{
                    h1:{color: Appearences.Colors.black,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                      
                        marginTop:5,

                      },
                      h2:{color: Appearences.Colors.black,
                        marginTop:5,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                       
                      },
                      h3:{color: Appearences.Colors.black,
                        marginTop:5,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                      
                      },
                      h4:{color: Appearences.Colors.black,
                        marginTop:5,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                      
                      },
                      h5:{color: Appearences.Colors.black,
                        marginTop:5,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                       
                      },
                      h6:{color: Appearences.Colors.black,
                        marginTop:5,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                       
                      },
                      p:{
                        color: Appearences.Colors.headingGrey,
                        marginTop:5,
                        fontSize:Appearences.Fonts.headingFontSize,
                      

                      },
                      span:{
                        color: Appearences.Colors.headingGrey,
                        marginTop:5,
                        fontSize:Appearences.Fonts.headingFontSize,
                     
                      },
                    
                    
                  }
                  }
                  
                  />     */}

            </View>

            <View style={styles.tagsRow}>
              <Image
                style={styles.tagImage}
                source={post.tags.length === 0 ? null : require('../../../../res/images/tag.png')} />
              {post.tags.map((item, key) => (

                <Text key={key}
                  style={styles.tagText}>
                  {"  #" + item.name}
                </Text>
              ))}




            </View>
            <Text style={styles.blogHeadingText}>
              {extra.comment_title + " (" + post.comment_count + ")"}
            </Text>

            <FlatList
              data={this.state.comments}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              renderItem={this.renderComment}
              keyExtractor={this._keyExtractor}>
            </FlatList>

            {this.renderLoadMoreButton()}

            <Text style={styles.bodyHeadingBlack}>{extra.comment_form.title}</Text>





            <TextInput
              multiline={true}
              numberOfLines={10}
              textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
              style={styles.TextInputMultiline}
              placeholder={extra.comment_form.textarea}
              underlineColorAndroid='transparent'
              onChangeText={(message) => this.commentModel.message = message}
              textAlign={I18nManager.isRTL ? 'right' : 'left'}
            />
            <Visibility
              Visibility hide={this.state.hidePostCommentProgress}
              style={styles.modalProgressContainer}>
              <Progress.Circle
                color={orderStore.color}
                indeterminate={true}
                size={Appearences.Fonts.headingFontSize} />
            </Visibility>
            <Visibility
              Visibility hide={!this.state.hidePostCommentProgress}
              style={styles.footerContainer}>
              <TouchableOpacity
                onPress={() => this.postComment(post.post_id)}
                style={[styles.footer, { backgroundColor: orderStore.color }]}>
                <Text style={styles.footerText}>{extra.comment_form.btn_submit}</Text>
              </TouchableOpacity>
            </Visibility>

          </View>



        </ScrollView>
      </View>
    );


  }
  _keyExtractor = (item, index) => index + "" + item.comment_id;
  _keyExtractorReply = (item, index) => index + "" + item.comment_id;

  renderReply = ({ index, item }) => {
    return (
      <View style={[styles.replyContainer]}>
        <View style={styles.listImageContainer}>
          <Avatar
            size='medium'
            rounded
            source={{ uri: item.img }}
            activeOpacity={0.7}

          />
        </View>
        <View style={styles.commentRightColumn}>
          <Text style={styles.commenterName}>{item.comment_author}</Text>
          <Text style={styles.commenterDate}>{item.comment_date}</Text>
          <View style={styles.commentTextContainer}>
            <Text style={styles.comment}>
              {item.comment_content}
            </Text>

          </View>
        </View>
      </View>
    );
  }

  loadMoreComments = async () => { }

  
  postComment = async (post_id) => {
    this.commentModel.post_id = post_id;
    if(this.commentModel.message==''){
        Toast.show(this.state.emptyMsg)
        return
    } else{
      
      let { orderStore } = Store;
      const data = await LocalDb.getUserProfile();
      if(data==null){
        Toast.show(this.state.loginMsg)
        return
      }else{
        this.setState({ hidePostCommentProgress: false });
        const response = await Api.post("posts/comments", this.commentModel);
        if (response.success === true) {
    
    
          orderStore.settings.data.post.comments.comments = [...response.data.comments.comments];
          orderStore.settings.data.post.has_comment = true;
          orderStore.settings.data.post.comments.pagination.next_page = response.data.comments.pagination.next_page;
          this.setState({
            hasNextPage: response.data.comments.pagination.has_next_page,
            comments: orderStore.settings.data.post.comments.comments,
          });
          orderStore.settings.data.post.comment_count = response.data.comments.pagination.current_no_of_ads;
          // if(!orderStore.settings.data.post.has_comment)
          // this.setState({showSpinner:false});
    
    
        }
        if (orderStore.settings.data.post.has_comment)
          this.setState({ hidePostCommentProgress: true });
        if (response.message.length != 0)
          Toast.show(response.message);
      }
      
      
    } 


  }

  postReply = async () => {
    if(this.replyModel.message==''){
      Toast.show(this.state.emptyMsg)
      return
    }else{

      const data = await LocalDb.getUserProfile();
      if(data==null){
        Toast.show(this.state.loginMsg)
        return
      }else{
        let { orderStore } = Store;
        this.setState({ hidePostReplyProgress: false });
        const response = await Api.post("posts/comments", this.replyModel);
        if (response.success === true) {
    
    
          orderStore.settings.data.post.comments.comments = [...response.data.comments.comments];
    
          this.setState({
            hasNextPage: response.data.comments.pagination.has_next_page,
            comments: orderStore.settings.data.post.comments.comments,
          });
          orderStore.settings.data.post.comment_count = response.data.comments.pagination.current_no_of_ads;
          orderStore.settings.data.post.comments.pagination.next_page = response.data.comments.pagination.next_page;
    
          // if(!orderStore.settings.data.post.has_comment)
          // this.setState({showSpinner:false});
    
    
        }
        if (orderStore.settings.data.post.has_comment)
          this.setState({ hidePostReplyProgress: true });
        Toast.show(response.message);
        if (response.message.length != 0)
          this.refs.replyModal.close();
      }
      
    }
 

  }


  renderComment = ({ index, item }) => {
    let { orderStore } = Store;
    if (!orderStore.settings.data.post.has_comment)
      return (<View style={styles.noCommentContainer}>
        <Text style={styles.noCommentText}>{orderStore.settings.data.post.comment_mesage}</Text>
      </View>);
    return (
      <View>
        <View style={styles.commentContainer}>
          <View style={styles.listImageContainer}>
            <Avatar
              size='medium'
              rounded

              source={{ uri: item.img }}
              activeOpacity={0.7}

            />
          </View>
          <View style={styles.commentRow}>
            <View style={styles.commentRightColumn}>
              <Text style={styles.commenterName}>{item.comment_author}</Text>
              <Text style={styles.commenterDate}>{item.comment_date}</Text>
              <View style={styles.commentTextContainer}>

                <TouchableOpacity
                  onPress={() => {
                    this.replyModel.post_id = orderStore.settings.data.post.post_id;
                    this.replyModel.comment_id = item.comment_id;
                    this.refs.replyModal.open();
                    this.replyModel.message=''

                  }}
                  style={styles.relpyTextContainer}>
                  <Text style={[styles.comment, { fontSize: Appearences.Fonts.headingFontSize, color: Appearences.Colors.headingGrey }]}>
                    {item.comment_content}
                  </Text>

                </TouchableOpacity>

              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.replyModel.post_id = orderStore.settings.data.post.post_id;
                this.replyModel.comment_id = item.comment_id;
                this.refs.replyModal.open();
              }}
              style={{ marginTop: 5, }}
            >
              <View style={[styles.loadMoreTextContainer, { backgroundColor: orderStore.color }]}>
                <Text style={styles.loadMoreText}>{orderStore.settings.extra.comment_form.btn_reply}</Text>
              </View>
            </TouchableOpacity>

          </View>
        </View>
        <FlatList
          data={item.reply}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderReply}
          keyExtractor={this._keyExtractorReply}>
        </FlatList>

      </View>
    );

  }
}
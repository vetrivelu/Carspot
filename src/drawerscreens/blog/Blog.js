import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
   TouchableOpacity,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Appearences from '../../config/Appearences';
import styles from './Styles';
import Store from '../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import * as Progress from 'react-native-progress';
import Loader from '../../components/Loader';


export default class Blog extends Component<Props> {
  defaultData = [];
  defaultPagination ;

componentWillMount = async ()=>{
  let {orderStore} = Store;
  orderStore.blog = await Api.get('posts');
   if(orderStore.blog.success ===  true){
    
    this.setState({listData: orderStore.blog.data.post});
    this.defaultData = [...orderStore.blog.data.post];
    this.defaultPagination = orderStore.blog.data.pagination;
  }
  if(orderStore.blog.message.length!=0)
  Toast.show(orderStore.blog.message);
  this.setState({showSpinner:false});


}

  constructor(props){
    super(props);
    this.state = {
      showSpinner:true,
      refreshing: false,
      listData:[],
      reCaller:false,
      swipeUp:false,
       };
  }
  _onSwipeUp = async()=>{
    await this.setState({swipeUp: true});
  
    setTimeout(async ()=>{
      this.setState({showSpinner:true});
 
      let {orderStore} = Store;
      const response = await Api.get('posts');
      orderStore.blog = response;  
  
      if(response.success ===  true){
        this.setState({listData: orderStore.blog.data.post});
        orderStore.blog.data.post  = [...this.defaultData];
        orderStore.blog.data.pagination = this.defaultPagination ;
      }
      if(response.message.length!=0)
      Toast.show(response.message);
      
      this.setState({showSpinner:false,swipeUp:false,reCaller:false,});
  
    }, 1000);
  }
  _onRefresh = () => {
  
    let {orderStore} = Store;
    let pagination = orderStore.blog.data.pagination;
    if(pagination.has_next_page === true)
    {this.setState({refreshing: true});
      this.loadMore(pagination.next_page);
  }
  }
  loadMore = async (nextPage)=>{ 
    
    let {orderStore} = Store;
   
    let params = {page_number:nextPage};
    let response = await Api.post('posts',params);
    if(response.success === true){
          orderStore.blog.data.pagination =  response.data.pagination;
          orderStore.blog.data.post = [...orderStore.blog.data.post,...response.data.post];                
          this.setState({listData: orderStore.blog.data.post});
  
        }
    if(response.message.length!=0)    
    Toast.show(response.message);
    this.setState({refreshing: false,reCaller:false});
  }
    
  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };
  render() {

  
    if(this.state.showSpinner)
      return(
       <Loader/>
      );

    let {orderStore} = Store;
    const data = orderStore.blog.data;
    const commentsTitle = orderStore.blog.extra.comment_title;
        return (

        <View style = {{height:'100%',
        backgroundColor:Appearences.Colors.appBackgroundColor,}}>

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
              <View style = {styles.container}>

                  <View style = {styles.listRowContainer}>
                  {
                  this.state.listData.map((item,key)=>( 
                                
                            <TouchableOpacity 
                            onPress = {()=>{
                              const { navigate } = this.props.navigation;
                              navigate('BlogDetail', {id:item.post_id});

                            }}
                            style = {styles.listItemContainer}
                            key={key}
                            >
                            <View style = {styles.imageContainer}>
                                <Image
                                  style = {styles.image}
                                  source = {item.has_image ? {uri:item.image} : require('../../../res/images/no_image.jpg')}
                                />
                            </View>
                            <View style = {styles.contentContainer}>
                              {/* <Text style = {styles.paragraphText}>{item.date +" "+commentsTitle+" ("+item.comments+")"}</Text> */}
                              <Text style = {styles.headingText}>{item.title}</Text>
                              {/* <Text style = {styles.paragraphText}>{item.details}</Text>
                              <View 
                            
                              style = {[styles.buttonContainer,{backgroundColor:orderStore.color}]}>
                                <Text style = {styles.headingTextWhite}>{item.read_more}</Text>
                              </View> */}
                            </View>
                         </TouchableOpacity>   ))}
                    </View>         

              </View>


           {  this.state.refreshing ?                  
              <Progress.Circle
              size={20}
                  style={{alignSelf:'center'}}
                  color={orderStore.color}
                  indeterminate = {true}/> : null   }
              </ScrollView>
                       
          </View>
        );
    }
  
    
  }
  

 


  
  
  
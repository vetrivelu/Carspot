import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Alert,
  TouchableHighlight,
  FlatList,
  RefreshControl,
} from 'react-native';

import styles from './Styles';
import firebase from 'react-native-firebase';
import Store from '../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import {Avatar} from 'react-native-elements';
import NoDataFound from '../../components/NoDataFound';
import Loader from '../../components/Loader';
import * as Progress from 'react-native-progress';
import Appearences from '../../config/Appearences';

let sentOffers= new Array();
let receivedOffers = new Array();
export default class Inbox extends Component<Props> {
innerResponseData ;
settingsData ;
innerResponsePagination;
settingsPagination;
    componentWillMount = async ()=>{
        let {orderStore} = Store;
        orderStore.settings = await Api.get('message/inbox/');
        orderStore.inbox = await Api.get('message');
        this.innerResponseData = orderStore.inbox;
        this.settingsData = orderStore.settings;
        this.innerResponsePagination =  orderStore.inbox.data.pagination;
        this.settingsPagination = orderStore.settings.data.pagination;
        if(orderStore.settings.success === true)
           {

            receivedOffers = orderStore.settings.data.received_offers.items;
           // if(orderStore.settings.data.received_offers.items.length===0)
           // this.setState({noDataVisivility: true,noDataMessage:"Empty Inbox Message"});
          
            
           }
           if(orderStore.inbox.success === true){

            sentOffers = orderStore.inbox.data.sent_offers.items;
            this.setState({offers:sentOffers});          
            if(orderStore.inbox.data.sent_offers.items.length===0)
            this.setState({noDataVisivility: true,noDataMessage:"Empty Inbox Message"});
          
           }
           if(orderStore.settings.message.length!=0)
           Toast.show(orderStore.settings.message);
           this.setState({showSpinner:false});
        }
        
     
        

    


    writeUserData(email,fname,lname){
        firebase.database().ref('Users2/').push({
            email,
            fname,
            lname
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    }



  constructor(props){
    super(props);

    this.state = {
        isSendOffersActive:true,
        offers:[],
        showSpinner:true,
        refreshing:false,
        noDataVisivility:false,
        noDataMessage:"",
        reCaller:false,
        swipeUp:false,

   }
}
onPressSendOffers  = ()=>{
let {orderStore} = Store;
  if(orderStore.inbox.data.sent_offers.items.length===0){
    this.setState({noDataVisivility: true,noDataMessage:"Empty Inbox Message"});
  }
  else
  this.setState({noDataVisivility: false,noDataMessage:"Empty Inbox Message"});

    this.setState({isSendOffersActive:true,offers:sentOffers,reCaller:false});
    
}
onPressReceivedOffers = ()=>{
  let {orderStore} = Store;

  if(orderStore.settings.data.received_offers.items.length===0){
    this.setState({noDataVisivility: true,noDataMessage:"Empty Inbox Message"});
  }
  else
  this.setState({noDataVisivility: false,noDataMessage:"Empty Inbox Message"});

    this.setState({isSendOffersActive:false,offers:receivedOffers,reCaller:false});
}

_onSwipeUp = async ()=>{
    await this.setState({swipeUp: true});

    setTimeout(async ()=>{
 
      this.setState({showSpinner:true});
      let {orderStore} = Store;
      orderStore.settings = await Api.get('message/inbox/');
      orderStore.inbox = await Api.get('message');
      this.innerResponseData = orderStore.inbox;
      this.settingsData = orderStore.settings;
      this.innerResponsePagination =  orderStore.inbox.data.pagination;
      this.settingsPagination = orderStore.settings.data.pagination;
      if(orderStore.settings.success === true)
         {

          receivedOffers = orderStore.settings.data.received_offers.items;
          if(orderStore.settings.data.received_offers.items.length===0)
          this.setState({noDataVisivility: true,noDataMessage:"Empty Inbox Message"});
        
          
         }
         if(orderStore.inbox.success === true){

          sentOffers = orderStore.inbox.data.sent_offers.items;
          this.setState({offers:sentOffers});          
          if(orderStore.inbox.data.sent_offers.items.length===0)
          this.setState({noDataVisivility: true,noDataMessage:"Empty Inbox Message"});
        
         }
         if(orderStore.settings.message.length!=0)
         Toast.show(orderStore.settings.message);
         this.setState({showSpinner:false});
      this.setState({showSpinner:false,swipeUp:false,isSendOffersActive:true});
 
    }, 1000);
}
_onRefresh = () => {
  
    let {orderStore} = Store;
    let pagination;
    if(this.state.isSendOffersActive === true)
    {
        pagination = orderStore.inbox.data.pagination;
    }
    else
     pagination = orderStore.settings.data.pagination;
    if(pagination.has_next_page === true)
    {this.setState({refreshing: true});
      this.loadMore(pagination.next_page);
  }
  }

  loadMore = async (nextPage)=>{ 
  
    let {orderStore} = Store;
   
    let params = {page_number:nextPage};
    let response;
    if(this.state.isSendOffersActive === true)
    {
        
        response = await Api.post('message',params);
    
    }
    else 
    response = await Api.post('message/inbox',params);
    
    if(response.success === true){
         
          if(this.state.isSendOffersActive === true)
          { orderStore.inbox.data.pagination =  response.data.pagination;
            orderStore.inbox.data.sent_offers.items = [...orderStore.inbox.data.sent_offers.items,...response.data.sent_offers.items];                
            sentOffers = orderStore.inbox.data.sent_offers.items;
            this.setState({offers: orderStore.inbox.data.sent_offers.items});    
          }
          else {orderStore.settings.data.pagination =  response.data.pagination;
          orderStore.settings.data.received_offers.items = [...orderStore.settings.data.received_offers.items,...response.data.received_offers.items];                
           receivedOffers =   orderStore.settings.data.received_offers.items;
          this.setState({offers: orderStore.settings.data.received_offers.items});
        }    
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
    {
        return(<Loader/>);
    }
    let {orderStore} = Store;
    let data = orderStore.settings.data;
  return (
  <View style = {{height:'100%',
  backgroundColor:'white',}}>    

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
       {/*header start*/}
       <View style = {styles.headerContainer}>
            <View style = {[styles.headerBackground,{backgroundColor:orderStore.color}]}/>
            <View style = {styles.headerAbsoluteContainer}>
                <View style = {styles.headerContentConatiner}>
                    <TouchableOpacity 
                    onPress = {this.onPressSendOffers}
                    style = { styles.headerContentItemContainer}>
                        <View style = {styles.headerItem}>
                            <Image
                                style = {this.state.isSendOffersActive ? [styles.headerImage,{tintColor:orderStore.color}]: styles.headerImage}
                                source = {require('../../../res/images/message_grey.png')}
                            />
                            <Text 
                            style = {this.state.isSendOffersActive  ? [styles.headerTextActive,{color:orderStore.color}] : styles.headerText}>
                           {data.title.sent}
                            </Text>
                         </View>
                    </TouchableOpacity>     

                     <TouchableOpacity 
                        onPress = {this.onPressReceivedOffers}
                        style = {styles.headerContentItemContainer}>
                         <View style = {styles.headerItem}>
                            <Image
                                style = {!this.state.isSendOffersActive  ? [styles.headerImage,{tintColor:orderStore.color}]:styles.headerImage}
                                source = {require('../../../res/images/message_grey.png')}
                            />
                            <Text 
                            style = {!this.state.isSendOffersActive  ? [styles.headerTextActive,{color:orderStore.color}] : styles.headerText}>
                            {data.title.receive}
                            </Text>
                         </View>
                    </TouchableOpacity>                       
                </View>
            </View>        
       </View>
      {/*header end*/}
        
        <View style = {styles.container}>
           

            
            <FlatList
             data = {this.state.offers}
             horizontal = {false}  
             showsVerticalScrollIndicator = {false}
             renderItem = {({item,index}) =>

                <TouchableOpacity 
                onPress = {()=>{
                    const { navigate } = this.props.navigation;
                    
                    if(this.state.isSendOffersActive){  
                  const params = {adId:item.ad_id,senderId:item.message_sender_id,receiverId:item.message_receiver_id,type:'sent'}      
                  navigate('Chat', { data: params });
                }
                else
                {  
                    navigate('Offers', { adId: item.ad_id });
                }

                }}
                style = {styles.listItemContainer}>
                <View style = {styles.listImageContainer}>
                    
                    <Avatar
                    size = 'medium'
                    rounded
                    source = {{uri:item.message_ad_img[0].thumb}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    containerStyle = {{alignSelf:'center', marginVertical: 20, marginHorizontal:10}}
                    />
                    
                   
                </View>
                
                <View style = {styles.listTextContainer}>
                    <Text style = {styles.listTitleText}>
                        {item.message_ad_title}
                    </Text>
                    <Text style = {styles.listNameText}>
                        {item.message_author_name}
                    </Text>
                </View>
                </TouchableOpacity>
             }
             keyExtractor={item => item.ad_id+''}
            >

            </FlatList>

                  <NoDataFound
                    noData = {true}
                    message = {this.state.noDataMessage}
                    visible = {this.state.noDataVisivility}
                  />
        </View>
            {this.state.refreshing ?                  
              <Progress.Circle
              size={20}
                  style={{alignSelf:'center'}}
                  color={orderStore.color}
                  indeterminate = {true}/> : null   }
      </ScrollView>
      </View>);
}
    
  }
  

 


 
  
  
  
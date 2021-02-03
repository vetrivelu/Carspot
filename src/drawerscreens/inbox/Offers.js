import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';

import styles from './Styles';
import Store from '../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import Visibility from '../../components/Visibility';
import {Avatar} from 'react-native-elements';
import Loader from '../../components/Loader';
import * as Progress from 'react-native-progress';
import Appearences from '../../config/Appearences';
import stores from '../../Stores/orderStore';

export default class Offers extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle:stores.screenTitles.offers,
    headerStyle: {
      backgroundColor: stores.color,
    },
 });
defaultData = [];
defaultPagination = [];
    componentWillMount = async ()=>{
        let {orderStore} = Store;
        const adId = this.props.navigation.state.params.adId;
          
        const params = {ad_id:adId};
        orderStore.innerResponse = await Api.post('message/offers',params);
    
           if(orderStore.innerResponse.success === true){
            this.defaultData = [...orderStore.innerResponse.data.received_offers.items];
            this.defaultPagination = orderStore.innerResponse.data.pagination;   
            this.setState({offers:orderStore.innerResponse.data.received_offers.items});
           }
           else
           {
               if(this.state.offers.length ===0)
               {
                   this.setState({visibilityHidden:false});
               }
       
           }
        
           if(orderStore.settings.message.length!=0)
           Toast.show(orderStore.settings.message);
           this.setState({showSpinner:false});
        }
        
   
    


  


  constructor(props){
    super(props);

    this.state = {
     
        offers:[],
        showSpinner:true,
        refreshing:false,
        visibilityHidden:true,
        reCaller:false,
        swipeUp:false,

   }
}
_onSwipeUp = async ()=>{
  await this.setState({swipeUp: true});

  setTimeout(async ()=>{

    this.setState({showSpinner:true});
    
    let {orderStore} = Store;
    const adId = this.props.navigation.state.params.adId;
      
    const params = {ad_id:adId};
    orderStore.innerResponse = await Api.post('message/offers',params);

       if(orderStore.innerResponse.success === true){
        orderStore.innerResponse.data.received_offers.items = [...this.defaultData];
        orderStore.innerResponse.data.pagination = this.defaultPagination ;   
        this.setState({offers:orderStore.innerResponse.data.received_offers.items});
       }
       else
       {
           if(this.state.offers.length ===0)
           {
               this.setState({visibilityHidden:false});
           }
   
       }
    
       if(orderStore.settings.message.length!=0)
       Toast.show(orderStore.settings.message);
       this.setState({showSpinner:false,swipeUp:false});
  }, 1000);
}


_onRefresh = () => {
  
    let {orderStore} = Store;
    let pagination;
    
        pagination = orderStore.innerResponse.data.pagination;
   
    if(pagination.has_next_page === true)
    {this.setState({refreshing: true});
      this.loadMore(pagination.next_page);
  }
  }

  loadMore = async (nextPage)=>{ 
  
    let {orderStore} = Store;
   
    let params = {page_number:nextPage};
    let response;
 
    response = await Api.post('message/offers',params);
    
    if(response.success === true){
         
          
           orderStore.innerResponse.data.pagination =  response.data.pagination;
            orderStore.innerResponse.data.received_offers.items = [...orderStore.innerResponse.data.received_offers.items,...response.data.received_offers.items];                
            this.setState({offers: orderStore.innerResponse.data.received_offers.items});    
          
      
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
    let data = orderStore.innerResponse.data;
  return (
  <View style = {{height:'100%',
  backgroundColor:'white',}}>   

       <Visibility 
            hide = {this.state.visibilityHidden}
            style = {{width:'100%',height:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
            <Text>{orderStore.innerResponse.message}</Text>
        </Visibility>

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
           

            
            <FlatList
             data = {this.state.offers}
             horizontal = {false}  
             showsVerticalScrollIndicator = {false}
             renderItem = {({item,index}) =>

                <TouchableOpacity 
                onPress = {()=>{
                    const { navigate } = this.props.navigation;

                  const params = {adId:item.ad_id,senderId:item.message_sender_id,receiverId:item.message_receiver_id,type:'receive'}      
                  navigate('Chat', { data: params });

                }}
                style = {styles.listItemContainer}>
                <View style = {styles.listImageContainer}>
                    
                    <Avatar
                    size = 'medium'
                    rounded
                    source = {{uri:item.message_ad_img}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    containerStyle = {{alignSelf:'center', marginVertical: 20, marginHorizontal:10}}
                    />
                    
                    
                </View>
              
                <View style = {styles.listTextContainer}>
                    <Text style = {styles.listTitleText}>
                    {item.message_author_name}
                    </Text>
                    <Text style = {styles.listNameText}>
                    {item.message_ad_title}
                    </Text>
                </View>
                </TouchableOpacity>
             }
             keyExtractor={item => item.ad_id+''}
            >

            </FlatList>


        </View>
        {  this.state.refreshing ?                  
              <Progress.Circle
              size={20}
                  style={{alignSelf:'center'}}
                  color={orderStore.color}
                  indeterminate = {true}/> : null   }
      </ScrollView>
      </View>);
}
    
  }
  

 


 
  
  
  
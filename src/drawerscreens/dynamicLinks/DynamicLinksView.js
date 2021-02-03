import React, { Component } from 'react';
import {
  View,

}from 'react-native';
import Loader from '../../components/Loader';
import stores from '../../Stores/orderStore';
import {WebView} from 'react-native-webview';
export default class DynamicLinksView extends Component<Props> {
    static navigationOptions = ({ navigation }) => ({
       // headerTitle:stores.screenTitles.chats,
       headerStyle: {
        backgroundColor: stores.color,
      },
     });

  constructor(props){
    super(props);
    this.state = {       
        showSpinner:true,
        url:"",
   }
}
componentWillMount = async ()=>{
  // console.warn(JSON.stringify(this.props.navigation.state.params.id));
    this.setState({url:this.props.navigation.state.params.id});

    }

render() {
      return (
         <View   
            style={{height:'100%',
            width:'100%',}}>
             {this.state.showSpinner ? <Loader/> :null}
                        <WebView
                          useWebKit={true}
                          source={{uri: this.state.url}}
                          javaScriptEnabled={true}
                          onLoad={() => this.setState({showSpinner:false})}

                          />                
         
         </View>
        );

    }
  }
  

 

 
  
  
  
import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import HTMLView from 'react-native-htmlview';
import stores from '../../Stores/orderStore';
import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import Loader from '../../components/Loader';
import HTML from 'react-native-render-html';

export default class ThankYou extends Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    // headerTitle:stores.screenTitles.chats,
    headerStyle: {
      backgroundColor: stores.color,
    },
  });


  componentWillMount = async () => {
    const response = await Api.get('payment/complete');
    this.setState({ showSpinner: false, url: response.data.data });
    if (response.message.length != 0)
      Toast.show(response.message);
  }


  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true,
      url: "",

    };
  }



  render() {
    console.log('url', this.state.url);
    if (this.state.showSpinner)
      return (
        <Loader />

      );
    return (<View style={{ height: '100%', width: '90%',alignSelf:'center' }}>

      <HTML
        imagesMaxWidth={Dimensions.get('window').width}
        html={this.state.url}
      />
    </View>

    );
  }


}








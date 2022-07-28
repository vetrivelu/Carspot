import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,

} from 'react-native';


import styles from './Styles';

import Loader from '../../components/Loader'

import Appearences from '../../config/Appearences'
import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';
import * as Progress from 'react-native-progress';
import Store from '../../Stores';

export default class ContactUs extends Component<Props> {

  componentWillMount = async () => {

    let { orderStore } = Store;
    const response = await Api.get('app/contact');
    orderStore.settings = response;

    if (response.success === true) {
      this.setState({ name: response.data.form.fields[0].field_val, email: response.data.form.fields[1].field_val });
    }
    if (response.message.length != 0)
      Toast.show(response.message);
    this.setState({ showSpinner: false });
  }

  static navigationOptions = {

    tabBarLabel: 'Contact Us',
  }

  constructor(props) {
    super(props);
    this.state = {
      showSpinner: true,
      name: '',
      email: '',
      subject: '',
      comment: '',
      showProgress: false,
    }

  }
  postContactUs = async () => {

    this.setState({ showProgress: true });
    let params = { name: this.state.name, email: this.state.email, subject: this.state.subject, message: this.state.comment };
    let response = await Api.post('app/contact', params);
    if (response.success === true) {

    }
    this.setState({ showProgress: false, subject: '', comment: '' });
    if (response.message.length != 0)
      Toast.show(response.message);
  }
  render() {

    if (this.state.showSpinner)
      return (
        <Loader />

      );
    let { orderStore } = Store;
    const data = orderStore.settings.data;
    const fields = data.form.fields;
    return (

      <View style={{ height: '100%', backgroundColor: 'white', }}>
        <ScrollView
          keyboardShouldPersistTaps='always'
          contentContainerStyle={{ paddingBottom: 20, }}>


          <View style={styles.container}>


            <Text style={styles.bodyHeadingBlack}>{data.main_title}</Text>

            <Text style={styles.paragraphText}>{data.description}</Text>


            <View style={styles.headingTextContainer}>
              <Text style={styles.headingTextBlack}>{fields[0].is_required ? fields[0].field_name + "*" : fields[0].field_name}</Text>
            </View>
            <TextInput style={styles.TextInput}
              underlineColorAndroid='transparent'
              value={this.state.name}
              onChangeText={(message) => this.setState({ name: message })}
              textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
              placeholderTextColor={Appearences.Colors.headingGrey}
            >
            </TextInput>

            <View style={styles.headingTextContainer}>
              <Text style={styles.headingTextBlack}>{fields[1].is_required ? fields[1].field_name + "*" : fields[1].field_name}</Text>
            </View>
            <TextInput style={styles.TextInput}
              underlineColorAndroid='transparent'
              value={this.state.email}
              onChangeText={(message) => { this.setState({ email: message }) }}
              textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
              placeholderTextColor={Appearences.Colors.headingGrey}
            >
            </TextInput>

            <View style={styles.headingTextContainer}>
              <Text style={styles.headingTextBlack}>{fields[2].is_required ? fields[2].field_name + "*" : fields[2].field_name}</Text>
            </View>
            <TextInput style={styles.TextInput}
              underlineColorAndroid='transparent'
              value={this.state.subject}
              onChangeText={(message) => this.setState({ subject: message })}
              textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
              placeholderTextColor={Appearences.Colors.headingGrey}

            >
            </TextInput>

            <View style={styles.headingTextContainer}>
              <Text style={styles.headingTextBlack}>{fields[3].is_required ? fields[3].field_name + "*" : fields[3].field_name}</Text>
            </View>
            <TextInput
              multiline={true}
              numberOfLines={10}
              value={this.state.comment}
              onChangeText={(message) => this.setState({ comment: message })}
              textAlign={Appearences.Rtl.enabled ? 'right' : 'left'}
              style={styles.TextInputMultiline} />

            <View style={styles.footerContainer}>
              {this.state.showProgress ?
                <Progress.Circle
                  size={25}
                  style={{ alignSelf: 'center', marginTop: 15 }}
                  color={orderStore.color}
                  indeterminate={true} />
                :
                <TouchableOpacity
                  onPress={() => this.postContactUs()}
                  style={[styles.footer, { backgroundColor: orderStore.color }]}>
                  <Text style={styles.footerText}>{data.form.btn_submit}</Text>
                </TouchableOpacity>
              }
            </View>

          </View>



        </ScrollView>
      </View>
    );


  }

}

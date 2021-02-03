import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';
import Toast from 'react-native-simple-toast';

import Store from '../../../../Stores';
import styles from './Styles';
import DealerHeader from '../../../../components/DealerHeader'; 
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';


import Appearences from '../../../../config/Appearences'

export default class About extends Component<Props> {

        
  constructor(props){
    let {orderStore} = Store;
    super(props);

    this.state = {
     latitude:'0',
     longitude:'0',
          }
}
componentWillMount(){
  let {orderStore} = Store;
 
}




  render() {

      return (
        <View style = {{
          height:'100%',
          backgroundColor:'white',
          paddingBottom:5,
        }}>

            
      
        


        <ScrollView>

    <DealerHeader/>
            <View style = {styles.container}>

              <View style = {styles.contactRowContainer}>
                <Image style = {styles.aboutImage} source = {require('../../../../../res/images/placeholder.png')}/>
                <Text style = {styles.paragraphTextBlackMarginStart}>asfsffas</Text>
              </View>

              <View style = {styles.lineSeperator}/> 


              <View style = {styles.contactRowContainer}>
                <Image style = {styles.aboutImage} source = {require('../../../../../res/images/phone.png')}/>
                <Text style = {styles.paragraphTextBlackMarginStart}>asfsffas</Text>
              </View>

              <View style = {styles.lineSeperator}/> 


              <View style = {styles.contactRowContainer}>
                <Image style = {styles.aboutImage} source = {require('../../../../../res/images/world.png')}/>
                <Text style = {styles.paragraphTextBlackMarginStart}>asfsffas</Text>
              </View>

              <View style = {styles.lineSeperator}/> 

              <Text style = {styles.pageTitle}>
              About Us            
              </Text>
              <View style = {styles.wideSeperator}/>
              <View style = {styles.narrowSeperator}/>
              <Text style = {styles.paragraphTextBlack}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Text>  
             
              <Text style = {styles.pageTitle}>
              Our Location            
              </Text>
              <View style = {styles.wideSeperator}/>
              <View style = {styles.narrowSeperator}/>
              <View style={styles.mapContainer}>
          <MapView
            region={{
              latitude:parseFloat(this.state.latitude),
              longitude:parseFloat(this.state.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style = {styles.videoContent}>
      <Marker coordinate={ {
      latitude:parseFloat(this.state.latitude),
      longitude:parseFloat(this.state.longitude),} }/>
            </MapView>
            
        </View>  
         
            </View>
          </ScrollView>
        </View>
        );
    }
  
    
  
  }
  

 

 
  
  
  
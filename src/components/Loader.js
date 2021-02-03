import React, { Component } from 'react';
import orderStore from '../Stores/orderStore';
import {
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';
import Appearences from '../config/Appearences'



export default class Loader extends Component<Props> {

    render() {

       
         return (
            
            <View style = {s.container}>
              
                <SkypeIndicator
                  //  size="large"
                    color={orderStore.color}
                />

            </View>


       );

        


    }
}


const s = StyleSheet.create({
  
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',   
        backgroundColor:Appearences.Colors.loaderGrey,
        
    },
  


       
});


import {
    AdMobBanner,
 
  } from 'react-native-admob'
import {View,Text} from 'react-native';
import React, { Component } from 'react';
import Store from '../../Stores/';
class Banner extends React.Component{

constructor(props){
super(props);
this.state = {
    isError:false,
    errorText:'',
}
}

    render(){
        let {orderStore} = Store;       
        return(
        
        <View 
        style = {
            {
            backgroundColor:'white',
            alignItems:'center',
            width:'100%',
            }}
        >
               
            {
            this.state.isError ? 
            <View/>
            :
            <AdMobBanner
            adSize="banner"
            adUnitID={orderStore.banner.banner_id}
            testDevices={[AdMobBanner.simulatorId]}
            onAdFailedToLoad={error => {
                    // console.warn(error);                    
                    this.setState({isError:true,errorText:error+""});

                    setTimeout(()=>{
                        this.setState({isError:false});
                    },10000);
            }}/>}
            
        </View>
    );
    }
}

export default Banner;
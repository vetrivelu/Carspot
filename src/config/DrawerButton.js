import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from 'react-native';

const DrawerButton = ({navigation})=>(
    <TouchableOpacity style = {styles.wrapper}
    onPress = {()=> {
      
       // navigation.navigate('DrawerOpen')
       navigation.setParams({tst:'hello'})
       navigation.toggleDrawer();     
}}>
        <Image
            style = {styles.icon}
            source = {require('../../res/images/drawer.png')}
        />
    </TouchableOpacity>
);
const styles = StyleSheet.create({

    icon:{
        width:20,
        height:20,
    },
    wrapper:{
        marginStart:5,
        padding: 10,
    },

});
export default DrawerButton;
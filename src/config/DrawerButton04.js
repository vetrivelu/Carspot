import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    View
} from 'react-native';

import { widthPercentageToDP as wp } from '../helper/Responsive';

import Store from '../Stores'
const DrawerButton = ({ navigation }) => (
     
    <View style={{ flexDirection: 'row', backgroundColor: Store.orderStore.appColor ,alignContent:'center',alignItems:'center'}}>
        <TouchableOpacity style={[styles.wrapper, {
            backgroundColor:
            Store.orderStore.appColor
            // Appearences.Colors.appBackgroundColor

        }]}
            onPress={() => {

                // navigation.navigate('DrawerOpen')
                navigation.toggleDrawer();
            }}>
            <Image
                style={[styles.icon,{height:wp('4'),width:wp('4')}]}
                source={require('../../res/images/menu-white.png')}
            />
        </TouchableOpacity>


        <Image
            style={{ width: wp('30'), height: wp('10') }}
            resizeMode="contain"
            source={require('../../res/images/logo_full_white.png')}
        />
    </View>

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
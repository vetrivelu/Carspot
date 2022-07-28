import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    View,
    I18nManager
} from 'react-native';
import Appearences from '../config/Appearences';
import { widthPercentageToDP as wp } from '../helper/Responsive';

const DrawerButton = ({ navigation }) => (

    <View style={[{ flexDirection: 'row', width: wp('100'), backgroundColor: '#f0f0f0' }]}>
        <TouchableOpacity style={[styles.wrapper, { backgroundColor: '#f0f0f0' }]}
            onPress={() => {

                // navigation.navigate('DrawerOpen')
                navigation.toggleDrawer();
            }}>
            <Image
                style={styles.icon}
                source={require('../../res/images/menu-black.png')}
            />
        </TouchableOpacity>



        <TouchableOpacity
            onPress={() => {
                const { navigate } = navigation;
                navigate('SearchDetail',{params:''});
            }}
            style={[styles.wrapper, { backgroundColor: '#f0f0f0', position: 'absolute', right: wp('2') }]}
        >
            <Image
                style={[styles.icon, { transform: [{ scaleX: I18nManager.isRTL ? 1 : -1 }] }]}
                source={require('../../res/images/search.png')}
            />
        </TouchableOpacity>
    </View>

);
const styles = StyleSheet.create({

    icon: {
        width: 20,
        height: 20,
    },
    wrapper: {
        // marginStart: 5,
        padding: 10,
    },

});
export default DrawerButton;
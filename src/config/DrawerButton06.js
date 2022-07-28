import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    View,
    I18nManager
} from 'react-native';
import Appearences from './Appearences';
import { widthPercentageToDP as wp} from '../helper/Responsive';

const DrawerButton = ({ navigation }) => (

    <View style={[{flexDirection:'row',width:wp('100'),backgroundColor:'#1D2127'}]}>
        <TouchableOpacity style={[styles.wrapper,{backgroundColor:'#1D2127'}]}
            onPress={() => {

                // navigation.navigate('DrawerOpen')
                navigation.toggleDrawer();
            }}>
            <Image
                style={styles.icon}
                source={require('../../res/images/menu-white.png')}
            />
        </TouchableOpacity>



        <TouchableOpacity
         onPress={() => {
            const { navigate } = navigation;
            navigate('SearchDetail',{params:''});
        }}
        style={[styles.wrapper,{backgroundColor:'#1D2127',position:'absolute',right:wp('2')}]}
           >
            <Image
                style={[styles.icon,  {transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}]}
                source={require('../../res/images/search_white.png')}
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
        marginStart: 5,
        padding: 10,
    },

});
export default DrawerButton;
import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    View
} from 'react-native';
import Appearences from './Appearences';
import { widthPercentageToDP as wp } from '../helper/Responsive';

const DrawerButton = ({ navigation }) => (
    <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
        <TouchableOpacity style={[styles.wrapper, {
            backgroundColor:
                '#ffffff'
            // Appearences.Colors.appBackgroundColor

        }]}
            onPress={() => {

                // navigation.navigate('DrawerOpen')
                navigation.toggleDrawer();
            }}>
            <Image
                style={styles.icon}
                source={require('../../res/images/menu-black.png')}
            />
        </TouchableOpacity>


        <Image
            style={{ width: wp('30'), height: wp('12') }}
            resizeMode="contain"
            source={require('../../res/images/logo_red_black.png')}
        />
    </View>

);
const styles = StyleSheet.create({

    icon: {
        width: wp('4'),
        height: wp('4'),
    },
    wrapper: {
        // marginStart:5,
        padding: wp('4'),

        paddingLeft: 15
    },

});
export default DrawerButton;
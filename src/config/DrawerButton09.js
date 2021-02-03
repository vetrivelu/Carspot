import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
    View,
    TextInput
} from 'react-native';
import Appearences from './Appearences';
import { widthPercentageToDP as wp } from '../helper/Responsive';
import { observer } from 'mobx-react';
import Store from '../Stores'
@observer
export default class DrawerButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            searchtxt: ''
        }
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: '#1D2127' }}>
                <TouchableOpacity style={[styles.wrapper, {
                    backgroundColor:
                        '#1D2127'
                    // Appearences.Colors.appBackgroundColor

                }]}
                    onPress={() => {

                        // navigation.navigate('DrawerOpen')
                        this.props.navigation.toggleDrawer();
                    }}>
                    <Image
                        style={styles.icon}
                        source={require('../../res/images/menu-white.png')}
                    />
                </TouchableOpacity>


                <View style={{ flexDirection: 'row', backgroundColor: '#fff', height: wp(8), width: wp(85), alignSelf: 'center', borderRadius: wp(2) }}>
                    <TextInput
                        style={{ height: wp(8.5), width: '92%', paddingLeft: wp(2), borderRadius: wp(2), fontSize: wp(3), color: "#000" }}
                        placeholder={Store.orderStore.home.placehldr}
                        placeholderTextColor="#000"


                        onChangeText={(text) => this.setState({ searchtxt: text })}

                    />
                    <TouchableOpacity 
                       onPress={() => {
                        let param = { ad_title: this.state.searchtxt }
                        const { navigate } = this.props.navigation;

                        let { orderStore } = Store;
                        orderStore.setIsCallAdvance(false);
                        this.setState({searchtxt:''})

                        navigate('SearchDetail', { params: param });
                    }}
                    style={[{ alignSelf: 'center' }]}>
                        <Image
                            style={styles.icon}
                            source={require('../../res/images/search_black.png')}
                        />
                    </TouchableOpacity>
                </View>



            </View>
        )
    }
}
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

import React, { Component } from 'react';
import { width, height, totalSize } from 'react-native-dimension';
import { AsyncStorage } from 'react-native'
import RNRestart from 'react-native-restart';
import {
  ImageBackground, View, Text, ActivityIndicator, I18nManager, ScrollView, FlatList, TouchableOpacity, Image
} from 'react-native';
import Styles from './Styles'
import { widthPercentageToDP as wp } from '../../helper/Responsive'
import LocalDb from '../../storage/LocalDb'

import Store from '../../Stores/orderStore'

import * as Animatable from 'react-native-animatable';
const swing = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};
export default class Language extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false

    }

  }
  updateLanguage = (item) => {
    LocalDb.setItem('language', item.code)
    // Storage.getItem('language').then((val)=>{
    //   console.log('val is',val)
    // })
    RNRestart.Restart();

    // }
  }

  render() {
    let data = Store.wpml_settings
    console.log("My data", data)
    return (
      <ImageBackground
        source={require("../../../res/images/bg_language_select.jpg")}
        style={[Styles.container]}>
        {
          this.state.loading ?
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <ActivityIndicator color="blue" size='large' animating={true} />
            </View>
            :
            <ScrollView
              showsVerticalScrollIndicator={false}>
              <View style={{ marginTop: "10%", marginLeft: "10%" }}>
                <Text style={[{ fontSize: wp('5'), fontWeight: 'bold' }, I18nManager.isRTL ? { textAlign: 'left' } : {}]}>{data.sb_wpml_select_lang_title}</Text>

              </View>

              <FlatList
                data={data.wpml_site_languages}
                style={{ flex: 1, marginTop: '5%' }}
                renderItem={({ item }) =>
                  <TouchableOpacity
                    onPress={() => this.updateLanguage(item)}
                    style={Styles.blogCon}>
                    <Animatable.View
                      ref="view"
                      animation={'bounce'}
                      style={{ flexDirection: 'row', alignContent: 'space-between', width: width(80), alignItems: 'center', paddingVertical: wp('4') }}>
                      <Animatable.Text tran animation={swing} style={{ color: '#6E768B', fontSize: wp(4), marginLeft: wp('10') }}>{item.native_name}</Animatable.Text>
                      <View style={{ width: '30%', position: 'absolute', right: wp('2'), alignContent: 'center', alignItems: 'center' }}>
                        <Image
                          source={{ uri: item.lang_flag }}
                          resizeMode="contain"
                          style={{ height: wp('10'), width: wp('10') }}
                        />
                      </View>

                    </Animatable.View>
                  </TouchableOpacity>
                }

              />

            </ScrollView>
        }


      </ImageBackground>

    )
  }
} 
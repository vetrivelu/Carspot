// import { View, Text, AsyncStorage, Alert, I18nManager, Platform, AppState, SafeAreaView, StatusBar } from 'react-native';
// import Store from '../Stores';


// export const BodyType1=(props)=>{
//     let { orderStore } = Store;
//     const data = orderStore.home;
//     if (!data.body_type_is_show)
//       return null;
//     return (<View>




//       <View style={styles.headingContainer}>
//         <Text style={styles.bodyHeadingBlack}>{data.body_type_txt1}</Text>
//         <Text style={styles.bodyHeadingAppColor}> {data.body_type_txt2}</Text>
//       </View>
//       <View style={styles.startPadding}>


//       </View>
//       <View style={styles.featuredTypeListContainer}>


//         <FlatList
//           data={data.body_type_icons}
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}

//           ref={(ref) => { this.flatListRef = ref; }}
//           renderItem={({ item, index }) =>

//             <TouchableOpacity
//               activeOpacity={1}
//               onPress={() => props.onFeaturedTypeClick(item)}
//               style={[{ alignContent: 'center', alignItems: 'center' }]}
//             >
//               <Animatable.View
//                 duration={2000}
//                 animation="zoomIn"
//                 iterationCount={1}
//                 style={[FeaturedTypeStyle.container, { paddingHorizontal: wp('2'), paddingVertical: wp('0'),borderWidth:wp('0.3'),borderColor:'#f1f1f1', backgroundColor: "#f8f8f8" }]}
//                 direction="alternate">
//                 <Image
//                   style={FeaturedTypeStyle.image}
//                   source={{ uri: item.img }} />
//               </Animatable.View>

//               <Text style={FeaturedTypeStyle.text}>
//                 {item.name}
//               </Text>



//             </TouchableOpacity>
//           }
//           keyExtractor={item => item.body_type_id + ''}
//         >
//         </FlatList>




//       </View>


//       {/* {orderStore.isPublicProfile ? null :
//         <TouchableOpacity style={styles.buttonRow}
//           activeOpacity={1}
//           onPress={async () => {
//             await BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
//             this.props.navigation.navigate("Selll");
//           }}>
//           <View
//             style={[styles.button, { backgroundColor: orderStore.color }]}>
//             <Text style={styles.buttonTextStyle}>{data.extra.ad_post}</Text>
//           </View>
//         </TouchableOpacity>
//       } */}








//     </View>);

// }
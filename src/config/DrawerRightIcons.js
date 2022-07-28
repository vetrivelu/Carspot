import React from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
} from 'react-native';

const DrawerRightIcons = ()=>(
    <View style={styles.twoButtonView}>
    <TouchableOpacity >
      <Image source={null} 
      style = {styles.icons}
      />
    </TouchableOpacity>

    <TouchableOpacity >
      <Image source={null} 
      style = {styles.icons}/>
    </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
   
    
    icons:{
        width:20,
        height:20,    
        marginEnd:15,
        
    },
   
  
  twoButtonView: {
    flexDirection: 'row',
  }
});
export default DrawerRightIcons;
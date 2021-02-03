import React from 'react';
import Store from '../Stores'
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
} from 'react-native';

class  SearchDetailRightIcon extends React.Component{
  constructor(props){
      super(props);
  }
render(){
    return(  <View style={styles.twoButtonView}>
        <TouchableOpacity 
        onPress = {()=>{                    
            let {orderStore} = Store;
            orderStore.setOnClickSearchListener(true);
        }}
        >
          <Image source={require('../../res/images/filters.png')} 
          style = {styles.icons}
          />
        </TouchableOpacity>
    
       
      </View>)
}

}
const styles = StyleSheet.create({
   
    
    icons:{
        width:20,
        height:20,    
        marginEnd:20,
        
    },
   
  
  twoButtonView: {
    flexDirection: 'row',
  }
});
export default SearchDetailRightIcon;
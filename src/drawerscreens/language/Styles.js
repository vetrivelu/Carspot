import {StyleSheet} from 'react-native'
import { width, height, totalSize } from 'react-native-dimension';

 const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#f9f9f9"
    },
    blogCon:{
        elevation :5,
        shadowOpacity: 0.6,
        width:width(80),
        alignItems:'center',
        marginVertical:10,shadowColor:'gray',alignSelf:'center',backgroundColor:"white"
      },
})
export default styles
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Store from '../Stores';
import Appearences from '../config/Appearences';




export default class ConfirmDialogue extends Component<Props> {

    static propTypes = {
        title:PropTypes.string,
        okText:PropTypes.string,
        cancelText:PropTypes.string, 
 };

 static defaultProps = {
    title:'Are You Sure?',
    okText:'Ok',
    cancelText:'Cancel',
};

    constructor(props){
        super(props);
    
        this.state = {
            visible:true,
        }
       
      }

    

    render() {
        let {orderStore} = Store;
        if(!this.props.visible)
        return null;
         return (
            
            <View style = {s.container}>
              
                <View style = {s.popupContainer}>
                    <Text style = {s.headingText}>{this.props.title}</Text>
                    <View style = {s.buttonRowContainer}>
                        <TouchableOpacity style = {s.buttonCancel} onPress = {this.props.onCancel}>
                            <Text style = {[s.buttonText,{color:Appearences.Colors.black}]}>{this.props.cancelText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {[s.buttonOkay,{backgroundColor:orderStore.color}]} onPress = {this.props.onConfirm}>
                            <Text style = {[s.buttonText,{color:Appearences.Colors.black}]}>{this.props.okText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>


       );

        


    }
}


const s = StyleSheet.create({
  
    container: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent:'center',   
        backgroundColor:'rgba(102,102,102,0.3)',
        alignSelf: 'center',
        position:'absolute',
        
    },
  popupContainer:{
      width:'80%',
      height:100,
      backgroundColor:'white',
    
      alignItems:'center',
      justifyContent:'center',
        borderRadius:Appearences.Radius.radius,

  },
  headingText:{
      color:'black',
      fontSize:Appearences.Fonts.headingFontSize,
      textAlign:'center',
  },
  buttonRowContainer:{
      width:'100%',
      flexDirection: 'row',
      justifyContent:'space-evenly',
      marginTop:10,
  },
  buttonOkay:{
      width:'25%',
      


      borderRadius:3,
      paddingTop:5,
      paddingBottom:5,
      paddingStart:10,
      paddingEnd:10,
      alignItems:'center',
      justifyContent:'center',
  },
  buttonCancel:{
    width:'25%',
    borderWidth:1,
    borderColor:Appearences.Colors.grey,
    borderRadius:3,
    paddingTop:5,
    paddingBottom:5,
    paddingStart:10,
    paddingEnd:10,
    alignItems:'center',
    justifyContent:'center',
  },
buttonText:{
    fontSize:Appearences.Fonts.paragraphFontSize,
    color:"white",
},

       
});


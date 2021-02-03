import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    I18nManager,
    Image,
} from 'react-native';

import Appearences from '../config/Appearences'
import Store from '../Stores';
import ModalDropdown from 'react-native-modal-dropdown';
import * as Progress from 'react-native-progress';
import SwitchButton from '../components/SwitchButton';
export default class DealerDialogue extends Component<Props> {

   

   
 

    constructor(props){
        super(props);
        this.props.ids;
        this.state = {
           selectedValue:'',
           selectedId:'',
           values:'',
           ids:'',
           values:[],
           activeSwitch:0,
        }
       
      }
      componentDidUpdate = (prevProps, prevState)=>{

        if(this.state.selectedId.length==0)
        {
          this.props.defaultValue(this.props.ids[1],this.props.values[1]);

        }
        //console.warn("Prevous States ",prevState)
      }
    //   static getDerivedStateFromProps = (nextProps, prevState)=>{
    //       if(nextProps.ids.length!=0){
    //         if(prevState.selectedId === ''){
    //           console.warn('inside', nextProps.ids[1]);
    //           return {selectedId:nextProps.ids[1]}
    //         }
    //       }
    //     return null;
    //  }
    

    render() {
 let {orderStore} = Store;
        if(!this.props.visible)
        return null;
         return (
            
            <View style = {s.container}>
              
                <View style = {s.popupContainer}>
                  <View style = {s.headingTextContainer}>  
                    <Text style = {s.headingText}>{this.props.title}</Text>
                 </View>   
                 <View>
                 <TouchableOpacity 
                  onPress = {()=>{this.dropdownRef.show();}} 
                 style = {s.dropDownContainer}>
                 
                 <SwitchButton
                onValueChange={async (val) => {
                 
                  this.setState({selectedUserId:this.props.ids[val]});
                  this.setState({ activeSwitch: val, })


                  this.props.selectedValue(this.props.values[val],this.props.ids[val]);
                  let {orderStore} = Store;
                  // console.warn("render",this.props.ids[val])
                  this.setState({selectedId:this.props.ids[val]});
                  if(this.props.ids[val]==='individual')
                  {
                      orderStore.isDealer = false;
                      orderStore.isIndividual = true;
                  }
                  else if(this.props.ids[val]==='dealer')
                  {
                      orderStore.isDealer = true;
                      orderStore.isIndividual = false;

                  }
                  else 
                  {
                      orderStore.isDealer = false;
                      orderStore.isIndividual = false;
                  }    



              
              }
              }      // this is necessary for this component
                text1 = {this.props.values[1]}                        // optional: first text in switch button --- default ON
                text2 = {this.props.values[2]}                      // optional: second text in switch button --- default OFF
                switchWidth = {180}                 // optional: switch width --- default 44
                switchHeight = {40}                 // optional: switch height --- default 100
                switchdirection = 'rtl'             // optional: switch button direction ( ltr and rtl ) --- default ltr
                switchBorderRadius = {100}          // optional: switch border radius --- default oval
                switchSpeedChange = {500}           // optional: button change speed --- default 100
                switchBorderColor = {Appearences.Colors.lightGrey}       // optional: switch border color --- default #d4d4d4
                switchBackgroundColor = {Appearences.Colors.lightGrey}     // optional: switch background color --- default #fff
                btnBorderColor = {orderStore.color}          // optional: button border color --- default #00a4b9
                btnBackgroundColor = {orderStore.color}    // optional: button background color --- default #00bcd4
                fontColor = {Appearences.Colors.lightGrey}               // optional: text font color --- default #b1b1b1
                activeFontColor = {Appearences.Colors.black}            // optional: active font color --- default #fff
            />

                        {/* <ModalDropdown 
                            options={this.props.values}
                            ref={el => this.dropdownRef = el}    
                            
                            dropdownStyle = {s.dorpDownStyle}
                            dropdownTextHighlightStyle = {s.dropDownTextStyle}
                            defaultValue = {this.props.values[0]}
                           
                            onSelect = {(index,value)=>{
                                this.props.selectedValue(value,this.props.ids[index]);
                                // let {orderStore} = Store;
                                
                                // this.setState({selectedId:this.state.ids[index]});
                                // if(this.state.ids[index]==='individual')
                                // {
                                //     orderStore.isDealer = false;
                                //     orderStore.isIndividual = true;
                                // }
                                // if(this.state.ids[index]==='dealer')
                                // {
                                //     orderStore.isDealer = true;
                                //     orderStore.isIndividual = false;

                                // }
                                // if(this.state.ids[index].length === 0)
                                // {
                                //     orderStore.isDealer = false;
                                //     orderStore.isIndividual = false;
                                // }    
                            
                            }}
                            renderSeparator = {()=>{return(<View style = {{
                              width:0,
                              height:0,
                              backgroundColor:'transparent'}}/>);}}
                            renderRow = {(option,index,isSelected)=>{
                            return(<View style = {s.dorpDownRow}>
                                    <Text style = {s.dropDownTextStyle}>{option}</Text>
                                    </View>);
                            }}/> 
                                <Image
                        source = {require('../../res/images/right_arrow.png')}
                        style = {s.arrowImage}
                    /> */}

                </TouchableOpacity>
                </View>
                <View style = {s.buttonRow}>
                {this.props.showProgressCircle ?
                <Progress.Circle 
                size={Appearences.Fonts.paragraphFontSize} 
                indeterminate={true}
                color = {orderStore.color}
                />
                    :<TouchableOpacity 
                    onPress = {()=>{
                        this.props.onClickButton(true);
                        // if(this.state.selectedId.length!=0)
                        // this.props.onClickButton(true);
                        // else
                        // this.props.onClickButton(false);
                    }}
                    style = {[s.button,{backgroundColor:orderStore.color}]}>
                        <Text style = {s.buttonText}>{this.props.buttonText}</Text>        
                    </TouchableOpacity>  
                    }  
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
      width:'90%',
      backgroundColor:'white',
      borderRadius:Appearences.Radius.radius,
      padding:25,
      paddingBottom:40,

  },
headingTextContainer:{
    width:'100%',
    height:50,
    alignItems:'center',
    justifyContent:'center',
},
  headingText:{
      color:Appearences.Colors.black,
      fontSize:Appearences.Fonts.headingFontSize,
      textAlign:'center',
  },


  dropDownContainer:{
      width:'100%',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:Appearences.Radius.radius,
      paddingEnd:5,
  },

       arrowImage:{
        width:Appearences.Fonts.paragraphFontSize,
        height:Appearences.Fonts.paragraphFontSize,
        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
        marginEnd:5,
       },
       paragraphText:{
           fontSize:Appearences.Fonts.paragraphFontSize,
           color:Appearences.Colors.black,
           marginStart:5,
       },
       dorpDownStyle:{
        width:'75%',
        height:85,
      },
      
      dorpdownContainerTextStyle:{
        fontSize:Appearences.Registration.paragraphFontSize,
        color:Appearences.Colors.grey,
        
      },
      dorpDownRow:{
        width:'100%',
       
        justifyContent:'center',
      },
      dropDownTextStyle :{
        fontSize:Appearences.Registration.fontSize,
        color:Appearences.Colors.headingGrey,
        paddingStart:5,
        paddingTop:5,
        paddingBottom:5,
      },
      buttonRow:{
          width:'100%',
          height:40,
          alignItems:'center',
          justifyContent:'center',
          marginTop:15,
      },
      button:{
        width:'100%',
        height:Appearences.Registration.itemHeight-10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:Appearences.Radius.radius,
      },
      buttonText:{
          color:'white',
          fontSize:Appearences.Fonts.paragraphFontSize,
      },
});


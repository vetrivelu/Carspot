import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Picker,
  Alert,
} from 'react-native';
import Appearences from '../../../config/Appearences';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import styles from './Styles';
import Modal from 'react-native-modalbox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import orderStore from '../../../Stores/orderStore';




export default class ShopFilters extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      multiSliderValue: [500, 500000],
  
      isMakeDisabled: false,
      makeCurrentIndex:0,
      makeValue:'Select An Option',

      isModelDisabled: false,
      modelCurrentIndex:0,
      modelValue:'Select An Option',
    };
  
  
    }
    onMakeClose() {}
    onMakeOpen() {}
    onMakeClosingState(state) {}
  
    onModelClose() {}
    onModelOpen() {}
    onModelClosingState(state) {}



  




  
 
  multiSliderValuesChange = (values) => {
    this.setState({
      multiSliderValue: values,
    });}
  render() {

    var makeData = [
        {label: 'La', value: 'cali' },
        {label: 'Test Value 2', value: 'Test Value 2' },
        {label: 'Test Value 3', value: 'Test Value 3' },
        {label: 'Test Value 4', value: 'Test Value 4' },
   
      ];
   
      var modelData = [
        {label: 'La', value: 'cali' },
        {label: 'Test Value 2', value: 'Test Value 2' },
        {label: 'Test Value 3', value: 'Test Value 3' },
        {label: 'Test Value 4', value: 'Test Value 4' },
   
      ];
     
   
    var {height,width} = Dimensions.get('window');
      return (

        <View style = {{height:'100%',
        backgroundColor:'white',}}>




                
                       {/*Make Modal Start*/}

        <Modal 
        style={styles.modal} 
        position={"center"} ref={"maketModal"} 
        isDisabled={this.state.isMakeDisabled}
        onClosed={this.onMakeClose}
        onOpened={this.onMakeOpen}
        onClosingState = {this.onMakeClosingState}
        swipeThreshold = {50}>
          <View style = {styles.modalHeadingTextContainer}>
              <Text style = {styles.modalText}>Select An Option</Text>
          </View>    
          <View style = {styles.seperator}/>
       
          <ScrollView>
            <RadioForm
            formHorizontal={false}
            animation={true}>
            {
              makeData.map((obj, i) => {
                return(
              <View key={i}>
                  <RadioButton 
                      labelHorizontal={true} 
                      style = {{marginTop:5,}} >
                      
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      isSelected={this.state.isMakeDisabled === i}
                      labelHorizontal={true}
                      onPress={(obj,index)=>{
                        this.setState({makeCurrentIndex:index,
                          makeValue:makeData[index].value});
                          this.refs.maketModal.close();
                        }}
                      labelStyle={styles.radioLabelStyle}
                      labelWrapStyle={styles.labelWrapStyle}/>

                    <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.makeCurrentIndex === i}
                        onPress={(obj,index)=>{
                          this.setState({makeCurrentIndex:index,
                            makeValue:makeData[index].value});
                          this.refs.maketModal.close();
                        }}
                        borderWidth={1}
                        buttonInnerColor={orderStore.color}
                        buttonOuterColor={this.state.makeCurrentIndex === i ? orderStore.color : '#000'}
                        buttonSize={5}
                        buttonStyle={styles.radioButtonStyle}
                        buttonWrapStyle={styles.buttonWrapStyle}/>
              
                  </RadioButton>
                  <View style = {makeData.length-1 == i ? styles.noStyle:styles.seperator }/>
              </View>
                ); })}
                
          </RadioForm>
        </ScrollView>       
      </Modal>
    {/*Make Modal End*/}




        {/*Model Modal Start*/}

        <Modal 
        style={styles.modal} 
        position={"center"} ref={"modelModal"} 
        isDisabled={this.state.isMakeDisabled}
        onClosed={this.onModelClose}
        onOpened={this.onModelOpen}
        onClosingState = {this.onModelClosingState}
        swipeThreshold = {50}>
          <View style = {styles.modalHeadingTextContainer}>
              <Text style = {styles.modalText}>Select An Option</Text>
          </View>    
          <View style = {styles.seperator}/>
       
          <ScrollView>
            <RadioForm
            formHorizontal={false}
            animation={true}>
            {
              makeData.map((obj, i) => {
                return(
              <View key={i}>
                  <RadioButton 
                      labelHorizontal={true} 
                      style = {{marginTop:5,}} >
                      
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      isSelected={this.state.isModelDisabled === i}
                      labelHorizontal={true}
                      onPress={(obj,index)=>{
                        this.setState({modelCurrentIndex:index,
                          modelValue:modelData[index].value});
                          this.refs.modelModal.close();
                        }}
                      labelStyle={styles.radioLabelStyle}
                      labelWrapStyle={styles.labelWrapStyle}/>

                    <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.modelCurrentIndex === i}
                        onPress={(obj,index)=>{
                          this.setState({modelCurrentIndex:index,
                            modelValue:modelData[index].value});
                          this.refs.modelModal.close();
                        }}
                        borderWidth={1}
                        buttonInnerColor={orderStore.color}
                        buttonOuterColor={this.state.modelCurrentIndex === i ? orderStore.color : '#000'}
                        buttonSize={5}
                        buttonStyle={styles.radioButtonStyle}
                        buttonWrapStyle={styles.buttonWrapStyle}/>
              
                  </RadioButton>
                  <View style = {modelData.length-1 == i ? styles.noStyle:styles.seperator }/>
              </View>
                ); })}
                
          </RadioForm>
        </ScrollView>       
      </Modal>
    {/*Model Modal End*/}
    




    
            <ScrollView contentContainerStyle={{
              backgroundColor:'white',
              paddingBottom:50,
            }}>
              <View style = {styles.container}>
              
                    <View style = {styles.headingTextContainer}>
                      <Text style = { styles.headingTextBlack}>Search By Keyword</Text>
                    </View>  
                    <TextInput style = {styles.TextInput}
                    underlineColorAndroid = 'transparent'
                    textAlign = {Appearences.Rtl.enabled ? 'right' : 'left'}
                    placeholderTextColor = {Appearences.Registration.textColor}
                    placeholder = 'Enter text here'>
                    </TextInput>  

                   

                    {/*Make*/}
                <View style = {styles.headingTextContainer}>
                      <Text style = { styles.headingTextBlack}>Make</Text>
                </View>
                <TouchableOpacity 
                        onPress = {()=>{
                          this.refs.maketModal.open();
                        }}
                        style = {styles.PopupViewContainer}>
                            <Text style = {styles.popupViewText}>{this.state.makeValue}</Text>
                            <Image
                            style = {styles.popupViewImage}
                            source = {require('../../../../res/images/right_arrow.png')} 
                            />
                    </TouchableOpacity>   
                    {/* Price */}
                 <View style = {styles.headingTextContainer}>
                      <Text style = { styles.headingTextBlack}>Price</Text>
                    </View>  
                    <TouchableOpacity
                      style = {styles.PopupViewContainer}>
                        <Text style = {styles.popupViewText}>{'Price($) '+this.state.multiSliderValue[0] + ' - '+this.state.multiSliderValue[1]}</Text>
                    </TouchableOpacity>  

                    <MultiSlider
                      isMarkersSeparated={true}
                      markerOffsetY={5}
                      selectedStyle={{
                      backgroundColor: orderStore.color,
                      }}
                    
                      unselectedStyle={{
                      backgroundColor: Appearences.Colors.lightGrey,
                    }}

                      containerStyle={{
                      height:40,}}
                      
                      trackStyle={{
                      height: Appearences.Fonts.headingFontSize,
                      backgroundColor: 'red',
                      borderRadius:5,
                      }}
                      touchDimensions={{
                      height: 40,
                      width: 40,
                      borderRadius: 20,
                      slipDisplacement: 40,
                      }}
                      customMarkerLeft={(e) => {
                      var currentValue = e.currentValue;
                        return (
                          <View style = {[styles.circle,{borderColor:orderStore.color}]}>
                            <Image source = {require('../../../../res/images/minus_red.png')} style = {[styles.sliderImage,{tintColor:orderStore.color}]}/>
                          </View>
                        );
                      }}
                      
                      customMarkerRight={(e) => {
                      var currentValue = e.currentValue;
                        return (
                          <View style = {[styles.circle,{borderColor:orderStore.color}]}>
                            <Image source = {require('../../../../res/images/plus_red.png')} style = {[styles.sliderImage,{tintColor:orderStore.color}]}/>
                          </View>
                        );
                      }}
                      sliderLength={width/2}
                      min={100}
                      max={1000000}
                      step={100}
                    // allowOverlap
                    // snapped
                      values={[this.state.multiSliderValue[0], this.state.multiSliderValue[1]]}
                      onValuesChange={this.multiSliderValuesChange}
                      />


                 {/*Model*/}
                 <View style = {styles.headingTextContainer}>
                      <Text style = { styles.headingTextBlack}>Model</Text>
                </View>
                <TouchableOpacity 
                        onPress = {()=>{
                          this.refs.modelModal.open();
                        }}
                        style = {styles.PopupViewContainer}>
                            <Text style = {styles.popupViewText}>{this.state.modelValue}</Text>
                            <Image
                            style = {styles.popupViewImage}
                            source = {require('../../../../res/images/right_arrow.png')} 
                            />
                    </TouchableOpacity>   
             
             <View style = {styles.footerContainer}>               
               <TouchableOpacity style = {[styles.footer,{backgroundColor:orderStore.color}]}>
                  <Text style = {styles.footerText}>Filter</Text>          
              </TouchableOpacity>               
              </View>               

              </View>
              
              </ScrollView>
                       
          </View>
        );
    }
  
    
  }
  

 


  
  
  
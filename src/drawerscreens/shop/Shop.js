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
  FlatList,

} from 'react-native';
import Appearences from '../../config/Appearences';
import styles from './Styles';
import StarRating from 'react-native-star-rating';
import Modal from 'react-native-modalbox';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import orderStore from '../../Stores/orderStore';
export default class Shop extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      data:[
        {  
          image:'',   
          title:'Plan 01',
          rating:4,
          ratingText:'(4 Reviews)',
          price:'50.00',
          currency:'$',
          maxRaging:5,
       
        },

        {
            image:'',   
            title:'Plan 01',
            rating:4,
            ratingText:'(4 Reviews)',
            price:'50.00',
            currency:'$',
            maxRaging:5,
        },

        {
            image:'',   
            title:'Plan 01',
            rating:4,
            ratingText:'(4 Reviews)',
            price:'50.00',
            currency:'$',
            maxRaging:5,
              }
      ],
    
      isFirstModalDisabled: false,
      firstModalCurrentIndex:0,
      firstValue:'Select An Option',
    };
  }
  onFirstModalClose() {}
  onFirstModalOpen() {}
  onFirstModalClosingState(state) {}


  render() {

    var firstData = [
      {label: 'La', value: 'cali' },
      {label: 'Test Value 2', value: 'Test Value 2' },
      {label: 'Test Value 3', value: 'Test Value 3' },
      {label: 'Test Value 4', value: 'Test Value 4' },
 
    ];
   
    
        return (

        <View style = {styles.container}> 





                       {/*First Modal Start*/}

        <Modal 
        style={styles.modal} 
        position={"center"} ref={"firstModal"} 
        isDisabled={this.state.isFirstModalDisabled}
        onClosed={this.onFirstModalClose}
        onOpened={this.onFirstModalOpen}
        onClosingState = {this.onFirstModalClosingState}
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
              firstData.map((obj, i) => {
                return(
              <View key={i}>
                  <RadioButton 
                      labelHorizontal={true} 
                      style = {{marginTop:5,}} >
                      
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      isSelected={this.state.isFirstModalDisabled === i}
                      labelHorizontal={true}
                      onPress={(obj,index)=>{
                        this.setState({firstModalCurrentIndex:index,
                          firstValue:firstData[index].value});
                          this.refs.firstModal.close();
                        }}
                      labelStyle={styles.radioLabelStyle}
                      labelWrapStyle={styles.labelWrapStyle}/>

                    <RadioButtonInput
                        obj={obj}
                        index={i}
                        isSelected={this.state.firstModalCurrentIndex === i}
                        onPress={(obj,index)=>{
                          this.setState({firstModalCurrentIndex:index,
                            firstValue:firstData[index].value});
                          this.refs.firstModal.close();
                        }}
                        borderWidth={1}
                        buttonInnerColor={orderStore.color}
                        buttonOuterColor={this.state.firstModalCurrentIndex === i ? orderStore.color : '#000'}
                        buttonSize={5}
                        buttonStyle={styles.radioButtonStyle}
                        buttonWrapStyle={styles.buttonWrapStyle}/>
              
                  </RadioButton>
                  <View style = {firstData.length-1 == i ? styles.noStyle:styles.seperator }/>
              </View>
                ); })}
                
          </RadioForm>
        </ScrollView>       
      </Modal>
    {/*First Modal End*/}
    










                <View style = {styles.row}>
                     <View style = {styles.showingContainer}>
                        <Text style = {styles.headingText}>
                            Showing 1-5 of 25 Results
                        </Text>
                     </View>   
                     <TouchableOpacity 
                        onPress = {()=>{
                          this.refs.firstModal.open();
                        }}
                        style = {styles.PopupViewContainerSmall}>
                            <Text style = {styles.popupViewText}>{this.state.firstValue}</Text>
                            <Image
                            style = {styles.popupViewImage}
                            source = {require('../../../res/images/right_arrow.png')} 
                            />
                    </TouchableOpacity>               
                </View>
               <View style = {styles.wrapper}>           
                {
                  this.state.data.map((item,key)=>(
                     
                    <TouchableOpacity 
                    key = {key}
                    style = {styles.itemContainer}
                    onPress = {()=>{
                      this.props.navigation.navigate('Cart');

                    }}
                    >
                    <View style = {styles.imageContainer}>
                          {/* <Image
                            style = {styles.image}
                            source = {require('../../../res/images/splash_car.png')}
                          />   */}
                    </View>
                    
                    <View style = {styles.contentContainer}>
                        <Text style = {styles.headingText}>
                            {item.title}
                        </Text>
                        <View style = {styles.rowWithTopMargin}>
                            <StarRating
                              disabled={true}
                              maxStars={item.maxRaging}
                              rating={item.rating}
                              starSize = {Appearences.Fonts.paragraphFontSize}
                              fullStarColor = '#D4AF37'/>
                            <Text style = {styles.reviewsText}>
                                {item.ratingText}
                            </Text>
                        </View>
                        <View style = {styles.rowWithTopMargin}>
                            <Text style = {styles.priceText}>
                              {item.currency+item.price}
                            </Text>
                        </View>
                    </View>

                    </TouchableOpacity>

                  ))
                }

              
              </View>         
        </View>
        );
    }
  
    
  }
  

 


  
  
  
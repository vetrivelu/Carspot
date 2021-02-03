import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  
} from 'react-native';

import Store from '../../../Stores';
import Toast from 'react-native-simple-toast';
import Api from '../../../network/Api';

import styles from './Styles';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import Appearences from '../../../config/Appearences'
import StarRating from 'react-native-star-rating';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Loader from '../../../components/Loader';  
import stores from '../../../Stores/orderStore';
import ModalBox from 'react-native-modalbox';
import ModalBox2 from 'react-native-modalbox';
export default class ComparisonDetail extends Component<Props> {
  static navigationOptions = ({ navigation }) => ({
    headerTitle:stores.screenTitles.comparison_detail,
    
    headerStyle: {
      backgroundColor: stores.color,
    },
 });
      onStarRatingPress(rating) {
      }
      componentWillMount = async ()=>{
        let {orderStore} = Store;
        const params = {car1: this.props.navigation.state.params.car1  ,car2:this.props.navigation.state.params.car2};
        
        const response = await Api.post("comparison/detail/",params);
        if(response.success ===  true){
            orderStore.settings = response.data;
            orderStore.innerResponse = response.extra;
            this.setState({firstValue:response.extra.compare_select,firstId:this.props.navigation.state.params.car1,secondValue:response.extra.compare_select,secondId:this.props.navigation.state.params.car2})
        }
        if(response.message.length!=0)    
        Toast.show(response.message);
        this.setState({showSpinner:false});
    
          


      }
      
  constructor(props){
    super(props);
   this.state = {
    
    showSpinner:true,

    firstModalCurrentIndex:0,
    firstValue:'',
    firstId:'',
    secondModalCurrentIndex:0,
    secondValue:'',
    secondId:'',
  
    }


  
}

_renderHeader(section, index, isActive, sections) {   
    var trxt:string;
    
//   console.log(JSON.stringify(section));
     return (
       <View>
           
       <Animatable.View
         duration={300}
         transition="backgroundColor"
         style={{ backgroundColor: (isActive ? stores.color : Appearences.Colors.lightGrey),
         flexDirection:'row', 
         alignItems:'center',
         height:50,
         paddingStart:15,
         paddingEnd:15,
         borderRadius:5,
         marginTop:5,
                }}>
           <View style = {styles.headerContentContainer}>
             <Text style = {isActive?styles.headerTextSwitched:[styles.headerText,{fontSize:Appearences.Fonts.headingFontSize}]}>{section.title}</Text>
             <View style = {styles.rotationViewContainer}>
             <Image style = {isActive ? styles.rotatingView : styles.NonrotatingView}
                source = {isActive ? require('../../../../res/images/up_arrow_white.png'): require('../../../../res/images/up_arrow.png')}
             
             />
               
             
             </View>
           </View>
       </Animatable.View>
       </View>
     );
   }


   renderAccordingData = (data) =>{
 
     return(
      <View style = {styles.accodrdinContentContainer}>  
      {
         data.map((item,key)=>(
          <View
          key = {key}
          >
            <View 
          
            style = {styles.accordingDataContainer}>
                <Text style = {styles.headerText}>
                    {item.title.toUpperCase()}
                </Text>
                <View style = {styles.accordinSubTextContainer}>
                <View style = {styles.accordinSubTextLeftContainer}>
                    <Text style = {[styles.accordinSubText,{alignSelf:'flex-start'}]}>
                        {item.col1}
                    </Text>
                </View>
                <View style = {styles.accordinSubTextRightContainer}>    
                    <Text style = {styles.accordinSubText}>
                        {item.col2}
                    </Text>
                 </View>   
                </View>
                
            </View>
            <View style = {data.length == key ? styles.noStyle:styles.seperator }/>
          </View>  
          
          )
          )}
      </View>
     
    );
  }
onClickCompare = async ()=>{
  this.setState({showSpinner:true});

  let {orderStore} = Store;
  const params = {car1: this.state.firstId  ,car2:this.state.secondId};
  const response = await Api.post("comparison/detail/",params);
  if(response.success ===  true){
      orderStore.settings = response.data;
      orderStore.innerResponse = response.extra;
  }
  if(response.message.length!=0)    
  Toast.show(response.message);
  this.setState({showSpinner:false});
}
onPressFirstModal(object, index){

  this.setState({firstModalCurrentIndex:index,
    firstValue:object.name,
    firstId:object.id});
  this.refs.modal1.close();

}
onPressSecondModal(object,index){
  this.setState({secondModalCurrentIndex:index,
    secondValue:object.name,
    secondId:object.id});
    this.refs.modal2.close();
}


  render() {
  if(this.state.showSpinner)
      return(
     <Loader/>);

    let {orderStore} = Store;
    const data = orderStore.settings;
    const extra = orderStore.innerResponse;
    const images = data.post.images;
    const tabs = orderStore.settings.post.tabs;
    let headersArray = [];    
  

    
      return (
       
        <View style = {{height:'100%',backgroundColor:'white',}}>

               {/*First Modal Start*/}

               <ModalBox       
                style = {styles.modalBoxStyle}
                position={"bottom"} 
                ref={"modal1"}>
                 <View style = {styles.modalContentContainer}>
                 <View style = {styles.subHeadingContainer}>
                 <Text style = {[styles.subHeading,{color:'#999999'}]}>{extra.compare_select}</Text>

                   </View> 
                      <View style = {{
                      height:150,
                      backgroundColor:Appearences.Colors.appBackgroundColor,
                      marginTop:10,
                      borderRadius:Appearences.Radius.radius,
                      }}>
                          <ScrollView>
            <RadioForm
            formHorizontal={false}
            animation={true}>
            {
              data.compare_posts.map((obj, i) => {
                var label = {label:{}};
                label.label = obj.name;
                return(


                  <TouchableOpacity
                  onPress = {()=>{ this.onPressFirstModal(obj,i);}}
                  >      
                     <View style = {styles.modalItemContainer}>
                       
                         <Text style = {[styles.flatListItemHeadingText,{alignSelf:'center',color:'#999999'}]}>
                             {obj.name}
                         </Text>
                         
                         <RadioButton 

                      >

                 <RadioButtonInput
                     obj={obj}
                     index={i}
                     onPress = {()=>{ this.onPressFirstModal(obj,i);}}
                     isSelected={this.state.firstModalCurrentIndex === i}
                     borderWidth={1}
                     buttonInnerColor={stores.color}
                     buttonOuterColor={this.state.firstModalCurrentIndex === i ? stores.color : Appearences.Colors.grey}
                     buttonSize={7}
                     buttonStyle={styles.radioButtonStyle}
                     buttonWrapStyle={styles.buttonWrapStyle}
                     style = {{marginTop:5,
                      paddingTop:5,
                      paddingBottom:5,}}
                     />
           
               </RadioButton>
   
                         
                     

                     </View>    
                  
                </TouchableOpacity>   
      




                 ); })}
                
          </RadioForm>
        </ScrollView>       
      </View>
              </View>
  
       
        </ModalBox>


        
                     {/*Second Modal Start*/}

                <ModalBox2           
                style = {styles.modalBoxStyle}
                position={"bottom"} 
                ref={"modal2"}>
                 <View style = {styles.modalContentContainer}>
                 <View style = {styles.subHeadingContainer}>
                 <Text style = {[styles.subHeading,{color:'#999999'}]}>Select An Option</Text>

                   </View> 
       <View style = {{                      height:150,
                      backgroundColor:Appearences.Colors.appBackgroundColor,
                      marginTop:10,
                      borderRadius:Appearences.Radius.radius,}}>
          <ScrollView>
            <RadioForm
            formHorizontal={false}
            animation={true}>
            {
              data.compare_posts.map((obj, i) => {
                var label = {label:{}};
                label.label = obj.name;
                return(


                  <TouchableOpacity
                  onPress = {()=>{ this.onPressSecondModal(obj,i);}}
                  >      
                     <View style = {styles.modalItemContainer}>
                       
                         <Text style = {[styles.flatListItemHeadingText,{alignSelf:'center',color:'#999999'}]}>
                             {obj.name}
                         </Text>
                         
                         <RadioButton 

                      >

                 <RadioButtonInput
                     obj={obj}
                     index={i}
                     onPress = {()=>{ this.onPressSecondModal(obj,i);}}
                     isSelected={this.state.secondModalCurrentIndex === i}
                     borderWidth={1}
                     buttonInnerColor={stores.color}
                     buttonOuterColor={this.state.secondModalCurrentIndex === i ? stores.color : Appearences.Colors.grey}
                     buttonSize={7}
                     buttonStyle={styles.radioButtonStyle}
                     buttonWrapStyle={styles.buttonWrapStyle}
                     style = {{marginTop:5,
                      paddingTop:5,
                      paddingBottom:5,}}
                     />
           
               </RadioButton>
   
                         
                     

                     </View>    
                  
                </TouchableOpacity>   
      




                 ); })}
                
          </RadioForm>
        </ScrollView>       
      </View>
              </View>
  
       
        </ModalBox2>



        {/*Second Modal End*/}


          <ScrollView contentContainerStyle={{paddingBottom:50,}}>  
       
                   
            <View style = {styles.container}>

                <Text style = {[styles.bodyHeadingBlack,{marginTop:10}]}>{extra.compare_txt+' '+extra.compare_txt2}</Text>
                <View style = {styles.bodyHeadingSeperatorContainer}>
                    
                </View>
                <View style = {styles.fieldsContainer}> 
                    <TouchableOpacity 
                        onPress = {()=>{
                        this.refs.modal1.open();
                        }}
                        style = {styles.PopupViewContainerSmall}>
                            <Text style = {styles.popupViewText}>{this.state.firstValue}</Text>
                            <Image
                            style = {styles.popupViewImage}
                            source = {require('../../../../res/images/right_arrow.png')} 
                            />
                    </TouchableOpacity>

                      <TouchableOpacity 
                        onPress = {()=>{
                        this.refs.modal2.open();
                        }}
                        style = {styles.PopupViewContainerSmall}>
                            <Text style = {styles.popupViewText}>{this.state.secondValue}</Text>
                            <Image
                            style = {styles.popupViewImage}
                            source = {require('../../../../res/images/right_arrow.png')} 
                            />
                    </TouchableOpacity>                    
                </View>      

               
                <TouchableOpacity 
                  onPress = {this.onClickCompare}
                  style = {[styles.button,{backgroundColor:stores.color}]}>
                  <Text style = {styles.buttonText}>{extra.compare}</Text>          
                </TouchableOpacity>               
                        


                <TouchableOpacity style = {styles.listItemContainer}
                            
                            onPress = {()=>{
                              
                            }}
                            >
                            <View style = {styles.listContentContainer}>
                              <View style = {styles.imageContaner}>
                                <Image source = {{uri:images.link1}} style = {styles.image}/>
                              </View>
                              <View style = {styles.bottomRowContainer}>  
                                <Text style = {styles.heaedrText}>{images.title1}</Text>
                                <View style = {styles.ratingBarContainer}>
                                              <StarRating
                                              disabled={true}
                                              maxStars={5}
                                              rating={parseInt(images.rat1)}
                                              //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                              starSize = {14}
                                              fullStarColor = '#D4AF37'
                                              />
                                              <Text style = {styles.heaedrText}> {(images.rat1)}</Text>
                                </View>
                            </View>   
                            </View>
                           
                            <View style = {styles.listContentContainer}>
                              <View style = {styles.imageContaner}>
                               
                                  <Image source = {{uri:images.link2}}  style = {styles.image}/>
                              </View>
                              <View style = {styles.bottomRowContainer}>  
                                <Text style = {styles.heaedrText}>{images.title2}</Text>
                                <View style = {styles.ratingBarContainer}>
                                              <StarRating
                                              disabled={true}
                                              maxStars={5}
                                              rating={parseInt(images.rat2)}
                                              //selectedStar={(rating) => this.onStarRatingPress(rating)}
                                              starSize = {14}
                                              fullStarColor = '#D4AF37'
                                              />
                                            <Text style = {styles.heaedrText}> {(images.rat2)}</Text>
                                </View>
                            </View>   
                            </View>
                </TouchableOpacity>
                 

                  {/* Transmission */}

               {/* <View  style = {styles.accordingContainer}>             
                <Accordion
                sections={this.state.sections}
                renderHeader={this._renderHeader}
                renderContent={()=>this.renderAccordingData(this.state.accordionData)}
                />             
               </View>             
            

              */}
          {
              tabs.map((obj, i) => {
                var titleArray = []; 
                var titleModel ={title:{}} ;
                 titleModel.title = obj.tab_name;
                 titleArray.push(titleModel);
                  headersArray.push(titleArray);

                return(
              <View  
              key = {i}
              style = {styles.accordingContainer}>             
                <Accordion
                underlayColor = 'transparent'
                sections={titleArray}
                renderHeader={this._renderHeader}
                renderContent={()=>this.renderAccordingData(obj.features)}
                />             
               </View> 
                       );})}
              </View>               
        

             

          
          </ScrollView>
        </View>
        );
    }
  
    
  }
  

 

 
  
  
  
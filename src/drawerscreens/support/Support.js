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

} from 'react-native';
import Appearences from '../../config/Appearences';
import styles from './Styles';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import orderStore from '../../Stores/orderStore';
export default class Support extends Component<Props> {

  constructor(props){
    super(props);
    this.state = {
      sections:[
          {
            title:'Does carsport support custom taxeamony',
            content :'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          },
          {
            title:'Does carsport support custom taxeamony',
            content :'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          },
          {
            title:'Does carsport support custom taxeamony',
            content :'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          },
          {
            title:'Does carsport support custom taxeamony',
            content :'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          },
        
        

      ],
    };
  }




  _renderHeader(section, index, isActive, sections) {   
    var trxt:string;
    
   
     return (
       <View>
           
       <Animatable.View
         duration={300}
         transition="backgroundColor"
         style={{ backgroundColor: (isActive ? orderStore.color : Appearences.Colors.lightGrey),
         flexDirection:'row', 
         alignItems:'center',
         height:50,
         paddingStart:15,
         paddingEnd:15,
         borderRadius:5,
         marginTop:5,
                }}>
           <View style = {styles.headerContentContainer}>
             <Text style = {isActive?styles.headerTextSwitched:styles.headerText}>{section.title}</Text>
             <View style = {styles.rotationViewContainer}>
             <Image style = {isActive ? styles.rotatingView : styles.NonrotatingView}
                source = {isActive ? require('../../../res/images/up_arrow_white.png'): require('../../../res/images/up_arrow.png')}
             
             />
               
             
             </View>
           </View>
       </Animatable.View>
       </View>
     );
   }




  renderAccordingData = (section, i, isActive, sections) =>{
    return(
      <View style = {styles.sectionContainer}>
        
        <Text style = {styles.paragraphText}>
        {section.content}   
        </Text>       
      </View>
     
    );
  }


  render() {

  
   
    
        return (

        <View style = {{height:'100%',
        backgroundColor:'white',}}>

            <ScrollView contentContainerStyle={{
              backgroundColor:'white',
              paddingBottom:50,
            }}>
              <View style = {styles.container}>
              
               




                <View  style = {styles.accordingContainer}>             
                <Accordion
                underlayColor = 'transparent'
                sections={this.state.sections}
                renderHeader={this._renderHeader}
                renderContent={this.renderAccordingData}
                />             
               </View> 

               
                
             
              </View>
              
              </ScrollView>
                       
          </View>
        );
    }
  
    
  }
  

 


  
  
  
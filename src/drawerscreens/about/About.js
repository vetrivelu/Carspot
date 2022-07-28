import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  
} from 'react-native';

 
import styles from './Styles';

import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import Appearences from '../../config/Appearences';
import Store from '../../Stores';

import Loader from '../../components/Loader'

import Toast from 'react-native-simple-toast';
import Api from '../../network/Api';

import HTMLView from 'react-native-htmlview';

export default class About extends Component<Props> {


    
    static navigationOptions = {

        tabBarLabel:'Contact Us',
      }
    
  constructor(props){
    super(props);
   this.state = {
     showSpinner:true,
    sections:[  

  ],
  
    }
  
}
componentWillMount = async ()=>{

  let {orderStore} = Store;
  const response = await Api.get('app/aboutus');
  orderStore.settings = response;  

  if(response.success ===  true){
    if(response.data.list_is_show)
    {
      let listClone = [...response.data.list];
      this.setState({sections:listClone});
    }
    
  }
  if(response.message.length!=0)
  Toast.show(response.message);
  this.setState({showSpinner:false});
}


_renderHeader(section, index, isActive, sections) {   
  var trxt:string;
  
  let {orderStore} = Store;
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
    <View style = {styles.accordionBacground}> 
      <Text style = {styles.paragraphText}>
      {section.desc}   
      </Text>
    </View>         
    </View>
   
  );
}


  render() {
    
    if(this.state.showSpinner)
      return(
        <Loader/>

      );
      let {orderStore} = Store;
      const data = orderStore.settings.data;
      return (
       
        <View style = {{height:'100%',backgroundColor:'white',}}>
          <ScrollView contentContainerStyle={{paddingBottom:20,}}>  
       
                   
            <View style = {styles.container}>
               
   
                    <Text style = {styles.bodyHeadingBlack}>{data.main_title}</Text>
                 
                    <HTMLView
                  value={data.main_desc}
                  stylesheet = {{
                    h1:{color: Appearences.Colors.black,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                      

                      },
                      h2:{color: Appearences.Colors.black,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                       
                      },
                      h3:{color: Appearences.Colors.black,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                      
                      },
                      h4:{color: Appearences.Colors.black,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                      
                      },
                      h5:{color: Appearences.Colors.black,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                       
                      },
                      h6:{color: Appearences.Colors.black,
                        fontSize:Appearences.Fonts.subHeadingFontSize,
                       
                      },
                      p:{
                        color: Appearences.Colors.headingGrey,
                        fontSize:Appearences.Fonts.headingFontSize,
                      

                      },
                      span:{
                        color: Appearences.Colors.headingGrey,
                        fontSize:Appearences.Fonts.headingFontSize,
                     
                      },
                    
                    
                  }
                  }
                  
                  />
            
              {data.list_is_show ?
              <View  style = {styles.accordingContainer}>             
              <Accordion

              sections={this.state.sections}
              renderHeader={this._renderHeader}
              renderContent={this.renderAccordingData}
              underlayColor = 'transparent'
              />             
              </View> 
              :null }
            </View>               
                        

          
          </ScrollView>
        </View>
        );
    
    
    }
   
    }

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,

  TouchableOpacity,
  ScrollView,

} from 'react-native';
import Toast from 'react-native-simple-toast';
import Appearences from '../../../../config/Appearences';
import Store from '../../../../Stores';
import styles from './Styles';
import DealerHeader from '../../../../components/DealerHeader'; 
import Api from '../../../../network/Api';
import * as Progress from 'react-native-progress';

export default class Contact extends Component<Props> {

        
  constructor(props){
    super(props);

    this.state = {
      name:'',
      email:'',
      phoneNo:'',
      message:'',
      isNameRequired:false,
      isEmailRequired:false,
      isPhoneRequired:false,
      isMessageRequired:false,
      showProgressCircle:false,
      
      showNameError:false,
      showEmailError:false,
      showPhoneError:false,
      showMessageError:false,
    }


        }
componentWillMount(){
  let {orderStore} = Store;
  const fields = orderStore.publicProfile.form.fields;
  this.setState({
    isNameRequired:fields[0].is_required,
    isEmailRequired:fields[1].is_required,
    isPhoneRequired:fields[2].is_required,
    isMessageRequired:fields[3].is_required});

}

postContact = async ()=>{
  let {orderStore} = Store;
  this.setState({showProgressCircle:true});
  
  

  if(this.state.name.length === 0 && this.state.isNameRequired)
  {
    this.setState({showNameError:true});
  }
  else
  this.setState({showNameError:false});

  if(this.state.email.length === 0 && this.state.isEmailRequired)
  {
    this.setState({showEmailError:true});
  }
  else
  this.setState({showEmailError:false});

  if(this.state.phoneNo.length === 0 && this.state.isPhoneRequired)
  {
    this.setState({showPhoneError:true});
  }
  else
  this.setState({showPhoneError:false});

  if(this.state.message.length === 0 && this.state.isMessageRequired)
  {
    this.setState({showMessageError:true});
  }
  else
  this.setState({showMessageError:false});
  
  const params = {"user_id":orderStore.publicProfile.id,"form_type":"public_profile_contact_form","name":this.state.name,"email":this.state.email,"phone":this.state.phoneNo,"message":this.state.message};
  const response = await Api.post("profile/public/submit/form",params);  
  if(response.success === true)
  {
    this.setState({
      name:'',email:'',phoneNo:'',message:''
    })
  }
  this.setState({showProgressCircle:false});
  if(response.message.length!=0){
    Toast.show(response.message);
    this.setState({
      name:'',email:'',phoneNo:'',message:''
    })

  }
}



  render() {
    let {orderStore} = Store;
    const form = orderStore.publicProfile.form;
    const fields = orderStore.publicProfile.form.fields;
      return (
        <View style = {{
          height:'100%',
          backgroundColor:Appearences.Colors.appBackgroundColor,
          paddingBottom:5,
        }}>

            
      
        


        <ScrollView
        keyboardShouldPersistTaps='always'>

    <DealerHeader/>
            <View style = {styles.panel}>
               
            <Text style = {styles.subHeading}>
              {fields[0].field_name}           
              </Text>
              <TextInput style = {this.state.showNameError ? styles.TextInputError : styles.TextInput}
              underlineColorAndroid="transparent"              
              textAlign = {Appearences.Rtl.enabled ? 'right' : 'left'}
              value = {this.state.name}
              onChangeText = {(text)=>{
                this.setState({name:text});
              }}>
              </TextInput>

                 <Text style = {styles.subHeading}>
                 {fields[1].field_name}           
              </Text>
              <TextInput 
              keyboardType = {'email-address'}
              textAlign = {Appearences.Rtl.enabled ? 'right' : 'left'}
              underlineColorAndroid="transparent"  
              style = {this.state.showEmailError ? styles.TextInputError : styles.TextInput}
              value = {this.state.email}
              onChangeText = {(text)=>{
                this.setState({email:text});
              }}>
              </TextInput>

                 <Text style = {styles.subHeading}>
                 {fields[2].field_name}           
              </Text>
              <TextInput 
              keyboardType = {'number-pad'}
              underlineColorAndroid="transparent"
              textAlign = {Appearences.Rtl.enabled ? 'right' : 'left'}
              value = {this.state.phoneNo}
              style = {!this.state.showPhoneError ? styles.TextInput : styles.TextInputError}
              onChangeText = {(text)=>{this.setState({phoneNo:text})}}>
              </TextInput>

              <Text style = {styles.subHeading}>
              {fields[3].field_name}           
              </Text>
              <TextInput 
              multiline = {true}
              underlineColorAndroid="transparent"
              textAlign = {Appearences.Rtl.enabled ? 'right' : 'left'}
              style = {this.state.showMessageError ? styles.textAreaError : styles.textArea}
              value = {this.state.message}
              onChangeText = {(text)=>{
                this.setState({message:text});
              }}>
              </TextInput>
            {  !this.state.showProgressCircle ?
              <TouchableOpacity 
              onPress = {()=>{
                this.postContact();
              }}
              style = {[styles.buttonRow,{backgroundColor:orderStore.color}]}>                   
                   <Text style = {styles.headingTextWhite}>
                     {form.btn_submit}
                   </Text>   
              </TouchableOpacity>
            :
              <View style = {styles.progressRow}>
                <Progress.Circle 
                    size={Appearences.Fonts.paragraphFontSize} 
                    indeterminate={true}
                    color = {orderStore.color}
                />
              </View>
         }
            </View>
          </ScrollView>
        </View>
        );
    }
  
    
  
  }
  

 

 
  
  
  
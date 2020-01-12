import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
class ChangePasswordScreen extends Component {
  static navigationOptions = {
    title: 'Change Password',

  };
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
  
      current: '',
      new_pass: '',
      new_confirm: '',
   
 
    }}



    
  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {

       
        const { current }  = this.state ;
        const { new_confirm }  = this.state ;
        const { new_pass }  = this.state ;
      if(new_pass==new_confirm){
       fetch('http://lightchat.panatechrwanda.tk/mobile/change.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           username: value,
           current: current,
           new_confirm: new_confirm,
           new_pass: new_pass
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {
                this.textInput.clear()
                this.textInputs.clear()
                alert("Password Changed");
               this.props.navigation.navigate('SettingsScreen');   
        
               }
               else{
                Alert.alert(responseJson); 
               }
        
             }).catch((error) => {
               console.error(error);
             });
        
        
         }else{
           alert("Password Not Macth");
         }
      
      }
    } catch (error) {
      // Error retrieving data
    }
  };
    
 
  
  render() {
    if (this.state.loading) {
        return (
   
              <View style={styles.ActivityIndicator_Style}>
   
              <ActivityIndicator size="large" />
   
              </View>
        );
      }
    return (
<Container style={styles.MainContainer}>
                <Content>
                <View style={styles.container}>
               

                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Current Password </Text> 
                  <TextInput placeholder="Current Password"  ref={input => { this.textInputs = input }} onChangeText={current => this.setState({current})} style={styles.TextInputStyle}  secureTextEntry={true}/>
              
                  <Text style={{fontSize:14,color:'#3C3C3C'}}>New Password </Text> 
                  <TextInput placeholder="New Password"  ref={input => { this.textInputs = input }} onChangeText={new_pass => this.setState({new_pass})} style={styles.TextInputStyle} secureTextEntry={true}/>
                  
                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Confirm Password</Text>
                  
                  <TextInput placeholder="Confirm ConfPassword"  ref={input => { this.textInput = input }} onChangeText={new_confirm => this.setState({new_confirm})} style={styles.TextInputStyle} secureTextEntry={true}/>
                  
                  <Text></Text>
                  <Button info block style={{alignSelf:'center',margin:10}}  onPress={this.check}><Text>Save Change</Text></Button>
 
                 

                  
                 
                  
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default ChangePasswordScreen

const styles = StyleSheet.create({
  MainContainer:{
    backgroundColor:'#fff'
  },
  container: {
    flex: 1,
 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:40,
    borderWidth: 1,
    margin:20,
    borderColor:'white'
  
  },
  text:{
color:'white'
  },

  TextInputStyle: {
    textAlign: 'center',
    marginBottom: 5,
    height: 40,
    width:300,
    margin:10,
    borderWidth: 0.5,
    borderRadius:10,
    borderColor:'#3C3C3C',
    backgroundColor:'#DBE7FF',
    color:'black',
    

    },
     
     TextComponentStyle: {
      fontSize: 20,
      color: "#000",
      textAlign: 'center', 
      marginBottom: 15
     }
});

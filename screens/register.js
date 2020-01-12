import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator,KeyboardAvoidingView} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'Creating Profile',

  };
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      user:  this.props.navigation.state.params.username,
      pass: '',
      names: '',
      passS: '',
   
 
    }}
    register = () =>{

        const { user }  = this.state ;
        const { names }  = this.state ;
        const { pass }  = this.state ;
        const { passS }  = this.state ;
      if(pass==passS){
        if(names!='' && pass !=''){
       fetch('http://lightchat.panatechrwanda.tk/mobile/Register.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           username: user,
           password: pass,
           names: names
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {
                this.textInput.clear()
                this.textInputs.clear()
                this.props.navigation.navigate('ProfileSettingsScreen', { username: user });
        
               }
               else{
        
                 Alert.alert(responseJson);
               }
        
             }).catch((error) => {
               console.error(error);
             });
        
            }
         
         }else{
           alert("Password Not Macth");
         }}
 
  
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
               

                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Names </Text> 
                  <KeyboardAvoidingView  behavior="padding" enabled >
                  <TextInput placeholder="@somen"  ref={input => { this.textInputs = input }} onChangeText={names => this.setState({names})} style={styles.TextInputStyle}/>
              </KeyboardAvoidingView>
                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Password </Text> 
                  <KeyboardAvoidingView  behavior="padding" enabled >
                  <TextInput placeholder="password"  ref={input => { this.textInputs = input }} onChangeText={passS => this.setState({passS})} style={styles.TextInputStyle} secureTextEntry={true}/>
                  </KeyboardAvoidingView>
                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Re-Type Password</Text>
                  <KeyboardAvoidingView  behavior="padding" enabled >
                  <TextInput placeholder="Password"  ref={input => { this.textInput = input }} onChangeText={pass => this.setState({pass})} style={styles.TextInputStyle} secureTextEntry={true}/>
                  </KeyboardAvoidingView>
                  <Text></Text>
                  <Button info block style={{aligSelf:'center',margin:10}}  onPress={this.register}><Text>Save and Continue</Text></Button>
 
                 

                  
                 
                  
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default RegisterScreen

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
    height: 40,
    width:280,
    margin:5,
    borderWidth: 1,
    borderRadius:0,
    borderColor:'#D7D7D7',
    borderTopColor:'#fff',
    backgroundColor:'#fff',
    color:'black',
    

    },
     
     TextComponentStyle: {
      fontSize: 20,
      color: "#000",
      textAlign: 'center', 
      marginBottom: 15
     }
});

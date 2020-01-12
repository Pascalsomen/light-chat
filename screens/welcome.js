import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator,Image } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
class WelcomeScreen extends Component {
  static navigationOptions = {
    title: 'Creating Account',
    header:null

  };
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      user: '',
      pass: ''
   
 
    }}
    Login = () =>{
        
        const { user }  = this.state ;
        const { pass }  = this.state ;
       fetch('http://lightchat.panatechrwanda.tk/mobile/Login.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           username: user,
           password: pass
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {
                this.textInput.clear()
                this.textInputs.clear()
                   this.props.navigation.navigate('HomeScreen', { username: user });
        
               }
               else{
        
                 Alert.alert(responseJson);
               }
        
             }).catch((error) => {
               console.error(error);
             });
        
        
         }
 
  
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
               
                <Image source={{uri: 'http://lightchat.panatechrwanda.tk/mobile/bg.png'}} style={{height: 250, width: 210, flex: 1,marginTop:25}}/>

                
                                   <Text></Text>
                <Button info block style={{alingSelf:'center',margin:10}}  onPress={()=>this.props.navigation.navigate('PhoneScreen')}><Text>Continue with Phone</Text></Button>
 
                <Button danger block style={{alingSelf:'center',margin:10}}  onPress={()=>this.props.navigation.navigate('EmailScreen')}><Text>Continue with email</Text></Button>
                                     <Text></Text>
                  <Text note>Already Have Account? <Text style={{color:'#000',aligSelf:'center',fontSize:13}}onPress={()=>this.props.navigation.navigate('loginScreen')}>Login Here</Text> </Text>
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default WelcomeScreen

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

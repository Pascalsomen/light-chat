import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
class VerifyScreen extends Component {
  static navigationOptions = {
    title: 'Verify Account',
    


  };
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
 
      user:  this.props.navigation.state.params.username,
      code :''
   
 
    }}
    verify = () =>{
        
        const { user }  = this.state ;
        const { code }  = this.state ;
       fetch('http://lightchat.panatechrwanda.tk/mobile/verify.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           username: user,
        
           code: code
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {
                
                this.textInputs.clear()
                   this.props.navigation.navigate('RegisterScreen', {username: user });
        
               }
               else{
        
                 Alert.alert(responseJson);
               }
        
             }).catch((error) => {
               console.error(error);
             });
        
        
         }
 
  
  render() {
 const  user = this.props.navigation.state.params.username;
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
                
                     <Text note style={{textAlign:'center'}}>We Sent verification code to {user} Copy code and Re type them Below</Text>
                     <Text></Text>
                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Verification Code </Text> 
                  <TextInput placeholder="Type code here..."  ref={input => { this.textInputs = input }} onChangeText={code => this.setState({code})} style={styles.TextInputStyle}/>
              
                  <Text></Text>
                  <Button info block style={{aligSelf:'center',margin:10}}  onPress={this.verify}><Text>Next</Text></Button>
 
                  

                  
                 
                  
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default VerifyScreen

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

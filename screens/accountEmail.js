import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator,KeyboardAvoidingView } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
class EmailScreen extends Component {
  static navigationOptions = {
    title: 'Creating Account',
    


  };
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      user: '',
   
   
 
    }}
    register = () =>{
        
        const { user }  = this.state ;
        
       fetch('http://lightchat.panatechrwanda.tk/mobile/account_email.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           username: user,
        
          
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {
               
                _storeData = async () => {
                  try {
                    await AsyncStorage.setItem('process', 'VerifyScreen');
                  } catch (error) {
                    // Error saving data
                  }
                };
                this.textInputs.clear()
                _storeData();
                this.props.navigation.navigate('VerifyScreen', { username: user });
        
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
               
                <Text style={{fontSize:14,color:'#3C3C3C'}}> </Text> 
                  <Text style={{fontSize:14,color:'#3C3C3C'}}>E-Mail </Text> 
                  <KeyboardAvoidingView  behavior="padding" enabled >
                  <TextInput placeholder="Type your Email"  ref={input => { this.textInputs = input }} onChangeText={user => this.setState({user})} style={styles.TextInputStyle}/>
              </KeyboardAvoidingView>
                  <Text style={{fontSize:14,color:'#3C3C3C'}}> </Text> 
                  
                  <Button info block style={{aligSelf:'center'}}  onPress={this.register}><Text>Get Started</Text></Button>
                  <Text style={{fontSize:14,color:'#3C3C3C'}}> </Text> 
                  <Text style={{color:'#3C3C3C',margin:10,fontSize:14,textAlign:'center'}}>By Creating Account you agree and accept terms and condition of light chat </Text>

                  
                 
                  
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default EmailScreen

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

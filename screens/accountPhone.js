import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
class PhoneScreen extends Component {
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
       
         
        fetch('http://lightchat.panatechrwanda.tk/mobile/account_phone.php', {
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
               

                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Phone Number </Text> 
                  <KeyboardAvoidingView  behavior="padding" enabled >
                  <TextInput placeholder="250...."  ref={input => { this.textInputs = input }} onChangeText={user => this.setState({user})} style={styles.TextInputStyle}/>
             </KeyboardAvoidingView>
              <Text></Text>
                  
                  <Button info block style={{aligSelf:'center',margin:2}}  onPress={this.register}><Text>Next</Text></Button>
 
                  
<Text></Text>
                     <Text style={{color:'#3C3C3C',margin:10,fontSize:14}}>By Creating Account you agree and accept terms and condition of light chat </Text>
                 
                  
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default PhoneScreen

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
    width:270,
    margin:10,
    borderWidth: 0.5,
    borderRadius:5,
    borderColor:'#3C3C3C',
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

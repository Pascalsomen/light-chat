import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button,Textarea } from 'native-base';
import {AsyncStorage} from 'react-native';
class ContactScreen extends Component {
  static navigationOptions = {
    title: 'Contact Us',

  };
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      user:this.props.navigation.state.params.user,
      code:''
 
    }}
    verify = () =>{
        
        const { user }  = this.state ;
        const { code }  = this.state ;
        //const { userId }  = this.state ;
       fetch('http://lightchat.panatechrwanda.tk/mobile/contactus.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           account_a: user,
           code: code
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {
                
             //this.textInputs.clear()
             
                   alert("Feedback sent, Thank you!")
                   this.props.navigation.push('ContactScreen',{user:this.state.user});
        
               }
               else{
        
                 Alert.alert(responseJson);
               }
        
             }).catch((error) => {
               console.error(error);
             });
        
        
         }
 
  
  render() {
// const  user = ;
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
                
                     
                  <Text style={{fontSize:14,color:'#000'}}>Please provide your feedback </Text> 
                  <Textarea placeholder="In Details"  ref={input => { this.textInputs = input }} onChangeText={code => this.setState({code})} style={styles.TextInputStyle}/>
              
                  <Text></Text>
                  <Button info block style={{aligSelf:'center',margin:10}}  onPress={this.verify}><Text>Submit</Text></Button>
 
                  

                  
                 
                  
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default ContactScreen

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

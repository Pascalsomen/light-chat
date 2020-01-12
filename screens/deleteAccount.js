import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator, TextBase} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
class DeleteAccount extends Component {
  static navigationOptions = {
    title: 'Delete Account',

  };
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
  
      current: '',
     
     
   
 
    }}



    
  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {

       
        const { current }  = this.state ;
     
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
    
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {
                this.textInput.clear()
                this.textInputs.clear()
                alert("Delete Account");

                
               //this.props.navigation.navigate('SettingsScreen');   
        
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
               

                <Text style={{textAlign:"center"}}>If you delete your account, All data will be delete Permanently , You will not be able to recovery your account</Text>
                  <Text></Text>
                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Confirm  by Password</Text>
                  
                  <TextInput placeholder="Confirm ConfPassword"  ref={input => { this.textInput = input }} onChangeText={current => this.setState({current})} style={styles.TextInputStyle} secureTextEntry={true}/>
                  
                  <Text></Text>
                  <Button info block style={{alignSelf:'center',margin:10}}  onPress={this.check}><Text>Delete Now</Text></Button>
 
                 

                  
                 
                  
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default DeleteAccount

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
    borderWidth: 0,
    borderRadius:0,
    borderColor:'#D7D7D7',
    borderTopColor:'#fff',
    backgroundColor:'#e1e1e1',
    color:'black',
    
    

    },
     
     TextComponentStyle: {
      fontSize: 20,
      color: "#000",
      textAlign: 'center', 
      marginBottom: 15
     }
});

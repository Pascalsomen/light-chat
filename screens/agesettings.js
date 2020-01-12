import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator,KeyboardAvoidingView} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
class AgeSettingScreen extends Component {
  static navigationOptions = {
    title: 'Age Discovery',
    


  };
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      min: '',
      max: '',
    
   
 
    }}



    
  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {

        const { max }  = this.state ;
        const { min }  = this.state ;
   if(min>=18){
       fetch('http://lightchat.panatechrwanda.tk/mobile/agesettings.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           username: value,
           max_age: max,
           min_age: min
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {
              
                alert("Age discovery Updated");
               this.props.navigation.push('SettingsScreen');   
        
               }
               else{
                Alert.alert(responseJson); 
               }
        
             }).catch((error) => {
               console.error(error);
             });
        
            }else{
              alert('18 is minimum age');
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

                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Type minimum Age </Text> 
                  <KeyboardAvoidingView  behavior="padding" enabled >
                  <TextInput placeholder="Minimum age"  ref={input => { this.textInputs = input }} onChangeText={min => this.setState({min})} style={styles.TextInputStyle}  />
                 </KeyboardAvoidingView>
                  
                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Type Maximum Age </Text> 
                  <KeyboardAvoidingView  behavior="padding" enabled >
                  <TextInput placeholder="Maximum age"  ref={input => { this.textInputs = input }} onChangeText={max => this.setState({max})} style={styles.TextInputStyle} />
                  </KeyboardAvoidingView>
                  <Text></Text>
                  <Button info block style={{alignSelf:'center',margin:10}}  onPress={this.check}><Text>Save Change</Text></Button>
 
                 

                  
                 
                  
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default AgeSettingScreen

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

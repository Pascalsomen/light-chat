import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator} from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
class EditScreen extends Component {
  static navigationOptions = {
    title: 'Change Name',

  };
  
  constructor(props) {
 
    super(props)
 
    this.state = {
      current: '',
    }}



    
  check = async () => {
    try {
        const value = await AsyncStorage.getItem('userId');
        const {current} = this.state;

      //  alert(value);
        if (value !== null) {
      
         fetch('http://lightchat.panatechrwanda.tk/mobile/updateProfilelInfo.php', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
          
             username: value,
             current:  current,
             code: this.props.navigation.state.params.code
             
          
           })
          
         }).then((response) => response.json())
               .then((responseJson) => {
          
                if(responseJson === 1)
                 {
                  this.textInputs.clear()
                 
                alert("Changed");
                 this.props.navigation.push('changeProfileImage');   
                 }
                 else{
                  Alert.alert(responseJson); 
                 }
          
               }).catch((error) => {
                 console.error(error);
               });
          
          
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

                  <Text style={{fontSize:14,color:'#3C3C3C'}}>Change {this.props.navigation.state.params.code}</Text> 

                  <TextInput placeholder="Type here.."  ref={input => { this.textInputs = input }} onChangeText={current => this.setState({current})} style={styles.TextInputStyle}/>
              
                
                  <Button info block style={{alignSelf:'center',margin:10}}  onPress={this.check}><Text>Save Change</Text></Button>
 
                 

                  
                 
                  
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default EditScreen

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
  
    width:280,
    margin:5,
    padding:10,
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

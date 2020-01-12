import React from 'react';
import {Component} from 'react'
import { StyleSheet,  View,TextInput, Alert,ActivityIndicator} from 'react-native';
import { Container, Content, List, ListItem, Item,InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
class GenderSettingScreen extends Component {
  static navigationOptions = {
    title: 'Age Discovery',


  };
  
  constructor(props) {
 
    super(props)
 
    this.state = {
 
  
      selected2:''
    
   
 
    }}

    onValueChange2(value) {
        this.setState({
          selected2: value
        });
      }
      
  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {

       
 
    
        const { selected2 }  = this.state ;
     
       fetch('http://lightchat.panatechrwanda.tk/mobile/gendersettings.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           username: value,
         
           selected2: selected2
        
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
               

                <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Gender"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}>

                <Picker.Item label="Everyone" value="0" />
                <Picker.Item label="Female" value="2" />
                <Picker.Item label="Male" value="1" />
                
              </Picker> 
            </Item>
                  
                  <Text></Text>
                  <Button info block style={{alignSelf:'center',margin:10}}  onPress={this.check}><Text>Save Change</Text></Button>
 
                 

                  
                 
                  
                  
                </View>
                </Content>
            </Container>
    );
  }
}
export default GenderSettingScreen

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

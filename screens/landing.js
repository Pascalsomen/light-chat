import React from 'react';
import {Component} from 'react'
import { StyleSheet, Image, View,ListView, FlatList, Alert, ActivityIndicator} from 'react-native';
import { Container,FooterTab,Left,Thumbnail,Body,Right,Footer,Header,Title,Item ,Content,Card,CardItem, List,ScrollableTab ,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
class LandingScreen extends Component {
static navigationOptions = {
title: 'Home',
   header:null
    

  };
  constructor(props)
  {
 
    super(props);
 
    this.state = { 
 
        loading: true
    
    }
 
  }
 
  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      
      if (value !== null) {
      

        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'HomeScreen' })],
        });
        this.props.navigation.dispatch(resetAction);

        
      //  this.props.navigation.navigate('', { username: value });
        
        }else{
         
          //this.props.navigation.navigate('');

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'WelcomeScreen' })],
          });
          this.props.navigation.dispatch(resetAction);



      }
    } catch (error) {
      // Error retrieving data
    }
  };
    
  componentDidMount() {
  
    this.check();
      
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
<Container>
<Content>
</Content>

          
            </Container>
    );
  }
}
export default LandingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderTitle:{
    color:'#6B97DA',
  
    
  },
  HeaderIcon:{
    color:'#6B97DA',
  },

  BodyIcon:{
    color:'red',
    fontSize:40,
  }
});

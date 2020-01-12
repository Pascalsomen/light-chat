
import React from 'react';
import {Component} from 'react'
import { StyleSheet, Image, View,ListView, FlatList, Alert, ActivityIndicator} from 'react-native';
import { Container,FooterTab,Left,Thumbnail,Body,Right,Footer,Header,Title,Item ,Content,Card,CardItem, List,ScrollableTab ,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';

class MatchScreen extends Component {
  static navigationOptions = {
  title: 'My Perfect Match',
  header:null
  

  };
  constructor(props)
  {
 
    super(props);
 
    this.state = { 
 
      user:'', 
      loading: true,
      message:''
        
    
    }
 
  }
 
  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
       this.setState({ user: value })   
       return  fetch('http://lightchat.panatechrwanda.tk/mobile/marched_list.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         user : value,
         
        })
      })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              loading: false,
              data: responseJson
            }, function() {
              // In this block you can do something with new state.
              if(responseJson==""){
                this.setState({ message: "You have no matching" });
              };
            });
          })
          .catch((error) => {
            console.error(error);
          }) 
        
      }else{
         
          this.props.navigation.navigate('WelcomeScreen');
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
    const {message} =this.state;
    return (
<Container>

<Content>   
   
<FlatList
        
        data={ this.state.data }
        renderItem={({item}) => 

<List>
 <ListItem avatar onPress={()=>this.props.navigation.navigate('ChatScreen',{user_id:item.user_id,image:item.profile_pic_1,names:item.names})}>
    <Left>
              <Thumbnail source={{ uri: item.profile_pic_1 }} />
              </Left>
              <Body>
                <Text>{item.names}</Text>
                <Text note>Tap to start chatting</Text>
              </Body>
              <Right>
                <Text note style={{fontSize:10}}>{item.created_at}</Text>
              </Right>
            </ListItem>
          </List>
          
        }

keyExtractor={(item, index) => index}
numColumns={1}

/>
<Text note style={{textAlign:'center',marginTop:20}}>{message}</Text>    
</Content>

          
            </Container>
    );
  }
}
export default MatchScreen

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

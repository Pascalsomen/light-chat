
import React from 'react';
import {Component} from 'react'
import { StyleSheet, Image, View,ListView, FlatList, Alert, ActivityIndicator} from 'react-native';
import { Container,FooterTab,Left,Thumbnail,Body,Right,Footer,Header,Title,Item ,Content,Card,CardItem, List,ScrollableTab ,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button, Badge} from 'native-base';
import {AsyncStorage} from 'react-native';

class MatchScreens extends Component {
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
              data: responseJson,
               message: ''
            }, function() {
              // In this block you can do something with new state.
              if(responseJson==""){
                this.setState({ message: "You have no message" });
              };
            });
          }).catch((error) => {
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
    this.timer = setInterval(()=> this.check(), 5000)
      
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
        inverted
        data={ this.state.data }   
        renderItem={({item}) => 
        
       <View>
{(item.liked_by != item.my_id)?
<List>
 <ListItem avatar onPress={()=>this.props.navigation.navigate('ChatScreen',{user_id:item.user_id,image:item.profile_pic_1,names:item.names, chatcode:item.chat_code})}>
    <Left>
              <Thumbnail source={{ uri: item.profile_pic_1 }} />
              </Left>
              <Body>
                <Text>{item.names}</Text>

                {(item.image_message=='') ?
                <Text note numberOfLines={2}>{item.message}</Text>
                :null
                }

                {(item.image_message !='') ?
                <Text note><Icon name="ios-image" style={{fontSize:14,color:'#272727'}}/> Photo</Text>
                :null
                } 
              </Body>
              <Right>
                <Text note style={{fontSize:10}}>{item.senttime}</Text>
                 {(item.chat_status==0 && item.sender != this.state.user)?
               <Text style={{color:'#004FA4',fontSize:12,marginTop:12}}>New</Text>
                :null
                } 
              </Right>

            </ListItem>
          </List>
:null
}
       </View>
     
       

         
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
export default MatchScreens

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

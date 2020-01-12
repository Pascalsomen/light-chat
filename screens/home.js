import React from 'react';
import {Component} from 'react'
import { StyleSheet, Image, View,ListView, FlatList, Alert, ActivityIndicator} from 'react-native';
import { Container,FooterTab,Left,Thumbnail,Body,Right,TabHeading,Footer,Header,Title,Item ,Content,Card,CardItem, List,ScrollableTab ,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button, Badge } from 'native-base';
import {AsyncStorage} from 'react-native';
import DiscoveryScreen from './discovery'
import NetInfo from '@react-native-community/netinfo';


import LikedScreen from './message'
import MatchScreens from './Matchlists'
class HomeScreen extends Component {
  static navigationOptions = {
    //title: 'Home',
   header:null
    
  };
  constructor(props)
  {
 
  super(props);
 
  this.state = { 
     user:'',
     likeNotification:'',
     messageNotification:''
    
    
    
    }
 
  }

  




  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
       this.setState({ user: value })   

      }else{     
       
      }
    } catch (error) {
   
    }
  };


  componentDidMount() {

  this.message()
  this.check();

  this.timer = setInterval(()=> this.likes(), 5000)
  this.timer = setInterval(()=> this.message(), 5000)
    
}


likes(){
 
    const {user}= this.state;
    fetch('http://lightchat.panatechrwanda.tk/mobile/liked_badge.php', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      user: user,
      })
      
      }).then((response) => response.json())
        .then((responseJson) => {
      
         
          this.setState({likeNotification: responseJson })   
      
        }).catch((error) => {
          console.error(error);
        });
    
    
    
}


message(){
 
  const {user}= this.state;
  fetch('http://lightchat.panatechrwanda.tk/mobile/message_badge.php', {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    
    user: user,
  
    
    })
    
    }).then((response) => response.json())
      .then((responseJson) => {
    
       
        this.setState({messageNotification: responseJson })   
    
      }).catch((error) => {
        console.error(error);
      });
  
  
  
}
  render() {
    

  //   const unsubscribe = NetInfo.addEventListener(state => {
  //   //  console.log('Connection type', state.type);
  //   //  console.log('Is connected?', );
  //  //   alert(state.isConnected)

  //     if(state.isConnected =='false'){
  //       alert("Internet connection failed")
  //     }
  //   });
    
  //   // To unsubscribe to these update, just use:
  //   unsubscribe();
    

 return (
<Container>

<Header hasTabs style={{height:80,paddingTop:20,backgroundColor:'#fff'}}>
                             
  <Right>  
  <Left>
    <Button style={{marginLeft:30}} transparent>
      <Title style={styles.HeaderTitle} >LightChat </Title>
    </Button>
  </Left>
  <Button transparent onPress={()=>this.props.navigation.navigate('SettingsScreen')}>
  <Icon style={styles.HeaderIcon} name='more' />
  </Button>
  </Right>
</Header>
        <Tabs style={{borderTopWidth:0}}>
          <Tab  heading={<TabHeading style={{backgroundColor:'white',color:'black',borderTopWidth:0}}><Text style={{color:'black'}}>Discover </Text></TabHeading>}>
            <DiscoveryScreen navigation={this.props.navigation} />
          </Tab>
          <Tab  heading={<TabHeading style={{backgroundColor:'white',color:'black',borderRadius:0}}><Text style={{color:'black'}}>Chats  {(this.state.messageNotification > 0)? <Text style={{color:'#004FA4',fontSize:12,marginTop:12}}>{this.state.messageNotification}</Text> :null } </Text></TabHeading>}>
            <MatchScreens navigation={this.props.navigation}/>
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor:'white',color:'black',borderRadius:0}}><Text style={{color:'black'}}>Likes  {(this.state.likeNotification > 0)? <Text style={{color:'#004FA4',fontSize:12,marginTop:12}}>{this.state.likeNotification}</Text> :null } </Text></TabHeading>}>
            <LikedScreen navigation={this.props.navigation}/>
          </Tab>
        </Tabs>     
 </Container>
            
    );
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderTitle:{
    color:'#000',
    fontSize:20,
    marginLeft:-20

  
  },
  HeaderIcon:{
    color:'#000',
  },

  BodyIconDislike:{
    color:'#000',
    fontSize:30,
    alignItems:'flex-end'
  
  },
  BodyIconLike:{
    color:'#a80202',
    fontSize:30,
    alignItems:'flex-end',
    
  }
});

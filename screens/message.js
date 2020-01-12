import React from 'react';
import {Component} from 'react'
import { StyleSheet, Image, View,ListView, FlatList, Alert, ActivityIndicator} from 'react-native';
import { Container,FooterTab,Left,Thumbnail,Body,Right,Footer,Header,Title,Item ,Content,Card,CardItem, List,ScrollableTab ,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
import {PullView} from 'react-native-pull';
class LikedScreen extends Component {
  static navigationOptions = {
    //title: 'Home',
   header:null
    

  };
  constructor(props)
  {
 
    super(props);
 
    this.state = { 
    //  user:  this.props.navigation.state.params.username,
        loading: true,
        user:'',
        userId:''
    
    }
 
  }

  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
       this.setState({ user: value })   
       return  fetch('http://lightchat.panatechrwanda.tk/mobile/liked.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({
         user : value,
         
        })
      }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              loading: false,
              data: responseJson
            }, function() {
              
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


  checkMatch = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
       this.setState({ user: value })   
       return  fetch('http://lightchat.panatechrwanda.tk/mobile/new_marched.php',{
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
              dataMatch: responseJson
            }, function() {
              // In this block you can do something with new state.
              if(responseJson==""){
                this.setState({ message: "" });
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
    this.checkMatch()
      
   this.timer = setInterval(()=> this.check(), 5000)
   this.timer = setInterval(()=> this.checkMatch(), 5000)
      


    
}


onPullRelease(resolve) {
  
  setTimeout(() => {
          resolve();
          
      }, 3000);
}
    
  like (id) {
   
 
  const { user }  = this.state ;
  
   
    fetch('http://lightchat.panatechrwanda.tk/mobile/like.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
          account_a: user,
          account_b: id
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {

                
                
                  alert("Like Sent");

                   this.props.navigation.navigate('HomeScreen');
        
               }else if(responseJson === 2){
               
                  this.props.navigation.navigate('MachingPopPup', { username: id });
                  
                 }
               else{
        
                 alert(responseJson);
               }
        
             }).catch((error) => {
               console.error(error);
             });



 
  }


  dislike (id) {
   
 
    const { user }  = this.state ;
    
      //this.props.navigation.navigate('RegisterScreen',{pro_id:id});

      fetch('http://lightchat.panatechrwanda.tk/mobile/dislike.php ', {
           method: 'POST',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
          
            account_a: user,
            account_b: id
          
           })
          
         }).then((response) => response.json())
               .then((responseJson) => {
          
                if(responseJson === 1)
                 {
  
                  
                  
                    alert("Dislike Sent");
  
                     this.props.navigation.navigate('HomeScreen');
          
                 }
                 else{
          
                   alert(responseJson);
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
  
  // const user = this.props.navigation.state.params.username;
   var year = new Date().getFullYear()
  
 
    return (
<Container>
<Content>
<PullView onPullRelease={this.onPullRelease}>

<FlatList
        inverted
        data={ this.state.dataMatch}
        renderItem={({item}) => 
        
       <View>

<List>
 <ListItem avatar onPress={()=>this.props.navigation.navigate('ChatScreen',{user_id:item.user_id,image:item.profile_pic_1,names:item.names, chatcode:item.chat_code})}>
    <Left>
              <Thumbnail source={{ uri: item.profile_pic_1 }} />
              </Left>
              <Body>
                <Text>{item.names}</Text>

                
                <Text note>Tap to start chat <Text style={{color:'#004FA4',fontSize:12,marginTop:12}}>(New Match)</Text></Text>
                

                
               
              </Body>
             
            </ListItem>
          </List>

       </View>
     
       

         
        }

keyExtractor={(item, index) => index}
numColumns={1}

/>


<FlatList
        
        data={ this.state.data }
        renderItem={({item}) => 






      <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: item.profile_pic_1}}  />
              </Left>
              <Body>
                <Text style={{fontSize:15}}>{item.names} likes you</Text>
                <Text note numberOfLines={1}>Age:{year - item.bod}  Bio: {item.bio} </Text>
              </Body>
              <Right>
                <Button onPress={()=>this.props.navigation.navigate('ViewProfileScreen',{user_id:item.user_id})} transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>





           
          
        }

keyExtractor={(item, index) => index}
numColumns={1}

/>
</PullView>
           
           </Content>
          
            </Container>
            
    );
  }
}
export default LikedScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderTitle:{
    color:'#6B97DA',
    fontSize:17,
    marginLeft:-20

  
  },
  HeaderIcon:{
    color:'#6B97DA',
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

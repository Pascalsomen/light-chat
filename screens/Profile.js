import React from 'react';
import {Component} from 'react'
import { StyleSheet, Image, View,ListView, FlatList, Alert, ActivityIndicator} from 'react-native';
import { Container,Toast,FooterTab,Left,Thumbnail,Body,Right,Footer,Header,Title,Item ,Content,Card,CardItem, List,ScrollableTab ,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
import GallerySwiper from "react-native-gallery-swiper";
class ProfileScreen extends Component {
  static navigationOptions = {
    title: 'Profile',
  
    

  };
  constructor(props)
  {
 
    super(props);
 
    this.state = { 
    //  user:  this.props.navigation.state.params.username,
        loading: true,
        user:'',
        userId: this.props.navigation.state.params.user_id
      
    
    }
 
  }

  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      const {userId}= this.state
      if (value !== null) {
       this.setState({ user: value })   
       return  fetch('http://lightchat.panatechrwanda.tk/mobile/singleuser.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({
         user : userId,
         
        })
      }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              loading: false,
              data: responseJson,
              user:value
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
  componentDidMount() {
    this.check();
      

    this.timer = setInterval(()=> this.sendMyStatus(), 10000)
  // 

    
}


  
sendMyStatus(){
  const {user}= this.state;
  fetch('http://lightchat.panatechrwanda.tk/mobile/online_status_updates.php', {
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
    
       if(responseJson === 1)
        {
    
            //this.props.navigation.navigate('HomeScreen', { username: user });
         //alert(responseJson);
   
        }
        
    
      }).catch((error) => {
        console.error(error);
      });
  
  
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

                
                
              
                 // alert('like sent');
                  this.check();
        
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
  
                  
                  
                  //  alert("Dislike Sent");
                    this.check();
                    // this.props.navigation.navigate('HomeScreen');
          
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

      <FlatList
        data={ this.state.data}
        renderItem={({item}) => 

      
<View>
<Card>
<CardItem cardBody>

<Image  source={{ uri: item.profile_pic_1 }} style={{ width: null,flex:1, height:350 }} /> 
</CardItem>

</Card>

     
          <Text  style={{color:'#6B97DA',marginLeft:20,fontSize:20}}>{item.names} <Text note> - {year - item.bod}  </Text></Text>

           <Text  note style={{fontSize:14,textAlign:"center"}} >
           {item.bio}</Text>
              





            
</View>             
           
         

        
      
          
        }

keyExtractor={(item, index) => index}
numColumns={1}

/>
            
        
                <Content>


        
                    <View style={styles.MainContainer}>
       
        
        
               </View>
                  

</Content>

          
            </Container>
            
    );
  }
}
export default ProfileScreen

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
    color:'#6B97DA',
    fontSize:30,
    alignItems:'flex-end',
    
  }
});

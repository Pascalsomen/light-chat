import React from 'react';
import {Component} from 'react'
import { StyleSheet, Image, View,ListView, FlatList, Alert, ActivityIndicator} from 'react-native';
import { Container,Toast,FooterTab,Left,Thumbnail,Body,Right,Footer,Header,Title,Item ,Content,Card,CardItem, List,ScrollableTab ,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button,Grid,Col } from 'native-base';
import {AsyncStorage} from 'react-native';
import GallerySwiper from "react-native-gallery-swiper";
class ViewMessageProfileScreen extends Component {
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

<Grid>
<Col>
<Image  source={{ uri: item.profile_pic_1 }} style={{ width:100,flex:1, height:100,margin:20,resizeMode: 'contain', borderRadius:20}} /> 
</Col>
<Col>
  <Text></Text>
  <Text  style={{color:'#6B97DA', textAlign:"center",fontSize:15}}>{item.names} <Text note> - {year - item.bod}  </Text></Text> 
   <Text  style={{color:'#000',textAlign:"center",fontSize:13}}>{item.education} /  {item.job}  </Text> 
   <Text  style={{color:'#000',textAlign:"center",fontSize:13}}>{item.city} / {item.religion}  </Text> 
</Col>
</Grid> 
<Text  note style={{fontSize:14,textAlign:"center",margin:5}} >
 {item.bio}</Text>
 {(item.profile_pic_2!="")?

<Grid>

<Col>
<Image  source={{ uri: item.profile_pic_2 }} style={{ width: null,flex:1, height:150, resizeMode: 'contain', marginLeft:10,marginRight:10, borderRadius:10}} /> 
</Col>

<Col>
<Image  source={{ uri: item.profile_pic_3 }} style={{ width: null,flex:1, height:150, resizeMode: 'contain',marginLeft:10,marginRight:10,  borderRadius:10}} /> 
</Col>

</Grid>
:null
 }

</View>             
  }

keyExtractor={(item, index) => index}
numColumns={1}

/>


 <Content>


</Content>

          
            </Container>
            
    );
  }
}
export default ViewMessageProfileScreen

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

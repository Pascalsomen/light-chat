import React from 'react';
import {Component} from 'react'
import { StyleSheet, Image, View,ListView, FlatList, Alert, ActivityIndicator,RefreshControl,DeckSwiper,ScrollView, TextBase} from 'react-native';
import { Container,Toast,FooterTab,Left,Thumbnail,Body,Right,Footer,Col,Header,Title,Item ,Content,Card,CardItem, List,ScrollableTab ,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
import GallerySwiper from "react-native-gallery-swiper";
import { Constants, Notifications, Permissions } from 'expo';
async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    return;
  }}

class DiscoveryScreen extends Component {
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
        userId:'',
        showToast: false,
        currentLongitude: 'unknown', //Initial Longitude
        currentLatitude: 'unknown', //Initial Latitude
        refreshing: true,
        list:1,
    
    }
 
  }

  onRefresh() {
     //Clear old data of the list
    // this.setState({ data: [] });
    //Call the Service to get the latest data
    this.check();
  }
  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      if (value !== null) {
       this.setState({ user: value })   
       return  fetch('http://lightchat.panatechrwanda.tk/mobile/users_suggestions.php',{
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
              refreshing: false,
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


  _handleButtonPress = (a) => {
    const localnotification = {
      title: 'Lightchat',
      body: a,
      data: {
        thisIsYourData: '',
      },
      android: {
        sound: true,
      },
      ios: {
        sound: true,
      },
    };
    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds +=1000;

    const schedulingOptions = { time: sendAfterFiveSeconds };
    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
  };
  listenForNotifications = () => {
    Notifications.addListener(
      this._handleNotification
    )
  };
  
  _handleNotification = ({ origin, data, remote }) => {
    let type = remote ? 'Push' : 'Local'
    let info = `${type} notification ${origin} with data: ${JSON.stringify(data)}`
    Alert.alert('Notification!', info)
  }

  async componentDidMount() {
    await getiOSNotificationPermission();
    this.listenForNotifications();
  }



  componentDidMount() {
    this.check();
    this.timer = setInterval(()=> this.check(), 50000)
   // this._handleButtonPress('hello');
    this.timer = setInterval(()=> this.sendMyStatus(), 10000)
  //  this.sendMyLocation()
        navigator.geolocation.getCurrentPosition(
      //Will give you the current location
        position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        this.setState({ currentLongitude: currentLongitude });
        //Setting state Longitude to re re-render the Longitude Text
        this.setState({ currentLatitude: currentLatitude });
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      //Will give you the location on location change
      console.log(position);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json
      this.setState({ currentLongitude: currentLongitude });
      //Setting state Longitude to re re-render the Longitude Text
      this.setState({ currentLatitude: currentLatitude });
      //Setting state Latitude to re re-render the Longitude Text
    });

  this.timer = setInterval(()=> this.sendMyLocation(), 30000)
  this.timer = setInterval(()=> this.checkNotification(), 10000)
  this.timer = setInterval(()=> this.MessageNotification(), 10000)

  
}

 componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  };
  
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
    



  checkNotification(){
    const {user}= this.state;
   
    return  fetch('http://lightchat.panatechrwanda.tk/mobile/liked_notification.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({
         user : user,
         
        })
      }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              loading: false,
              data_notification: responseJson
            }, function() {
              
            });
          })
          .catch((error) => {
            console.error(error);
          }) 
    
    
    }


    
  MessageNotification(){
    const {user}= this.state;
   
    return  fetch('http://lightchat.panatechrwanda.tk/mobile/message_notification.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
         body: JSON.stringify({
         user : user,
         
        })
      }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              loading: false,
              Message_notification: responseJson
            }, function() {
              
            });
          })
          .catch((error) => {
            console.error(error);
          }) 
    
    
    }



  sendMyLocation(){
    const {user}= this.state;
    const {currentLongitude}= this.state;
    const {currentLatitude}= this.state;
    fetch('http://lightchat.panatechrwanda.tk/mobile/update_location.php', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      
      user: user,
      lat:currentLatitude,
      long:currentLongitude
    
      
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
   
 


    const filteredData = this.state.data.filter(item => item.user_id !== id);
    this.setState({ data: filteredData });

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

                
                
              
              //alert('like sent');
              // this.check();
        
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
   
    const filteredData = this.state.data.filter(item => item.user_id !== id);
    this.setState({ data: filteredData });
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
                  //  this.check();
                    // this.props.navigation.navigate('HomeScreen');
          
                 }
                 else{
          
                   alert(responseJson);
                 }
          
               }).catch((error) => {
                 console.error(error);
               });
  
  
  
   
    }

    //  PullToRefreshProject = React.createClass({
    //   _refresh: function() {
    //     return new Promise((resolve) => {
    //       setTimeout(()=>{resolve()}, 2000)
    //     });
    //   },
    //   render: function() {
    //     return (
    //       <PTRView onRefresh={this._refresh} >
    //         <View style={styles.container}>
    //           <Text style={styles.welcome}>
    //             Let's Pull!
    //           </Text>
    //         </View>
    //       </PTRView>
    //     );
    //   },
    // });


    EmptyListMessage = () =>{

      this.setState({list:0})
    }



  render() {
    if (this.state.loading) {
      return (
 
            <View style={styles.ActivityIndicator_Style}>
 
            <ActivityIndicator size="large" />
 
            </View>
      );
    }

    if (this.state.data=="") {
      return (
 
        <View  scrollEnabled={false}  style={{height:3000,width:null,flex:1}}>

        <ScrollView >

        <Text onPress={this.check} style={{textAlign:"center",marginTop:80}} ><Icon name="ios-refresh-circle"/></Text>
        <Text></Text>
        <Text note style={{textAlign:"center",fontSize:18}}>You have no Suggestion</Text>
        <Text></Text>
        <Text note style={{textAlign:"center"}}> To get more discovery please go to setting and increase discovery distance (Kilometers) and ages </Text>
        <Text  onPress={() => this.props.navigation.navigate("SettingsScreen")} style={{textAlign:"center",color:"#6B97DA",padding:10}}>Go to settings</Text>
       
       
        </ScrollView></View>

        
      );
    }



  // const user = this.props.navigation.state.params.username;
   var year = new Date().getFullYear()
  let ListMessage = this.state.List;
 
    return (
<Container>


      <FlatList
        data={ this.state.data}
        renderItem={({item}) => 

      
<View>
{/* {(item.current_distance < item.mydistance && year - item.bod <= item.max_age && year - item.bod >= item.min_age && item.activity_status != item.my_code+'like' && item.activity_status != item.my_code+'dislike' ) ? */}

<Card style={{flex:1}}> 
<CardItem cardBody >
<Image  source={{ uri: item.profile_pic_1}} style={{ width: null,flex:2, height:350 }} />                      
</CardItem>
<CardItem cardBody>          
<Text onPress={this._handleButtonPress} style={{color:'#6B97DA',marginLeft:20,fontSize:17}}>{item.names} <Text note> - {year - item.bod}  </Text></Text>
</CardItem>
 <CardItem>
  <Text  style={{marginTop:-10,fontSize:12,fontSize:15,textAlign:"center"}}note numberOfLines={2}>
  
            <Icon   name="ios-compass" style={{fontSize:14,color:'#6B97DA'}} /> {item.current_distance.toFixed(2)} KM Away</Text>
                
            </CardItem>
            <CardItem>
                <Text  style={{marginTop:-20,fontSize:12}}note numberOfLines={1}>
  
                  {item.bio}</Text>
              </CardItem>
            <CardItem>
             
            <Body>
            <Button Right light style={{borderRadius:50, marginRight:1}}>
                <Icon style={styles.BodyIconLike} name="ios-heart-empty" onPress={this.like.bind(this, item.user_id)} /> 
            </Button>
            </Body>
            <Right>
              
                <Button light style={{borderRadius:50, marginRight:1}}>
                <Icon style={styles.BodyIconDislike}  name="md-close" onPress={this.dislike.bind(this, item.user_id)} />
                </Button>
                </Right>
               
            </CardItem>
          
 </Card>

{/* :null
} */}
    
     
        

</View>             
           
         

        
      
          
        }

keyExtractor={(item, index) => index}
numColumns={1}


refreshControl={
            <RefreshControl
              //refresh control used for the Pull to Refresh
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }

/>
            



        
                <Content>


        
<View style={styles.MainContainer}>
       
              <FlatList
        data={ this.state.Message_notification}
        renderItem={({item}) => 

   
 <Text>  
         {(item.chat_status==0)?

          this._handleButtonPress("Message from " + item.names)
         
         :null
         }
        
</Text>
          
        }

keyExtractor={(item, index) => index}
numColumns={1}

/>


     
<FlatList
        data={ this.state.data_notification}
        renderItem={({item}) => 

   
<Text>  

{(item.like_status==0)?

          this._handleButtonPress(item.names +" likes you")
         
         :null
         }
         
{(item.like_status==1)?

this._handleButtonPress("Congz its Perfect Match,"+ item.names + "likes you back")

:null
} 

</Text>       
        }
keyExtractor={(item, index) => index}
numColumns={1}

/>
        
        
               </View>
                  

</Content>

          
            </Container>
            
    );
  }
}
export default DiscoveryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderTitle:{
    color:'#6B97DA',
    fontSize:10,
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


import React from 'react';
import {Component} from 'react'
import { StyleSheet,TextInput, Image, View,ListView, FlatList, Alert, TouchableHighlight, ActivityIndicator,Modal,Linking} from 'react-native';
import { Container,FooterTab,Left,Thumbnail,Body,Right,Footer,Header,Switch,Title,Item ,Content,Card,CardItem, List,ScrollableTab,Spinner,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';


class SettingsScreen extends Component {
  static navigationOptions = {
  title: 'Settings',
  };
  constructor(props)
  {
 
    super(props);
 
    this.state = {   
      modalVisible: false,
      user:'',
      distance:'',
      loading:true,
      waiting:true
      

    }
 
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
 
LogOut = async () => {
                  try {
                    await AsyncStorage.removeItem('userId');
                   this.props.navigation.push('LandingScreen');

                  } catch (error) {
                    // Error saving data
                  }}

         
    onValueChange2(value) {
      this.setState({
        selected2: value
      });
    }
    
check = async () => {
  try {
    const value = await AsyncStorage.getItem('userId');
 
   // this.setState({message: mgs});
    this.setState({user: value});
    
    if (value !== null) {
     
     fetch('http://lightchat.panatechrwanda.tk/mobile/getuser_settings.php', {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
      
         username: value,
         
      
       })
      
     }).then((response) => response.json())
           .then((responseJson) => {
      
            this.setState({
              loading: false,
              waiting: false,
              data: responseJson
            }, function() {
              //alert(value);
              
            });
            
      
           }).catch((error) => {
             console.error(error);
           });
      
      
      
    
    }
  } catch (error) {
    // Error retrieving data
  }
};         
componentDidMount() {
  this.check();
}

 saveDistance =() => {


  const { distance }  = this.state;
  const { user }  = this.state;


 fetch('http://lightchat.panatechrwanda.tk/mobile/distanceSettings.php', {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({
  
     username: user,
     km: distance,
  
   })
  
 }).then((response) => response.json())
       .then((responseJson) => {
  
        if(responseJson === 1)
         {
        
       // alert("Distance Updated");
         this.setModalVisible(!this.state.modalVisible);
         this.props.navigation.push('SettingsScreen');   
  
         }
         else{
          Alert.alert(responseJson); 
         }
  
       }).catch((error) => {
         console.error(error);
       });
  
  





}






messageValue = (value) => {
  
  this.setState({waiting:true});
  


  const {user} = this.state;

  fetch('http://lightchat.panatechrwanda.tk/mobile/notification_setting.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      notification: value,
      user: user,
      setting: 'message',

   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
   
         if(responseJson === 1)
        {
          this.check();
 
         }
          else{
   
            Alert.alert(responseJson);
          }
   
        }).catch((error) => {
          console.error(error);
        });






}


likeValue = (value) => {
  
  this.setState({waiting:true});


      const {user} = this.state;

  fetch('http://lightchat.panatechrwanda.tk/mobile/notification_setting.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      notification: value,
      user: user,
      setting: 'like',

   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
   
         if(responseJson === 1)
        {
       //alert("hi");
       this.check();
         }
          else{
   
            Alert.alert(responseJson);
          }
   
        }).catch((error) => {
          console.error(error);
        });

   }
   matchValue = (value) => {
  
    this.setState({waiting:true});

    const {user} = this.state;

  fetch('http://lightchat.panatechrwanda.tk/mobile/notification_setting.php', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      notification: value,
      user: user,
      setting: 'match'
   
    })
   
  }).then((response) => response.json())
        .then((responseJson) => {
   
         if(responseJson === 1)
        {
       this.check();
 
         }
          else{
   
            Alert.alert(responseJson);
          }
   
        }).catch((error) => {
          console.error(error);
        });

 }




  render() {

   const waiting = 0;
    if (this.state.loading) {
        
      return (
 
            <View style={styles.ActivityIndicator_Style}>
 
            <ActivityIndicator size="large" />
 
            </View>
      );


    
    }
    if (this.state.waiting) {
        
      <View style={styles.ActivityIndicator_Style}>
 
      <Spinner color="blue" />

      </View>
    
    }
    return (
<Container>

<Content>              

       <List>
            <ListItem itemDivider>
              <Text>My Account</Text>
            </ListItem>                    
 
           
         <ListItem icon  onPress={()=>this.props.navigation.navigate('changeProfileImage')}>
           
           <Left>
           <Button style={{ backgroundColor: "#6B97DA" }}>
             <Icon active name="ios-person" />
           </Button>
         </Left>
         <Body>
         <Text >My Profile</Text>
         </Body>
        
         </ListItem>

           



         <ListItem icon onPress={()=>this.props.navigation.navigate('ChangePasswordScreen')}>
           
           <Left>
           <Button style={{ backgroundColor: "#6B97DA" }}>
             <Icon active name="ios-remove-circle-outline" />
           </Button>
         </Left>
         <Body>
         <Text>Change Password</Text>
         </Body>
        
         </ListItem>
         <ListItem icon onPress={this.LogOut}>
           
           <Left>
           <Button style={{ backgroundColor: "#6B97DA" }}>
             <Icon active name="ios-log-out" />
           </Button>
         </Left>
         <Body>
         <Text>Logout</Text>
         </Body>
        
         </ListItem>
          



            
            
            <ListItem itemDivider>
              <Text>Discovery</Text>
            </ListItem>  


            <FlatList
        
        data={ this.state.data}
        renderItem={({item}) => 
        <View>
        <ListItem icon onPress={() => {
            this.setModalVisible(true);
          }}>
           
           <Left>
           <Button style={{ backgroundColor: "#6B97DA" }}>
             <Icon active name="ios-map" />
           </Button>
         </Left>
         <Body>
         <Text >Distance</Text>
         </Body>
         <Right>
         <Text>{item.discovery_distance} KM</Text>
              <Icon active name="ios-arrow-forward" />
         </Right>
         </ListItem>
             
             <ListItem icon onPress={()=>this.props.navigation.navigate('AgeSettingScreen')}>
           
           <Left>
           <Button style={{ backgroundColor: "#6B97DA" }}>
             <Icon active name="ios-information-circle-outline" />
           </Button>
         </Left>
         <Body>
         <Text >Ages </Text>
         </Body>
         <Right>

         {(item.age_min==0 || item.age_max==0) ?

<Text>Choose</Text>
:null
}
         <Text>{item.age_min}-{item.age_max}</Text>
              <Icon active name="ios-arrow-forward" />
         </Right>

         </ListItem>

            
             <ListItem icon onPress={()=>this.props.navigation.navigate('GenderSettingScreen')}>
           
           <Left>
           <Button style={{ backgroundColor: "#6B97DA" }}>
             <Icon active name="ios-male" />
           </Button>
         </Left>
         <Body>
         <Text >Gender</Text>
         </Body>
         <Right>

{(item.gender_view==0) ?

          <Text>Everyone</Text>
:null
}
{(item.gender_view==1) ?

<Text>Male</Text>
:null
}
{(item.gender_view==2) ?

<Text>Female</Text>
:null
}
 <Icon active name="ios-arrow-forward" />
         </Right>
         </ListItem>
        
          

        

            <ListItem itemDivider>

          <Text>Notifications  </Text>
              
            </ListItem>  
            <ListItem icon>
           
              <Left>
              <Button style={{ backgroundColor: "#6B97DA" }}>
                <Icon active name="ios-text" />
              </Button>
            </Left>
            <Body>
            <Text >Messages</Text>
            </Body>
            <Right>
            
      
                    
          {(item.msg_noti==1) ?
            <Switch onValueChange={this.messageValue}
                    value={true} />
             :null
            }
            {(item.msg_noti==0) ?
            <Switch onValueChange={this.messageValue}
                    value={false} />
             :null
            }
            </Right>
            </ListItem>
            <ListItem icon>
           
           <Left>
           <Button style={{ backgroundColor: "#6B97DA" }}>
             <Icon active name="ios-heart" />
           </Button>
         </Left>
         <Body>
         <Text >Matches</Text>
         </Body>
         <Right>
   

{(item.match_noti==1) ?
            <Switch onValueChange={this.matchValue}
                    value={true} />
             :null
            }
            {(item.match_noti==0) ?
            <Switch onValueChange={this.matchValue}
                    value={false} />
             :null
            }
         </Right>
         </ListItem>
            <ListItem icon>
           
              <Left>
              <Button style={{ backgroundColor: "#6B97DA" }}>
                <Icon active name="ios-heart-half" />
              </Button>
            </Left>
            <Body>
            <Text >New Like</Text>
            </Body>
            <Right>
            {(item.like_noti==1) ?
            <Switch onValueChange={this.likeValue}
                    value={true} />
             :null
            }
            {(item.like_noti==0) ?
            <Switch onValueChange={this.likeValue}
                    value={false} />
             :null
            }
            </Right>
            </ListItem>
            </View>
        }
keyExtractor={(item, index) => index}
numColumns={1}

/>
             <ListItem itemDivider>
              <Text>Light Chat</Text>
            </ListItem>  
            <ListItem onPress={()=>this.props.navigation.navigate('ContactScreen',{user:this.state.user})}>
              <Text>Contact us</Text>
            </ListItem>
             <ListItem onPress={() => Linking.openURL('http://thelightchat.com/contents/dating%20tips.html')}>
              <Text>Safety tips</Text>
            </ListItem>
             <ListItem>
              <Text onPress={() => Linking.openURL('http://thelightchat.com/contents/Community.html')}>Community Guideline</Text>
            </ListItem>
             <ListItem itemDivider>
              <Text>Legal</Text>
            </ListItem>  
            <ListItem onPress={() => Linking.openURL('http://thelightchat.com/contents/privacy%20%26%20policy.html')}>
              <Text>Privacy Policy</Text>
            </ListItem>
             <ListItem>
              <Text onPress={() => Linking.openURL('http://thelightchat.com/contents/term.html')}>Terms of services</Text>
            </ListItem>
            <ListItem>
              <Text onPress={()=>this.props.navigation.navigate('DeleteAccount')}>Delete Account</Text>
            </ListItem>
            
          </List>
          <View style={{margin:20}}>
          <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
           // Alert.alert('Modal has been closed.');
          }}>
          <View style={{margin:20,marginTop:30}}>
            <View>
<Text style={{textAlign:"center",fontSize:25}}>Set Distance Discovery</Text>
<Text note style={{textAlign:"center"}}>This feature allows you get suggestion according to  nearly by users, to get more users on your suggestion list use at least 1000 kilometers</Text>
             <Text></Text>

           <Text style={{fontSize:14,color:'#3C3C3C',textAlign:"center"}}>Type Discovery in kilometers </Text>
           <Text></Text> 
                  <TextInput placeholder="100"  ref={input => { this.textInputs = input }} onChangeText={distance => this.setState({distance})} style={styles.TextInputStyle}  />   
                  <Text></Text>
                  <Button small primary block style={{alignSelf:'center',margin:10}}  onPress={this.saveDistance}><Text>Save Change</Text></Button>
           
                  <Text></Text> 
                  <Text></Text> 
                <Text onPress={() => { this.setModalVisible(!this.state.modalVisible); }} style={{textAlign:"center",color:'red'}}>Cancel</Text>
             
            </View>
          </View>
        </Modal>  
        </View>   
</Content>

          
            </Container>
    );
  }
}
export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderTitle:{
    color:'#6B97DA',
  
    
  }, TextInputStyle: {
    textAlign: 'center',
    height: 40,
    width:280,
    margin:5,
    borderWidth: 1,
    borderRadius:0,
    borderColor:'#D7D7D7',
    borderTopColor:'#fff',
    backgroundColor:'#fff',
    color:'black',
    

    },
  HeaderIcon:{
    color:'#6B97DA',
  },

  BodyIcon:{
    color:'red',
    fontSize:40,
  }
});

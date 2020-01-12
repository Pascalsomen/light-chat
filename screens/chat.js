
import React from 'react';
import {Component} from 'react'
import { StyleSheet,TextInput, Image, NetInfo , View,ListView, FlatList, Alert, ActivityIndicator,KeyboardAvoidingView,Modal} from 'react-native';
import { Container,FooterTab,Left,Thumbnail,Body,Right,Grid,Footer,Header,Title,Item,Subtitle,Content,Card,CardItem, List,ScrollableTab ,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';
import ImageView from 'react-native-image-view';
class ChatScreen extends Component {
  static navigationOptions = {
    //title: 'Home',
   header:null

  };
  constructor(props)
  {
    super(props);
    this.state = { 
 
        loading: true,
        user_id:this.props.navigation.state.params.user_id,
        user:'',
        message:'',
        online_status:'checking..',
        chatcode: this.props.navigation.state.params.chatcode,
        modalVisible: false,
        connection_Status : "",
        connection_Status_message : "",
        height:'',
        width:''

    }
 
  }
 
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  sendImage (){
  //  // const { user } = this.state;
  //   const { user_id } = this.state;
  //   const{ chatcode }= this.state;
    
    this.props.navigation.navigate('ChatImageScreen');
    this.props.navigation.navigate('WelcomeScreen');
  }
  check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      const {user_id}= this.state; 
      if (value !== null) {
       return  fetch('http://lightchat.panatechrwanda.tk/mobile/getuser.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         user_id: value
        })
      })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              loading: false,
              user: responseJson

            }, function() {
              // In this block you can do something with new state.
              const {user}= this.state; 
              const {chatcode}= this.state;

              fetch('http://lightchat.panatechrwanda.tk/mobile/read.php',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                 user : user,
                 user_id: user_id,
                 chatcode:chatcode
                 
                })
              })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({
                      loading: false,
                      data: responseJson
                    }, function() {
                      // In this block you can do something with new state.
                    });
                  })
                  .catch((error) => {
                    console.error(error);
                  }) 




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

      this.timer = setInterval(()=> this.check(), 5000)
      this.timer = setInterval(()=> this.sendMyStatus(), 10000)
      this.timer = setInterval(()=> this.checkUserStatus(), 5000)
   
    NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectivityChange
 
    );
   
    NetInfo.isConnected.fetch().done((isConnected) => {
 
      if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }
 
    });
 
}
componentWillUnmount() {
 
  NetInfo.isConnected.removeEventListener(
      'connectionChange',
      this._handleConnectivityChange

  );

}
_handleConnectivityChange = (isConnected) => {

  if(isConnected == true)
    {
      this.setState({connection_Status : "Online"})
    }
    else
    {
      this.setState({connection_Status : "Offline"})
    }
};

checkUserStatus (){

  const {user_id}=this.state

  fetch('http://lightchat.panatechrwanda.tk/mobile/online_checker.php',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                 user_id: user_id
                 
                })
              })
                  .then((response) => response.json())
                  .then((responseJson) => {
                    this.setState({
                      online_status: responseJson
                    }, function() {
                      // In this block you can do something with new state.
                    });
                  })
                  .catch((error) => {
                    console.error(error);
                  }) 

}

sendMyStatus(){
const {user}= this.state;
fetch('http://lightchat.panatechrwanda.tk/mobile/online_status_update.php', {
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

View(image){
if(image!=""){
  //this.setState({viewImage:image});
  this.props.navigation.navigate('ChatViewImageScreen',{image:image})
}
}




onNavigate = () => {

   this.setModalVisible(!this.state.modalVisible)
   this.props.navigation.navigate('ReportUserScreen',{user:this.state.user,userId:this.state.user_id})
}


viewProfile = () => {

  this.setModalVisible(!this.state.modalVisible)
  this.props.navigation.navigate('ViewMessageProfileScreen',{user_id:this.state.user_id})
}

Unmatch = () =>{
  this.setModalVisible(!this.state.modalVisible)
  this.props.navigation.navigate('ViewProfileScreen',{user_id:this.state.user_id})
}
Msg = () =>{


   const { user_id }  = this.state ;
   const { user }  = this.state ;
   const { message }  = this.state ;
   const { chatcode }  = this.state ;
   if(message !=''){
   fetch('http://lightchat.panatechrwanda.tk/mobile/write.php', {
   method: 'POST',
   headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json',
   },
   body: JSON.stringify({
   
   sender: user,
   receiver: user_id,
   message: message,
   chatcode: chatcode,
   
   })
   
   }).then((response) => response.json())
     .then((responseJson) => {
   
      if(responseJson === 1)
       {
   
           //this.props.navigation.navigate('HomeScreen', { username: user });

   this.textInput.clear()

   this.check();
   this.setState({ message: "" });
       }
       else{
   
         Alert.alert(responseJson);
       }
   
     }).catch((error) => {
       console.error(error);
     });
   
   
   }
  }

 
  render() {


  // if(this.state.connection_Status == "Offline"){
  //   this.setState({connection_Status_message:"You have no internet connection!"})
  // }
 
    if(this.state.viewImage){
      let { viewImage } = this.state;
      Image.getSize(viewImage, (width, height) => {this.setState({width, height})});
      const images = [
          {
              source: {
                  uri: viewImage,
              },
              title: 'Paris',
              width: null,
              height: this.state.height,
              flex:1
          },
      ];
     
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

  <ImageView
  images={images}
  imageIndex={0}
  isVisible={this.state.isImageViewVisible}
  onClose={this.closeImage}
  backgroundColor="transparent"
  renderFooter={(currentImage) => (<View><Text> </Text></View>)}
/>
         </View>

         
        
                  </Content>


              </Container>
      );
    }
    
   let user_names = this.props.navigation.state.params.names;
   let image = this.props.navigation.state.params.image;
   const {user} = this.state;
const{online_status} = this.state;
   const res = this.props.navigation.state.params.user_id;
    if (this.state.loading) {
      return (
 
            <View style={styles.ActivityIndicator_Style}>
 <Header style={{height:90,paddingTop:20,backgroundColor:'#fff'}}>
<Left>
            <Button transparent onPress={()=> this.props.navigation.goBack()}>
              <Icon style={{color:'black'}} name='ios-arrow-back' />
              <Thumbnail source={{ uri: image }} style={{height:45,width:45,marginLeft:10}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'#000',fontSize:14,marginLeft:30}}>{user_names}</Title>
            <Subtitle note style={{color:'#6B97DA',fontSize:13,textAlign:'center',marginLeft:30}}>{online_status}</Subtitle>
          </Body>
          <Right>
          <Button transparent onPress={() => {
            this.setModalVisible(true);
          }}>
  <Icon style={styles.HeaderIcon} name='more' />
  </Button>
          </Right>
         
        </Header>
            <ActivityIndicator size="large" />
 
            </View>
      );
    }
    return (
<Container style={{backgroundColor:'#f5f5f5'}}>
<Header style={{height:90,paddingTop:20,backgroundColor:'#fff'}}>
<Left>
            <Button transparent onPress={()=> this.props.navigation.goBack()}>
              <Icon style={{color:'black'}} name='ios-arrow-back' />
              <Thumbnail source={{ uri: image }} style={{height:45,width:45,marginLeft:10}} />
            </Button>
          </Left>
          <Body>
            <Title style={{color:'#000',fontSize:14,marginLeft:30}}>{user_names}</Title>
            <Subtitle note style={{color:'#6B97DA',fontSize:13,textAlign:'center',marginLeft:30}}>{online_status}</Subtitle>
          </Body>
          <Right>
          <Button transparent onPress={() => {
            this.setModalVisible(true);
          }}>
  <Icon style={styles.HeaderIcon} name='more' />
  </Button>
          </Right>
         
        </Header>



        
<Content>              



<FlatList

data={ this.state.data }
renderItem={({item}) => 

       <View>
       

{(item.sender==user)?
<Grid onPress={this.View.bind(this, item.image_message)}>
<Right>
{(item.image_message =="")?



<View>
<Text style={{alignItems:'flex-end',color:'#484848',fontSize:16,backgroundColor:'#C4C4C4',marginLeft:50,borderRadius:20,borderTopRightRadius:25,borderBottomRightRadius:0,padding:10,marginTop:10}} >{item.message}  <Text style={{fontSize:12}} note>{item.senttime}</Text> </Text>
</View>
:null
}
{(item.image_message !="")?
<View >
<Card style={{backgroundColor:'transparent',padding:2,marginLeft:50,borderRadius:20,borderTopRightRadius:25,borderBottomRightRadius:0,marginTop:4}}>
<CardItem  style={{ width: 150,marginLeft:50}}>
<Image source={{ uri:item.image_message}} style={{width: 200, flex:1, height:120, resizeMode: 'cover',alignItems:"center" }} />
</CardItem>
{(item.message!="")?
<Text style={{borderRadius:20,borderTopRightRadius:25,borderBottomRightRadius:0,alignItems:'flex-end',padding:10,color:'#484848',fontSize:16,backgroundColor:'#F5F5F5'}} >{item.message}  <Text style={{fontSize:12}} note>{item.senttime}</Text></Text>
:null
}
</Card>
</View>
:null
}
</Right>
<Text> </Text>

</Grid>
:null
}
{(item.sender==res)?
<Grid onPress={this.View.bind(this, item.image_message)}>

<Text> </Text>




{(item.image_message =="")?
<View>
<Text   style={{color:'#fff',fontSize:16,marginRight:50,borderRadius:20,borderTopLeftRadius:25,borderBottomLeftRadius:0,padding:10,marginTop:10,backgroundColor:'#5CB3FF'}} >{item.message}  </Text>
<Text style={{fontSize:12}} note>{item.senttime}</Text>
</View>
:null
}
{(item.image_message !="")?
<View >
<Card  style={{backgroundColor:'#5CB3FF',padding:2,width: 140,borderRadius:20,borderTopLeftRadius:25,borderBottomLeftRadius:0,marginTop:2}}>
<CardItem >
<Image source={{ uri:item.image_message}} style={{ width: 140, flex:1, height: 100,marginTop:10, resizeMode: 'cover' }} />
</CardItem>
{(item.message!="")?
<Text   style={{color:'#fff',fontSize:16,marginRight:50,borderRadius:20,borderTopLeftRadius:25,borderBottomLeftRadius:0,padding:2,marginTop:10,backgroundColor:'#5CB3FF'}} >{item.message}  </Text>
:null
}
<Text style={{fontSize:12}} note>{item.senttime}</Text>
</Card>
</View>
:null
}


</Grid>
:null
}
</View>
}
keyExtractor={(item, index) => index}
numColumns={1}    
/>   

<View style={{alignContent:"center",justifyContent:"center",margin:50,backgroundColor:'white'}}>
          <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onNavigate={this.onNavigate}
          onRequestClose={() => {
           // Alert.alert('Modal has been closed.');
          }}>
          <View style={{margin:20,marginTop:100,backgroundColor:'#fff',padding:30}}>
           
            <View>
           <Text style={{fontSize:20,color:'#3C3C3C',textAlign:"center" }}  onPress={this.viewProfile}>View Profile </Text>
           <Text></Text> 


                 
           <Text  onPress={this.onNavigate} style={{fontSize:20,color:'#3C3C3C',textAlign:"center"}}>Report</Text>
           <Text></Text> 

                  <Text></Text> 
                  <Text></Text> 
                <Text onPress={() => { this.setModalVisible(!this.state.modalVisible); }} style={{textAlign:"center",color:'red'}}>Cancel</Text>
             
            </View>
          </View>
        </Modal>  
        </View>
</Content>

  <KeyboardAvoidingView  behavior="padding" enabled >

		<View>
    <Card style={{backgroundColor:'#fff',borderColor:'#fff',borderRadius:40,margin:16}}>
<CardItem style={{backgroundColor:'#fff',borderColor:'#fff',borderRadius:40}}>
<TextInput  placeholder="Type Message...." ref={input => { this.textInput = input }} onChangeText={message => this.setState({message})} style={{width:'75%'}}/>
<Text  style={{alignSelf:'center',padding:10}} onPress={()=>this.props.navigation.navigate('ChatImageScreen',{receiver:this.state.user_id,sender:this.state.user,chatcode:this.state.chatcode})}><Icon name="ios-camera" style={{color:'black',fontSize:25}}/></Text>  
<Text  style={{alignSelf:'center',padding:10}}  onPress={this.Msg}><Icon name="ios-send" style={{color:'black',fontSize:25}}/></Text>     
 </CardItem>
  </Card>
		</View>

</KeyboardAvoidingView>




   
            </Container>
    );
  }
}
export default ChatScreen

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

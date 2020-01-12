import React from 'react';
import {Component} from 'react'
import { StyleSheet,ImageEditor,FlatList, ScrollView, View,TextInput,  Alert,ActivityIndicator,StatusBar,Share,KeyboardAvoidingView,Clipboard,TouchableOpacity,Image,} from 'react-native';
import { Container, Content, List, Picker,Tabs,Tab,TabHeading,ListItem, InputGroup,Segment, Input, Icon, Item,Text, Button,Textarea,Grid,Col } from 'native-base';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import {AsyncStorage} from 'react-native';

import MoreProfileImage from './moreImages'
import EditProfile from './editprofile'
class changeProfileImage extends Component {
  static navigationOptions = {
    title: 'My Profile',
  
  };
  
  constructor(props) {
 
    super(props)

    this.state = {
      selected2: null,
      bio:'',
      gender:'',
      edu:'',
      name:'',
      job:'',
      city:'',
      age:'',
      religion:'',
      loading:true,
      image: 'https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/1909558/910/607/m1/fpnw/wm0/camera-thin-line-icon-01-.jpg?1479381787&s=1c160b37d6606127edc9dbffc2034e27',
      imageEncoded:'',
      img1:'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1576174064000%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png',
      img2:'https://storage.googleapis.com/spec-host/mio-staging%2Fmio-design%2F1576174064000%2Fassets%2F1nc3EzWKau3OuwCwQhjvlZJPxyD55ospy%2Fsystem-icons-design-priniciples-02.png',
 
    }}

    onValueChange2(value) {
      this.setState({
        selected2: value
      });
    }
    register = () =>{

      
    
  const { user }  = this.state;
  const { bio }  = this.state;
  const { name }  = this.state;
  const { edu }  = this.state;
  const { job }  = this.state;
  const { city }  = this.state;
  const { gender }  = this.state;
  const {age}=this.state;
  const {religion}=this.state;


 // alert(imageEncoded);
  
  fetch('http://lightchat.panatechrwanda.tk/mobile/updateProfilelInfo.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
        
           bio: bio,
           user: user,
           gender: gender,
           name: name,
           city: city,
           job: job,
           edu: edu,
           age:age
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {

                _storeData = async () => {
                  try {
                    await AsyncStorage.setItem('profileImage', imageEncoded);
                  } catch (error) {
                    // Error saving data
                  }
                };
                _storeData();
              alert("Profile Updated");
              this.props.navigation.push('changeProfileImage');
 
               }
               else{
        
                 Alert.alert(responseJson);
               }
        
             }).catch((error) => {
               console.error(error);
             });
   
   }
 
   componentDidMount() {
    this.check();
    
      
}

updateMeasurement = (text) => {
  this.measurementValue(text);
}
askPermissionsAsync = async () => {
  await Permissions.askAsync(Permissions.CAMERA);
  await Permissions.askAsync(Permissions.CAMERA_ROLL);
  // you would probably do something to verify that permissions
  // are actually granted, but I'm skipping that for brevity
};

   check = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      const MyImage = await AsyncStorage.getItem('profileImage');
      this.setState({ image: MyImage });
      if (value !== null) {
       this.setState({ user: value })  
       return  fetch('http://lightchat.panatechrwanda.tk/mobile/getprofile.php',{
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
              image:responseJson
            }, function() {
              // In this block you can do something with new state.

              this.myProfile();
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
  }


  myProfile() {
   
       const {user} = this.state;

       return  fetch('http://lightchat.panatechrwanda.tk/mobile/getuser_settings.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         username : user,
         
        })
      })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              loading: false,
              profileData: responseJson,
         
            }, function() {
              // In this block you can do something with new state.
            });
          })
          .catch((error) => {
            console.error(error);
          }) 
        
      }


  render() {


    if (this.state.loading) {
        
      return (
 
            <View style={styles.ActivityIndicator_Style}>
 
            <ActivityIndicator size="large" />
 
            </View>
      );

    }
    let { image } = this.state;
    let { img1 } = this.state;
    let { img2 } = this.state;
   
    return (
     
<Container style={styles.MainContainer}>
                <Content style={{height:3000}}>
                <View >
           <StatusBar barStyle="default" />
 
          <Grid style={{margin:10}}>
          <Col onPress={this._pickImage}>
          <Image  source={{ uri: image }} style={{ width: 120, height: 120, resizeMode: 'contain', marginLeft:20, borderRadius:20 }} />
          <Text></Text>
          <Text style={{marginLeft:40,fontSize:12}} onPress={this._pickImage} >Edit Profile </Text>
          </Col>
          <Col>
          <FlatList
      
      data={ this.state.profileData}
      renderItem={({item}) => 

      <View>
  
     
      <Text style={{fontSize:18,color:'#6B97DA',textAlign:"center"}}>{item.names}</Text>
      
      <Text  style={{textAlign:"center",fontSize:14}}>Birth Year {item.bod}</Text>
       
        <Text  style={{textAlign:"center",fontSize:14}} >{item.education} / {item.job}</Text>

        <Text  note numberOfLines={3} style={{fontSize:13,textAlign:"center"}}>{item.bio}</Text>
        
      </View>
      }

keyExtractor={(item, index) => index}
numColumns={1}

/>
          </Col>
          </Grid>
          


 <ScrollView> 
<Tabs style={{borderTopWidth:0}}>
<Tab  heading={<TabHeading style={{backgroundColor:'white',fontSize:13,color:'black',borderTopWidth:0}}><Text style={{color:'black'}}> More Photos </Text></TabHeading>}>
  <MoreProfileImage navigation={this.props.navigation} />
</Tab>
<Tab  heading={<TabHeading style={{backgroundColor:'white',fontSize:13,color:'black',borderRadius:0}}><Text style={{color:'black'}}>  Edit Info </Text></TabHeading>}>
  <EditProfile navigation={this.props.navigation}/>
</Tab>
</Tabs> 
 </ScrollView> 
      </View>
                </Content>
            </Container>
           
    );
  }


  _pickImage = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
      aspect: [4, 4],
    });

    
    
    if (result.cancelled) {
      console.log('got here');
      return;
    }

    let resizedUri = await new Promise((resolve, reject) => {
      ImageEditor.cropImage(result.uri,
        {
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: 300, height: 300 },
          resizeMode: 'contain',
          
        },
        (uri) => resolve(uri),
        () => reject(),
      );
    });
    
    
    // this gives you a rct-image-store URI or a base64 image tag that
    // you can use from ImageStore

    const actions = []
    actions.push({ resize: { width:300, height: 300 } })
    this.setState({ image: resizedUri });

    const manipulatorResult = await ImageManipulator.manipulateAsync(result.uri, actions, {
      base64: true,
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
    })
    
    //alert(manipulatorResult.base64);

    this.setState({imageEncoded :'data:image/png;base64,' + manipulatorResult.base64 });
    

    var img = 'data:image/png;base64,' + manipulatorResult.base64;
    //alert(img);


    const { user }  = this.state;
    fetch('http://lightchat.panatechrwanda.tk/mobile/updatePhotos.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
  
        user: user,
        image: img,
        code:1
        
     
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
     
           if(responseJson === 1)
            {

             _storeData = async () => {
               try {
                 await AsyncStorage.setItem('profileImage',img);
               } catch (error) {
                 // Error saving data
               }
             };
             _storeData();
           alert("Profile changed");
         //  this.props.navigation.navigate('HomeScreen');
   
            }
            else{
     
              Alert.alert(responseJson);
            }
     
          }).catch((error) => {
            console.error(error);
          });

  
    
  };

 
  


}
export default changeProfileImage

const styles = StyleSheet.create({
  MainContainer:{
    backgroundColor:'#fff'
  },
  container: {
    flex: 1,
 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:30,
    borderWidth: 1,
    margin:20,
    borderColor:'white'
  
  },
  text:{
color:'white'
  },

  TextInputStyle: {
  
    marginBottom: 5,
    height: 40,
    width:280,
    margin:10,
    borderWidth:0,
    borderRadius:0,
    borderBottomWidth:1,
    borderBottomEndRadius:1,
    borderBottomColor:'#e1e1e1',
    backgroundColor:'#e9e9e9',
    color:'black',
    
    

    },
     
     TextComponentStyle: {
      fontSize: 20,
      color: "#000",
      textAlign: 'center', 
      marginBottom: 15
     }
});

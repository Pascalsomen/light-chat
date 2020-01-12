
import React from 'react';
import {Component} from 'react'
import { StyleSheet,ImageEditor,FlatList,  View,TextInput,  Alert,ActivityIndicator,StatusBar,Share,KeyboardAvoidingView,Clipboard,TouchableOpacity,Image,} from 'react-native';
import { Container, Content, List, Picker,  ListItem, InputGroup,Segment, Input, Icon, Item,Text, Button,Textarea,Grid,Col } from 'native-base';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import {AsyncStorage} from 'react-native';
class MoreProfileImage extends Component {
  static navigationOptions = {
    title: 'Edit Profile',
    header:null
  
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
                <Content>
                <View style={styles.container}>
           <StatusBar barStyle="default" />

       
        <FlatList
      
        data={ this.state.profileData}
        renderItem={({item}) => 

        <View>
    <Grid>
  <Col onPress={this._pickImage1}>
  {(item.profile_pic_2 =="") ?
  <Image  source={{ uri: img1 }} style={{ width: null,flex:1, height: 200, resizeMode: 'contain'}} />
 :null
  }
  {(item.profile_pic_2 !="") ?
  <Image  source={{ uri: item.profile_pic_2 }} style={{ width: null,flex:1, height: 200, resizeMode: 'contain' }} />
 :null
  }
  </Col>
  <Col onPress={this._pickImage2}>

  {(item.profile_pic_3 =="") ?
  <Image  source={{ uri: img2 }} style={{ width: null,flex:1, height: 200, resizeMode: 'contain' }} />
 :null
  }
  {(item.profile_pic_3 !="") ?
  <Image  source={{ uri: item.profile_pic_3 }} style={{ width: null,flex:1, height: 200, resizeMode: 'contain' }} />
 :null
  }
  </Col>

</Grid>
<Text></Text>
      
         <TextInput placeholder={item.names}  placeholderTextColor = "#fff"  ref={input => { this.textInputs = input }} v onChangeText={name => this.setState({name})} style={styles.TextInputStyle} />

        </View>
        }

keyExtractor={(item, index) => index}
numColumns={1}

/>

      </View>
                </Content>
            </Container>
    );
  }

  _pickImage1 = async () => {
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
    this.setState({ img1: resizedUri });

    const manipulatorResult = await ImageManipulator.manipulateAsync(result.uri, actions, {
      base64: true,
      compress: 0.8,
      format: ImageManipulator.SaveFormat.JPEG,
    })
    
    //alert(manipulatorResult.base64);

    this.setState({img1 :'data:image/png;base64,' + manipulatorResult.base64 });
    

    var img = 'data:image/png;base64,' + manipulatorResult.base64;


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
        code:2
        
     
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
     
           if(responseJson === 1)
            {

              alert("Successful Added");
              this.check();
   
            }
            else{
              Alert.alert(responseJson);
            }
     
          }).catch((error) => {
            console.error(error);
          });

  
    
  };
  _pickImage2 = async () => {
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
    this.setState({ img2: resizedUri });

    const manipulatorResult = await ImageManipulator.manipulateAsync(result.uri, actions, {
      base64: true,
    })
    
    //alert(manipulatorResult.base64);

    //this.setState({img2 :'data:image/png;base64,' + manipulatorResult.base64 });
    

    var img = 'data:image/png;base64,' + manipulatorResult.base64;


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
        code:3
        
     
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
     
           if(responseJson === 1)
            {

            
           alert("Successful Added");
           this.check();
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
export default MoreProfileImage

const styles = StyleSheet.create({
  MainContainer:{
    backgroundColor:'#fff'
  },
  container: {
    flex: 1,
 
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop:30,
    borderWidth: 1,
    borderColor:'white'
  
  },
  text:{
color:'white'
  },

  TextInputStyle: {
  
    textAlign: 'center',
    height: 40,
    width:280,
    margin:5,
    borderWidth: 1,
    borderRadius:0,
    borderColor:'#fff',
    borderTopColor:'#fff',
    backgroundColor:'#fff',
    color:'black',
    
    

    },
     
     TextComponentStyle: {
      fontSize: 20,
      color: "#000",
      textAlign: 'center', 
      marginBottom: 15
     }
});



import React from 'react';
import {Component} from 'react'
import { StyleSheet,ImageEditor,  View,TextInput, Alert,ActivityIndicator,StatusBar,Share,Clipboard,TouchableOpacity,Image,KeyboardAvoidingView} from 'react-native';
import { Container, Content, List, Picker,  ListItem, InputGroup, Input, Icon, Item,Text, Button, Textarea } from 'native-base';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import {AsyncStorage} from 'react-native';
class ProfileSettingsScreen extends Component {
  static navigationOptions = {
    title: 'Profile Set Up',
  
  };
  
  constructor(props) {
 
    super(props)

    this.state = {
      selected2: '',
      user:  this.props.navigation.state.params.username,
      bio:'',
      edu:'',
      jon:'',
      city:'',
      gender:'',
      image: 'https://cmkt-image-prd.freetls.fastly.net/0.1.0/ps/1909558/910/607/m1/fpnw/wm0/camera-thin-line-icon-01-.jpg?1479381787&s=1c160b37d6606127edc9dbffc2034e27',
      imageEncoded:'',
      age:''
 
    }}

    onValueChange2(value) {
      this.setState({
        selected2: value
      });
    }
    register = () =>{

      
    
  const { user }  = this.state;
  const { age }  = this.state;
  const { bio }  = this.state;
  const {imageEncoded } = this.state;
  const {selected2 } = this.state;
  const {edu } = this.state;
  const {job } = this.state;
  const {city} = this.state;

 // alert(imageEncoded);

  
  fetch('http://lightchat.panatechrwanda.tk/mobile/upload.php', {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({
  
           bio: bio,
           user: user,
           image: imageEncoded,
           gender: selected2,
           city:city,
           job:job,
           edu:edu,
           age:age
        
         })
        
       }).then((response) => response.json())
             .then((responseJson) => {
        
              if(responseJson === 1)
               {

                _storeData = async () => {
                  try {
                    await AsyncStorage.setItem('profileImage', imageEncoded);

                    await AsyncStorage.setItem('userId', user);
                  } catch (error) {
                    // Error saving data
                  }
                };
                _storeData();
              alert("Account setup finished");
              this.props.navigation.navigate('HomeScreen');
      
               }
               else{
        
                 Alert.alert(responseJson);
               }
        
             }).catch((error) => {
               console.error(error);
             });

            
   }

   askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // you would probably do something to verify that permissions
    // are actually granted, but I'm skipping that for brevity
  };
  
  render() {
    let { image } = this.state;
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
                <KeyboardAvoidingView  behavior="padding" enabled >
                <View style={styles.container}>
        <StatusBar barStyle="default" />

        {image &&
          <Image source={{ uri: image }} style={{ width: 150, height: 150, resizeMode: 'contain' }} />}
        <Text style={{color:'#6B97DA'}} onPress={this._pickImage} >Browse Photo</Text>
       
        <TextInput placeholder="Birth Year (1990)"  ref={input => { this.textInputs = input }} onChangeText={age => this.setState({age})} style={styles.TextInputStyle}/>  
        
        <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Choose your gender"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Male" value="1" />
                <Picker.Item label="Female" value="0" />

              </Picker>
            </Item>

<TextInput placeholder="Education"  ref={input => { this.textInputs = input }} onChangeText={edu => this.setState({edu})} style={styles.TextInputStyle}/>


          <TextInput placeholder="Job Title"  ref={input => { this.textInputs = input }} onChangeText={job => this.setState({job})} style={styles.TextInputStyle}/>
          
          <TextInput placeholder="Living City"  ref={input => { this.textInputs = input }} onChangeText={city => this.setState({city})} style={styles.TextInputStyle}/>
         
         
          <Textarea  placeholder="About You (Bio)"  ref={input => { this.textInputs = input }} onChangeText={bio => this.setState({bio})} style={styles.TextInputStyle}/>
       
          <Text style={{fontSize:14,color:'#000'}}> </Text> 
          <Button onPress={this.register}  block primary style={{backgroundColor:'#6B97DA'}}><Text>Finish</Text></Button>
  
      </View>
      </KeyboardAvoidingView>
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
    })
    
    //alert(manipulatorResult.base64);

    this.setState({imageEncoded :'data:image/png;base64,' + manipulatorResult.base64 });

    
    
  };

}
export default ProfileSettingsScreen

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
     
     TextComponentStyle: {
      fontSize: 20,
      color: "#000",
      textAlign: 'center', 
      marginBottom: 15
     }
});

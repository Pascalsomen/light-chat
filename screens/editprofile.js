import React from 'react';
import {Component} from 'react'
import { StyleSheet,ImageEditor,FlatList, ScrollView,  View,TextInput,  Alert,ActivityIndicator,StatusBar,Share,KeyboardAvoidingView,Clipboard,TouchableOpacity,Image,} from 'react-native';
import { Container, Content, List, Picker,  ListItem, InputGroup,Segment, Input, Icon, Item,Text, Button,Textarea,Grid,Col, Right } from 'native-base';
import * as Permissions from 'expo-permissions';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import {AsyncStorage} from 'react-native';
class EditProfile extends Component {
  static navigationOptions = {
    title: 'Edit Profile',
    header:null
  };
  
  constructor(props) {
 
    super(props)

    this.state = {
    //  selected2: null,
      // bio:'',
      // gender:'',
      // edu:'',
      // name:'',
      // job:'',
      // city:'',
      // age:'',
      // religion:'',
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
           age:age,
           religion:religion
        
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
        <Text style={styles.TextInputStyle}>Names : {item.names} <Text onPress={()=>this.props.navigation.navigate('EditScreen',{code:'name'})} style={{textAlign:"right", fontSize:12,color:'#007aff'}}>Edit</Text> </Text>

        <Text style={styles.TextInputStyle}>Birth Day : {item.bod}  <Text onPress={()=>this.props.navigation.navigate('EditScreen',{code:'bod'})} style={{textAlign:"right", fontSize:12,color:'#007aff'}}>Edit</Text> </Text>

        <Text style={styles.TextInputStyle}>My gender : {(item.gender==0)?
        
        <Text>Male</Text>
         :null}
         {(item.gender==1)?
        
        <Text>Female</Text>

         :null }
         
        <Text  onPress={()=>this.props.navigation.navigate('EditGenderScreen')} style={{textAlign:"right", fontSize:12,color:'#007aff'}}>Edit</Text>  </Text>

        <Text style={styles.TextInputStyle}>Education : {item.education}  <Text onPress={()=>this.props.navigation.navigate('EditScreen',{code:'education'})} style={{textAlign:"right", fontSize:12,color:'#007aff'}}>Edit</Text> </Text>

        <Text style={styles.TextInputStyle}>Job : {item.job}  <Text onPress={()=>this.props.navigation.navigate('EditScreen',{code:'job'})} style={{textAlign:"right", fontSize:12,color:'#007aff'}}>Edit</Text> </Text>

        <Text style={styles.TextInputStyle}>LIving City : {item.city} <Text  onPress={()=>this.props.navigation.navigate('EditScreen',{code:'city'})}style={{textAlign:"right", fontSize:12,color:'#007aff'}}>Edit</Text> </Text>

        <Text style={styles.TextInputStyle}>Religion : {item.religion} <Text onPress={()=>this.props.navigation.navigate('EditScreen',{code:'religion'})} style={{textAlign:"right", fontSize:12,color:'#007aff'}}>Edit</Text> </Text>

        <Text style={styles.TextInputStyle}>Bio : {item.bio}  <Text onPress={()=>this.props.navigation.navigate('EditScreen',{code:'bio'})} style={{textAlign:"right", fontSize:12,color:'#007aff'}} style={{textAlign:"right", fontSize:12,color:'#007aff'}}>Edit</Text> </Text>

         {/* <TextInput  placeholderTextColor = "#123"  ref={input => { this.textInputs = input }} v onChangeText={name => this.setState({name})} style={styles.TextInputStyle} />   
          <Text >Birth Year</Text>
          <TextInput placeholder={item.bod}  ref={input => { this.textInputs = input }} onChangeText={age => this.setState({age})} style={styles.TextInputStyle} />  
          <Text>Gender</Text>
        <Item picker>
        
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder={item.gender}
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Male" value="1" />
                <Picker.Item label="Female" value="0" />

              </Picker>
            </Item> 

<Text>Education</Text>
<TextInput  placeholder={item.edu}   placeholderTextColor = "#123" ref={input => { this.textInputs = input }} onChangeText={edu => this.setState({edu})} style={styles.TextInputStyle} />
  <Text>My Job</Text>
          <TextInput placeholder={item.job}   placeholderTextColor = "#123" ref={input => { this.textInputs = input }} onChangeText={job => this.setState({job})} style={styles.TextInputStyle} />
           <Text>Living City</Text>
          <TextInput placeholder={item.city}   placeholderTextColor = "#123" ref={input => { this.textInputs = input }} onChangeText={city => this.setState({city})} style={styles.TextInputStyle} />
          <Text>Your Religion</Text>  
          <TextInput placeholder={item.religion}   placeholderTextColor = "#123" ref={input => { this.textInputs = input }} onChangeText={religion => this.setState({religion})} style={styles.TextInputStyle} />
          <Text>About Me</Text>
          <Textarea  placeholder={item.bio}  placeholderTextColor = "#123" ref={input => { this.textInputs = input }} onChangeText={bio => this.setState({bio})} style={styles.TextInputStyle}/>
          <Text style={{fontSize:14,color:'#000'}}> </Text> 
          <Button onPress={this.register}  block primary style={{backgroundColor:'#6B97DA'}}><Text>Update</Text></Button> */}
         
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


}
export default EditProfile

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
    margin:10,
    borderColor:'white'
  
  },
  text:{
color:'white'
  },

  TextInputStyle: {
  
   // height: 40,
    width:280,
    margin:5,
    padding:10,
    borderWidth: 0,
    borderRadius:0,
    borderColor:'#D7D7D7',
    borderTopColor:'#fff',
    backgroundColor:'#e1e1e1',
    color:'black',
    
    

    },
     
     TextComponentStyle: {
      fontSize: 20,
      color: "#000",
      textAlign: 'center', 
      marginBottom: 15
     }
});

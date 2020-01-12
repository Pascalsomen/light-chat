
    import React from 'react';
    import {Component} from 'react'
    import { StyleSheet,ImageEditor,  View,TextInput, Alert,ActivityIndicator,StatusBar,Share,Clipboard,TouchableOpacity,Image,KeyboardAvoidingView, TextBase} from 'react-native';
    import { Container, Content, List, Picker,  ListItem, InputGroup, Input,Left,Right,Body, Icon, Item,Text,Header, Button, Textarea,Card,CardItem } from 'native-base';
    import * as Permissions from 'expo-permissions';
    import * as ImageManipulator from 'expo-image-manipulator';
    import * as ImagePicker from 'expo-image-picker';
    import {AsyncStorage} from 'react-native';
    class ChatImageScreen extends Component {
      static navigationOptions = {
        title: 'Send image',
        
      
      };
      
      constructor(props) {
     
        super(props)
    
        this.state = {
          user_id: this.props.navigation.state.params.receiver,
          user:  this.props.navigation.state.params.sender,
          chatcode:  this.props.navigation.state.params.chatcode,
          imageEncoded:'',
          image:''
       
     
        }}
    
        askPermissionsAsync = async () => {
          await Permissions.askAsync(Permissions.CAMERA);
          await Permissions.askAsync(Permissions.CAMERA_ROLL);
          // you would probably do something to verify that permissions
          // are actually granted, but I'm skipping that for brevity
        };



        componentDidMount() {
          this._pickImage();
         
            
         
        }
        



        Msg = () =>{



          const { user_id }  = this.state ;
          const { user }  = this.state ;
          const { message }  = this.state ;
          const { chatcode }  = this.state ;
          const {imageEncoded} = this.state;
        
          if(imageEncoded !=""){
          fetch('http://lightchat.panatechrwanda.tk/mobile/send_image.php', {
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
          image:imageEncoded
   
          })
          
          }).then((response) => response.json())
            .then((responseJson) => {
          
             if(responseJson === 1)
              {
          
                  //this.props.navigation.navigate('HomeScreen', { username: user });
       
          this.textInput.clear()
          this.props.navigation.goBack()
          this.setState({ message: "" });
          this.setState({ imageEncoded: "" });

              }
              else{
          
                Alert.alert(responseJson);
              }
          
            }).catch((error) => {
              console.error(error);
            });
          
          
          }
         }



    send = () =>{
    
          
        
      const { user }  = this.state;
      const { user_id }  = this.state
      const {imageEncoded } = this.state;
      const{chatcode} = this.state
  
     
    
   
      
      fetch('http://lightchat.panatechrwanda.tk/mobile/write.php', {
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
    
                        //await AsyncStorage.setItem('userId', user);
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
                    <View style={styles.container}>
         
    
            {(image!="")?
            <View>

            <Image source={{ uri: image }} style={{ width: null, flex:1, height: 400, resizeMode: 'contain' }} />
<KeyboardAvoidingView  behavior="padding" enabled >
<View>
<Card style={{backgroundColor:'transparent',borderColor:'#F6F6F6',borderRadius:0,margin:5}}>
<CardItem style={{backgroundColor:'#F6F6F6',borderColor:'#F6F6F6',borderRadius:0}}>
<TextInput  placeholder="Add Caption (optional)" ref={input => { this.textInput = input }} onChangeText={message => this.setState({message})} style={{width:'90%'}}/> 
<Text  style={{alignSelf:'center',padding:10}}  onPress={this.Msg}><Icon name="ios-send" style={{color:'black',fontSize:25}}/></Text>     
</CardItem>
</Card>
</View>

</KeyboardAvoidingView>
            </View>
            
           :null 
            }
            
           
           </View>

           
          
                    </Content>


                </Container>
        );
      }
    

    



    
      _pickImage = async () => {
        
       // alert("Iphone Testing...")
        await this.askPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          base64: true,
          aspect: [4, 4],
          quality: 1

        });
        
        if (result.cancelled) {
          console.log('got here');
          this.props.navigation.goBack()
          return;
        }
       // alert(result.uri);

        let resizedUri = await new Promise((resolve, reject) => {
          ImageEditor.cropImage(result.uri,
            {
              offset: { x: 0, y: 0 },
              size: { width: result.width, height: result.height },
              displaySize: { width: null,flex:1,height: 500 },
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
        this.setState({ image:resizedUri});
       
        
        
        const manipulatorResult = await ImageManipulator.manipulateAsync(result.uri, actions, {
          base64: true,
        })
        
        
    
        this.setState({imageEncoded :'data:image/png;base64,' + manipulatorResult.base64 });

        //alert(manipulatorResult.base64);
      
        
        
      };
    
    }
    export default ChatImageScreen
    
    const styles = StyleSheet.create({
      MainContainer:{
        backgroundColor:'#fff'
      },
      container: {
        flex: 1,
        borderWidth: 1,
        margin:5,
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
    

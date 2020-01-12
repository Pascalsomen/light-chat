
    import React from 'react';
    import {Component} from 'react'
    import { StyleSheet,ImageEditor,  View,TextInput, Alert,ActivityIndicator,StatusBar,Share,Clipboard,TouchableOpacity,Image,KeyboardAvoidingView, TextBase} from 'react-native';
    import { Container, Content, List, Picker,  ListItem, InputGroup, Input,Left,Right,Body, Icon, Item,Text,Header, Button, Textarea,Card,CardItem } from 'native-base';
    import * as Permissions from 'expo-permissions';
    import * as ImageManipulator from 'expo-image-manipulator';
    import * as ImagePicker from 'expo-image-picker';
    import {AsyncStorage} from 'react-native';
    import ImageView from 'react-native-image-view';
    class ChatViewImageScreen extends Component {
      static navigationOptions = {
        title: 'Image',
        header:null
        
      
      };
      
      constructor(props) {
     
        super(props)
    
        this.state = {
          image: this.props.navigation.state.params.image,
     
        }}
    
        



        componentDidMount() {
         
         
            
         
        }
        



        closeImage  = () => {

          this.props.navigation.goBack()
         // this.props.navigation.navigate('ChatScreen',{user_id:this.state.user,image:this.props.navigation.state.params.image,names:this.props.navigation.state.params.names, chatcode:this.state.chatcode})
        }

     
      
      render() {

        
        let { image } = this.state;
        const images = [
            {
                source: {
                    uri: image,
                },
                title: 'Paris',
                width: null,
                height: 500,
                flex:1,
            },
        ];
       
       
        return (
    <Container style={styles.MainContainer}>
                    <Content>
                    <View style={styles.container}>
 
    <ImageView
    images={images}
    imageIndex={0}
    isVisible={this.state.isImageViewVisible}
    onClose={this.closeImage}
    renderFooter={(currentImage) => (<View><Text> </Text></View>)}
/>
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
          //aspect: [4, 4],
        });
    
        
        
        if (result.cancelled) {
          console.log('got here');
          this.props.navigation.goBack()
          return;
        }
    
        let resizedUri = await new Promise((resolve, reject) => {
          ImageEditor.cropImage(result.uri,
            {
              offset: { x: 0, y: 0 },
              size: { width: result.width, height: result.height },
              //displaySize: { width: null,flex:1 height: 500 },
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
    
        
        const manipulatorResult = await ImageManipulator.manipulateAsync(resizedUri, actions, {
          base64: true,
        })
        
        
    
        this.setState({imageEncoded :'data:image/png;base64,' + manipulatorResult.base64 });
      
        
        
      };
    
    }
    export default ChatViewImageScreen
    
    const styles = StyleSheet.create({
      MainContainer:{
        backgroundColor:'#F6F6F6'
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
    

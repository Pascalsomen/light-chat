import React from 'react';
import {Component} from 'react'
import { StyleSheet, Image, View,ListView, FlatList, Alert, ActivityIndicator} from 'react-native';
import { Container,FooterTab,Left,Thumbnail,Body,Right,Footer,Header,Title,Item ,Content,Card,CardItem, List,ScrollableTab ,Tab, Tabs, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
import {AsyncStorage} from 'react-native';

class MachingPopPup extends Component {
  static navigationOptions = {
   title: 'Matching',
   header:null
  };
  constructor(props)
  {
 
    super(props);
 
    this.state = { 
    //  user:  this.props.navigation.state.params.username,
        loading: true,
        liked_user:this.props.navigation.state.params.username,
        user:'',
        image:''
    
    }
 
  }

  check = async () => {
   
      
    try {
      const {liked_user} = this.state;

      const value = await AsyncStorage.getItem('userId');

      const MyImage = await AsyncStorage.getItem('profileImage');
      this.setState({ image: MyImage });

      if (value !== null) {
        this.setState({ user: value })   
       return  fetch('http://lightchat.panatechrwanda.tk/mobile/mateched.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        user : value,
        liked : liked_user,
         
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
      
        
      }else{
         
          this.props.navigation.navigate('WelcomeScreen');
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  componentDidMount() {
    
    this.check();
    
}


  
    
  like (id) {
   
 
  
 
  }



  render() {
   const user = this.props.navigation.state.params.username;
   const { image } = this.state;
    return (
<Container>   


      <FlatList
        
        data={ this.state.data }
        renderItem={({item}) => 



        <View>
            
           
            <Card style={{padding:50,marginTop:40,marginBottom:0}}>
            
            <CardItem cardBody>


            <Text></Text>
            <Text></Text>
            
           <Thumbnail  source={{uri: image}} style={{height:130, width: null, flex: 1,borderRadius:20}}/>
           <Thumbnail source={{uri: item.profile_pic_1}} style={{height: 130, width: null, flex: 1,borderRadius:20}}/>
          </CardItem>
          <Text></Text>
           <Text style={{alignSelf:'center',fontSize:25,margin:10}}>Perfect Match</Text>
           <Text style={{alignSelf:'center',textAlign:'center',fontSize:15}}>You and {item.names}  liked each other! </Text>
       
           <Text></Text>
           <Button info block style={{alignSelf:'center',margin:5}} onPress={()=>this.props.navigation.navigate('ChatScreen',{user_id:item.user_id,image:item.profile_pic_1,names:item.names,chatcode:item.chat_code})}><Text>Start Chat</Text></Button>
           <Text></Text>

           <Text style={{color:'red',textAlign:"center"}} onPress={()=> this.props.navigation.goBack()}>Close</Text>
          </Card>
          </View>
              
     
          
        }

keyExtractor={(item, index) => index}
numColumns={1}

/>
            
        
                <Content>


        
                    <View style={styles.MainContainer}>
       
        
        
               </View>
                  

</Content>

          
            </Container>
    );
  }
}
export default MachingPopPup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeaderTitle:{
    color:'#000',
  
  },
  HeaderIcon:{
    color:'#000',
  },

  BodyIconDislike:{
    color:'#000',
    fontSize:30,
    alignItems:'flex-end'
  
  },
  BodyIconLike:{
    color:'#a80202',
    fontSize:30,
    alignItems:'flex-end',
    
  }
});

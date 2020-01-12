import React from "react";
import { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  InputGroup,
  Input,
  Icon,
  Text,
  Picker,
  Button
} from "native-base";
import { AsyncStorage } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
class LoginScreen extends Component {
  static navigationOptions = {
    title: "Login"
  };

  constructor(props) {
    super(props);

    this.state = {
      user: "",
      pass: ""
    };
  }
  Login = () => {
    const { user } = this.state;
    const { pass } = this.state;
    fetch("http://lightchat.panatechrwanda.tk/mobile/Login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: user,

        password: pass
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson === 1) {
          _storeData = async () => {
            try {
              await AsyncStorage.setItem("userId", user);
            } catch (error) {
              // Error saving data
            }
          };

          this.textInput.clear();
          this.textInputs.clear();
          _storeData();

          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "HomeScreen" })]
          });
          this.props.navigation.dispatch(resetAction);
          //  this.props.navigation.navigate('', { username: user });
        } else {
          Alert.alert(responseJson);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
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
            <Text></Text>

            <Text></Text>

            <Text style={{ fontSize: 14, color: "#000" }}>E-Mail / Phone </Text>
            <TextInput
              placeholder="@somen"
              ref={input => {
                this.textInputs = input;
              }}
              onChangeText={user => this.setState({ user })}
              style={styles.TextInputStyle}
            />

            <Text style={{ fontSize: 14, color: "#000" }}>Password </Text>

            <TextInput
              placeholder="Password"
              ref={input => {
                this.textInput = input;
              }}
              onChangeText={pass => this.setState({ pass })}
              style={styles.TextInputStyle}
              secureTextEntry={true}
            />

            <Text></Text>
            <Text note>
              Forgot Password ?{" "}
              <Text
                style={{ color: "red" }}
                onPress={() => this.props.navigation.navigate("AccountReset")}
              >
                Reset
              </Text>
            </Text>
            <Text></Text>
            <Button
              info
              block
              style={{ alignSelf: "center", margin: 5, width: 300 }}
              onPress={this.Login}
            >
              <Text>Login</Text>
            </Button>
            <Text></Text>
            <Text></Text>
            <Text note style={{ alignSelf: "center", margin: 5 }}>
              {" "}
              New Here?{" "}
              <Text
                style={{ color: "#000" }}
                onPress={() => this.props.navigation.navigate("WelcomeScreen")}
              >
                Create new account
              </Text>
            </Text>
          </View>
        </Content>
      </Container>
    );
  }
}
export default LoginScreen;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: "#fff"
  },
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderWidth: 1,
    margin: 20,
    borderColor: "white"
  },
  text: {
    color: "white"
  },

  TextInputStyle: {
    textAlign: "center",
    height: 40,
    width: 280,
    margin: 5,
    borderWidth: 1,
    borderRadius: 0,
    borderColor: "#D7D7D7",
    borderTopColor: "#fff",
    backgroundColor: "#fff",
    color: "black"
  },

  TextComponentStyle: {
    fontSize: 20,
    color: "#000",
    textAlign: "center",
    marginBottom: 15
  }
});

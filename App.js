import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer,NavigationActions } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './screens/home';
import  LandingScreen from './screens/landing';
import LoginScreen from './screens/login';
import RegisterScreen from './screens/register';
import WelcomeScreen from './screens/welcome';
import PhoneScreen from './screens/accountPhone';
import EmailScreen from './screens/accountEmail';
import VerifyScreen from './screens/verification';
import ProfileSettingsScreen from './screens/profilepicture';
import SettingsScreen from './screens/Settings';
import MachingPopPup from './screens/Matchpopup';
import changeProfileImage from './screens/changeprofile';
import MatchScreen from './screens/Matchlist';
import ChatScreen from './screens/chat';
import ChangePasswordScreen from './screens/change_password';
import AgeSettingScreen from './screens/agesettings';
import GenderSettingScreen from './screens/gendersettinngs';
import ViewProfileScreen from './screens/viewprofile';
import ChatImageScreen from './screens/send_image';
import AccountReset from './screens/accountReset';
import ResetVerifyScreen from './screens/reset_verification';
import ResetPasswordScreen from './screens/resetPass';
import ProfileScreen from './screens/Profile';
import ChatViewImageScreen from './screens/viewImage';
import ReportUserScreen from './screens/reporting';
import ContactScreen from './screens/contactus';
import DeleteAccount from './screens/deleteAccount';
import EditScreen from './screens/editScreen';
import EditGenderScreen from './screens/EditMyGender';
import ViewMessageProfileScreen from './screens/ViewProfileMessage';
import ProfileViewImageScreen from './screens/viewFullimage';

class App extends React.Component {
  render() {
    return (
     <AppNavigator/>
    );
  }
}
const AppNavigator = createStackNavigator({

  LandingScreen: LandingScreen,
  HomeScreen: HomeScreen,
  loginScreen: LoginScreen,
  RegisterScreen: RegisterScreen,
  WelcomeScreen:WelcomeScreen,
  PhoneScreen:PhoneScreen,
  EmailScreen:EmailScreen,
  VerifyScreen:VerifyScreen,
  ProfileSettingsScreen:ProfileSettingsScreen,
  SettingsScreen:SettingsScreen,
  MachingPopPup:MachingPopPup,
  changeProfileImage:changeProfileImage,
  MatchScreen:MatchScreen,
  ChatScreen:ChatScreen,
  ChangePasswordScreen:ChangePasswordScreen,
  AgeSettingScreen:AgeSettingScreen,
  GenderSettingScreen:GenderSettingScreen,
  ViewProfileScreen:ViewProfileScreen,
  ChatImageScreen:ChatImageScreen,
  AccountReset:AccountReset,
  ResetVerifyScreen:ResetVerifyScreen,
  ResetPasswordScreen:ResetPasswordScreen,
  ProfileScreen:ProfileScreen,
  ChatViewImageScreen:ChatViewImageScreen,
  ReportUserScreen:ReportUserScreen,
  ContactScreen:ContactScreen,
  DeleteAccount:DeleteAccount,
  EditScreen:EditScreen,
  EditGenderScreen:EditGenderScreen,
  ViewMessageProfileScreen:ViewMessageProfileScreen,
  ProfileViewImageScreen:ProfileViewImageScreen



  
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default createAppContainer(AppNavigator);
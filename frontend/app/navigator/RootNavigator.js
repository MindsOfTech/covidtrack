// import { Notifications } from 'expo';
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppNavigator from "./AppNavigator";
// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import LoginScreen from "./../screens/auth/LoginScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
// import ForgotPasswordScreen from "./../screens/auth/ForgotPasswordScreen";

const RootStackNavigator = createStackNavigator();

function RootStackNavigatorScreen() {
  return (
    <NavigationContainer>
      <RootStackNavigator.Navigator
        screenOptions={{
          headerTintColor: "#00B027",
          headerTitleStyle: { color: "black" },
          headerShown: false,
          gestureEnabled: false,
        }}
      >
        <RootStackNavigator.Screen name="Login" component={LoginScreen} />
        <RootStackNavigator.Screen name="Sign Up" component={SignupScreen} />
        <RootStackNavigator.Screen name="Main" component={AppNavigator} />
      </RootStackNavigator.Navigator>
    </NavigationContainer>
  );
}

export default class RootNavigator extends React.Component {
  //   componentDidMount() {
  //     this._notificationSubscription = this._registerForPushNotifications();
  //   }

  //   componentWillUnmount() {
  //     this._notificationSubscription && this._notificationSubscription.remove();
  //   }

  render() {
    return RootStackNavigatorScreen();
  }

  //   _registerForPushNotifications() {
  //     // Send our push token over to our backend so we can receive notifications
  //     // You can comment the following line out if you want to stop receiving
  //     // a notification every time you open the app. Check out the source
  //     // for this function in api/registerForPushNotificationsAsync.js
  //     registerForPushNotificationsAsync();

  //     // Watch for incoming notifications
  //     this._notificationSubscription = Notifications.addListener(
  //       this._handleNotification
  //     );
  //   }

  //   _handleNotification = ({ origin, data }) => {
  //     console.log(
  //       `Push notification ${origin} with data: ${JSON.stringify(data)}`
  //     );
  //   };
}

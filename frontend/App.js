import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./app/screens/SignIn";
import Onboarding1 from "./app/screens/Onboarding1";
import Statistics from "./app/screens/Statistics";
import MapsExp from "./app/screens/MapsExp";
import MapFull from "./app/screens/MapFull";
import MapsList from "./app/screens/MapsList";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AppNavigator from "./app/navigator/AppNavigator";
export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator></AppNavigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

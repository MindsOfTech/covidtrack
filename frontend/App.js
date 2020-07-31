import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./app/navigator/AppNavigator";
import SignIn from "./app/screens/SignIn";
import { HomeStackScreen, HomeScreen } from "./app/screens/Home";
import MapsList from "./app/screens/MapsList";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Checkup from "./app/screens/Checkup";
export default function App() {
  const SignInStack = createStackNavigator();

  return (
    <NavigationContainer>
      <SignInStack.Navigator>
        <SignInStack.Screen
          options={{ headerShown: false }}
          name="Sign In"
          component={SignIn}
        />
        <SignInStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </SignInStack.Navigator>
    </NavigationContainer>
  );
}
function Home() {
  const Tab = createBottomTabNavigator();
  const tabBarOptions = {
    // showLabel: false,
    activeTintColor: "#04d45b",
    inactiveTintColor: "#000",
    style: {
      backgroundColor: "#F1F0EE",
      paddingTop: 5,
    },
  };
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#00B027",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Checkup"
        component={Checkup}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={size} />
          ),
        }}
      />
      {/* <Tab.Screen
      name="Statistics"
      component={Statistics}
      options={({ navigation }) => ({
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons
            name="trending-up"
            color={color}
            size={size}
          />
        ),
      })}
    /> */}
      {/* <Tab.Screen
      name="Sign In"
      component={SignIn}
      options={({ navigation }) => ({
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="doctor" color={color} size={size} />
        ),
      })}
    /> */}
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

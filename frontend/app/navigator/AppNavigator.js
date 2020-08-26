import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeStackScreen from "./../screens/Home";
import Checkup from "../screens/Checkup";
import { DefaultTheme } from "@react-navigation/native";
import DefaultStyles from "./../config/styles";
const AppNavigatorTab = createBottomTabNavigator();

const tabBarOptions = {
  // showLabel: false,
  activeTintColor: "#04d45b",
  inactiveTintColor: DefaultStyles.colors.grey,
  style: {
    backgroundColor: "#FFFFFF",
    paddingTop: 5,
  },
  showLabel: false,
};

function AppNavigator() {
  return (
    <AppNavigatorTab.Navigator tabBarOptions={tabBarOptions}>
      <AppNavigatorTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name="home" color={color} size={size} />
            <FontAwesome5 name="home" size={size} color={color} />
          ),
        }}
      />
      <AppNavigatorTab.Screen
        name="Checkup"
        component={Checkup}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-nurse" size={size} color={color} />
          ),
        }}
      />
    </AppNavigatorTab.Navigator>
  );
}

export default AppNavigator;

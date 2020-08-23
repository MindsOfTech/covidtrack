import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeStackScreen } from "./../screens/Home";
import Checkup from "../screens/Checkup";

const AppNavigatorTab = createBottomTabNavigator();

const tabBarOptions = {
  // showLabel: false,
  activeTintColor: "#04d45b",
  inactiveTintColor: "#000",
  style: {
    backgroundColor: "#FFFFFF",
    paddingTop: 5,
  },
};

function AppNavigator() {
  return (
    <AppNavigatorTab.Navigator tabBarOptions={tabBarOptions}>
      <AppNavigatorTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <AppNavigatorTab.Screen
        name="Checkup"
        component={Checkup}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="doctor" color={color} size={size} />
          ),
        }}
      />
    </AppNavigatorTab.Navigator>
  );
}

export default AppNavigator;

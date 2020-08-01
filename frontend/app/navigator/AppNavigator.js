import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";

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

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Countries"
      component={MapsList}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="doctor" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/Home";
import MapsList from "../screens/MapsList";
import Statistics from "../screens/Statistics";
import Onboarding2 from "../screens/Onboarding2";
import Onboarding1 from "../screens/Onboarding1";
import SignIn from "../screens/SignIn";
import Map from "../screens/MapFull";

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  // showLabel: false,
  activeTintColor: "#1062FE",
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
      name="Cases"
      component={MapsList}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="plus" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Statistics"
      component={Statistics}
      options={({ navigation }) => ({
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="graphql" color={color} size={size} />
        ),
      })}
    />
    <Tab.Screen
      name="Map"
      component={Map}
      options={({ navigation }) => ({
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="graphql" color={color} size={size} />
        ),
      })}
    />
  </Tab.Navigator>
);

export default AppNavigator;

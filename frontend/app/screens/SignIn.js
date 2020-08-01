import React from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";

import AppBack1 from "../components/AppBack1";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import HomeStackScreen from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./../navigator/AppNavigator";
import { ScrollView } from "react-native-gesture-handler";

function SignIn(props) {
  return (
    <View>
      <KeyboardAvoidingView behavior="position" enabled>
        <AppBack1 style={styles.container}>
          <Text style={styles.title}>Covy</Text>
          <Text style={styles.subtitle}>Good health starts with you.</Text>
        </AppBack1>
        <AppTextInput
          autoCapitalise="none"
          autoCorrect={false}
          keyboardType="email-address"
          icon="email"
          placeholder="Your Email"
          textContentType="emailAddress"
        />
        <AppTextInput
          autoCapitalise="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Your Password"
          textContentType="emailAddress"
          secureTextEntry={true}
        />

        <AppButton
          title="Sign In"
          color="#59c26F"
          onPress={() => props.navigation.navigate("Home")}
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // backgroundColor: "red",
    alignItems: "flex-start",
    color: "white",
  },

  title: {
    fontWeight: "bold",
    fontSize: 80,
    textAlign: "left",
    marginTop: 50,
    color: "white",
    padding: 30,
  },
  subtitle: {
    fontWeight: "100",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 30,
    color: "white",
    marginRight: 50,
  },

  button: {
    color: "white",
    marginTop: "80%",
  },
});

export default SignIn;

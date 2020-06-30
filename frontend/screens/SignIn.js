import React from "react";
import { View, StyleSheet, Text } from "react-native";

import AppBack1 from "../components/AppBack1";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";


function SignIn(props) {
  return (
  <>
     
      <AppBack1 style={styles.container}>
        <Text style={styles.title}>Covy</Text>
        <Text style={styles.subtitle}>
          An App that tracks visitors in your country
        </Text>
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
      />

        <AppButton title="Sign In" color="#59c26F" />
     </>
  );
}

const styles = StyleSheet.create({
    container: {
      color: "white",
    },
  
    title: {
      fontWeight: "bold",
      fontSize: 80,
      alignSelf: "flex-end",
      alignItems: "flex-end",
      marginTop: 50,
      color: "white",
      padding: 50,
    },
    subtitle: {
      fontWeight: "100",
      fontSize: 15,
      alignSelf: "flex-end",
      alignItems: "flex-end",
      color: "white",
      marginRight: 50,
    },
  
    button: {
      color: "white",
      marginTop: "80%",
    },
  });

export default SignIn;

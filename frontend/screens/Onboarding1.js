import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import AppBack from "../components/AppBack";
import AppButton from "../components/AppButton";

function Onboarding1(props) {
  return (
    <>
      <AppBack style={styles.container}>
        <Text style={styles.title}>Covy</Text>
        <Text style={styles.subtitle}>
          An App that tracks visitors in your country
        </Text>
      </AppBack>

      <AppButton title="Get Started" color="#59c26F" />
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

export default Onboarding1;

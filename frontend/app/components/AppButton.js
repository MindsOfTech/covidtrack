import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";



function AppButton({ title, onPress, color = "green" }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color , }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    borderRadius: 40,
    flexDirection: "row",
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  text: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default AppButton;

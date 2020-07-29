import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Appcases({ icon, total, color = "blue", ...otherprops }) {
  return (
    <View style={(styles.element, { color: color }, { ...otherprops })}>
      <MaterialCommunityIcons
        name={icon}
        size={35}
        style={styles.text1}
        color={color}
      />

      <Text style={(styles.text1, { color: color })}>{total}</Text>
      <Text style={(styles.text2, { color: color })}>Cases</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  element: {
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    flex: 1,
  },

  text1: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    alignContent: "center",
    alignSelf: "auto",
  },
  text2: {
    alignItems: "center",
  },
  text3: {
    alignItems: "center",
    marginTop: 30,
  },
});

export default Appcases;

import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, iconColor, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={iconColor}
          style={styles.icon}
        />
      )}
      <TextInput style={[defaultStyles.text, {}]} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.secondary,
    borderRadius: 40,
    flexDirection: "row",
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
    shadowColor: "#000",
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;

import React from "react";
import { Text ,StyleSheet} from "react-native";



function AppText({ children, style, ...otherprops }) {
  return (
    <Text style={styles.text} {...otherprops}>
      {children}
    </Text>
  );
}
const styles = StyleSheet.create({
    text: {
     color:"black",
        fontSize: 18,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
      },
})
export default AppText;
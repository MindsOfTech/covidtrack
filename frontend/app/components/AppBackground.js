import * as React from "react";
import Svg, { Circle, Path, G, Defs } from "react-native-svg";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, Dimensions } from "react-native";

function AppBackground({ children, style }) {
  return (
    <Svg
      width={Dimensions.get("window").width}
      height={"500"}
      viewBox="0 0 375 477"
      fill="none"
      style={styles.screen}
    >
      <G filter="url(#prefix__filter0_d)">
        <Path
          d="M3.5 334.5C-32.5 292.1-31 36.167-15-35h405.774c15.5 68.333 3.826 291.2 12.226 332-29.5-7.5-3.726 43-12.226 62s-7.273 71.5-58.273 88S208.5 455 173.5 373.5s-125 14-170-39z"
          fill="#03A927"
        />
      </G>
      <View
        style={{
          paddingTop: 10,
        }}
      >
        {children}
      </View>
      <Defs></Defs>
    </Svg>
  );
}
const styles = StyleSheet.create({
  screen: {
    // paddingTop: Constants.statusBarHeight,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
  },
  view: {
    flex: 1,
  },
});
export default AppBackground;


import * as React from "react"
import Svg, { Circle, Path, G } from "react-native-svg"
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View } from "react-native";
function AppBack({ children, style }) {
  return (

  
    <Svg width={375} height={687} viewBox="0 0 375 687" fill="none"  style={[styles.screen, style]}>
      <G filter="url(#prefix__filter0_d)">
        <Path
          d="M3.5 544.5c-36-42.4-29-489.833-13-561h400.274C406.274 51.833 394.6 466.2 403 507c-29.5-7.5-3.726 43-12.226 62s-7.273 71.5-58.273 88S208.5 665 173.5 583.5s-125 14-170-39z"
          fill="#03A927"
        />
      </G>
      <View style={[styles.view, style]}>{children}</View>
    </Svg>
  )
}
const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
    
  },
});
export default AppBack;
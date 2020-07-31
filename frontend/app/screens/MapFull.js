import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppBack1 from "../components/AppBack1";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Appcases from "../components/AppCases";

import MapView, {
  Marker,
  Circle,
  Heatmap,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Callout,
} from "react-native-maps";
const points = [
  { latitude: 17.995147, longitude: -76.7846006, weight: 200 },
  { latitude: 17.996147, longitude: -76.7846006, weight: 200 },
  { latitude: 17.996147, longitude: -76.7846006, weight: 200 },
  { latitude: 17.997847, longitude: -76.7846006, weight: 200 },
  { latitude: 17.996947, longitude: -76.7846006, weight: 200 },
  { latitude: 17.996147, longitude: -76.7846006, weight: 200 },
  { latitude: 17.996147, longitude: -76.7846006, weight: 200 },
];
function MapFull(props) {
  return (
    // Try setting `flexDirection` to `column`.
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#E8FDED" }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          margin: 0,
          backgroundColor: "white",
          borderRadius: 0,
          overflow: "hidden",
        }}
      >
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 17.995147,
            longitude: -76.7846006,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // provider={PROVIDER_GOOGLE}
        >
          {/* <MapView.Heatmap
            points={points}
            opacity={0.4}
            radius={50}
            maxIntensity={100}
            gradientSmoothing={10}
            heatmapMode={"POINTS_DENSITY"}
          /> */}
          <MapView.Circle
            center={{
              latitude: 17.995147,
              longitude: -76.7846006,
            }}
            radius={1000}
            strokeWidth={2}
            strokeColor="#3399ff"
            fillColor="rgba(128,191,255, 0.72)"
          />
          <Marker
            coordinate={{
              latitude: 17.995147,
              longitude: -76.7846006,
            }}
            // image={require("../assets/marker.png")}
            // opacity={0.1}
            title={"High risk"}
            pinColor={"#59c26F"}
            description={"275 reported cases in this area"}
          />
          <MapView.Circle
            center={{
              latitude: 18.416665,
              longitude: -77.1166662,
            }}
            radius={1000}
            strokeWidth={2}
            strokeColor="#3399ff"
            fillColor="rgba(128,191,255, 0.72)"
          />
          <Marker
            coordinate={{
              latitude: 18.416665,
              longitude: -77.1166662,
            }}
            // image={require("../assets/marker.png")}
            // opacity={0.1}
            pinColor={"#59c26F"}
            title={"High risk"}
            description={"290 reported cases in this area"}
          />
        </MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "white",
  },

  mapStyle: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});

export default MapFull;

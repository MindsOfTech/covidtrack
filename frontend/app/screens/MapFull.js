import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppBack1 from "../components/AppBack1";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Appcases from "../components/AppCases";

import MapView, { Marker, Circle } from "react-native-maps";

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
        >
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

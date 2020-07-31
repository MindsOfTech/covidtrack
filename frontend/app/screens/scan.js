import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Scan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    console.log("before " + scanned);
    setScanned(true);
    var obj = JSON.parse(data);
    console.log(scanned);
    alert("User Identified: " + obj._id);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#59c26F",
          position: "absolute",
          opacity: 0.2,
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 400, height: 400 }}
          source={require("../assets/scan.png")}
        ></Image>
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <View
          style={{
            backgroundColor: "white",
            padding: 10,
            width: "45%",
            alignSelf: "center",
            borderRadius: 20,
            marginBottom: 20,
            zIndex: 1000,
          }}
        >
          <TouchableOpacity
            style={{ zIndex: 1000 }}
            onPress={() => setScanned(false)}
          >
            <Text
              style={{
                color: "#59c26F",
                fontSize: 20,
                textAlign: "center",
                fontWeight: "bold",
                zIndex: 1000,
              }}
            >
              Tap to Scan
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

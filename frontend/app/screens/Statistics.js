import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppBack1 from "../components/AppBack1";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Appcases from "../components/AppCases";

import MapView, { Marker, Circle } from "react-native-maps";

function Statistics(props) {
  return (
    // Try setting `flexDirection` to `column`.
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#E8FDED" }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          height: "30%",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "green",
        }}
      >
        <View style={styles.card5}>
          <Text style={styles.textsalut}>Statistics</Text>
          <MaterialCommunityIcons name="qrcode-scan" size={30} color="white" />
          <Image
            style={styles.image}
            source={require("../assets/profile.jpg")}
          />
        </View>
      </View>

      <View
        style={{
          width: "96%",
          height: "35%",
          margin: 7,
          backgroundColor: "white",
          borderRadius: 15,
          overflow: "hidden",

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <MapView style={styles.mapStyle} />
      </View>

      <View
        style={{
          width: "100%",
          height: "35%",
          marginBottom: 50,
        }}
      >
        <View style={styles.card6}>
          <Text>Updated : Today</Text>
          <Text style={styles.sbutton}>Jaimaica</Text>
        </View>
        <View style={styles.card}>
          <Appcases icon="google-earth" total="345" color="#0084F8"></Appcases>

          <Appcases icon="google-earth" total="345" color="#00B027"></Appcases>
          <Appcases icon="google-earth" total="345" color="#FF0F0F"></Appcases>
        </View>

        <View style={styles.card2}>
          <Appcases icon="human-male" total="345" color="#9B51E0"></Appcases>
          <Appcases icon="human-female" total="345" color="#2D9CDB"></Appcases>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "white",
  },

  textsalut: {
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
    borderColor: "white",
    borderWidth: 2,
  },
  texthead: {
    fontWeight: "bold",
    margin: 5,
  },
  textmiddle: {
    fontWeight: "100",
    margin: 5,
  },

  mapStyle: {
    width: "100%",
    height: 280,

    borderRadius: 55,

    overflow: "hidden",
  },
  card: {
    flexDirection: "row",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  card6: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  card5: {
    flexDirection: "row",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,

    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    height: 80,
  },

  card4: {
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    height: 250,
    marginTop: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  card2: {
    flexDirection: "row",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  card3: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: 500,
    width: 500,
  },

  button: {
    alignContent: "flex-end",
    justifyContent: "flex-end",
    width: 100,
  },

  sbutton: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "green",
    color: "white",
    padding: 2,
    borderRadius: 15,
  },
  buttonactive: {
    backgroundColor: "green",
    color: "white",
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 2,
  },

  buttoninactive: {
    backgroundColor: "#c4c4c4",
    color: "white",
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
    justifyContent: "center",
    margin: 2,
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

export default Statistics;

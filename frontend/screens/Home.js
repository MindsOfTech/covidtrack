import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppBack1 from "../components/AppBack1";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Appcases from "../components/AppCases";

import MapView, { Marker, Circle } from "react-native-maps";

function Home(props) {
  return (
    // Try setting `flexDirection` to `column`.
    <View
      style={{ flex: 1, flexDirection: "column", backgroundColor: "#E8FDED" }}
    >
      <View
        style={{ width: "100%", height: "3%", backgroundColor: "green" }}
      ></View>

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
          <Text style={styles.textsalut}>Good Evening Jessie</Text>
          <MaterialCommunityIcons name="qrcode-scan" size={30} color="white" />
          <Image
            style={styles.image}
            source={require("../assets/profile.jpg")}
          />
        </View>

        <View style={styles.card}>
          <Appcases icon="google-earth" total="345" color="#0084F8"></Appcases>

          <Appcases icon="google-earth" total="345" color="#00B027"></Appcases>
          <Appcases icon="google-earth" total="345" color="#FF0F0F"></Appcases>
        </View>

        <View style={styles.card2}>
          <Text>Updated : Today</Text>
          <Text style={styles.sbutton}>View All Stats</Text>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          height: "25%",
          marginBottom: 30,
          backgroundColor: "green",
        }}
      >
        <MapView style={styles.mapStyle} />
      </View>

      <View style={{ width: "100%", height: "36%" }}>
        <View style={styles.card4}>
          <Text style={styles.texthead}>Island Curfew</Text>
          <View
            style={{
              flexDirection: "row-reverse",
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              margin: 10,
              alignItems: "flex-end",
              alignContent: "center",
            }}
          >
            <Text style={styles.buttonactive}>MoH</Text>
            <Text style={styles.buttoninactive}>Local</Text>
            <Text style={styles.buttoninactive}>Verified</Text>
          </View>

          <Text style={styles.textmiddle}>May 10, 2020</Text>
          <Text style={styles.textlast}>
            The 12-hour curfew which currently runs from 6pm to 6am each day
            will be adjusted as of Wednesday, May 13 to reflect the new times of
            8pm to 5am each day until Sunday May 24, the day before the Labour
            Day holiday which will be observed on Monday, May 25
          </Text>
          <Text
            style={{
              flexDirection: "row-reverse",
              alignSelf: "flex-end",
              justifyContent: "flex-end",
              margin: 10,
              alignItems: "flex-end",
              alignContent: "center",
            }}
          >
            read more
          </Text>
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
    width: "95%",
    height: 170,
    marginTop: 15,
    borderRadius: 55,
    margin: 10,
    marginBottom: 10,
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
    justifyContent: "space-between",
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

export default Home;

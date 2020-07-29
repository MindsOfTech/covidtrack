import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  Button,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppBack1 from "../components/AppBack1";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import Appcases from "../components/AppCases";

import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import MapView, { Marker, Circle } from "react-native-maps";
import MapFull from "./MapFull";
import Checkup from "./Checkup";
import Scan from "./scan";

function Home({ navigation }) {
  return (
    // Try setting `flexDirection` to `column`.
    <View style={{ flex: 1 }}>
      <View style={styles.card5}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.textsalut}>Good Evening Jessie</Text>
        <View
          style={{
            width: 100,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Scan")}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Checkup")}>
            <Image
              style={styles.image}
              source={require("../assets/profile.jpg")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <View style={styles.content}>
          <View
            style={{
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
            <View style={styles.card}>
              <Appcases
                icon="emoticon-neutral"
                total="345"
                color="#0084F8"
              ></Appcases>

              <Appcases
                icon="emoticon-happy"
                total="345"
                color="#00B027"
              ></Appcases>
              <Appcases
                icon="emoticon-sad"
                total="345"
                color="#FF0F0F"
              ></Appcases>
            </View>

            <View style={styles.card2}>
              <Text>Updated : Today</Text>
              <View style={styles.sbutton}>
                <Text>View All Stats</Text>
              </View>
            </View>
          </View>

          <View>
            <MapView
              style={styles.mapStyle}
              initialRegion={{
                latitude: 17.995147,
                longitude: -76.7846006,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={() => navigation.navigate("Map")}
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
              <View style={styles.overlay}>
                <Text>Jamaica Covid Coverage</Text>
              </View>
            </MapView>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                will be adjusted as of Wednesday, May 13 to reflect the new
                times of 8pm to 5am each day until Sunday May 24, the day before
                the Labour Day holiday which will be observed on Monday, May 25
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
                will be adjusted as of Wednesday, May 13 to reflect the new
                times of 8pm to 5am each day until Sunday May 24, the day before
                the Labour Day holiday which will be observed on Monday, May 25
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
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <HomeStack.Screen name="Checkup" component={Checkup} />
      <HomeStack.Screen name="Map" component={MapFull} />
      <HomeStack.Screen name="Scan" component={Scan} />
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    color: "white",
  },
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    left: 5,
    textAlign: "center",
    padding: 10,
    backgroundColor: "white",
    width: 180,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textsalut: {
    fontWeight: "bold",
    color: "white",
    fontSize: 22,
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
    height: 190,
    marginTop: 15,
    borderRadius: 10,
    margin: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  content: {
    paddingTop: 20,
    paddingBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
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
  },

  card5: {
    flexDirection: "row",
    backgroundColor: "green",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    height: 100,
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
    width: Dimensions.get("window").width - 20,
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
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingRight: 10,
    borderRadius: 100,
    textAlignVertical: "center",
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

export default HomeStackScreen;

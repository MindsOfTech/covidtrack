import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CovidStatsMinimized from "../components/CovidStatsMinimized";
import NewsItem from "../components/NewsItem";
import AllNews from "../components/AllNews";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import MapView, { Marker, Circle } from "react-native-maps";
import MapFull from "./MapFull";
import Checkup from "./Checkup";
import Statistics from "./Statistics";
import Visited from "./Visited";
import ModalScan from "../components/QrScanner";
import AppButton from "../components/AppButton";
import defaultStyles from "./../config/styles";
import * as firebase from "firebase";
import { connect } from "react-redux";
import { fetchUserRefresh } from "./../redux/actions/setUserActions";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

class HomeScreen extends React.Component {
  onSignoutPress = () => {
    firebase.auth().signOut();
  };
  componentDidMount() {
    this.props.dispatch(fetchUserRefresh());
  }

  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.card5}>
          <Text style={styles.textsalut}>Hello {this.props.user.user}</Text>
          <View
            style={{
              width: 100,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ModalScan></ModalScan>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Visited")}
            >
              <Image
                style={styles.image}
                source={require("../assets/profile.jpg")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <View style={styles.content}>
            <View>
              <Text style={styles.sectiontitle}>Covid Overview</Text>
              <View
                style={[
                  styles.card,
                  {
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                  },
                ]}
              >
                <CovidStatsMinimized></CovidStatsMinimized>
                <View style={styles.card2}>
                  <Text>Updated : Today</Text>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Statistics")}
                  >
                    <View style={styles.sbutton}>
                      <Text
                        style={{
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlignVertical: "center",
                          textAlign: "center",
                        }}
                      >
                        View All Stats
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={styles.sectiontitle}>Activity Map</Text>
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
              <MapView
                style={styles.mapStyle}
                initialRegion={{
                  latitude: 17.995147,
                  longitude: -76.7846006,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={() => this.props.navigation.navigate("Map")}
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
              <View style={styles.overlay}>
                <Text
                  style={{
                    color: "black",
                    alignSelf: "center",
                    textAlignVertical: "center",
                  }}
                >
                  Jamaica Covid Coverage
                </Text>
              </View>
            </View>

            <AllNews></AllNews>
          </View>
          <AppButton
            title="Logout"
            color={defaultStyles.colors.red}
            onPress={this.onSignoutPress}
          />
        </ScrollView>
      </View>
    );
  }
}

const HomeStack = createStackNavigator();

function HomeStackScreen({ navigation, route }) {
  // Hide bottom nav bar on nested screens
  // if (route.state && route.state.routeNames[route.state.index] === "Map" )  ---> use to hide bottom nav bar on a specific screen
  if (route.state && route.state.index > 0) {
    navigation.setOptions({ tabBarVisible: false });
  } else {
    navigation.setOptions({ tabBarVisible: true });
  }
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: "#00B027",
        headerTitleStyle: { color: "black" },
      }}
    >
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={connect(mapStateToProps)(HomeScreen)}
      />
      <HomeStack.Screen name="Checkup" component={Checkup} />
      <HomeStack.Screen name="Map" component={MapFull} />
      <HomeStack.Screen name="Statistics" component={Statistics} />
      <HomeStack.Screen name="Visited" component={Visited} />
    </HomeStack.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    color: "white",
  },
  sectiontitle: {
    marginTop: 20,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    top: 15,
    left: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 35,
    backgroundColor: "white",
    width: 180,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 10,
    marginLeft: 10,
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
    fontWeight: "400",
    margin: 5,
    fontStyle: "italic",
  },
  textlast: {
    fontWeight: "400",
    lineHeight: 25,
    margin: 5,
  },

  mapStyle: {
    width: "95%",
    height: 230,
    marginTop: 15,
    borderRadius: 10,
    margin: 10,
    marginBottom: 10,
    overflow: "hidden",
    padding: 0,
  },
  content: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  card: {
    marginTop: 15,
    flexDirection: "column",
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  card5: {
    flexDirection: "row",
    backgroundColor: defaultStyles.colors.primary,
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
    marginBottom: 10,

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
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 25,
    paddingLeft: 10,
    paddingRight: 10,
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
  tag: {
    marginLeft: 5,
    backgroundColor: "#59c26F",
    borderRadius: 5,
  },
  button: {
    alignContent: "flex-end",
    justifyContent: "flex-end",
    width: 100,
  },

  sbutton: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: defaultStyles.colors.primary,
    color: "white",
    paddingLeft: 10,
    paddingRight: 10,
    height: 25,
    paddingRight: 10,
    borderRadius: 8,
    textAlignVertical: "center",
  },
  buttonactive: {
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
  intl: {
    backgroundColor: "#cc0000",
  },
  cdc: {
    backgroundColor: "#005eaa",
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
  centeredView: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 0,
  },
  modalView: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "80%",
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    alignSelf: "flex-end",
    borderRadius: 5,
    padding: 5,
    elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    lineHeight: 25,
    textAlign: "left",
  },
});

// export { HomeScreen, HomeStackScreen };
export default HomeStackScreen;

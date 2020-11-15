import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    news: state.news,
    loading: state.loading,
    error: state.error,
  };
};

class ModalScan extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      hasPermission: null,
      temp: 0,
      scanned: false,
      test: {
        cmpid: "",
        user: "",
        intent: "",
      },
    };
  }
  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      this.getPermission();
    }
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    if (this._isMounted) {
      this.setState({ hasPermission: status === "granted" });
    }
  };

  logLocation = () => {
    // fetch("http://covy-backend.mybluemix.net/log/psmith", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     cmpid: this.state.cmpid,
    //   }),
    // });
    // this.setState({ modalVisible: !this.state.modalVisible });
  };
  logUser = async () => {
    try {
      //Assign the promise unresolved first then get the data using the json method.
      //   const responseApi = await fetch(
      //     `http://covy-backend.mybluemix.net/symptoms/${test.user}`
      //   );
      //   const responseJson = await responseApi.json();
      this.setState(
        {
          temp: 101,
          //   temp: responseJson.results[responseJson.results.length - 1].report.lastTemp
        },
        () => {
          if (this.state.temp > 98) {
            Alert.alert(
              "Unsafe!",
              `Your last temperature is ${this.state.temp}°`,
              [
                { text: "OK", onPress: () => this.close() },
                {
                  text: "Scan again",
                  onPress: () => this.setState({ scanned: false }),
                },
              ],
              {
                cancelable: false,
              }
            );
          } else {
            Alert.alert(
              "Safe!",
              `Your last temperature is normal, at ${this.state.temp}°`,
              [
                {
                  text: "OK",
                  onPress: () =>
                    this.setState({ modalVisible: !this.state.modalVisible }),
                },
                {
                  text: "Scan again",
                  onPress: () => this.setState({ scanned: false }),
                },
              ],
              {
                cancelable: false,
              }
            );
          }
        }
      );
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  };
  close = () => {};
  handleBarCodeScanned = ({ type, data }) => {
    test = JSON.parse(data);

    if (test.intent == "locationqr") {
      this.setState({ scanned: true });
      this.logLocation();

      Alert.alert(
        "Thanks for checking in!",
        "Enjoy your day",
        [
          { text: "OK", onPress: () => this.close() },
          {
            text: "Scan again",
            onPress: () => this.setState({ scanned: false }),
          },
        ],
        {
          cancelable: false,
        }
      );
    }
    if (test.intent == "userqr") {
      this.setState({ scanned: true });

      this.logUser();
    }
  };

  render() {
    if (this.state.hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={styles.newscard}>
        <TouchableOpacity
          onPress={() => {
            this.setState((prevState) => ({
              modalVisible: !prevState.modalVisible,
            }));
          }}
          style={styles.cta}
        >
          <MaterialCommunityIcons name="qrcode-scan" size={25} color="white" />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 0,
                  paddingBottom: 10,
                  position: "absolute",
                  zIndex: 500,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    position: "absolute",
                    left: 0,
                    top: 0,
                    backgroundColor: "white",
                    padding: 25,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      alignItems: "flex-start",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        color: "black",
                      }}
                      onPress={() => {
                        this.setState((prevState) => ({
                          modalVisible: !prevState.modalVisible,
                        }));
                      }}
                    >
                      <FontAwesome5
                        name="arrow-left"
                        size={22}
                        color="black"
                      ></FontAwesome5>
                    </TouchableOpacity>
                    <Text style={styles.textHeader}>
                      Scan QR code to check in
                    </Text>
                    <Text style={styles.textStyle}></Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  width: "100%",
                  height: Dimensions.get("window").height,
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
                onBarCodeScanned={
                  this.state.scanned ? undefined : this.handleBarCodeScanned
                }
                style={StyleSheet.absoluteFillObject}
              />

              {this.state.scanned && (
                <View
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    width: "45%",
                    alignSelf: "center",
                    borderRadius: 20,
                    marginBottom: 20,
                    zIndex: 1000,
                    position: "absolute",
                    bottom: 0,
                  }}
                >
                  <TouchableOpacity
                    style={{ zIndex: 1000 }}
                    onPress={() => this.setState({ scanned: false })}
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
                      Scan again
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  sectiontitle: {
    // marginTop: 20,
    // paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 25,
    fontWeight: "bold",
  },
  newscard: {
    flexDirection: "column",
  },
  texthead: {
    fontWeight: "bold",
    margin: 5,
  },
  date: {
    fontWeight: "400",
    margin: 5,
    fontStyle: "italic",
  },
  snippet: {
    fontWeight: "400",
    lineHeight: 25,
    margin: 5,
  },
  Intl: {
    backgroundColor: "#cc0000",
  },
  CDC: {
    backgroundColor: "#005eaa",
  },
  tag: {
    marginLeft: 5,
    backgroundColor: "#59c26F",
    borderRadius: 5,
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
    height: "96%",
    backgroundColor: "white",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    paddingTop: 10,
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
    alignSelf: "center",
  },
  textHeader: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center",
  },
  modalText: {
    marginBottom: 15,
    lineHeight: 25,
    textAlign: "left",
  },
  cta: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingBottom: 10,
    justifyContent: "space-between",
    fontWeight: "bold",
  },
  ctaText: {
    paddingRight: 10,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps, null)(ModalScan);

import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
  Button,
  Alert,
  Image,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

function ModalScan(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [temp, setTemp] = useState(0);
  const [scanned, setScanned] = useState(false);
  var test = {
    cmpid: "",
    user: "",
    intent: "",
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const logLocation = () => {
    fetch("http://covy-backend.mybluemix.net/log/psmith", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cmpid: test.cmpid,
      }),
    });
    // setModalVisible(!modalVisible);
  };
  const logUser = async () => {
    // alert(test.user);

    try {
      //Assign the promise unresolved first then get the data using the json method.
      const responseApi = await fetch(
        `http://covy-backend.mybluemix.net/symptoms/${test.user}`
      );
      const responseJson = await responseApi.json();
      setTemp(
        responseJson.results[responseJson.results.length - 1].report.lastTemp
      );
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  };
  const close = () => {
    setModalVisible(!modalVisible);
    // setScanned(false);
  };
  const handleBarCodeScanned = ({ type, data }) => {
    test = JSON.parse(data);

    if (test.intent == "locationqr") {
      setScanned(true);
      logLocation();

      Alert.alert(
        "Thanks for checking in!",
        "Enjoy your day",
        [
          { text: "OK", onPress: () => close() },
          { text: "Scan again", onPress: () => setScanned(false) },
        ],
        {
          cancelable: false,
        }
      );
    }
    if (test.intent == "userqr") {
      setScanned(true);
      logUser();
      if (temp > 98) {
        Alert.alert(
          "Unsafe!",
          `Your last temperature is ${temp}°`,
          [
            { text: "OK", onPress: () => close() },
            { text: "Scan again", onPress: () => setScanned(false) },
          ],
          {
            cancelable: false,
          }
        );
      } else {
        Alert.alert(
          "Safe!",
          `Your last temperature is normal, at ${temp}°`,
          [
            { text: "OK", onPress: () => setModalVisible(!modalVisible) },
            { text: "Scan again", onPress: () => setScanned(false) },
          ],
          {
            cancelable: false,
          }
        );
      }
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.newscard}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.cta}
      >
        <MaterialCommunityIcons name="qrcode-scan" size={25} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert("Modal has been closed.");
        // }}
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
                      setModalVisible(!modalVisible);
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
                  position: "absolute",
                  bottom: 0,
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
export default ModalScan;

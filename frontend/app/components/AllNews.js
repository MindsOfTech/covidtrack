import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  StatusBar,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { MaterialCommunityIcons } from "@expo/vector-icons";
function AllNews(props) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.newscard}>
      <StatusBar barStyle="dark-content" />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={styles.cta}
      >
        <Text style={styles.sectiontitle}>Recent News</Text>
        <Text style={styles.ctaText}>View all</Text>
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
                paddingTop: 22,
                paddingBottom: 10,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 10,
                  top: 15,
                }}
              >
                <TouchableOpacity
                  style={{
                    color: "black",
                    // backgroundColor: "#59c26F",
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <MaterialCommunityIcons
                    name="keyboard-backspace"
                    size={25}
                    color="black"
                    sty
                  />
                  <Text style={styles.textStyle}>Done</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.sectiontitle}>Recent News</Text>
            </View>

            <ScrollView>{props.content}</ScrollView>
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
    height: "100%",
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
export default AllNews;

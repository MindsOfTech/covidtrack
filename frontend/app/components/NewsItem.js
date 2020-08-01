import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function NewsItem(props) {
  const [modalVisible, setModalVisible] = useState(false);
  var taglist = props.tags.map((info, index) => (
    <View
      key={index}
      style={info.verified == true ? [styles.tag, styles[info.name]] : null}
    >
      <Text style={styles.buttonactive}>{info.name}</Text>
    </View>
  ));
  return (
    <View style={styles.newscard}>
      <Text style={styles.texthead}>{props.title}</Text>
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
        {taglist}
      </View>

      <Text style={styles.date}>{props.date}</Text>
      <Text style={styles.snippet}>{props.snippet} ...</Text>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={{
          flexDirection: "row-reverse",
          alignSelf: "flex-end",
          justifyContent: "flex-end",
          margin: 10,
          alignItems: "flex-end",
          alignContent: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          read more
        </Text>
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
            <Text
              style={{
                ...styles.texthead,
                alignSelf: "flex-start",
                marginTop: 5,
                marginBottom: 10,
                marginLeft: 0,
              }}
            >
              {props.title}
              <Text style={styles.date}> - {props.date}</Text>
            </Text>
            <ScrollView>
              <Text style={styles.modalText}>{props.content}</Text>
            </ScrollView>

            <TouchableOpacity
              style={{
                ...styles.openButton,
                color: "black",
              }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  newscard: {
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
export default NewsItem;

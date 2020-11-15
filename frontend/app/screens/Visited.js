import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { fetchUserLog } from "./../redux/actions/setUserLogActions";
import { fetchQr } from "./../redux/actions/setQrActions";

const mapStateToProps = (state) => {
  return {
    userlog: state.userlog,
    qr: state.qr,
  };
};
class Visited extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserLog("camirrickets"));
    this.props.dispatch(fetchQr("camirrickets"));
  }

  renderDate(args) {
    var date = args.split(":")[0].split("/");
    var formatted = date[2] + "-" + date[1] + "-" + date[0];
    var d = new Date(formatted);
    return (
      d.toString().slice(0, 15) +
      ` @ ${args.split(":")[1]}:${args.split(":")[2]}`
    );
  }
  render() {
    console.log(this.props);

    const error = this.props.userlog.error;
    const loading = this.props.userlog.loading;
    const data = this.props.userlog.userlog;
    const image = this.props.qr.qr;

    if (error || typeof data == "object") {
      return (
        <View style={styles.errorContainer}>
          <FontAwesome5 name="sad-cry" color={"red"} size={30}></FontAwesome5>
          <View style={{ width: 20 }}></View>
          <Text>There was an error loading userlog</Text>
        </View>
      );
    }
    if (loading) {
      return (
        <View style={styles.loaderContainer}>
          <Image
            style={styles.loader}
            source={require("./../assets/loader.gif")}
          />
        </View>
      );
    }
    let qri = (
      <Image
        source={{
          uri: image || "https://via.placeholder.com/300/09f/fff.png",
        }}
        style={{ height: 300, width: 300 }}
      ></Image>
    );
    let places = [];
    for (let i = 0; i < data.DateTimeVisited.length; i++) {
      places.push(
        <View key={i} style={{ flex: 1, padding: 30 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons name="map-marker" size={25} />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                paddingLeft: 15,
              }}
            >
              {data.CompanyName[i]}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 15,
            }}
          >
            <MaterialCommunityIcons name="calendar" size={25} />
            <Text
              style={{
                paddingLeft: 15,
                fontSize: 20,
                textAlign: "center",
              }}
            >
              {this.renderDate(data.DateTimeVisited[i])}
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            paddingBottom: 20,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Places {data.username} visited
        </Text>
        <ScrollView style={{}}>
          <View
            style={{
              flex: 1,
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {qri}
            {places}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default connect(mapStateToProps, null)(Visited);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 23,
    backgroundColor: "white",
    minHeight: "100%",
  },
  loader: { width: 50, height: 50 },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
    padding: 10,
    height: 40,
    borderColor: "#59c26F",
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: "#59c26F",
    padding: 10,
    margin: 15,
    height: 40,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
  },
});

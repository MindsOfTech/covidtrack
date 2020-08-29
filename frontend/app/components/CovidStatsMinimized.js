import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { fetchStats } from "./../redux/actions/statsActions";

const mapStateToProps = (state) => {
  return {
    stats: state.stats,
    loading: state.loading,
    error: state.error,
  };
};
class CovidStatsMinimized extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchStats());
  }
  render() {
    const error = this.props.stats.error;
    const loading = this.props.stats.loading;
    const stats = this.props.stats.stats;

    if (error) {
      return (
        <View style={styles.errorContainer}>
          <FontAwesome5 name="sad-cry" color={"red"} size={30}></FontAwesome5>
          <View style={{ width: 20 }}></View>
          <Text>There was an error loading data</Text>
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
    return (
      <View style={styles.card}>
        <View style={styles.element}>
          <FontAwesome
            name="group"
            size={35}
            style={styles.text1}
            color="#0084F8"
          />
          <Text style={styles.text1}>
            {/* toLocaleString() doesn't work on android */}
            {stats.cases ? stats.cases.toLocaleString() : 0}
          </Text>
          <Text style={styles.text2}>Confirmed</Text>
        </View>
        <View style={styles.element}>
          <FontAwesome
            name="heartbeat"
            size={35}
            style={styles.text1}
            color="#00B027"
          />

          <Text style={styles.text1}>
            {stats.recovered ? stats.recovered.toLocaleString() : 0}
          </Text>
          <Text style={styles.text2}>Recovered</Text>
        </View>
        <View style={styles.element}>
          <FontAwesome5
            name="skull"
            size={35}
            style={styles.text1}
            color="#FF0F0F"
          />

          <Text style={styles.text1}>
            {stats.deaths ? stats.deaths.toLocaleString() : 0}
          </Text>
          <Text style={styles.text2}>Deaths</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  element: {
    alignItems: "center",
    justifyContent: "space-between",
    textAlignVertical: "center",
    flex: 1,
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
  card: {
    marginTop: 15,
    flexDirection: "row",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  text1: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    alignContent: "center",
    alignSelf: "auto",
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 25,
  },
  text2: {
    alignItems: "center",
  },
  text3: {
    alignItems: "center",
    marginTop: 30,
  },
});
export default connect(mapStateToProps, null)(CovidStatsMinimized);

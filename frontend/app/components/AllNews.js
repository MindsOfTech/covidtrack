import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { fetchNews } from "./../redux/actions/newsActions";
import { connect } from "react-redux";
import NewsItem from "./NewsItem";
const mapStateToProps = (state) => {
  return {
    news: state.news,
    loading: state.loading,
    error: state.error,
  };
};

class AllNews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchNews());
  }

  render() {
    const error = this.props.news.error;
    const loading = this.props.news.loading;
    const news = this.props.news.news;
    if (error) {
      return (
        <View style={styles.errorContainer}>
          <FontAwesome5 name="sad-cry" color={"red"} size={30}></FontAwesome5>
          <View style={{ width: 20 }}></View>
          <Text>There was an error loading news</Text>
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
    const loadNews = () => {
      return news.map((info, index) => (
        <NewsItem
          key={index}
          title={info.title}
          date={info.date}
          snippet={info.snippet}
          content={info.content}
          tags={info.tags}
        />
      ));
    };

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
          <Text style={styles.sectiontitle}>Recent News</Text>
          <Text style={styles.ctaText}>View all</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
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
                  justifyContent: "space-between",
                  padding: 25,
                }}
              >
                <View>
                  <TouchableOpacity
                    style={{
                      color: "black",
                      // backgroundColor: "#59c26F",
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
                </View>
                <Text style={styles.sectiontitle}>Recent News</Text>
                <Text style={styles.sectiontitle}></Text>
              </View>

              <ScrollView>{loadNews()}</ScrollView>
            </View>
          </View>
        </Modal>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {loadNews()}
        </ScrollView>
      </View>
    );
  }
}
export default connect(mapStateToProps, null)(AllNews);
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

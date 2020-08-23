const COVID_STATS_ENDPOINT =
  "https://corona.lmao.ninja/v2/countries/Jamaica?strict&query%20";

export default (async function fetchCovidStatsAsync() {
  // return covid stats from endpoint
  return fetch(COVID_STATS_ENDPOINT, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((responseJson) => {
      //   TODO: update store
    })
    .catch((error) => {
      console.log("error");
    });
});

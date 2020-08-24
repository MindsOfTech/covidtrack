import ApiKeys from "./../../constants/ApiKeys";

export function fetchNews() {
  const d = new Date();
  const DATE = d.getDate();
  const NEWS_ENDPOINT = `http://newsapi.org/v2/top-headlines?q=covid-19&from=2020-07-${DATE}&sources=cnn,bbc-news&language=en&sortBy=publishedAt&apiKey=${ApiKeys.NewsApiKey}`;

  return (dispatch) => {
    dispatch(fetchNewsBegin());
    return fetch(NEWS_ENDPOINT)
      .then((res) => res.json())
      .then((json) => {
        var result = [];
        for (let i = 0; i < json.articles.length; i++) {
          var data = {
            title: json.articles[i].title,
            date: "July 10, 2020",
            snippet: json.articles[i].description.substring(0, 150),
            content: json.articles[i].content,
            tags: [
              { name: "Verified", verified: true },
              { name: "Intl", verified: true },
              {
                name: json.articles[i].source.name,
                verified: true,
              },
            ],
          };
          result.push(data);
        }

        dispatch(fetchNewsSuccess(result));
        return result;
      })
      .catch((error) => handleErrors(dispatch, error));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(dispatch, error) {
  console.log(error);
  dispatch(fetchNewsFailure(error));

  return error;
}

export const FETCH_NEWS_BEGIN = "FETCH_NEWS_BEGIN";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";

export const fetchNewsBegin = () => ({
  type: FETCH_NEWS_BEGIN,
});

export const fetchNewsSuccess = (news) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: news,
});

export const fetchNewsFailure = (error) => ({
  type: FETCH_NEWS_FAILURE,
  payload: error,
});

export function fetchQr(user) {
  const QR_ENDPOINT = `http://covy-backend.mybluemix.net/qrUser/${user}`;

  return (dispatch) => {
    dispatch(fetchQrBegin());
    return fetch(QR_ENDPOINT)
      .then((res) => res.blob())
      .then((blob) => {
        let imageData = URL.createObjectURL(blob);
        dispatch(fetchQrSuccess(imageData));
        return imageData;
      })
      .catch((error) => handleErrors(dispatch, error));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(dispatch, error) {
  dispatch(fetchQrFailure(error));

  return error;
}

export const FETCH_QR_BEGIN = "FETCH_QR_BEGIN";
export const FETCH_QR_SUCCESS = "FETCH_QR_SUCCESS";
export const FETCH_QR_FAILURE = "FETCH_QR_FAILURE";

export const fetchQrBegin = () => ({
  type: FETCH_QR_BEGIN,
});

export const fetchQrSuccess = (qr) => ({
  type: FETCH_QR_SUCCESS,
  payload: qr,
});

export const fetchQrFailure = (error) => ({
  type: FETCH_QR_FAILURE,
  payload: error,
});

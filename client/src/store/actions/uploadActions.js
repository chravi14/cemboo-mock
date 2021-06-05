import axios from "axios";

export const postUploadData = (postData, apiUrl) => (dispatch) => {
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  console.log(apiUrl);
  dispatch(showLoader(true));
  return axios
    .post(apiUrl, postData, config)
    .then((response) => {
      alert("The file is successfully uploaded");
      console.log(response.data);
      dispatch(getUploadData());
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUploadData = () => (dispatch) => {
  console.log("Get upload data action called");
  dispatch(showLoader(true));
  return axios
    .get("/api/videos/uploads")
    .then((res) => {
      dispatch({
        type: "SET_UPLOADS_DATA",
        payload: res.data,
      });
      dispatch(showLoader(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const showLoader = (loaderStatus) => (dispatch) => {
  dispatch({
    type: "SET_LOADER",
    payload: loaderStatus,
  });
};

import Axios from "axios";

const setAuthToken = (token) => {
  //console.log("Hi sandip..." + token);

  if (token) {
    Axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete Axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;

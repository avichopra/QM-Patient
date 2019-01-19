import axios from "axios";
import config from "../config/index";
const callApi = (
  method,
  reqUrl,
  data = {},
  headers = {
    "content-type": "application/json",
    Accept: "application/json"
  }
) => {
  return new Promise((resolve, reject) => {
    let url = `${config.SERVER_URL}/${reqUrl}`;
    console.log(url, "data", data, "method", method);
    let options = {
      method,
      url,
      data,
      headers
    };
    axios({ ...options })
      .then(response => resolve(response))
      .catch(error => {
        reject(error);
      });
  });
};
export { callApi };

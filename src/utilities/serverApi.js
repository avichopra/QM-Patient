import axios from 'axios';
import config from '../config/index';
import * as Storage from '../utilities/asyncStorage';
import store from '../utilities/store';
const callApi = (
  method,
  reqUrl,
  data = {},
  headers = {
    'content-type': 'application/json',
    Accept: 'application/json'
  }
) => {
  return new Promise((resolve, reject) => {
    let url = `${config.SERVER_URL}/${reqUrl}`;
    // if (method === 'get') {
    //   Storage.get('token').then(data => {
    //     headers = { ...headers, authorization: `Bearer ${data}` };
    //     axios({ ...options })
    //       .then(response => resolve(response))
    //       .catch(error => {
    //         reject(error);
    //       });
    //   });
    // }

    console.log(
      url,
      'data',
      data,
      'method',
      method,
      'token',
      'header',
      headers
    );
    let options = {
      method,
      url,
      data,
      headers
    };
    if (method === 'get') delete options['data'];
    axios({ ...options })
      .then(response => {
        console.log('inside callApi response', response);
        resolve(response);
      })
      .catch(error => {
        //  console.log("error inside callApi",error)
        if (error.response != undefined && error.response.status === 401) {
          console.log('status 401');
          Storage.remove('token');
          Storage.remove('user');
          store
            .getInstance()
            .getKey('Login')
            .navigate('Login');
        }
        reject(error);
      });
  });
};
export { callApi };

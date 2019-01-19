import { AsyncStorage } from "react-native";
export let set = (key, object) => {
  return new Promise(function(resolve, reject) {
    if (object === undefined) {
      reject(new Error("storage item value required"));
    } else {
      console.log("Value", object);
      AsyncStorage.setItem(key, JSON.stringify(object))
        .then(resolve)
        .catch(reject);
    }
  });
};

export let get = key => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key)
      .then(value => {
        // let object = getJSONObject(value);
        resolve(object);
      })
      .catch(reject);
  });
};

import Axios from "../Axios.config";

export function sendMessage(payload) {
  return new Promise((resolve, reject) => {
    Axios.post("/message", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllMessages(payload) {
  return new Promise((resolve, reject) => {
    Axios.get(`/message/${payload}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

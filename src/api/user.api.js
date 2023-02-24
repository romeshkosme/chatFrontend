import Axios from "../Axios.config";

export function searchUser(payload) {
  return new Promise((resolve, reject) => {
    Axios.get(`/user?username=${payload}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

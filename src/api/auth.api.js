import Axios from "../Axios.config";

export function login(payload) {
  return new Promise((resolve, reject) => {
    Axios.post("/login", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function register(payload) {
  return new Promise((resolve, reject) => {
    Axios.post("/register", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

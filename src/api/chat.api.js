import Axios from "../Axios.config";

export function createGet(payload) {
  return new Promise((resolve, reject) => {
    Axios.post("/chat", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getAllChat() {
  return new Promise((resolve, reject) => {
    Axios.get("/chat")
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function createGroup(payload) {
  return new Promise((resolve, reject) => {
    Axios.post("/chat/group", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function addToGroup(payload) {
  return new Promise((resolve, reject) => {
    Axios.put("/chat/add-to-group", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function removeFromGroup(payload) {
  return new Promise((resolve, reject) => {
    Axios.put("/chat/remove-from-group", payload)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

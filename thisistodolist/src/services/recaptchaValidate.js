import axios from "axios";

export default {
  validate(params) {
    return new Promise((resolve, reject) => {
      axios
          .post("./recapcha", params)
          .then(response => {
            if (response.data.hasErrors) {
              reject(response.data.message);
            } else {
              resolve(response.data);
            }
          })
          .catch(error => {
            if (error.response.data.hasOwnProperty("")) {
              reject(error.response.data.message);
            } else {
              reject(error.message);
            }
          });
    });
  }
};

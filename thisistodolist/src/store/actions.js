import axios from "axios";

export default {
  syncData: async ({commit}) => {
    try {
      let data = (await axios.get("/lists")).data;
      commit("delItemFinished");
      commit("delItemUnfinished");
      commit("cleanItemTrashcan");
      for (let i = 0; i < data.length; i++) {
        if (data[i].deleted) {
          //deleted -> true : inTrashcan
          commit("pushItemTrashcan", data[i]);
        } else {
          if (data[i].completed) {
            //completed -> true : finished
            commit("pushItemFinished", data[i], 0);
          } else {
            //completed -> false : unfinished
            commit("pushItemUnfinished", data[i], 0);
          }
        }
      }
    } catch (e) {
      console.log(e + "\nerror@Vuex.action.sync_data\n");
    }
  },
  addNewItemUnfinished: async ({commit, state}, text) => {
    let encrypted = data => {
      let sha256 = require("js-sha256").sha256;
      return sha256(data);
    };
    let data = {
      author: state.userinfo.id,
      uid: encrypted(text + Date.now()),
      completed: false,
      deleted: false,
      content: text
    };
    try {
      await axios.post("/lists", data);
      commit("pushItemUnfinished", data, 0);
    } catch (e) {
      console.log(e + "\nerror@Vuex.action.addNewItemUnfinished\n");
    }
  },
  testAddNewItemUnfinished: ({commit, state}, text) => {
    let encrypted = data => {
      let sha256 = require("js-sha256").sha256;
      return sha256(data);
    };
    let data = {
      author: state.userinfo.id,
      uid: encrypted(text + Date.now()),
      completed: false,
      deleted: false,
      content: text
    };
    commit("pushItemUnfinished", data, 0);
  },
  TestSyncData: ({commit}) => {
    commit("delItemFinished");
    commit("delItemUnfinished");
    commit("cleanItemTrashcan");
    commit(
        "pushItemUnfinished",
        {
          author: "String",
          uid: "String2",
          completed: false,
          deleted: false,
          content: "gg"
        },
        0
    );
  }
};
/*

{author:'String',uid:'String',completed:'[true/false]',deleted:'[true/false]',content:'String'}

*/

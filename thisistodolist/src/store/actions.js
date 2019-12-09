import axios from "axios";

export default {
  delItem({ commit, state }, data) {
    if (data.type === "unfin") {
      for (let i = 0; i < state.todo.unfinished.length; i++) {
        let transferBox = state.todo.unfinished[i];
        if (data.data[`${transferBox.uid}`][0].isActive === true) {
          commit("popItemUnfinished", i--);
          commit("pushItemTrashcan", transferBox);
        }
      }
    } else if (data.type === "fin") {
      for (let i = 0; i < state.todo.finished.length; i++) {
        let transferBox = state.todo.finished[i];
        if (data.data[`${transferBox.uid}`][0].isActive === true) {
          commit("popItemFinished", i--);
          commit("pushItemTrashcan", transferBox);
        }
      }
    } else if (data.type === "full") {
      for (let i = 0; i < state.todo.unfinished.length; i++) {
        let transferBox = state.todo.unfinished[i];
        if (data.data[`${transferBox.uid}`][0].isActive === true) {
          commit("popItemUnfinished", i--);
          commit("pushItemTrashcan", transferBox);
        }
      }
      for (let j = 0; j < state.todo.finished.length; j++) {
        let transferBox = state.todo.finished[j];
        if (data.data[`${transferBox.uid}`][0].isActive === true) {
          commit("popItemFinished", j--);
          commit("pushItemTrashcan", transferBox);
        }
      }
    } else if (data.type === "tra") {
      for (let i = 0; i < state.trashcan.length; i++) {
        let transferBox = state.trashcan[i];
        if (data.data[`${transferBox.uid}`][0].isActive === true) {
          commit("popItemTrashcan", i--);
        }
      }
    }
  },
  itemSelectedChange: ({ commit }, data) => {
    commit("changeItemStatus", data);
  },
  setCurrentStatus: ({ commit }, data) => {
    commit("setStatus", data);
  },
  syncData: async ({ commit }) => {
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
  addNewItem: async ({ commit, state }, dataPack) => {
    let data = {
      author: state.userinfo.username,
      uid: require("js-sha256").sha256(dataPack.text + Date.now()),
      completed: dataPack.type,
      deleted: false,
      content: dataPack.text,
      selected: false
    };
    try {
      await axios.post("/lists", JSON.stringify(data));
      commit(dataPack.type ? "pushItemFinished" : "pushItemUnfinished", {
        data: data,
        index: 0
      });
    } catch (e) {
      console.log(e + "\nerror@Vuex.action.addNewItem\n");
    }
  },
  testAddNewItem: ({ commit, state }, dataPack) => {
    let data = {
      author: state.userinfo.username,
      uid: require("js-sha256").sha256(dataPack.text + Date.now()),
      completed: dataPack.type,
      deleted: false,
      content: dataPack.text,
      selected: false
    };
    commit(dataPack.type ? "pushItemFinished" : "pushItemUnfinished", {
      data: data,
      index: 0
    });
  }
};
/*

{author:'String',uid:'String',completed:'[true/false]',deleted:'[true/false]',content:'String'}

*/

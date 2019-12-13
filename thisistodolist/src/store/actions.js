import axios from "axios";

export default {
  changeConfig({ commit }, data) {
    commit("updateConfig", data);
  },
  selectionHandler({ dispatch, state }, data) {
    //data:{listType:[Object],actions:[name:String,act:{Json}]}
    let list;
    if (data.listType === "unfin") {
      list = state.todo.unfinished;
    } else if (data.listType === "fin") {
      list = state.todo.finished;
    } else if (data.listType === "tra") {
      list = state.trashcan;
    }
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < state.componentsConfig.selected.length; j++) {
        if (state.componentsConfig.selected[j] === list[i].uid) {
          data.actions.act.pos = i--;
          data.actions.act.uidPos = j--;
          dispatch(data.actions.name, data.actions.act);
          break;
        }
      }
    }
  },
  setConfigForInputarea({ commit, state, dispatch }, data) {
    state.componentsConfig.selected.pop();
    let tmpItem;
    if (data.name === "unfin") {
      tmpItem = state.todo.unfinished[data.pos];
    } else if (data.name === "fin") {
      tmpItem = state.todo.finished[data.pos];
    }
    dispatch("changeConfig", {
      name: "inputAreaMissionConfig",
      value: {
        title: "編輯項目",
        content: tmpItem.content,
        type: tmpItem.completed,
        classes: "edit",
        itemPos: { list: data.name, pos: data.pos },
        item: tmpItem
      }
    });
  },
  reDelItem({ commit, state }, data) {
    let transferBox = state.trashcan[data.pos];
    transferBox.deleted = false;
    commit("popItemTrashcan", data.pos);
    commit(transferBox.completed ? "pushItemFinished" : "pushItemUnfinished", {
      data: transferBox,
      index: 0
    });
    state.componentsConfig.selected.splice(data.uidPos, 1);
  },
  delItem({ commit, state }, data) {
    if (data.name === "unfin") {
      let transferBox = state.todo.unfinished[data.pos];
      commit("popItemUnfinished", data.pos);
      commit("pushItemTrashcan", transferBox);
    }
    if (data.name === "fin") {
      let transferBox = state.todo.finished[data.pos];
      commit("popItemFinished", data.pos);
      commit("pushItemTrashcan", transferBox);
    }
    if (data.name === "tra") {
      commit("popItemTrashcan", data.pos);
    }
    state.componentsConfig.selected.splice(data.uidPos, 1);
  },
  setCurrentStatus: ({ commit }, data) => {
    commit("setStatus", data);
  },
  syncData: async ({ commit }) => {
    try {
      let data = JSON.parse(
        (
          await axios.post(
            "/query",
            {
              query: `
                 query{
                     me{
                         username
                         email
                         nickname
                         pictureUrl
                         verified
                         userLevel
                         todos{
                           id
                           sort
                           content
                           completed
                           deleted
                           private
                           locked
                         }
                       }
                     }
                    `,
              variables: {}
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
        ).data["data"]["me"]
      );
      commit("delItemFinished");
      commit("delItemUnfinished");
      commit("cleanItemTrashcan");
      commit("setUserInfo", {
        username: data.username,
        user: data.nickname,
        email: data.email,
        pic: data.pictureUrl,
        type: data.userLevel,
        verified: data.verified
      });
      for (let i = 0; i < data.todos.length; i++) {
        if (data.todos[i].deleted) {
          //deleted -> true : inTrashcan
          commit("pushItemTrashcan", data.todos[i]);
        } else {
          if (data.todos[i].completed) {
            //completed -> true : finished
            commit("pushItemFinished", data.todos[i], 0);
          } else {
            //completed -> false : unfinished
            commit("pushItemUnfinished", data.todos[i], 0);
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
      content: dataPack.text
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
      content: dataPack.text
    };
    commit(dataPack.type ? "pushItemFinished" : "pushItemUnfinished", {
      data: data,
      index: 0
    });
  }
};

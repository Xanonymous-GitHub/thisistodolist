import axios from "axios";

export default {
  changeConfig({ commit }, data) {
    commit("updateConfig", data);
  },
  selectionHandler({ dispatch, state }, data) {
    //data:{listType:[Object],actions:[name:String,act:{Json}]}
    //data:{iFrom:"",iTo:{list:"",pos:int},actions:{}}
    let list,
      dataPackage = {
        idList: state.componentsConfig.selected,
        items: [],
        hopeActions: data.action
      };
    if (data.iFrom === "unfin") {
      list = state.todo.unfinished;
    } else if (data.iFrom === "fin") {
      list = state.todo.finished;
    } else if (data.iFrom === "tra") {
      list = state.trashcan;
    }
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < state.componentsConfig.selected.length; j++) {
        if (state.componentsConfig.selected[j] === list[i].id) {
          dataPackage.items.splice(0, 0, {
            item: list[i],
            itemPos: {
              originPlace: { list: data.iFrom, pos: i },
              newPlace: { list: data.iTo.list, pos: data.iTo.pos || i }
            }
          });
          break;
        }
      }
    }
    dispatch("changeItem", dataPackage);
  },
  changeItem: async ({ commit, state }, dataPack) => {
    // dataPack:{
    // idList:[],
    // items:[
    //   {
    //     item={$item},
    //     itemPos:{
    //       originPlace:{
    //         list:"",
    //         pos:0
    //       },
    //       newPlace:{
    //         list:"",
    //         pos:0
    //       }
    //     }
    //   }
    // ],
    // hopeActions:{
    //      content:"",
    //      completed:Boolean,
    //      deleted:Boolean,
    //      local:Boolean,
    //      sort:int
    //      locked:Boolean
    // }
    // }
    try {
      // let responseData = (
      //   await axios.post(
      //     "/query",
      //     {
      //       query: `
      //            mutation {
      //              changeTodos(input: {
      //                id: ${dataPack.idList} ,
      //                content:${dataPack.hopeActions.content ||
      //                  dataPack.items[i].item.content},
      //                completed:${dataPack.hopeActions.completed ||
      //                  dataPack.items[i].item.completed},
      //                deleted:${dataPack.hopeActions.deleted ||
      //                  dataPack.items[i].item.deleted},
      //                private:${dataPack.hopeActions.local ||
      //                  dataPack.items[i].item.local},
      //                sort:${dataPack.hopeActions.sort ||
      //                  dataPack.items[i].item.sort},
      //                locked:${dataPack.hopeActions.locked ||
      //                  dataPack.items[i].item.locked}
      //              }) {
      //                count
      //              }
      //            }
      //               `
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "application/json"
      //       }
      //     }
      //   )
      // ).data["data"]["changeTodos"]["count"];
      // if (
      //   responseData === undefined ||
      //   responseData === null ||
      //   responseData !== dataPack.items.Length
      // ) {
      //   throw new Error("mutation Error");
      // }
      for (let i = 0; i < dataPack.items.length; i++) {
        console.log("D");
        if (
          dataPack.items[i].itemPos.originPlace.list ===
          dataPack.items[i].itemPos.newPlace.list
        ) {
          if (
            dataPack.items[i].itemPos.originPlace.pos ===
            dataPack.items[i].itemPos.newPlace.pos
          ) {
            console.log("A");
            console.log(dataPack.items[i].item);
            dataPack.items[i].item = {
              id: dataPack.items[i].item.id,
              content:
                dataPack.hopeActions.content || dataPack.items[i].item.content,
              completed:
                dataPack.hopeActions.completed ||
                dataPack.items[i].item.completed,
              deleted:
                dataPack.hopeActions.deleted || dataPack.items[i].item.deleted,
              local: dataPack.hopeActions.local || dataPack.items[i].item.local,
              sort: dataPack.hopeActions.sort || dataPack.items[i].item.sort,
              locked:
                dataPack.hopeActions.locked || dataPack.items[i].item.locked
            };
            console.log(dataPack.items[i].item);
          } else {
            //  2.same list but sort is change
            console.log("B");
            let transferBox,
              originP = dataPack.items[i].itemPos.originPlace,
              newP = dataPack.items[i].itemPos.newPlace;
            if (originP.list === "tra") {
              transferBox = state.trashcan[originP.pos];
              commit("popItemTrashcan", originP.pos);
              state.trashcan.splice(newP.pos - 1, 0, transferBox);
            } else if (originP.list === "fin") {
              transferBox = state.todo.finished[originP.pos];
              commit("popItemFinished", originP.pos);
              state.todo.finished.splice(newP.pos - 1, 0, transferBox);
            } else if (originP.list === "unfin") {
              transferBox = state.todo.unfinished[originP.pos];
              commit("popItemUnfinished", originP.pos);
              state.todo.unfinished.splice(newP.pos - 1, 0, transferBox);
            }
          }
        } else {
          //  3.different  list
          console.log("C");
          let transferBox,
            originP = dataPack.items[i].itemPos.originPlace,
            newP = dataPack.items[i].itemPos.newPlace;
          //抽取
          if (originP.list === "tra") {
            transferBox = state.trashcan[originP.pos];
            commit("popItemTrashcan", originP.pos);
          } else if (originP.list === "fin") {
            transferBox = state.todo.finished[originP.pos];
            commit("popItemFinished", originP.pos);
          } else if (originP.list === "unfin") {
            transferBox = state.todo.unfinished[originP.pos];
            commit("popItemUnfinished", originP.pos);
          }
          //置入
          if (newP.list === "tra") {
            commit("pushItemTrashcan", transferBox);
          } else if (newP.list === "fin") {
            commit("pushItemFinished", transferBox);
          } else if (newP.list === "unfin") {
            commit("pushItemUnfinished", transferBox);
          }
        }
      }
    } catch (e) {
      console.log(e + "\nerror@Vuex.action.changeItem\n");
    }
    state.componentsConfig.selected = [];
  },
  // changeCompleted({ commit, state }, data) {
  //   if (data.name === "unfin") {
  //     let transferBox = state.todo.unfinished[data.pos];
  //     transferBox.completed = true;
  //     commit("popItemUnfinished", data.pos);
  //     commit("pushItemFinished", transferBox);
  //   } else if (data.name === "fin") {
  //     let transferBox = state.todo.finished[data.pos];
  //     transferBox.completed = false;
  //     commit("popItemFinished", data.pos);
  //     commit("pushItemUnfinished", transferBox);
  //   }
  //   state.componentsConfig.selected.splice(data.uidPos, 1);
  // },
  setConfigForInputarea({ state, dispatch }) {
    let tmpItem = 0,
      list = "",
      pos = 0;
    for (let i = 0; i < state.todo.unfinished.length; i++) {
      if (state.todo.unfinished[i].id === state.componentsConfig.selected[0]) {
        tmpItem = state.todo.unfinished[i];
        pos = i;
        list = "unfin";
        break;
      }
    }
    for (let i = 0; i < state.todo.finished.length; i++) {
      if (state.todo.finished[i].id === state.componentsConfig.selected[0]) {
        tmpItem = state.todo.finished[i];
        pos = i;
        list = "fin";
        break;
      }
    }
    dispatch("changeConfig", {
      name: "inputAreaMissionConfig",
      value: {
        title: "編輯項目",
        content: tmpItem.content,
        type: tmpItem.completed,
        classes: "edit",
        itemPos: { list: list, pos: pos },
        item: tmpItem
      }
    });
  },
  // reDelItem({ commit, state }, data) {
  //   let transferBox = state.trashcan[data.pos];
  //   transferBox.deleted = false;
  //   commit("popItemTrashcan", data.pos);
  //   commit(
  //     transferBox.completed ? "pushItemFinished" : "pushItemUnfinished",
  //     transferBox
  //   );
  //   state.componentsConfig.selected.splice(data.uidPos, 1);
  // },
  // delItem({ commit, state }, data) {
  //   if (data.name === "unfin") {
  //     let transferBox = state.todo.unfinished[data.pos];
  //     commit("popItemUnfinished", data.pos);
  //     commit("pushItemTrashcan", transferBox);
  //   }
  //   if (data.name === "fin") {
  //     let transferBox = state.todo.finished[data.pos];
  //     commit("popItemFinished", data.pos);
  //     commit("pushItemTrashcan", transferBox);
  //   }
  //   if (data.name === "tra") {
  //     commit("popItemTrashcan", data.pos);
  //   }
  //   state.componentsConfig.selected.splice(data.uidPos, 1);
  // },
  setCurrentStatus: ({ commit }, data) => {
    commit("setStatus", data);
  },
  syncData: async ({ commit }) => {
    try {
      let data = (
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
      ).data["data"]["me"];
      if (data === undefined || data === null) {
        throw new Error("mutation Error");
      }
      commit("delItemFinished");
      commit("delItemUnfinished");
      commit("cleanItemTrashcan");
      commit("setUserInfo", {
        username: data.username,
        nickname: data.nickname,
        email: data.email,
        pic: data.pictureUrl,
        type: data.userLevel,
        verified: data.verified
      });
      for (let i = 0; i < data.todos.length; i++) {
        if (data.todos[i].deleted) {
          commit("pushItemTrashcan", data.todos[i]);
        } else {
          if (data.todos[i].completed) {
            commit("pushItemFinished", data.todos[i], 0);
          } else {
            commit("pushItemUnfinished", data.todos[i], 0);
          }
        }
      }
    } catch (e) {
      //show error dialog message box**
      console.log(e + "\nerror@Vuex.action.sync_data\n");
    }
  },
  addNewItem: async ({ commit, state }, dataPack) => {
    try {
      // let data = (
      //   await axios.post(
      //     "/query",
      //     {
      //       query: `
      //             mutation {
      //               createTodo(
      //                 input: { content: "${dataPack.text}", completed: ${dataPack.type}, private: true, locked: false }
      //               ) {
      //                 id
      //               }
      //             }
      //             `,
      //       variables: {}
      //     },
      //     {
      //       headers: {
      //         "Content-Type": "application/json"
      //       }
      //     }
      //   )
      // ).data["data"]["createTodo"];
      // if (data === undefined || data === null) {
      //   throw new Error("mutation Error");
      // }
      // data["id"]
      let dataRe = {
        author: state.userinfo.username,
        id: require("js-sha256").sha256(dataPack.text + Date.now()),
        completed: dataPack.type,
        deleted: false,
        content: dataPack.text,
        local: true,
        sort: 0,
        locked: false
      };
      commit(dataPack.type ? "pushItemFinished" : "pushItemUnfinished", dataRe);
    } catch (e) {
      console.log(e + "\nerror@Vuex.action.addNewItem\n");
    }
  }
};

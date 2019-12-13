export default {
  pushItemFinished(state, data) {
    //insert a new item to finished
    state.todo.finished.splice(0, 0, data.data);
  },
  popItemFinished(state, index) {
    state.todo.finished.splice(index, 1);
  },
  pushItemUnfinished(state, data) {
    //insert a new item to unfinished
    state.todo.unfinished.splice(0, 0, data.data);
  },
  popItemUnfinished(state, index) {
    state.todo.unfinished.splice(index, 1);
  },
  delItemFinished(state) {
    state.todo.finished = [];
  },
  delItemUnfinished(state) {
    state.todo.unfinished = [];
  },
  pushItemTrashcan(state, data) {
    data.deleted = true;
    state.trashcan.splice(0, 0, data);
  },
  popItemTrashcan(state, index) {
    state.trashcan.splice(index, 1);
  },
  cleanItemTrashcan(state) {
    state.trashcan = [];
  },
  setStatus(state, data) {
    state.currentStatus = data;
  },
  updateConfig(state, data) {
    state.componentsConfig[data.name] = data.value;
  },
  setUserInfo(state,data){
    state.userinfo=data;
  }
};

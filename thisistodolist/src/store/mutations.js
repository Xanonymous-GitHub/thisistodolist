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
  setItemFinished(state, data) {
    //change the exists item
    state.todo.finished[data.index] = data.data;
  },
  setItemUnfinished(state, data) {
    //change the exists item
    state.todo.unfinished[data.index] = data.data;
  },
  delItemFinished(state) {
    state.todo.finished = [];
  },
  delItemUnfinished(state) {
    state.todo.unfinished = [];
  },
  pushItemTrashcan(state, data) {
    data.delete = true;
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
  }
};

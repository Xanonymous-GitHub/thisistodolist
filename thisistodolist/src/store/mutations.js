export default {
  pushItemFinished(state, data, index) {
    //insert a new item to finished
    state.todo.finished.splice(index, 0, data);
  },
  popItemFinished(state, index) {
    state.todo.finished.splice(index, 1);
  },
  pushItemUnfinished(state, data, index) {
    //insert a new item to unfinished
    state.todo.unfinished.splice(index, 0, data);
  },
  popItemUnfinished(state, index) {
    state.todo.unfinished.splice(index, 1);
  },
  setItemFinished(state, data, index) {
    //change the exists item
    state.todo.finished[index].text = data;
  },
  setItemUnfinished(state, data, index) {
    //change the exists item
    state.todo.unfinished[index].text = data;
  },
  delItemFinished(state) {
    state.todo.finished = [];
  },
  delItemUnfinished(state) {
    state.todo.unfinished = [];
  },
  pushItemTrashcan(state, data) {
    state.trashcan.splice(0, 0, data);
  },
  cleanItemTrashcan(state) {
    state.trashcan = [];
  },
  setStatus(state, data) {
    state.currentStatus = data;
  },
  changeItemStatus(state, data) {
    if (data.where === "unfin") {
      let tmpStatus = state.todo.unfinished[data.index].selected;
      state.todo.unfinished[data.index].selected = !tmpStatus;
    } else if (data.where === "fin") {
      let tmpStatus = state.todo.finished[data.index].selected;
      state.todo.finished[data.index].selected = !tmpStatus;
    } else if (data.where === "tra") {
      let tmpStatus = state.trashcan[data.index].selected;
      state.trashcan[data.index].selected = !tmpStatus;
    }
    console.log(state.todo);
  }
};

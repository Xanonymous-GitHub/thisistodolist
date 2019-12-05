import states from "./states";

export default {
  PushItemFinished(state, data, index) {
    //insert a new item to finished
    states.todo.finished.splice(index, 0, data);
  },
  PopItemFinished(state, index) {
    states.todo.finished.splice(index, 1);
  },
  PushItemUnfinished(state, data, index) {
    //insert a new item to unfinished
    states.todo.unfinished.splice(index, 0, data);
    console.log(states.todo.unfinished);
  },
  PopItemUnfinished(state, index) {
    states.todo.unfinished.splice(index, 1);
  },
  SetItemFinished(state, data, index) {
    //change the exists item
    states.todo.finished[index].text = data;
  },
  SetItemUnfinished(state, data, index) {
    //change the exists item
    states.todo.unfinished[index].text = data;
  },
  DelItemFinished() {
    states.todo.finished = [];
  },
  DelItemUnfinished() {
    states.todo.unfinished = [];
  }
};

import states from "./states";

export default {
  GetItemFinished() {
    return states.todo.finished;
  },
  GetItemUnfinished() {
    return states.todo.unfinished;
  }
};

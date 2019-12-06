export default {
  getItemFinished(state) {
    return state.todo.finished;
  },
  getItemUnfinished(state) {
    return state.todo.unfinished;
  },
  getItemExsist(state) {
    return state.todo.unfinished.concat(state.todo.finished);
  },
};

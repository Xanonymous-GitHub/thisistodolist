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
  getItemTrashcan(state) {
    return state.trashcan;
  },
  getCurrentStatus(state) {
    return state.currentStatus;
  },
  getUser(state) {
    let user = state.userinfo;
    if (user.type === "administrator") {
      user.badgeClass = "";
      user.special = "mdi-shield-star";
    }
    if (user.type === "super") {
      user.badgeClass = "";
      user.special = "mdi-shield-account-outline";
    }
    return state.userinfo;
  },
  getUnfinLength(state) {
    return state.todo.unfinished.length;
  },
  getFinLength(state) {
    return state.todo.finished.length;
  },
  getTraLength(state) {
    return state.trashcan.length;
  },
  getComponentConfig(state) {
    return state.componentsConfig;
  }
};

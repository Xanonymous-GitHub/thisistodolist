export default {
  todo: {
    finished: [],
    unfinished: []
  },
  trashcan: [],
  userinfo: {
    username: "user",
    nickname: "Admin",
    email: "",
    pic: "../thisistodolist/src/assets/default.jpg",
    type: "USER", //[administrator,super,user,restricted]
    verified: false,
    emailVerified: false
  },
  currentStatus: "full", //[full,unfin,fin,tra,set]
  componentsConfig: {
    inputAreaDialogStatus: false,
    inputAreaMissionConfig: {},
    selected: [],
    darkmode:true
  }
};

export default {
  todo: {
    finished: [
      {
        author: "String",
        uid: "String2",
        completed: true,
        deleted: false,
        content: "String2",
        selected: false
      }
    ],
    unfinished: [
      {
        author: "String",
        uid: "String",
        completed: false,
        deleted: false,
        content: "String",
        selected: false
      }
    ]
  },
  trashcan: [],
  userinfo: {
    id: "Xanonymous",
    username: "TeU",
    email: "trusaidlin@gmail.com",
    pic: "https://avatars2.githubusercontent.com/u/47718989?s=460&v=4",
    type: "administrator", //[administrator,super,user,restricted]
    verified:true
  },
  currentStatus: "full" //[full,unfin,fin,tra,set]
};

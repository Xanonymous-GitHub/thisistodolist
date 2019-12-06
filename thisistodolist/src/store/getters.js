import states from "./states";

export default {
    GetItemFinished() {
        return states.todo.finished;
    },
    GetItemUnfinished() {
        return states.todo.unfinished;
    },
    GetUserInfo: states => states.userinfo,
    GenerateSha256(data) {
        let sha256 = require("js-sha256").sha256;
        return sha256(data);
    }
};

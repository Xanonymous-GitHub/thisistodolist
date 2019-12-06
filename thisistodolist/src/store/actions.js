import axios from "axios";

export default {
    SyncData: async ({commit}) => {
        try {
            let data = (await axios.get("/lists")).data;
            commit("DelItemFinished");
            commit("DelItemUnfinished");
            commit("CleanItemTrashcan");
            for (let i = 0; i < data.length; i++) {
                if (data[i].deleted) {
                    //deleted -> true : inTrashcan
                    commit("PushItemTrashcan", data[i]);
                } else {
                    if (data[i].completed) {
                        //completed -> true : finished
                        commit("PushItemFinished", data[i], 0);
                    } else {
                        //completed -> false : unfinished
                        commit("PushItemUnfinished", data[i], 0);
                    }
                }
            }
        } catch (e) {
            console.log(e + "\nerror@Vuex.action.sync_data\n");
        }
    },
    AddNewItemUnfinished: async ({commit, state}, text) => {
        let encrypted = (data) => {
            let sha256 = require("js-sha256").sha256;
            return sha256(data);
        };
        let data = {
            author: state.userinfo.id,
            uid: encrypted(text + Date.now()),
            completed: false,
            deleted: false,
            content: text
        };
        try {
            await axios.post('/lists', data);
            commit("PushItemUnfinished", data, 0);
        } catch (e) {
            console.log(e + "\nerror@Vuex.action.AddNewItemUnfinished\n");
        }
    },
    TestAddNewItemUnfinished: ({commit, state}, text) => {
        let encrypted = (data) => {
            let sha256 = require("js-sha256").sha256;
            return sha256(data);
        };
        let data = {
            author: state.userinfo.id,
            uid: encrypted(text + Date.now()),
            completed: false,
            deleted: false,
            content: text
        };
        commit("PushItemUnfinished", data, 0);
    },
    TestSyncData: ({commit}) => {
        commit("DelItemFinished");
        commit("DelItemUnfinished");
        commit("CleanItemTrashcan");
        commit(
            "PushItemUnfinished",
            {
                author: "String",
                uid: "String2",
                completed: false,
                deleted: false,
                content: "gg"
            },
            0
        )
    }
};
/*

{author:'String',uid:'String',completed:'[true/false]',deleted:'[true/false]',content:'String'}

*/

import axios from 'axios';
export default {
    async SyncData({ commit }) {
        try {
            let data = (await axios.get("/lists")).data;
            for (let i = 0; i < data.length; i++) {
                if ((data[i].delete)) {
                    //delete -> true : inTrashcan
                }
                else {
                    if ((data[i].status)) {
                        //status -> true : finished
                        commit('DelItemFinished');
                        commit('PushItemFinished', data[i], 0);
                    }
                    else {
                        //status -> false : unfinished
                        commit('DelItemUnfinished');
                        commit('PushItemUnfinished', data[i], 0);
                    }
                }
            }
        } catch (e) {
            console.log(e + "\nerror@Vuex.action.sync_data\n");
        }
    },
    syncTest({commit}) {
        commit('DelItemUnfinished');
        commit('PushItemUnfinished', { user_id: 'String', uid: 'String', status: false, delete: false, content: 'gg' }, 0);
    }
};
/*

{user_id:'String',uid:'String',status:'[true/false]',delete:'[true/false]',content:'String'}

*/
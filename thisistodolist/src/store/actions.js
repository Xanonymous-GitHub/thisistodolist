import axios from 'axios';
export default {
    SyncData: async ({ commit }) => {
        try {
            let data = (await axios.get("/lists")).data;
            for (let i = 0; i < data.length; i++) {
                if ((data[i].deleted)) {
                    //deleted -> true : inTrashcan
                }
                else {
                    if ((data[i].completed)) {
                        //completed -> true : finished
                        commit('DelItemFinished');
                        commit('PushItemFinished', data[i], 0);
                    }
                    else {
                        //completed -> false : unfinished
                        commit('DelItemUnfinished');
                        commit('PushItemUnfinished', data[i], 0);
                    }
                }
            }
        } catch (e) {
            console.log(e + "\nerror@Vuex.action.sync_data\n");
        }
    },
    SyncTest: async ({ commit }) => {
        //await commit('DelItemUnfinished');
        await commit('PushItemUnfinished', { author: 'String', uid: 'String2', completed: false, deleted: false, content: 'gg' }, 0);
    }
};
/*

{author:'String',uid:'String',completed:'[true/false]',deleted:'[true/false]',content:'String'}

*/
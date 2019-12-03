import states from './states';
export default {
    PushItemFinished(data, index) {
        //insert a new item to finished
        states.todo.finished.splice(index, 0, data);
    },
    PopItemFinished(index) {
        states.todo.finished.splice(index, 1);
    },
    PushItemUnfinished(data, index) {
        //insert a new item to unfinished
        states.todo.unfinished.splice(index, 0, data);
    },
    PopItemUnfinished(index) {
        states.todo.unfinished.splice(index, 1);
    },
    SetItemFinished(data, index) {
        //change the exists item
        states.todo.finished[index].text = data;
    },
    SetItemUnfinished(data, index) {
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
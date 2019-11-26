let left = new Vue({
    el: '.left',
    data: {
        my_status: 'Learning EVERYTHING.'
    }
});
let right = new Vue({
    el: '.right',
    data: {
        title: 'Xanonymous To-Do list'
    }
});
Vue.component('todo-item',{
    element:function(){

    },
    template: `<div class="to_do_list_title mx-2 my-2 d-flex"><div class="input-group-prepend mx-0"><div class="input-group-text"><input type="checkbox" aria-label="Checkbox for following text input"></div></div> <div class=" p-0 m-1" style="display: inline-block;"><div class="p-0" style="display: inline-block;"><button type="button" class="btn-sm btn-warning ">編輯</button></div> <div class="p-0" style="display: inline-block;"><button type="button" class="btn-sm btn-danger ">刪除</button></div></div> <div class="flex-fill" style="word-break: break-all; display: block;">{{}}</div></div>`,

});
let generate_new_item_block = new Vue({
    el:'to_do_list_container',
    data:{

    },
    computed:{
        
    },
    method:{
        dynamicComponent: function () {
            return {
                template: `<div class="to_do_list_title mx-2 my-2 d-flex"><div class="input-group-prepend mx-0"><div class="input-group-text"><input type="checkbox" aria-label="Checkbox for following text input"></div></div> <div class=" p-0 m-1" style="display: inline-block;"><div class="p-0" style="display: inline-block;"><button type="button" class="btn-sm btn-warning ">編輯</button></div> <div class="p-0" style="display: inline-block;"><button type="button" class="btn-sm btn-danger ">刪除</button></div></div> <div class="flex-fill" style="word-break: break-all; display: block;">{{}}</div></div>`,

            }
        }
    },
    //<div class="to_do_list_title mx-2 my-2 d-flex"><div class="input-group-prepend mx-0"><div class="input-group-text"><input type="checkbox" aria-label="Checkbox for following text input"></div></div> <div class=" p-0 m-1" style="display: inline-block;"><div class="p-0" style="display: inline-block;"><button type="button" class="btn-sm btn-warning ">編輯</button></div> <div class="p-0" style="display: inline-block;"><button type="button" class="btn-sm btn-danger ">刪除</button></div></div> <div class="flex-fill" style="word-break: break-all; display: block;">sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo</div></div>
});
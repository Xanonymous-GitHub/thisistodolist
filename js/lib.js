var JS_LIB = new Object({
    serializeObject: function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    AJAX: function (__type, __url, __data, __OK, __error, __complete, __beforeSend) {
        $.ajax({
            type: __type,
            url: __url,
            data: __data,
            beforeSend: () => {
                return __beforeSend;
            },
            complete: () => {
                return __complete;
            },
            error: () => {
                return __error;
            },
            success: () => {
                return __OK;
            },
        });
    },
    divTemplate: function (i_class, i_text) {
        var $item_div = $("<div\>");
        $item_div.addClass(i_class);
        $item_div.text(i_text);
        return $item_div;
    },
});
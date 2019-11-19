$(function () {
    $.fn.serializeObject = function () {
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
    };
    $('#login').on('submit', function (e) {
        e.preventDefault();
        $(this)[0][1].value=md5($(this)[0][1].value);
        var formData = $(this).serializeObject();
        $(this)[0].reset();
        $.post("/login", JSON.stringify(formData), function() {
            window.location.replace("./todolist");
        }, "JSON");
    });
});
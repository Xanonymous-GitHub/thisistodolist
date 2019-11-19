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
    $("#sign_up").on('submit', function (e) {
        e.preventDefault();
        if ($(this)[0][1].value === $(this)[0][2].value) {
            $(this)[0][1].value = md5($(this)[0][1].value);
            var formData = $(this).serializeObject();
            $(this)[0].reset();
            $.post("/signup", JSON.stringify(formData), function () {
                window.location.replace("./login");
            }).fail(function () {
                alert("Something Wrong when create an account, please try again.")
            });//
        }
        else {
            alert("password not match");
        }
    });
});
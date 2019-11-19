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
    divTemplate: function (i_class, i_text) {
        var $item_div = $("<div\>");
        $item_div.addClass(i_class);
        $item_div.text(i_text);
        return $item_div;
    },
});
$(function () {
    $.fn.createNewItems = (user_input, item_id, is_checked) => {
        let $del_btn = $("<button\>");
        let $edit_btn = $("<button\>");
        let $chk_box = $("<input\>");
        $edit_btn.attr("disabled", true);
        $del_btn.click(function () {
            $.ajax({
                type: "DELETE",
                url: "/todolist/" + $(this).attr("name"),
                beforeSend: function () {
                    $(this).attr("disabled", true);
                },
                complete: function () {
                    $(this).attr("disabled", false);
                },
                error: function () {
                    alert("Connection failed!");
                    $(this).attr("disabled", false);
                },
                success: function() {
                    $("#" + item_id).fadeOut(500).remove();
                },
            });
        }).text("刪除").addClass("btn-sm btn-danger").attr("name", item_id);
        $chk_box.prop("checked", is_checked).attr({
            "type": "checkbox",
            "name": item_id
        });
        $chk_box.click(function (e) {
            let status = $(this).prop("checked");
            $(this).prop("checked", !status);
            $.ajax({
                type: "PUT",
                url: "/todolist/" + $(this).attr("name") + "/status",
                data: JSON.stringify({ status: status }),
                beforeSend: function () {

                },
                complete: function () {

                },
                error: function () {
                    alert("Connection failed!");
                },
                success: function () {
                    $chk_box.prop("checked", status);
                },
            });
        });
        $edit_btn.click(() => {
            //edit ajax
        }).text("編輯").addClass("btn-sm btn-warning");
        $("#to_do_list_container").prepend
            (JS_LIB.divTemplate("to_do_list_title mx-2 my-2 d-flex", "")
                .append(
                    JS_LIB.divTemplate("input-group-prepend mx-0")
                        .append(
                            JS_LIB.divTemplate("input-group-text").append($chk_box)
                        )
                )
                .append(
                    JS_LIB.divTemplate("p-0 m-1")
                        .append(
                            JS_LIB.divTemplate("p-0")
                                .append($edit_btn)
                                .append($del_btn)
                                .css({ "display": "inline-block" })
                        )
                        .css({ "display": "inline-block" })
                )
                .append(
                    JS_LIB.divTemplate("flex-fill", user_input).css({ "word-break": "break-all", "display": "block" })
                )
                .attr({ "id": item_id }));
    };
    $("body").css("background-color", "#9400D3");
    $("#new_item").click((e) => {
        let user_input = $("#input_area").val();
        $("#input_area").val('');
        if (user_input.trim() != "") {
            // $("#input_area").val('');
            // $("#to_do_list_container").createNewItems(user_input, "000", false);
            $.post("/todolist", JSON.stringify({ user_input: user_input }), (data) => {
                $("#to_do_list_container").createNewItems(user_input, data.item_id, false);
            }).fail(function(){ alert("Connection failed!"); });
        }
        else {
            alert("please input something!")
        }
    });
    $("#input_area").keyup((e) => {
        let code = (e.keyCode ? e.keyCode : e.which);
        if (code === 13) {
            e.preventDefault();
            $("#new_item").click();
        }
    });
    $("#logout").click(function () {
        Cookies.remove('username');
        Cookies.remove('password');
        window.location.replace("./login");
    });
    $.get("/todolist/lists", (data) => {
        for (let i = 0; i < data.length; i++) {
            $("#to_do_list_container").createNewItems(data[i].user_input, data[i].item_id, data[i].status);
        }
    }).fail(function (param){ /*not login*/ });
});
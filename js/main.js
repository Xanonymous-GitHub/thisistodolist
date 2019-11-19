$(function () {
    var divTemplate = (i_class, i_text) => {
        var $item_div = $("<div\>");
        $item_div.addClass(i_class);
        $item_div.text(i_text);
        return $item_div;
    };
    $.fn.createNewItems = (user_input, item_id, is_checked) => {
        let $del_btn = $("<button\>");
        let $edit_btn = $("<button\>");
        let $chk_box = $("<input\>");
        $del_btn.click(() => {
            $.ajax({
                type: "DELETE",
                url: "/todolist/" + $(this).attr("name"),
                beforeSend: () => {

                },
                complete: () => {

                },
                fail: () => {

                },
                success: () => {
                    $del_btn.parent().parent().parent().fadeOut(500, () => {
                        $del_btn.remove();
                    });
                },
            });
        }).text("刪除").addClass("btn-sm btn-danger").attr("name", item_id);
        $chk_box.prop("checked", is_checked).attr({
            "type": "checkbox",
            "name": item_id
        });
        $chk_box.click(() => {
            $.ajax({
                type: "PUT",
                url: "/todolist/" + $(this).attr("name") + "/status",
                data: JSON.stringify({ status: status }),
                dataType: "JSON",
                contentType: "application/json",
                beforeSend: () => {
                    let status = $(this).prop("checked");
                    $(this).prop("checked", !status);
                },
                complete: () => {

                },
                fail: () => {

                },
                success: () => {
                    $chk_box.prop("checked", status);
                },
            });
        });
        $edit_btn.click(() => {
            //edit ajax
        }).text("編輯").addClass("btn-sm btn-warning");
        $("#to_do_list_container").prepend
            (divTemplate("to_do_list_title mx-2 my-2 d-flex", "")
                .append(
                    divTemplate("input-group-prepend mx-0")
                        .append(
                            divTemplate("input-group-text").append($chk_box)
                        )
                )
                .append(
                    divTemplate("p-0 m-1")
                        .append(
                            divTemplate("p-0")
                                .append($edit_btn)
                                .append($del_btn)
                                .css({ "display": "inline-block" })
                        )
                        .css({ "display": "inline-block" })
                )
                .append(
                    divTemplate("flex-fill", user_input).css({ "word-break": "break-all", "display": "block" })
                ));
    };
    $("body").css("background-color", "#9400D3");
    $("#new_item").click( (e)=> {
        let user_input = $("#input_area").val();
        if (user_input.trim() != "") {
            $("#input_area").val('');
            $("#to_do_list_container").createNewItems(user_input, "000", false);
            $.post("/todolist", JSON.stringify({ user_input: user_input }),  (data)=> {
                $("#input_area").val('');
                $("#to_do_list_container").createNewItems(user_input, data.item_id, false);
            }, "JSON").fail(() => { alert("Connection failed!"); });
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
    $.get("/todolist/lists",  (data)=> {
        for (let i = 0; i < data.length; i++) {
            $("#to_do_list_container").createNewItems(data[i].user_input, data[i].item_id, data[i].status);
        }
    }).fail(() => { alert("Connection failed!"); });
});
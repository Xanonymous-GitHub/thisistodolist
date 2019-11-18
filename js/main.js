$(function () {
    let divTemplate = (i_class, i_css, i_text) => {
        let $item_div = $("<div\>");
        $item_div.addClass(i_class);
        $item_div.css(i_css);
        $item_div.text(i_text);
        return $item_div;
    };
    $.fn.createNewItems = function (user_input, item_id, is_checked) {
        let $del_btn = $("<button\>");
        let $chk_box = $("<input>");
        $del_btn.text("Del");
        $del_btn.addClass("btn btn-danger");
        $del_btn.css("whiteSpace", "nowrap");
        $del_btn.attr("name", item_id);
        $del_btn.click(function (e) {
            $.ajax({
                type: "DELETE",
                url: "/todolist/" + $(this).attr("name"),
                beforeSend: function () {

                },
                complete: function () {

                },
                fail: function (e) {

                },
                success: function () {
                    $del_btn.hide().parent().parent().parent().fadeOut(500, function () {
                        $del_btn.remove();
                    });
                },
            });
        });
        $chk_box.attr({
            "type": "checkbox",
            "name": item_id
        });
        $chk_box.prop("checked", is_checked);
        $chk_box.click(function (e) {
            let status = $(this).prop("checked");
            $(this).prop("checked", !status);
            $.ajax({
                type: "PUT",
                url: "/todolist/" + $(this).attr("name"),
                data: JSON.stringify({ status: status }),
                dataType: "JSON",
                contentType: "application/json",
                beforeSend: function () {

                },
                complete: function () {

                },
                fail: function (e) {
                    
                },
                success: function () {
                    $chk_box.prop("checked", status);
                },
            });
        });
        let $new_item = divTemplate("mx-2 my-2 to_do_list_title", { "word-break": "break-all" });
        let $new_item_container = divTemplate("row w-100");
        let $content_container = divTemplate("col-10", {}, user_input);
        let $button_container = divTemplate("col-2 p-0 text-right");
        $button_container.append($del_btn);
        $content_container.prepend($chk_box);
        $new_item_container.append($content_container)
        $new_item_container.append($button_container);
        $new_item.append($new_item_container);
        $(this).prepend($new_item.hide().fadeIn(600));
    };
    $("body").css("background-color", "#9400D3");
    $("#new_item").click(function (e) {
        let user_input = $("#input_area").val();
        if (user_input.trim() != "") {
            $.post("/todolist", JSON.stringify({ user_input: user_input }), function (data) {
                $("#input_area").val('');
                $("#to_do_list_container").createNewItems(user_input, data.item_id, false);
            }, "JSON").fail(() => { });
        }
        else {
            alert("please input something!")
        }
    });
    $.get("/todolist/lists", function (data) {
        for (let i = 0; i < data.length; i++) {
            $("#to_do_list_container").createNewItems(data[i].user_input, data[i].item_id, data[i].status);
        }
    }).fail(() => { });
});
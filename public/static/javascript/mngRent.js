$(document).ready(function(){
    var deleteId = null;
    $("table").on("click",".modifyInfo",function(){
        var modifyId = $(this).attr('data-id');
        window.location.href="?s=/index/ManageHouse/modifyOneResold/id/"+modifyId;
    });

    $("table").on("click",".deleteInfo",function(){

        deleteId=$(this).attr('data-id');
        $('#deleteConfirm').modal('toggle');
        $('#deleteName').text($(this).attr('data-name'));
    });

    $("#sureDelete").on("click",function () {
        $.ajax({
            url: "?s=/index/Manage_house/deleteRent/id/"+deleteId,
            // url:"index/addHouse/"+deleteId+"?XDEBUG_SESSION_START=15405",
            type: 'post',
            success: function (data) {
                window.location.href="?s=/index/Manage_house/mngRent";
                // console.log(data.status);
            }
        });
    })
});
$(document).ready(function(){
    var deleteId = null;


    $("table").on("click",".deleteInfo",function(){

        deleteId=$(this).attr('data-id');
        $('#deleteConfirm').modal('toggle');
        $('#deleteName').text($(this).attr('data-name'));
    });

    $("#sureDelete").on("click",function () {
        $.ajax({
            url: "?s=/index/Manage_store/deleteStoreInfo/id/"+deleteId,
            // url:"index/addHouse/"+deleteId+"?XDEBUG_SESSION_START=18397",
            type: 'post',
            success: function (data) {
                window.location.href="?s=/index/Manage_store/getStoreInfo";
                // console.log(data.status);
            }
        });
    })

    $("#addItem").on("click",function () {
        window.location.href="?s=/index/Manage_Store/addStoreInfo";
    })
});
$(document).ready(function(){
    var modifyId = null;
    var deleteId = null;

    $("table").on("click",".modifyInfo",function(){

        modifyId=$(this).attr('id');
        $('#modifyChoose').modal('toggle');


    });
    $("table").on("click",".deleteInfo",function(){

        deleteId=$(this).attr('data-id');
        $('#deleteConfirm').modal('toggle');
        $('#deleteName').text($(this).attr('data-name'));
    });

    $("#fromResold").on("click",function () {
        window.location.href="?s=/index/Manage_Recommend/fromResold/id/"+modifyId;
    })

    $("#fromRent").on("click",function () {
        console.log('fdrgfs');
        window.location.href="?s=/index/Manage_Recommend/fromRent/id/"+modifyId;
    })

    $("#sureDelete").on("click",function () {
        $.ajax({
            url: "?s=/index/Manage_recommend/deleteRecommend/id/"+deleteId,
            // url:"index/addHouse/"+deleteId+"?XDEBUG_SESSION_START=15405",
            type: 'post',
            success: function (data) {
                // window.location.href="?s=/index/Manage_house/mngRent";
                console.log(data.status);
            }
        });
    })
});
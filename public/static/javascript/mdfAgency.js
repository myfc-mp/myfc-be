$(document).ready(function(){
    var deleteId = null;
    $("table").on("click",".modifyInfo",function(){
        var modifyId = $(this).attr('data-id');
        window.location.href="?s=/index/stuff/modifyOneAgency/id/"+modifyId;
    });

    $("table").on("click",".deleteInfo",function(){
        deleteId=$(this).attr('data-id');
        $('#deleteConfirm').modal('toggle');
        $('#deleteName').text($(this).attr('data-name'));
    });

    $("#sureDelete").on("click",function () {
        $.ajax({
            url: "?s=/index/stuff/deleteInfo/id/"+deleteId,
            type: 'post',
            success: function (data) {
                window.location.href="?s=/index/stuff/modifyAgency";
            }
        });
    })
});
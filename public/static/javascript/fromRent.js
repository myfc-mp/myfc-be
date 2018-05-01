var upData=[];
var configHouseID = null;
$(document).ready(function(){

    $("table").on("click",".chooseInfo",function(){
        configHouseID = $(this).attr('data-id');

        $('#labelConfirm').modal('toggle');

    });

    $('#submit').on('click',function () {
        upData = $('#checkForm').serializeArray();
        upData.push({
            'name':'recommendID',
            'value':$(".table").attr('data-no')
        });

        upData.push({
            'name':'configHouseID',
            'value':configHouseID
        });
        console.log(upData);
        $.ajax({
            url: "?s=/index/Manage_recommend/configRecommend",
            // url:"index/addHouse/"+deleteId+"?XDEBUG_SESSION_START=15405",
            type: 'post',
            data: upData,
            dataType: 'json',
            success: function (data) {
                window.location.href="?s=/index/Manage_recommend/getRecommendInfo";
                // console.log(data.status);
            }
        });
    });
});
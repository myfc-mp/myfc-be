var nameInput = false;
var addressInput = false;
var mapInput = false;
var latlng = [30.6573435,104.0659188];//天府广场坐标

window.onload = function () {
    var center = new qq.maps.LatLng(30.6573435,104.0659188);
    var map = new qq.maps.Map(document.getElementById('container'),{
        center: center,
        zoom: 13,
        scrollwheel: false,
        disableDoubleClickZoom: true
    });

    qq.maps.event.addListener(map, 'click', function(event) {
        latlng = event.latLng;
        var marker=new qq.maps.Marker({
            position:event.latLng,
            map:map
        });

        mapInput = true;

        qq.maps.event.addListener(map, 'click', function(event) {
            marker.setMap(null);
        });
    });
}

$('#storeName').blur(function () {
    var   inputLength = $('#storeName').val().length;
    if(inputLength>0){
        nameInput = true;
    }
    else{
        nameInput = false;
    }
});


$('#storeAddress').blur(function () {
    var   inputLength = $('#storeAddress').val().length;
    if(inputLength>0){
        addressInput = true;
    }
    else{
        addressInput = false;
    }
});

$('#addItem').click(function () {
    if (!(mapInput && addressInput && nameInput)) {
        $('#submitInfoErr').removeClass('sr-only');
        return;
    }
    console.log('11111');
    $('#myModal').modal('show');

    var upData = $('#soldForm').serializeArray();

    upData.push({
        'name':'lat',
        'value':latlng.lat
    });
    upData.push({
        'name':'lng',
        'value':latlng.lng
    });

    $.ajax({
        url: "?s=/index/Manage_store/saveStoreInfo",
        // url:"index/addHouse?XDEBUG_SESSION_START=18502",
        type: 'post',
        data: upData,
        dataType: 'json',
        success: function (data) {
            window.location.href="?s=/index/Manage_store/getStoreInfo";
            // console.log(data.status);
        }
    });

})
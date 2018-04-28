var lCropperInstance = [];
var priceInput = false;
var areaInput = false;
var titleInput = false;
var nameInput = false;
var agencyList =[];
var labelList=[];
var latlng = [30.6573435,104.0659188];//天府广场坐标

window.onload = function () {

    'use strict';

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var container = document.querySelector('.img-container');
    var image = container.getElementsByTagName('img').item(0);
    var isReady = false;
    var options = {
        aspectRatio: NaN,
        viewMode:2,
        ready: function (e) {
            //获取画布尺寸
            var data = {
                method: "getContainerData",
                target: "#putData",
                option: undefined,
                secondOption: undefined
            };
            var result = dealPic(data);
            //设置croper大小
            data = {
                method: "setCropBoxData",
                target: "#putData",
                option: result,
                secondOption: undefined
            };
            isReady = true;
            dealPic(data);
        },
        cropstart: function (e) {
            console.log(e.type, e.detail.action);
        },
        cropmove: function (e) {
            console.log(e.type, e.detail.action);
        },
        cropend: function (e) {
            console.log(e.type, e.detail.action);
        },
        crop: function (e) {
            if(isReady){
                //实施croper
                var data = {
                    method: "getCroppedCanvas",
                    target: null,
                    option: '{ "maxWidth": 800, "maxHeight": 800 }',
                    secondOption: undefined
                };
                dealPic(data);
                isReady = false;
            }

        },
        zoom: function (e) {
            console.log(e.type, e.detail.ratio);
        }
    };
    var cropper = new Cropper(image, options);
    var uploadedImageType = 'image/jpeg';
    var uploadedImageName = 'cropped.jpg';
    var uploadedImageURL;


    // 创建一个画布
    if (!document.createElement('canvas').getContext) {
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
        $('button[data-method="rotate"]').prop('disabled', true);
        $('button[data-method="scale"]').prop('disabled', true);
    }

    // Methods
    var dealPic = function (data) {
        var result;

        if (data.method) {
            switch (data.method) {
                case 'getCroppedCanvas':
                    try {

                        data.option = JSON.parse(data.option);
                    } catch (e) {
                        console.log(e.message);
                    }
                    console.log(data.option);
                    if (uploadedImageType === 'image/jpeg') {
                        if (!data.option) {
                            data.option = {};
                        }

                        data.option.fillColor = '#fff';
                    }

                    break;
            }
            result = cropper[data.method](data.option, data.secondOption);

            switch (data.method) {
                case 'getCroppedCanvas':
                    if (result) {
                        var imageObj = result.toDataURL("image/jpg");
                        var imageList = imageObj.split(',');
                        lCropperInstance.push(imageList[1]);
                        var num = lCropperInstance.length;

                        var element = '#img-output'+num+' img';
                        $(element).attr('src',imageObj).removeClass('sr-only');
                        switch (num){
                            case 1:
                                $('#picGroup1').removeClass('sr-only');
                                break;
                            case 4:
                                $('#picGroup2').removeClass('sr-only');
                                break;
                            case 7:
                                $('#picGroup3').removeClass('sr-only');
                                break;
                            case 9:
                                $('#inputLabel').removeClass('btn-info').addClass('btn-secondary');
                                $('#inputImage').attr('disabled','disabled');
                        }
                    }

                    break;
            }
            return result;
        }
    };


    // 导入图像文件
    var inputImage = document.getElementById('inputImage');

    if (URL) {
        inputImage.onchange = function () {
            var files = this.files;
            var file;

            if (cropper && files && files.length) {
                file = files[0];

                if (/^image\/\w+/.test(file.type)) {
                    uploadedImageType = file.type;
                    uploadedImageName = file.name;

                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }

                    image.src = uploadedImageURL = URL.createObjectURL(file);
                    cropper.destroy();
                    cropper = new Cropper(image, options);
                    inputImage.value = null;
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        };
    } else {
        inputImage.disabled = true;
        inputImage.parentNode.className += ' disabled';
    }
    //初始化地图
    initMap();
    //从服务器获取经纪人和标签信息
    initInfo();
}

var initInfo = function() {

    $.ajax({
        url: "?s=/index/Add_house/getAgencyAndLabelInfo",
        type: 'get',
        success: function (data) {
            agencyList = data.agencyList;
            labelList = data.labelList;

            for(var i in agencyList){
                $('#houseAgency').append("<option value="+agencyList[i].id+">"+agencyList[i].name+"</option>");
            }

            for(var j in labelList){
                $('#labelZone').append("<span class=\"badge btn font-weight-light m-1 badge-secondary\" value="+labelList[j].id+">"+labelList[j].description+"</span>");
            }

            $("#labelZone").on("click","span",function(){
                $(this).toggleClass('badge-secondary').toggleClass('badge-success');

            });
        }
    });
}

var initMap = function() {

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
        qq.maps.event.addListener(map, 'click', function(event) {
            marker.setMap(null);
        });
    });
}

$('#houseRental').blur(function () {
    var testSr = $('#houseRental').val();
    if(/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(testSr)){
        $('#priceInfoErr').addClass('sr-only');
        priceInput = true;
    }
    else{
        $('#priceInfoErr').removeClass('sr-only');
        priceInput = false;
    }

});

$('#houseArea').blur(function () {
    var testSr = $('#houseArea').val();
    if(/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(testSr)){
        $('#areaInfoErr').addClass('sr-only');
        areaInput = true;
    }
    else{
        $('#areaInfoErr').removeClass('sr-only');
        areaInput = false;
    }

});

$('#houseName').blur(function () {

    if($('#houseArea').val().length > 0){
        $('#areaInfoErr').addClass('sr-only');
        nameInput = true;
    }
    else{
        nameInput = false;
    }
});


$('#houseTitle').bind('input propertychange', function(){

    var   inputLength = $('#houseTitle').val().length;
    var   last   =   25-inputLength;

    if(inputLength < 25)   {
        $('#titleInfoErr').removeClass('sr-only').removeClass('text-danger').addClass('text-success').text("已输入"+inputLength+"个字符，还可以输入"+last+"个");
        if(inputLength>0){
            titleInput = true;
        }
        else{
            titleInput = false;
        }
    }
    else{
        $('#titleInfoErr').removeClass('sr-only').removeClass('text-success').addClass('text-danger').text("字数超出限制");
        titleInput = false;
    }
});


$('#addItem').click(function () {
    if(!(priceInput && areaInput && titleInput)){

        $('#submitInfoErr').removeClass('sr-only');
        return;
    }

    var upData = $('#soldForm1').serializeArray();
    upData=upData.concat($('#soldForm2').serializeArray()).concat($('#soldForm3').serializeArray());


    var badges = $("#labelZone").children("span.badge-success");
    var badgeNo = [];
    badges.map(function ()  {
        badgeNo.push(parseInt(this.getAttribute('value')));
        return this;
    });
    upData.push({
        'name':'lat',
        'value':latlng.lat
    });
    upData.push({
        'name':'lng',
        'value':latlng.lng
    });
    upData.push({
        'name':'label',
        'value':badgeNo
    });
    upData.push({
        'name':'image',
        'value':lCropperInstance
    });
    var lTotal,lArea;
    for(var i in upData){
        if(upData[i].name === 'rental'){
            lTotal = upData[i].value;
        }
        if(upData[i].name === 'area'){
            lArea = upData[i].value;
        }
    }

    var priceRange = null;
    if(lTotal < 500){
        priceRange = '500以下';
    }
    else if(lTotal < 800){
        priceRange = '500-800';
    }
    else if(lTotal < 1000){
        priceRange = '800-1000';
    }
    else if(lTotal < 1500){
        priceRange = '1000-1500';
    }
    else if(lTotal < 2000){
        priceRange = '1500-2000';
    }
    else if(lTotal < 3000){
        priceRange = '2000-3000';
    }
    else if(lTotal < 5000){
        priceRange = '3000-5000';
    }
    else if(lTotal < 8000){
        priceRange = '5000-8000';
    }
    else{
        priceRange = '8000以上';
    }

    upData.push({
        'name':'rental_range',
        'value':priceRange
    });

    var areaRange = null;
    if(lArea < 50){
        areaRange = '0-50';
    }
    else if(lArea < 70){
        areaRange = '50-70';
    }
    else if(lArea < 90){
        areaRange = '70-90';
    }
    else if(lArea < 110){
        areaRange = '90-110';
    }
    else if(lArea < 130){
        areaRange = '110-130';
    }
    else if(lArea < 150){
        areaRange = '130-150';
    }
    else if(lArea < 200){
        areaRange = '150-200';
    }
    else if(lArea < 300){
        areaRange = '200-300';
    }
    else{
        areaRange = '300以上';
    }

    upData.push({
        'name':'area_range',
        'value':areaRange
    });


    console.log(upData);
    $.ajax({
        url: "?s=/index/Add_house/saveRentInfo",
        // url:"index/addHouse?XDEBUG_SESSION_START=17815",
        type: 'post',
        data: upData,
        dataType: 'json',
        success: function (data) {
            window.location.href="?s=/index/Add_house/addRentResult/status/"+data.status;
            // console.log(data.status);
        }
    });
});
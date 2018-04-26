var lCropperInstance = [];
var ageInput = false;
var priceInput = false;
var areaInput = false;
var titleInput = false;
var nameInput = false;
var agencyList =[];
var labelList=[];

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
                        lCropperInstance.push(result.toDataURL("image/jpg"));
                        var num = lCropperInstance.length;

                        var element = '#img-output'+num+' img';
                        $(element).attr('src',lCropperInstance[num-1]).removeClass('sr-only');
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

    var upData = $('#AgencyForm').serializeArray();

    $.ajax({
        url: "?s=/index/AddHouse/getAgencyAndLabelInfo",
        type: 'get',
        success: function (data) {
            agencyList = data.agencyList;
            labelList = data.labelList;

            for(var i in agencyList){             
                $('#houseAgency').append("<option value="+agencyList[i].id+">"+agencyList[i].name+"</option>");   
            }

            for(var j in labelList){             
                $('#labelZone').append("<span class=\"badge badge-info\" value="+labelList[i].id+">"+labelList[i].name+"</span>");   
            }

            $("#labelZone").on("click","span",function(){
                if(selectedLabel<3){
                    $(this).toggleClass('badge-info').toggleClass('badge-success');
                }
                
                if(){

                }
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
        var marker=new qq.maps.Marker({
            position:event.latLng,
            map:map
        });
        qq.maps.event.addListener(map, 'click', function(event) {
            marker.setMap(null);
        });
    });
}

$('#houseTotal').blur(function () {
    var testSr = $('#houseTotal').val();
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

$('#houseAge').blur(function () {
    var testSr = $('#houseAge').val();
    if(/^[1|2]\d{3}$/.test(testSr)){
        $('#ageInfoErr').addClass('sr-only');
        ageInput = true;
    }
    else{
        $('#ageInfoErr').removeClass('sr-only');
        ageInput = false;
    }

});

$('#addItem').click(function () {
    if(!(ageInput && priceInput && areaInput && titleInput)){

        $('#submitInfoErr').removeClass('sr-only');
        return;
    }
    console.log('hew rre');
    var upData = $('#AgencyForm').serializeArray();
    upData.push({
        'name':'avatar',
        'value':lCropperInstance
    });
    $(this).attr('disabled','disabled');
    $.ajax({
        url: "?s=/index/stuff/uploadInfo",
        type: 'post',
        data: upData,
        dataType: 'json',
        success: function (data) {
            window.location.href="?s=/index/stuff/addAgencyResult/status/"+data.status;
        }
    });
});
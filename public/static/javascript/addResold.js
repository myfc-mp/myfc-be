var lCropperInstance = [];
var ageInput = false;
var priceInput = false;
var areaInput = false;
var titleInput = false;
var nameInput = false;
var haveAddPic = 0;
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
                    option: '{ "maxWidth": 600, "maxHeight": 600 }',
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
                        var toBeAppend = "<div data-no='"+(haveAddPic++)+"' class='col-4 mb-3'></div>";
                        var appendDiv = $(toBeAppend).appendTo('#picGroup');
                        var appendPic = $("<img class='h-100 w-100 m-0'>").appendTo(appendDiv);
                        $(appendPic).attr('src',imageObj);

                        if(lCropperInstance.length > 0){
                            $('#picErrInfo').removeClass('sr-only');
                        }
                        if(lCropperInstance.length >= 9){
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
    //在选择了图片以后，可以点击删除
    $("#picGroup").on("click","div",function(){
        var delId = $('#picGroup').index(this);
        lCropperInstance.splice(delId,1);
        $(this).remove();

        if(lCropperInstance.length == 0){
            $('#picErrInfo').addClass('sr-only');
        }

        if(lCropperInstance.length < 9){
            $('#inputLabel').removeClass('btn-secondary').addClass('btn-info');
            $('#inputImage').removeAttr('disabled');
        }
    });
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

$('#houseName').bind('input propertychange', function() {
    var   inputLength = $('#houseName').val().length;
    var   last   =   15-inputLength;

    if(inputLength <= 15)   {
        $('#nameInfoErr').removeClass('sr-only').removeClass('text-danger').addClass('text-success').text("已输入"+inputLength+"个字符，还可以输入"+last+"个");
        if(inputLength>0){
            nameInput = true;
        }
        else{
            nameInput = false;
        }
    }
    else{
        $('#nameInfoErr').removeClass('sr-only').removeClass('text-success').addClass('text-danger').text("字数超出限制");
        nameInput = false;
    }
});


$('#houseTitle').bind('input propertychange', function(){

    var   inputLength = $('#houseTitle').val().length;
    var   last   =  30-inputLength;

    if(inputLength <= 30)   {
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
    if(!(ageInput && priceInput && areaInput && titleInput && nameInput)){

        $('#submitInfoErr').removeClass('sr-only');
        return;
    }

    $('#myModal').modal('show');

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
        if(upData[i].name === 'price_total'){
            lTotal = upData[i].value;
        }
        if(upData[i].name === 'area'){
            lArea = upData[i].value;
        }
    }

    var priceRange = null;
    if(lTotal < 60){
        priceRange = '60万以下';
    }
    else if(lTotal < 100){
        priceRange = '60-100万';
    }
    else if(lTotal < 150){
        priceRange = '100-150万';
    }
    else if(lTotal < 200){
        priceRange = '150-200万';
    }
    else if(lTotal < 300){
        priceRange = '200-300万';
    }
    else{
        priceRange = '300万以上';
    }

    upData.push({
        'name':'price_range',
        'value':priceRange
    });

    var areaRange = null;
    if(lArea < 50){
        areaRange = '0-50m²';
    }
    else if(lArea < 70){
        areaRange = '50-70m²';
    }
    else if(lArea < 90){
        areaRange = '70-90m²';
    }
    else if(lArea < 110){
        areaRange = '90-110m²';
    }
    else if(lArea < 130){
        areaRange = '110-130m²';
    }
    else if(lArea < 150){
        areaRange = '130-150m²';
    }
    else if(lArea < 200){
        areaRange = '150-200m²';
    }
    else if(lArea < 300){
        areaRange = '200-300m²';
    }
    else{
        areaRange = '300m²以上';
    }

    upData.push({
        'name':'area_range',
        'value':areaRange
    });

    upData.push({
        'name':'price_unit',
        'value':Math.floor(lTotal*10000/lArea)
    });


    $.ajax({
        url: "?s=/index/Add_house/saveResoldInfo",
        // url:"index/addHouse?XDEBUG_SESSION_START=18502",
        type: 'post',
        data: upData,
        dataType: 'json',
        success: function (data) {
            window.location.href="?s=/index/Add_house/addResoldResult/status/"+data.status;
            // console.log(data.status);
        }
    });
});
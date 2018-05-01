var lCropperInstance = [];
var isHandlerExsit = [];

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
                        var toBeAppend = "<div class='col-4 mb-3'></div>";
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

    $.ajax({
        url: "?s=/index/Advertising/getAllCarousel",
        // url:"index/addtoHouse?XDEBUG_SESSION_START=14283",
        type: 'get',
        success: function (data) {
            initData(data);
        }
    });

    var initData = function (data) {

        for(var i in data){
            var imageUrl = data[i].url;

            var toBeAppend = "<div class='col-4 mb-3'></div>";
            var appendDiv = $(toBeAppend).appendTo('#picGroup');
            var appendPic = $("<img class='h-100 w-100 m-0'>").appendTo(appendDiv);
            $(appendPic).attr('src',window.carousel_prefix+imageUrl);


            $('#tempContainer').append($('<img>').attr('src',window.carousel_prefix+imageUrl));


            $('#tempContainer img').on("load",function(){
                var thisDOM = $(this);
                var src = thisDOM[0].getAttribute('src');

                if(isHandlerExsit.indexOf(src)>=0){
                    return;
                }
                isHandlerExsit.push(src);


                var picTobeAdd = getBase64Image(thisDOM[0]);
                var imageList = picTobeAdd.split(',');
                lCropperInstance.push(imageList[1]);

                if(lCropperInstance.length > 0){
                    $('#picErrInfo').removeClass('sr-only');
                }
                console.log(lCropperInstance.length);
                if(lCropperInstance.length >= 9){
                    $('#inputLabel').removeClass('btn-info').addClass('btn-secondary');
                    $('#inputImage').attr('disabled','disabled');
                }
            });
        }
    }

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
};

function getBase64Image(img) {
    var canvas = document.createElement("canvas");

    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0,img.width,img.height);

    var dataURL = canvas.toDataURL("image/jpg");

    return dataURL;
}

$('#addItem').click(function () {
    $('#myModal').modal('show');
    var upData = [];
    upData.push({
        'name':'image',
        'value':lCropperInstance
    });

    $.ajax({
        url: "?s=/index/advertising/saveCarousel",
        // url:"index/addtoHouse?XDEBUG_SESSION_START=15567",
        type: 'post',
        data: upData,
        dataType: 'json',
        success: function (data) {

            window.location.href="?s=/index/advertising/saveCarouselResult/status/"+data.status;

        }
    });
});
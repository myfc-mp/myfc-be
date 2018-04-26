var lCropperInstance =null;
var nameInput = false;
var mobileInput = false;
var avatarInput = false;
window.onload = function () {

    'use strict';

    var Cropper = window.Cropper;
    var URL = window.URL || window.webkitURL;
    var container = document.querySelector('.img-container');
    var image = container.getElementsByTagName('img').item(0);
    // var download = document.getElementById('download');
    var actions = document.getElementById('actions');

    var options = {
        //修改点：修改比例为1
        aspectRatio: 1,
    };
    var cropper = new Cropper(image, options);
    var uploadedImageType = 'image/jpeg';
    var uploadedImageName = 'cropped.jpg';
    var uploadedImageURL;

    // Buttons
    if (!document.createElement('canvas').getContext) {
        $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
    }

    if (typeof document.createElement('cropper').style.transition === 'undefined') {
        $('button[data-method="rotate"]').prop('disabled', true);
        $('button[data-method="scale"]').prop('disabled', true);
    }


    // Methods
    actions.querySelector('.docs-buttons').onclick = function (event) {
        var e = event || window.event;
        var target = e.target || e.srcElement;

        var result;
        var input;
        var data;

        if (!cropper) {
            return;
        }


        data = {
            method: target.getAttribute('data-method'),
            target: target.getAttribute('data-target'),
            option: target.getAttribute('data-option') || undefined,
            secondOption: target.getAttribute('data-second-option') || undefined
        };
  
        if (data.method) {

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

            result = cropper[data.method](data.option, data.secondOption);

            if (result) {
                $('.img-container').addClass('sr-only');
                lCropperInstance = result.toDataURL("image/png");
                $('#img-output img').attr('src',lCropperInstance);
                avatarInput = true;    
                if(checkInput()){
                    $('#register').removeClass('btn-secondary').addClass('btn-primary').removeAttr('disabled');
                } 
            }

            if (typeof result === 'object' && result !== cropper && input) {
                try {
                    input.value = JSON.stringify(result);
                } catch (e) {
                    console.log(e.message);
                }
            }
        }
    };

    // inputImage是图片选择input的ID
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
                    $('.img-container').removeClass('sr-only');     
                              
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        };
    } else {
        inputImage.disabled = true;
        inputImage.parentNode.className += ' disabled';
    }
};

$('#register').click(function () {
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

$('#agencyMobile').blur(function () {
    var testSr = $('#agencyMobile').val();
    if(/^1\d{10}$/.test(testSr)){
        $('#mobileInfoOk').removeClass('sr-only');
        $('#mobileInfoErr').addClass('sr-only');
        mobileInput = true;
    }
    else{
        $('#mobileInfoErr').removeClass('sr-only');
        $('#mobileInfoOk').addClass('sr-only');
        mobileInput = false;
    }
    if(checkInput()){
        $('#register').removeClass('btn-secondary').addClass('btn-primary').removeAttr('disabled');
    }
    else{
        $('#modify').removeClass('btn-primary').addClass('btn-secondary').attr('disabled','disabled');
    }
});

$('#agencyName').blur(function () {
    var testSr = $('#agencyName').val();
    if(/^[\u4e00-\u9fa5]{2,5}$/.test(testSr)){
        $('#nameInfoOk').removeClass('sr-only');
        $('#nameInfoErr').addClass('sr-only');
        nameInput = true;
    }
    else{
        $('#nameInfoErr').removeClass('sr-only');
        $('#nameInfoOk').addClass('sr-only');
        nameInput = false;
    }
    if(checkInput()){
        $('#register').removeClass('btn-secondary').addClass('btn-primary').removeAttr('disabled');
    }
    else{
        $('#modify').removeClass('btn-primary').addClass('btn-secondary').attr('disabled','disabled');
    }
});

var checkInput = function() {
    return nameInput && mobileInput && avatarInput;
};
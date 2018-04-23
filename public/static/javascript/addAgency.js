document.write("<script language=javascript src='https://cdn.bootcss.com/cropper/3.1.3/cropper.min.js'></script>");
let lCropperInstance =null;
let nameInput = false;
let mobileInput = false;
let avatarInput = false;
var initCropperInModal = function(img, input){
    var $image = img;
    var $inputImage = input;
    var options = {
        aspectRatio: 1, // 纵横比
        viewMode: 1,
    };

    var URL = window.URL || window.webkitURL;
    var blobURL;
    $image.cropper(options);

    if (URL) {

        $inputImage.change(function() {
            var files = this.files;
            var file;

            if (!$image.data('cropper')) {
                return;
            }
            if (files && files.length) {
                file = files[0];
                if (/^image\/\w+$/.test(file.type)) {

                    if(blobURL) {
                        URL.revokeObjectURL(blobURL);
                    }
                    blobURL = URL.createObjectURL(file);
                    // 重置cropper，将图像替换
                    $image.cropper('reset').cropper('replace', blobURL);
                    // 选择文件后，显示和隐藏相关内容
                    $('#img-container').removeClass('sr-only');
                } else {
                    window.alert('请选择一个图像文件！');
                }
            }
        });
    } else {
        $inputImage.prop('disabled', true).addClass('disabled');
    }
};

$(function(){
    initCropperInModal($('#photo'),$('#photoInput'));
});

$('#confirm').click(function () {
    lCropperInstance = $('#photo').cropper('getCroppedCanvas',{
        width:320,
        height:320
    }).toDataURL('image/jpg');

    $('#user-photo').attr('src',lCropperInstance).attr('style','display:block');
    $('#img-container').addClass('sr-only');
    avatarInput = true;
    if(checkInput()){
        $('#register').removeClass('btn-secondary').addClass('btn-primary').removeAttr('disabled');
    }
});

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
});

var checkInput = function() {
    return nameInput && mobileInput && avatarInput;
};
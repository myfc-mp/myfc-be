var lCropperInstance =null;
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
}

$(function(){
    initCropperInModal($('#photo'),$('#photoInput'));
});

$('#confirm').click(function () {
    lCropperInstance = $('#photo').cropper('getCroppedCanvas',{
        width:320,
        height:320
    });
    var base64Url = lCropperInstance.toDataURL('image/png');
    $('#user-photo').attr('src',base64Url).attr('style','display:block');
    // lCropperInstance.toBlob(function(blob){
    //     $('#user-photo').attr('src',URL.createObjectURL(blob)).attr('style','display:block');
        $('#img-container').addClass('sr-only');
    // });
});

$('#register').click(function () {
    var photo = lCropperInstance.toDataURL('image/png');
    var upData = $('#AgencyForm').serializeArray();
    upData.push({
        'name':'avatar',
        'value':photo
    });

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
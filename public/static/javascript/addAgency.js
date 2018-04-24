// document.write("<script language=javascript src='https://cdn.bootcss.com/cropper/3.1.3/cropper.min.js'></script>");
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

    // Download
    // if (typeof download.download === 'undefined') {
    //   download.className += ' disabled';
    // }

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

        console.log(target);
        // while (target !== this) {
        //     if (target.getAttribute('data-method')) {
        //         break;
        //     }
        //
        //     target = target.parentNode;
        // }

        // if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
        //     return;
        // }

        data = {
            method: target.getAttribute('data-method'),
            target: target.getAttribute('data-target'),
            option: target.getAttribute('data-option') || undefined,
            secondOption: target.getAttribute('data-second-option') || undefined
        };
        console.log(data);
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
            console.log(result);
            if (result) {
                // Bootstrap's Modal
                // $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
                // var lCropperInstance = result.toDataURL('image/jpg');

                $('#img-output').html(result);
                // if (!download.disabled) {
                //   download.download = uploadedImageName;
                //   download.href = result.toDataURL(uploadedImageType);
                // }
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
// let lCropperInstance =null;
// let nameInput = false;
// let mobileInput = false;
// let avatarInput = false;
// var initCropperInModal = function(img, input){
//     var $image = img;
//     var $inputImage = input;
//     var options = {
//         aspectRatio: 1, // 纵横比
//         viewMode: 1,
//     };
//
//     var URL = window.URL || window.webkitURL;
//     var blobURL;
//     $image.cropper(options);
//
//     if (URL) {
//
//         $inputImage.change(function() {
//             var files = this.files;
//             var file;
//
//             if (!$image.data('cropper')) {
//                 return;
//             }
//             if (files && files.length) {
//                 file = files[0];
//                 if (/^image\/\w+$/.test(file.type)) {
//
//                     if(blobURL) {
//                         URL.revokeObjectURL(blobURL);
//                     }
//                     blobURL = URL.createObjectURL(file);
//                     console.log(blobURL);
//                     // 重置cropper，将图像替换
//                     $image.cropper('replace', blobURL);
//                     // 选择文件后，显示和隐藏相关内容
//                     $('#img-container').removeClass('sr-only');
//                 } else {
//                     window.alert('请选择一个图像文件！');
//                 }
//             }
//         });
//     } else {
//         $inputImage.prop('disabled', true).addClass('disabled');
//     }
// };
//
// $(function(){
//     initCropperInModal($('#photo'),$('#photoInput'));
// });
//
// $('#confirm').click(function () {
//     lCropperInstance = $('#photo').cropper('getCroppedCanvas',{
//         width:320,
//         height:320
//     }).toDataURL('image/jpg');
//
//     $('#user-photo').attr('src',lCropperInstance).attr('style','display:block');
//     $('#img-container').addClass('sr-only');
//     avatarInput = true;
//     if(checkInput()){
//         $('#register').removeClass('btn-secondary').addClass('btn-primary').removeAttr('disabled');
//     }
// });
//
// $('#register').click(function () {
//     var upData = $('#AgencyForm').serializeArray();
//     upData.push({
//         'name':'avatar',
//         'value':lCropperInstance
//     });
//     $(this).attr('disabled','disabled');
//     $.ajax({
//         url: "?s=/index/stuff/uploadInfo",
//         type: 'post',
//         data: upData,
//         dataType: 'json',
//         success: function (data) {
//             window.location.href="?s=/index/stuff/addAgencyResult/status/"+data.status;
//         }
//     });
// });
//
// $('#agencyMobile').blur(function () {
//     var testSr = $('#agencyMobile').val();
//     if(/^1\d{10}$/.test(testSr)){
//         $('#mobileInfoOk').removeClass('sr-only');
//         $('#mobileInfoErr').addClass('sr-only');
//         mobileInput = true;
//     }
//     else{
//         $('#mobileInfoErr').removeClass('sr-only');
//         $('#mobileInfoOk').addClass('sr-only');
//         mobileInput = false;
//     }
//     if(checkInput()){
//         $('#register').removeClass('btn-secondary').addClass('btn-primary').removeAttr('disabled');
//     }
// });
//
// $('#agencyName').blur(function () {
//     var testSr = $('#agencyName').val();
//     if(/^[\u4e00-\u9fa5]{2,5}$/.test(testSr)){
//         $('#nameInfoOk').removeClass('sr-only');
//         $('#nameInfoErr').addClass('sr-only');
//         nameInput = true;
//     }
//     else{
//         $('#nameInfoErr').removeClass('sr-only');
//         $('#nameInfoOk').addClass('sr-only');
//         nameInput = false;
//     }
//     if(checkInput()){
//         $('#register').removeClass('btn-secondary').addClass('btn-primary').removeAttr('disabled');
//     }
// });
//
// var checkInput = function() {
//     return nameInput && mobileInput && avatarInput;
// };
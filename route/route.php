<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2018 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

Route::get('think', function () {
    return 'hello,ThinkPHP5!';
});
//新增二手出售房源
Route::get('index/addresold', 'index/Add/resold');
//修改经纪人信息
Route::get('index/modifyAgency', 'index/Stuff/modifyAgency');
//增加经纪人信息
Route::get('index/addAgency', 'index/Stuff/addAgency');
return [

];
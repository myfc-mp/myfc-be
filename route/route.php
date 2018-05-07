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
// 不参数的post
//Route::post('index/addHouse', 'api/GetSelectedHouse/getResoldHouse');
// 要加参数的post
//Route::post('index/addHouse/:no', 'index/ManageRecommend/fromResold');
// 不参数的get
//Route::get('index/addHouse', 'api/ManageRecommend/getRecommendInfo');
// 要加参数的get
//Route::get('index/addHouse/:id', 'index/ManageRecommend/fromResold');
return [

];

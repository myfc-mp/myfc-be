<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件
namespace app;

use think\Facade;


Facade::bind([
      index\facade\Agency::class          => index\model\Agency::class,
      index\facade\Avatar::class          => index\model\Avatar::class,
      index\facade\Label::class           => index\model\Label::class,
      index\facade\ResoldItem::class      => index\model\ResoldItem::class,
      index\facade\LabelHouse::class      => index\model\LabelHouse::class,
      index\facade\Image::class           => index\model\Image::class,
      index\facade\RentItem::class        => index\model\RentItem::class,
      index\facade\Store::class           => index\model\Store::class,
      index\facade\Carousel::class        => index\model\Carousel::class,
      index\facade\Recommend::class       => index\model\Recommend::class,
      index\facade\Video::class           => index\model\Video::class,
//    api\facade\Theme::class             => api\model\Theme::class,
//    api\facade\User::class              => api\model\User::class,
//    api\facade\UserAddress::class       => api\model\UserAddress::class,
//    api\facade\Token::class             => api\service\Token::class,
//    api\facade\UserToken::class         => api\service\UserToken::class,
//    api\facade\UserException::class     => exception\UserException::class,
]);

function base64_upload($base64,$image_file) {
    //$base64_image = str_replace(' ', '+', $base64);
    //post的数据里面，加号会被替换为空格，需要重新替换回来，如果不是post的数据，则注释掉这一行
    //if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image, $match)){

        //下面这两行是把base64的前缀部分，也就是 data:image/png;base64，部分剥离出来
        //$base64_image= explode(',', $base64_image);
        //解码的时候，只需要后半截
        $picStr = base64_decode($base64);
        if (file_put_contents($image_file, $picStr)){
            return true;
        }
    //}
    return false;
}
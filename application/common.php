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
//    api\facade\Banner::class            => api\model\Banner::class,
//    api\facade\BannerItem ::class       => api\model\BannerItem::class,
//    api\facade\Category::class          => api\model\Category::class,
//    api\facade\Image::class             => api\model\Image::class,
//    api\facade\Order::class             => api\model\Order::class,
//    api\facade\OrderProduct::class      => api\model\OrderProduct::class,
//    api\facade\Product::class           => api\model\Product::class,
//    api\facade\ProductImage::class      => api\model\ProductImage::class,
//    api\facade\ProductProperty::class   => api\model\ProductProperty::class,
//    api\facade\Theme::class             => api\model\Theme::class,
//    api\facade\User::class              => api\model\User::class,
//    api\facade\UserAddress::class       => api\model\UserAddress::class,
//    api\facade\Token::class             => api\service\Token::class,
//    api\facade\UserToken::class         => api\service\UserToken::class,
//    api\facade\UserException::class     => exception\UserException::class,
]);
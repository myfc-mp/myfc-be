<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/29/029
 * Time: 23:52
 */

namespace app\index\model;

use function app\base64_upload;
use think\Db;

class Carousel extends BaseModel
{
    public function getCarouselFromDB(){
        return static::select();
    }

    public function updateCarousel($imageList){
        $toSaveList = [];
        $no = 0;
        Db::name('carousel')->delete(true);

        foreach ($imageList as $item){
            $image_name = $no++.'.jpg';
            //这里定义头像文件的保存路径，一定要用相对路径,特别注意大小写
            $image_file = "../public/static/carousel/".$image_name;
            base64_upload($item, $image_file);
            array_push($toSaveList,['url' =>$image_name ]);
        }

        return static::saveAll($toSaveList);
    }
}
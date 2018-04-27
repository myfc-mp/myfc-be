<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/27/027
 * Time: 9:08
 */

namespace app\index\model;

use think\facade\Request;
use think\Model;

class Image extends Model
{
    public function saveImage($id){
        $imageList = Request::param('image');
        $imageNo = count($imageList);
        foreach ($imageList as $item) {
            $imageNo++;
        }
//        $imageList = explode(",",$imageList);
//        $toSaveList = [];
//        foreach ($imageList as $item) {
//            array_push($toSaveList,['house_id' =>$id , 'url' => $item ]);
//        }

        return static::saveAll($toSaveList);
    }
}
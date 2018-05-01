<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/27/027
 * Time: 9:08
 */

namespace app\index\model;


use function app\base64_upload;

class Image extends BaseModel
{
    protected $hidden = ['delete_time','update_time'];
    public function saveImage($imageList,$id){
        $toSaveList = [];
        $no = 0;
        foreach ($imageList as $item){
            $image_name = $id.'_'.$no++.'.jpg';
            //这里定义头像文件的保存路径，一定要用相对路径,特别注意大小写
            $image_file = "../public/static/houseImage/".$image_name;
            base64_upload($item, $image_file);
            array_push($toSaveList,['house_id' =>$id,'url' =>$image_name ]);
        }

        return static::saveAll($toSaveList);
    }

    public function updateImage($imageList,$id){
        $toSaveList = [];
        $no = 0;
        $agency = self::where('house_id','=',$id)->find();
        while($agency){
            $agency->delete();
            $agency = self::where('house_id','=',$id)->find();
        }

        foreach ($imageList as $item){
            $image_name = $id.'_'.$no++.'.jpg';
            //这里定义头像文件的保存路径，一定要用相对路径,特别注意大小写
            $image_file = "../public/static/houseImage/".$image_name;
            base64_upload($item, $image_file);
            array_push($toSaveList,['house_id' =>$id,'url' =>$image_name ]);
        }

        return static::saveAll($toSaveList);
    }


}
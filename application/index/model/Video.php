<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/11/011
 * Time: 17:15
 */

namespace app\index\model;


use think\facade\Config;
use think\facade\Request;

class Video extends BaseModel
{
    public function saveVideo($id){
        //处理视频
        $file = Request::file('video');

        if($file){
            $nameSuffix = explode(".",$file->getInfo('name'));
            $finalName = $id.'.'.$nameSuffix[1];
            $change = function () use($finalName){
                return $finalName;
            };
            $file->rule($change)->move("static/houseImage/");
            $model = static::create([
                'url'          =>  Config::get('setting.house_prefix').$finalName,
                'house_id'     =>  $id
            ]);
        }
        //结束视频处理
        return true;
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/21/021
 * Time: 22:47
 */

namespace app\index\model;


use think\Model;

class Avatar extends Model
{
    public function saveAvatar($url,$id){
        $model = static::create([
            'url'           =>  $url,
            'agency_id'     =>  $id
        ]);

        return $model;
    }
}
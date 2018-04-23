<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/21/021
 * Time: 22:47
 */

namespace app\index\model;


use think\facade\Config;

class Avatar extends BaseModel
{
    protected $hidden = ['delete_time','update_time'];

    public function saveAvatar($url,$id){
        $model = null;
        if(static::where('agency_id','=',$id)->find()){
            return true;
        }
        else{
            $model = static::create([
                'url'           =>  $url,
                'agency_id'     =>  $id
            ]);
        }

        return $model;
    }

    //这个函数是自定义的，凡是采用getXXXAttr的函数，都是获取器，第一个参数是根据XXX自动决定的数据库的参数
    //TP框架在读取数据表的时候，如果有URL字段，就会自动调用该函数
    public function getUrlAttr($value)
    {

        //这里用于对Url地址进行完整化处理，数据库保存的是文件名，需要加上完整路径才能被客户端使用
        return Config::get('setting.avatar_prefix').$value;
    }
}
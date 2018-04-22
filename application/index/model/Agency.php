<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/19/019
 * Time: 8:37
 */

namespace app\index\model;


use think\facade\Request;
use think\Model;

class Agency extends Model
{
    public function saveAgency(){
        $model = static::create([
            'name'      =>  Request::param('name'),
            'phone'     =>  Request::param('mobile')
        ]);

        return $model;
    }
}
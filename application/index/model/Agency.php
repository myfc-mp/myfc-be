<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/19/019
 * Time: 8:37
 */

namespace app\index\model;


use think\facade\Request;


class Agency extends BaseModel
{
    protected $hidden = ['delete_time','update_time'];
    public function saveAgency(){
        $model = static::create([
            'name'      =>  Request::param('name'),
            'phone'     =>  Request::param('mobile')
        ]);

        return $model;
    }

    public function renewAgency(){

        $model = static::save([
            'name'  => Request::param('name'),
            'phone' => Request::param('mobile')
        ],['id' => Request::param('id')]);
        return $model;
    }

    public function avatar(){
        //这个函数内部返回hasMany的值，hasMany是用于一对多的关联，表示本模型需要关联其他模型的多条记录
        return $this->hasOne('avatar','agency_id','id');
    }

    public function getAgencyFromDB(){
        return self::with(['avatar'])->select();
    }

    public function getOneAgencyFromDB(){
        $id=Request::param('id');
        return self::with(['avatar'])->find($id);
    }

    public function deleteAgencyFromDB(){
        $id=Request::param('id');
        $agency = self::get($id,'avatar');

        return $agency->together('avatar')->delete();
    }
}
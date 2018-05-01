<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/29/029
 * Time: 11:32
 */

namespace app\index\model;


use think\facade\Request;

class Store extends BaseModel
{
    public function addStoreToDB()
    {
        $model = static::create([
            'name'          =>  Request::param('name'),
            'phone'         =>  Request::param('phone'),
            'address'      =>  Request::param('address'),
            'lat'           =>  Request::param('lat'),
            'lng'           =>  Request::param('lng'),
        ]);

        return $model;
    }

    public function renewStore(){
        $model = static::save([
            'name'          =>  Request::param('name'),
            'phone'         =>  Request::param('phone'),
            'address'      =>  Request::param('address'),
            'lat'           =>  Request::param('lat'),
            'lng'           =>  Request::param('lng'),
        ],['id' => Request::param('id')]);
        return $model;
    }

    public function deleteStoreFromDB(){
        $id = Request::param('id');
        $store = self::get($id);

        return $store->delete();
    }

    public function getStoreFromDB(){

        return self::select();
    }
}
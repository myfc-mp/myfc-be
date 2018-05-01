<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/1/001
 * Time: 8:02
 */

namespace app\index\model;


use think\facade\Request;

class Recommend extends BaseModel
{
    public function getRecommendFromDB(){
        return self::select();
    }

    public function updateRecommend(){

        $model = static::save([
            'house_id'    =>  Request::param('configHouseID'),
            'label'       =>  Request::param('labelRadios'),
            'config'      =>  '1',
        ],['id' => Request::param('recommendID')]);
        return $model;
    }

    public function deleteRecommendFromDB($id){
        $model = static::save([
            'house_id'    =>  '0',
            'config'      =>  '0',
        ],['id' => $id]);
        return $model;
    }
}
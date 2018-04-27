<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/26/026
 * Time: 23:47
 */

namespace app\index\model;


use think\facade\Request;
use think\Model;

class LabelHouse extends Model
{
    public function saveLabel($id){
        $labelList = Request::param('label');
        $labelList = explode(",",$labelList);
        $toSaveList = [];
        foreach ($labelList as $item) {
            array_push($toSaveList,['house_id' =>$id , 'label_id' => $item ]);
        }

        return static::saveAll($toSaveList);
    }
}
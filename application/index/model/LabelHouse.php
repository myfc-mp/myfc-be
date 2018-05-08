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

class LabelHouse extends BaseModel
{
    protected $hidden = ['delete_time','update_time','house_id'];
    public function saveLabel($id){
        $labelList = Request::param('label');
        if($labelList){
            $labelList = explode(",",$labelList);
            $toSaveList = [];
            foreach ($labelList as $item) {
                array_push($toSaveList,['house_id' =>$id , 'label_id' => $item ]);
            }
            return static::saveAll($toSaveList);
        }
        return true;
    }

    public function deleteLabelFromDB($id){
        return static::where('house_id','=',$id)->delete();
    }
}
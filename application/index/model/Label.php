<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/26/026
 * Time: 19:40
 */

namespace app\index\model;


class Label extends BaseModel
{
    protected $hidden = ['delete_time','update_time'];
    public function getLabelFromDB(){
        return self::select();
    }
}
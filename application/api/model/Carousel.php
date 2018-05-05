<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/2/002
 * Time: 9:30
 */

namespace app\api\model;


class Carousel extends BaseModel
{
    public function getCarouselFromDB(){
        return static::select();
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/2/002
 * Time: 9:25
 */

namespace app\api\controller;

use app\index\facade\Carousel;
use think\Controller;

class Advertising extends Controller
{
    public function getAllCarousel(){
        $result = Carousel::getCarouselFromDB();
        return $result;
    }
}
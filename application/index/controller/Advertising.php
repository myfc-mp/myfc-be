<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/29/029
 * Time: 23:47
 */

namespace app\index\controller;


use app\index\facade\Carousel;
use think\Controller;
use think\facade\Request;

class Advertising extends Controller
{
    public function addAdPic(){
        $this->assign('cssName','addAdPic');
        $this->assign('jsName','addAdPic');
        return $this->fetch();
    }

    public function saveCarouselResult($status){
        $result = null;
        if($status == 200)
        {
            $result = '配置成功';
        }
        else{
            $result = '配置失败';
        }
        $this->assign('result',$result);
        $this->assign('cssName','saveCarouselResult');
        $this->assign('jsName','saveCarouselResult');
        return $this->fetch();
    }

    public function getAllCarousel(){
        $result = Carousel::getCarouselFromDB();
        return $result;
    }

    public function saveCarousel(){
        $imageList = Request::param('image');
        $imageList = explode(",",$imageList);
        $result = Carousel::updateCarousel($imageList);

        if($result) {
            return ['status'=>'200'];
        }

        return ['status'=>'400'];
    }
}
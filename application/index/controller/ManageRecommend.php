<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/1/001
 * Time: 7:19
 */

namespace app\index\controller;

use app\index\facade\Recommend;
use app\index\facade\RentItem;
use app\index\facade\ResoldItem;
use think\Controller;

class ManageRecommend extends Controller
{
    public function getRecommendInfo(){
        $list = Recommend::getRecommendFromDB();
        $recommendList = [];
        foreach ($list as $item) {
            if($item->house_id < 100000){
                array_push($recommendList,ResoldItem::getOneResoldFromDB($item->house_id));
            }
            else{
                array_push($recommendList,RentItem::getOneRentFromDB($item->house_id));

            }
        }
//        foreach ($list as $item) {
//            if($item->house_id < 100000){
//                $recommendList[$item->id]=ResoldItem::getOneResoldFromDB($item->house_id);
//            }
//            else{
//                $recommendList[$item->id]=RentItem::getOneRentFromDB($item->house_id);
//            }
//        }
        $this->assign('list',$recommendList);
        $this->assign('cssName','getRecommendInfo');
        $this->assign('jsName','getRecommendInfo');
        return $this->fetch();
    }

    public function fromResold($id){
        $list = ResoldItem::getResoldAllFromDB();
        $this->assign('list',$list);
        $this->assign('no',$id);
        $this->assign('cssName','fromResold');
        $this->assign('jsName','fromResold');
        return $this->fetch();
    }

    public function fromRent($id){
        $list = RentItem::getRentAllFromDB();
        $this->assign('list',$list);
        $this->assign('no',$id);
        $this->assign('cssName','fromRent');
        $this->assign('jsName','fromRent');
        return $this->fetch();
    }

    public function configRecommend(){
        $result = Recommend::updateRecommend();

        if($result) {
            return ['status'=>'200'];
        }

        return ['status'=>'400'];
    }

    public function deleteRecommend($id){
        $result = Recommend::deleteRecommendFromDB($id);
        if($result) {
            return ['status'=>'200'];
        }

        return ['status'=>'400'];
    }

}
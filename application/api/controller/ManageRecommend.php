<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/2/002
 * Time: 12:12
 */

namespace app\api\controller;

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

        return $recommendList;
    }
}
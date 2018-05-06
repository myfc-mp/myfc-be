<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/5/005
 * Time: 11:47
 */

namespace app\api\controller;

use app\index\facade\RentItem;
use app\index\facade\ResoldItem;
use think\Controller;

class GetSelectedHouse extends Controller
{
    public function getResoldHouse(){
        return ResoldItem::getSelectedResoldFromDB();
    }

    public function getRentHouse(){
        return RentItem::getSelectedRentFromDB();
    }
}
<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/3/003
 * Time: 17:01
 */

namespace app\api\controller;


use app\index\facade\RentItem;
use app\index\facade\ResoldItem;
use think\Controller;
use think\facade\Request;

class GetHouse extends Controller
{
    public function getResoldHouse(){
        $id = Request::param('id');
        $result = ResoldItem::getOneResoldFromDB($id);

        return $result;
    }

    public function getRentHouse(){
        $id = Request::param('id');
        $result = RentItem::getOneRentFromDB($id);

        return $result;
    }
}
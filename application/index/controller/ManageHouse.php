<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/23/023
 * Time: 18:21
 */

namespace app\index\controller;


use think\Controller;

class ManageHouse extends Controller
{
    public function mngResold(){

        $list = Agency::getResoldFromDB();
        $this->assign('list',$list);
        $this->assign('cssName','mngResold');
        $this->assign('jsName','mngResold');
        return $this->fetch();
    }

    public function mngRent(){

        $list = Agency::getRentFromDB();
        $this->assign('list',$list);
        $this->assign('cssName','mngRent');
        $this->assign('jsName','mngRent');
        return $this->fetch();
    }
}
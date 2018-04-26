<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/17/017
 * Time: 23:23
 */

namespace app\index\controller;


use think\Controller;

class AddHouse extends Controller
{
    public function addResold(){
        $this->assign('cssName','addResold');
        $this->assign('jsName','addResold');
        return $this->fetch();
    }

    public function addRent(){
        $this->assign('cssName','addRent');
        $this->assign('jsName','addRent');
        return $this->fetch();
    }
}
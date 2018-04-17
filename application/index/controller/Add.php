<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/17/017
 * Time: 23:23
 */

namespace app\index\controller;


use think\Controller;

class Add extends Controller
{
    public function resold(){
        return $this->fetch();
    }

}
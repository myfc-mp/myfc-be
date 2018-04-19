<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/19/019
 * Time: 8:25
 */

namespace app\index\controller;


use think\Controller;

class Stuff extends Controller
{

    public function modifyAgency(){
        return $this->fetch();
    }

    public function addAgency(){

        return $this->fetch();
    }
}
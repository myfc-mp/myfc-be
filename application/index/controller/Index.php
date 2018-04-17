<?php
namespace app\index\controller;

use think\Controller;
use think\facade\Request;

class Index extends Controller
{
    public function index(){
        return $this->fetch();
    }

    public function welcome(){
        return "欢迎登陆玛雅管理后台";
    }

    public function save(){
        $param = Request::post();
        print_r($param);
        return true;
    }
}
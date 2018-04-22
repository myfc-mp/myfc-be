<?php
namespace app\index\controller;

use think\Controller;
use think\facade\Request;

class Index extends Controller
{
    public function index(){
        $this->assign('cssName','index');
        $this->assign('jsName','index');
        return $this->fetch();
    }
}
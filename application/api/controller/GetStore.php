<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/5/4/004
 * Time: 22:38
 */

namespace app\api\controller;

use app\index\facade\Store;
use think\Controller;

class GetStore extends Controller
{
    public function getStore(){
        return Store::getStoreFromDB();
    }
}
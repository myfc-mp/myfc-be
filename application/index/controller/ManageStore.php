<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/29/029
 * Time: 11:30
 */

namespace app\index\controller;


use app\index\facade\Store;
use think\Controller;

class ManageStore extends Controller
{
    public function addStoreInfo(){
        $this->assign('cssName','addStoreInfo');
        $this->assign('jsName','addStoreInfo');
        return $this->fetch();
    }

    public function addStoreResult($status){
        $result = null;
        if($status == 200)
        {
            $result = '门店添加成功';
        }
        else{
            $result = '门店添加失败';
        }
        $this->assign('result',$result);
        $this->assign('cssName','addStoreResult');
        $this->assign('jsName','addStoreResult');
        return $this->fetch();
    }

    public function saveStoreInfo(){
        $result = Store::addStoreToDB();

        if($result) {
            return ['status'=>'200'];
        }

        return ['status'=>'400'];
    }

    public function updateStoreInfo(){
        $result = Store::renewStore();

        if($result) {
            return ['status'=>'200'];
        }

        return ['status'=>'400'];
    }

    public function deleteStoreInfo(){
        $result = Store::deleteStoreFromDB();
        if($result) {
            return ['status'=>'200'];
        }

        return ['status'=>'400'];
    }

    public function getStoreInfo(){
        $list = Store::getStoreFromDB();
        $this->assign('list',$list);
        $this->assign('cssName','getStoreInfo');
        $this->assign('jsName','getStoreInfo');
        return $this->fetch();
    }
}
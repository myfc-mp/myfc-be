<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/23/023
 * Time: 18:21
 */

namespace app\index\controller;


use app\index\facade\RentItem;
use app\index\facade\ResoldItem;
use app\index\facade\LabelHouse;
use think\Controller;

class ManageHouse extends Controller
{
    public function mngResold(){

        $list = ResoldItem::getResoldAllFromDB();
        $this->assign('list',$list);
        $this->assign('cssName','mngResold');
        $this->assign('jsName','mngResold');
        return $this->fetch();
    }

    public function mngRent(){

        $list = RentItem::getRentAllFromDB();
        $this->assign('list',$list);
        $this->assign('cssName','mngRent');
        $this->assign('jsName','mngRent');
        return $this->fetch();
    }

    public function deleteResold($id){
        $result = ResoldItem::deleteResoldFromDB($id);
        LabelHouse::deleteLabelFromDB($id);
        if($result){
            for($i = 0; $i < 9; $i++){
                $image_file = "../public/static/houseImage/".$id."_".$i.".jpg";
                if(file_exists($image_file)){
                    unlink($image_file);
                }
                else{
                    break;
                }
            }
        }
        return ['status' => '200'];
    }

    public function deleteRent($id){
        $result = RentItem::deleteRentFromDB($id);
        LabelHouse::deleteLabelFromDB($id);
        if($result){
            for($i = 0; $i < 9; $i++){
                $image_file = "../public/static/houseImage/".$id."_".$i.".jpg";
                if(file_exists($image_file)){
                    unlink($image_file);
                }
                else{
                    break;
                }
            }
        }
        return ['status' => '200'];
    }

    public function modifyOneResold($id){
        $list = ResoldItem::getOneResoldFromDB($id);
        $this->assign('list',$list);
        $this->assign('cssName','addResold');
        $this->assign('jsName','mdfOneResold');
        return $this->fetch();

    }
}
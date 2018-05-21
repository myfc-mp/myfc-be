<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/17/017
 * Time: 23:23
 */

namespace app\index\controller;


use app\index\facade\Agency;
use app\index\facade\Image;
use app\index\facade\Label;
use app\index\facade\LabelHouse;
use app\index\facade\RentItem;
use app\index\facade\ResoldItem;
use app\index\facade\Video;
use think\Controller;
use think\facade\Request;

class AddHouse extends Controller
{
    public function addResold(){
        $this->assign('cssName','addResold');
        $this->assign('jsName','addResold');
        return $this->fetch();
    }

    public function saveResoldInfo(){
        $houseModel = ResoldItem::saveResold();
        LabelHouse::saveLabel($houseModel->id);
        $imageList = Request::param('image');
        if($imageList){
            $imageList = explode(",",$imageList);
        }
        $result = Image::saveImage($imageList,$houseModel->id);

        Video::saveVideo($houseModel->id);
        if($result) {
            return ['status'=>'200'];
        }

        return ['status'=>'400'];
    }

    public function addRent(){
        $this->assign('cssName','addRent');
        $this->assign('jsName','addRent');
        return $this->fetch();
    }

    public function saveRentInfo(){

        $houseModel = RentItem::saveRent();
        LabelHouse::saveLabel($houseModel->id);
        $imageList = Request::param('image');
        if($imageList){
            $imageList = explode(",",$imageList);
        }

        $result = Image::saveImage($imageList,$houseModel->id);

        Video::saveVideo($houseModel->id);

        if($result) {
            return ['status'=>'200'];
        }

        return ['status'=>'400'];
    }

    public function getAgencyAndLabelInfo(){
        $agencyList = Agency::getAgencyFromDB();
        $labelList = Label::getLabelFromDB();

        $result =[
            'agencyList' =>$agencyList,
            'labelList' =>$labelList
        ];

        return $result;
    }

    public function addResoldResult($status){
        $result = null;
        if($status == 200)
        {
            $result = '添加成功';
        }
        else{
            $result = '添加失败';
        }
        $this->assign('result',$result);
        $this->assign('cssName','addResoldResult');
        $this->assign('jsName','addResoldResult');
        return $this->fetch();
    }

    public function addRentResult($status){
        $result = null;
        if($status == 200)
        {
            $result = '添加成功';
        }
        else{
            $result = '添加失败';
        }
        $this->assign('result',$result);
        $this->assign('cssName','addRentResult');
        $this->assign('jsName','addRentResult');
        return $this->fetch();
    }
}
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
use app\index\facade\ResoldItem;
use think\Controller;

class AddHouse extends Controller
{
    public function addResold(){
        $this->assign('cssName','addResold');
        $this->assign('jsName','addResold');
        return $this->fetch();
    }

    public function saveResoldInfo(){
        $houseModel = ResoldItem::saveResold();
        $labelModel = LabelHouse::saveLabel($houseModel->id);
        Image::saveImage($houseModel->id);
        if($labelModel) {
            //用保存数据库得到的id来给头像命名
            $image_name = Request::param('id').'.jpg';
            //这里定义头像文件的保存路径，一定要用相对路径,特别注意大小写
            $image_file = "../public/static/personal/".$image_name;
//            $this->base64_upload(Request::param('avatar'), $image_file);
            return ['status'=>'200'];
        }

        return ['status'=>'400'];
    }

    public function addRent(){
        $this->assign('cssName','addRent');
        $this->assign('jsName','addRent');
        return $this->fetch();
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
            $result = '注册成功';
        }
        else{
            $result = '注册失败';
        }
        $this->assign('result',$result);
        $this->assign('cssName','addResoldResult');
        $this->assign('jsName','addResoldResult');
        return $this->fetch();
    }
}
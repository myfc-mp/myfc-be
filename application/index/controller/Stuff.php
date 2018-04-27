<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/19/019
 * Time: 8:25
 */

namespace app\index\controller;


use app\index\facade\Agency;
use app\index\facade\Avatar;
use think\Controller;
use think\facade\Request;

class Stuff extends Controller
{

    public function modifyAgency(){
        $list = Agency::getAgencyFromDB();
        $this->assign('list',$list);
        $this->assign('cssName','mdfAgency');
        $this->assign('jsName','mdfAgency');
        return $this->fetch();
    }

    public function addAgency(){
        $this->assign('cssName','addAgency');
        $this->assign('jsName','addAgency');
        return $this->fetch();
    }

    public function addAgencyResult($status){
        $result = null;
        if($status == 200)
        {
            $result = '注册成功';
        }
        else{
            $result = '注册失败';
        }
        $this->assign('result',$result);
        $this->assign('cssName','addAgency');
        $this->assign('jsName','addAgency');
        return $this->fetch();
    }

    public function uploadInfo(){
        $model = Agency::saveAgency();
        if($model) {
            //用保存数据库得到的id来给头像命名
            $image_name = $model->id.'.jpg';
            //这里定义头像文件的保存路径，一定要用相对路径,特别注意大小写
            $image_file = "../public/static/personal/".$image_name;
            $result = $this->base64_upload(Request::param('avatar'), $image_file);
            Avatar::saveAvatar($image_name,$model->id);
            if ($result) {
                return ['status' => '200'];
            }
        }

        return ['status'=>'400'];
    }

    protected function base64_upload($base64,$image_file) {
        $base64_image = str_replace(' ', '+', $base64);
        //post的数据里面，加号会被替换为空格，需要重新替换回来，如果不是post的数据，则注释掉这一行
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image, $match)){

            //下面这两行是把base64的前缀部分，也就是 data:image/png;base64，部分剥离出来
            $base64_image= explode(',', $base64_image);
            //解码的时候，只需要后半截
            $picStr = base64_decode($base64_image[1]);
            if (file_put_contents($image_file, $picStr)){
                return true;
            }
        }
        return false;
    }

    public function deleteInfo($id){
        $result = Agency::deleteAgencyFromDB();
        if($result){
            $image_file = "../public/static/personal/".$id.".jpg";
            unlink($image_file);
        }
        return ['status' => '200'];
    }

    public function modifyOneAgency(){
        $list = Agency::getOneAgencyFromDB();
        $this->assign('list',$list);
        $this->assign('cssName','addAgency');
        $this->assign('jsName','mdfOneAgency');
        return $this->fetch();

    }

    public function modifyInfo(){
        $model = Agency::renewAgency();
        if(Request::param('avatar')) {
            //用保存数据库得到的id来给头像命名
            $image_name = Request::param('id').'.jpg';
            //这里定义头像文件的保存路径，一定要用相对路径,特别注意大小写
            $image_file = "../public/static/personal/".$image_name;
            $result = $this->base64_upload(Request::param('avatar'), $image_file);

            if ($result) {
                return ['status' => '200'];
            }
        }

        return ['status'=>$model];
    }
}
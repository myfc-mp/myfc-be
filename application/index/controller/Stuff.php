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
            $result = $this->base64_upload(Request::param('avatar'), $model->id);

            if ($result) {
                return ['status' => '200'];
            }
        }

        return ['status'=>'400'];
    }

    protected function base64_upload($base64,$id) {
        $base64_image = str_replace(' ', '+', $base64);
        //post的数据里面，加号会被替换为空格，需要重新替换回来，如果不是post的数据，则注释掉这一行
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_image, $match)){
            //用保存数据库得到的id来给头像命名
            $image_name = $id.'.'.$match[2];

            //这里定义头像文件的保存路径，一定要用相对路径,特别注意大小写
            $image_file = "../public/Personal/".$image_name;
            //下面这两行是把base64的前缀部分，也就是 data:image/png;base64，部分剥离出来
            $base64_image= explode(',', $base64_image);
            //解码的时候，只需要后半截
            $picStr = base64_decode($base64_image[1]);
            if (file_put_contents($image_file, $picStr)){
                $result = Avatar::saveAvatar($image_name,$id);
                if($result){
                    return true;
                }
            }
        }
        return false;
    }
}
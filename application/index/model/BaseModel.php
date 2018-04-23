<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/22/022
 * Time: 11:25
 */

namespace app\index\model;


use think\Model;

class BaseModel extends Model
{
    //这个函数内部返回belongsTo的值，belongsTo是用于一对一的关联，表示本模型只关联其他模型的一条记录
    //后面的三个参数分别对应了
    //第一个参数：需要关联的模型
    //第二个参数：外键，这个可以是本模型的属性，也可以是被关联的模型的属性，必须是外键，但是只有当外键
    //是本model数据库的项的时候才能用belongsTo，如果外键是在被关联的model中，要用hasOne
    //第三个参数：主键，同样，可以是本模型，也可以是被关键模型的
    public function queryImage(){
        //这个函数内部返回hasMany的值，hasMany是用于一对多的关联，表示本模型需要关联其他模型的多条记录
        return $this->belongsTo('Image','img_id','id');
    }
}
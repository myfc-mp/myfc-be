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
    public function image(){
        //这个函数内部返回hasMany的值，hasMany是用于一对多的关联，表示本模型需要关联其他模型的多条记录
        return $this->hasMany('image','house_id','id');
    }

    public function label(){
        //这个函数内部返回hasMany的值，hasMany是用于一对多的关联，表示本模型需要关联其他模型的多条记录
        return $this->hasMany('LabelHouse','house_id','id');
    }

    public function agency(){
        //这个函数内部返回hasMany的值，hasMany是用于一对多的关联，表示本模型需要关联其他模型的多条记录
        return $this->belongsTo('Agency','agency','id');
    }

    public function labelName(){
        //多对多的关联查询，需要使用belongsToMany，其包含4个参数
        //参数一：关联查询的model名（其实也就是关联查询的表）
        //参数二：由于是多对多的查询，一定会有另外一张表来做中间关联，参数二就是中间表的名字
        //参数三：中间表中对于参数一的索引
        //参数四：中间表中对于参数二的索引
        return $this->belongsToMany('Label','Label_house','Label_id'
            ,'house_id');
    }

    public function avatar(){

        return $this->hasOne('Avatar','agency_id','id');
    }

}
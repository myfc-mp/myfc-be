<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/18/018
 * Time: 23:07
 */

namespace app\index\model;

use think\facade\Request;

class ResoldItem extends BaseModel
{
    protected $hidden = ['delete_time','update_time'];
    public function saveResold(){
        $model = static::create([
            'name'          =>  Request::param('name'),
            'title'         =>  Request::param('title'),
            'location'      =>  Request::param('location'),
            'floor'         =>  Request::param('floor'),
            'age'           =>  Request::param('age'),
            'area'          =>  Request::param('area'),
            'area_range'    =>  Request::param('area_range'),
            'price_total'   =>  Request::param('price_total'),
            'price_unit'    =>  Request::param('price_unit'),
            'price_range'   =>  Request::param('price_range'),
            'decoration'    =>  Request::param('decoration'),
            'category'      =>  Request::param('category'),
            'type'          =>  Request::param('type'),
            'agency'        =>  Request::param('agency'),
            'lat'           =>  Request::param('lat'),
            'lng'           =>  Request::param('lng'),
            'competence'    =>  Request::param('competence'),
            'around'        =>  Request::param('around'),
        ]);

        return $model;
    }

    public function getResoldAllFromDB(){
        return self::field('id,name,title,agency')->select();
    }

    public function deleteResoldFromDB($id){

        $resold = self::get($id,'image');

        return $resold->together('image')->delete();
    }

    public function getOneResoldFromDB($id){

        return self::with(['label','image','labelName','agency.avatar'])->find($id);
    }

    public function renewResold(){
        $model = static::save([
            'name'          =>  Request::param('name'),
            'title'         =>  Request::param('title'),
            'location'      =>  Request::param('location'),
            'floor'         =>  Request::param('floor'),
            'age'           =>  Request::param('age'),
            'area'          =>  Request::param('area'),
            'area_range'    =>  Request::param('area_range'),
            'price_total'   =>  Request::param('price_total'),
            'price_unit'    =>  Request::param('price_unit'),
            'price_range'   =>  Request::param('price_range'),
            'decoration'    =>  Request::param('decoration'),
            'category'      =>  Request::param('category'),
            'type'          =>  Request::param('type'),
            'agency'        =>  Request::param('agency'),
            'lat'           =>  Request::param('lat'),
            'lng'           =>  Request::param('lng'),
            'competence'    =>  Request::param('competence'),
            'around'        =>  Request::param('around'),
        ],['id' => Request::param('id')]);
        return $model;
    }

    public function getSelectedResoldFromDB(){
        $_Map=[];
        $location = Request::param('location');
        if($location != '不限'){
            $_Map['location']=$location;
        }
        $total = Request::param('price_total');
        if($total != '不限'){
            $_Map['price_range']=$total;
        }
        $type = Request::param('type');
        if($type != '不限'){
            $_Map['type']=$type;
        }
        $area = Request::param('area');
        if($area != '不限'){
            $_Map['area_range']=$area;
        }
        $page = Request::param('pageIndex');
        return static::where($_Map)
            ->field('id,name,title,location,type,area,price_total')
            ->with(['image','labelName'])
            ->order('update_time desc')
            ->paginate(15,true,['page'=>$page]);
    }
}
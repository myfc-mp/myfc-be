<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2018/4/27/027
 * Time: 21:50
 */

namespace app\index\model;


use think\facade\Request;


class RentItem extends BaseModel
{
    protected $hidden = ['delete_time','update_time'];
    protected $autoWriteTimeStamp = true;
    public function saveRent(){
        $model = static::create([
            'name'          =>  Request::param('name'),
            'title'         =>  Request::param('title'),
            'location'      =>  Request::param('location'),
            'floor'         =>  Request::param('floor'),
            'mode'          =>  Request::param('mode'),
            'area'          =>  Request::param('area'),
            'area_range'    =>  Request::param('area_range'),
            'rental'        =>  Request::param('rental'),
            'rental_range'  =>  Request::param('rental_range'),
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

    public function getRentAllFromDB(){
        return self::field('id,name,title,agency')->select();
    }

    public function deleteRentFromDB($id){

        $rent = self::get($id,'image');

        return $rent->together('image')->delete();
    }

    public function getOneRentFromDB($id){

        return self::with(['label','image','labelName','agency.avatar','video'])->find($id);
    }

    public function renewRent(){
        $model = static::save([
            'name'          =>  Request::param('name'),
            'title'         =>  Request::param('title'),
            'location'      =>  Request::param('location'),
            'floor'         =>  Request::param('floor'),
            'mode'          =>  Request::param('mode'),
            'area'          =>  Request::param('area'),
            'area_range'    =>  Request::param('area_range'),
            'rental'        =>  Request::param('rental'),
            'rental_range'  =>  Request::param('rental_range'),
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

    public function getSelectedRentFromDB(){
        $_Map=[];
        $location = Request::param('location');
        if($location != '不限'){
            $_Map['location']=$location;
        }
        $rental = Request::param('rental');
        if($rental != '不限'){
            $_Map['rental_range']=$rental;
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
            ->field('id,name,title,location,type,area,rental')
            ->with(['image','labelName'])
            ->order('update_time desc')
            ->paginate(15,true,['page'=>$page]);
    }
}
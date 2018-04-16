SET FOREIGN_KEY_CHECKS=0;

-- -------------------------------
-- Table structure for label
-- -------------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(10) NOT NULL COMMENT '房屋标签',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='房屋标签表';

-- ----------------------------
-- Records of label
-- ----------------------------
INSERT INTO `label` VALUES ('1',  '地铁沿线'  , null, null);
INSERT INTO `label` VALUES ('2',  '繁华地段'  , null, null);
INSERT INTO `label` VALUES ('3',  '配套成熟'  , null, null);
INSERT INTO `label` VALUES ('4',  '交通便利'  , null, null);
INSERT INTO `label` VALUES ('5',  '医疗发达'  , null, null);
INSERT INTO `label` VALUES ('6',  '优质学区'  , null, null);
INSERT INTO `label` VALUES ('7',  '位置安静'  , null, null);
INSERT INTO `label` VALUES ('8',  '人车分流'  , null, null);
INSERT INTO `label` VALUES ('9',  '酒店式公寓', null, null);
INSERT INTO `label` VALUES ('10', '综合体'    , null, null);
INSERT INTO `label` VALUES ('11', '品牌开发商', null, null);
INSERT INTO `label` VALUES ('12', '环境优美'  , null, null);
INSERT INTO `label` VALUES ('13', '江景房'    , null, null);
INSERT INTO `label` VALUES ('14', '临公园'    , null, null);
INSERT INTO `label` VALUES ('15', '刚需房'    , null, null);
INSERT INTO `label` VALUES ('16', '改善房'    , null, null);
INSERT INTO `label` VALUES ('17', '福利房'    , null, null);
INSERT INTO `label` VALUES ('18', '南北通透'  , null, null);
INSERT INTO `label` VALUES ('19', '投资地产'  , null, null);
INSERT INTO `label` VALUES ('20', '品质小区'  , null, null);
INSERT INTO `label` VALUES ('21', '素质住户'  , null, null);
INSERT INTO `label` VALUES ('22', '拎包入住'  , null, null);
INSERT INTO `label` VALUES ('23', '地下室'    , null, null);
INSERT INTO `label` VALUES ('24', '大露台'    , null, null);
INSERT INTO `label` VALUES ('25', '低单价'    , null, null);
INSERT INTO `label` VALUES ('26', '低总价'    , null, null);


-- -------------------------------
-- Table structure for label_house
-- -------------------------------
DROP TABLE IF EXISTS `label_house`;
CREATE TABLE `label_house` (
  `label_id` int(11) NOT NULL COMMENT '作为外键与标签信息关联',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`label_id`,`house_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标签和房屋对应表';


-- --------------------------------
-- Table structure for image
-- --------------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL COMMENT '房屋图片地址',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- -------------------------------------
-- Table structure for agency
-- -------------------------------------
DROP TABLE IF EXISTS `agency`;
CREATE TABLE `agency` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL COMMENT '房屋装修情况',
  `phone` varchar(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- -------------------------------
-- Table structure for resold_item
-- -------------------------------
DROP TABLE IF EXISTS `resold_item`;
CREATE TABLE `resold_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '楼盘信息',
  `title` varchar(100) NOT NULL COMMENT '房屋描述',
  `location` varchar(8) NOT NULL COMMENT '房屋所在行政区域，用作筛选',  
  `floor` varchar(6) NOT NULL COMMENT '房屋所在楼层，用作筛选', 
  `age` int(11) NOT NULL COMMENT '房屋建造时间',
  `area` varchar(10) NOT NULL COMMENT '房屋面积',
  `price_total` int(11) NOT NULL COMMENT '房屋总价',
  `price_unit` int(11) NOT NULL COMMENT '房屋单价',
  `price_range` varchar(16) NOT NULL COMMENT '总价范围',
  `decoration` varchar(4) NOT NULL COMMENT '房屋装修情况',
  `category` varchar(6) NOT NULL COMMENT '房屋类型',
  `type` varchar(10) NOT NULL COMMENT '房屋户型',
  `agency` varchar(10) NOT NULL COMMENT '代理人信息',
  `gps` int(11) NOT NULL COMMENT '房屋位置',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='二手房信息表';

-- -------------------------------
-- Table structure for resold_item
-- -------------------------------
DROP TABLE IF EXISTS `resold_item`;
CREATE TABLE `resold_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '楼盘信息',
  `title` varchar(100) NOT NULL COMMENT '房屋描述',
  `location` varchar(8) NOT NULL COMMENT '房屋所在行政区域，用作筛选',  
  `floor` varchar(6) NOT NULL COMMENT '房屋所在楼层，用作筛选', 
  `mode` varchar(4) NOT NULL COMMENT '租房模式',
  `area` varchar(10) NOT NULL COMMENT '房屋面积',
  `orientation` varchar(4) NOT NULL COMMENT '房屋朝向',
  `rental` int(11) NOT NULL COMMENT '月租金',
  `rental_range` varchar(16) NOT NULL COMMENT '租金范围',
  `decoration` varchar(4) NOT NULL COMMENT '房屋装修情况',
  `category` varchar(6) NOT NULL COMMENT '房屋类型',
  `type` varchar(10) NOT NULL COMMENT '房屋户型',
  `agency` varchar(10) NOT NULL COMMENT '代理人信息',
  `gps` int(11) NOT NULL COMMENT '房屋位置',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8mb4 COMMENT='租房信息表';


-- ----------------------------
-- Table structure for third_app
-- ----------------------------
DROP TABLE IF EXISTS `third_app`;
CREATE TABLE `third_app` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_id` varchar(64) NOT NULL COMMENT '应用app_id',
  `app_secret` varchar(64) NOT NULL COMMENT '应用secret',
  `app_description` varchar(100) DEFAULT NULL COMMENT '应用程序描述',
  `scope` varchar(20) NOT NULL COMMENT '应用权限',
  `scope_description` varchar(100) DEFAULT NULL COMMENT '权限描述',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COMMENT='访问API的各应用账号密码表';

-- ----------------------------
-- Records of third_app
-- ----------------------------
INSERT INTO `third_app` VALUES ('1', 'admin', '777*777', 'CMS', '32', 'Super', null, null);


SET FOREIGN_KEY_CHECKS=1;

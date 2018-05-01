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
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `url` varchar(50) NOT NULL COMMENT '房屋图片地址',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- --------------------------------
-- Table structure for avatar
-- --------------------------------
DROP TABLE IF EXISTS `avatar`;
CREATE TABLE `avatar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(50) NOT NULL COMMENT '头像图片地址',
  `agency_id` int(11) NOT NULL COMMENT '作为外键与经济人信息关联',
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
  `name` varchar(10) NOT NULL COMMENT '经纪人姓名',
  `phone` varchar(11) NOT NULL COMMENT '经纪人电话',
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
  `area_range` varchar(10) NOT NULL COMMENT '房屋面积范围',
  `price_total` int(11) NOT NULL COMMENT '房屋总价',
  `price_unit` int(11) NOT NULL COMMENT '房屋单价',
  `price_range` varchar(16) NOT NULL COMMENT '总价范围',
  `decoration` varchar(4) NOT NULL COMMENT '房屋装修情况',
  `category` varchar(6) NOT NULL COMMENT '房屋类型',
  `around` text NOT NULL COMMENT '房屋配套',
  `competence` text NOT NULL COMMENT '核心卖点',
  `type` varchar(10) NOT NULL COMMENT '房屋户型',
  `agency` varchar(10) NOT NULL COMMENT '代理人信息',
  `lat` double NOT NULL COMMENT 'GPS纬度',
  `lng` double NOT NULL COMMENT 'GPS经度',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='二手房信息表';

-- -------------------------------
-- Table structure for rent_item
-- -------------------------------
DROP TABLE IF EXISTS `rent_item`;
CREATE TABLE `rent_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '楼盘信息',
  `title` varchar(100) NOT NULL COMMENT '房屋描述',
  `location` varchar(8) NOT NULL COMMENT '房屋所在行政区域，用作筛选',  
  `floor` varchar(6) NOT NULL COMMENT '房屋所在楼层，用作筛选', 
  `mode` varchar(4) NOT NULL COMMENT '租房模式',
  `area` varchar(10) NOT NULL COMMENT '房屋面积',
  `area_range` varchar(10) NOT NULL COMMENT '房屋面积范围',  
  `rental` int(11) NOT NULL COMMENT '月租金',
  `rental_range` varchar(16) NOT NULL COMMENT '租金范围',
  `decoration` varchar(4) NOT NULL COMMENT '房屋装修情况',
  `category` varchar(6) NOT NULL COMMENT '房屋类型',
  `type` varchar(10) NOT NULL COMMENT '房屋户型',
  `around` text NOT NULL COMMENT '房屋配套',
  `competence` text NOT NULL COMMENT '核心卖点',
  `agency` varchar(10) NOT NULL COMMENT '代理人信息',
  `lat` double NOT NULL COMMENT 'GPS纬度',
  `lng` double NOT NULL COMMENT 'GPS经度',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100001 DEFAULT CHARSET=utf8mb4 COMMENT='租房信息表';


-- ----------------------------
-- Table structure for store
-- ----------------------------
DROP TABLE IF EXISTS `store`;
CREATE TABLE `store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL COMMENT '门店名字',
  `phone` varchar(12) NOT NULL COMMENT '联系电话',
  `address` varchar(80) DEFAULT NULL COMMENT '门店地址',
  `lat` double NOT NULL COMMENT 'GPS纬度',
  `lng` double NOT NULL COMMENT 'GPS经度',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='门店信息表';

-- --------------------------------
-- Table structure for advertising
-- --------------------------------
DROP TABLE IF EXISTS `carousel`;
CREATE TABLE `carousel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(50) NOT NULL COMMENT 'carousel图片地址',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

-- --------------------------------
-- Table structure for recommend
-- --------------------------------
DROP TABLE IF EXISTS `recommend`;
CREATE TABLE `recommend` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `config` tinyint NOT NULL COMMENT '是否配置',
  `label` varchar(10) NOT NULL COMMENT '封推标签',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO `recommend` VALUES ('1', '独家', '0' , '0'  , null, null);
INSERT INTO `recommend` VALUES ('2', '独家', '0' , '0'  , null, null);
INSERT INTO `recommend` VALUES ('3', '独家', '0' , '0'  , null, null);
INSERT INTO `recommend` VALUES ('4', '独家', '0' , '0'  , null, null);
INSERT INTO `recommend` VALUES ('5', '独家', '0' , '0'  , null, null);
INSERT INTO `recommend` VALUES ('6', '独家', '0' , '0'  , null, null);
INSERT INTO `recommend` VALUES ('7', '独家', '0' , '0'  , null, null);
INSERT INTO `recommend` VALUES ('8', '独家', '0' , '0'  , null, null);
INSERT INTO `recommend` VALUES ('9', '独家', '0' , '0'  , null, null);

SET FOREIGN_KEY_CHECKS=1;

SET FOREIGN_KEY_CHECKS=0;

-- --------------------------------------------
-- Table structure for resold_price
-- --------------------------------------------
DROP TABLE IF EXISTS `resold_price`;
CREATE TABLE `resold_price` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price_range` varchar(50) NOT NULL COMMENT '总价范围，用作筛选',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='二手房总价筛选表';


-- -----------------------------------
-- Table structure for resold_location
-- -----------------------------------
DROP TABLE IF EXISTS `resold_location`;
CREATE TABLE `resold_location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(100) NOT NULL COMMENT '房屋所在行政区域，用作筛选',  
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,  
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='二手房区域筛选表';


-- -------------------------------
-- Table structure for resold_type
-- -------------------------------
DROP TABLE IF EXISTS `resold_type`;
CREATE TABLE `resold_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL COMMENT '房屋户型',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='二手房户型筛选表';


-- -------------------------------
-- Table structure for resold_area
-- -------------------------------
DROP TABLE IF EXISTS `resold_area`;
CREATE TABLE `resold_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area` varchar(50) NOT NULL COMMENT '房屋面积',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='二手房面积筛选表';


-- --------------------------------
-- Table structure for resold_image
-- --------------------------------
DROP TABLE IF EXISTS `resold_image`;
CREATE TABLE `resold_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL COMMENT '房屋图片地址',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- -------------------------------------
-- Table structure for resold_decoration
-- -------------------------------------
DROP TABLE IF EXISTS `resold_decoration`;
CREATE TABLE `resold_decoration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `decoration` varchar(50) NOT NULL COMMENT '房屋装修情况',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
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
  `name` varchar(100) NOT NULL COMMENT '楼盘信息',
  `description` varchar(255) NOT NULL COMMENT '房屋描述',
  `location` varchar(100) NOT NULL COMMENT '房屋所在行政区域，用作筛选',  
  `floor` varchar(50) NOT NULL COMMENT '房屋所在楼层，用作筛选', 
  `age` int(11) NOT NULL COMMENT '房屋建造时间',
  `area` varchar(50) NOT NULL COMMENT '房屋面积',
  `type` varchar(50) NOT NULL COMMENT '房屋户型',
  `decoration` varchar(50) NOT NULL COMMENT '房屋装修情况',
  `price` int(11) NOT NULL COMMENT '房屋总价',
  `gps` int(11) NOT NULL COMMENT '房屋位置',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='二手房信息表';


-- --------------------------------------------
-- Table structure for rent_rental
-- --------------------------------------------
DROP TABLE IF EXISTS `rent_rental`;
CREATE TABLE `rent_rental` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rental_range` varchar(50) NOT NULL COMMENT '租金范围，用作筛选',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='租金筛选表';


-- --------------------------------------------
-- Table structure for rent_orientation
-- --------------------------------------------
DROP TABLE IF EXISTS `rent_orientation`;
CREATE TABLE `rent_orientation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orientation` varchar(50) NOT NULL COMMENT '房屋朝向，用作筛选',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='朝向筛选表';


-- -----------------------------------
-- Table structure for rent_location
-- -----------------------------------
DROP TABLE IF EXISTS `rent_location`;
CREATE TABLE `rent_location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(100) NOT NULL COMMENT '房屋所在行政区域，用作筛选',  
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,  
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='租房区域筛选表';


-- -------------------------------
-- Table structure for rent_type
-- -------------------------------
DROP TABLE IF EXISTS `rent_type`;
CREATE TABLE `rent_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL COMMENT '房屋户型',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='租房户型筛选表';


-- -------------------------------
-- Table structure for rent_area
-- -------------------------------
DROP TABLE IF EXISTS `rent_area`;
CREATE TABLE `rent_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `area` varchar(50) NOT NULL COMMENT '房屋面积',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='租房面积筛选表';


-- --------------------------------
-- Table structure for rent_image
-- --------------------------------
DROP TABLE IF EXISTS `rent_image`;
CREATE TABLE `resold_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL COMMENT '房屋图片地址',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- -------------------------------------
-- Table structure for rent_decoration
-- -------------------------------------
DROP TABLE IF EXISTS `rent_decoration`;
CREATE TABLE `rent_decoration` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `decoration` varchar(50) NOT NULL COMMENT '房屋装修情况',
  `house_id` int(11) NOT NULL COMMENT '作为外键与房屋信息关联',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;


-- -------------------------------
-- Table structure for rent_item
-- -------------------------------
DROP TABLE IF EXISTS `rent_item`;
CREATE TABLE `rent_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL COMMENT '楼盘信息',
  `orientation` varchar(50) NOT NULL COMMENT '房屋朝向，用作筛选',
  `description` varchar(255) NOT NULL COMMENT '房屋描述',
  `location` varchar(100) NOT NULL COMMENT '房屋所在行政区域，用作筛选',  
  `floor` varchar(50) NOT NULL COMMENT '房屋所在楼层，用作筛选', 
  `age` int(11) NOT NULL COMMENT '房屋建造时间',
  `area` varchar(50) NOT NULL COMMENT '房屋面积',
  `type` varchar(50) NOT NULL COMMENT '房屋户型',
  `decoration` varchar(50) NOT NULL COMMENT '房屋装修情况',
  `price` int(11) NOT NULL COMMENT '房屋总价',
  `gps` int(11) NOT NULL COMMENT '房屋位置',
  `delete_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='二手房信息表';


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
INSERT INTO `third_app` VALUES ('1', 'starcraft', '777*777', 'CMS', '32', 'Super', null, null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(50) NOT NULL,
  `nickname` varchar(50) DEFAULT NULL,
  `extend` varchar(255) DEFAULT NULL,
  `delete_time` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL COMMENT '注册时间',
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `openid` (`openid`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for user_address
-- ----------------------------
DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '收获人姓名',
  `mobile` varchar(20) NOT NULL COMMENT '手机号',
  `province` varchar(20) DEFAULT NULL COMMENT '省',
  `city` varchar(20) DEFAULT NULL COMMENT '市',
  `country` varchar(20) DEFAULT NULL COMMENT '区',
  `detail` varchar(100) DEFAULT NULL COMMENT '详细地址',
  `delete_time` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL COMMENT '外键',
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user_address
-- ----------------------------
SET FOREIGN_KEY_CHECKS=1;

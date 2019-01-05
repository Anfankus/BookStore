/*
 Navicat Premium Data Transfer

 Source Server         : connection1
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : bookstore

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 05/01/2019 23:11:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE `BookStore`;
USE BookStore;
-- ----------------------------
-- Table structure for bookInfo
-- ----------------------------
DROP TABLE IF EXISTS `bookInfo`;
CREATE TABLE `bookInfo`  (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `bname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `author` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` double NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL,
  `classid` int(11) NOT NULL,
  PRIMARY KEY (`bid`) USING BTREE,
  INDEX `classid`(`classid`) USING BTREE,
  INDEX `bname`(`bname`, `author`) USING BTREE,
  CONSTRAINT `bookInfo_ibfk_1` FOREIGN KEY (`classid`) REFERENCES `classInfo` (`cid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 51 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bookInfo
-- ----------------------------
INSERT INTO `bookInfo` VALUES (1, '我喜欢生命本来的样子', '周国平', 34.6, 10, 1);
INSERT INTO `bookInfo` VALUES (2, '浮生六记', '沈复', 28.5, 20, 1);
INSERT INTO `bookInfo` VALUES (3, '自在独行', '贾平凹', 21.5, 30, 1);
INSERT INTO `bookInfo` VALUES (4, '我与地坛', '史铁生', 37.4, 50, 1);
INSERT INTO `bookInfo` VALUES (5, '人间词话', '王国维', 21, 50, 1);
INSERT INTO `bookInfo` VALUES (6, '皮囊', '蔡崇达', 21.8, 50, 1);
INSERT INTO `bookInfo` VALUES (7, '笑场', '李诞', 32.1, 50, 1);
INSERT INTO `bookInfo` VALUES (8, '西游记', '六小龄童', 200, 5, 1);
INSERT INTO `bookInfo` VALUES (9, '你是人间四月天', '林徽因', 19.3, 50, 1);
INSERT INTO `bookInfo` VALUES (10, '瓦尔登湖', '梭罗(美)', 23.9, 50, 1);
INSERT INTO `bookInfo` VALUES (11, '万历十五年', '黄仁宇', 16.1, 50, 2);
INSERT INTO `bookInfo` VALUES (12, '史记', '司马迁', 32, 0, 2);
INSERT INTO `bookInfo` VALUES (13, '资治通鉴', '司马光', 34, 50, 2);
INSERT INTO `bookInfo` VALUES (14, '中国通史', '吕思勉', 28.7, 50, 2);
INSERT INTO `bookInfo` VALUES (15, '明朝那些事儿', '当年明月', 227.1, 50, 2);
INSERT INTO `bookInfo` VALUES (16, '人类简史', '海斯', 34.2, 50, 2);
INSERT INTO `bookInfo` VALUES (17, '未来简史', '尤瓦尔赫拉利', 86, 50, 2);
INSERT INTO `bookInfo` VALUES (18, '历史的底牌', '何亿', 28.3, 50, 2);
INSERT INTO `bookInfo` VALUES (19, '鱼羊野史', '高晓松', 127.2, 50, 2);
INSERT INTO `bookInfo` VALUES (20, '紫禁城的黄昏', '庄士敦', 22, 50, 2);
INSERT INTO `bookInfo` VALUES (21, '懂你', '陈果', 17.1, 50, 3);
INSERT INTO `bookInfo` VALUES (22, '理想国', '柏拉图 ', 24.9, 50, 3);
INSERT INTO `bookInfo` VALUES (23, '中央帝国的哲学密码', '郭建龙', 56.1, 50, 3);
INSERT INTO `bookInfo` VALUES (24, '人生有何意义', '胡适', 19.7, 50, 3);
INSERT INTO `bookInfo` VALUES (25, '中国哲学简史', '冯友兰', 23.6, 50, 3);
INSERT INTO `bookInfo` VALUES (26, '美的历程', '李泽厚', 30.8, 50, 3);
INSERT INTO `bookInfo` VALUES (27, '墨菲定律', '张文成', 23.4, 50, 4);
INSERT INTO `bookInfo` VALUES (28, '天才在左疯子在右', '高铭', 31.3, 50, 4);
INSERT INTO `bookInfo` VALUES (29, '行为心理学', '华生', 23.4, 50, 4);
INSERT INTO `bookInfo` VALUES (30, '沟通心理学', '刘艳华', 17.8, 50, 4);
INSERT INTO `bookInfo` VALUES (31, '心理学与生活', '理查德格里格', 56.4, 50, 4);
INSERT INTO `bookInfo` VALUES (32, '从小读到大', '尹建莉', 37.3, 50, 5);
INSERT INTO `bookInfo` VALUES (33, '教养的秘密', '王宏哲', 31, 50, 5);
INSERT INTO `bookInfo` VALUES (34, '童年的秘密', '蒙台梭利', 14.8, 50, 5);
INSERT INTO `bookInfo` VALUES (35, '数学之美', '吴军', 32.9, 50, 6);
INSERT INTO `bookInfo` VALUES (36, 'Python编程入门到实践', '埃里克马瑟斯', 62, 50, 6);
INSERT INTO `bookInfo` VALUES (37, '码农翻身', '刘欣', 54.5, 50, 6);
INSERT INTO `bookInfo` VALUES (38, '机器学习', '周志华', 62.1, 50, 6);
INSERT INTO `bookInfo` VALUES (39, '书法没有秘密', '寇克让', 77.4, 50, 7);
INSERT INTO `bookInfo` VALUES (40, '角落', '敖路', 64, 50, 7);
INSERT INTO `bookInfo` VALUES (41, '艺术的故事', '贡布里希', 182, 50, 7);
INSERT INTO `bookInfo` VALUES (42, '新概念英语', '亚历山大', 22.5, 50, 8);
INSERT INTO `bookInfo` VALUES (43, '星火英语', '汪开虎', 36.8, 50, 8);
INSERT INTO `bookInfo` VALUES (44, '了不起的盖茨比', '菲茨杰拉德', 22.6, 50, 8);
INSERT INTO `bookInfo` VALUES (45, '四圣心源', '黄元御', 12.4, 50, 9);
INSERT INTO `bookInfo` VALUES (46, '本草纲目', '李时珍', 19.72, 50, 9);
INSERT INTO `bookInfo` VALUES (47, '无极之境', '陆辉', 77.4, 50, 9);
INSERT INTO `bookInfo` VALUES (48, '我们仨', '杨绛', 14, 50, 10);
INSERT INTO `bookInfo` VALUES (49, '苏东坡传', '林语堂', 26, 50, 10);
INSERT INTO `bookInfo` VALUES (50, '你若安好便是晴天', '白落梅', 18, 50, 10);

-- ----------------------------
-- Table structure for bookorder
-- ----------------------------
DROP TABLE IF EXISTS `bookorder`;
CREATE TABLE `bookorder`  (
  `boid` int(11) NOT NULL AUTO_INCREMENT,
  `oid` int(11) NOT NULL,
  `bid` int(11) NOT NULL,
  `amount` int(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`boid`) USING BTREE,
  INDEX `oid`(`oid`) USING BTREE,
  INDEX `bid`(`bid`) USING BTREE,
  CONSTRAINT `bookorder_ibfk_1` FOREIGN KEY (`oid`) REFERENCES `orders` (`oid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `bookorder_ibfk_2` FOREIGN KEY (`bid`) REFERENCES `bookInfo` (`bid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for classInfo
-- ----------------------------
DROP TABLE IF EXISTS `classInfo`;
CREATE TABLE `classInfo`  (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`cid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of classInfo
-- ----------------------------
INSERT INTO `classInfo` VALUES (1, '文学');
INSERT INTO `classInfo` VALUES (2, '历史');
INSERT INTO `classInfo` VALUES (3, '哲学');
INSERT INTO `classInfo` VALUES (4, '心理学');
INSERT INTO `classInfo` VALUES (5, '亲子');
INSERT INTO `classInfo` VALUES (6, '计算机');
INSERT INTO `classInfo` VALUES (7, '艺术');
INSERT INTO `classInfo` VALUES (8, '外语');
INSERT INTO `classInfo` VALUES (9, '医学');
INSERT INTO `classInfo` VALUES (10, '传记');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `oid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `paymoney` double NOT NULL,
  `deliverytime` date NULL DEFAULT NULL,
  `arrivaltime` date NULL DEFAULT NULL,
  `orderstatus` int(11) NOT NULL,
  PRIMARY KEY (`oid`) USING BTREE,
  INDEX `username`(`username`) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`username`) REFERENCES `userInfo` (`username`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for userInfo
-- ----------------------------
DROP TABLE IF EXISTS `userInfo`;
CREATE TABLE `userInfo`  (
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`username`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: swp_hotel_management
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `is_deleted` tinyint(1) DEFAULT '0',
  `role_id` int DEFAULT NULL,
  `profile_id` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UQ_Email` (`Email`),
  KEY `FKd4vb66o896tay3yy52oqxr9w0` (`role_id`),
  KEY `FKlelt1dhpyk7dqxdco3x3cd5ub` (`profile_id`),
  CONSTRAINT `FKd4vb66o896tay3yy52oqxr9w0` FOREIGN KEY (`role_id`) REFERENCES `role` (`Id`),
  CONSTRAINT `FKlelt1dhpyk7dqxdco3x3cd5ub` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'0707943005','customer@fpt.edu.vn','123456789',0,3,1),(2,'0908265086','admin@fpt.edu.vn','123456789',0,1,2),(3,'0711111111','staff@fpt.edu.vn','123456789',0,2,3),(4,'12345622','abc@gmail.com','123123',NULL,3,5),(5,'123123123123','aaa@gmail.com','123321',NULL,3,4),(8,'123123123123','vit@gmail.com','123456',NULL,3,6);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog`
--

DROP TABLE IF EXISTS `blog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Content` longtext COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT NULL,
  `thumbnail_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `account_id` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK2rvtagi1yam2hsyv2i27i0lrl` (`account_id`),
  CONSTRAINT `FK2rvtagi1yam2hsyv2i27i0lrl` FOREIGN KEY (`account_id`) REFERENCES `account` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog`
--

LOCK TABLES `blog` WRITE;
/*!40000 ALTER TABLE `blog` DISABLE KEYS */;
INSERT INTO `blog` VALUES (1,'Hnay là thứ 2','Thứ 2 là ngày đầu tuần ','2023-06-17 19:10:27','thu2.image',1),(2,'Hnay là thứ 3','Thứ 3 là tiểu tam','2023-06-17 19:10:46','thu3.image',1),(3,'Hnay là thứ 5','Thứ  4 hum qua','2023-06-17 19:11:14','thu4.image',2);
/*!40000 ALTER TABLE `blog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` int DEFAULT NULL,
  `account_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FKljoe4l0npa8nv5q24e4c1n1ik` (`account_id`),
  KEY `FK3f6svlc0gdd8jhh1g8c9lwm8b` (`room_id`),
  CONSTRAINT `FK3f6svlc0gdd8jhh1g8c9lwm8b` FOREIGN KEY (`room_id`) REFERENCES `room` (`Id`),
  CONSTRAINT `FKljoe4l0npa8nv5q24e4c1n1ik` FOREIGN KEY (`account_id`) REFERENCES `account` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,'Gooooooooood',4,1,1),(2,'Siu dep',5,1,1),(3,'Sieeeu dep',5,2,2),(4,'suppr dep',5,2,3),(5,'supeeeeepr dep',5,2,1);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbackservice`
--

DROP TABLE IF EXISTS `feedbackservice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbackservice` (
  `id` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `is_deleted` tinyint DEFAULT NULL,
  `rating` int NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `feedback_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK4svg5n7s9i0998gc9e1piykjw` (`feedback_id`),
  CONSTRAINT `FK4svg5n7s9i0998gc9e1piykjw` FOREIGN KEY (`feedback_id`) REFERENCES `feedback` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbackservice`
--

LOCK TABLES `feedbackservice` WRITE;
/*!40000 ALTER TABLE `feedbackservice` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbackservice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `first_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `last_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Sex` enum('Male','Female','Other') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT 'default.jpg',
  `is_deleted` tinyint(1) DEFAULT '0',
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`profile_id`),
  KEY `profile_id` (`profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES ('VyVy','VyVy','Female','123123',0,'HCM',1),('Phúc','Trần',NULL,'default.jpg',0,'GG',2),('Vũ','Trương',NULL,'default.jpg',0,'HN',3),('111','aa','Female','HANA',0,'HNAA',4),('www','ccc','Female','aaa',NULL,'DT',5),('vit','vit','Male','HCMCM',NULL,'HCM',6);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Admin'),(2,'Staff'),(3,'Customer');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Price` decimal(10,2) DEFAULT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_rent` tinyint(1) DEFAULT '0',
  `cate_id` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FKnuhr50pepdf2f32ootlqffmal` (`cate_id`),
  CONSTRAINT `FKnuhr50pepdf2f32ootlqffmal` FOREIGN KEY (`cate_id`) REFERENCES `roomcategory` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Phòng Đơn 1',350000.00,'abcxyz',0,1),(2,'Phòng Đơn 2',400000.00,NULL,0,1),(3,'Phòng Đôi 1',750000.00,NULL,0,3),(4,'Phòng Đơn 2',350000.00,'FPTRoom',0,1);
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomcategory`
--

DROP TABLE IF EXISTS `roomcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomcategory` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Amount` int DEFAULT '0',
  `Description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomcategory`
--

LOCK TABLES `roomcategory` WRITE;
/*!40000 ALTER TABLE `roomcategory` DISABLE KEYS */;
INSERT INTO `roomcategory` VALUES (1,'Single',2,'1 giường 1 tủ lạnh'),(2,'Double',1,NULL),(3,'Triple',0,NULL),(4,'Executive Suite',0,NULL),(5,'Junior Suite',0,NULL),(6,'President Suite',0,NULL),(7,'Connecting Room',0,NULL),(8,'SuperMan',40,'superdep');
/*!40000 ALTER TABLE `roomcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Description` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `price` double DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Ăn Uống','buffett',2000),(2,'Dọn Phòng',NULL,4000),(3,'Giặt ủi',NULL,6000),(4,'Gửi Xe ô tô','gửi ở bãi dưới hotel',5000);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-18 18:47:26

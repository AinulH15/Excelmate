-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: excel_learning
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmarks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `session_id` varchar(64) DEFAULT NULL,
  `lesson_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookmarks_session_id_lesson_id_unique` (`session_id`,`lesson_id`),
  KEY `bookmarks_user_id_foreign` (`user_id`),
  KEY `bookmarks_lesson_id_foreign` (`lesson_id`),
  CONSTRAINT `bookmarks_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bookmarks_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `color` varchar(20) NOT NULL DEFAULT 'mint',
  `icon` varchar(50) NOT NULL DEFAULT 'BookOpen',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Pengenalan Excel','pengenalan-excel',NULL,'mint','BookOpen','2026-11-17 02:41:55','2026-11-17 02:41:55'),(2,'Rumus & Fungsi Dasar','rumus-dasar',NULL,'blue','Calculator','2026-11-17 02:41:55','2026-11-17 02:41:55'),(3,'Rumus & Referensi Lanjutan','rumus-lanjutan',NULL,'lavender','GitBranch','2026-11-17 02:41:55','2026-11-17 02:41:55'),(4,'Pengolahan & Pembersihan Data','pengolahan-data',NULL,'pink','BarChart','2026-11-17 02:41:55','2026-11-17 02:41:55'),(5,'Analisis & Penyajian Data','analisis-data',NULL,'yellow','PieChart','2026-11-17 02:41:56','2026-11-17 02:41:56');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_answers`
--

DROP TABLE IF EXISTS `exercise_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_answers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `attempt_id` bigint(20) unsigned NOT NULL,
  `exercise_id` bigint(20) unsigned NOT NULL,
  `selected_option_id` bigint(20) unsigned DEFAULT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `exercise_answers_attempt_id_exercise_id_unique` (`attempt_id`,`exercise_id`),
  KEY `exercise_answers_exercise_id_foreign` (`exercise_id`),
  KEY `exercise_answers_selected_option_id_foreign` (`selected_option_id`),
  CONSTRAINT `exercise_answers_attempt_id_foreign` FOREIGN KEY (`attempt_id`) REFERENCES `exercise_attempts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `exercise_answers_exercise_id_foreign` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE,
  CONSTRAINT `exercise_answers_selected_option_id_foreign` FOREIGN KEY (`selected_option_id`) REFERENCES `exercise_options` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_answers`
--

LOCK TABLES `exercise_answers` WRITE;
/*!40000 ALTER TABLE `exercise_answers` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_attempts`
--

DROP TABLE IF EXISTS `exercise_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_attempts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `session_id` varchar(64) DEFAULT NULL,
  `score` int(11) NOT NULL DEFAULT 0,
  `correct_count` int(11) NOT NULL DEFAULT 0,
  `total_count` int(11) NOT NULL DEFAULT 0,
  `status` varchar(20) NOT NULL DEFAULT 'in_progress',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `exercise_attempts_user_id_foreign` (`user_id`),
  KEY `exercise_attempts_lesson_id_session_id_index` (`lesson_id`,`session_id`),
  KEY `exercise_attempts_session_id_status_index` (`session_id`,`status`),
  CONSTRAINT `exercise_attempts_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `exercise_attempts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_attempts`
--

LOCK TABLES `exercise_attempts` WRITE;
/*!40000 ALTER TABLE `exercise_attempts` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercise_attempts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_options`
--

DROP TABLE IF EXISTS `exercise_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise_options` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `exercise_id` bigint(20) unsigned NOT NULL,
  `label` varchar(10) NOT NULL,
  `text` text NOT NULL,
  `is_correct` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `exercise_options_exercise_id_foreign` (`exercise_id`),
  CONSTRAINT `exercise_options_exercise_id_foreign` FOREIGN KEY (`exercise_id`) REFERENCES `exercises` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=261 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_options`
--

LOCK TABLES `exercise_options` WRITE;
/*!40000 ALTER TABLE `exercise_options` DISABLE KEYS */;
INSERT INTO `exercise_options` VALUES (1,1,'A','Benar',1,'2026-11-17 02:41:56','2026-11-17 02:41:56'),(2,1,'B','Salah',0,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(3,2,'A','Benar',1,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(4,2,'B','Salah',0,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(5,3,'A','Benar',1,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(6,3,'B','Salah',0,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(7,4,'A','Benar',1,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(8,4,'B','Salah',0,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(9,5,'A','Benar',1,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(10,5,'B','Salah',0,'2026-11-17 02:41:58','2026-11-17 02:41:58'),(11,6,'A','Benar',1,'2026-11-17 02:41:58','2026-11-17 02:41:58'),(12,6,'B','Salah',0,'2026-11-17 02:41:58','2026-11-17 02:41:58'),(13,7,'A','Benar',1,'2026-11-17 02:41:58','2026-11-17 02:41:58'),(14,7,'B','Salah',0,'2026-11-17 02:41:58','2026-11-17 02:41:58'),(15,8,'A','Benar',1,'2026-11-17 02:41:59','2026-11-17 02:41:59'),(16,8,'B','Salah',0,'2026-11-17 02:41:59','2026-11-17 02:41:59'),(17,9,'A','Benar',1,'2026-11-17 02:42:01','2026-11-17 02:42:01'),(18,9,'B','Salah',0,'2026-11-17 02:42:02','2026-11-17 02:42:02'),(19,10,'A','Benar',1,'2026-11-17 02:42:03','2026-11-17 02:42:03'),(20,10,'B','Salah',0,'2026-11-17 02:42:03','2026-11-17 02:42:03'),(21,11,'A','Benar',1,'2026-11-17 02:42:04','2026-11-17 02:42:04'),(22,11,'B','Salah',0,'2026-11-17 02:42:04','2026-11-17 02:42:04'),(23,12,'A','Benar',1,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(24,12,'B','Salah',0,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(25,13,'A','Benar',1,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(26,13,'B','Salah',0,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(27,14,'A','Benar',1,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(28,14,'B','Salah',0,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(29,15,'A','Benar',1,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(30,15,'B','Salah',0,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(31,16,'A','Benar',1,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(32,16,'B','Salah',0,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(33,17,'A','Benar',1,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(34,17,'B','Salah',0,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(35,18,'A','Benar',1,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(36,18,'B','Salah',0,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(37,19,'A','Benar',1,'2026-11-17 02:42:07','2026-11-17 02:42:07'),(38,19,'B','Salah',0,'2026-11-17 02:42:07','2026-11-17 02:42:07'),(39,20,'A','Benar',1,'2026-11-17 02:42:07','2026-11-17 02:42:07'),(40,20,'B','Salah',0,'2026-11-17 02:42:07','2026-11-17 02:42:07'),(41,21,'A','Benar',1,'2026-11-17 02:42:07','2026-11-17 02:42:07'),(42,21,'B','Salah',0,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(43,22,'A','Benar',1,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(44,22,'B','Salah',0,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(45,23,'A','Benar',1,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(46,23,'B','Salah',0,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(47,24,'A','Benar',1,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(48,24,'B','Salah',0,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(49,25,'A','Benar',1,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(50,25,'B','Salah',0,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(51,26,'A','Benar',1,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(52,26,'B','Salah',0,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(53,27,'A','Benar',1,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(54,27,'B','Salah',0,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(55,28,'A','Benar',1,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(56,28,'B','Salah',0,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(57,29,'A','Benar',1,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(58,29,'B','Salah',0,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(59,30,'A','Benar',1,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(60,30,'B','Salah',0,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(61,31,'A','Benar',1,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(62,31,'B','Salah',0,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(63,32,'A','Benar',1,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(64,32,'B','Salah',0,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(65,33,'A','Benar',1,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(66,33,'B','Salah',0,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(67,34,'A','Benar',1,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(68,34,'B','Salah',0,'2026-11-17 02:42:11','2026-11-17 02:42:11'),(69,35,'A','Benar',1,'2026-11-17 02:42:11','2026-11-17 02:42:11'),(70,35,'B','Salah',0,'2026-11-17 02:42:11','2026-11-17 02:42:11'),(71,36,'A','Benar',1,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(72,36,'B','Salah',0,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(73,37,'A','Benar',1,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(74,37,'B','Salah',0,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(75,38,'A','Benar',1,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(76,38,'B','Salah',0,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(77,39,'A','Benar',1,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(78,39,'B','Salah',0,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(79,40,'A','Benar',1,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(80,40,'B','Salah',0,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(81,41,'A','Benar',1,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(82,41,'B','Salah',0,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(83,42,'A','Benar',1,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(84,42,'B','Salah',0,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(85,43,'A','Benar',1,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(86,43,'B','Salah',0,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(87,44,'A','Benar',1,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(88,44,'B','Salah',0,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(89,45,'A','Benar',1,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(90,45,'B','Salah',0,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(91,46,'A','Benar',1,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(92,46,'B','Salah',0,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(93,47,'A','Benar',1,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(94,47,'B','Salah',0,'2026-11-17 02:42:15','2026-11-17 02:42:15'),(95,48,'A','Benar',1,'2026-11-17 02:42:15','2026-11-17 02:42:15'),(96,48,'B','Salah',0,'2026-11-17 02:42:15','2026-11-17 02:42:15'),(97,49,'A','Benar',1,'2026-11-17 02:42:15','2026-11-17 02:42:15'),(98,49,'B','Salah',0,'2026-11-17 02:42:15','2026-11-17 02:42:15'),(99,50,'A','Benar',1,'2026-11-17 02:42:15','2026-11-17 02:42:15'),(100,50,'B','Salah',0,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(101,51,'A','Benar',1,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(102,51,'B','Salah',0,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(103,52,'A','Benar',1,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(104,52,'B','Salah',0,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(105,53,'A','Benar',1,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(106,53,'B','Salah',0,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(107,54,'A','Benar',1,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(108,54,'B','Salah',0,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(109,55,'A','Benar',1,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(110,55,'B','Salah',0,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(111,56,'A','Benar',1,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(112,56,'B','Salah',0,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(113,57,'A','Benar',1,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(114,57,'B','Salah',0,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(115,58,'A','Benar',1,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(116,58,'B','Salah',0,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(117,59,'A','Benar',1,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(118,59,'B','Salah',0,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(119,60,'A','Benar',1,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(120,60,'B','Salah',0,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(121,61,'A','Benar',1,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(122,61,'B','Salah',0,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(123,62,'A','Benar',1,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(124,62,'B','Salah',0,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(125,63,'A','Benar',1,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(126,63,'B','Salah',0,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(127,64,'A','Benar',1,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(128,64,'B','Salah',0,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(129,65,'A','Benar',1,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(130,65,'B','Salah',0,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(131,66,'A','Benar',1,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(132,66,'B','Salah',0,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(133,67,'A','Benar',1,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(134,67,'B','Salah',0,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(135,68,'A','Benar',1,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(136,68,'B','Salah',0,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(137,69,'A','Benar',1,'2026-11-17 02:42:21','2026-11-17 02:42:21'),(138,69,'B','Salah',0,'2026-11-17 02:42:21','2026-11-17 02:42:21'),(139,70,'A','Benar',1,'2026-11-17 02:42:21','2026-11-17 02:42:21'),(140,70,'B','Salah',0,'2026-11-17 02:42:21','2026-11-17 02:42:21'),(141,71,'A','Benar',1,'2026-11-17 02:42:21','2026-11-17 02:42:21'),(142,71,'B','Salah',0,'2026-11-17 02:42:21','2026-11-17 02:42:21'),(143,72,'A','Benar',1,'2026-11-17 02:42:22','2026-11-17 02:42:22'),(144,72,'B','Salah',0,'2026-11-17 02:42:22','2026-11-17 02:42:22'),(145,73,'A','Benar',1,'2026-11-17 02:42:22','2026-11-17 02:42:22'),(146,73,'B','Salah',0,'2026-11-17 02:42:22','2026-11-17 02:42:22'),(147,74,'A','Benar',1,'2026-11-17 02:42:22','2026-11-17 02:42:22'),(148,74,'B','Salah',0,'2026-11-17 02:42:22','2026-11-17 02:42:22'),(149,75,'A','Benar',1,'2026-11-17 02:42:23','2026-11-17 02:42:23'),(150,75,'B','Salah',0,'2026-11-17 02:42:23','2026-11-17 02:42:23'),(151,76,'A','Benar',1,'2026-11-17 02:42:23','2026-11-17 02:42:23'),(152,76,'B','Salah',0,'2026-11-17 02:42:23','2026-11-17 02:42:23'),(153,77,'A','Benar',1,'2026-11-17 02:42:23','2026-11-17 02:42:23'),(154,77,'B','Salah',0,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(155,78,'A','Benar',1,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(156,78,'B','Salah',0,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(157,79,'A','Benar',1,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(158,79,'B','Salah',0,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(159,80,'A','Benar',1,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(160,80,'B','Salah',0,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(161,81,'A','Benar',1,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(162,81,'B','Salah',0,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(163,82,'A','Benar',1,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(164,82,'B','Salah',0,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(165,83,'A','Benar',1,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(166,83,'B','Salah',0,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(167,84,'A','Benar',1,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(168,84,'B','Salah',0,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(169,85,'A','Benar',1,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(170,85,'B','Salah',0,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(171,86,'A','Benar',1,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(172,86,'B','Salah',0,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(173,87,'A','Benar',1,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(174,87,'B','Salah',0,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(175,88,'A','Benar',1,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(176,88,'B','Salah',0,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(177,89,'A','Benar',1,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(178,89,'B','Salah',0,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(179,90,'A','Benar',1,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(180,90,'B','Salah',0,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(181,91,'A','Benar',1,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(182,91,'B','Salah',0,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(183,92,'A','Benar',1,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(184,92,'B','Salah',0,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(185,93,'A','Benar',1,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(186,93,'B','Salah',0,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(187,94,'A','Benar',1,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(188,94,'B','Salah',0,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(189,95,'A','Benar',1,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(190,95,'B','Salah',0,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(191,96,'A','Benar',1,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(192,96,'B','Salah',0,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(193,97,'A','Benar',1,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(194,97,'B','Salah',0,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(195,98,'A','Benar',1,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(196,98,'B','Salah',0,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(197,99,'A','Benar',1,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(198,99,'B','Salah',0,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(199,100,'A','Benar',1,'2026-11-17 02:42:29','2026-11-17 02:42:29'),(200,100,'B','Salah',0,'2026-11-17 02:42:29','2026-11-17 02:42:29'),(201,101,'A','Benar',1,'2026-11-17 02:42:29','2026-11-17 02:42:29'),(202,101,'B','Salah',0,'2026-11-17 02:42:29','2026-11-17 02:42:29'),(203,102,'A','Benar',1,'2026-11-17 02:42:29','2026-11-17 02:42:29'),(204,102,'B','Salah',0,'2026-11-17 02:42:29','2026-11-17 02:42:29'),(205,103,'A','Benar',1,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(206,103,'B','Salah',0,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(207,104,'A','Benar',1,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(208,104,'B','Salah',0,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(209,105,'A','Benar',1,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(210,105,'B','Salah',0,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(211,106,'A','Benar',1,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(212,106,'B','Salah',0,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(213,107,'A','Benar',1,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(214,107,'B','Salah',0,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(215,108,'A','Benar',1,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(216,108,'B','Salah',0,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(217,109,'A','Benar',1,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(218,109,'B','Salah',0,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(219,110,'A','Benar',1,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(220,110,'B','Salah',0,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(221,111,'A','Benar',1,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(222,111,'B','Salah',0,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(223,112,'A','Benar',1,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(224,112,'B','Salah',0,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(225,113,'A','Benar',1,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(226,113,'B','Salah',0,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(227,114,'A','Benar',1,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(228,114,'B','Salah',0,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(229,115,'A','Benar',1,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(230,115,'B','Salah',0,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(231,116,'A','Benar',1,'2026-11-17 02:42:32','2026-11-17 02:42:32'),(232,116,'B','Salah',0,'2026-11-17 02:42:32','2026-11-17 02:42:32'),(233,117,'A','Benar',1,'2026-11-17 02:42:32','2026-11-17 02:42:32'),(234,117,'B','Salah',0,'2026-11-17 02:42:32','2026-11-17 02:42:32'),(235,118,'A','Benar',1,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(236,118,'B','Salah',0,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(237,119,'A','Benar',1,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(238,119,'B','Salah',0,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(239,120,'A','Benar',1,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(240,120,'B','Salah',0,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(241,121,'A','Benar',1,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(242,121,'B','Salah',0,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(243,122,'A','Benar',1,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(244,122,'B','Salah',0,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(245,123,'A','Benar',1,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(246,123,'B','Salah',0,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(247,124,'A','Benar',1,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(248,124,'B','Salah',0,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(249,125,'A','Benar',1,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(250,125,'B','Salah',0,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(251,126,'A','Benar',1,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(252,126,'B','Salah',0,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(253,127,'A','Benar',1,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(254,127,'B','Salah',0,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(255,128,'A','Benar',1,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(256,128,'B','Salah',0,'2026-11-17 02:42:35','2026-11-17 02:42:35'),(257,129,'A','Benar',1,'2026-11-17 02:42:35','2026-11-17 02:42:35'),(258,129,'B','Salah',0,'2026-11-17 02:42:35','2026-11-17 02:42:35'),(259,130,'A','Benar',1,'2026-11-17 02:42:35','2026-11-17 02:42:35'),(260,130,'B','Salah',0,'2026-11-17 02:42:35','2026-11-17 02:42:35');
/*!40000 ALTER TABLE `exercise_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercises`
--

DROP TABLE IF EXISTS `exercises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercises` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint(20) unsigned NOT NULL,
  `question` text NOT NULL,
  `type` varchar(20) NOT NULL DEFAULT 'multiple_choice',
  `data_table` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data_table`)),
  `explanation` text DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `exercises_lesson_id_foreign` (`lesson_id`),
  CONSTRAINT `exercises_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercises`
--

LOCK TABLES `exercises` WRITE;
/*!40000 ALTER TABLE `exercises` DISABLE KEYS */;
INSERT INTO `exercises` VALUES (1,1,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:41:56','2026-11-17 02:41:56'),(2,1,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(3,1,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(4,1,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(5,1,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:41:57','2026-11-17 02:41:57'),(6,2,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:41:58','2026-11-17 02:41:58'),(7,2,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:41:58','2026-11-17 02:41:58'),(8,2,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:41:58','2026-11-17 02:41:58'),(9,2,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:01','2026-11-17 02:42:01'),(10,2,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:03','2026-11-17 02:42:03'),(11,3,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:04','2026-11-17 02:42:04'),(12,3,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(13,3,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(14,3,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(15,3,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:05','2026-11-17 02:42:05'),(16,4,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(17,4,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(18,4,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(19,4,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:07','2026-11-17 02:42:07'),(20,4,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:07','2026-11-17 02:42:07'),(21,5,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:07','2026-11-17 02:42:07'),(22,5,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(23,5,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(24,5,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(25,5,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(26,6,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(27,6,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(28,6,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(29,6,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(30,6,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:09','2026-11-17 02:42:09'),(31,7,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(32,7,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(33,7,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(34,7,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(35,7,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:11','2026-11-17 02:42:11'),(36,8,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(37,8,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(38,8,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(39,8,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(40,8,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(41,9,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(42,9,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(43,9,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(44,9,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(45,9,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(46,10,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(47,10,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(48,10,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:15','2026-11-17 02:42:15'),(49,10,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:15','2026-11-17 02:42:15'),(50,10,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:15','2026-11-17 02:42:15'),(51,11,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(52,11,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(53,11,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(54,11,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(55,11,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(56,12,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(57,12,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(58,12,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(59,12,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(60,12,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(61,13,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(62,13,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(63,13,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(64,13,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(65,13,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:19','2026-11-17 02:42:19'),(66,14,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(67,14,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(68,14,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(69,14,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(70,14,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:21','2026-11-17 02:42:21'),(71,15,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:21','2026-11-17 02:42:21'),(72,15,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:22','2026-11-17 02:42:22'),(73,15,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:22','2026-11-17 02:42:22'),(74,15,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:22','2026-11-17 02:42:22'),(75,15,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:23','2026-11-17 02:42:23'),(76,16,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:23','2026-11-17 02:42:23'),(77,16,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:23','2026-11-17 02:42:23'),(78,16,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(79,16,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(80,16,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(81,17,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(82,17,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(83,17,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(84,17,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(85,17,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(86,18,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(87,18,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(88,18,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(89,18,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(90,18,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(91,19,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(92,19,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(93,19,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(94,19,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(95,19,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(96,20,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(97,20,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(98,20,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(99,20,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(100,20,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(101,21,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:29','2026-11-17 02:42:29'),(102,21,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:29','2026-11-17 02:42:29'),(103,21,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(104,21,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(105,21,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(106,22,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(107,22,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(108,22,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(109,22,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(110,22,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(111,23,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(112,23,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(113,23,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(114,23,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(115,23,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(116,24,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:32','2026-11-17 02:42:32'),(117,24,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:32','2026-11-17 02:42:32'),(118,24,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:32','2026-11-17 02:42:32'),(119,24,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(120,24,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(121,25,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(122,25,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(123,25,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(124,25,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(125,25,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(126,26,'Soal 1','multiple_choice',NULL,NULL,1,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(127,26,'Soal 2','multiple_choice',NULL,NULL,2,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(128,26,'Soal 3','multiple_choice',NULL,NULL,3,'2026-11-17 02:42:34','2026-11-17 02:42:34'),(129,26,'Soal 4','multiple_choice',NULL,NULL,4,'2026-11-17 02:42:35','2026-11-17 02:42:35'),(130,26,'Soal 5','multiple_choice',NULL,NULL,5,'2026-11-17 02:42:35','2026-11-17 02:42:35');
/*!40000 ALTER TABLE `exercises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulas`
--

DROP TABLE IF EXISTS `formulas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formulas` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `description` text NOT NULL,
  `syntax` text NOT NULL,
  `example` text DEFAULT NULL,
  `study_case` text DEFAULT NULL,
  `study_result` text DEFAULT NULL,
  `case_table_before` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`case_table_before`)),
  `case_table_after` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`case_table_after`)),
  `result` text DEFAULT NULL,
  `parameters` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`parameters`)),
  `common_mistakes` text DEFAULT NULL,
  `excel_versions` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `formulas_name_unique` (`name`),
  UNIQUE KEY `formulas_slug_unique` (`slug`),
  KEY `formulas_category_index` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulas`
--

LOCK TABLES `formulas` WRITE;
/*!40000 ALTER TABLE `formulas` DISABLE KEYS */;
INSERT INTO `formulas` VALUES (1,'SUM','sum','Matematika','Menjumlahkan angka.','=SUM(number1, ...)','=SUM(B1:B3)','Menjumlahkan total belanja.','Total belanja Rp45.000.','[[\"Beras\",\"15000\"],[\"Minyak\",\"20000\"],[\"Gula\",\"10000\"],[\"Total\",\"=SUM(B1:B3)\"]]','[[\"Beras\",\"15000\"],[\"Minyak\",\"20000\"],[\"Gula\",\"10000\"],[\"Total\",\"45000\"]]','Hasil perhitungan',NULL,NULL,'Semua versi','2026-11-17 02:42:35','2026-11-17 02:42:35'),(2,'AVERAGE','average','Statistik','Rata-rata.','=AVERAGE(number1, ...)','=AVERAGE(B1:B3)','Rata-rata nilai ujian.','Rata-rata 80.','[[\"Siswa A\",\"80\"],[\"Siswa B\",\"90\"],[\"Siswa C\",\"70\"],[\"Rata-rata\",\"=AVERAGE(B1:B3)\"]]','[[\"Siswa A\",\"80\"],[\"Siswa B\",\"90\"],[\"Siswa C\",\"70\"],[\"Rata-rata\",\"80\"]]','Hasil perhitungan',NULL,NULL,'Semua versi','2026-11-17 02:42:35','2026-11-17 02:42:35'),(3,'VLOOKUP','vlookup','Lookup','Mencari data.','=VLOOKUP(...)','=VLOOKUP(D1, A1:B3, 2, FALSE)','Mencari harga Jeruk.','Harga 7000.','[[\"Apel\",\"5000\",\"\",\"Jeruk\",\"=VLOOKUP(D1, A1:B3, 2, FALSE)\"],[\"Jeruk\",\"7000\",\"\",\"\",\"\"],[\"Mangga\",\"8000\",\"\",\"\",\"\"]]','[[\"Apel\",\"5000\",\"\",\"Jeruk\",\"7000\"],[\"Jeruk\",\"7000\",\"\",\"\",\"\"],[\"Mangga\",\"8000\",\"\",\"\",\"\"]]','Hasil perhitungan',NULL,NULL,'Semua versi','2026-11-17 02:42:35','2026-11-17 02:42:35');
/*!40000 ALTER TABLE `formulas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learning_levels`
--

DROP TABLE IF EXISTS `learning_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learning_levels` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `learning_levels_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learning_levels`
--

LOCK TABLES `learning_levels` WRITE;
/*!40000 ALTER TABLE `learning_levels` DISABLE KEYS */;
INSERT INTO `learning_levels` VALUES (1,'Pemula','pemula',1,NULL,'2026-11-17 02:41:54','2026-11-17 02:41:54'),(2,'Dasar','dasar',2,NULL,'2026-11-17 02:41:54','2026-11-17 02:41:54'),(3,'Menengah','menengah',3,NULL,'2026-11-17 02:41:54','2026-11-17 02:41:54'),(4,'Lanjutan','lanjutan',4,NULL,'2026-11-17 02:41:55','2026-11-17 02:41:55');
/*!40000 ALTER TABLE `learning_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_examples`
--

DROP TABLE IF EXISTS `lesson_examples`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_examples` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `case_description` text DEFAULT NULL,
  `data_table` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data_table`)),
  `question` text DEFAULT NULL,
  `formula_used` text DEFAULT NULL,
  `steps` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`steps`)),
  `final_result` text DEFAULT NULL,
  `order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lesson_examples_lesson_id_foreign` (`lesson_id`),
  CONSTRAINT `lesson_examples_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_examples`
--

LOCK TABLES `lesson_examples` WRITE;
/*!40000 ALTER TABLE `lesson_examples` DISABLE KEYS */;
INSERT INTO `lesson_examples` VALUES (1,1,'Contoh Penerapan Pengenalan Microsoft Excel dan Antarmuka','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:41:56','2026-11-17 02:41:56'),(2,2,'Contoh Penerapan Workbook, Worksheet, Row, Column, Cell, dan Range','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:41:58','2026-11-17 02:41:58'),(3,3,'Contoh Penerapan Memasukkan, Mengedit, dan Menghapus Data','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:04','2026-11-17 02:42:04'),(4,4,'Contoh Penerapan Mengatur Workbook, Worksheet, Baris, dan Kolom','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(5,5,'Contoh Penerapan Membuat Border, Tabel, dan Merge Cell','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:07','2026-11-17 02:42:07'),(6,6,'Contoh Penerapan Format Cell: Angka, Tanggal, Mata Uang, dan Persentase','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(7,7,'Contoh Penerapan Operasi Matematika dan Operator Excel','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(8,8,'Contoh Penerapan SUM — Menjumlahkan Data','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:12','2026-11-17 02:42:12'),(9,9,'Contoh Penerapan AVERAGE — Menghitung Rata-rata','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(10,10,'Contoh Penerapan MAX dan MIN — Mencari Nilai Tertinggi dan Terendah','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(11,11,'Contoh Penerapan COUNT, COUNTA, dan COUNTBLANK','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(12,12,'Contoh Penerapan IF — Membuat Kondisi Logika','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(13,13,'Contoh Penerapan AND, OR, dan IF Bertingkat','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(14,14,'Contoh Penerapan SUMIF dan SUMIFS','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(15,15,'Contoh Penerapan COUNTIF dan COUNTIFS','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:21','2026-11-17 02:42:21'),(16,16,'Contoh Penerapan AVERAGEIF dan AVERAGEIFS','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:23','2026-11-17 02:42:23'),(17,17,'Contoh Penerapan Fungsi Teks: LEFT, RIGHT, MID, LEN, TRIM, dan CONCAT','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(18,18,'Contoh Penerapan Relative, Absolute, dan Mixed Cell Reference','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:26','2026-11-17 02:42:26'),(19,19,'Contoh Penerapan Fungsi Tanggal dan Waktu','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(20,20,'Contoh Penerapan VLOOKUP, HLOOKUP, dan XLOOKUP','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(21,21,'Contoh Penerapan IFERROR dan Penanganan Kesalahan Formula','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:29','2026-11-17 02:42:29'),(22,22,'Contoh Penerapan Sorting dan Filtering Data','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(23,23,'Contoh Penerapan Conditional Formatting','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(24,24,'Contoh Penerapan Data Validation dan Dropdown','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:32','2026-11-17 02:42:32'),(25,25,'Contoh Penerapan Membuat Chart dan Grafik','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(26,26,'Contoh Penerapan PivotTable dan PivotChart','Perhatikan contoh penggunaan fungsi ini.','[[\"Data 1\",\"100\"],[\"Data 2\",\"200\"]]','Bagaimana cara mengaplikasikannya?','Lihat sintaks.','[\"Langkah 1\",\"Langkah 2\"]','Selesai.',0,'2026-11-17 02:42:34','2026-11-17 02:42:34');
/*!40000 ALTER TABLE `lesson_examples` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) unsigned NOT NULL,
  `learning_level_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `intro` text DEFAULT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`content`)),
  `order` int(11) NOT NULL DEFAULT 0,
  `is_published` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lessons_slug_unique` (`slug`),
  KEY `lessons_learning_level_id_foreign` (`learning_level_id`),
  KEY `lessons_category_id_learning_level_id_index` (`category_id`,`learning_level_id`),
  CONSTRAINT `lessons_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lessons_learning_level_id_foreign` FOREIGN KEY (`learning_level_id`) REFERENCES `learning_levels` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (1,1,1,'Pengenalan Microsoft Excel dan Antarmuka','pengenalan-antarmuka-excel','Kenali tampilan dasar Microsoft Excel dan bagian-bagiannya.','{\"apa_itu\":\"Microsoft Excel adalah aplikasi lembar kerja (spreadsheet) berbentuk tabel. Tampilannya terdiri dari kotak-kotak kecil yang disebut Cell.\",\"mengapa\":\"Sebelum bisa membuat rumus, kamu wajib tahu cara membaca posisi sebuah cell dan bagian-bagian antarmuka Excel.\",\"sintaks\":\"Bagian penting antarmuka:\\n1. Ribbon: Menu di bagian atas (Home, Insert, dll).\\n2. Formula Bar: Tempat melihat\\/menulis isi cell.\\n3. Grid: Area kotak-kotak berisi Kolom (A, B, C) dan Baris (1, 2, 3).\"}',1,1,'2026-11-17 02:41:56','2026-11-17 02:41:56'),(2,1,1,'Workbook, Worksheet, Row, Column, Cell, dan Range','workbook-worksheet-cell','Pahami istilah dasar seperti Workbook, Worksheet, Row, Column, Cell, dan Range.','{\"apa_itu\":\"Workbook adalah satu file Excel utuh. Di dalamnya terdapat beberapa Worksheet (lembar kerja). Setiap pertemuan Kolom dan Baris disebut Cell (contoh: A1). Kumpulan cell disebut Range (contoh: A1:B5).\",\"mengapa\":\"Memahami istilah ini penting agar kamu tidak bingung saat membaca tutorial Excel.\",\"sintaks\":\"Contoh Penulisan:\\n- Cell tunggal: A1\\n- Range vertikal: A1:A10\\n- Range horizontal: A1:J1\"}',2,1,'2026-11-17 02:41:58','2026-11-17 02:41:58'),(3,1,1,'Memasukkan, Mengedit, dan Menghapus Data','input-edit-hapus-data','Belajar cara mengetik, memperbaiki, dan menghapus data di Excel.','{\"apa_itu\":\"Untuk memasukkan data, klik cell lalu ketik. Untuk mengedit, tekan F2 atau klik dua kali. Untuk menghapus, tekan tombol Delete (menghapus isi) atau klik kanan > Delete (menghapus baris\\/kolom).\",\"mengapa\":\"Ini adalah operasi paling dasar yang akan kamu lakukan setiap hari di Excel.\",\"sintaks\":\"Tips:\\n- Tekan Enter untuk menyimpan dan pindah ke bawah.\\n- Tekan Tab untuk menyimpan dan pindah ke kanan.\"}',3,1,'2026-11-17 02:42:04','2026-11-17 02:42:04'),(4,1,1,'Mengatur Workbook, Worksheet, Baris, dan Kolom','mengatur-workbook-worksheet','Cara menambah, menghapus, mengganti nama sheet, dan mengatur lebar kolom/baris.','{\"apa_itu\":\"Workbook bisa berisi banyak Worksheet. Kamu bisa menambah sheet baru dengan klik ikon +, mengganti nama dengan klik kanan tab sheet, dan mengatur lebar kolom dengan drag garis di antara header kolom.\",\"mengapa\":\"Mengatur workbook yang rapi memudahkan navigasi dan pencarian data.\",\"sintaks\":\"Cara:\\n- Tambah Sheet: Klik + di tab sheet.\\n- Ganti Nama: Klik kanan tab > Rename.\\n- Lebar Kolom: Drag garis di header kolom.\"}',4,1,'2026-11-17 02:42:06','2026-11-17 02:42:06'),(5,1,1,'Membuat Border, Tabel, dan Merge Cell','membuat-tabel-border','Belajar membuat tabel rapi dengan border, merge cell, dan pengaturan tampilan.','{\"apa_itu\":\"Tabel yang rapi terdiri dari border (garis tepi), merge cell (menggabungkan cell), dan pengaturan lebar kolom\\/baris. Border membuat data lebih mudah dibaca, sedangkan merge cell digunakan untuk judul tabel.\",\"mengapa\":\"Tabel yang rapi akan membuat laporan lebih profesional dan mudah dipahami oleh pembaca.\",\"sintaks\":\"Langkah membuat tabel:\\n1. Blok data yang ingin dijadikan tabel.\\n2. Klik tab Home > Borders > All Borders.\\n3. Untuk judul tabel, blok beberapa cell (misal A1:C1) lalu klik Merge & Center.\\n4. Atur lebar kolom dengan drag garis di header kolom.\"}',5,1,'2026-11-17 02:42:07','2026-11-17 02:42:07'),(6,1,1,'Format Cell: Angka, Tanggal, Mata Uang, dan Persentase','format-cell','Mengatur format angka, mata uang, tanggal, dan persentase.','{\"apa_itu\":\"Excel bisa mengubah tampilan angka menjadi Rupiah, persentase, atau tanggal tanpa mengubah nilai aslinya. Caranya ada di menu Home > Number Format.\",\"mengapa\":\"Laporan keuangan akan terlihat lebih profesional jika angka ditampilkan sebagai mata uang (Rp) dan rapi.\",\"sintaks\":\"Contoh:\\n- 1000 diubah ke format Rupiah menjadi Rp1.000\\n- 0.5 diubah ke format Persentase menjadi 50%\"}',6,1,'2026-11-17 02:42:08','2026-11-17 02:42:08'),(7,1,1,'Operasi Matematika dan Operator Excel','operasi-matematika','Melakukan perhitungan dasar (+, -, *, /, ^) di Excel.','{\"apa_itu\":\"Excel bisa digunakan seperti kalkulator. Kamu cukup mengetikkan tanda sama dengan (=) di awal, lalu masukkan angka dan operator matematika.\",\"mengapa\":\"Lebih efisien daripada memakai kalkulator terpisah, karena hasilnya bisa langsung masuk ke dalam tabel.\",\"sintaks\":\"Operator Excel:\\n+ (Tambah)\\n- (Kurang)\\n* (Kali)\\n\\/ (Bagi)\\n^ (Pangkat)\\n\\nContoh: =10 + 5 * 2\"}',7,1,'2026-11-17 02:42:10','2026-11-17 02:42:10'),(8,2,2,'SUM — Menjumlahkan Data','fungsi-sum','Menjumlahkan banyak angka sekaligus dengan cepat.','{\"apa_itu\":\"SUM adalah fungsi untuk menjumlahkan seluruh angka dalam sebuah rentang.\",\"mengapa\":\"Menghemat waktu dan mengurangi kesalahan hitung manual.\",\"sintaks\":\"=SUM(number1, [number2], ...)\\nContoh: =SUM(A1:A10)\"}',8,1,'2026-11-17 02:42:11','2026-11-17 02:42:11'),(9,2,2,'AVERAGE — Menghitung Rata-rata','fungsi-average','Menghitung nilai rata-rata dari sekumpulan data.','{\"apa_itu\":\"AVERAGE menjumlahkan semua angka lalu membaginya dengan jumlah data.\",\"mengapa\":\"Memberikan gambaran umum tentang performa data tanpa harus menghitung manual.\",\"sintaks\":\"=AVERAGE(number1, [number2], ...)\\nContoh: =AVERAGE(B2:B10)\"}',9,1,'2026-11-17 02:42:13','2026-11-17 02:42:13'),(10,2,2,'MAX dan MIN — Mencari Nilai Tertinggi dan Terendah','fungsi-max-min','Mencari nilai tertinggi (MAX) dan terendah (MIN).','{\"apa_itu\":\"MAX mencari angka paling besar, MIN mencari angka paling kecil dari sebuah rentang data.\",\"mengapa\":\"Berguna untuk mencari siapa siswa dengan nilai tertinggi, atau produk dengan penjualan terendah.\",\"sintaks\":\"=MAX(range) \\/ =MIN(range)\\nContoh: =MAX(C1:C10)\"}',10,1,'2026-11-17 02:42:14','2026-11-17 02:42:14'),(11,2,2,'COUNT, COUNTA, dan COUNTBLANK','fungsi-count','Menghitung jumlah cell yang berisi angka, teks, atau kosong.','{\"apa_itu\":\"COUNT menghitung jumlah cell berisi angka. COUNTA menghitung cell yang tidak kosong (termasuk teks). COUNTBLANK menghitung cell yang kosong.\",\"mengapa\":\"Sangat membantu saat kita ingin tahu ada berapa banyak data yang sudah terisi dalam sebuah tabel.\",\"sintaks\":\"=COUNT(range) \\/ =COUNTA(range) \\/ =COUNTBLANK(range)\"}',11,1,'2026-11-17 02:42:16','2026-11-17 02:42:16'),(12,2,2,'IF — Membuat Kondisi Logika','fungsi-if','Membuat keputusan otomatis berdasarkan kondisi tertentu.','{\"apa_itu\":\"Fungsi IF mengecek apakah suatu kondisi BENAR atau SALAH. Jika benar, hasil A muncul. Jika salah, hasil B muncul.\",\"mengapa\":\"Sangat penting untuk membuat laporan otomatis, seperti menentukan status kelulusan (Lulus\\/Tidak Lulus).\",\"sintaks\":\"=IF(logical_test, value_if_true, value_if_false)\\nContoh: =IF(A1>=75, \\\"Lulus\\\", \\\"Gagal\\\")\"}',12,1,'2026-11-17 02:42:17','2026-11-17 02:42:17'),(13,2,2,'AND, OR, dan IF Bertingkat','fungsi-and-or','Menggabungkan beberapa kondisi logika.','{\"apa_itu\":\"AND bernilai BENAR jika semua kondisi terpenuhi. OR bernilai BENAR jika salah satu kondisi terpenuhi. IF bertingkat artinya IF di dalam IF.\",\"mengapa\":\"Membuat logika yang lebih kompleks, seperti diskon jika belanja > 100rb DAN member VIP.\",\"sintaks\":\"=IF(AND(A1>10, B1<5), \\\"Ya\\\", \\\"Tidak\\\")\"}',13,1,'2026-11-17 02:42:18','2026-11-17 02:42:18'),(14,2,2,'SUMIF dan SUMIFS','fungsi-sumif-sumifs','Menjumlahkan data berdasarkan kriteria tertentu.','{\"apa_itu\":\"SUMIF menjumlahkan data hanya jika memenuhi satu kriteria. SUMIFS bisa digunakan untuk banyak kriteria sekaligus.\",\"mengapa\":\"Sangat berguna saat ingin menghitung total penjualan khusus untuk produk tertentu saja.\",\"sintaks\":\"=SUMIF(range_kriteria, kriteria, range_jumlah)\\nContoh: =SUMIF(A1:A10, \\\"Apel\\\", B1:B10)\"}',14,1,'2026-11-17 02:42:20','2026-11-17 02:42:20'),(15,2,2,'COUNTIF dan COUNTIFS','fungsi-countif','Menghitung jumlah data berdasarkan kriteria tertentu.','{\"apa_itu\":\"COUNTIF menghitung berapa banyak data yang cocok dengan kriteria tertentu.\",\"mengapa\":\"Misalnya, ingin menghitung ada berapa banyak siswa laki-laki di kelas.\",\"sintaks\":\"=COUNTIF(range, kriteria)\\nContoh: =COUNTIF(B2:B100, \\\"Laki-laki\\\")\"}',15,1,'2026-11-17 02:42:21','2026-11-17 02:42:21'),(16,2,2,'AVERAGEIF dan AVERAGEIFS','fungsi-averageif','Menghitung rata-rata data berdasarkan kriteria tertentu.','{\"apa_itu\":\"AVERAGEIF mencari rata-rata hanya untuk data yang memenuhi kriteria.\",\"mengapa\":\"Berguna untuk mencari rata-rata nilai khusus untuk siswa perempuan saja, misalnya.\",\"sintaks\":\"=AVERAGEIF(range_kriteria, kriteria, range_rata-rata)\"}',16,1,'2026-11-17 02:42:23','2026-11-17 02:42:23'),(17,2,2,'Fungsi Teks: LEFT, RIGHT, MID, LEN, TRIM, dan CONCAT','fungsi-teks','Mengolah data teks seperti memotong dan menggabungkan.','{\"apa_itu\":\"LEFT mengambil teks dari kiri, RIGHT dari kanan, MID dari tengah, LEN menghitung panjang teks, TRIM menghapus spasi berlebih, CONCAT menggabungkan teks.\",\"mengapa\":\"Sangat penting saat mengolah data nama, alamat, atau kode barang.\",\"sintaks\":\"=LEFT(A1, 3) \\/\\/ Ambil 3 huruf dari kiri\\n=CONCAT(A1, B1) \\/\\/ Gabungkan isi A1 dan B1\"}',17,1,'2026-11-17 02:42:24','2026-11-17 02:42:24'),(18,3,3,'Relative, Absolute, dan Mixed Cell Reference','cell-reference','Memahami perbedaan referensi sel relatif (A1), absolut ($A$1), dan campuran.','{\"apa_itu\":\"**Relative (A1)**: Alamat cell yang berubah saat rumus disalin. Jika kamu menyalin rumus dari D2 ke D3, referensi A1 akan berubah menjadi A2.\\n\\n**Absolute ($A$1)**: Alamat cell yang terkunci. Kolom dan baris tidak berubah saat rumus disalin.\\n\\n**Mixed ($A1 atau A$1)**: Hanya salah satu bagian yang terkunci.\\n- $A1: Kolom A terkunci, baris bisa berubah.\\n- A$1: Baris 1 terkunci, kolom bisa berubah.\",\"mengapa\":\"Kunci untuk membuat rumus yang bisa di-copy ke seluruh tabel tanpa harus mengetik ulang. Jika tidak memahami ini, rumus kamu akan menghasilkan hasil yang salah saat disalin.\",\"sintaks\":\"Relative: =C2*11%\\nAbsolute: =C2*$G$1\\nMixed: =$C2*D$1\"}',18,1,'2026-11-17 02:42:25','2026-11-17 02:42:25'),(19,3,3,'Fungsi Tanggal dan Waktu','fungsi-tanggal-waktu','Mengolah data tanggal dan waktu dengan TODAY, NOW, DAY, MONTH, YEAR, dll.','{\"apa_itu\":\"Excel menyimpan tanggal sebagai angka serial. Fungsi seperti TODAY(), NOW(), DAY(), MONTH(), YEAR() membantu mengekstrak informasi dari tanggal.\",\"mengapa\":\"Sangat penting untuk laporan keuangan, absensi, atau jadwal proyek.\",\"sintaks\":\"=TODAY() \\/\\/ Tanggal hari ini\\n=MONTH(A1) \\/\\/ Mengambil bulan dari tanggal di A1\"}',19,1,'2026-11-17 02:42:27','2026-11-17 02:42:27'),(20,3,3,'VLOOKUP, HLOOKUP, dan XLOOKUP','fungsi-lookup','Mencari data dari tabel referensi. Sangat berguna untuk menggabungkan data dari dua tabel berbeda.','{\"apa_itu\":\"VLOOKUP mencari nilai di kolom paling kiri sebuah tabel, lalu mengembalikan nilai dari kolom lain. HLOOKUP secara horizontal. XLOOKUP versi modern yang lebih fleksibel.\",\"mengapa\":\"Sangat sering dipakai di dunia kerja untuk menggabungkan dua tabel data yang berbeda.\",\"sintaks\":\"=VLOOKUP(nilai_dicari, tabel_referensi, nomor_kolom, FALSE)\\n=VLOOKUP(D2, A2:B10, 2, FALSE)\"}',20,1,'2026-11-17 02:42:28','2026-11-17 02:42:28'),(21,3,3,'IFERROR dan Penanganan Kesalahan Formula','fungsi-iferror','Menangani error seperti #N/A, #DIV/0!, atau #VALUE! agar laporan tetap rapi.','{\"apa_itu\":\"IFERROR membungkus rumus. Jika rumus menghasilkan error, ia akan menampilkan nilai alternatif (misal: \\\"Data tidak ditemukan\\\" atau 0) alih-alih pesan error.\",\"mengapa\":\"Membuat laporan terlihat profesional dan mudah dibaca, tanpa pesan error yang menakutkan.\",\"sintaks\":\"=IFERROR(rumus, nilai_jika_error)\\nContoh: =IFERROR(VLOOKUP(...), \\\"Tidak ada\\\")\"}',21,1,'2026-11-17 02:42:29','2026-11-17 02:42:29'),(22,4,3,'Sorting dan Filtering Data','sorting-filtering','Mengurutkan data dan menyaring data berdasarkan kriteria.','{\"apa_itu\":\"Sorting mengurutkan data (A-Z atau Z-A). Filter menyembunyikan baris yang tidak sesuai kriteria.\",\"mengapa\":\"Membantu menemukan data spesifik dengan cepat.\",\"sintaks\":\"Sort: Tab Data > Sort.\\nFilter: Tab Data > Filter (Ctrl+Shift+L).\"}',22,1,'2026-11-17 02:42:30','2026-11-17 02:42:30'),(23,4,3,'Conditional Formatting','conditional-formatting','Mewarnai cell otomatis berdasarkan aturan tertentu.','{\"apa_itu\":\"Conditional Formatting memberi warna atau ikon pada cell yang memenuhi kondisi. Contoh: nilai di bawah 70 berwarna merah.\",\"mengapa\":\"Membuat data penting langsung terlihat secara visual.\",\"sintaks\":\"Tab Home > Conditional Formatting > Pilih aturan.\"}',23,1,'2026-11-17 02:42:31','2026-11-17 02:42:31'),(24,4,3,'Data Validation dan Dropdown','data-validation','Membatasi input data dan membuat dropdown list.','{\"apa_itu\":\"Data Validation membatasi jenis data yang boleh dimasukkan (misal hanya 1-100). Bisa juga digunakan untuk membuat dropdown list.\",\"mengapa\":\"Mencegah kesalahan input data.\",\"sintaks\":\"Tab Data > Data Validation.\"}',24,1,'2026-11-17 02:42:32','2026-11-17 02:42:32'),(25,5,4,'Membuat Chart dan Grafik','membuat-chart','Mengubah data menjadi grafik visual (Column, Line, Pie, dll).','{\"apa_itu\":\"Chart adalah representasi visual dari data. Excel menyediakan berbagai jenis chart seperti Column, Line, Pie, Bar, dan Scatter.\",\"mengapa\":\"Grafik memudahkan pembaca memahami tren dan pola data.\",\"sintaks\":\"Pilih data > Insert > Chart.\"}',25,1,'2026-11-17 02:42:33','2026-11-17 02:42:33'),(26,5,4,'PivotTable dan PivotChart','pivottable-dashboard','Merangkum ribuan data menjadi tabel ringkas dan grafik interaktif.','{\"apa_itu\":\"PivotTable merangkum data besar menjadi tabel ringkas. PivotChart adalah versi grafik dari PivotTable.\",\"mengapa\":\"Dibutuhkan oleh manajer atau analis untuk mengambil keputusan bisnis.\",\"sintaks\":\"Pilih data > Insert > PivotTable.\"}',26,1,'2026-11-17 02:42:34','2026-11-17 02:42:34');
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_11_13_083944_create_excelmate_tables',1),(5,'2026_11_14_020334_add_study_case_to_formulas_table',1),(6,'2026_11_14_021315_add_case_tables_to_formulas_table',1),(7,'2026_11_15_132654_create_tips_table',1),(8,'2026_11_16_035509_create_questions_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint(20) unsigned NOT NULL,
  `question` text NOT NULL,
  `question_type` varchar(255) NOT NULL DEFAULT 'multiple_choice',
  `difficulty` varchar(255) NOT NULL DEFAULT 'Mudah',
  `visual_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`visual_data`)),
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `correct_answer` varchar(255) DEFAULT NULL,
  `accepted_answers` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`accepted_answers`)),
  `explanation` text DEFAULT NULL,
  `wrong_answer_explanations` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`wrong_answer_explanations`)),
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questions_lesson_id_foreign` (`lesson_id`),
  CONSTRAINT `questions_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,1,'Bagian Excel yang berisi menu Home, Insert, Formulas, dll disebut...','multiple_choice','Mudah',NULL,'[\"Ribbon\",\"Formula Bar\",\"Grid\",\"Name Box\"]','Ribbon',NULL,'Ribbon adalah menu utama Excel yang terletak di bagian atas.',NULL,1,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(2,1,'Kotak kecil di Excel tempat mengetik data disebut...','multiple_choice','Mudah',NULL,'[\"Sheet\",\"Cell\",\"Row\",\"Column\"]','Cell',NULL,'Cell adalah pertemuan antara baris dan kolom.',NULL,2,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(3,1,'Tempat untuk melihat dan mengedit isi cell adalah...','multiple_choice','Mudah',NULL,'[\"Ribbon\",\"Name Box\",\"Formula Bar\",\"Grid\"]','Formula Bar',NULL,'Formula Bar terletak di atas grid dan menunjukkan isi cell.',NULL,3,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(4,1,'Untuk pindah ke cell A1 dengan cepat, gunakan...','multiple_choice','Mudah',NULL,'[\"Ctrl + Home\",\"Ctrl + End\",\"Ctrl + Page Down\",\"F5\"]','Ctrl + Home',NULL,'Ctrl + Home membawa kursor ke cell A1.',NULL,4,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(5,1,'Shortcut untuk menyimpan file adalah...','multiple_choice','Mudah',NULL,'[\"Ctrl + S\",\"Ctrl + O\",\"Ctrl + N\",\"Ctrl + P\"]','Ctrl + S',NULL,'Ctrl + S menyimpan perubahan pada file.',NULL,5,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(6,1,'Untuk membuat workbook baru, tekan...','multiple_choice','Mudah',NULL,'[\"Ctrl + N\",\"Ctrl + B\",\"Ctrl + M\",\"Ctrl + W\"]','Ctrl + N',NULL,'Ctrl + N membuka workbook kosong baru.',NULL,6,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(7,2,'Kumpulan cell disebut...','multiple_choice','Mudah',NULL,'[\"Range\",\"Cell\",\"Sheet\",\"Row\"]','Range',NULL,'Range adalah kumpulan beberapa cell.',NULL,1,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(8,2,'Alamat cell B3 berarti...','multiple_choice','Mudah',NULL,'[\"Kolom B, Baris 3\",\"Kolom 3, Baris B\",\"Cell ke-3\",\"Cell ke-B\"]','Kolom B, Baris 3',NULL,'Alamat cell dibaca dari Kolom (huruf) lalu Baris (angka).',NULL,2,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(9,2,'Range A1:A5 mencakup...','multiple_choice','Mudah',NULL,'[\"5 cell di kolom A\",\"5 cell di baris 1\",\"2 cell\",\"5 cell acak\"]','5 cell di kolom A',NULL,'A1:A5 adalah range vertikal dari A1 sampai A5.',NULL,3,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(10,2,'Ctrl + Page Down berfungsi untuk...','multiple_choice','Mudah',NULL,'[\"Pindah ke sheet berikutnya\",\"Pindah ke baris berikutnya\",\"Pindah ke kolom berikutnya\",\"Pindah ke cell berikutnya\"]','Pindah ke sheet berikutnya',NULL,'Ctrl + Page Down berpindah worksheet.',NULL,4,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(11,2,'Untuk memilih seluruh kolom, tekan...','multiple_choice','Mudah',NULL,'[\"Ctrl + Space\",\"Shift + Space\",\"Alt + Space\",\"Ctrl + A\"]','Ctrl + Space',NULL,'Ctrl + Space memilih seluruh kolom.',NULL,5,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(12,2,'Untuk memilih seluruh baris, tekan...','multiple_choice','Mudah',NULL,'[\"Shift + Space\",\"Ctrl + Space\",\"Alt + Space\",\"Ctrl + A\"]','Shift + Space',NULL,'Shift + Space memilih seluruh baris.',NULL,6,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(13,8,'Rumus untuk menjumlahkan A1 sampai A5 adalah...','multiple_choice','Mudah',NULL,'[\"=SUM(A1:A5)\",\"=AVERAGE(A1:A5)\",\"=MAX(A1:A5)\",\"=COUNT(A1:A5)\"]','=SUM(A1:A5)',NULL,'SUM menjumlahkan seluruh angka dalam range.',NULL,1,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(14,8,'Hasil dari =SUM(10, 20, 30) adalah...','multiple_choice','Mudah',NULL,'[\"60\",\"50\",\"40\",\"30\"]','60',NULL,'10 + 20 + 30 = 60.',NULL,2,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(15,8,'Shortcut untuk AutoSum adalah...','multiple_choice','Mudah',NULL,'[\"Alt + =\",\"Ctrl + =\",\"Shift + =\",\"Alt + S\"]','Alt + =',NULL,'Alt + = menjumlahkan data di atas secara otomatis.',NULL,3,1,'2026-11-17 02:42:40','2026-11-17 02:42:40'),(16,8,'Jika A1=5, A2=10, =SUM(A1:A2) menghasilkan...','multiple_choice','Mudah',NULL,'[\"15\",\"5\",\"10\",\"20\"]','15',NULL,'SUM menjumlahkan 5 + 10 = 15.',NULL,4,1,'2026-11-17 02:42:41','2026-11-17 02:42:41'),(17,8,'Rumus SUM yang salah adalah...','multiple_choice','Mudah',NULL,'[\"=SUM(A1,A2)\",\"=SUM(A1:A2)\",\"=SUM(5,10)\",\"SUM(A1:A2)\"]','SUM(A1:A2)',NULL,'Rumus Excel harus diawali dengan tanda sama dengan (=).',NULL,5,1,'2026-11-17 02:42:41','2026-11-17 02:42:41'),(18,8,'Untuk menjumlahkan seluruh kolom C dari baris 2 sampai 10, gunakan...','multiple_choice','Mudah',NULL,'[\"=SUM(C2:C10)\",\"=SUM(C1:C10)\",\"=SUM(C2:C9)\",\"=SUM(C:C)\"]','=SUM(C2:C10)',NULL,'Range C2:C10 menjumlahkan data dari C2 sampai C10.',NULL,6,1,'2026-11-17 02:42:41','2026-11-17 02:42:41'),(19,14,'Untuk menjumlahkan penjualan Apel saja, gunakan...','multiple_choice','Mudah',NULL,'[\"=SUMIF(A1:A10,\\\"Apel\\\",B1:B10)\",\"=SUM(A1:A10)\",\"=COUNTIF(A1:A10,\\\"Apel\\\")\",\"=SUMIFS(A1:A10,B1:B10)\"]','=SUMIF(A1:A10,\"Apel\",B1:B10)',NULL,'SUMIF menjumlahkan berdasarkan kriteria tertentu.',NULL,1,1,'2026-11-17 02:42:41','2026-11-17 02:42:41'),(20,14,'Fungsi SUMIFS digunakan untuk...','multiple_choice','Mudah',NULL,'[\"Banyak kriteria\",\"Satu kriteria\",\"Menghitung rata-rata\",\"Mencari data\"]','Banyak kriteria',NULL,'SUMIFS mendukung lebih dari satu kriteria.',NULL,2,1,'2026-11-17 02:42:41','2026-11-17 02:42:41'),(21,14,'Argumen pertama SUMIF adalah...','multiple_choice','Mudah',NULL,'[\"Range kriteria\",\"Kriteria\",\"Range jumlah\",\"Operator\"]','Range kriteria',NULL,'SUMIF(range_kriteria, kriteria, range_jumlah).',NULL,3,1,'2026-11-17 02:42:41','2026-11-17 02:42:41'),(22,14,'=SUMIF(A1:A5,\"Buku\",B1:B5) akan...','multiple_choice','Mudah',NULL,'[\"Menjumlahkan B1:B5 yang A1:A5 berisi \\\"Buku\\\"\",\"Menjumlahkan semua B\",\"Menghitung jumlah Buku\",\"Mencari Buku\"]','Menjumlahkan B1:B5 yang A1:A5 berisi \"Buku\"',NULL,'SUMIF menjumlahkan nilai yang memenuhi kriteria.',NULL,4,1,'2026-11-17 02:42:42','2026-11-17 02:42:42'),(23,14,'Untuk mengunci range kriteria agar tidak bergeser, gunakan...','multiple_choice','Mudah',NULL,'[\"$A$1:$A$10\",\"A1:A10\",\"#A1:A10\",\"@A1:A10\"]','$A$1:$A$10',NULL,'Tanda $ mengunci referensi absolut.',NULL,5,1,'2026-11-17 02:42:42','2026-11-17 02:42:42'),(24,14,'SUMIFS adalah versi lanjutan dari...','multiple_choice','Mudah',NULL,'[\"SUMIF\",\"SUM\",\"AVERAGE\",\"COUNT\"]','SUMIF',NULL,'SUMIFS mendukung banyak kriteria, SUMIF satu kriteria.',NULL,6,1,'2026-11-17 02:42:42','2026-11-17 02:42:42'),(25,20,'VLOOKUP mencari data secara...','multiple_choice','Mudah',NULL,'[\"Vertikal (kolom)\",\"Horizontal (baris)\",\"Diagonal\",\"Acak\"]','Vertikal (kolom)',NULL,'VLOOKUP mencari di kolom pertama.',NULL,1,1,'2026-11-17 02:42:42','2026-11-17 02:42:42'),(26,20,'Argumen ke-3 VLOOKUP adalah...','multiple_choice','Mudah',NULL,'[\"Nomor kolom hasil\",\"Nilai yang dicari\",\"Tabel referensi\",\"Mode pencarian\"]','Nomor kolom hasil',NULL,'VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup]).',NULL,2,1,'2026-11-17 02:42:42','2026-11-17 02:42:42'),(27,20,'Untuk exact match, gunakan argumen terakhir...','multiple_choice','Mudah',NULL,'[\"FALSE\",\"TRUE\",\"1\",\"0.5\"]','FALSE',NULL,'FALSE berarti pencarian persis.',NULL,3,1,'2026-11-17 02:42:42','2026-11-17 02:42:42'),(28,20,'Jika VLOOKUP mengembalikan #N/A, artinya...','multiple_choice','Mudah',NULL,'[\"Data tidak ditemukan\",\"Rumus salah\",\"Tabel kosong\",\"Kolom tidak ada\"]','Data tidak ditemukan',NULL,'#N/A berarti nilai yang dicari tidak ada di tabel.',NULL,4,1,'2026-11-17 02:42:42','2026-11-17 02:42:42'),(29,20,'Untuk mengunci tabel referensi, gunakan...','multiple_choice','Mudah',NULL,'[\"$A$1:$B$10\",\"A1:B10\",\"#A1:B10\",\"@A1:B10\"]','$A$1:$B$10',NULL,'Tanda $ mengunci tabel agar tidak bergeser saat disalin.',NULL,5,1,'2026-11-17 02:42:42','2026-11-17 02:42:42'),(30,20,'XLOOKUP adalah versi modern dari...','multiple_choice','Mudah',NULL,'[\"VLOOKUP\",\"SUM\",\"IF\",\"COUNT\"]','VLOOKUP',NULL,'XLOOKUP lebih fleksibel dari VLOOKUP.',NULL,6,1,'2026-11-17 02:42:42','2026-11-17 02:42:42'),(31,23,'Conditional Formatting digunakan untuk...','multiple_choice','Mudah',NULL,'[\"Mewarnai cell otomatis berdasarkan aturan\",\"Menghitung rata-rata\",\"Mencari data\",\"Mengurutkan data\"]','Mewarnai cell otomatis berdasarkan aturan',NULL,'CF memberi warna otomatis sesuai kondisi.',NULL,1,1,'2026-11-17 02:42:43','2026-11-17 02:42:43'),(32,23,'Untuk menyorot nilai di bawah 75, gunakan...','multiple_choice','Mudah',NULL,'[\"Highlight Cells Rules > Less Than\",\"Highlight Cells Rules > Greater Than\",\"Data Bars\",\"Icon Sets\"]','Highlight Cells Rules > Less Than',NULL,'Less Than menyorot nilai di bawah batas.',NULL,2,1,'2026-11-17 02:42:43','2026-11-17 02:42:43'),(33,23,'Fitur CF yang menampilkan batang visual adalah...','multiple_choice','Mudah',NULL,'[\"Data Bars\",\"Color Scales\",\"Icon Sets\",\"Highlight Rules\"]','Data Bars',NULL,'Data Bars menampilkan batang panjang sesuai nilai.',NULL,3,1,'2026-11-17 02:42:43','2026-11-17 02:42:43'),(34,23,'Gradasi warna pada CF disebut...','multiple_choice','Mudah',NULL,'[\"Color Scales\",\"Data Bars\",\"Icon Sets\",\"Highlight Rules\"]','Color Scales',NULL,'Color Scales menggunakan gradasi warna.',NULL,4,1,'2026-11-17 02:42:43','2026-11-17 02:42:43'),(35,23,'Ikon panah/lampu pada CF disebut...','multiple_choice','Mudah',NULL,'[\"Icon Sets\",\"Data Bars\",\"Color Scales\",\"Highlight Rules\"]','Icon Sets',NULL,'Icon Sets menampilkan ikon sesuai kategori nilai.',NULL,5,1,'2026-11-17 02:42:43','2026-11-17 02:42:43'),(36,23,'Untuk membuat aturan CF sendiri, gunakan...','multiple_choice','Mudah',NULL,'[\"New Rule\",\"Clear Rules\",\"Manage Rules\",\"Edit Rules\"]','New Rule',NULL,'New Rule membuka dialog pembuatan aturan kustom.',NULL,6,1,'2026-11-17 02:42:43','2026-11-17 02:42:43');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tips`
--

DROP TABLE IF EXISTS `tips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tips` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `lesson_id` bigint(20) unsigned NOT NULL,
  `title` varchar(255) NOT NULL,
  `short_description` text NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `shortcut` varchar(255) DEFAULT NULL,
  `steps` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`steps`)),
  `example` text DEFAULT NULL,
  `result` text DEFAULT NULL,
  `difficulty` varchar(255) NOT NULL DEFAULT 'Pemula',
  `platform` varchar(255) NOT NULL DEFAULT 'Windows',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tips_lesson_id_foreign` (`lesson_id`),
  CONSTRAINT `tips_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tips`
--

LOCK TABLES `tips` WRITE;
/*!40000 ALTER TABLE `tips` DISABLE KEYS */;
INSERT INTO `tips` VALUES (1,1,'Buat Workbook Baru','Membuat file Excel baru dengan cepat.','Hemat Waktu','Ctrl + N','[\"Tekan Ctrl + N\",\"Workbook baru akan terbuka.\"]','Membuka file baru','Workbook kosong siap digunakan.','Pemula','Windows',1,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(2,1,'Buka File','Membuka file yang sudah ada.','Hemat Waktu','Ctrl + O','[\"Tekan Ctrl + O\",\"Pilih file dari folder.\"]','Membuka file laporan.xlsx','File terbuka.','Pemula','Windows',2,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(3,1,'Simpan File','Menyimpan perubahan pada file.','Hemat Waktu','Ctrl + S','[\"Tekan Ctrl + S\",\"File akan tersimpan.\"]','Menyimpan pekerjaan','Perubahan tersimpan.','Pemula','Windows',3,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(4,2,'Ke Cell A1','Langsung menuju cell paling awal.','Hemat Waktu','Ctrl + Home','[\"Tekan Ctrl + Home\",\"Kursor pindah ke A1.\"]','Navigasi cepat','Kursor di A1.','Pemula','Windows',1,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(5,2,'Ke Cell Terakhir','Menuju cell terakhir yang digunakan.','Hemat Waktu','Ctrl + End','[\"Tekan Ctrl + End\",\"Kursor pindah ke ujung data.\"]','Menemukan data terakhir','Kursor di ujung data.','Pemula','Windows',2,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(6,2,'Pindah Worksheet','Berpindah antar sheet dengan cepat.','Hemat Waktu','Ctrl + Page Up/Down','[\"Tekan Ctrl + Page Down\",\"Pindah ke sheet berikutnya.\"]','Navigasi antar sheet','Berpindah sheet.','Pemula','Windows',3,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(7,3,'Edit Cell','Mengedit isi cell tanpa klik ganda.','Hemat Waktu','F2','[\"Pilih cell\",\"Tekan F2\",\"Edit isinya.\"]','Memperbaiki data','Cell dalam mode edit.','Pemula','Windows',1,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(8,3,'Baris Baru dalam Cell','Membuat baris baru di dalam satu cell.','Hemat Waktu','Alt + Enter','[\"Ketik teks\",\"Tekan Alt + Enter\",\"Lanjutkan mengetik.\"]','Alamat lengkap multi-baris','Teks dalam 2 baris.','Pemula','Windows',2,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(9,3,'Isi Semua Cell Terpilih','Mengisi semua cell yang diblok dengan data yang sama.','Hemat Waktu','Ctrl + Enter','[\"Blok cell\",\"Ketik data\",\"Tekan Ctrl + Enter.\"]','Mengisi seragam','Semua cell terisi.','Pemula','Windows',3,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(10,3,'Isi Cepat dengan Flash Fill','Mengisi pola data secara otomatis.','Hemat Waktu','Ctrl + E','[\"Ketik contoh di cell sebelah\",\"Tekan Ctrl + E.\"]','Membuat inisial nama','Data terisi otomatis.','Pemula','Windows',4,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(11,4,'Pilih Kolom','Memilih satu kolom penuh.','Hemat Waktu','Ctrl + Space','[\"Klik cell di kolom\",\"Tekan Ctrl + Space.\"]','Format kolom','Kolom terpilih.','Pemula','Windows',1,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(12,4,'Pilih Baris','Memilih satu baris penuh.','Hemat Waktu','Shift + Space','[\"Klik cell di baris\",\"Tekan Shift + Space.\"]','Format baris','Baris terpilih.','Pemula','Windows',2,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(13,4,'Sisipkan Baris/Kolom','Menyisipkan baris atau kolom baru.','Hemat Waktu','Ctrl + +','[\"Pilih baris\\/kolom\",\"Tekan Ctrl + +.\"]','Menambah data','Baris/kolom baru muncul.','Pemula','Windows',3,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(14,6,'Format Cells','Membuka dialog format lengkap.','Hemat Waktu','Ctrl + 1','[\"Pilih cell\",\"Tekan Ctrl + 1\",\"Pilih format.\"]','Format angka detail','Dialog format terbuka.','Pemula','Windows',1,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(15,6,'Format Mata Uang','Mengubah ke format Rp.','Hemat Waktu','Ctrl + Shift + 4','[\"Pilih cell\",\"Tekan Ctrl + Shift + 4.\"]','1000 -> Rp1.000','Format Rupiah.','Pemula','Windows',2,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(16,6,'Format Persen','Mengubah ke format persentase.','Hemat Waktu','Ctrl + Shift + 5','[\"Pilih cell\",\"Tekan Ctrl + Shift + 5.\"]','0.5 -> 50%','Format %.','Pemula','Windows',3,1,'2026-11-17 02:42:36','2026-11-17 02:42:36'),(17,6,'Tanggal Hari Ini','Memasukkan tanggal hari ini.','Hemat Waktu','Ctrl + ;','[\"Pilih cell\",\"Tekan Ctrl + ;.\"]','Tanggal otomatis','Tanggal muncul.','Pemula','Windows',4,1,'2026-11-17 02:42:37','2026-11-17 02:42:37'),(18,7,'Urutan Perhitungan','Gunakan tanda kurung untuk prioritas.','Hemat Waktu','()','[\"Ketik =(\",\"Masukkan rumus\",\"Tutup ).\"]','=(2+3)*4','Hasil 20.','Pemula','Windows',1,1,'2026-11-17 02:42:37','2026-11-17 02:42:37'),(19,7,'Pangkat','Menghitung pangkat.','Hemat Waktu','^','[\"Ketik =angka^pangkat.\"]','=2^3','Hasil 8.','Pemula','Windows',2,1,'2026-11-17 02:42:37','2026-11-17 02:42:37'),(20,8,'Hitung Otomatis dengan AutoSum','Tidak perlu mengetik rumus SUM dari awal.','Hemat Waktu','Alt + =','[\"Masukkan angka di B2:B4\",\"Klik cell B5\",\"Tekan Alt + =\",\"Periksa range yang dipilih\",\"Tekan Enter.\"]','B2=10.000, B3=15.000, B4=20.000','B5 = 45.000','Pemula','Windows',1,1,'2026-11-17 02:42:37','2026-11-17 02:42:37'),(21,8,'Gunakan Range','Menjumlahkan satu rentang sekaligus.','Hemat Waktu','=SUM(...)','[\"Ketik =SUM(B2:B10)\"]','=SUM(B2:B10)','Total seluruh B2 sampai B10.','Pemula','Windows',2,1,'2026-11-17 02:42:37','2026-11-17 02:42:37'),(22,9,'Rata-rata Cepat','Gunakan dropdown AutoSum.','Hemat Waktu','AutoSum -> Average','[\"Klik cell hasil\",\"Klik panah AutoSum\",\"Pilih Average.\"]','Rata-rata nilai','Rata-rata muncul.','Pemula','Windows',1,1,'2026-11-17 02:42:37','2026-11-17 02:42:37'),(23,9,'Hindari Cell Kosong','Pastikan tidak ada teks yang dianggap nol.','Hemat Waktu','-','[\"Periksa data\",\"Hapus teks dari range.\"]','Data bersih','Rata-rata akurat.','Pemula','Windows',2,1,'2026-11-17 02:42:37','2026-11-17 02:42:37'),(24,10,'Nilai Tertinggi','Mencari nilai terbesar.','Hemat Waktu','=MAX(...)','[\"Ketik =MAX(B2:B10)\"]','=MAX(B2:B10)','Nilai tertinggi.','Pemula','Windows',1,1,'2026-11-17 02:42:37','2026-11-17 02:42:37'),(25,10,'Nilai Terendah','Mencari nilai terkecil.','Hemat Waktu','=MIN(...)','[\"Ketik =MIN(B2:B10)\"]','=MIN(B2:B10)','Nilai terendah.','Pemula','Windows',2,1,'2026-11-17 02:42:37','2026-11-17 02:42:37'),(26,11,'Hitung Angka','Menghitung cell berisi angka.','Hemat Waktu','=COUNT(...)','[\"Ketik =COUNT(A1:A10)\"]','=COUNT(A1:A10)','Jumlah angka.','Pemula','Windows',1,1,'2026-11-17 02:42:37','2026-11-17 02:42:37'),(27,11,'Hitung Non-Kosong','Menghitung cell yang terisi.','Hemat Waktu','=COUNTA(...)','[\"Ketik =COUNTA(A1:A10)\"]','=COUNTA(A1:A10)','Jumlah data terisi.','Pemula','Windows',2,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(28,11,'Hitung Kosong','Menghitung cell kosong.','Hemat Waktu','=COUNTBLANK(...)','[\"Ketik =COUNTBLANK(A1:A10)\"]','=COUNTBLANK(A1:A10)','Jumlah cell kosong.','Pemula','Windows',3,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(29,12,'Salin Rumus Cepat','Menyalin rumus ke bawah.','Hemat Waktu','Ctrl + D','[\"Pilih cell rumus dan cell di bawahnya\",\"Tekan Ctrl + D.\"]','=IF(A1>=75,\"Lulus\",\"Gagal\")','Rumus tersalin.','Pemula','Windows',1,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(30,12,'Kunci Referensi','Mengubah A1 menjadi $A$1.','Hemat Waktu','F4','[\"Saat mengetik rumus, tekan F4 pada referensi cell.\"]','=$A$1+1','Referensi absolut.','Pemula','Windows',2,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(31,13,'AND vs OR','AND butuh semua benar, OR butuh salah satu benar.','Hemat Waktu','-','[\"Gunakan AND untuk syarat ketat\",\"OR untuk syarat longgar.\"]','=IF(AND(A1>5,B1<10),\"Ya\",\"Tidak\")','Logika kompleks.','Pemula','Windows',1,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(32,14,'SUMIF Satu Kriteria','Menjumlahkan berdasarkan 1 syarat.','Hemat Waktu','=SUMIF(...)','[\"Ketik =SUMIF(A1:A10,\\\"Apel\\\",B1:B10)\"]','=SUMIF(A1:A10,\"Apel\",B1:B10)','Total Apel.','Pemula','Windows',1,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(33,14,'Kunci Range Kriteria','Gunakan $ agar range tidak bergeser.','Hemat Waktu','F4','[\"Tekan F4 pada range.\"]','=SUMIF($A$1:$A$10,...)','Range terkunci.','Pemula','Windows',2,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(34,15,'Wildcard Pencarian','Cari teks yang mengandung kata tertentu.','Hemat Waktu','*','[\"Gunakan *Buku* di kriteria.\"]','=COUNTIF(A1:A10,\"*Buku*\")','Hitung semua yang ada kata Buku.','Pemula','Windows',1,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(35,16,'Rata-rata Bersyarat','Rata-rata berdasarkan 1 kriteria.','Hemat Waktu','=AVERAGEIF(...)','[\"Ketik =AVERAGEIF(A1:A10,\\\"Apel\\\",B1:B10)\"]','=AVERAGEIF(A1:A10,\"Apel\",B1:B10)','Rata-rata Apel.','Pemula','Windows',1,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(36,17,'Flash Fill','Otomatis mengisi pola teks.','Hemat Waktu','Ctrl + E','[\"Ketik contoh di cell sebelah\",\"Tekan Ctrl + E.\"]','Memisahkan nama depan','Data terisi otomatis.','Pemula','Windows',1,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(37,17,'Hapus Spasi Berlebih','Membersihkan spasi ganda.','Hemat Waktu','=TRIM(...)','[\"Ketik =TRIM(A1)\"]','=TRIM(A1)','Teks bersih.','Pemula','Windows',2,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(38,18,'Ganti Tipe Referensi','Memutar antara A1, $A$1, A$1, $A1.','Hemat Waktu','F4','[\"Saat mengetik rumus, tekan F4 pada referensi.\"]','A1 -> $A$1','Referensi berubah.','Pemula','Windows',1,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(39,19,'Tanggal Sekarang','Memasukkan tanggal hari ini.','Hemat Waktu','Ctrl + ;','[\"Tekan Ctrl + ;.\"]','Tanggal otomatis','Tanggal muncul.','Pemula','Windows',1,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(40,19,'Waktu Sekarang','Memasukkan jam saat ini.','Hemat Waktu','Ctrl + Shift + ;','[\"Tekan Ctrl + Shift + ;.\"]','Jam otomatis','Waktu muncul.','Pemula','Windows',2,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(41,19,'TODAY & NOW','Fungsi tanggal & waktu dinamis.','Hemat Waktu','=TODAY() / =NOW()','[\"Ketik =TODAY() atau =NOW().\"]','=TODAY()','Tanggal hari ini.','Pemula','Windows',3,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(42,20,'Kunci Tabel Referensi','Gunakan $ pada tabel agar tidak bergeser.','Hemat Waktu','F4','[\"Tekan F4 pada range tabel.\"]','=VLOOKUP(D1,$A$1:$B$3,2,FALSE)','Tabel terkunci.','Pemula','Windows',1,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(43,20,'Exact Match','Gunakan FALSE untuk pencarian persis.','Hemat Waktu','FALSE','[\"Tambahkan FALSE di akhir rumus.\"]','=VLOOKUP(...,FALSE)','Pencarian akurat.','Pemula','Windows',2,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(44,21,'Tangani Error','Menampilkan nilai alternatif saat error.','Hemat Waktu','=IFERROR(...)','[\"Bungkus rumus dengan IFERROR.\"]','=IFERROR(VLOOKUP(...),\"Tidak ada\")','Error diganti teks.','Pemula','Windows',1,1,'2026-11-17 02:42:38','2026-11-17 02:42:38'),(45,21,'Tampilkan Rumus','Menampilkan semua rumus di sheet.','Hemat Waktu','Ctrl + `','[\"Tekan Ctrl + `.\"]','Lihat rumus asli','Semua rumus terlihat.','Pemula','Windows',2,1,'2026-11-17 02:42:39','2026-11-17 02:42:39'),(46,5,'Border Cepat','Memberi border ke seluruh tabel.','Hemat Waktu','Alt + H + B + A','[\"Blok data\",\"Tekan Alt + H + B + A.\"]','Tabel berborder','Semua cell bergaris.','Pemula','Windows',1,1,'2026-11-17 02:42:39','2026-11-17 02:42:39'),(47,22,'Aktifkan Filter','Menambah tombol filter di header.','Hemat Waktu','Ctrl + Shift + L','[\"Pilih header tabel\",\"Tekan Ctrl + Shift + L.\"]','Filter data','Tombol filter muncul.','Pemula','Windows',1,1,'2026-11-17 02:42:39','2026-11-17 02:42:39'),(48,23,'Sorot Nilai','Mewarnai cell berdasarkan aturan.','Hemat Waktu','Home > CF','[\"Pilih data\",\"Home > Conditional Formatting\",\"Pilih Highlight Cells Rules.\"]','Nilai < 70 merah','Cell berwarna.','Pemula','Windows',1,1,'2026-11-17 02:42:39','2026-11-17 02:42:39'),(49,24,'Buat Dropdown','Membuat pilihan dropdown di cell.','Hemat Waktu','Data > Validation','[\"Pilih cell\",\"Data > Data Validation\",\"Pilih List\",\"Isi sumber.\"]','Dropdown Laki-laki/Perempuan','Cell ada dropdown.','Pemula','Windows',1,1,'2026-11-17 02:42:39','2026-11-17 02:42:39'),(50,25,'Chart Cepat di Sheet','Membuat chart di sheet yang sama.','Hemat Waktu','Alt + F1','[\"Pilih data\",\"Tekan Alt + F1.\"]','Grafik penjualan','Chart muncul.','Pemula','Windows',1,1,'2026-11-17 02:42:39','2026-11-17 02:42:39'),(51,25,'Chart di Sheet Baru','Membuat chart di sheet terpisah.','Hemat Waktu','F11','[\"Pilih data\",\"Tekan F11.\"]','Grafik penuh','Sheet chart baru.','Pemula','Windows',2,1,'2026-11-17 02:42:39','2026-11-17 02:42:39'),(52,26,'Buat Pivot Cepat','Merangkum data besar.','Hemat Waktu','Insert > PivotTable','[\"Pilih data\",\"Insert > PivotTable\",\"Klik OK.\"]','Ringkasan penjualan','PivotTable muncul.','Pemula','Windows',1,1,'2026-11-17 02:42:39','2026-11-17 02:42:39'),(53,26,'Slicer Interaktif','Filter data PivotTable secara visual.','Hemat Waktu','Insert > Slicer','[\"Klik PivotTable\",\"Insert > Slicer\",\"Pilih field.\"]','Filter per produk','Slicer interaktif.','Pemula','Windows',2,1,'2026-11-17 02:42:40','2026-11-17 02:42:40');
/*!40000 ALTER TABLE `tips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_lesson_progress`
--

DROP TABLE IF EXISTS `user_lesson_progress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_lesson_progress` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `session_id` varchar(64) DEFAULT NULL,
  `lesson_id` bigint(20) unsigned NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `best_score` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_lesson_progress_session_id_lesson_id_unique` (`session_id`,`lesson_id`),
  KEY `user_lesson_progress_user_id_foreign` (`user_id`),
  KEY `user_lesson_progress_lesson_id_foreign` (`lesson_id`),
  CONSTRAINT `user_lesson_progress_lesson_id_foreign` FOREIGN KEY (`lesson_id`) REFERENCES `lessons` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_lesson_progress_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_lesson_progress`
--

LOCK TABLES `user_lesson_progress` WRITE;
/*!40000 ALTER TABLE `user_lesson_progress` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_lesson_progress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'excel_learning'
--

--
-- Dumping routines for database 'excel_learning'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-18 11:38:39

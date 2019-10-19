
DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `rec_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `othername` varchar(200)character set utf8  NULL,
  `eid` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profession_id` varchar(10) DEFAULT NULL,
   `department_id` varchar(10) DEFAULT NULL,
  `isadmin` varchar(1) DEFAULT 'n',
  `supervisor_id` varchar(10) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `home_mobile` varchar(100) DEFAULT NULL,
  `isactive` varchar(1) DEFAULT 'y',
   `isbouns_hour_apply` varchar(1) DEFAULT 'n',
   `basic_salary` integer(10) DEFAULT 0,
   `per_hour_rate` integer(10) DEFAULT 0,
   `allowance_one` integer(10) DEFAULT 0,
   `allowance_two` integer(10) DEFAULT 0,
  `isdelete` varchar(1) DEFAULT 'n',
  `project_ids` text DEFAULT NULL,
  `extras` text DEFAULT NULL,
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rec_id`),
  UNIQUE KEY `rec_id` (`rec_id`),
  UNIQUE KEY `eid` (`eid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `users`
--


LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users`(`name`,`othername`,`eid`,`password`,`profession_id`,`isadmin`,`supervisor_id`,`mobile`,`isactive`,`isdelete`) VALUES ('System Administrator','منتظم','root','password','','y','','09099090','y','n');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `users_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_tokens` (
  `rec_id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(200) NOT NULL,
   `token` text DEFAULT NULL,
   `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rec_id`),
  UNIQUE KEY `rec_id` (`rec_id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;



DROP TABLE IF EXISTS `attendence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attendence` (
  `rec_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `sideno` int(3) NOT NULL,
  `overtime` int(3) DEFAULT NULL,
  `supervisor_id` varchar(10) DEFAULT NULL,
    `status` varchar(50) DEFAULT NULL,
    `extras` text DEFAULT NULL,
     `isdelete` varchar(1) DEFAULT 'n',
      `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rec_id`),
  UNIQUE KEY `rec_id` (`rec_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `attendence`
--


LOCK TABLES `attendence` WRITE;
/*!40000 ALTER TABLE `attendence` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendence` ENABLE KEYS */;
UNLOCK TABLES;

-- department table
DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `rec_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `extras` text DEFAULT NULL,
   `isdelete` varchar(1) DEFAULT 'n',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rec_id`),
  UNIQUE KEY `rec_id` (`rec_id`)
  
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `attendence`
--


LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `attendence` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendence` ENABLE KEYS */;
UNLOCK TABLES;

-- professions table
DROP TABLE IF EXISTS `profession`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profession` (
  `rec_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `dep_id` varchar(10)  NULL,
  `extras` text DEFAULT NULL,
   `isdelete` varchar(1) DEFAULT 'n',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rec_id`),
  UNIQUE KEY `rec_id` (`rec_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `attendence`
--


LOCK TABLES `worknatures` WRITE;
/*!40000 ALTER TABLE `attendence` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendence` ENABLE KEYS */;
UNLOCK TABLES;
-- worknatures table
DROP TABLE IF EXISTS `worknatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `worknatures` (
  `rec_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `translation` text character set utf8  DEFAULT NULL,
  `extras` text DEFAULT NULL,
   `isdelete` varchar(1) DEFAULT 'n',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rec_id`),
  UNIQUE KEY `rec_id` (`rec_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `worknatures`
--


LOCK TABLES `worknatures` WRITE;
/*!40000 ALTER TABLE `worknatures` DISABLE KEYS */;
/*!40000 ALTER TABLE `worknatures` ENABLE KEYS */;
UNLOCK TABLES;

-- projects table
DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `rec_id` int(11) NOT NULL AUTO_INCREMENT,
  `sid` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
   `status` varchar(100) NOT NULL,
   `translation` text character set utf8,
  `area` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
 `startDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `endDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `extras` text  DEFAULT NULL,
   `isactive` varchar(1) DEFAULT 'y',
   `isdelete` varchar(1) DEFAULT 'n',
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`rec_id`),
  UNIQUE KEY `rec_id` (`rec_id`),
   UNIQUE KEY `sid` (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `projects`
--

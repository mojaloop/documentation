-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: account_lookup
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currency` (
  `currencyId` varchar(3) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`currencyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currency`
--

LOCK TABLES `currency` WRITE;
/*!40000 ALTER TABLE `currency` DISABLE KEYS */;
INSERT INTO `currency` VALUES ('AED','UAE dirham',1,'2019-03-28 09:07:47'),('AFA','Afghanistan afghani (obsolete)',1,'2019-03-28 09:07:47'),('AFN','Afghanistan afghani',1,'2019-03-28 09:07:47'),('ALL','Albanian lek',1,'2019-03-28 09:07:47'),('AMD','Armenian dram',1,'2019-03-28 09:07:47'),('ANG','Netherlands Antillian guilder',1,'2019-03-28 09:07:47'),('AOA','Angolan kwanza',1,'2019-03-28 09:07:47'),('AOR','Angolan kwanza reajustado',1,'2019-03-28 09:07:47'),('ARS','Argentine peso',1,'2019-03-28 09:07:47'),('AUD','Australian dollar',1,'2019-03-28 09:07:47'),('AWG','Aruban guilder',1,'2019-03-28 09:07:47'),('AZN','Azerbaijanian new manat',1,'2019-03-28 09:07:47'),('BAM','Bosnia-Herzegovina convertible mark',1,'2019-03-28 09:07:47'),('BBD','Barbados dollar',1,'2019-03-28 09:07:47'),('BDT','Bangladeshi taka',1,'2019-03-28 09:07:47'),('BGN','Bulgarian lev',1,'2019-03-28 09:07:47'),('BHD','Bahraini dinar',1,'2019-03-28 09:07:47'),('BIF','Burundi franc',1,'2019-03-28 09:07:47'),('BMD','Bermudian dollar',1,'2019-03-28 09:07:47'),('BND','Brunei dollar',1,'2019-03-28 09:07:47'),('BOB','Bolivian boliviano',1,'2019-03-28 09:07:47'),('BRL','Brazilian real',1,'2019-03-28 09:07:47'),('BSD','Bahamian dollar',1,'2019-03-28 09:07:47'),('BTN','Bhutan ngultrum',1,'2019-03-28 09:07:47'),('BWP','Botswana pula',1,'2019-03-28 09:07:47'),('BYN','Belarusian ruble',1,'2019-03-28 09:07:47'),('BZD','Belize dollar',1,'2019-03-28 09:07:47'),('CAD','Canadian dollar',1,'2019-03-28 09:07:47'),('CDF','Congolese franc',1,'2019-03-28 09:07:47'),('CHF','Swiss franc',1,'2019-03-28 09:07:47'),('CLP','Chilean peso',1,'2019-03-28 09:07:47'),('CNY','Chinese yuan renminbi',1,'2019-03-28 09:07:47'),('COP','Colombian peso',1,'2019-03-28 09:07:47'),('CRC','Costa Rican colon',1,'2019-03-28 09:07:47'),('CUC','Cuban convertible peso',1,'2019-03-28 09:07:47'),('CUP','Cuban peso',1,'2019-03-28 09:07:47'),('CVE','Cape Verde escudo',1,'2019-03-28 09:07:47'),('CZK','Czech koruna',1,'2019-03-28 09:07:47'),('DJF','Djibouti franc',1,'2019-03-28 09:07:47'),('DKK','Danish krone',1,'2019-03-28 09:07:47'),('DOP','Dominican peso',1,'2019-03-28 09:07:47'),('DZD','Algerian dinar',1,'2019-03-28 09:07:47'),('EEK','Estonian kroon',1,'2019-03-28 09:07:47'),('EGP','Egyptian pound',1,'2019-03-28 09:07:47'),('ERN','Eritrean nakfa',1,'2019-03-28 09:07:47'),('ETB','Ethiopian birr',1,'2019-03-28 09:07:47'),('EUR','EU euro',1,'2019-03-28 09:07:47'),('FJD','Fiji dollar',1,'2019-03-28 09:07:47'),('FKP','Falkland Islands pound',1,'2019-03-28 09:07:47'),('GBP','British pound',1,'2019-03-28 09:07:47'),('GEL','Georgian lari',1,'2019-03-28 09:07:47'),('GGP','Guernsey pound',1,'2019-03-28 09:07:47'),('GHS','Ghanaian new cedi',1,'2019-03-28 09:07:47'),('GIP','Gibraltar pound',1,'2019-03-28 09:07:47'),('GMD','Gambian dalasi',1,'2019-03-28 09:07:47'),('GNF','Guinean franc',1,'2019-03-28 09:07:47'),('GTQ','Guatemalan quetzal',1,'2019-03-28 09:07:47'),('GYD','Guyana dollar',1,'2019-03-28 09:07:47'),('HKD','Hong Kong SAR dollar',1,'2019-03-28 09:07:47'),('HNL','Honduran lempira',1,'2019-03-28 09:07:47'),('HRK','Croatian kuna',1,'2019-03-28 09:07:47'),('HTG','Haitian gourde',1,'2019-03-28 09:07:47'),('HUF','Hungarian forint',1,'2019-03-28 09:07:47'),('IDR','Indonesian rupiah',1,'2019-03-28 09:07:47'),('ILS','Israeli new shekel',1,'2019-03-28 09:07:47'),('IMP','Isle of Man pound',1,'2019-03-28 09:07:47'),('INR','Indian rupee',1,'2019-03-28 09:07:47'),('IQD','Iraqi dinar',1,'2019-03-28 09:07:47'),('IRR','Iranian rial',1,'2019-03-28 09:07:47'),('ISK','Icelandic krona',1,'2019-03-28 09:07:47'),('JEP','Jersey pound',1,'2019-03-28 09:07:47'),('JMD','Jamaican dollar',1,'2019-03-28 09:07:47'),('JOD','Jordanian dinar',1,'2019-03-28 09:07:47'),('JPY','Japanese yen',1,'2019-03-28 09:07:47'),('KES','Kenyan shilling',1,'2019-03-28 09:07:47'),('KGS','Kyrgyz som',1,'2019-03-28 09:07:47'),('KHR','Cambodian riel',1,'2019-03-28 09:07:47'),('KMF','Comoros franc',1,'2019-03-28 09:07:47'),('KPW','North Korean won',1,'2019-03-28 09:07:47'),('KRW','South Korean won',1,'2019-03-28 09:07:47'),('KWD','Kuwaiti dinar',1,'2019-03-28 09:07:47'),('KYD','Cayman Islands dollar',1,'2019-03-28 09:07:47'),('KZT','Kazakh tenge',1,'2019-03-28 09:07:47'),('LAK','Lao kip',1,'2019-03-28 09:07:47'),('LBP','Lebanese pound',1,'2019-03-28 09:07:47'),('LKR','Sri Lanka rupee',1,'2019-03-28 09:07:47'),('LRD','Liberian dollar',1,'2019-03-28 09:07:47'),('LSL','Lesotho loti',1,'2019-03-28 09:07:47'),('LTL','Lithuanian litas',1,'2019-03-28 09:07:47'),('LVL','Latvian lats',1,'2019-03-28 09:07:47'),('LYD','Libyan dinar',1,'2019-03-28 09:07:47'),('MAD','Moroccan dirham',1,'2019-03-28 09:07:47'),('MDL','Moldovan leu',1,'2019-03-28 09:07:47'),('MGA','Malagasy ariary',1,'2019-03-28 09:07:47'),('MKD','Macedonian denar',1,'2019-03-28 09:07:47'),('MMK','Myanmar kyat',1,'2019-03-28 09:07:47'),('MNT','Mongolian tugrik',1,'2019-03-28 09:07:47'),('MOP','Macao SAR pataca',1,'2019-03-28 09:07:47'),('MRO','Mauritanian ouguiya',1,'2019-03-28 09:07:47'),('MUR','Mauritius rupee',1,'2019-03-28 09:07:47'),('MVR','Maldivian rufiyaa',1,'2019-03-28 09:07:47'),('MWK','Malawi kwacha',1,'2019-03-28 09:07:47'),('MXN','Mexican peso',1,'2019-03-28 09:07:47'),('MYR','Malaysian ringgit',1,'2019-03-28 09:07:47'),('MZN','Mozambique new metical',1,'2019-03-28 09:07:47'),('NAD','Namibian dollar',1,'2019-03-28 09:07:47'),('NGN','Nigerian naira',1,'2019-03-28 09:07:47'),('NIO','Nicaraguan cordoba oro',1,'2019-03-28 09:07:47'),('NOK','Norwegian krone',1,'2019-03-28 09:07:47'),('NPR','Nepalese rupee',1,'2019-03-28 09:07:47'),('NZD','New Zealand dollar',1,'2019-03-28 09:07:47'),('OMR','Omani rial',1,'2019-03-28 09:07:47'),('PAB','Panamanian balboa',1,'2019-03-28 09:07:47'),('PEN','Peruvian nuevo sol',1,'2019-03-28 09:07:47'),('PGK','Papua New Guinea kina',1,'2019-03-28 09:07:47'),('PHP','Philippine peso',1,'2019-03-28 09:07:47'),('PKR','Pakistani rupee',1,'2019-03-28 09:07:47'),('PLN','Polish zloty',1,'2019-03-28 09:07:47'),('PYG','Paraguayan guarani',1,'2019-03-28 09:07:47'),('QAR','Qatari rial',1,'2019-03-28 09:07:47'),('RON','Romanian new leu',1,'2019-03-28 09:07:47'),('RSD','Serbian dinar',1,'2019-03-28 09:07:47'),('RUB','Russian ruble',1,'2019-03-28 09:07:47'),('RWF','Rwandan franc',1,'2019-03-28 09:07:47'),('SAR','Saudi riyal',1,'2019-03-28 09:07:47'),('SBD','Solomon Islands dollar',1,'2019-03-28 09:07:47'),('SCR','Seychelles rupee',1,'2019-03-28 09:07:47'),('SDG','Sudanese pound',1,'2019-03-28 09:07:47'),('SEK','Swedish krona',1,'2019-03-28 09:07:47'),('SGD','Singapore dollar',1,'2019-03-28 09:07:47'),('SHP','Saint Helena pound',1,'2019-03-28 09:07:47'),('SLL','Sierra Leone leone',1,'2019-03-28 09:07:47'),('SOS','Somali shilling',1,'2019-03-28 09:07:47'),('SPL','Seborgan luigino',1,'2019-03-28 09:07:47'),('SRD','Suriname dollar',1,'2019-03-28 09:07:47'),('STD','Sao Tome and Principe dobra',1,'2019-03-28 09:07:47'),('SVC','El Salvador colon',1,'2019-03-28 09:07:47'),('SYP','Syrian pound',1,'2019-03-28 09:07:47'),('SZL','Swaziland lilangeni',1,'2019-03-28 09:07:47'),('THB','Thai baht',1,'2019-03-28 09:07:47'),('TJS','Tajik somoni',1,'2019-03-28 09:07:47'),('TMT','Turkmen new manat',1,'2019-03-28 09:07:47'),('TND','Tunisian dinar',1,'2019-03-28 09:07:47'),('TOP','Tongan pa\'anga',1,'2019-03-28 09:07:47'),('TRY','Turkish lira',1,'2019-03-28 09:07:47'),('TTD','Trinidad and Tobago dollar',1,'2019-03-28 09:07:47'),('TVD','Tuvaluan dollar',1,'2019-03-28 09:07:47'),('TWD','Taiwan New dollar',1,'2019-03-28 09:07:47'),('TZS','Tanzanian shilling',1,'2019-03-28 09:07:47'),('UAH','Ukrainian hryvnia',1,'2019-03-28 09:07:47'),('UGX','Uganda new shilling',1,'2019-03-28 09:07:47'),('USD','US dollar',1,'2019-03-28 09:07:47'),('UYU','Uruguayan peso uruguayo',1,'2019-03-28 09:07:47'),('UZS','Uzbekistani sum',1,'2019-03-28 09:07:47'),('VEF','Venezuelan bolivar fuerte',1,'2019-03-28 09:07:47'),('VND','Vietnamese dong',1,'2019-03-28 09:07:47'),('VUV','Vanuatu vatu',1,'2019-03-28 09:07:47'),('WST','Samoan tala',1,'2019-03-28 09:07:47'),('XAF','CFA franc BEAC',1,'2019-03-28 09:07:47'),('XAG','Silver (ounce)',1,'2019-03-28 09:07:47'),('XAU','Gold (ounce)',1,'2019-03-28 09:07:47'),('XCD','East Caribbean dollar',1,'2019-03-28 09:07:47'),('XDR','IMF special drawing right',1,'2019-03-28 09:07:47'),('XFO','Gold franc',1,'2019-03-28 09:07:47'),('XFU','UIC franc',1,'2019-03-28 09:07:47'),('XOF','CFA franc BCEAO',1,'2019-03-28 09:07:47'),('XPD','Palladium (ounce)',1,'2019-03-28 09:07:47'),('XPF','CFP franc',1,'2019-03-28 09:07:47'),('XPT','Platinum (ounce)',1,'2019-03-28 09:07:47'),('YER','Yemeni rial',1,'2019-03-28 09:07:47'),('ZAR','South African rand',1,'2019-03-28 09:07:47'),('ZMK','Zambian kwacha (obsolete)',1,'2019-03-28 09:07:47'),('ZMW','Zambian kwacha',1,'2019-03-28 09:07:47'),('ZWD','Zimbabwe dollar (initial)',1,'2019-03-28 09:07:47'),('ZWL','Zimbabwe dollar (3rd denomination)',1,'2019-03-28 09:07:47'),('ZWN','Zimbabwe dollar (1st denomination)',1,'2019-03-28 09:07:47'),('ZWR','Zimbabwe dollar (2nd denomination)',1,'2019-03-28 09:07:47');
/*!40000 ALTER TABLE `currency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endpointType`
--

DROP TABLE IF EXISTS `endpointType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `endpointType` (
  `endpointTypeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(50) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`endpointTypeId`),
  UNIQUE KEY `endpointtype_type_unique` (`type`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endpointType`
--

LOCK TABLES `endpointType` WRITE;
/*!40000 ALTER TABLE `endpointType` DISABLE KEYS */;
INSERT INTO `endpointType` VALUES (1,'URL','REST URLs',1,'2019-03-28 09:07:47');
/*!40000 ALTER TABLE `endpointType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migration`
--

DROP TABLE IF EXISTS `migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration`
--

LOCK TABLES `migration` WRITE;
/*!40000 ALTER TABLE `migration` DISABLE KEYS */;
INSERT INTO `migration` VALUES (1,'01_currency.js',1,'2019-03-28 11:07:46'),(2,'02_endpointType.js',1,'2019-03-28 11:07:46'),(3,'03_endpointType-indexes.js',1,'2019-03-28 11:07:46'),(4,'04_partyIdType.js',1,'2019-03-28 11:07:46'),(5,'05_partyIdType-indexes.js',1,'2019-03-28 11:07:46'),(6,'08_oracleEndpoint.js',1,'2019-03-28 11:07:47'),(7,'09_oracleEndpoint-indexes.js',1,'2019-03-28 11:07:47');
/*!40000 ALTER TABLE `migration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migration_lock`
--

DROP TABLE IF EXISTS `migration_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration_lock`
--

LOCK TABLES `migration_lock` WRITE;
/*!40000 ALTER TABLE `migration_lock` DISABLE KEYS */;
INSERT INTO `migration_lock` VALUES (1,0);
/*!40000 ALTER TABLE `migration_lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oracleEndpoint`
--

DROP TABLE IF EXISTS `oracleEndpoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `oracleEndpoint` (
  `oracleEndpointId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `partyIdTypeId` int(10) unsigned NOT NULL,
  `endpointTypeId` int(10) unsigned NOT NULL,
  `currencyId` varchar(255) DEFAULT NULL,
  `value` varchar(512) NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(128) NOT NULL,
  PRIMARY KEY (`oracleEndpointId`),
  KEY `oracleendpoint_currencyid_foreign` (`currencyId`),
  KEY `oracleendpoint_partyidtypeid_index` (`partyIdTypeId`),
  KEY `oracleendpoint_endpointtypeid_index` (`endpointTypeId`),
  CONSTRAINT `oracleendpoint_currencyid_foreign` FOREIGN KEY (`currencyId`) REFERENCES `currency` (`currencyid`),
  CONSTRAINT `oracleendpoint_endpointtypeid_foreign` FOREIGN KEY (`endpointTypeId`) REFERENCES `endpointType` (`endpointtypeid`),
  CONSTRAINT `oracleendpoint_partyidtypeid_foreign` FOREIGN KEY (`partyIdTypeId`) REFERENCES `partyIdType` (`partyidtypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oracleEndpoint`
--

LOCK TABLES `oracleEndpoint` WRITE;
/*!40000 ALTER TABLE `oracleEndpoint` DISABLE KEYS */;
/*!40000 ALTER TABLE `oracleEndpoint` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `partyIdType`
--

DROP TABLE IF EXISTS `partyIdType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partyIdType` (
  `partyIdTypeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(512) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`partyIdTypeId`),
  UNIQUE KEY `partyidtype_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partyIdType`
--

LOCK TABLES `partyIdType` WRITE;
/*!40000 ALTER TABLE `partyIdType` DISABLE KEYS */;
INSERT INTO `partyIdType` VALUES (1,'MSISDN','A MSISDN (Mobile Station International Subscriber Directory Number, that is, the phone number) is used as reference to a participant. The MSISDN identifier should be in international format according to the ITU-T E.164 standard. Optionally, the MSISDN may be prefixed by a single plus sign, indicating the international prefix.',1,'2019-03-28 09:07:47'),(2,'EMAIL','An email is used as reference to a participant. The format of the email should be according to the informational RFC 3696.',1,'2019-03-28 09:07:47'),(3,'PERSONAL_ID','A personal identifier is used as reference to a participant. Examples of personal identification are passport number, birth certificate number, and national registration number. The identifier number is added in the PartyIdentifier element. The personal identifier type is added in the PartySubIdOrType element.',1,'2019-03-28 09:07:47'),(4,'BUSINESS','A specific Business (for example, an organization or a company) is used as reference to a participant. The BUSINESS identifier can be in any format. To make a transaction connected to a specific username or bill number in a Business, the PartySubIdOrType element should be used.',1,'2019-03-28 09:07:47'),(5,'DEVICE','A specific device (for example, a POS or ATM) ID connected to a specific business or organization is used as reference to a Party. For referencing a specific device under a specific business or organization, use the PartySubIdOrType element.',1,'2019-03-28 09:07:47'),(6,'ACCOUNT_ID','A bank account number or FSP account ID should be used as reference to a participant. The ACCOUNT_ID identifier can be in any format, as formats can greatly differ depending on country and FSP.',1,'2019-03-28 09:07:47'),(7,'IBAN','A bank account number or FSP account ID is used as reference to a participant. The IBAN identifier can consist of up to 34 alphanumeric characters and should be entered without whitespace.',1,'2019-03-28 09:07:47'),(8,'ALIAS','An alias is used as reference to a participant. The alias should be created in the FSP as an alternative reference to an account owner. Another example of an alias is a username in the FSP system. The ALIAS identifier can be in any format. It is also possible to use the PartySubIdOrType element for identifying an account under an Alias defined by the PartyIdentifier.',1,'2019-03-28 09:07:47');
/*!40000 ALTER TABLE `partyIdType` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-03-28 11:09:54

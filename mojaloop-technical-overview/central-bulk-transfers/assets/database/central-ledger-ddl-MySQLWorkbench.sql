-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: 127.0.0.1    Database: central_ledger
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bulkProcessingState`
--

DROP TABLE IF EXISTS `bulkProcessingState`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkProcessingState` (
  `bulkProcessingStateId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bulkProcessingStateId`),
  UNIQUE KEY `bulkprocessingstate_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulkTransfer`
--

DROP TABLE IF EXISTS `bulkTransfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkTransfer` (
  `bulkTransferId` varchar(36) NOT NULL,
  `bulkQuoteId` varchar(36) DEFAULT NULL,
  `payerParticipantId` int(10) unsigned NOT NULL,
  `payeeParticipantId` int(10) unsigned NOT NULL,
  `expirationDate` datetime NOT NULL,
  `transfersJson` json NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bulkTransferId`),
  KEY `bulktransfer_payerparticipantid_index` (`payerParticipantId`),
  KEY `bulktransfer_payeeparticipantid_index` (`payeeParticipantId`),
  CONSTRAINT `bulktransfer_bulktransferid_foreign` FOREIGN KEY (`bulkTransferId`) REFERENCES `bulkTransferDuplicateCheck` (`bulktransferid`),
  CONSTRAINT `bulktransfer_payeeparticipantid_foreign` FOREIGN KEY (`payeeParticipantId`) REFERENCES `participant` (`participantid`),
  CONSTRAINT `bulktransfer_payerparticipantid_foreign` FOREIGN KEY (`payerParticipantId`) REFERENCES `participant` (`participantid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulkTransferAssociation`
--

DROP TABLE IF EXISTS `bulkTransferAssociation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkTransferAssociation` (
  `transferId` varchar(36) NOT NULL,
  `bulkTransferId` varchar(36) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `bulkProcessingStateId` int(10) unsigned NOT NULL,
  `lastProcessedDate` datetime DEFAULT NULL,
  PRIMARY KEY (`transferId`),
  KEY `bulktransferassociation_bulkprocessingstateid_foreign` (`bulkProcessingStateId`),
  KEY `bulktransferassociation_bulktransferid_index` (`bulkTransferId`),
  CONSTRAINT `bulktransferassociation_bulkprocessingstateid_foreign` FOREIGN KEY (`bulkProcessingStateId`) REFERENCES `bulkProcessingState` (`bulkprocessingstateid`),
  CONSTRAINT `bulktransferassociation_bulktransferid_foreign` FOREIGN KEY (`bulkTransferId`) REFERENCES `bulkTransfer` (`bulktransferid`),
  CONSTRAINT `bulktransferassociation_transferid_foreign` FOREIGN KEY (`transferId`) REFERENCES `transfer` (`transferid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulkTransferDuplicateCheck`
--

DROP TABLE IF EXISTS `bulkTransferDuplicateCheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkTransferDuplicateCheck` (
  `bulkTransferId` varchar(36) NOT NULL,
  `hash` varchar(256) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bulkTransferId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulkTransferError`
--

DROP TABLE IF EXISTS `bulkTransferError`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkTransferError` (
  `bulkTransferErrorId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `bulkTransferStateChangeId` bigint(20) unsigned NOT NULL,
  `errorCode` int(10) unsigned NOT NULL,
  `errorDescription` varchar(128) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bulkTransferErrorId`),
  KEY `bulktransfererror_bulktransferstatechangeid_index` (`bulkTransferStateChangeId`),
  CONSTRAINT `bulktransfererror_bulktransferstatechangeid_foreign` FOREIGN KEY (`bulkTransferStateChangeId`) REFERENCES `bulkTransferStateChange` (`bulktransferstatechangeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulkTransferExtension`
--

DROP TABLE IF EXISTS `bulkTransferExtension`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkTransferExtension` (
  `bulkTransferExtensionId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `bulkTransferId` varchar(36) NOT NULL,
  `bulkTransferFulfilmentId` varchar(36) DEFAULT NULL,
  `key` varchar(128) NOT NULL,
  `value` text NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bulkTransferExtensionId`),
  KEY `bulktransferextension_bulktransferid_index` (`bulkTransferId`),
  KEY `bulktransferextension_bulktransferfulfilmentid_index` (`bulkTransferFulfilmentId`),
  CONSTRAINT `bulktransferextension_bulktransferfulfilmentid_foreign` FOREIGN KEY (`bulkTransferFulfilmentId`) REFERENCES `bulkTransferFulfilment` (`bulktransferfulfilmentid`),
  CONSTRAINT `bulktransferextension_bulktransferid_foreign` FOREIGN KEY (`bulkTransferId`) REFERENCES `bulkTransfer` (`bulktransferid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulkTransferFulfilment`
--

DROP TABLE IF EXISTS `bulkTransferFulfilment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkTransferFulfilment` (
  `bulkTransferFulfilmentId` varchar(36) NOT NULL,
  `bulkTransferId` varchar(36) NOT NULL,
  `completedDate` datetime NOT NULL,
  `transfersJson` json NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bulkTransferFulfilmentId`),
  KEY `bulktransferfulfilment_bulktransferid_index` (`bulkTransferId`),
  CONSTRAINT `bulktransferfulfilment_bulktransferfulfilmentid_foreign` FOREIGN KEY (`bulkTransferFulfilmentId`) REFERENCES `bulkTransferFulfilmentDuplicateCheck` (`bulktransferfulfilmentid`),
  CONSTRAINT `bulktransferfulfilment_bulktransferid_foreign` FOREIGN KEY (`bulkTransferId`) REFERENCES `bulkTransfer` (`bulktransferid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulkTransferFulfilmentDuplicateCheck`
--

DROP TABLE IF EXISTS `bulkTransferFulfilmentDuplicateCheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkTransferFulfilmentDuplicateCheck` (
  `bulkTransferFulfilmentId` varchar(36) NOT NULL,
  `bulkTransferId` varchar(36) NOT NULL,
  `hash` varchar(256) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bulkTransferFulfilmentId`),
  KEY `bulktransferfulfilmentduplicatecheck_bulktransferid_index` (`bulkTransferId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulkTransferState`
--

DROP TABLE IF EXISTS `bulkTransferState`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkTransferState` (
  `bulkTransferStateId` varchar(50) NOT NULL,
  `enumeration` varchar(50) NOT NULL COMMENT 'bulkTransferState associated to the Mojaloop API',
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bulkTransferStateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `bulkTransferStateChange`
--

DROP TABLE IF EXISTS `bulkTransferStateChange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `bulkTransferStateChange` (
  `bulkTransferStateChangeId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `bulkTransferId` varchar(36) NOT NULL,
  `bulkTransferStateId` varchar(50) NOT NULL,
  `reason` varchar(512) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bulkTransferStateChangeId`),
  KEY `bulktransferstatechange_bulktransferid_index` (`bulkTransferId`),
  KEY `bulktransferstatechange_bulktransferstateid_index` (`bulkTransferStateId`),
  CONSTRAINT `bulktransferstatechange_bulktransferid_foreign` FOREIGN KEY (`bulkTransferId`) REFERENCES `bulkTransfer` (`bulktransferid`),
  CONSTRAINT `bulktransferstatechange_bulktransferstateid_foreign` FOREIGN KEY (`bulkTransferStateId`) REFERENCES `bulkTransferState` (`bulktransferstateid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `contactType`
--

DROP TABLE IF EXISTS `contactType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `contactType` (
  `contactTypeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contactTypeId`),
  UNIQUE KEY `contacttype_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `currency`
--

DROP TABLE IF EXISTS `currency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `currency` (
  `currencyId` varchar(3) NOT NULL,
  `name` varchar(128) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`currencyId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `endpointType`
--

DROP TABLE IF EXISTS `endpointType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `endpointType` (
  `endpointTypeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`endpointTypeId`),
  UNIQUE KEY `endpointtype_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `event` (
  `eventId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`eventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ilpPacket`
--

DROP TABLE IF EXISTS `ilpPacket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ilpPacket` (
  `transferId` varchar(36) NOT NULL,
  `value` text NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferId`),
  CONSTRAINT `ilppacket_transferid_foreign` FOREIGN KEY (`transferId`) REFERENCES `transfer` (`transferid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ledgerAccountType`
--

DROP TABLE IF EXISTS `ledgerAccountType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ledgerAccountType` (
  `ledgerAccountTypeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ledgerAccountTypeId`),
  UNIQUE KEY `ledgeraccounttype_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ledgerEntryType`
--

DROP TABLE IF EXISTS `ledgerEntryType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ledgerEntryType` (
  `ledgerEntryTypeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ledgerEntryTypeId`),
  UNIQUE KEY `ledgerentrytype_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migration`
--

DROP TABLE IF EXISTS `migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `migration` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migration_lock`
--

DROP TABLE IF EXISTS `migration_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `migration_lock` (
  `index` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `is_locked` int(11) DEFAULT NULL,
  PRIMARY KEY (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participant`
--

DROP TABLE IF EXISTS `participant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participant` (
  `participantId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(128) NOT NULL,
  PRIMARY KEY (`participantId`),
  UNIQUE KEY `participant_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participantContact`
--

DROP TABLE IF EXISTS `participantContact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participantContact` (
  `participantContactId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `participantId` int(10) unsigned NOT NULL,
  `contactTypeId` int(10) unsigned NOT NULL,
  `value` varchar(256) NOT NULL,
  `priorityPreference` int(11) NOT NULL DEFAULT '9',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(128) NOT NULL,
  PRIMARY KEY (`participantContactId`),
  KEY `participantcontact_participantid_index` (`participantId`),
  KEY `participantcontact_contacttypeid_index` (`contactTypeId`),
  CONSTRAINT `participantcontact_contacttypeid_foreign` FOREIGN KEY (`contactTypeId`) REFERENCES `contactType` (`contacttypeid`),
  CONSTRAINT `participantcontact_participantid_foreign` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participantCurrency`
--

DROP TABLE IF EXISTS `participantCurrency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participantCurrency` (
  `participantCurrencyId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `participantId` int(10) unsigned NOT NULL,
  `currencyId` varchar(3) NOT NULL,
  `ledgerAccountTypeId` int(10) unsigned NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(128) NOT NULL,
  PRIMARY KEY (`participantCurrencyId`),
  UNIQUE KEY `participantcurrency_pcl_unique` (`participantId`,`currencyId`,`ledgerAccountTypeId`),
  KEY `participantcurrency_ledgeraccounttypeid_foreign` (`ledgerAccountTypeId`),
  KEY `participantcurrency_participantid_index` (`participantId`),
  KEY `participantcurrency_currencyid_index` (`currencyId`),
  CONSTRAINT `participantcurrency_currencyid_foreign` FOREIGN KEY (`currencyId`) REFERENCES `currency` (`currencyid`),
  CONSTRAINT `participantcurrency_ledgeraccounttypeid_foreign` FOREIGN KEY (`ledgerAccountTypeId`) REFERENCES `ledgerAccountType` (`ledgeraccounttypeid`),
  CONSTRAINT `participantcurrency_participantid_foreign` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participantEndpoint`
--

DROP TABLE IF EXISTS `participantEndpoint`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participantEndpoint` (
  `participantEndpointId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `participantId` int(10) unsigned NOT NULL,
  `endpointTypeId` int(10) unsigned NOT NULL,
  `value` varchar(512) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(128) NOT NULL,
  PRIMARY KEY (`participantEndpointId`),
  KEY `participantendpoint_participantid_index` (`participantId`),
  KEY `participantendpoint_endpointtypeid_index` (`endpointTypeId`),
  CONSTRAINT `participantendpoint_endpointtypeid_foreign` FOREIGN KEY (`endpointTypeId`) REFERENCES `endpointType` (`endpointtypeid`),
  CONSTRAINT `participantendpoint_participantid_foreign` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participantLimit`
--

DROP TABLE IF EXISTS `participantLimit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participantLimit` (
  `participantLimitId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `participantCurrencyId` int(10) unsigned NOT NULL,
  `participantLimitTypeId` int(10) unsigned NOT NULL,
  `value` decimal(18,2) NOT NULL DEFAULT '0.00',
  `thresholdAlarmPercentage` decimal(5,2) NOT NULL DEFAULT '10.00',
  `startAfterParticipantPositionChangeId` bigint(20) unsigned DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` varchar(128) NOT NULL,
  PRIMARY KEY (`participantLimitId`),
  KEY `participantlimit_participantcurrencyid_index` (`participantCurrencyId`),
  KEY `participantlimit_participantlimittypeid_index` (`participantLimitTypeId`),
  KEY `participantlimit_startafterparticipantpositionchangeid_index` (`startAfterParticipantPositionChangeId`),
  CONSTRAINT `participantlimit_participantcurrencyid_foreign` FOREIGN KEY (`participantCurrencyId`) REFERENCES `participantCurrency` (`participantcurrencyid`),
  CONSTRAINT `participantlimit_participantlimittypeid_foreign` FOREIGN KEY (`participantLimitTypeId`) REFERENCES `participantLimitType` (`participantlimittypeid`),
  CONSTRAINT `participantlimit_startafterparticipantpositionchangeid_foreign` FOREIGN KEY (`startAfterParticipantPositionChangeId`) REFERENCES `participantPositionChange` (`participantpositionchangeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participantLimitType`
--

DROP TABLE IF EXISTS `participantLimitType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participantLimitType` (
  `participantLimitTypeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`participantLimitTypeId`),
  UNIQUE KEY `participantlimittype_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participantParty`
--

DROP TABLE IF EXISTS `participantParty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participantParty` (
  `participantPartyId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `participantId` int(10) unsigned NOT NULL,
  `partyId` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`participantPartyId`),
  UNIQUE KEY `participantparty_participantid_partyid_unique` (`participantId`,`partyId`),
  KEY `participantparty_participantid_index` (`participantId`),
  CONSTRAINT `participantparty_participantid_foreign` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participantPosition`
--

DROP TABLE IF EXISTS `participantPosition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participantPosition` (
  `participantPositionId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `participantCurrencyId` int(10) unsigned NOT NULL,
  `value` decimal(18,2) NOT NULL,
  `reservedValue` decimal(18,2) NOT NULL,
  `changedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`participantPositionId`),
  KEY `participantposition_participantcurrencyid_index` (`participantCurrencyId`),
  CONSTRAINT `participantposition_participantcurrencyid_foreign` FOREIGN KEY (`participantCurrencyId`) REFERENCES `participantCurrency` (`participantcurrencyid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `participantPositionChange`
--

DROP TABLE IF EXISTS `participantPositionChange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `participantPositionChange` (
  `participantPositionChangeId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `participantPositionId` bigint(20) unsigned NOT NULL,
  `transferStateChangeId` bigint(20) unsigned NOT NULL,
  `value` decimal(18,2) NOT NULL,
  `reservedValue` decimal(18,2) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`participantPositionChangeId`),
  KEY `participantpositionchange_participantpositionid_index` (`participantPositionId`),
  KEY `participantpositionchange_transferstatechangeid_index` (`transferStateChangeId`),
  CONSTRAINT `participantpositionchange_participantpositionid_foreign` FOREIGN KEY (`participantPositionId`) REFERENCES `participantPosition` (`participantpositionid`),
  CONSTRAINT `participantpositionchange_transferstatechangeid_foreign` FOREIGN KEY (`transferStateChangeId`) REFERENCES `transferStateChange` (`transferstatechangeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `segment`
--

DROP TABLE IF EXISTS `segment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `segment` (
  `segmentId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `segmentType` varchar(50) NOT NULL,
  `enumeration` int(11) NOT NULL DEFAULT '0',
  `tableName` varchar(50) NOT NULL,
  `value` bigint(20) NOT NULL,
  `changedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`segmentId`),
  KEY `segment_keys_index` (`segmentType`,`enumeration`,`tableName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settlement`
--

DROP TABLE IF EXISTS `settlement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settlement` (
  `settlementId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `reason` varchar(512) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `currentStateChangeId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`settlementId`),
  KEY `settlement_currentstatechangeid_foreign` (`currentStateChangeId`),
  CONSTRAINT `settlement_currentstatechangeid_foreign` FOREIGN KEY (`currentStateChangeId`) REFERENCES `settlementStateChange` (`settlementstatechangeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settlementParticipantCurrency`
--

DROP TABLE IF EXISTS `settlementParticipantCurrency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settlementParticipantCurrency` (
  `settlementParticipantCurrencyId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `settlementId` bigint(20) unsigned NOT NULL,
  `participantCurrencyId` int(10) unsigned NOT NULL,
  `netAmount` decimal(18,2) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `currentStateChangeId` bigint(20) unsigned DEFAULT NULL,
  `settlementTransferId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`settlementParticipantCurrencyId`),
  KEY `settlementparticipantcurrency_settlementid_index` (`settlementId`),
  KEY `settlementparticipantcurrency_participantcurrencyid_index` (`participantCurrencyId`),
  KEY `settlementparticipantcurrency_settlementtransferid_index` (`settlementTransferId`),
  KEY `spc_currentstatechangeid_foreign` (`currentStateChangeId`),
  CONSTRAINT `settlementparticipantcurrency_participantcurrencyid_foreign` FOREIGN KEY (`participantCurrencyId`) REFERENCES `participantCurrency` (`participantcurrencyid`),
  CONSTRAINT `settlementparticipantcurrency_settlementid_foreign` FOREIGN KEY (`settlementId`) REFERENCES `settlement` (`settlementid`),
  CONSTRAINT `spc_currentstatechangeid_foreign` FOREIGN KEY (`currentStateChangeId`) REFERENCES `settlementParticipantCurrencyStateChange` (`settlementparticipantcurrencystatechangeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settlementParticipantCurrencyStateChange`
--

DROP TABLE IF EXISTS `settlementParticipantCurrencyStateChange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settlementParticipantCurrencyStateChange` (
  `settlementParticipantCurrencyStateChangeId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `settlementParticipantCurrencyId` bigint(20) unsigned NOT NULL,
  `settlementStateId` varchar(50) NOT NULL,
  `reason` varchar(512) DEFAULT NULL,
  `externalReference` varchar(50) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`settlementParticipantCurrencyStateChangeId`),
  KEY `spcsc_settlementparticipantcurrencyid_index` (`settlementParticipantCurrencyId`),
  KEY `spcsc_settlementstateid_index` (`settlementStateId`),
  CONSTRAINT `spcsc_settlementparticipantcurrencyid_foreign` FOREIGN KEY (`settlementParticipantCurrencyId`) REFERENCES `settlementParticipantCurrency` (`settlementparticipantcurrencyid`),
  CONSTRAINT `spcsc_settlementstateid_foreign` FOREIGN KEY (`settlementStateId`) REFERENCES `settlementState` (`settlementstateid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settlementSettlementWindow`
--

DROP TABLE IF EXISTS `settlementSettlementWindow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settlementSettlementWindow` (
  `settlementSettlementWindowId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `settlementId` bigint(20) unsigned NOT NULL,
  `settlementWindowId` bigint(20) unsigned NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`settlementSettlementWindowId`),
  UNIQUE KEY `settlementsettlementwindow_unique` (`settlementId`,`settlementWindowId`),
  KEY `settlementsettlementwindow_settlementid_index` (`settlementId`),
  KEY `settlementsettlementwindow_settlementwindowid_index` (`settlementWindowId`),
  CONSTRAINT `settlementsettlementwindow_settlementid_foreign` FOREIGN KEY (`settlementId`) REFERENCES `settlement` (`settlementid`),
  CONSTRAINT `settlementsettlementwindow_settlementwindowid_foreign` FOREIGN KEY (`settlementWindowId`) REFERENCES `settlementWindow` (`settlementwindowid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settlementState`
--

DROP TABLE IF EXISTS `settlementState`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settlementState` (
  `settlementStateId` varchar(50) NOT NULL,
  `enumeration` varchar(50) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`settlementStateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settlementStateChange`
--

DROP TABLE IF EXISTS `settlementStateChange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settlementStateChange` (
  `settlementStateChangeId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `settlementId` bigint(20) unsigned NOT NULL,
  `settlementStateId` varchar(50) NOT NULL,
  `reason` varchar(512) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`settlementStateChangeId`),
  KEY `settlementstatechange_settlementid_index` (`settlementId`),
  KEY `settlementstatechange_settlementstateid_index` (`settlementStateId`),
  CONSTRAINT `settlementstatechange_settlementid_foreign` FOREIGN KEY (`settlementId`) REFERENCES `settlement` (`settlementid`),
  CONSTRAINT `settlementstatechange_settlementstateid_foreign` FOREIGN KEY (`settlementStateId`) REFERENCES `settlementState` (`settlementstateid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settlementTransferParticipant`
--

DROP TABLE IF EXISTS `settlementTransferParticipant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settlementTransferParticipant` (
  `settlementTransferParticipantId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `settlementId` bigint(20) unsigned NOT NULL,
  `settlementWindowId` bigint(20) unsigned NOT NULL,
  `participantCurrencyId` int(10) unsigned NOT NULL,
  `transferParticipantRoleTypeId` int(10) unsigned NOT NULL,
  `ledgerEntryTypeId` int(10) unsigned NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`settlementTransferParticipantId`),
  KEY `settlementtransferparticipant_settlementid_index` (`settlementId`),
  KEY `settlementtransferparticipant_settlementwindowid_index` (`settlementWindowId`),
  KEY `settlementtransferparticipant_participantcurrencyid_index` (`participantCurrencyId`),
  KEY `stp_transferparticipantroletypeid_index` (`transferParticipantRoleTypeId`),
  KEY `settlementtransferparticipant_ledgerentrytypeid_index` (`ledgerEntryTypeId`),
  CONSTRAINT `settlementtransferparticipant_ledgerentrytypeid_foreign` FOREIGN KEY (`ledgerEntryTypeId`) REFERENCES `ledgerEntryType` (`ledgerentrytypeid`),
  CONSTRAINT `settlementtransferparticipant_participantcurrencyid_foreign` FOREIGN KEY (`participantCurrencyId`) REFERENCES `participantCurrency` (`participantcurrencyid`),
  CONSTRAINT `settlementtransferparticipant_settlementid_foreign` FOREIGN KEY (`settlementId`) REFERENCES `settlement` (`settlementid`),
  CONSTRAINT `settlementtransferparticipant_settlementwindowid_foreign` FOREIGN KEY (`settlementWindowId`) REFERENCES `settlementWindow` (`settlementwindowid`),
  CONSTRAINT `stp_transferparticipantroletypeid_foreign` FOREIGN KEY (`transferParticipantRoleTypeId`) REFERENCES `transferParticipantRoleType` (`transferparticipantroletypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settlementWindow`
--

DROP TABLE IF EXISTS `settlementWindow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settlementWindow` (
  `settlementWindowId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `reason` varchar(512) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `currentStateChangeId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`settlementWindowId`),
  KEY `settlementwindow_currentstatechangeid_foreign` (`currentStateChangeId`),
  CONSTRAINT `settlementwindow_currentstatechangeid_foreign` FOREIGN KEY (`currentStateChangeId`) REFERENCES `settlementWindowStateChange` (`settlementwindowstatechangeid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settlementWindowState`
--

DROP TABLE IF EXISTS `settlementWindowState`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settlementWindowState` (
  `settlementWindowStateId` varchar(50) NOT NULL,
  `enumeration` varchar(50) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`settlementWindowStateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `settlementWindowStateChange`
--

DROP TABLE IF EXISTS `settlementWindowStateChange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `settlementWindowStateChange` (
  `settlementWindowStateChangeId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `settlementWindowId` bigint(20) unsigned NOT NULL,
  `settlementWindowStateId` varchar(50) NOT NULL,
  `reason` varchar(512) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`settlementWindowStateChangeId`),
  KEY `settlementwindowstatechange_settlementwindowid_index` (`settlementWindowId`),
  KEY `settlementwindowstatechange_settlementwindowstateid_index` (`settlementWindowStateId`),
  CONSTRAINT `settlementwindowstatechange_settlementwindowid_foreign` FOREIGN KEY (`settlementWindowId`) REFERENCES `settlementWindow` (`settlementwindowid`),
  CONSTRAINT `settlementwindowstatechange_settlementwindowstateid_foreign` FOREIGN KEY (`settlementWindowStateId`) REFERENCES `settlementWindowState` (`settlementwindowstateid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `token` (
  `tokenId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `participantId` int(10) unsigned NOT NULL,
  `value` varchar(256) NOT NULL,
  `expiration` bigint(20) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`tokenId`),
  UNIQUE KEY `token_value_unique` (`value`),
  KEY `token_participantid_index` (`participantId`),
  CONSTRAINT `token_participantid_foreign` FOREIGN KEY (`participantId`) REFERENCES `participant` (`participantid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transfer`
--

DROP TABLE IF EXISTS `transfer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transfer` (
  `transferId` varchar(36) NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `currencyId` varchar(3) NOT NULL,
  `ilpCondition` varchar(256) NOT NULL,
  `expirationDate` datetime NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferId`),
  KEY `transfer_currencyid_index` (`currencyId`),
  CONSTRAINT `transfer_currencyid_foreign` FOREIGN KEY (`currencyId`) REFERENCES `currency` (`currencyid`),
  CONSTRAINT `transfer_transferid_foreign` FOREIGN KEY (`transferId`) REFERENCES `transferDuplicateCheck` (`transferid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferDuplicateCheck`
--

DROP TABLE IF EXISTS `transferDuplicateCheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferDuplicateCheck` (
  `transferId` varchar(36) NOT NULL,
  `hash` varchar(256) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferError`
--

DROP TABLE IF EXISTS `transferError`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferError` (
  `transferErrorId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `transferStateChangeId` bigint(20) unsigned NOT NULL,
  `errorCode` int(10) unsigned NOT NULL,
  `errorDescription` varchar(128) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transferErrorDuplicateCheckId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`transferErrorId`),
  KEY `transfererror_transferstatechangeid_index` (`transferStateChangeId`),
  KEY `transfererror_transfererrorduplicatecheckid_index` (`transferErrorDuplicateCheckId`),
  CONSTRAINT `transfererror_transfererrorduplicatecheckid_foreign` FOREIGN KEY (`transferErrorDuplicateCheckId`) REFERENCES `transferErrorDuplicateCheck` (`transfererrorduplicatecheckid`),
  CONSTRAINT `transfererror_transferstatechangeid_foreign` FOREIGN KEY (`transferStateChangeId`) REFERENCES `transferStateChange` (`transferstatechangeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferErrorDuplicateCheck`
--

DROP TABLE IF EXISTS `transferErrorDuplicateCheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferErrorDuplicateCheck` (
  `transferErrorDuplicateCheckId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `transferId` varchar(36) NOT NULL,
  `hash` varchar(256) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferErrorDuplicateCheckId`),
  KEY `transfererrorduplicatecheck_transferid_index` (`transferId`),
  CONSTRAINT `transfererrorduplicatecheck_transferid_foreign` FOREIGN KEY (`transferId`) REFERENCES `transfer` (`transferid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferExtension`
--

DROP TABLE IF EXISTS `transferExtension`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferExtension` (
  `transferExtensionId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `transferId` varchar(36) NOT NULL,
  `transferFulfilmentId` varchar(36) DEFAULT NULL,
  `key` varchar(128) NOT NULL,
  `value` text NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transferErrorId` bigint(20) unsigned DEFAULT NULL,
  PRIMARY KEY (`transferExtensionId`),
  KEY `transferextension_transferid_index` (`transferId`),
  KEY `transferextension_transferfulfilmentid_index` (`transferFulfilmentId`),
  KEY `transferextension_transfererrorid_foreign` (`transferErrorId`),
  CONSTRAINT `transferextension_transfererrorid_foreign` FOREIGN KEY (`transferErrorId`) REFERENCES `transferError` (`transfererrorid`),
  CONSTRAINT `transferextension_transferfulfilmentid_foreign` FOREIGN KEY (`transferFulfilmentId`) REFERENCES `transferFulfilment` (`transferfulfilmentid`),
  CONSTRAINT `transferextension_transferid_foreign` FOREIGN KEY (`transferId`) REFERENCES `transfer` (`transferid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferFulfilment`
--

DROP TABLE IF EXISTS `transferFulfilment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferFulfilment` (
  `transferFulfilmentId` varchar(36) NOT NULL,
  `transferId` varchar(36) NOT NULL,
  `ilpFulfilment` varchar(256) DEFAULT NULL,
  `completedDate` datetime NOT NULL,
  `isValid` tinyint(1) DEFAULT NULL,
  `settlementWindowId` bigint(20) unsigned DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferFulfilmentId`),
  UNIQUE KEY `transferfulfilment_transferid_ilpfulfilment_unique` (`transferId`,`ilpFulfilment`),
  KEY `transferfulfilment_transferid_index` (`transferId`),
  KEY `transferfulfilment_settlementwindowid_index` (`settlementWindowId`),
  CONSTRAINT `transferfulfilment_settlementwindowid_foreign` FOREIGN KEY (`settlementWindowId`) REFERENCES `settlementWindow` (`settlementwindowid`),
  CONSTRAINT `transferfulfilment_transferfulfilmentid_foreign` FOREIGN KEY (`transferFulfilmentId`) REFERENCES `transferFulfilmentDuplicateCheck` (`transferfulfilmentid`),
  CONSTRAINT `transferfulfilment_transferid_foreign` FOREIGN KEY (`transferId`) REFERENCES `transfer` (`transferid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferFulfilmentDuplicateCheck`
--

DROP TABLE IF EXISTS `transferFulfilmentDuplicateCheck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferFulfilmentDuplicateCheck` (
  `transferFulfilmentId` varchar(36) NOT NULL,
  `transferId` varchar(36) NOT NULL,
  `hash` varchar(256) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferFulfilmentId`),
  UNIQUE KEY `tfdc_transferfulfilmentid_hash_unique` (`transferFulfilmentId`,`hash`),
  KEY `transferfulfilmentduplicatecheck_transferid_index` (`transferId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferParticipant`
--

DROP TABLE IF EXISTS `transferParticipant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferParticipant` (
  `transferParticipantId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `transferId` varchar(36) NOT NULL,
  `participantCurrencyId` int(10) unsigned NOT NULL,
  `transferParticipantRoleTypeId` int(10) unsigned NOT NULL,
  `ledgerEntryTypeId` int(10) unsigned NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferParticipantId`),
  KEY `transferparticipant_transferid_index` (`transferId`),
  KEY `transferparticipant_participantcurrencyid_index` (`participantCurrencyId`),
  KEY `transferparticipant_transferparticipantroletypeid_index` (`transferParticipantRoleTypeId`),
  KEY `transferparticipant_ledgerentrytypeid_index` (`ledgerEntryTypeId`),
  CONSTRAINT `transferparticipant_ledgerentrytypeid_foreign` FOREIGN KEY (`ledgerEntryTypeId`) REFERENCES `ledgerEntryType` (`ledgerentrytypeid`),
  CONSTRAINT `transferparticipant_participantcurrencyid_foreign` FOREIGN KEY (`participantCurrencyId`) REFERENCES `participantCurrency` (`participantcurrencyid`),
  CONSTRAINT `transferparticipant_transferid_foreign` FOREIGN KEY (`transferId`) REFERENCES `transfer` (`transferid`),
  CONSTRAINT `transferparticipant_transferparticipantroletypeid_foreign` FOREIGN KEY (`transferParticipantRoleTypeId`) REFERENCES `transferParticipantRoleType` (`transferparticipantroletypeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferParticipantRoleType`
--

DROP TABLE IF EXISTS `transferParticipantRoleType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferParticipantRoleType` (
  `transferParticipantRoleTypeId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferParticipantRoleTypeId`),
  UNIQUE KEY `transferparticipantroletype_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferState`
--

DROP TABLE IF EXISTS `transferState`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferState` (
  `transferStateId` varchar(50) NOT NULL,
  `enumeration` varchar(50) NOT NULL COMMENT 'transferState associated to the Mojaloop API',
  `description` varchar(512) DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferStateId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferStateChange`
--

DROP TABLE IF EXISTS `transferStateChange`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferStateChange` (
  `transferStateChangeId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `transferId` varchar(36) NOT NULL,
  `transferStateId` varchar(50) NOT NULL,
  `reason` varchar(512) DEFAULT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferStateChangeId`),
  KEY `transferstatechange_transferid_index` (`transferId`),
  KEY `transferstatechange_transferstateid_index` (`transferStateId`),
  CONSTRAINT `transferstatechange_transferid_foreign` FOREIGN KEY (`transferId`) REFERENCES `transfer` (`transferid`),
  CONSTRAINT `transferstatechange_transferstateid_foreign` FOREIGN KEY (`transferStateId`) REFERENCES `transferState` (`transferstateid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `transferTimeout`
--

DROP TABLE IF EXISTS `transferTimeout`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `transferTimeout` (
  `transferTimeoutId` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `transferId` varchar(36) NOT NULL,
  `expirationDate` datetime NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`transferTimeoutId`),
  UNIQUE KEY `transfertimeout_transferid_unique` (`transferId`),
  CONSTRAINT `transfertimeout_transferid_foreign` FOREIGN KEY (`transferId`) REFERENCES `transfer` (`transferid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-10  1:28:34

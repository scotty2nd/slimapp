-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Erstellungszeit: 21. Jan 2017 um 18:36
-- Server-Version: 5.5.42
-- PHP-Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `slimapp`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `api_key` varchar(100) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `customers`
--

INSERT INTO `customers` (`id`, `first_name`, `last_name`, `phone`, `email`, `address`, `city`, `state`, `api_key`) VALUES
(2, 'Sam', 'Smith', '333-333-3333', 'ssmith@yahoo.com', '33 Birch Rd', 'Miami', 'FL', ''),
(3, 'Brad', 'Traversy', '333-333-3333', 'brad@test.com', '333 South st', 'Portland', 'ME', ''),
(33, 'Username', 'asd', '12', 'Test1234@aol.de', 'Test Streert', 'Testtown', 'BZW', ''),
(56, 'username', 'lastname', 'phone', 'Test1234@aol.de', 'Test Streert', 'Testtown', 'BZW', ''),
(57, 'as', 'as', 'as', 'Test1234@aol.de', 'Test Streert', 'Testtown', 'BZW', ''),
(58, 'username', 'lastname', 'phone', 'Test1234@aol.de', 'Test Streert', 'Testtown', 'BZW', ''),
(59, 'username6', 'lastname', 'phone', 'Test1234@aol.de', 'Test Streert', 'Testtown', 'BZW', ''),
(60, 'username7', 'lastname', 'phone', 'Test1234@aol.de', 'Test Streert', 'Testtown', 'BZW', ''),
(61, 'username7', 'lastname', 'phone', 'Test1234@aol.de', 'Test Streert', 'Testtown', '', ''),
(62, 'username8', 'lastname', 'phone', 'user8@aol.de', 'Test Streert', 'Testtown', 'BZW', ''),
(63, 'username9', 'lastname', 'phone', 'user9@aol.de', 'Test Streert', 'Testtown', 'BZW', '');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=64;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

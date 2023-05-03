-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: db:3306
-- Generation Time: 20. Apr, 2023 07:07 AM
-- Tjener-versjon: 8.0.33
-- PHP Version: 8.1.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_db`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `catalog`
--

CREATE TABLE `catalog` (
  `productID` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(1023) NOT NULL,
  `category` varchar(255) NOT NULL,
  `subcategory` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dataark for tabell `catalog`
--

INSERT INTO `catalog` (`productID`, `name`, `description`, `category`, `subcategory`) VALUES
(1, '10 Ω Motstander', 'Motstand, også kalt resistor, er en topolet, passiv elektronisk komponent som brukes for å etablere en resistans (elektrisk motstand) i en elektrisk krets.', 'Komponenter', 'Motstander'),
(2, '20 Ω Motstander', 'Motstand, også kalt resistor, er en topolet, passiv elektronisk komponent som brukes for å etablere en resistans (elektrisk motstand) i en elektrisk krets.', 'Komponenter', 'Motstander'),
(3, 'Servoer', 'Servomotor er en elektrisk, hydraulisk eller pneumatisk motor som driver utstyr som skal følge en annen bevegelse, et hjelpeaggregat som forsterker utgangssignalet fra en regulator. Den muliggjør regulering av lineær eller angulær posisjon, hastighet og akselerasjon.', 'Komponenter', 'Motorer'),
(4, 'Kondensatorer', 'Kondensator er en passiv, elektrisk komponent som består av to ledere med en isolator mellom. En kondensator har kapasitans, det vil si evne til å oppta ladning og å lagre elektrisk energi i et elektrisk felt.', 'Komponenter', 'Kondensatorer'),
(5, 'BC547 NPN Transistor', 'Halvleder komponent som ofte brukes som en bryter. ', 'Komponenter', 'Transistorer');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `containers`
--

CREATE TABLE `containers` (
  `binID` int NOT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `productID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dataark for tabell `containers`
--

INSERT INTO `containers` (`binID`, `code`, `productID`) VALUES
(1, 'EC1', 1),
(2, 'F3A', 2),
(3, 'E4B', 5);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `inventory`
--

CREATE TABLE `inventory` (
  `binID` int NOT NULL,
  `position` int NOT NULL,
  `lastupdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dataark for tabell `inventory`
--

INSERT INTO `inventory` (`binID`, `position`, `lastupdate`) VALUES
(3, 12, '2023-04-20 07:02:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `catalog`
--
ALTER TABLE `catalog`
  ADD PRIMARY KEY (`productID`);

--
-- Indexes for table `containers`
--
ALTER TABLE `containers`
  ADD PRIMARY KEY (`binID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `catalog`
--
ALTER TABLE `catalog`
  MODIFY `productID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `containers`
--
ALTER TABLE `containers`
  MODIFY `binID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ott 16, 2017 alle 22:57
-- Versione del server: 10.1.26-MariaDB
-- Versione PHP: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `preventivi_aziendali`
--
CREATE DATABASE preventivi_aziendali;

USE preventivi_aziendali;
-- --------------------------------------------------------

--
-- Struttura della tabella `accessori`
--

CREATE TABLE `accessori` (
  `Codice` varchar(255) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Descrizione` varchar(255) NOT NULL,
  `Prezzo_acquisto` decimal(60,2) NOT NULL,
  `Prezzo_listino` decimal(60,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `accessori`
--

INSERT INTO `accessori` (`Codice`, `Nome`, `Descrizione`, `Prezzo_acquisto`, `Prezzo_listino`) VALUES
('AS554', 'PICK-PC', 'Terminale di lettura Badge prelievi da banco PICK con USB - display - alimentazione 220V (senza lettore BADGE)', '550.00', '635.00'),
('L520K', 'INTERNET KEY MA-260', 'Chiavetta internet MA260 (tutti gli operatori) - senza SIM ', '30.00', '70.00'),
('N555S', 'WIRELESS', 'Modulo wireless LAN10/100 WI-FI per rilevazione/trasmissione dati', '115.00', '130.00'),
('NBGR9', 'ROUTER 3G WI-FI QUADRI ', 'Router 3G LAN10/100 WI-FI (gestisce fino 4 MasterBOX)', '90.00', '142.00'),
('NVVC0', 'BLUETOOTH', 'Modulo BLUETOOTH LAN10/100 per rilevazione/trasmissione dati', '90.00', '148.00'),
('PO810', 'USB dataKEY', 'Chiave USB per prelievo dati di vendita e/o transazioni', '5.00', '20.00'),
('T02FG', 'ROUTER 3G MONO', 'Router 3G LAN10/100 WI-FI (gestisce 1 MasterBOX)', '75.00', '75.00'),
('Z88AS', 'GPRS', 'Modulo GPRS con antenna magnetica (escluso SIM)', '200.00', '270.00');

-- --------------------------------------------------------

--
-- Struttura della tabella `distributori`
--

CREATE TABLE `distributori` (
  `Codice` varchar(255) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Descrizione` varchar(255) NOT NULL,
  `Prezzo_acquisto` decimal(60,2) NOT NULL,
  `Prezzo_listino` decimal(60,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `distributori`
--

INSERT INTO `distributori` (`Codice`, `Nome`, `Descrizione`, `Prezzo_acquisto`, `Prezzo_listino`) VALUES
('A', 'FESTIVAL DPI 40S', 'DPI - 40 tipologie di articoli ', '8000.00', '8250.00'),
('B', 'FESTIVAL TOOL 360S', 'TOOL - 360 tipologie di articoli ', '10000.00', '10240.00'),
('C', 'FESTIVAL MEAL', 'MEAL - 60 Coperti', '10000.00', '10300.00'),
('D', 'FESTIVAL GREEN 40S', 'DPI - 40 tipologie di articoli', '6400.00', '6750.00'),
('E', 'TANGO DPI', 'DPI - 50 selezioni ', '5500.00', '5750.00'),
('F', 'SMART DPI USATO', 'DPI - 10 tipologie di articoli ', '5000.00', '5550.00'),
('null', 'NESSUN DISTRIBUTORE', 'null', '0.00', '0.00');

-- --------------------------------------------------------

--
-- Struttura della tabella `licenze`
--

CREATE TABLE `licenze` (
  `Codice` varchar(255) NOT NULL,
  `Tipologia` varchar(255) NOT NULL,
  `Descrizione` varchar(255) NOT NULL,
  `Prezzo_acquisto` decimal(60,2) NOT NULL,
  `Prezzo_listino` decimal(60,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `licenze`
--

INSERT INTO `licenze` (`Codice`, `Tipologia`, `Descrizione`, `Prezzo_acquisto`, `Prezzo_listino`) VALUES
('B71QP', 'Licenza mensile terminal Server FOR-GREEN', 'Costo mensile licenza FOR-GREEN - WEB-SERVER', '250.00', '300.00'),
('CR331', 'Licenza annua per PDP (FTP)', 'Costo annuale per singolo PUNTO DI PRELIEVO', '375.00', '400.00'),
('FFF80', 'Licenza annuale Software PROFESSIONAL', 'Costo annuale licenza software FOR-SAFE PROFESSIONAL (1 ANNO GRATIS)', '75.00', '125.00'),
('K667A', 'Licenza mensile terminal Server FOR-SAFE', 'Costo mensile licenza FOR-SAFE - WEB-SERVER', '139.00', '200.00'),
('VV20K', 'Licenza annua FOR-TOOL', 'Costo annuale licenza software FOR-TOOL', '60.00', '70.00'),
('YH330P', 'Licenza terminal Server gestione fino a 15db con 15 accessi Desktop Remoto', '15 Call contemporanee su 15db', '100.00', '140.00'),
('YH61N0', 'Licenza terminal Server gestione fino a 5db con 5 accessi Desktop Remoto', '5 Call contemporanee su 5db', '400.00', '400.00');

-- --------------------------------------------------------

--
-- Struttura della tabella `preventivi`
--

CREATE TABLE `preventivi` (
  `Codice` varchar(255) NOT NULL,
  `Data` date NOT NULL,
  `Totale` decimal(60,3) NOT NULL,
  `Ricavo_totale` decimal(60,3) NOT NULL,
  `Ricavo_totale_percentuale` decimal(60,3) NOT NULL,
  `Note` varchar(255) DEFAULT NULL,
  `Codice_distributore` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `preventivi_accessori`
--

CREATE TABLE `preventivi_accessori` (
  `Codice_preventivo` varchar(255) NOT NULL,
  `Codice_accessorio` varchar(255) NOT NULL,
  `Sconto` int(2) NOT NULL,
  `Prezzo_scontato` decimal(60,2) NOT NULL,
  `Ricavo` decimal(60,3) NOT NULL,
  `Ricavo_percentuale` decimal(60,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `preventivi_licenze`
--

CREATE TABLE `preventivi_licenze` (
  `Codice_preventivo` varchar(255) NOT NULL,
  `Codice_licenza` varchar(255) NOT NULL,
  `Sconto` int(2) DEFAULT NULL,
  `Prezzo_scontato` decimal(60,2) NOT NULL,
  `Ricavo` decimal(60,3) NOT NULL,
  `Ricavo_percentuale` decimal(60,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `preventivi_servizi`
--

CREATE TABLE `preventivi_servizi` (
  `Codice_preventivo` varchar(255) NOT NULL,
  `Codice_servizio` varchar(255) NOT NULL,
  `Sconto` int(2) DEFAULT NULL,
  `Prezzo_scontato` decimal(60,2) NOT NULL,
  `Ricavo` decimal(60,3) NOT NULL,
  `Ricavo_percentuale` decimal(60,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `preventivi_software`
--

CREATE TABLE `preventivi_software` (
  `Codice_preventivo` varchar(255) NOT NULL,
  `Codice_software` varchar(255) NOT NULL,
  `Sconto` int(2) DEFAULT NULL,
  `Prezzo_scontato` decimal(60,2) NOT NULL,
  `Ricavo` decimal(60,3) NOT NULL,
  `Ricavo_percentuale` decimal(60,3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struttura della tabella `servizi`
--

CREATE TABLE `servizi` (
  `Codice` varchar(255) NOT NULL,
  `Tipologia` varchar(255) NOT NULL,
  `Descrizione` varchar(255) NOT NULL,
  `Prezzo_acquisto` decimal(60,2) NOT NULL,
  `Prezzo_listino` decimal(60,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `servizi`
--

INSERT INTO `servizi` (`Codice`, `Tipologia`, `Descrizione`, `Prezzo_acquisto`, `Prezzo_listino`) VALUES
('AA870', 'INSTALLAZIONE SOFTWARE (WEB-SERVER)', 'Installazione software FOR-SAFE in ambiente WEB-SERVER ', '50.00', '50.00'),
('DD00R', 'MANUTENZIONE PROGRAMMATA (costo\r\nmensile) ', 'Programma di manutenzione 3 passaggi/anno + 2 \'a chiamata\' ', '30.00', '60.00'),
('ZX45E', 'INSTALLAZIONE \'ON-SITE\'', 'Installazione software FOR-SAFE presso sede Cliente (vedasi preventivo)', '120.00', '140.00');

-- --------------------------------------------------------

--
-- Struttura della tabella `software`
--

CREATE TABLE `software` (
  `Codice` varchar(255) NOT NULL,
  `Tipologia` varchar(255) NOT NULL,
  `Descrizione` varchar(255) NOT NULL,
  `Prezzo_acquisto` decimal(60,2) NOT NULL,
  `Prezzo_listino` decimal(60,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dump dei dati per la tabella `software`
--

INSERT INTO `software` (`Codice`, `Tipologia`, `Descrizione`, `Prezzo_acquisto`, `Prezzo_listino`) VALUES
('LL687', 'FOR-TOOL - Master ', 'Gestionale di magazzino per erogazione e reverse vending di TOOL ', '800.00', '1200.00'),
('LM00D', 'FOR-GREEN - Master', 'Gestionale di magazzino per erogazione di prodotti ECOLOGICI ', '1800.00', '2000.00'),
('MB50A', 'FOR-MEAL - Master', 'Software gestionale per prenotazione e vendite di PASTI ', '1500.00', '1900.00'),
('MMN98', 'FOR-SAFE - Maste', 'Gestionale di magazzino per erogazione di dispositivi DPI', '1650.00', '2050.00');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `Codice` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Indirizzo` varchar(255) NOT NULL,
  `Partita_iva` int(11) NOT NULL,
  `Codice_fiscale` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `accessori`
--
ALTER TABLE `accessori`
  ADD PRIMARY KEY (`Codice`);

--
-- Indici per le tabelle `distributori`
--
ALTER TABLE `distributori`
  ADD PRIMARY KEY (`Codice`);

--
-- Indici per le tabelle `licenze`
--
ALTER TABLE `licenze`
  ADD PRIMARY KEY (`Codice`);

--
-- Indici per le tabelle `preventivi`
--
ALTER TABLE `preventivi`
  ADD PRIMARY KEY (`Codice`),
  ADD KEY `Cod_Distributore` (`Codice_distributore`);

--
-- Indici per le tabelle `preventivi_accessori`
--
ALTER TABLE `preventivi_accessori`
  ADD KEY `Codice_preventivo` (`Codice_preventivo`) USING BTREE,
  ADD KEY `Codice_accessorio` (`Codice_accessorio`) USING BTREE;

--
-- Indici per le tabelle `preventivi_licenze`
--
ALTER TABLE `preventivi_licenze`
  ADD KEY `Codice_preventivo` (`Codice_preventivo`),
  ADD KEY `Codice_licenza` (`Codice_licenza`);

--
-- Indici per le tabelle `preventivi_servizi`
--
ALTER TABLE `preventivi_servizi`
  ADD KEY `Codice_preventivo` (`Codice_preventivo`),
  ADD KEY `Codice_servizio` (`Codice_servizio`);

--
-- Indici per le tabelle `preventivi_software`
--
ALTER TABLE `preventivi_software`
  ADD KEY `Codice_preventivo` (`Codice_preventivo`),
  ADD KEY `Codice_software` (`Codice_software`);

--
-- Indici per le tabelle `servizi`
--
ALTER TABLE `servizi`
  ADD PRIMARY KEY (`Codice`);

--
-- Indici per le tabelle `software`
--
ALTER TABLE `software`
  ADD PRIMARY KEY (`Codice`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`Codice`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `Codice` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `preventivi`
--
ALTER TABLE `preventivi`
  ADD CONSTRAINT `preventivi_ibfk_1` FOREIGN KEY (`Codice_distributore`) REFERENCES `distributori` (`Codice`);

--
-- Limiti per la tabella `preventivi_accessori`
--
ALTER TABLE `preventivi_accessori`
  ADD CONSTRAINT `preventivi_accessori_ibfk_1` FOREIGN KEY (`Codice_preventivo`) REFERENCES `preventivi` (`Codice`),
  ADD CONSTRAINT `preventivi_accessori_ibfk_2` FOREIGN KEY (`Codice_accessorio`) REFERENCES `accessori` (`Codice`);

--
-- Limiti per la tabella `preventivi_licenze`
--
ALTER TABLE `preventivi_licenze`
  ADD CONSTRAINT `preventivi_licenze_ibfk_1` FOREIGN KEY (`Codice_preventivo`) REFERENCES `preventivi` (`Codice`),
  ADD CONSTRAINT `preventivi_licenze_ibfk_2` FOREIGN KEY (`Codice_licenza`) REFERENCES `licenze` (`Codice`);

--
-- Limiti per la tabella `preventivi_servizi`
--
ALTER TABLE `preventivi_servizi`
  ADD CONSTRAINT `preventivi_servizi_ibfk_1` FOREIGN KEY (`Codice_preventivo`) REFERENCES `preventivi` (`Codice`),
  ADD CONSTRAINT `preventivi_servizi_ibfk_2` FOREIGN KEY (`Codice_servizio`) REFERENCES `servizi` (`Codice`);

--
-- Limiti per la tabella `preventivi_software`
--
ALTER TABLE `preventivi_software`
  ADD CONSTRAINT `preventivi_software_ibfk_1` FOREIGN KEY (`Codice_preventivo`) REFERENCES `preventivi` (`Codice`),
  ADD CONSTRAINT `preventivi_software_ibfk_2` FOREIGN KEY (`Codice_software`) REFERENCES `software` (`Codice`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

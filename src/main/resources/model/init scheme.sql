-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema todolist
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `todolist` ;

-- -----------------------------------------------------
-- Schema todolist
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `todolist` DEFAULT CHARACTER SET utf8 ;
USE `todolist` ;

-- -----------------------------------------------------
-- Table `todolist`.`lists`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `todolist`.`lists` ;

CREATE TABLE IF NOT EXISTS `todolist`.`lists` (
  `idlist` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(1024) NULL,
  PRIMARY KEY (`idlist`),
  UNIQUE INDEX `idlist_UNIQUE` (`idlist` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todolist`.`cards`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `todolist`.`cards` ;

CREATE TABLE IF NOT EXISTS `todolist`.`cards` (
  `idcard` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` MEDIUMTEXT NOT NULL,
  `description` MEDIUMTEXT NULL,
  `order_in_list` INT UNSIGNED NOT NULL,
  `list` BIGINT UNSIGNED NULL,
  PRIMARY KEY (`idcard`),
  INDEX `list_idx` (`list` ASC) VISIBLE,
  UNIQUE INDEX `unique_list` (`list` ASC, `order_in_list` ASC) VISIBLE,
  CONSTRAINT `list`
    FOREIGN KEY (`list`)
    REFERENCES `todolist`.`lists` (`idlist`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS todoapp;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'todoapp' IDENTIFIED BY 'password';

GRANT ALL ON `todolist`.* TO 'todoapp';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

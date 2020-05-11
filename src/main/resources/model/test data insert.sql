-- -----------------------------------------------------
-- Data for table `todolist`.`cards`
-- -----------------------------------------------------
START TRANSACTION;
USE `todolist`;
INSERT INTO `todolist`.`cards` (`idcard`, `name`, `description`, `order`, `list`) VALUES (DEFAULT, 'buy bread', 'white', 0, 1);
INSERT INTO `todolist`.`cards` (`idcard`, `name`, `description`, `order`, `list`) VALUES (DEFAULT, 'buy milk', 'cow milk', 1, 1);
INSERT INTO `todolist`.`cards` (`idcard`, `name`, `description`, `order`, `list`) VALUES (DEFAULT, 'alarm at 8:00', 'tomorrow', 0, 2);

COMMIT;

-- -----------------------------------------------------
-- Data for table `todolist`.`lists`
-- -----------------------------------------------------
START TRANSACTION;
USE `todolist`;
INSERT INTO `todolist`.`lists` (`idlist`, `name`) VALUES (DEFAULT, 'shopping');
INSERT INTO `todolist`.`lists` (`idlist`, `name`) VALUES (DEFAULT, 'job');

COMMIT;


-- -----------------------------------------------------
-- Data for table `todolist`.`cards`
-- -----------------------------------------------------
START TRANSACTION;
USE `todolist`;
INSERT INTO `todolist`.`cards` (`idcard`, `name`, `description`, `order_in_list`, `list`) VALUES (DEFAULT, 'buy bread', 'white', 0, 1);
INSERT INTO `todolist`.`cards` (`idcard`, `name`, `description`, `order_in_list`, `list`) VALUES (DEFAULT, 'buy milk', 'cow milk', 1, 1);
INSERT INTO `todolist`.`cards` (`idcard`, `name`, `description`, `order_in_list`, `list`) VALUES (DEFAULT, 'alarm at 8:00', 'tomorrow', 0, 2);

COMMIT;


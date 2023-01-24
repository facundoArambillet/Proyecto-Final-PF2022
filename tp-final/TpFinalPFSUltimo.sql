-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema tpfinalpfs2022
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tpfinalpfs2022
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tpfinalpfs2022` DEFAULT CHARACTER SET utf8 ;
USE `tpfinalpfs2022` ;

-- -----------------------------------------------------
-- Table `tpfinalpfs2022`.`rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tpfinalpfs2022`.`rol` (
  `idRol` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tpfinalpfs2022`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tpfinalpfs2022`.`usuario` (
  `idUsuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(255) NOT NULL,
  `contrasenia` VARCHAR(255) NOT NULL,
  `rolIdRol` INT(11) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `fk_Usuarios_Rol1_idx` (`rolIdRol` ASC),
  CONSTRAINT `fk_Usuarios_Rol1`
    FOREIGN KEY (`rolIdRol`)
    REFERENCES `tpfinalpfs2022`.`rol` (`idRol`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tpfinalpfs2022`.`muro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tpfinalpfs2022`.`muro` (
  `idMuro` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `stock` INT NOT NULL DEFAULT 1,
  `imagen` VARCHAR(255) NOT NULL DEFAULT 'https://www.shutterstock.com/image-vector/red-brick-tile-wall-background-600w-1429103369.jpg',
  `descripcion` VARCHAR(255) NOT NULL,
  `coeficienteDeTransmitancia` VARCHAR(45) NOT NULL DEFAULT '1',
  `usuarioIdUsuario` INT(11) NOT NULL,
  PRIMARY KEY (`idMuro`),
  INDEX `fk_Muros_Usuarios1_idx` (`usuarioIdUsuario` ASC),
  CONSTRAINT `fk_Muros_Usuarios1`
    FOREIGN KEY (`usuarioIdUsuario`)
    REFERENCES `tpfinalpfs2022`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tpfinalpfs2022`.`carritodecompras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tpfinalpfs2022`.`carritodecompras` (
  `idCarritoDeCompras` INT(11) NOT NULL AUTO_INCREMENT,
  `precioTotal` DOUBLE NOT NULL,
  `cantidad` INT(11) NOT NULL DEFAULT 1,
  `usuarioIdUsuario` INT(11) NOT NULL,
  `muroIdMuro` INT(11) NOT NULL,
  PRIMARY KEY (`idCarritoDeCompras`),
  INDEX `fk_carritodecompras_usuario1_idx` (`usuarioIdUsuario` ASC),
  INDEX `fk_carritodecompras_muro1_idx` (`muroIdMuro` ASC),
  CONSTRAINT `fk_carritodecompras_usuario1`
    FOREIGN KEY (`usuarioIdUsuario`)
    REFERENCES `tpfinalpfs2022`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_carritodecompras_muro1`
    FOREIGN KEY (`muroIdMuro`)
    REFERENCES `tpfinalpfs2022`.`muro` (`idMuro`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tpfinalpfs2022`.`factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tpfinalpfs2022`.`factura` (
  `idFactura` INT(11) NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  `total` DOUBLE NOT NULL,
  `usuarioIdUsuario` INT(11) NOT NULL,
  PRIMARY KEY (`idFactura`),
  INDEX `fk_Factura_Usuarios1_idx` (`usuarioIdUsuario` ASC),
  CONSTRAINT `fk_Factura_Usuarios1`
    FOREIGN KEY (`usuarioIdUsuario`)
    REFERENCES `tpfinalpfs2022`.`usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tpfinalpfs2022`.`tipomaterial`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tpfinalpfs2022`.`tipomaterial` (
  `idTipoMaterial` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idTipoMaterial`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tpfinalpfs2022`.`material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tpfinalpfs2022`.`material` (
  `idMaterial` INT(11) NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `cantidad` INT(11) NOT NULL,
  `precio` DOUBLE NOT NULL,
  `conductividadTermica` DOUBLE NOT NULL,
  `espesor` DOUBLE NOT NULL,
  `resistenciaTermica` DOUBLE NOT NULL DEFAULT '1',
  `tipoMaterialIdTipoMaterial` INT(11) NOT NULL,
  PRIMARY KEY (`idMaterial`),
  INDEX `fk_Materiales_TipoMaterial1_idx` (`tipoMaterialIdTipoMaterial` ASC),
  CONSTRAINT `fk_Materiales_TipoMaterial1`
    FOREIGN KEY (`tipoMaterialIdTipoMaterial`)
    REFERENCES `tpfinalpfs2022`.`tipomaterial` (`idTipoMaterial`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tpfinalpfs2022`.`muro_materiales_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tpfinalpfs2022`.`muro_materiales_material` (
  `muroIdMuro` INT(11) NOT NULL,
  `materialIdMaterial` INT(11) NOT NULL,
  PRIMARY KEY (`muroIdMuro`, `materialIdMaterial`),
  INDEX `fk_Muros_has_Materiales_Materiales1_idx` (`materialIdMaterial` ASC),
  INDEX `fk_Muros_has_Materiales_Muros1_idx` (`muroIdMuro` ASC),
  CONSTRAINT `fk_Muros_has_Materiales_Materiales1`
    FOREIGN KEY (`materialIdMaterial`)
    REFERENCES `tpfinalpfs2022`.`material` (`idMaterial`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Muros_has_Materiales_Muros1`
    FOREIGN KEY (`muroIdMuro`)
    REFERENCES `tpfinalpfs2022`.`muro` (`idMuro`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `tpfinalpfs2022`.`muro_facturas_factura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tpfinalpfs2022`.`factura_muros_muro` (
  `muroIdMuro` INT(11) NOT NULL,
  `facturaIdFactura` INT(11) NOT NULL,
  `cantidad` INT(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`muroIdMuro`, `facturaIdFactura`),
  INDEX `fk_muro_has_factura_factura1_idx` (`facturaIdFactura` ASC),
  INDEX `fk_muro_has_factura_muro1_idx` (`muroIdMuro` ASC),
  CONSTRAINT `fk_muro_has_factura_muro1`
    FOREIGN KEY (`muroIdMuro`)
    REFERENCES `tpfinalpfs2022`.`muro` (`idMuro`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_muro_has_factura_factura1`
    FOREIGN KEY (`facturaIdFactura`)
    REFERENCES `tpfinalpfs2022`.`factura` (`idFactura`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

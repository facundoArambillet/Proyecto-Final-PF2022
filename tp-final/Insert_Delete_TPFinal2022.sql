INSERT INTO rol(nombre) VALUES("administrador"),("basico");
INSERT INTO tipomaterial(nombre) VALUES("ladrillo"),("arena"),("cal"),("cemento");
INSERT INTO usuario(nombre,contrasenia,rolIdRol) VALUES("User 1","1234",1),("User 2","4567",2),("User 3","7896",2),("User 4","9632",2),("User 5","7412",2);
INSERT INTO material(nombre,cantidad,precio,conductividadTermica,espesor,tipoMaterialIdTipoMaterial) VALUES("Ladrillo rojo",10,50,1,2,1),("Ladrillo azul",20,10,5,5,1),("arena de mar",5,200,10,3,2),("arena blanca",50,50,2,5,2),("cal",5,25,2,2,3),("cemento",10,30,7,8,4);
INSERT INTO muro(nombre,precio,cantidad,imagen,descripcion,usuarioIdUsuario) VALUES("Muro 1",1000,1,"https://www.shutterstock.com/image-vector/red-brick-tile-wall-background-600w-1429103369.jpg","Descripcion muro 1",1),("Muro 2",2000,1,"https://www.shutterstock.com/image-photo/red-brick-wall-texture-background-600w-719331211.jpg","Descripcion Muro 2",2),("Muro 3",5000,1,"https://img.freepik.com/fotos-premium/muro-hormigon-blanco-textura-fondo_33720-905.jpg?w=1380","Descripcion Muro 3",3),("Muro 4",10000,1,"https://images.pexels.com/photos/2378959/pexels-photo-2378959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","Descripcion Muro 4",4),("Muro 5",20000,1,"https://www.aparicio-partner.com/wp-content/uploads/2017/05/foto_sassi_rocce_02-1024x675.jpg","Descripcion Muro 5",5);
INSERT INTO factura(fecha,total,usuarioIdUsuario) VALUES("2017-5-5",1000,1),("2018-6-10",2000,2),("2019-7-15",3000,3),("2020-8-20",4000,4),("2022-9-30",5000,5);
INSERT INTO muro_materiales_material(muroIdMuro,materialIdMaterial) VALUES(1,1),(1,2),(1,3),(1,4);
INSERT INTO detallefactura(cantidad,muroIdMuro,facturaIdFactura) VALUES(10,1,1),(20,2,2),(30,3,3),(40,4,4),(50,5,5);
INSERT INTO carritodecompras(precioTotal,cantidad, usuarioIdUsuario) VALUES(1000,1),(2000,2),(3000,3),(4000,4),(5000,5);


DELETE FROM material;
DELETE FROM usuario;
DELETE FROM muro;
DELETE FROM detallefactura;
DELETE FROM rol;
DELETE FROM tipomaterial;
DELETE FROM factura;
DELETE FROM carritodecompras;
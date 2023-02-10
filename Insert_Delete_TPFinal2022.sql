INSERT INTO rol(nombre) VALUES("administrador"),("basico");
INSERT INTO tipomaterial(nombre) VALUES("ladrillo"),("arena"),("cal"),("cemento"),("revoque"),("Aislacion"),("tabique"),("filmPolietileno"),("barreras");
INSERT INTO material(nombre,cantidad,precio,conductividadTermica,espesor,tipoMaterialIdTipoMaterial) VALUES("Ladrillo rojo",10,50,1,2,1),("Ladrillo azul",20,10,5,5,1),("arena de mar",5,200,10,3,2),("arena blanca",50,50,2,5,2),("cal",5,25,2,2,3),("cemento",10,30,7,8,4),("revoque fino",5,10,5,1,5),("revoque grueso",2,10,4,9,5),("aislacion termica ",5,4,10,15,6),("aislacion hidrofuga",10,20,4,5,6),("tabique simple",5,20,2,1,7),("tabique de panderete",2,15,3,2,7),("tabique de hormigon",20,5,3,8,7),("film de polietileno de 50 micrones",10,5,3,10,8),("film de polietileno de 100 micrones",20,4,3,15,8),("barrera de vapor",10,2,8,12,9),("barrera de agua y viento",30,7,6,9,9);
INSERT INTO muro(nombre,precio,stock,imagen,descripcion,coeficienteDeTransmitancia,usuarioIdUsuario) VALUES("Muro 1",10000,1,"https://www.shutterstock.com/image-vector/red-brick-tile-wall-background-600w-1429103369.jpg","Descripcion muro 1",0.1,1),("Muro 2",12000,1,"https://www.shutterstock.com/image-photo/red-brick-wall-texture-background-600w-719331211.jpg","Descripcion Muro 2",0.15,1),("Muro 3",20000,1,"https://img.freepik.com/fotos-premium/muro-hormigon-blanco-textura-fondo_33720-905.jpg?w=1380","Descripcion Muro 3",0.2,1),("Muro 4",25000,1,"https://images.pexels.com/photos/2378959/pexels-photo-2378959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1","Descripcion Muro 4",0.4,1),("Muro 5",35000,1,"https://www.aparicio-partner.com/wp-content/uploads/2017/05/foto_sassi_rocce_02-1024x675.jpg","Descripcion Muro 5",0.5,1),("Muro 6",40000,1,"https://www.aparicio-partner.com/wp-content/uploads/2017/05/foto_sassi_rocce_02-1024x675.jpg","Descripcion Muro 5",0.3,1);
INSERT INTO factura(fecha,total,usuarioIdUsuario) VALUES("2017-5-5",1000,1),("2018-6-10",2000,2),("2019-7-15",3000,3),("2020-8-20",4000,4),("2022-9-30",5000,5);
INSERT INTO muro_materiales_material(muroIdMuro,materialIdMaterial) VALUES(1,1),(1,2),(1,3),(1,4);
INSERT INTO factura_muros_muro(muroIdMuro,facturaIdFactura,cantidad) VALUES(1,1,10),(2,2,20),(3,3,30),(4,4,40),(5,5,50);
INSERT INTO carritodecompras(precioTotal, usuarioIdUsuario,muroIdMuro) VALUES(1000,1,1),(2000,2,2),(3000,3,3),(4000,4,4),(5000,5,5);


DELETE FROM material;
DELETE FROM usuario;
DELETE FROM muro;
DELETE FROM factura_muros_muro;
DELETE FROM muro_materiales_material;
DELETE FROM rol;
DELETE FROM tipomaterial;
DELETE FROM factura;
DELETE FROM carritodecompras;
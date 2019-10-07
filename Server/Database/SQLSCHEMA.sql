-- TABLE
CREATE TABLE CATEGORIA(id_categoria INTEGER PRIMARY key AUTOINCREMENT,nombre text not NULL,descripcion text not NULL);
CREATE TABLE CATEGORIA_LOG(id PRIMARY KEY, accion text not null,affectado text not null, fecha text not null);
CREATE TABLE CLIENTE(id_cliente INTEGER PRIMARY key AUTOINCREMENT,nombre text not NULL,apellido text not NULL,rtn text not NULL,fecha_nacimiento text not NULL,telefono text not NULL);
CREATE TABLE CLIENTE_LOG(id PRIMARY KEY, accion text not null,affectado text not null, fecha text not null);
CREATE TABLE DETALLE(num_detalle INTEGER PRIMARY KEY AUTOINCREMENT,id_factura INTEGER NOT NULL,id_producto INTEGER NOT NULL,cantidad INTEGER NOT NULL,precio REAL NOT NULL,FOREIGN KEY(id_factura) REFERENCES FACTURA(num_factura),FOREIGN KEY(id_producto) REFERENCES PRODUCTO(id_producto));
CREATE TABLE DETALLE_LOG(id PRIMARY KEY, accion text not null,affectado text not null, fecha text not null);
CREATE TABLE EMPLEADO(id_empleado integer PRIMARY key AUTOINCREMENT,identidad text not NULL, nombre text not NULL,apellido text not NULL, user text not NULL, password text not NULL);
CREATE TABLE EMPLEADO_LOG(id PRIMARY KEY, accion text not null,affectado text not null, fecha text not null);
CREATE TABLE FACTURA (num_factura INTEGER PRIMARY key AUTOINCREMENT,id_cliente integer not NULL ,fecha text not NULL,id_empleado INTEGER NOT NULL, cerrada INTEGER NOT NULL DEFAULT '0',FOREIGN KEY(id_empleado) REFERENCES EMPLEADO(id_empleado),FOREIGN KEY(id_cliente) REFERENCES CLIENTE(id_cliente));
CREATE TABLE FACTURA_LOG(id PRIMARY KEY, accion text not null,affectado text not null, fecha text not null);
CREATE TABLE MODO_PAGO (num_pago INTEGER PRIMARY key AUTOINCREMENT,nombre text not NULL,otros_detalles TEXT NOT NULL);
CREATE TABLE MODO_PAGOFACTURA(
  id_MPF INTEGER PRIMARY KEY AUTOINCREMENT,
  num_pago int not NULL,
  id_factura INT NOT NULL,
  FOREIGN KEY(num_pago) REFERENCES MODO_PAGO(num_pago),
  FOREIGN key(id_factura) REFERENCES FACTURA(num_factura)
);
CREATE TABLE MODO_PAGOFACTURA_LOG(id PRIMARY KEY, accion text not null,affectado text not null, fecha text not null);
CREATE TABLE MODO_PAGO_LOG(id PRIMARY KEY, accion text not null,affectado text not null, fecha text not null);
CREATE TABLE PRODUCTO(
  id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT not null,
  precio real not null,
  id_categoria INTEGER not null,
  image BLOB,
  FOREIGN KEY(id_categoria) REFERENCES CATEGORIA(id_categoria));
CREATE TABLE PRODUCTO_LOG(id PRIMARY KEY, accion text not null,affectado text not null, fecha text not null);
CREATE TABLE sqlite_sequence(name,seq);
 
-- INDEX
 
-- TRIGGER
CREATE TRIGGER CATEGORIA_DELETE_TRIGGER AFTER DELETE ON CATEGORIA BEGIN INSERT INTO CATEGORIA_LOG(accion,affectado,fecha) values('DELETE',OLD.id_categoria,datetime('now')); END;
CREATE TRIGGER CATEGORIA_INSERT_TRIGGER AFTER INSERT ON CATEGORIA BEGIN INSERT INTO CATEGORIA_LOG(accion,affectado,fecha) values('INSERT',NEW.id_categoria,datetime('now')); END;
CREATE TRIGGER CATEGORIA_UPDATE_TRIGGER AFTER UPDATE ON CATEGORIA BEGIN INSERT INTO CATEGORIA_LOG(accion,affectado,fecha) values('UPDATE',NEW.id_categoria,datetime('now')); END;
CREATE TRIGGER CLIENTE_DELETE_TRIGGER AFTER DELETE ON CLIENTE BEGIN INSERT INTO CLIENTE_LOG(accion,affectado,fecha) values('DELETE',OLD.id_cliente,datetime('now')); END;
CREATE TRIGGER CLIENTE_INSERT_TRIGGER AFTER INSERT ON CLIENTE BEGIN INSERT INTO CLIENTE_LOG(accion,affectado,fecha) values('INSERT',NEW.id_cliente,datetime('now')); END;
CREATE TRIGGER CLIENTE_UPDATE_TRIGGER AFTER UPDATE ON CLIENTE BEGIN INSERT INTO CLIENTE_LOG(accion,affectado,fecha) values('UPDATE',NEW.id_cliente,datetime('now')); END;
CREATE TRIGGER DETALLE_DELETE_TRIGGER AFTER DELETE ON DETALLE BEGIN INSERT INTO DETALLE_LOG(accion,affectado,fecha) values('DELETE',OLD.num_detalle,datetime('now')); END;
CREATE TRIGGER DETALLE_INSERT_TRIGGER AFTER INSERT ON DETALLE BEGIN INSERT INTO DETALLE_LOG(accion,affectado,fecha) values('INSERT',NEW.num_detalle,datetime('now')); END;
CREATE TRIGGER DETALLE_UPDATE_TRIGGER AFTER UPDATE ON DETALLE BEGIN INSERT INTO DETALLE_LOG(accion,affectado,fecha) values('UPDATE',NEW.num_detalle,datetime('now')); END;
CREATE TRIGGER EMPLEADO_DELETE_TRIGGER AFTER DELETE ON EMPLEADO BEGIN INSERT INTO EMPLEADO_LOG(accion,affectado,fecha) values('DELETE',OLD.id_empleado,datetime('now')); END;
CREATE TRIGGER EMPLEADO_INSERT_TRIGGER AFTER INSERT ON EMPLEADO BEGIN INSERT INTO EMPLEADO_LOG(accion,affectado,fecha) values('INSERT',NEW.id_empleado,datetime('now')); END;
CREATE TRIGGER EMPLEADO_UPDATE_TRIGGER AFTER UPDATE ON EMPLEADO BEGIN INSERT INTO EMPLEADO_LOG(accion,affectado,fecha) values('UPDATE',NEW.id_empleado,datetime('now')); END;
CREATE TRIGGER FACTURA_DELETE_TRIGGER AFTER DELETE ON FACTURA BEGIN INSERT INTO FACTURA_LOG(accion,affectado,fecha) values('DELETE',OLD.num_factura,datetime('now')); END;
CREATE TRIGGER FACTURA_INSERT_TRIGGER AFTER INSERT ON FACTURA BEGIN INSERT INTO FACTURA_LOG(accion,affectado,fecha) values('INSERT',NEW.num_factura,datetime('now')); END;
CREATE TRIGGER FACTURA_UPDATE_TRIGGER AFTER UPDATE ON FACTURA BEGIN INSERT INTO FACTURA_LOG(accion,affectado,fecha) values('UPDATE',NEW.num_factura,datetime('now')); END;
CREATE TRIGGER MODO_PAGOFACTURA_DELETE_TRIGGER AFTER DELETE ON MODO_PAGOFACTURA BEGIN INSERT INTO MODO_PAGOFACTURA_LOG(accion,affectado,fecha) values('DELETE',OLD.id_MPF,datetime('now')); END;
CREATE TRIGGER MODO_PAGOFACTURA_INSERT_TRIGGER AFTER INSERT ON MODO_PAGOFACTURA BEGIN INSERT INTO MODO_PAGOFACTURA_LOG(accion,affectado,fecha) values('INSERT',NEW.id_MPF,datetime('now')); END;
CREATE TRIGGER MODO_PAGOFACTURA_UPDATE_TRIGGER AFTER UPDATE ON MODO_PAGOFACTURA BEGIN INSERT INTO MODO_PAGOFACTURA_LOG(accion,affectado,fecha) values('UPDATE',NEW.id_MPF,datetime('now')); END;
CREATE TRIGGER MODO_PAGO_DELETE_TRIGGER AFTER DELETE ON MODO_PAGO BEGIN INSERT INTO MODO_PAGO_LOG(accion,affectado,fecha) values('DELETE',OLD.num_pago,datetime('now')); END;
CREATE TRIGGER MODO_PAGO_INSERT_TRIGGER AFTER INSERT ON MODO_PAGO BEGIN INSERT INTO MODO_PAGO_LOG(accion,affectado,fecha) values('INSERT',NEW.num_pago,datetime('now')); END;
CREATE TRIGGER MODO_PAGO_UPDATE_TRIGGER AFTER UPDATE ON MODO_PAGO BEGIN INSERT INTO MODO_PAGO_LOG(accion,affectado,fecha) values('UPDATE',NEW.num_pago,datetime('now')); END;
CREATE TRIGGER PRODUCTO_DELETE_TRIGGER AFTER DELETE ON PRODUCTO BEGIN INSERT INTO PRODUCTO_LOG(accion,affectado,fecha) values('DELETE',OLD.id_producto,datetime('now')); END;
CREATE TRIGGER PRODUCTO_INSERT_TRIGGER AFTER INSERT ON PRODUCTO BEGIN INSERT INTO PRODUCTO_LOG(accion,affectado,fecha) values('INSERT',NEW.id_producto,datetime('now')); END;
CREATE TRIGGER PRODUCTO_UPDATE_TRIGGER AFTER UPDATE ON PRODUCTO BEGIN INSERT INTO PRODUCTO_LOG(accion,affectado,fecha) values('UPDATE',NEW.id_producto,datetime('now')); END;
 
-- VIEW
 

import sqlite3

conn = sqlite3.connect("pos.db")
c = conn.cursor()
# clientes
c.execute(
    "CREATE TABLE CLIENTE(id_cliente INTEGER PRIMARY key AUTOINCREMENT,nombre text not NULL,apellido text not NULL,rtn text not NULL,fecha_nacimiento text not NULL,telefono text not NULL,email TEXT NOT NULL)"
)
conn.commit()
# modo de pago
c.execute(
    "CREATE TABLE MODO_PAGO (num_pago INTEGER PRIMARY key AUTOINCREMENT,nombre text not NULL,otros_detalles TEXT NOT NULL)"
)
conn.commit()
# factura
c.execute(
    "CREATE TABLE FACTURA (num_factura INTEGER PRIMARY key AUTOINCREMENT,id_cliente integer not NULL ,fecha text not NULL,num_pago integer not NULL,FOREIGN KEY(id_cliente) REFERENCES CLIENTE(id_cliente),FOREIGN KEY(num_pago) REFERENCES MODO_PAGO(num_pago))"
)
conn.commit()
# categorias
c.execute(
    "CREATE TABLE CATEGORIA(id_categoria INTEGER PRIMARY key AUTOINCREMENT,nombre text not NULL,descripcion text not NULL)"
)
conn.commit()
# producto
c.execute(
    "CREATE TABLE PRODUCTO(id_producto INTEGER PRIMARY key AUTOINCREMENT,nombre text not NULL,precio real not NULL,stock INTEGER NOT NULL,id_categoria integer not NULL,FOREIGN KEY(id_categoria) REFERENCES CATEGORIA(id_categoria))"
)
conn.commit()
# detalle de factura
c.execute(
    "CREATE TABLE DETALLE(num_detalle INTEGER PRIMARY KEY AUTOINCREMENT,id_factura INTEGER NOT NULL,id_producto INTEGER NOT NULL,cantidad INTEGER NOT NULL,precio REAL NOT NULL,FOREIGN KEY(id_factura) REFERENCES FACTURA(num_factura),FOREIGN KEY(id_producto) REFERENCES PRODUCTO(id_producto))"
)
conn.commit()

import sqlite3
from faker import Faker

conn = sqlite3.connect("Dave.db")
c = conn.cursor()


def CreateCategorias():
    print("Creando Categorias...")
    categorias = [
        ("Bebidas", "Todo Tipo de bebidas"),
        ("Comida", "Platos Fuertes"),
        ("Entradas", "Snacks y comidas pequeñas"),
    ]
    c.executemany("INSERT INTO CATEGORIA(nombre,descripcion) VALUES(?,?)", categorias)
    conn.commit()
    print("Categorias Creadas")


def CreateProductos():
    print("Creando Productos...")
    productos = [
        ("Refresco Portatil", 15.0, 50, 1),
        ("Te Helado", 20.0, 50, 1),
        ("Cerveza Nacional", 30.0, 50, 1),
        ("Cerveza Internacional", 50.0, 50, 1),
        ("MilkShake", 80.0, 40, 1),
        ("Hamburguesa de res con papas", 120.0, 50, 2),
        ("Hamburguesa de pollo con papas", 130.0, 50, 2),
        ("Hamburguesa de pescado con papas", 140.0, 50, 2),
        ("Nuggets con papas", 75.0, 50, 2),
        ("Hamburguesa de res sin papas", 100.0, 50, 2),
        ("Hamburguesa de pollo sin papas", 110.0, 50, 2),
        ("Hamburguesa de pescado sin papas", 120.0, 50, 2),
        ("Papas Fritas", 25.0, 50, 3),
        ("Nuggets", 50.0, 50, 3),
        ("Jalapeño Bombers", 35.0, 50, 3),
    ]
    c.executemany(
        "INSERT INTO PRODUCTO(nombre,precio,stock,id_categoria) VALUES(?,?,?,?)",
        productos,
    )
    conn.commit()
    print("Productos creados")


CreateProductos()
conn.close()

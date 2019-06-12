const express = require("express");
var bodyParser = require("body-parser");
var sqlite = require("sqlite");
const dbPromise = sqlite.open("./Database/Dave.db", { Promise });
const app = express();
const port = 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/GetAllProducts", async (req, res) => {
  const db = await dbPromise;
  db.all("SELECT * FROM PRODUCTO").then(data => {
    res.send({ data: data });
  });
});

app.get("/GetAllCategories", async (req, res) => {
  const db = await dbPromise;
  db.all("SELECT * FROM CATEGORIA").then(data => {
    res.send({ data: data });
  });
});

app.post("/CreateProduct", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;
  console.log(body);
  if (
    (body.nombre !== "" && body.precio !== "",
    body.stock !== "",
    body.id_categoria !== "")
  ) {
    db.run(
      "INSERT INTO PRODUCTO(nombre,precio,stock,id_categoria) VALUES(?,?,?,?)",
      [body.nombre, body.precio, body.stock, body.id_categoria]
    ).then(data => {
      res.send({ status: "OK" });
    });
  } else {
    res.send({ status: "FAILED" });
  }
});

app.post("/CreateCategorie", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;
  console.log(body);
  if (body.nombre !== "" && body.descripcion !== "") {
    db.run("INSERT INTO CATEGORIA(nombre,descripcion) VALUES(?,?)", [
      body.nombre,
      body.descripcion
    ]).then(data => {
      res.send({ status: "OK" });
    });
  } else {
    res.send({ status: "FAILED" });
  }
});

app.post("/CreatePaymentMethod", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;
  console.log(body);
  if (body.nombre !== "" && body.otro_detalles !== "") {
    db.run("INSERT INTO MODO_PAGO(nombre,otros_detalles) VALUES(?,?)", [
      body.nombre,
      body.otros_detalles
    ]).then(data => {
      res.send({ status: "OK" });
    });
  } else {
    res.send({ status: "FAILED" });
  }
});

app.listen(port, () => console.log("App is Alive"));

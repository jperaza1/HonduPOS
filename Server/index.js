const express = require("express");
const bodyParser = require("body-parser");
const sqlite = require("sqlite");
const jwt = require("jsonwebtoken");
const SHA512 = require("crypto-js/sha512");
const path = require("path");
var cors = require("cors");
// on production
// const dbPromise = sqlite.open(
//   path.join(__dirname, "/Database/Dave.db").replace("app.asar", "app.asar.unpacked"),
//   { Promise }
// );
// on dev
const dbPromise = sqlite.open(path.join(__dirname, "/Database/Dave.db"), { Promise });
const app = express();
const port = 3001;
const secret =
  "rxzHqn9ZL3RfcdXkxHEiWO1RflzpK7BgkBzV9so4ktPmbMMenSUA3eQSrEGIomfpETiM763btgpDFCpsmt5sAgR4KmTOhwDYonZ4Tj5zz4PHHQ0u2tCtpsI1rzzVmTiDcqs6Px1L8bWrPbpVx5uPnDXInNWOVtGj9qwn2n8s2ATPZzGEi88CzkC8vHutBwpPwjcWzkvd";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//gets
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

app.get("/GetAllPayments", async (req, res) => {
  const db = await dbPromise;
  db.all("SELECT * FROM MODO_PAGO").then(data => {
    res.send({ data: data });
  });
});

//Pos
app.post("/CreateProduct", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;

  if ((body.nombre !== "" && body.precio !== "", body.stock !== "", body.id_categoria !== "")) {
    db.run("INSERT INTO PRODUCTO(nombre,precio,stock,id_categoria) VALUES(?,?,?,?)", [
      body.nombre,
      body.precio,
      body.stock,
      body.id_categoria,
    ])
      .then(data => {
        res.send({ status: "OK" });
      })
      .catch(error => {
        res.send({ status: "FAILED" });
      });
  } else {
    res.send({ status: "FAILED" });
  }
});

app.post("/CreateCategorie", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;

  if (body.nombre !== "" && body.descripcion !== "") {
    db.run("INSERT INTO CATEGORIA(nombre,descripcion) VALUES(?,?)", [body.nombre, body.descripcion])
      .then(data => {
        res.send({ status: "OK" });
      })
      .catch(error => {
        res.send({ status: "FAILED" });
      });
  } else {
    res.send({ status: "FAILED" });
  }
});

app.post("/CreatePaymentMethod", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;

  if (body.nombre !== "" && body.otro_detalles !== "") {
    db.run("INSERT INTO MODO_PAGO(nombre,otros_detalles) VALUES(?,?)", [
      body.nombre,
      body.otros_detalles,
    ])
      .then(data => {
        res.send({ status: "OK" });
      })
      .catch(error => {
        res.send({ status: "FAILED" });
      });
  } else {
    res.send({ status: "FAILED" });
  }
});

app.post("/CreateUser", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;

  if (body.identidad !== "" && body.nombre !== "" && body.user !== "" && body.password !== "") {
    db.all("SELECT count(*) FROM EMPLEADO WHERE user=?", [body.user])
      .then(data => {
        if (data[0]["count(*)"] === 0) {
          db.run("INSERT INTO EMPLEADO(identidad,nombre,user,password) VALUES(?,?,?,?)", [
            body.identidad,
            body.nombre,
            body.user,
            SHA512(body.password).toString(),
          ])
            .then(data => {
              res.send({ status: "OK" });
            })
            .catch(error => {
              res.send({ status: "FAILED" });
            });
        } else {
          res.send({ status: "FAILED" });
        }
      })
      .catch(error => {});
  } else {
    res.send({ status: "FAILED" });
  }
});

app.post("/DeleteProduct", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;
  if (body.id_producto !== "" && body.id_producto !== undefined) {
    db.run("DELETE FROM PRODUCTO WHERE id_producto=?", [body.id_producto])
      .then(data => {
        res.send({ status: "OK" });
      })
      .catch(error => {
        res.send({ status: "FAILED" });
      });
  } else {
    res.send({ status: "FAILED" });
  }
});

app.post("/DeleteCategorie", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;
  if (body.id_categoria !== "" && body.id_categoria !== undefined) {
    db.run("DELETE FROM CATEGORIA WHERE id_categoria=?", [body.id_categoria])
      .then(data => {
        res.send({ status: "OK" });
      })
      .catch(error => {
        res.send({ status: "FAILED" });
      });
  } else {
    res.send({ status: "FAILED" });
  }
});

app.post("/DeletePaymentMethod", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;
  if (body.num_pago !== "" && body.num_pago !== undefined) {
    db.run("DELETE FROM MODO_PAGO WHERE num_pago=?", [body.num_pago])
      .then(data => {
        res.send({ status: "OK" });
      })
      .catch(error => {
        res.send({ status: "FAILED" });
      });
  } else {
    res.send({ status: "FAILED" });
  }
});

app.post("/Auth", async (req, res) => {
  const db = await dbPromise;
  let body = req.body;

  if (body.user !== "" && body.password !== "") {
    db.all("SELECT * FROM EMPLEADO where user=? AND password=?", [
      body.user,
      SHA512(body.password).toString(),
    ]).then(data => {
      if (data.length > 0) {
        let user = data[0];
        user.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 128;
        var token = jwt.sign(user, secret);
        res.send({ status: "OK", token });
      } else {
        res.send({ status: "FAILED" });
      }
    });
  } else {
    res.send({ status: "FAILED" });
  }
});

app.listen(port, () => console.log(`App is Alive in port: ${port}`));

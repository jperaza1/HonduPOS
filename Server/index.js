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

app.listen(port, () => console.log("App is Alive"));

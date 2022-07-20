const express = require("express");
const expresslayouts = require("express-ejs-layouts");
const bp = require("body-parser");
const dataCar = require("../service/service");

const app = express();
const port = 5000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

// gunakan ejs
app.set("view engine", "ejs");

// template layout
app.use(expresslayouts);

// render file private
app.use(express.static("public"));

//get '/'
app.get("/", dataCar.getallData);
app.get("/add", dataCar.pageAdd);
app.post("/add", dataCar.createData);
app.get("/update/:id", dataCar.pageUpdate);
app.post("/edit", dataCar.updateCar);
app.get("/delete/:id", dataCar.deleteCar);
app.get("/filter/:sizeCar", dataCar.filter);
app.post("/searchCar", dataCar.search)

app.listen(port, () => {
    console.log("Server sudah berjalan, silahkan buka http://0.0.0.0:%d", port);
  })
 

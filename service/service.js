const {
  cars
} = require('../models')

const getallData = async (req, res) => {
  const carList = await cars.findAll();
  let newcar = JSON.stringify(carList, null, 2);
  newcar = JSON.parse(newcar);
  console.log(newcar);

  res.render("main", {
    layout: "partial/index-1",
    title: "List Car",
    cars2: newcar
  });

};

const findCar = async (id) => {
  const car = await cars.findOne({
    where: {
      id: id
    },
  });
  let newcar = JSON.stringify(car, null, 2);
  newcar = JSON.parse(newcar);
  return newcar;
};

const pageAdd = (req, res) => {
  res.render("new-car", {
    layout: "partial/index-1",
    title: "Add New Data Car",
  });
}

const pageUpdate = (req, res) => {
  const car = findCar(req.params.id);
  car.then(function (result) {
    res.render("update-car", {
      layout: "partial/index-1",
      title: "Update Data",
      car: result,
    });
  });
}

const createData = (req, res) => {
  cars.create({
    nameCar: req.body.nama,
    typeCar: req.body.sizeCar,
    price: req.body.price,
    img: req.body.linkimg,
  }).then((cars) => {
    console.log(cars);
  });
  res.redirect("/");
}

const updateCar = (req, res) => {
  let newSize = "";

  if (req.body.size == "Pilih Ukuran") {
    newSize = req.body.old;
  } else {
    newSize = req.body.sizeCar;
  }
  const query = {
    where: {
      id: req.body.id
    },
  };

  cars.update({
      nameCar: req.body.nama,
      typeCar: req.body.sizeCar,
      price: req.body.price,
      img: req.body.linkimg,
    },
    query
  ).catch((err) => {
    console.error("Gagal mengupdate!");
  });
  res.redirect("/");
};

const deleteCar = (req, res) => {
  cars.destroy({
    where: {
      id: req.params.id,
    },
  }).then(() => console.log("data telah terdelete"));
  res.redirect("/");
};

const filter = async (req, res) => {
  const carList = await cars.findAll();
  let newcar = JSON.stringify(carList, null, 2);
  newcar = JSON.parse(newcar);

  const car = newcar.filter((row) => row.typeCar == req.params.sizeCar);
  // console.log(req.params.sizeCar)
  console.log(car)

  res.render("main", {
    layout: "partial/index-1",
    title: "List Car Filter",
    cars2: car,
  });
};

const search = async (req, res) => {
  const Sequelize = require("sequelize");
  const Op = Sequelize.Op;
  // console.log(req.body.searchB)
  const likename = "%"+ req.body.searchB + "%"
  const carList = await cars.findAll({
    where: {
      nameCar:  { [Op.like]: `%${likename}%` }
    },
  });
  let newcar2 = JSON.stringify(carList, null, 2);
  newcar2 = JSON.parse(newcar2);

  // const car = newcar.filter((row) => row.typeCar == req.params.sizeCar);
  // // console.log(req.params.sizeCar)
  // console.log(car)

  res.render("main", {
    layout: "partial/index-1",
    title: "List Car Filter",
    cars2: newcar2,
  });
};


module.exports = {
  getallData,
  createData,
  pageAdd,
  pageUpdate,
  updateCar,
  deleteCar,
  filter,
  search,
}
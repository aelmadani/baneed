const requireLogin = require("../middleware/requireLogin");
const User = require("../models/User");
const Car = require("../models/Car");

const path = require("path");
const multer = require("multer");

module.exports = (app) => {
  // Route: POST api/cars
  // Desc: Create new car
  // Access: Private
  app.post("/api/cars", async (req, res) => {
    try {
      // userId = await User.findById(req.user)._id;
      userId = "5e0874124a2fc00c4310dfa1";
      const {
        make,
        model,
        trim,
        mileage,
        color,
        price,
        year,
        city,
        autoGear,
        aircon,
        parkCam,
        description,
        filename
      } = req.body;
      const newCarData = {};
      newCarData.user = userId;
      if (make) newCarData.make = make;
      if (model) newCarData.model = model;
      if (trim) newCarData.trim = trim;
      if (mileage) newCarData.mileage = mileage;
      if (color) newCarData.color = color;
      if (price) newCarData.price = price;
      if (year) newCarData.year = year;
      if (city) newCarData.city = city;
      if (autoGear) newCarData.autoGear = autoGear;
      if (aircon) newCarData.aircon = aircon;
      if (parkCam) newCarData.parkCam = parkCam;
      if (description) newCarData.description = description;
      if (filename) newCarData.filename = filename;

      const newCar = new Car(newCarData);
      console.log(newCar.toJSON());

      const car = await newCar.save();
      res.json(car);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // Route: POST api/upload
  // Desc: upload image
  // Access: Private

  // app.post("/api/upload", upload.single("carImage"), function(req, res, next) {
  //   // req.file is the `avatar` file
  //   // req.body will hold the text fields, if there were any
  // });
  app.post("/api/upload", (req, res) => {
    // Set The Storage Engine
    const storage = multer.diskStorage({
      destination: "../client/public/uploads",
      filename: "ka.png"
    });

    // Init Upload
    const upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 }
    }).single("carImage");
    upload(req, res, (err) => {
      if (err) {
        console.error(err);
      } else {
        if (req.file == undefined) {
          console.log("Error: No File Selected!");
        } else {
          console.log("succes");
          console.log(req.files);

          res.status(200);
        }
      }
    });
  });

  // Route: GET api/cars
  // Desc: View all cars
  // Access: Public
  app.get("/api/cars", async (req, res) => {
    try {
      const cars = await Car.find();
      res.json(cars);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // Route: GET api/cars/:id
  // Desc: View car by id
  // Access: Public
  app.get("/api/cars/:id", async (req, res) => {
    console.log(req.params.id);
    try {
      const car = await Car.findById(req.params.id);
      if (!car) {
        return res.status(404).json({ msg: "Car not found" });
      }
      res.json(car);
    } catch (err) {
      // if the passed param is not a valid objectid
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "car not found" });
      }
      //other errors
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // Route: GET api/users/:id/cars
  // Desc: View cars of a user
  // Access: Public
  app.get("/api/users/:id/cars", async (req, res) => {
    try {
      const cars = await Car.find({ user: req.params.id });
      if (!cars) {
        return res.status(404).json({ msg: "Cars not found" });
      }
      res.json(cars);
    } catch (err) {
      // if the passed param is not a valid objectid
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "user not found" });
      }
      //other errors
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // Route: PUT api/cars/:id
  // Desc: update car by id
  // Access: Private
  app.put("/api/cars/:id", requireLogin, async (req, res) => {
    try {
      let car = await Car.findById(req.params.id);
      if (!car) {
        return res.status(404).json({ msg: "Car not found" });
      }
      const { carId, price, year, color, mileage, autoGear } = req.body;

      const carFields = {};
      if (carId) carFields.carId = carId;
      if (price) carFields.price = price;
      if (year) carFields.year = year;
      if (color) carFields.color = color;
      if (mileage) carFields.mileage = mileage;
      if (autoGear) carFields.autoGear = autoGear;

      car = await Car.findOneAndUpdate(
        { _id: req.params.id },
        { $set: carFields },
        { new: true }
      );
      return res.json(car);
    } catch (err) {
      // if the passed param is not a valid objectid
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "car not found" });
      }
      //other errors
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // Route: DELETE api/cars/:id
  // Desc: Delete car by id
  // Access: Private
  app.delete("/api/cars/:id", requireLogin, async (req, res) => {
    try {
      const car = await Car.findById(req.params.id);
      if (!car) {
        return res.status(404).json({ msg: "Car not found" });
      }
      //Check user
      const userId = req.user._id;

      if (car.user.toString() !== userId.toString()) {
        return res.status(401).json({ msg: "User not authorized" });
      }

      await User.find(
        { favList: { $elemMatch: { _id: req.params.id } } },
        function(err, docs) {
          docs.map((user) => {
            const index = user.favList.findIndex(
              (fav) => fav._id.toString() === req.params.id
            );
            console.log(index);
            user.favList.splice(index, 1);
            console.log(user);
            user.save();
          });
        }
      );

      await car.remove();

      res.json({ msg: "car removed" });
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).json({ msg: "car not found" });
      }
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // Route: GET api/search
  // Desc: Search for a car from url queries
  // Access: Public
  app.get("/api/search", async (req, res) => {
    //Search query
    const queries = req.query;
    const search = {};
    if (queries.make) search.make = queries.make;
    if (queries.model) search.model = queries.model;
    if (queries.autoGear) search.autoGear = queries.autoGear;
    if (queries.parkCam) search.parkCam = queries.parkCam;
    if (queries.aircon) search.aircon = queries.aircon;
    if (queries.color) search.color = queries.color;

    if (queries.minYear) search.year = { $gte: queries.minYear };
    if (queries.maxYear) search.year["$lte"] = queries.maxYear;
    if (queries.maxMileage) search.mileage = { $lte: queries.maxMileage };
    if (queries.maxPrice) search.price = { $lte: queries.maxPrice };

    console.log(search);

    const cars = await Car.find(search);
    res.json(cars);
  });
};

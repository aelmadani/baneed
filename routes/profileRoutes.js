const requireLogin = require("../middleware/requireLogin");
const User = require("../models/User");
const Car = require("../models/Car");

module.exports = (app) => {
  // Route: Get api/profiles/:id
  // Desc: View my profile
  // Access: Private
  app.get("/api/profiles/me", requireLogin, async (req, res) => {
    try {
      const profile = await User.findOne({
        _id: req.user.id
      });
      console.log(req.user.id);
      if (!profile) {
        return res
          .status(400)
          .json({ msg: "There is no profile for this user" });
      }

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

  // Route: get /api/favorites
  // Desc: view fav list
  // Access: Private
  app.get("/api/favorites", requireLogin, async (req, res) => {
    const user = await User.findById(req.user.id);
    const favList = user.favList;
    let cars = [];

    cars = await Car.find({ _id: { $in: favList } });

    res.send(cars);
  });

  // Route: post /api/favorites
  // Desc: add to fav list
  // Access: Private
  app.post("/api/favorites/:carId", requireLogin, async (req, res) => {
    // console.log("req.params.carId:" + req.params.carId);
    console.log(req.user);

    const user = await User.findById(req.user.id);
    let newFavList = user.favList;

    if (user.favList.filter((fav) => fav === req.params.carId).length > 0) {
      newFavList = newFavList.filter((fav) => fav !== req.params.carId);
    } else {
      newFavList.push(req.params.carId);
    }

    user.favList = newFavList;
    user.save();

    res.send(user.favList);
  });

  // Route: delete api/profiles/:id/favorites/:id
  // Desc: delete car from fav list
  // Access: Private
  app.delete("/api/dashboard/favorites/:id", requireLogin, async (req, res) => {
    const user = await User.findById(req.user.id);
    let newFavList = user.favList;

    newFavList = newFavList.filter(
      (fav) => fav._id.toString() !== req.params.id
    );

    user.favList = newFavList;
    user.save();

    res.send(user.favList);
  });
};

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

  // Route: get /api/dashboard/favorites
  // Desc: view fav list
  // Access: Private
  app.get("/api/dashboard/favorites", requireLogin, (req, res) => {
    //const user = await User.findById(req.user.id);
    res.send(req.user.favList);
  });

  // Route: post /api/dashboard/favorites
  // Desc: add to fav list
  // Access: Private
  app.post("/api/dashboard/favorites", requireLogin, async (req, res) => {
    const user = await User.findById(req.user.id);
    let newFavList = user.favList;
    const index = newFavList.findIndex(
      (fav) => fav._id.toString() === req.body.favId.toString()
    );
    if (index > -1) {
      console.log("Already fav");
      return res.send(user.favList);
    }
    newFavList.push(req.body.favId);
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

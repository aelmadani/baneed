import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../components/authComponents/Login";
import Register from "../components/authComponents/Register";
import CarForm from "../components/carComponents/CarForm";
import Search from "../components/searchComponents/AdvancedSearch";
// import Alert from "./components/layout/Alert";
import Cars from "../components/carComponents/Cars";
import Car from "../components/carComponents/Car";
import Favorites from "../components/profileComponents/Favorites";
import Dashboard from "../components/profileComponents/Dashboard";
import UpdateCar from "../components/profileComponents/UpdateCar";

import NotFound from "../components/layoutComponents/NotFound";
import PrivateRoute from "./PrivateRoute";

const Routes = () => {
  return (
    <section className="container">
      {/* <Alert /> */}
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/cars" component={Cars} />
        <Route exact path="/car/:id" component={Car} />
        <Route exact path="/user/:id/cars" component={Cars} />

        <PrivateRoute exact path="/newcar" component={CarForm} />
        <PrivateRoute exact path="/favorites" component={Favorites} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/update-car/:id" component={UpdateCar} />

        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

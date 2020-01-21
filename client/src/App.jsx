import './App.scss';
import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import Discover from "./pages/Discover.jsx";
import DiscoverShow from "./pages/DiscoverShow.jsx";
import Profile from "./pages/Profile.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import AuthPage from "./pages/Auth.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
  return (
    <>
      <NavBar />
      <div className="container">
        <Switch>
          <Route path="/" component={Landing} exact={true} />
          <Route path="/my" component={Home} exact={true} />
          <Route path="/my/discover" component={Discover} exact={true} />
          <Route path="/my/discover/:id" component={DiscoverShow} />
          <Route path="/my/profile/stats" component={Profile} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/auth" component={AuthPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
      <Footer />
    </>
  );
}

export default App;
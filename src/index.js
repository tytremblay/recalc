import store from "auth/store";
import { URL as beltsURL, TITLE as beltsTitle } from "calculators/belts/config";
import {
  URL as flywheelURL,
  TITLE as flywheelTitle,
} from "calculators/flywheel/config";
import {
  URL as linearURL,
  TITLE as linearTitle,
} from "calculators/linear_mech/config";
import {
  URL as pneumaticsURL,
  TITLE as pneumaticsTitle,
} from "calculators/pneumatics/config";
import Landing from "common/components/landing";
import Nav from "common/components/nav";
import "index.scss";
import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "redux-zero/react";
import * as serviceWorker from "serviceWorker";

const LinearMech = lazy(() => import("calculators/linear_mech/LinearMech"));
const Belts = lazy(() => import("calculators/belts/Belts"));
const Flywheel = lazy(() => import("calculators/flywheel/Flywheel"));
const Pneumatics = lazy(() => import("calculators/pneumatics/Pneumatics"));
const About = lazy(() => import("common/components/about/About"));
const AuthRedirect = lazy(() => import("auth/AuthRedirect"));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Nav />
        <section className="section">
          <div className="container">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Landing} />

                <Route
                  path={beltsURL}
                  render={(p) => <Belts {...p} title={beltsTitle} />}
                />
                <Route
                  path={flywheelURL}
                  render={(p) => <Flywheel {...p} title={flywheelTitle} />}
                />
                <Route
                  path={pneumaticsURL}
                  render={(p) => <Pneumatics {...p} title={pneumaticsTitle} />}
                />
                <Route
                  path={linearURL}
                  render={(p) => <LinearMech {...p} title={linearTitle} />}
                />

                <Route
                  path={"/about"}
                  render={(p) => <About {...p} title={"About"} />}
                />

                <Route path={"/auth"} component={AuthRedirect} />
              </Switch>
            </Suspense>
          </div>
        </section>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import StudentiDashboard from "./../../features/studentat/dashboard/StudentiDashboard";
import ProfesoriDashboard from "./../../features/profesorat/dashboard/ProfesoriDashboard";
import LibriDashboard from "./../../features/librat/dashboard/LibriDashboard";
import { observer } from "mobx-react-lite";
import { Route, useLocation, Switch } from "react-router-dom";
import HomePage from "./../../features/home/HomePage";
import StudentiForm from "../../features/studentat/form/StudentiForm";
import ProfesoriForm from "../../features/profesorat/form/ProfesoriForm";
import LibriForm from "../../features/librat/form/LibriForm";
import StudentiDetails from "./../../features/studentat/details/StudentiDetails";
import ProfesoriDetails from "./../../features/profesorat/details/ProfesoriDetails";
import LibriDetails from "../../features/librat/details/LibriDetails";

function App() {
  // const history = useHistory();
  const location = useLocation();

  return (
    <>
      <Route exact path="/" component={HomePage} />

      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />

            <Container style={{ marginTop: "7em" }}>
              {/* IT'S THE SWITCH QE TA CHANNEL KU PO DON ME SHKU */}
              <Switch>
                <Route exact path="/studentat" component={StudentiDashboard} />
                <Route path="/studentat/:id" component={StudentiDetails} />

                <Route
                  exact
                  path="/profesorat"
                  component={ProfesoriDashboard}
                />
                <Route path="/profesorat/:id" component={ProfesoriDetails} />

                <Route exact path="/librat" component={LibriDashboard} />
                <Route path="/librat/:id" component={LibriDetails} />

                <Route
                  key={location.key}
                  exact
                  path={["/createStudenti", "/manageStudenti/:id"]}
                  component={StudentiForm}
                />
                <Route
                  key={location.key}
                  exact
                  path={["/createProfesori", "/manageProfesori/:id"]}
                  component={ProfesoriForm}
                />
                <Route
                  key={location.key}
                  exact
                  path={["/createLibri", "/manageLibri/:id"]}
                  component={LibriForm}
                />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);

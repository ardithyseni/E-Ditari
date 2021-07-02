import React from "react";
import { Grid } from "semantic-ui-react";
import ProfesoriList from "./ProfesoriList";
import ProfesoriDetails from "./../details/ProfesoriDetails";
import ProfesoriForm from "./../form/ProfesoriForm";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';


export default observer (function ProfesoriDashboard() {

  const { profesoriStore } = useStore();
  const { selectedProfesori, editProfesoriMode } = profesoriStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <ProfesoriList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedProfesori &&
          !editProfesoriMode && ( // anything to the right will execute perderisa e majta nuk eshte null
            <ProfesoriDetails />
          )}
        {editProfesoriMode && (
          <ProfesoriForm />
        )}
      </Grid.Column>
    </Grid>
  );
})
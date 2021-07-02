import React from "react";
import { Grid } from "semantic-ui-react";
import StudentiList from "./StudentiList";
import StudentiDetails from "./../details/StudentiDetails";
import StudentiForm from "./../form/StudentiForm";
import { useStore } from "./../../../app/stores/store";
import { observer } from 'mobx-react-lite';


export default observer(function StudentiDashboard() {


  const { studentiStore } = useStore();
  const { selectedStudenti, editStudentiMode } = studentiStore;

  return (
    <Grid>
      <Grid.Column width="10">
        <StudentiList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedStudenti &&
          !editStudentiMode && ( // anything to the right will execute perderisa e majta nuk eshte null
            <StudentiDetails />
          )}
 
        {editStudentiMode && (
          <StudentiForm />
        )}
      </Grid.Column>
    </Grid>
  );
})

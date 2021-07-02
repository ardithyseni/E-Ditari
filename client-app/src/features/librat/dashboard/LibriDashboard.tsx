import React from "react";
import { Grid } from "semantic-ui-react";

import LibriList from './LibriList';
import LibriDetails from './../details/LibriDetails';
import LibriForm from './../form/LibriForm';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";


export default observer (function LibriDashboard() {
  
  const { libriStore } = useStore();
  const { selectedLibri, editLibriMode} = libriStore;
  
  return (
    <Grid>
      <Grid.Column width="10">
        <LibriList />
      </Grid.Column>
      <Grid.Column width='6'>
          {selectedLibri && !editLibriMode && // anything to the right will execute perderisa e majta nuk eshte null
         <LibriDetails/>}
        {editLibriMode &&
        <LibriForm />}
         </Grid.Column>
    </Grid>
  );
})

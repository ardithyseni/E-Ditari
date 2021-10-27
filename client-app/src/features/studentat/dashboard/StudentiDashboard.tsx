import React, { useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";
import StudentiList from "./StudentiList";
import { useStore } from "./../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default observer(function StudentiDashboard() {

  const { studentiStore } = useStore();

  const {loadStudentat, studentiRegistry} = studentiStore;

  useEffect(() => {
    if (studentiRegistry.size <= 1) loadStudentat();
  }, [studentiRegistry, loadStudentat]); 

  if(studentiStore.loadingInitial) return <LoadingComponent content = 'Loading Studentat' />
  

  return (
    <Grid>
      <Header as='h1'>Studentat</Header>
      <Grid.Column width="8">
        <StudentiList />
      </Grid.Column>
      <Grid.Column width="4">
        {/* <h2>Studenti filters</h2> */}
      </Grid.Column>
    </Grid>
  );
})

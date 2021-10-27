import React, {useEffect} from "react";
import { Grid, Header } from "semantic-ui-react";
import ProfesoriList from "./ProfesoriList";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default observer (function ProfesoriDashboard() {

  const { profesoriStore } = useStore(); 

  const {loadProfesorat, profesoriRegistry} = profesoriStore;

  useEffect(() => {
    if (profesoriRegistry.size <= 1) loadProfesorat();
  }, [profesoriRegistry.size, loadProfesorat]);

  if(profesoriStore.loadingInitial) return <LoadingComponent content = 'Loading Profesorat' />

  return (


    <Grid>
      <Header as='h1'>Profesorat</Header>
      <Grid.Column width="8">
        <ProfesoriList />
      </Grid.Column>
      <Grid.Column width="4">
        {/* <h2>Profesori Filters</h2> */}
      </Grid.Column>
    </Grid>
  );
})
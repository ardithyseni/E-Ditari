import React, {useEffect} from "react";
import { Grid, Header } from "semantic-ui-react";
import LibriList from './LibriList';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default observer (function LibriDashboard() {
  
  const { libriStore } = useStore();
  const {loadLibrat, libriRegistry} = libriStore;

  useEffect(() => {
    if (libriRegistry.size <= 1) loadLibrat();
  }, [libriRegistry, loadLibrat]);

  if(libriStore.loadingInitial) return <LoadingComponent content = 'Loading Librat' />

  return (
    <Grid>
      <Header as='h1'>Librat</Header>
      <Grid.Column width="8">
        <LibriList />
      </Grid.Column>
      <Grid.Column width='4'>
          {/* <h2>Libri filters</h2> */}
         </Grid.Column>
    </Grid>
  );
})

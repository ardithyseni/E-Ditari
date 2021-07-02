import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import StudentiDashboard from './../../features/studentat/dashboard/StudentiDashboard';
import ProfesoriDashboard from './../../features/profesorat/dashboard/ProfesoriDashboard';
import LibriDashboard from './../../features/librat/dashboard/LibriDashboard';
import LoadingComponent from './LoadingComponent';
import {useStore} from '../stores/store';
import { observer } from "mobx-react-lite";



function App() {

  const{studentiStore} = useStore();
  const{profesoriStore} = useStore();
  const{libriStore} = useStore();

  useEffect(() => {
    studentiStore.loadStudentat();
  }, [studentiStore]); 
  useEffect(() => {
      profesoriStore.loadProfesorat();
  }, [profesoriStore]);

  useEffect(() => {
    libriStore.loadLibrat();
  }, [libriStore]);



  if(studentiStore.loadingInitial && profesoriStore.loadingInitial && libriStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <>    
      <NavBar />
      <Container style={{ marginTop: "7em" }}>

        <h2>Studentat</h2>
        <StudentiDashboard />
        
        <h2>Profesorat</h2>
        <ProfesoriDashboard />

        <h2>Librat</h2>  
        <LibriDashboard />
        
      </Container>
    </>
  );
}

export default observer(App);

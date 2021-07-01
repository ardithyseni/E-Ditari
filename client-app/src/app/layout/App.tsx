import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, List } from "semantic-ui-react";
import { Studenti } from "./../models/studenti";
import { Profesori } from "./../models/profesori";
import { Libri } from "./../models/libri";
import NavBar from "./NavBar";
import StudentiDashboard from './../../features/studentat/dashboard/StudentiDashboard';
import {v4 as uuid} from 'uuid';
import ProfesoriDashboard from './../../features/profesorat/dashboard/ProfesoriDashboard';
import agentStudenti from '../api/agentStudenti';
import agentProfesori from '../api/agentProfesori';
import LoadingComponent from './LoadingComponent';
import {useStudentiStore} from '../stores/storeforstudents';
import { observer } from "mobx-react-lite";
import { useProfesoriStore } from './../stores/storeforprofesors';

function App() {

  const{studentiStore} = useStudentiStore();
  const{profesoriStore} = useProfesoriStore();


  const [studentat, setStudentat] = useState<Studenti[]>([]);
  const [profesorat, setProfesorat] = useState<Profesori[]>([]);
  const [librat, setLibrat] = useState<Libri[]>([]);

  const [selectedStudenti, setSelectedStudenti] = useState<Studenti | undefined>(undefined);
  const [editStudentiMode, setEditStudentiMode] = useState(false);

  const [selectedProfesori, setSelectedProfesori] = useState<Profesori | undefined>(undefined);
  const [editProfesoriMode, setEditProfesoriMode] = useState(false);


  const[loading, setLoading] = useState(true);
  const[submittingStudenti, setSubmittingStudenti] = useState(false);
  const[submittingProfesori, setSubmittingProfesori] = useState(false);

  useEffect(() => {
    // accepts no parameters, per qata ()
      agentStudenti.Studentat.list().then((response) => {
        let studentat: Studenti[] = [];
        response.forEach(studenti => {
          studenti.datelindja = studenti.datelindja.split('T')[0];
          studentat.push(studenti);
        })
        setStudentat(studentat);
        setLoading(false);
      });
  }, []); // qiky [] siguron qe veq 1 here ekzekutohet

  useEffect(() => {
      agentProfesori.Profesorat.listProfesorat().then((response) => {
        let profesorat: Profesori[] = [];
        response.forEach(profesori => {
          profesori.datelindja = profesori.datelindja.split('T')[0];
          profesorat.push(profesori);
        })
        setProfesorat(profesorat);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get<Libri[]>("http://localhost:5000/api/librat").then((response) => {
      setLibrat(response.data);
    });
  }, []);


  function handleSelectStudenti(id: string) {
    setSelectedStudenti(studentat.find(x => x.studentiID === id))
  }

  function handleCancelSelectStudenti () {
    setSelectedStudenti(undefined);
  }

  function handleStudentiFormOpen(id?:string) {
    id ? handleSelectStudenti(id) : handleCancelSelectStudenti();
    setEditStudentiMode(true);
  }

  function handleStudentiFormClose(){
    setEditStudentiMode(false);

  }

  function handleCreateOrEditStudenti (studenti: Studenti) {
    setSubmittingStudenti(true);
    if  (studenti.studentiID) {
      agentStudenti.Studentat.update(studenti).then(() => {
        setStudentat([...studentat.filter(x=> x.studentiID !== studenti.studentiID), studenti])
        setSelectedStudenti(studenti);
        setEditStudentiMode(false);
        setSubmittingStudenti(false); 
      })
    } else {
      studenti.studentiID = uuid();
      agentStudenti.Studentat.create(studenti).then(() => {
        setStudentat([...studentat, studenti])
        setSelectedStudenti(studenti);
        setEditStudentiMode(false);
        setSubmittingStudenti(false); 
      })
    }

  }

  function handleDeleteStudenti(id: string) {
    setSubmittingStudenti(true);
    agentStudenti.Studentat.delete(id).then(() => {
      setStudentat([...studentat.filter(x=> x.studentiID !== id)]);
      setSubmittingStudenti(false);
    })
    
  }

//===================================================
//===================================================

  function handleSelectProfesori(id: string) {
    setSelectedProfesori(profesorat.find(x => x.profesoriID === id))
  }

  function handleCancelSelectProfesori () {
    setSelectedProfesori(undefined);
  }

  function handleProfesoriFormOpen(id?:string) {
    id ? handleSelectProfesori(id) : handleCancelSelectProfesori();
    setEditProfesoriMode(true);
  }

  function handleProfesoriFormClose(){
    setEditProfesoriMode(false);

  }
    
  function handleCreateOrEditProfesori (profesori: Profesori) {
    setSubmittingProfesori(true);
    if (profesori.profesoriID) {
      agentProfesori.Profesorat.updateProfesori(profesori).then(() => {
        setProfesorat([...profesorat.filter(x=> x.profesoriID !== profesori.profesoriID), profesori])
        setSelectedProfesori(profesori);
        setEditProfesoriMode(false);
        setSubmittingProfesori(false); 
      })
    } else {
      profesori.profesoriID = uuid();
      agentProfesori.Profesorat.createProfesori(profesori).then(() => {
        setProfesorat([...profesorat, profesori])
        setSelectedProfesori(profesori);
        setEditProfesoriMode(false);
        setSubmittingProfesori(false); 
      })
    }

  }

  function handleDeleteProfesori(id: string) {
    setSubmittingProfesori(true);
    agentProfesori.Profesorat.deleteProfesori(id).then(() => {
      setProfesorat([...profesorat.filter(x => x.profesoriID !== id)]);
      setSubmittingProfesori(false);
    })
  }


  if(loading) return <LoadingComponent content='Loading app'/>

  return (
    <>    
      <NavBar openStudentiForm = {handleStudentiFormOpen}
              openProfesoriForm = {handleProfesoriFormOpen}/>
      <Container style={{ marginTop: "7em" }}>
        
        
        <StudentiDashboard studentat={studentat}
        selectedStudenti = {selectedStudenti}
        selectStudenti = {handleSelectStudenti}
        cancelSelectStudenti = {handleCancelSelectStudenti}
        editStudentiMode = {editStudentiMode}
        openStudentiForm = {handleStudentiFormOpen}
        closeStudentiForm = {handleStudentiFormClose}
        createOrEditStudenti = {handleCreateOrEditStudenti}
        deleteStudenti = {handleDeleteStudenti}
        submittingStudenti = {submittingStudenti}
        />
        
        
        <ProfesoriDashboard profesorat = {profesorat}
        selectedProfesori = {selectedProfesori}
        selectProfesori = {handleSelectProfesori}
        cancelSelectProfesori = {handleCancelSelectProfesori}
        editProfesoriMode = {editProfesoriMode}
        openProfesoriForm = {handleProfesoriFormOpen}
        closeProfesoriForm = {handleProfesoriFormClose}
        createOrEditProfesori = {handleCreateOrEditProfesori}
        deleteProfesori = {handleDeleteProfesori}
        submittingProfesori = {submittingProfesori}
        />
        

        <List>
          {librat.map((libri) => (
            <List.Item key={libri.id}>{libri.title}</List.Item>
          ))}
        </List>
      </Container>
    </>
  );
}

export default observer(App);

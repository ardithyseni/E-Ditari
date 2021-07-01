import React from "react";
import { Grid } from "semantic-ui-react";
import { Studenti } from "../../../app/models/studenti";
import StudentiList from './StudentiList';
import StudentiDetails from './../details/StudentiDetails';
import StudentiForm from './../form/StudentiForm';

interface Props {
    studentat: Studenti[];
    selectedStudenti: Studenti | undefined;
    selectStudenti: (id: string) => void;
    cancelSelectStudenti: () => void;
    editStudentiMode: boolean;
    openStudentiForm: (id: string) => void;
    closeStudentiForm: () => void;  
    createOrEditStudenti: (studenti: Studenti) => void;
    deleteStudenti: (id: string) => void;
    submittingStudenti: boolean;
}

export default function StudentiDashboard({studentat, selectedStudenti, selectStudenti
            , cancelSelectStudenti, editStudentiMode, openStudentiForm, submittingStudenti,
            closeStudentiForm, createOrEditStudenti, deleteStudenti}:Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <StudentiList 
        studentat = {studentat} 
        selectStudenti ={selectStudenti}
        deleteStudenti = {deleteStudenti}
        submittingStudenti = {submittingStudenti}
        />
      </Grid.Column>
      <Grid.Column width='6'>
          {selectedStudenti && !editStudentiMode && // anything to the right will execute perderisa e majta nuk eshte null
         <StudentiDetails studenti={selectedStudenti}
          cancelSelectStudenti = {cancelSelectStudenti}
          openStudentiForm= {openStudentiForm}
          />}
        {editStudentiMode &&
        <StudentiForm
         closeStudentiForm = {closeStudentiForm} 
         studenti = {selectedStudenti}
         createOrEditStudenti = {createOrEditStudenti} 
         submittingStudenti = {submittingStudenti}
         />}
         </Grid.Column>
    </Grid>
  );
}

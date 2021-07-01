import React from "react";
import { Grid } from "semantic-ui-react";
import { Profesori } from "../../../app/models/profesori";
import ProfesoriList from './ProfesoriList';
import ProfesoriDetails from './../details/ProfesoriDetails';
import ProfesoriForm from './../form/ProfesoriForm';

interface Props {
    profesorat: Profesori[];
    selectedProfesori: Profesori | undefined;
    selectProfesori: (id: string) => void;
    cancelSelectProfesori: () => void;
    editProfesoriMode: boolean;
    openProfesoriForm: (id: string) => void;
    closeProfesoriForm: () => void;  
    createOrEditProfesori: (profesori: Profesori) => void;
    deleteProfesori: (id: string) => void;
    submittingProfesori: boolean;
}

export default function ProfesoriDashboard({profesorat, selectedProfesori, selectProfesori
                                    , cancelSelectProfesori, editProfesoriMode, openProfesoriForm,
                          submittingProfesori, closeProfesoriForm, createOrEditProfesori, deleteProfesori}:Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ProfesoriList 
        profesorat = {profesorat} 
        selectProfesori ={selectProfesori}
        deleteProfesori = {deleteProfesori}
        submittingProfesori = {submittingProfesori}
        />
      </Grid.Column>
      <Grid.Column width='6'>
          {selectedProfesori && !editProfesoriMode && // anything to the right will execute perderisa e majta nuk eshte null
         <ProfesoriDetails profesori={selectedProfesori}
          cancelSelectProfesori = {cancelSelectProfesori}
          openProfesoriForm= {openProfesoriForm}
          />}
        {editProfesoriMode &&
        <ProfesoriForm
        closeProfesoriForm = {closeProfesoriForm} 
        profesori = {selectedProfesori} 
        createOrEditProfesori = {createOrEditProfesori}
        submittingProfesori = {submittingProfesori} 
        />}
         </Grid.Column>
    </Grid>
  );
}

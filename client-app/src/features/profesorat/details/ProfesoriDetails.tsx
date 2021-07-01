import React from 'react';
import { Button, Card} from 'semantic-ui-react';
import { Profesori } from '../../../app/models/profesori';

interface Props {
    profesori: Profesori;
    cancelSelectProfesori: () => void;
    openProfesoriForm: (id:string) => void;
}

export default function ProfesoriDetails({profesori, cancelSelectProfesori, openProfesoriForm}: Props){
    return (
        <Card fluid>
        
        <Card.Content>
          <Card.Header>{profesori.emri} {profesori.mbiemri}</Card.Header>
          <Card.Meta>
            <span>{profesori.titulli}</span>
          </Card.Meta>

          
          
          <Card.Description>{profesori.email}</Card.Description>

          
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths='2'>
            <Button onClick={() => openProfesoriForm(profesori.profesoriID)} basic color='blue' content='Edit'/>              
            <Button onClick={cancelSelectProfesori} basic color='grey' content='Cancel'/>              
          </Button.Group>
        </Card.Content>
      </Card>   
    )
}
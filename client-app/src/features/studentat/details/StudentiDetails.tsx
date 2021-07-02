import React from 'react';
import { Button, Card} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default function StudentiDetails(){

  const{studentiStore} = useStore();
  const {selectedStudenti: studenti, openStudentiForm, cancelSelectedStudenti} = studentiStore;

  if (!studenti) return <LoadingComponent />;

    return (
        <Card fluid>
        
        <Card.Content>
          <Card.Header>{studenti.emri +  ' ' + studenti.mbiemri}</Card.Header>
          <Card.Meta>
            <span>{studenti.datelindja}</span>
          </Card.Meta>

          <Card.Description>{studenti.adresa}</Card.Description>
          
          <Card.Description>{studenti.email}</Card.Description>

          <Card.Description>{studenti.numriKontaktues}</Card.Description>  
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths='2'>
            <Button onClick={() => openStudentiForm(studenti.studentiID)} basic color='blue' content='Edit'/>              
            <Button onClick={cancelSelectedStudenti} basic color='grey' content='Cancel'/>              
          </Button.Group>
        </Card.Content>
      </Card>   
    )
}
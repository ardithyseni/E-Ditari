import React from 'react';
import { Button, Card} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from './../../../app/stores/store';


export default function LibriDetails(){
    
  const{libriStore} = useStore();
  const {selectedLibri: libri, openLibriForm, cancelSelectedLibri} = libriStore;

  if (!libri) return <LoadingComponent />

  return (
        <Card fluid>
        
        <Card.Content>
          <Card.Header>{libri.title}</Card.Header>
          <Card.Meta>
            <div>{libri.autori}</div>
            <div>{libri.category}</div>
            <div>{libri.description}</div>
            
          </Card.Meta>

        </Card.Content>
        <Card.Content extra>
          <Button.Group widths='2'>
            <Button onClick={() => openLibriForm(libri.id)} basic color='blue' content='Edit'/>              
            <Button onClick={cancelSelectedLibri} basic color='grey' content='Cancel'/>              
          </Button.Group>
        </Card.Content>
      </Card>   
    )
}
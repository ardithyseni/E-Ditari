import React, { useEffect } from 'react';
import { Button, Card} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


export default observer (function ProfesoriDetails(){

  const{profesoriStore} = useStore();
  const {selectedProfesori: profesori, loadProfesori, loadingInitial} = profesoriStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadProfesori(id);
  }, [id, loadProfesori]);

  if (loadingInitial || !profesori) return <LoadingComponent />

    return (
        <Card fluid>
          
        
        <Card.Content>
          <Card.Header>{profesori.emri + ' ' + profesori.mbiemri}</Card.Header>
          <Card.Meta>
            <span>{profesori.titulli}</span>
          </Card.Meta>

          
          
          <Card.Description>{profesori.email}</Card.Description>

          
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths='2'>
            <Button as = {Link} to = {`/manageProfesori/${profesori.profesoriID}`} basic color='blue' content='Edit'/>              
            <Button as = {Link} to = '/profesorat' basic color='grey' content='Cancel'/>              
          </Button.Group>
        </Card.Content>
      </Card>   
    )
})
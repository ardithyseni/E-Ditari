import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';



export default observer (function StudentiDetails(){

  const{studentiStore} = useStore();
  const {selectedStudenti: studenti, loadStudenti, loadingInitial} = studentiStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadStudenti(id);
  }, [id, loadStudenti]);

  if (loadingInitial || !studenti) return <LoadingComponent />;

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
            <Button as = {Link} to = {`/manageStudenti/${studenti.studentiID}`} basic color='blue' content='Edit'/>              
            <Button as = {Link} to = '/librat' basic color='grey' content='Cancel'/>                            
          </Button.Group>
        </Card.Content>
      </Card>   
    )
})
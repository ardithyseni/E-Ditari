import React, { useEffect } from 'react';
import { Button, Card} from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from './../../../app/stores/store';
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


export default observer (function LibriDetails(){
    
  const{libriStore} = useStore();
  const {selectedLibri: libri, loadLibri, loadingInitial} = libriStore;
  const {id} = useParams<{id: string}>();

  useEffect(() => {
    if (id) loadLibri(id);
  }, [id, loadLibri]);

  if (loadingInitial || !libri) return <LoadingComponent />

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
            <Button as = {Link} to = {`/manageLibri/${libri.id}`} basic color='blue' content='Edit'/>              
            <Button as = {Link} to = '/librat' basic color='grey' content='Cancel'/>              
          </Button.Group>
        </Card.Content>
      </Card>   
    )
})
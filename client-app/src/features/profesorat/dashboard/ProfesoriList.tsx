import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';




export default observer (function ProfesoriList() {
    
    const{profesoriStore} = useStore();
    const {deleteProfesori, profesoratByDate, loading} = profesoriStore;

    const [target, setTarget] = useState('');

    function handleProfesoriDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteProfesori(id);
    }

    
    
    return (
        <Segment>
            <Item.Group divided>
                {profesoratByDate.map(profesori =>(
                    <Item key={profesori.profesoriID}>
                        <Item.Content>
                            <Item.Header as='a'>{profesori.emri} {profesori.mbiemri}</Item.Header>
                            <Item.Meta>{profesori.datelindja}</Item.Meta>
                            <Item.Description>
				                <div>{profesori.titulli}</div>
                                <div>{profesori.adresa}</div>
                                <div>{profesori.email}</div>
                                <div>{profesori.numriKontaktues}</div>
                            </Item.Description>

                            <Item.Extra>
                                <Button onClick={() => profesoriStore.selectProfesori(profesori.profesoriID)} floated='right' content='View' color='blue' />
                                <Button 
                                name = {profesori.profesoriID}
                                loading = {loading && target === profesori.profesoriID} 
                                onClick={(e) => handleProfesoriDelete(e, profesori.profesoriID)} 
                                floated='right' 
                                content='Delete' 
                                color='red' 
                                
                                />

                            </Item.Extra>

                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})
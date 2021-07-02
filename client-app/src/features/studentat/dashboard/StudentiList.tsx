import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { SyntheticEvent } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';



export default observer (function StudentiList() {
    
    const{studentiStore} = useStore();
    const {deleteStudenti, studentatByDate, loading} = studentiStore;

    const [target, setTarget] = useState('');

    function handleStudentiDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteStudenti(id);
    }

    

    return (
        <Segment>
            <Item.Group divided>
                {studentatByDate.map(studenti =>(
                    <Item key={studenti.studentiID}>
                        <Item.Content>
                            <Item.Header as='a'>{studenti.emri} {studenti.mbiemri}</Item.Header>
                            <Item.Meta>{studenti.datelindja}</Item.Meta>
                            <Item.Description>
                                <div>{studenti.adresa}</div>
                                <div>{studenti.email}</div>
                                <div>{studenti.numriKontaktues}</div>
                            </Item.Description>

                            <Item.Extra>
                                <Button onClick={() => studentiStore.selectStudenti(studenti.studentiID)} floated='right' content='View' color='blue' />
                                <Button 
                                name = {studenti.studentiID}
                                loading = {loading && target === studenti.studentiID} 
                                onClick={(e) => handleStudentiDelete(e, studenti.studentiID)} 
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
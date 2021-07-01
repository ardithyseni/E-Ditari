import React, { SyntheticEvent, useState } from 'react';

import { Button, Item, Segment } from 'semantic-ui-react';
import { Profesori } from '../../../app/models/profesori';

interface Props {
    profesorat: Profesori[];
    selectProfesori: (id: string) => void;
    deleteProfesori: (id: string) => void;
    submittingProfesori: boolean;
}

export default function ProfesoriList({profesorat, selectProfesori,submittingProfesori , deleteProfesori}: Props) {
    
    const [target, setTarget] = useState('');

    function handleProfesoriDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteProfesori(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {profesorat.map(profesori =>(
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
                                <Button onClick={() => selectProfesori(profesori.profesoriID)} floated='right' content='View' color='blue' />
                                <Button 
                                name = {profesori.profesoriID}
                                loading = {submittingProfesori && target === profesori.profesoriID} 
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
}
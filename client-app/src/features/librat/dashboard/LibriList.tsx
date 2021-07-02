import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';


export default observer (function LibriList() {
    
    const{libriStore} = useStore();
    const {deleteLibri, librat, loading} = libriStore;


    const [target, setTarget] = useState('');

    function handleLibriDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteLibri(id);
    }

    
    
    return (
        <Segment>
            <Item.Group divided>
                {librat.map(libri =>(
                    <Item key={libri.id}>
                        <Item.Content>
                            <Item.Header as='a'>{libri.title}</Item.Header>
                            <Item.Meta>{libri.autori}</Item.Meta>
                            <Item.Description>
				                <div>{libri.category}</div>
				                
                              
                            </Item.Description>

                            <Item.Extra>
                                <Button onClick={() => libriStore.selectLibri(libri.id)} floated='right' content='View' color='blue' />
                                <Button 
                                name = {libri.id}
                                loading = {loading && target === libri.id} 
                                onClick={(e) => handleLibriDelete(e, libri.id)} 
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
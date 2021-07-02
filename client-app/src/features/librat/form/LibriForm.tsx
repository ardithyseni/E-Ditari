import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

import { useStore } from '../../../app/stores/store';


export default observer (function LibriForm(){

    const {libriStore} = useStore();
    const {selectedLibri, closeLibriForm, createLibri, updateLibri, loading} = libriStore;

    const initialState = selectedLibri ?? {
        id: '',
        autori: '',
        title: '',
	    description: '',
        category: ''
    }

    const [libri, setLibri] = useState(initialState);

    function handleSubmitLibri() {
        libri.id ? updateLibri(libri) : createLibri(libri);
    }

    function handleLibriInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setLibri({...libri, [name]: value})
    }

    return (
        <Segment clearing >
            <Form onSubmit={handleSubmitLibri} autoComplete='off'>
                <Form.Input placeholder = 'Titulli' value={libri.title} name='title' onChange={handleLibriInputChange}/>
                <Form.Input placeholder = 'Autori' value={libri.autori} name='autori' onChange={handleLibriInputChange} />
		        <Form.Input placeholder = 'Pershkrimi' value={libri.description} name='description' onChange={handleLibriInputChange} />
                <Form.Input placeholder = 'Kategoria' value={libri.category} name='category' onChange={handleLibriInputChange} />
            
                <Button loading = {loading} floated = 'right' positive type = 'submit' content ='Submit' />
                <Button onClick = {closeLibriForm} floated = 'right' type = 'button' content = 'Cancel' />
            </Form>
        </Segment>
    )
})
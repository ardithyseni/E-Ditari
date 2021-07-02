import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

import { useStore } from './../../../app/stores/store';

export default observer (function ProfesoriForm(){

        const {profesoriStore} = useStore();
        const {selectedProfesori, closeProfesoriForm, loading, createProfesori, updateProfesori} = profesoriStore;

    const initialState = selectedProfesori ?? {
        profesoriID: '',
        emri: '',
        mbiemri: '',
	    titulli: '',
        datelindja: '',
        adresa: '',
        numriKontaktues: '',
        email: ''
    }

    const [profesori, setProfesori] = useState(initialState);

    function handleSubmitProfesori() {
        profesori.profesoriID ? updateProfesori(profesori) : createProfesori(profesori);
    }

    function handleProfesoriInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setProfesori({...profesori, [name]: value})
    }

    return (
        <Segment clearing >
            <Form onSubmit={handleSubmitProfesori} autoComplete='off'>
                <Form.Input placeholder = 'Emri' value={profesori.emri} name='emri' onChange={handleProfesoriInputChange}/>
                <Form.Input placeholder = 'Mbiemri' value={profesori.mbiemri} name='mbiemri' onChange={handleProfesoriInputChange} />
		        <Form.Input placeholder = 'Titulli' value={profesori.titulli} name='titulli' onChange={handleProfesoriInputChange} />
                <Form.Input type ='date' placeholder = 'Ditelindja' value={profesori.datelindja} name='datelindja' onChange={handleProfesoriInputChange} />
                <Form.Input placeholder = 'Adresa' value={profesori.adresa} name='adresa' onChange={handleProfesoriInputChange} />
                <Form.Input placeholder = 'Numri Kontaktues' value={profesori.numriKontaktues} name='numriKontaktues' onChange={handleProfesoriInputChange} />
                <Form.Input placeholder = 'Email' value={profesori.email} name='email' onChange={handleProfesoriInputChange} />

                <Button loading = {loading} floated = 'right' positive type = 'submit' content ='Submit' />
                <Button onClick = {closeProfesoriForm} floated = 'right' type = 'button' content = 'Cancel' />
            </Form>
        </Segment>
    )
})
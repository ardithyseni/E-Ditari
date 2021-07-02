import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


export default observer (function StudentiForm(){

    const{studentiStore} = useStore();
    const {selectedStudenti, closeStudentiForm, createStudenti, updateStudenti, loading} = studentiStore;

    const initialState = selectedStudenti ?? {
        studentiID: '',
        emri: '',
        mbiemri: '',
        datelindja: '',
        adresa: '',
        numriKontaktues: '',
        email: ''
    }

    const [studenti, setStudenti] = useState(initialState);

    function handleSubmitStudenti() {
        studenti.studentiID ? updateStudenti(studenti) : createStudenti(studenti);
    }

    function handleStudentiInputChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setStudenti({...studenti, [name]: value})
    }

    return (
        <Segment clearing >
            <Form onSubmit={handleSubmitStudenti} autoComplete='off'>
                <Form.Input placeholder = 'Emri' value={studenti.emri} name='emri' onChange={handleStudentiInputChange}/>
                <Form.Input placeholder = 'Mbiemri' value={studenti.mbiemri} name='mbiemri' onChange={handleStudentiInputChange} />
                <Form.Input type ='date' placeholder = 'Ditelindja' value={studenti.datelindja} name='datelindja' onChange={handleStudentiInputChange} />
                <Form.Input placeholder = 'Adresa' value={studenti.adresa} name='adresa' onChange={handleStudentiInputChange} />
                <Form.Input placeholder = 'Numri Kontaktues' value={studenti.numriKontaktues} name='numriKontaktues' onChange={handleStudentiInputChange} />
                <Form.Input placeholder = 'Email' value={studenti.email} name='email' onChange={handleStudentiInputChange} />
                <Button loading = {loading} floated = 'right' positive type = 'submit' content ='Submit' />
                <Button onClick = {closeStudentiForm} floated = 'right' type = 'button' content = 'Cancel' />
            </Form>
        </Segment>
    )
})
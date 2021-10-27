import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingComponent from './../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';



export default observer (function StudentiForm(){

    const history = useHistory();

    const {studentiStore} = useStore();
    const {createStudenti, updateStudenti, loadingInitial, loading, loadStudenti} = studentiStore;
    const {id} = useParams<{id: string}>();

    const [studenti, setStudenti] = useState({
        studentiID: '',
        emri: '',
        mbiemri: '',
        datelindja: '',
        adresa: '',
        numriKontaktues: '',
        email: ''
    });

    useEffect(() => {
        if (id) loadStudenti(id).then(studenti => setStudenti(studenti!))
    }, [id, loadStudenti]);


    function handleSubmitStudenti() {
        if(studenti.studentiID.length === 0) {
            let newStudenti = {
                ...studenti,
                studentiID: uuid()
            };
            createStudenti(newStudenti).then(() => 
            history.push(`/studentat/${newStudenti.studentiID}`))

        } else {
            updateStudenti(studenti).then(() => 
            history.push(`/studentat/${studenti.studentiID}`))
        }

    }

    function handleStudentiInputChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setStudenti({...studenti, [name]: value})
    }

    if (loadingInitial) return <LoadingComponent content = 'Loading Studenti...'/>

    return (
        <Segment clearing >
            {/* <Header as='h1'>Shto Student</Header> */}
            <Form onSubmit={handleSubmitStudenti} autoComplete='off'>
                <Form.Input placeholder = 'Emri' value={studenti.emri} name='emri' onChange={handleStudentiInputChange}/>

                <Form.Input placeholder = 'Mbiemri' value={studenti.mbiemri} name='mbiemri' onChange={handleStudentiInputChange} />
                
                <Form.Input type ='date' placeholder = 'Ditelindja' value={studenti.datelindja} name='datelindja' onChange={handleStudentiInputChange} />
                
                <Form.Input placeholder = 'Adresa' value={studenti.adresa} name='adresa' onChange={handleStudentiInputChange} />
                
                <Form.Input placeholder = 'Numri Kontaktues' value={studenti.numriKontaktues} name='numriKontaktues' onChange={handleStudentiInputChange} />
                
                <Form.Input placeholder = 'Email' value={studenti.email} name='email' onChange={handleStudentiInputChange} />
                
                <Button as = {Link} to = '/studentat' loading = {loading} floated = 'right' positive type = 'submit' content ='Aktualizo' />
                <Button as = {Link} to = '/studentat' floated = 'right' type = 'button' content = 'Mbyll' />
            </Form>
        </Segment>
    )
})
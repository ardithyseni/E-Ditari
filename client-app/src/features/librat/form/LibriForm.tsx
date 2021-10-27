import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid';
import { useStore } from '../../../app/stores/store';


export default observer (function LibriForm(){
    const history = useHistory();
    const {libriStore} = useStore();
    const {createLibri, updateLibri, loading, loadLibri, loadingInitial} = libriStore;
    const {id} = useParams<{id:string}>();

    const [libri, setLibri] = useState({
        id: '',
        autori: '',
        title: '',
	    description: '',
        category: ''
    });

    useEffect(() => {
        if (id) loadLibri(id).then(libri => setLibri(libri!))
    }, [id, loadLibri]);

    function handleSubmitLibri() {
        if(libri.id.length === 0) {
            let newLibri = {
                ...libri,
                id: uuid()
            };
            createLibri(newLibri).then(() => history.push(`/librat/${newLibri.id}`))
        } else {
            updateLibri(libri).then(() => history.push(`/librat/${libri.id}`))
        }
    }

    function handleLibriInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setLibri({...libri, [name]: value})
    }

    if (loadingInitial) return <LoadingComponent content = 'Loading Studenti...'/>

    return (
        <Segment clearing >
            {/* <Header as='h1'>Shto Liber</Header> */}
            <Form onSubmit={handleSubmitLibri} autoComplete='off'>
                <Form.Input placeholder = 'Titulli' value={libri.title} name='title' onChange={handleLibriInputChange}/>
                <Form.Input placeholder = 'Autori' value={libri.autori} name='autori' onChange={handleLibriInputChange} />
		        <Form.Input placeholder = 'Pershkrimi' value={libri.description} name='description' onChange={handleLibriInputChange} />
                <Form.Input placeholder = 'Kategoria' value={libri.category} name='category' onChange={handleLibriInputChange} />
            
                <Button as={Link} to='/librat' loading = {loading} floated = 'right' positive type = 'submit' content ='Aktualizo' />
                <Button as={Link} to='/librat' floated = 'right' type = 'button' content = 'Mbyll' />
            </Form>
        </Segment>
    )
})
import React from 'react';
import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default function HomePage() {

    
        

    return (
        <Container style = {{marginTop: '7em'}}>
            <h1>Miresevini te E-Ditari</h1>
            <h3>Go to <Link to ='/studentat' >Studentat</Link></h3>
            <h3>Go to <Link to ='/profesorat' >Profesorat</Link></h3>
            <h3>Go to <Link to ='/librat' >Librat</Link></h3>
        </Container>
    )
}
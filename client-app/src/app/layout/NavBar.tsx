import React from 'react';
import { Button, Container, Menu, MenuItem } from 'semantic-ui-react';

interface Props {
    openStudentiForm: () => void;
    openProfesoriForm: () => void;
}

export default function NavBar({openStudentiForm, openProfesoriForm}: Props) {
    
    return (
        <Menu inverted fixed='top' >

            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.jpg" alt="logo" style = {{height: '50px', width: '50px', marginRight: '10px'}}/>
                    E-Ditari
                </Menu.Item>
                <Menu.Item name="Studentat" />
                 <Menu.Item>
                     <Button onClick = {openStudentiForm} positive content = 'Shto Student' />
                     <Button style = {{marginLeft: '20px' }} onClick = {openProfesoriForm} positive content = 'Shto Profesor' />
                     </Menu.Item>   
            </Container>

        </Menu>
    )
 }
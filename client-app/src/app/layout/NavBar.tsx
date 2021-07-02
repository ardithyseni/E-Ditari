import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from './../stores/store';


export default function NavBar() {
    
    const {studentiStore} = useStore();
    const {profesoriStore} = useStore();
    const {libriStore} = useStore();

    return (
        <Menu inverted fixed='top' >

            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.jpg" alt="logo" style = {{height: '50px', width: '50px', marginRight: '10px'}}/>
                    E-Ditari
                </Menu.Item>
                <Menu.Item name="Studentat" />
                 <Menu.Item>
                     <Button onClick = {() => studentiStore.openStudentiForm()} positive content = 'Shto Student' />
                     <Button style = {{marginLeft: '20px' }} onClick = {() => profesoriStore.openProfesoriForm()} positive content = 'Shto Profesor' />
                     <Button style = {{marginLeft: '20px' }} onClick = {() => libriStore.openLibriForm()} positive content = 'Shto Liber' />
                     </Menu.Item>   
                     
            </Container>

        </Menu>
    )
 }
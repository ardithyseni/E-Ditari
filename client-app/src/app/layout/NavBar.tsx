import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';


export default function NavBar() {
    
    return (
        <Menu inverted fixed='top' >

            <Container>
                <Menu.Item as= {NavLink} exact to='/' header>
                    <img src="/assets/logo.jpg" alt="logo" style = {{height: '50px', width: '50px', marginRight: '10px'}}/>
                    E-Ditari
                </Menu.Item>
                <Menu.Item as= {NavLink} to='/studentat' name='Studentat' />
                <Menu.Item as= {NavLink} to='/profesorat' name='Profesorat' />
                <Menu.Item as= {NavLink} to='/librat' name='Librat' />
                 <Menu.Item>
                     <Button as= {NavLink} to='/createStudenti' positive content = 'Shto Student' />
                     <Button style = {{marginLeft: '20px' }} as= {NavLink} to='/createProfesori' positive content = 'Shto Profesor' />
                     <Button style = {{marginLeft: '20px' }} as= {NavLink} to='/createLibri' positive content = 'Shto Liber' />
                     </Menu.Item>   
                     
            </Container>

        </Menu>
    )
 }
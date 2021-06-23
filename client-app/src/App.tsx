import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {

  const [studentat, setStudentat] = useState([]);
  const [profesorat, setProfesorat] = useState([]);

  useEffect(() => {   // accepts no parameters, per qata ()
    axios.get('http://localhost:5000/api/studentat').then(response => {
      console.log(response);  
      setStudentat(response.data);
    })
  }, []) // qiky [] siguron qe veq 1 here ekzekutohet

  useEffect(() => {   // accepts no parameters, per qata ()
    axios.get('http://localhost:5000/api/profesorat').then(response => {
      console.log(response);  
      setProfesorat(response.data);
    })
  }, []) // qiky [] siguron qe veq 1 here ekzekutohet

  return (
    <div>
      <Header as='h2' icon='users' content='Studentat'/>
              
        <List>
        {studentat.map((studenti: any) => (
            <List.Item key={studenti.id}>
              {studenti.emri}
            </List.Item>
          ))}
        </List>  
  
        <List>
          {profesorat.map((profesori: any) => (
            <List.Item key={profesori.id}>
              {profesori.emri}
            </List.Item>
          ))}
        </List>

    </div>
  );
}

export default App;

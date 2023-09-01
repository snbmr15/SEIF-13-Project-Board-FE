import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import '../stylesheets/home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { UserContext } from '../App';
import MainNavbar from './MainNavbar';
import Signup from './Signup';


const Home = () => {

    const {state, dispatch} = useContext(UserContext);   
    // const [selectedProject, setSelectedProject] = useState();
    
  return (
    <>
        {state
        ?
        <Container  className='background ' fluid>
          <MainNavbar />
        </Container>
        :
        <Container className='background2 ' fluid>
          <Signup/>
        </Container>
        }
    </>
  )
}

export default Home
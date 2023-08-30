import React from 'react'
import '../stylesheets/navbar.css'
import { Container, Navbar, Nav } from 'react-bootstrap';
import Todos from "./Todos";
import DisplayProjects from './DisplayProjects';
import Eventscalendar from './Eventscalendar';
import MyNotes from './MyNotes';
import Profile from './Profile';
import Notifications from './Notifications';

const MainNavbar = () => {

    return (
  
      <Navbar expand="md" fixed="top"  className='navbarMain'>
        <Container>
          <Navbar.Brand className='title' href="#home">Project-Board</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggleBtn1'/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navItems">
              <Nav.Link href="#todos" className='navLinks'><Todos/></Nav.Link>
              <Nav.Link href="#todos" className='navLinks'><MyNotes/></Nav.Link>
              <Nav.Link href="#projects" className='navLinks'><DisplayProjects/></Nav.Link>
              <Nav.Link href="#calendar" className='navLinks'><Eventscalendar/></Nav.Link>
              <Nav.Link href="#searchMembers" className='navLinks'><Notifications/></Nav.Link>         
              <Nav.Link href="#searchMembers" className='navLinks'><Profile/></Nav.Link>         
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    )
}

export default MainNavbar

import React, {useState, useLayoutEffect, useEffect} from 'react'
import '../stylesheets/eventsCalendar.css'
import { ListGroup, Modal } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';



const Eventscalendar = () => {
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const handleShow = () => {setFullscreen(true); setShow(true);}
    const [tasks, setTasks] = useState([]);
    const [projects, setProjects] = useState([]);
    const [allEvents, setAllEvents] = useState([]);
    

    const showTasks = async () =>{
        try {
        const token = (localStorage.getItem('User')).replace(/"/g, '')
        
        const response = await fetch('http://localhost:8080/tasks/showTasks', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
        console.log(data);
        setTasks(data);

        } catch (error) {
          console.log(error)
        }
      
  }


  const showProjects = async () =>{
    try {
      const response = await fetch('http://localhost:8080/project/getProjects', {
        method: 'GET',
    });

    const data = await response.json();

    setProjects(data)

    } catch (error) {
      console.log(error)
    }
  
}

  useEffect(() =>{
      showTasks();
      showProjects();
  },[])


  const createEvents = () =>{
    let events = [];

    for(let items of tasks){
        events.push({
            title: items.task,
            date: items.date.substring(0,10)
        })
  
    }

    for(let items of projects){
        events.push({
            title: items.projectTitle,
            date: items.dueDate.substring(0,10)
        })
    }

    console.log(events)
    setAllEvents(events)

  }


  useEffect(() =>{
    createEvents();
},[tasks, projects])

  return (
    <>
      <ListGroup.Item className='navList' onClick={handleShow}>
        <i className='fa fa-calendar'>&nbsp;</i>         
        {' '}
        Calendar View
      </ListGroup.Item>
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton className='modalHeader'>
          <Modal.Title>Due Projects & Tasks</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>

        <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin ]}
        initialView="dayGridMonth"
        events={allEvents}
        />
        
        </Modal.Body>
      </Modal>
    
    </>
  )
}

export default Eventscalendar
import React, {useState } from 'react'
import '../stylesheets/notes.css'
import { Container, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import URL_BE from "../config"


const CreateNotes = ({props}) => {

    const [showAlert, setShowAlert] = useState(false);
    const handleAlertClose = () =>{setShowAlert(false);}
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [noteTitle, setNoteTitle] = useState("");
    const [noteText, setNoteText] = useState("");
 
    const handleNoteSubmit = async (e) => {
        e.preventDefault();
    
        const form = e.currentTarget;
        // const { noteTitle, noteText } = e.target.elements;
        const formData = new FormData(form);

        const details = {
            noteTitle: formData.get('noteTitle'),
            noteText: formData.get('noteText')
        };
    
        console.log(details); // Add this line to log the details
    
        const token = localStorage.getItem('User').replace(/"/g, '');
        const response = await fetch(`${URL_BE}/notes/createNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(details),
        });
    
        const data = await response.json();
    
        if (response.status === 201 || 200 && data) {
            setAlertTitle("Alert");
            setAlertMessage("Note Created");
            setNoteTitle("");
            setNoteText("");
            props.setFecthTasks(data);
        } else {
            setAlertTitle("Alert");
            setAlertMessage("Something went wrong.");
        }
    
        form.reset();
    }
    
  return (
    <>
        <ListGroup.Item className='newProjectBtn' onClick={() => setModalShow(true)}>
            <i className='fa fa-plus'></i>
            {' '}
            Create Note         
        </ListGroup.Item> 
    
        <Modal size="lg" show={modalShow} onHide={() => setModalShow(false)} backdrop="static" keyboard={false} aria-labelledby="contained-modal-title-vcenter" centered >
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title>New Note</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBodyStatic'>
                <Container>
                    <Form method='POST' onSubmit={handleNoteSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" className='formInput' placeholder="Title" name="noteTitle" value={noteTitle} onChange={(e)=>setNoteTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Note</Form.Label>
                            <Form.Control as="textarea" className='formInput' rows={3} name="noteText" value={noteText} onChange={(e)=>setNoteText(e.target.value)} />
                        </Form.Group>
                        <Button className='saveBtn' variant="primary" type="submit">Save</Button>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
            </Modal.Footer>
        </Modal>




        {/* Alert Modal */}

        <Modal size="sm" show={showAlert} onHide={handleAlertClose} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title id="example-modal-sizes-title-sm">{alertTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBodyStatic'>
                <p>{alertMessage}</p>
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                <Button className='saveBtn' onClick={handleAlertClose}>Ok</Button> 
            </Modal.Footer>
        </Modal>
    
    </>
  )
}

export default CreateNotes
import React, { useState, useEffect } from 'react'
import '../stylesheets/notes.css'
import { Container, Form, Button, ListGroup, Modal } from 'react-bootstrap';
import URL_BE from "../config"


const UpdateNotes = ({ noteData }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');

  // Set form values when noteData changes
  useEffect(() => {
    if (noteData) {
      setNoteTitle(noteData.currentNote.noteTitle);
      setNoteText(noteData.currentNote.noteText);
    }
  }, [noteData]);

  const handleNoteSubmit = async (e) => {
    e.preventDefault();

    if (!noteTitle || !noteText) {
      setAlertTitle('Alert');
      setAlertMessage('Please fill the form correctly.');
      setShowAlert(true);
      return;
    }

    try {
      const token = localStorage.getItem('User').replace(/"/g, '');
      const response = await fetch(`${URL_BE}/notes/updateNote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ noteTitle, noteText, noteId: noteData.currentNote._id }),
      });

      const data = await response.json();

      if (response.status === 201 && data) {
        setAlertTitle('Alert');
        setAlertMessage('Note Updated');
        setShowAlert(true);
        setModalShow(false); // Close the modal
        noteData.setFecthTasks(data);
      } else {
        setAlertTitle('Alert');
        setAlertMessage('Failed to update note. Please try again.');
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error);
      setAlertTitle('Alert');
      setAlertMessage('An error occurred. Please try again later.');
      setShowAlert(true);
    }
  };

  return (
    <>
      <ListGroup.Item className='selectedListBtn' onClick={() => setModalShow(true)}>
        <i className='fa fa-edit'></i>
        <br />
        Edit Note
      </ListGroup.Item>

      <Modal
        size='lg'
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop='static'
        keyboard={false}
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton className='modalHeader'>
          <Modal.Title id='contained-modal-title-vcenter'>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBodyStatic'>
          <Container>
            <Form method='POST' onSubmit={handleNoteSubmit}>
              <Form.Group className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  className='formInput'
                  placeholder='Title'
                  name='noteTitle'
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Note</Form.Label>
                <Form.Control
                  as='textarea'
                  className='formInput'
                  rows={3}
                  name='noteText'
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                />
              </Form.Group>
              <Button className='saveBtn' variant='primary' type='submit'>
                Save
              </Button>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Alert Modal */}
      <Modal
        size='sm'
        show={showAlert}
        onHide={() => setShowAlert(false)}
        backdrop='static'
        keyboard={false}
        aria-labelledby='example-modal-sizes-title-sm'
      >
        <Modal.Header closeButton className='modalHeader'>
          <Modal.Title id='example-modal-sizes-title-sm'>{alertTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBodyStatic'>
          <p>{alertMessage}</p>
        </Modal.Body>
        <Modal.Footer className='modalFooter'>
          <Button className='saveBtn' onClick={() => setShowAlert(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateNotes;

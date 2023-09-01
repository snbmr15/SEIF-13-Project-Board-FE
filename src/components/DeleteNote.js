import React, {useState, useLayoutEffect, useEffect} from 'react'
import '../stylesheets/notes.css'
import { Button, ListGroup, Modal } from 'react-bootstrap';



const DeleteNote = ({noteData}) => {

    const [showAlert, setShowAlert] = useState(false);
    const handleAlertClose = () =>{setShowAlert(false);}
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const [noteId, setNoteId] = useState("");

    const setNoteForm = () =>{
        if(noteData){
            setAlertTitle(noteData.currentNote.noteTitle);
            setAlertMessage('Click on "Delete" button will permanently delete the selected note.');
            setNoteId(noteData.currentNote._id);
        }
    }

    useEffect(()=>{
        setNoteForm();
    },[]);


    const handleDeleteBtn = async () =>{

        if(alertTitle && noteId){
            try {
                const token = (localStorage.getItem('User')).replace(/"/g, '')
                const response = await fetch('http://localhost:8080/notes/deleteNote', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type' : 'application/json',
                        Authorization: `Bearer ${token}` 
                    },
                    body: JSON.stringify({noteId}),
                })
    
                const data = await response.json();
    
                if(response.status === 201 && data){
                    setShowAlert(false);
                    noteData.setFecthTasks(data);
                }
            } catch (error) {
                console.log(error)
            }
        }else{
            setAlertTitle("Alert");
            setAlertMessage("Please fill the form correctly.");
            setShowAlert(true);
        }

    }


  return (
    <>

    {/* Alert Modal */}
        <ListGroup.Item className='selectedListBtn' onClick={() => setShowAlert(true)}>
          <i className='fa fa-trash'></i>         
          <br></br>
          Delete Note
        </ListGroup.Item>

        <Modal size="sm" show={showAlert} onHide={handleAlertClose} backdrop="static" keyboard={false} aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title id="example-modal-sizes-title-sm">{alertTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBodyStatic'>
                <p>{alertMessage}</p>
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                {noteId ?
                    <Button className='saveBtn' onClick={handleDeleteBtn}>Delete</Button> 
                :
                    <Button className='saveBtn' onClick={handleAlertClose}>Ok</Button> 
                }
            </Modal.Footer>
        </Modal>
    
    </>
  )
}

export default DeleteNote
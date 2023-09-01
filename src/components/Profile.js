import React, {useState, useContext, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import '../stylesheets/profile.css'
import { Row, Col, Container, Button, ListGroup, Modal } from 'react-bootstrap';
import image_S1 from '../images/abstract10.png'
import { UserContext } from '../App'

const Profile = () => {

    const {state, dispatch} = useContext(UserContext); 
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();

    const handleSignOut = async () =>{

        try{
            const response = await fetch("http://localhost:8080/users/userSignOut", {
                method: "GET",
            });
            let data = await response.json();

            if(response.status === 201 || 200 && data){
                localStorage.removeItem("User")
                dispatch(
                    {
                        type: "USER",
                        payload: null
                    }
                )      
                navigate("/login");
            }
        } catch(error){
            console.log(error)
        }

    }

  return (
    <>
        <ListGroup.Item className='navList' onClick={()=>setShowAlert(true)}>
            <i className='fa fa-user-circle'>&nbsp;</i>         
            {' '}
            Profile
        </ListGroup.Item>

        <Modal size="sm" show={showAlert} onHide={()=>setShowAlert(false)} aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title id="example-modal-sizes-title-sm">Sign Out?</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBodyStatic'>
                <Button className='saveBtn' onClick={handleSignOut}>SignOut</Button>      
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                
            </Modal.Footer>
        </Modal>
    
    </>
  )
}

export default Profile
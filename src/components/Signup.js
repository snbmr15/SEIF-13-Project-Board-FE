import React, {useState, useContext, useEffect, useRef  } from 'react'
import {useNavigate} from "react-router-dom";
// import { GoogleLogin } from "react-google-login";
import '../stylesheets/login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Container, Form, Button, Modal } from 'react-bootstrap';

import { UserContext } from '../App';
import WatchVideo from './WatchVideo';

const Signup = () => {

    const {state, dispatch} = useContext(UserContext);
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    // const [userImage, setUserImage] = useState();

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => setShowModal(false);

    const [showAlertForm, setShowAlertForm] = useState(false);
    const handleAlertFormClose = () =>{setShowAlertForm(false);}

    const [showAlert, setShowAlert] = useState(false);
    const handleAlertClose = () =>{setShowAlert(false);}



    const handleSinginSubmit = async (e) =>{
        e.preventDefault();

        if(email && userPassword){
            try {
                const response = await fetch('http://localhost:8080/signInUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json' 
                    },
                    body: JSON.stringify({email, userPassword}),
                });
    
                const data = await response.json();

                if(response.status === 201 && data){
                    console.log(data)
                    dispatch({type: "USER", payload: data});
                    navigate("/")
                    window.location.reload();
                }
                else{
                    setAlertTitle("Alert")
                    setAlertMessage(data.message);
                    setShowAlert(true);
                }
                
            } catch (error) {
                console.log(error);
            }
        }
        else{
            setAlertTitle("Alert")
            setAlertMessage("Please fill the form correctly");
            setShowAlert(true);
        }
    }


    const handleSingupSubmit = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;

        let nameRegEx = /^[A-Za-z\s]*$/.test(name);
        let checkName = name.length > 0 && name.length < 15;
        let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
        let checkPass = userPassword.length > 7;
        // let checkCnfrmPass = userCnfrmPass.length > 7;
        // let checkBothPass = userPassword === userCnfrmPass;

        if(checkName && nameRegEx && emailRegEx && checkPass){
            
            let formData = new FormData();
            
            formData.append('userName', name);
            formData.append('userEmail', email);
            formData.append('userPassword', userPassword);
            console.log(formData);

            try {
                const response = await fetch("http://localhost:8080/createNewUser", {
                    method: "POST",
                    body: formData
                });
                console.log(response);
                const data = await response.json();

                if(response.status === 201 && data){
                    setAlertTitle("Alert")
                    setAlertMessage(data.message);
                    setShowAlert(true);

                    setName("");
                    setEmail("");
                    setUserPassword("");
                    form.reset();
                    setShowModal(false);
                }

            } catch (error) {
                console.log(error);
            }

        }
        else{
            setShowAlertForm(true);
        }

    }




    return (
        <>
            <Container  className='background2' fluid>
                <Container className='signInCont'>
                    <Row>
                        <Container className='headingCont'>
                            <h2>SignIn</h2> 
                        </Container>
                    </Row>
                    <Row>
                        <Container className='signinFormCont'>
                            <Form method='POST' onSubmit={handleSinginSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" className='formInput' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" className='formInput' value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} placeholder="Password" />
                                </Form.Group>
                                <br></br>
                                <Form.Group className="mb-3" >
                                    <Button className='formSignInBtn' variant="primary" type="submit" >
                                        Signin
                                    </Button>
                            </Form.Group> 
                            </Form>
                        </Container>
                    </Row>
                    <br></br>
                    <Row>
                        <Container className='headingCont'>
                            <p className='accountTxt'>Need an account? <i className='signUpTxt' onClick={()=>setShowModal(true)}>Sign Up</i></p>
                        </Container>
                    </Row>
                    <br></br>
                    <Row>
                        <Container className='headingCont'>
                            <p className='accountTxt'>See how it works <WatchVideo/></p>
                        </Container>
                    </Row>
                </Container>







                {/* Signup Modal */}


                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton className='modalHeader'>
                        <Modal.Title>Signup</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='modalBody'>
                        <Form method='POST' onSubmit={handleSingupSubmit}>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" className='formInput' value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Enter your full name" />
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" className='formInput' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" className='formInput' value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} placeholder="Password" />
                            </Form.Group>
                                <br></br>
                            <Form.Group className="mb-3" >
                                <Button className='formSignInBtn' variant="primary" type="submit" >
                                    Signup
                                </Button>
                            </Form.Group> 
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>





             {/* Alert Form Modal */}

             <Modal size="sm" show={showAlertForm} onHide={handleAlertFormClose} aria-labelledby="example-modal-sizes-title-sm">
            <Modal.Header closeButton className='modalHeader'>
                <Modal.Title id="example-modal-sizes-title-sm">Instructions</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBodyStatic'>
                <p>Please fill the form correctly.</p>
                <p>Name must be less then 15 characters.</p>
                <p>Password should be atleast 8 characters.</p>
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                <Button className='saveBtn' onClick={handleAlertFormClose}>Ok</Button> 
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

export default Signup

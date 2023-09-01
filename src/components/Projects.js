import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import "../stylesheets/projects.css"
import {Container, Form, Button, Row, Col, Modal, ListGroup, InputGroup } from 'react-bootstrap';
import image_S1 from '../images/abstract10.png'


const Projects = ({props}) => {

    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const handleShow = () => {setFullscreen(true); setShow(true);}
    const [smShow, setSmShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const handleAlertClose = () =>{setShowAlert(false);}
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    // const [desigModal, setDesigModal] = useState(false);
    // const [phaseModal, setPhaseModal] = useState(false);
    // const [phaseUpdateModal, setPhaseUpdateModal] = useState(false);
    // const [txtInput, setTxtInput] = useState("");
    // const [projectPhases, setProjectPhases] = useState([]);
    // const [allfriends, setAllfriends] = useState([]);
    // const [friends, setFriends] = useState([]);
    // const [members, setMembers] = useState([]);
    // const [membersIds, setMembersIds] = useState([]);
    // const [designationInput, setDesignationInput] = useState();
    // const [phaseInput, setPhaseInput] = useState("");
    // const [phaseEditInput, setPhaseEditInput] = useState("");
    // const [desigId, setDesigId] = useState("");
    const [projectSelected, setProjectSelected] = useState();

    const [projectDetails, setProjectDetails] = useState({
        projectTitle : "",
        projectDiscription : "",
        startDate : "",
        dueDate : "",
        projectType : "",
    });

    let name, value;

    const handleInputs = (e) =>{ 
        const { name, value } = e.target;
        setProjectDetails({...projectDetails, [name]:value});
    }
    

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        
        let formData = new FormData();
        formData.append('projectTitle', projectDetails.projectTitle)
        formData.append('projectDiscription', projectDetails.projectDiscription)
        formData.append('startDate', projectDetails.startDate)
        formData.append('dueDate', projectDetails.dueDate)
        formData.append('projectType', projectDetails.projectType)
        
        if(
            projectDetails.projectTitle &&
            projectDetails.startDate &&  
            projectDetails.dueDate && 
            projectDetails.projectDiscription && 
            projectDetails.projectType
            ) {
            try {
                const token = (localStorage.getItem('User')).replace(/"/g, '')
                const response = await fetch("http://localhost:8080/project/createNewProject", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                      },
                    body: formData
                      
                });

                const data = await response.json();

                if(response.status === 201 && data){
                    setProjectDetails({
                        projectTitle : "",
                        projectDiscription : "",
                        startDate : "",
                        dueDate : "",
                        projectType : "",
                    })
                    form.reset();

                    setAlertTitle("Alert");
                    setAlertMessage("Project created.");
                    setShowAlert(true);
                    props.setFecthTasks(data);
                    setShow(false);
                }
                
            } catch (error) {
                console.log(error);
            }
            
        }
        else{
            setAlertTitle("Alert")
            setAlertMessage("Please fill all the fields.");
            setShowAlert(true);
        } 

    }


    // const getFriends = async () =>{
    //     try {
    //         const response = await fetch('http://localhost:8080/friends/getFriendRequests', {
    //             method: 'GET',
    //         })

    //         const data = await response.json();
    //         console.log(data)
    //         setAllfriends(data);
    //         setFriends(data);

    //     } catch (error) {
    //         console.log(error)
    //     }

    // }

    // useEffect(() => {
    //     getFriends();
    // },[])



    // const handelDesigInput = (e) =>{
    //     let input = e.target.value

    //     setDesignationInput(input)

    //     console.log(designationInput)
    // }



    // const showSearchResult = () =>{

    //     if(txtInput === ""){
            
    //         setAllfriends(friends) 
    //     }
    //     else{
    //         let newList = allfriends.filter((element) =>{
    //             return element.name.toLowerCase().includes(txtInput.toLowerCase())
    //         })

    //         setAllfriends(newList) 
    //     }

    // }


    // useEffect(()=>{
    //     showSearchResult();
    // },[txtInput])

    // const handelChange = (e) =>{
    //     setTxtInput(e.target.value)
    //     showSearchResult();
    // }


    

    // const addMember = (e) =>{
    //     let id = e.target.id;

    //     if(projectSelected){
    //         let getProfile = members.find(element => element._id === id);
    //         if(getProfile){
    //             projectSelected.members.map((element)=>{
    //                 if(element.memberRef === id){
    //                     window.alert("Existing Member")
    //                 }
    //             })
    //         }
    //         else{
    //             let getProfile = allfriends.find(element => element._id === id);
        
    //         setMembersIds(membersIds => [...membersIds, getProfile._id])
    
    //         setMembers(members => [...members, getProfile])
    
    
    //         const newList = allfriends.filter(friendId => {
    //             return friendId._id !== id;
    //         })
            
    //         setAllfriends(newList) 
    //         }
           
           
    //     }
    //     else{
    //         let getProfile = allfriends.find(element => element._id === id);
        
    //         setMembersIds(membersIds => [...membersIds, getProfile._id])
    
    //         setMembers(members => [...members, getProfile])
    
    
    //         const newList = allfriends.filter(friendId => {
    //             return friendId._id !== id;
    //         })
            
    //         setAllfriends(newList)  
    //     }

             
        
    // }

    // const removeMember = (e) =>{
    //     let id = e.target.id;

    //     let getProfile = members.find(element => element._id === id);
    //     let getfriends = allfriends.find(element => element._id === id);

    //     if(!getfriends){
    //         console.log("done")
    //         setAllfriends(allfriends => [...allfriends, getProfile])
    //     }
        

    //     const newList = members.filter(friendId => {
    //         return friendId._id !== id;
    //     })

    //     const newIds = membersIds.filter(ids => {
    //         return ids !== id
    //     })
    //     setMembersIds(newIds)
    //     setMembers(newList)

    // }

    const handleHideModal = () =>{
        setShow(false);
        setProjectSelected(null);
    }



//     const changeDesig = (e) =>{
//         setDesigId(e.target.id )
//         setDesigModal(true)
//     }

//     const handleDeisgBtn = () =>{
//         console.log(designationInput)
//         let desigTag = document.getElementById(desigId)
//         desigTag.innerText = designationInput
//         setDesigModal(false)
//         // console.log(desigTag.innerText)
//     }



//     const handlePhasesInput = (e) =>{
//         const form = e.currentTarget;
//         e.preventDefault();
       

//         console.log(phaseInput)
        
//         if(projectPhases.length <= 9 && phaseInput){
//             let checkPhase = projectPhases.find(element1 => element1 === phaseInput);
//             if(checkPhase){
//                 setAlertTitle("Alert")
//                 setAlertMessage("Phase title already exist, Choose a different title.");
//                 setShowAlert(true);
//             }
//             else{
//                 if(phaseInput){
//                     setProjectPhases(projectPhases => [...projectPhases, phaseInput])
//                 }
//                 else{
//                     return;
//                 }  
//             }
//         }
//         else{
//             setAlertTitle("Alert")
//             setAlertMessage("Please add minimum 1 or maximum 10 phases per project.");
//             setShowAlert(true);
//         }
        
        
//         setPhaseInput("")
//         form.reset();
//     }

//     const removePhase = (e) =>{
//         let phaseName = e.target.id;
//         let removeSelectedPhase = projectPhases.filter(element1 => element1 !== phaseName);
//         setProjectPhases(removeSelectedPhase)
//     }


//     const editPhase = (e) =>{
//         let phaseName = e.target.id;
//         setPhaseEditInput(phaseName)
//         setPhaseUpdateModal(true)
//         console.log(phaseName)
//     }

//    const handlePhaseUpdate = (e) =>{
//         const form = e.currentTarget;
//         e.preventDefault();

//         const index = projectPhases.indexOf(phaseEditInput);
//         projectPhases[index] = phaseInput;

//         setPhaseInput("")
//         form.reset();
//         setPhaseUpdateModal(false)
//    }




  return (
    <>
        <ListGroup.Item className='newProjectBtn' onClick={handleShow}>
            <i className='fa fa-plus'></i>
            {' '}
            Create Project         
        </ListGroup.Item>
     
      <Modal show={show} fullscreen={fullscreen} onHide={handleHideModal}>
        <Modal.Header closeButton className='modalHeader'>
            <Modal.Title>Create New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modalBody'>
            <Form method='POST' onSubmit={handleSubmit} className='contactForm' name='projectForm' id='projectForm'>
                <Container className='formCont'>
                <Row>
                    <Col>
                    <Form.Group className="mb-3" >
                        <Form.Label >Title</Form.Label>
                        <Form.Control type="text" name='projectTitle' className='formInput' id='projectTitle' value={projectDetails.projectTitle} onChange={handleInputs} placeholder="Enter Project Title" />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group className="mb-3 inputGroup" >
                        <Form.Label >Type</Form.Label>
                        <Form.Select name='projectType' id='projectType' onChange={handleInputs} value={projectDetails.projectType} className='formInput'>                
                            <option className='listOption' value='N/A'>N/A</option>               
                            <option className='listOption' value='Personal'>Personal</option>               
                            <option className='listOption' value='Team'>Team</option>              
                        </Form.Select>
                    </Form.Group>
  
                </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name='projectDiscription' className='formInput'id='projectDiscription' value={projectDetails.projectDiscription} onChange={handleInputs}/>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                <Col>
                <Form.Group className="mb-3 inputGroup" >
                    <Form.Label >Start Date</Form.Label>
                    <Form.Control type="date" name='startDate' id='startDate' className='formInput' value={projectDetails.startDate} onChange={handleInputs} placeholder="date" />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3 inputGroup" >
                    <Form.Label >Due Date</Form.Label>
                    <Form.Control type="date" name='dueDate' id='dueDate' className='formInput' value={projectDetails.dueDate} onChange={handleInputs} placeholder="date" />
                </Form.Group>
                </Col>
                </Row>
                {/*}
                <Row>
                    <Col>
                        <Form.Label>Add Project Phases</Form.Label><Button className="addMembers" onClick={()=>setPhaseModal(true)}><i className="fa fa-plus"></i></Button>
                        <ListGroup variant="flush" className='teamlist'>

                        {projectPhases.map((element, index)=>
                            <ListGroup.Item as="li" key={index} className='phaseListItem'>
                                <Container>
                                    <Row>
                                        <Col sm lg={8}> Phase {index + 1} {element}  </Col>
                                        <Col sm lg={2}>  <i className="fa fa-edit phaseEditBtn" id={element} onClick={editPhase}></i>  <br></br> </Col>
                                        <Col sm lg={2}> <i className="fa fa-trash phaseTrashBtn" id={element} onClick={removePhase}></i>   </Col>
                                    </Row>
                                </Container>
                            </ListGroup.Item>
                        )}

                        </ListGroup>                
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col>
                    <Form.Label>Add Team Members </Form.Label><Button className="addMembers" onClick={()=>setSmShow(true)}><i className="fa fa-plus"></i></Button>
                    <ListGroup variant="flush" className='teamlist'>
                        {members.map( (members, index) =>
                            <ListGroup.Item as="li" key={index}  className="d-flex justify-content-between align-items-start phaseListItem" >
                                <Container>
                                <Row className="justify-content-md-center">
                                    <Col lg="3">
                                        <img 
                                            src={members.image}
                                            onError={(e)=>{e.target.onError = null; e.target.src = image_S1}}
                                            className="profileImages imageFloat"
                                        />
                                    </Col>
                                    <Col lg="3">
                                        <p className='memberListName'>{members.name}</p>
                                    </Col>
                                    <Col lg="4">
                                        Designation:
                                    <InputGroup className="mb-3 ">
                                        <Form.Control
                                            placeholder="Enter Designation"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            id={members._id}
                                            className="formInput"
                                            onChange={handelDesigInput}
                                        />
                                    </InputGroup>
                                    </Col>
                                    <Col lg="2">
                                        <i className="fa fa-trash phaseTrashBtn" id={members._id} onClick={removeMember}></i>
                                    </Col>
                                    
                                </Row>
                                </Container>
                            </ListGroup.Item>
                        )}
                        </ListGroup>
                        </Col>
                    </Row>
                    */}
                    <br></br>
                    <Row className="justify-content-md-center">            
                        <Col sm lg={5}>
                            <Button className='projectSubmitBtn' variant="primary" type="submit">
                                Create Project
                            </Button>
                        </Col>
                    </Row>
                    
                </Container>
            </Form>
            <br></br>
            <br></br>
        </Modal.Body>
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

export default Projects
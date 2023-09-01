import React, {useState, useEffect, useContext } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import "../stylesheets/todoForm.css"
import {Container, Form, Button, Row, Col, Modal, ListGroup } from 'react-bootstrap';
import { UserContext } from '../App';
import URL_BE from "../config";


const TodoForm = ({clickedTask}) => {
    
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const handleAlertClose = () =>{setShowAlert(false);}
    const [alertMessage, setAlertMessage] = useState("");
    const [alertTitle, setAlertTitle] = useState("");
    const [smShow, setSmShow] = useState(false);
    const [taskCat, setTaskCat] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [taskForUpdate, setTaskForUpdate] = useState();
    const [defaultCat, setDefaultCat] = useState([
        {category: 'Default'},
        {category: 'Personal'},
        {category: 'Important'}
    ]);
    // let markTask = clickedTask.taskUpdate;

    // const { state } = useContext(UserContext);

    const showCategories = async () => {
        try {
            const token = (localStorage.getItem('User')).replace(/"/g, '')
            const response = await fetch(`${URL_BE}/taskCat/getAllTaskCategories`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setTaskCat(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() =>{
        showCategories();
    },[])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const form = e.currentTarget;
        const {task, date, category } = e.target.elements;

        let details = {
            task: task.value,
            date: date.value,
            category: category.value,
            taskStatus: "Pending"
        }

        console.log(details); // Add this line to log the details

        const token = (localStorage.getItem('User')).replace(/"/g, '')
        
        const response = await fetch(`${URL_BE}/tasks/addNewTask`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
            body: JSON.stringify(details),
          });

        let data = await response.json();

        if(response.status === 400 || !data){
            setAlertTitle("Alert")
            setAlertMessage("Something went wrong.");
            setShowAlert(true);
        }
        else{
            setAlertTitle("Alert")
            setAlertMessage("Task added successfully.");
            setShowAlert(true);
            showCategories();
            clickedTask.setFecthTasks(data);
        }
        setTaskForUpdate(null); 
        form.reset();
        
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        const formData = new FormData(form);

        const currentTaskData = taskForUpdate;

        const details = {
          task: formData.get('task') || currentTaskData.task, // Make sure this matches the name attribute
          date: formData.get('date'), // Make sure this matches the name attribute
          category: formData.get('category') || currentTaskData.category, // Make sure this matches the name attribute
          taskStatus: currentTaskData.taskStatus || formData.get('updateStatus'), // Keep the current taskStatus
          id: currentTaskData._id, // Use the current task's ID
        };
        
        const token = (localStorage.getItem('User')).replace(/"/g, '')
        const response = await fetch(`${URL_BE}/tasks/updatingTask`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
            body: JSON.stringify(details),
          });

        let data = await response.json();

        if(response.status === 400 || !data){
            setAlertTitle("Alert")
            setAlertMessage("Something went wrong.");
            setShowAlert(true);
            
        }
        else {
            setAlertTitle("Alert")
            setAlertMessage("Task updated successfully.");
            setShowAlert(true);
            clickedTask.setFecthTasks(data);
            setTaskForUpdate(null);
            
        }
        form.reset();
    }


    useEffect(()=>{
        setTaskForUpdate(clickedTask.taskUpdate);
    },[clickedTask.taskUpdate])



    const addCategory = async (e) =>{
        e.preventDefault();

        const {categoryInput} = e.target.elements;

        let newcategory = {
            name: categoryInput.value
        }
        
        const token = (localStorage.getItem('User')).replace(/"/g, '')
        const response = await fetch(`${URL_BE}/taskCat/createTaskCategory`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
            body: JSON.stringify(newcategory),
          });
        
        let data = await response.json();

        if(response.status === 400 || !data){
            setAlertTitle("Alert")
            setAlertMessage("Something went wrong.");
            setShowAlert(true);
        }
        else {
            setAlertTitle("Alert")
            setAlertMessage("Category added successfully.");
            setShowAlert(true);
            // window.location.reload(false);

            // Update the taskCat state with the new category
            setTaskCat((prevTaskCat) => [...prevTaskCat, data]);
        }
        categoryInput.value = "";
    }


    const deleteCat = async (e) => {
        let catName = e.target.id;
        console.log(catName);
        
        try {
            const token = (localStorage.getItem('User')).replace(/"/g, '');
            const response = await fetch(`${URL_BE}/taskCat/deleteTaskCategory/${catName}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            if (response.status === 200) {
                const newData = await response.json();
                setTaskCat(newData);
            } else {
                console.log('Error deleting category');
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    
    const handleDeleteTask = async (e) =>{
        let taskName = e.target.id;
        try {
            const token = (localStorage.getItem('User')).replace(/"/g, '')
            const response = await fetch(`${URL_BE}/tasks/deletingSelectedTask/${taskName}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                // body: JSON.stringify({taskName}),
            })
    
            let data = await response.json();
            if(response.status === 201 && data){
                setAlertTitle("Alert")
                setAlertMessage(data.message);
                setShowAlert(true);
                clickedTask.setFecthTasks(data);
                setTaskForUpdate(null);
            }
    
        } catch (error) {
            console.log(error)
        }
    }


  return (
    <>
        <Container className='todoFormContainer'> 
            <Modal size="sm" show={smShow} onHide={() => setSmShow(false)} aria-labelledby="example-modal-sizes-title-sm" >
            <Modal.Header closeButton className='modalHeader'>
            <Modal.Title id="example-modal-sizes-title-sm">
                Add New Category
            </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modalBody'>
                <Container>
                <Row >
                    <Col>
                        <Form method='POST' onSubmit={addCategory}> 
                            <Form.Group className="mb-3 taskForm" >
                                <Container>
                                    <Row className="justify-content-md-center">
                                        <Col sm lg={10} >
                                            <Form.Control type="text" id='categoryInput' className='formInput' placeholder="Enter Category" />
                                        </Col>
                                        <Col sm lg={2}>
                                            <Button className='categoryBtn' variant="primary" type="submit" >
                                                <i className="fa fa-plus"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form.Group>
                            
                        </Form>
                    </Col>
                </Row>
                <Row>
                              <Col>
                                  <ListGroup variant="flush" >
                                      <ListGroup.Item className='todosList'>Default</ListGroup.Item>
                                      <ListGroup.Item className='todosList'>Personal</ListGroup.Item>
                                      <ListGroup.Item className='todosList'>Important</ListGroup.Item>
                                      {taskCat.map((taskCat, index) =>
                                          <ListGroup.Item className='todosList' key={index}>
                                              {taskCat.category} <i className="fa fa-trash trashBtn" id={taskCat._id} onClick={deleteCat}></i>
                                          </ListGroup.Item>
                                      )}
                                  </ListGroup>
                              </Col>
                </Row>
                </Container>
            </Modal.Body>
            </Modal>

        {taskForUpdate ?
            <Form method='POST' onSubmit={handleUpdate} className='contactForm' >
                <Container>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label className='formTxt'>Update Task</Form.Label>
                                <Form.Control type="text" className='formInput' id='updateTask' defaultValue={taskForUpdate.task} placeholder="Enter Task" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3 inputGroup" >
                                <Form.Label className='formTxt'>Due Date</Form.Label>
                                <Form.Control type="date" id='updateDate' className='formInput' defaultValue={taskForUpdate.date} placeholder="date" />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3 inputGroup" >
                                <Form.Label className='formTxt'>Category</Form.Label>
                                    <Form.Select id='updateCategory' className='formInput' aria-label="Default select example">  
                                        <option className='listOption' >{taskForUpdate.category}</option> 
                                            {taskCat.map( (taskCat, index) => {
                                                return taskCat.category !== taskForUpdate.category ?
                                                <option className='listOption' key={index} >{taskCat.category}</option> 
                                            :
                                                null  
                                            })}

                                            {defaultCat.map((defaultCat, index) => {
                                                return defaultCat.category !== taskForUpdate.category ?
                                                <option className='listOption'  key={index} >{defaultCat.category}</option> 
                                            :
                                                null 
                                            })}                   
                                    </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row >
                        <Col >
                            <Form.Group className="mb-3" >
                                <Form.Label className='formTxt'>Submit</Form.Label>
                                <Button className='updateBtn' variant="primary" type="submit" >
                                    <i className="fa fa-check"></i> 
                                </Button>
                            </Form.Group>
                            <Form.Group className="mb-3" >
                                <Form.Label className='formTxt'>Status</Form.Label>
                                <Form.Select name="updateStatus" id='updateStatus' className='formInput' aria-label="Default select example"> 
                                    <option value="Pending" className='listOption'>Pending</option>
                                    <option value="Completed" className='listOption'>Completed</option>                
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label className='formTxt'>Delete</Form.Label>
                                <Button className='updateBtn' variant="primary" id={taskForUpdate._id} onClick={handleDeleteTask} >
                                    <i className="fa fa-trash"></i> 
                                </Button>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Form>

            :


            <Form method='POST' onSubmit={handleSubmit} className='contactForm' >
                <Container>
                    <Row className="justify-content-md-center">
                        <Col>
                            <Form.Group className="mb-3" >
                                <Form.Label className='formTxt'>Task</Form.Label>
                                <Form.Control type="text" id='task' className='formInput' placeholder="Enter Task" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col sm lg="6">
                            <Form.Group className="mb-3 inputGroup" >
                                <Form.Label className='formTxt'>Due Date</Form.Label>
                                <Form.Control type="date" id='date' className='formInput' placeholder="date" />
                            </Form.Group>
                        </Col>
                        <Col sm lg="6">
                            <Form.Group className="mb-3 inputGroup" >
                                <Form.Label className='formTxt'>Category</Form.Label>
                                <Button className="addCatBadge" onClick={() => setSmShow(true)}><i className="fa fa-plus" ></i></Button>
                                <Form.Select id='category' className='formInput' aria-label="Default select example">  
                                    <option className='listOption'>Default</option>               
                                    <option className='listOption'>Personal</option>               
                                    <option className='listOption'>Important</option>               
                                    {taskCat.map( (taskCat, index) =>
                                        <option className='listOption' key={index}>{taskCat.category}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col sm lg="6">
                            <Button className='submitBtn' variant="primary" type="submit" ><i className="fa fa-plus"></i></Button>                
                        </Col>
                    </Row>
                </Container>
            </Form>
            }
        </Container>




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

export default TodoForm
import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addCategory, deleteCategory, getAllCategory, getVideoDetails, updateCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoCard from './VideoCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function Category() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[isDelete,setisDelete]=useState([]);
    const[allCategory,setAllCategory]=useState([])
    const [category,setCategory]=useState({
      id:"",
      categoryName:"",
      allVideos:[]
    })
    const getCategoryFromDB=async()=>{
      const response = await getAllCategory();
      console.log("=====data category===");
      console.log(response)
      const { data } = response;
      setAllCategory(data);
    }
    useEffect(()=>{
      getCategoryFromDB();
    },[isDelete])
    const uploadCategory= async()=>{
      const { id, categoryName } = category;
    if (!id || !categoryName) {
      toast.warning("Please fill the form completely")
    }
    else {
      const response = await addCategory(category);
      console.log(response);
      if (response.status == 201) {
        toast.success(`${response.data.categoryName} is successfully uploaded`);
        handleClose();
      }
      else {
        toast.error("Something went wrong")
      }
    }
    }
    const deleteCategoryItem=async(id)=>{
      const response = await deleteCategory(id)
      setisDelete(response)
      
    }
    const dragOver=(e)=>{
      e.preventDefault();
      console.log("===dragOver===");
    }
    const videoDrop=async(e,id)=>{
      console.log(`video card need to be placed in card with id ${id}`);
      const videoid=e.dataTransfer.getData('VideoId');
      console.log(`video id with id ${videoid} need to be placed in category with id ${id}`);
      const response = await getVideoDetails(videoid);
      const {data}=response;
      console.log("video Details");
      console.log(data);
      const selectedCategory=allCategory?.find((item)=>item.id==id);
      console.log("selected Category",selectedCategory);
      selectedCategory.allVideos.push(data);
      console.log("===selected category with dragged video details===");
      console.log(selectedCategory);
      await updateCategory(id,selectedCategory);
      getCategoryFromDB();

    }
  return (
    <>
    <div>
        <button className='btn btn-warning' onClick={handleShow}> Add New Category</button>
    </div>
    {
      allCategory.length>0?
      allCategory.map((item)=>(
    
    <div className='d-grid' style={{width:"275px"}} droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item.id)}>
    <div className='m-5 border border-secondary rounded p-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <h6>{item.categoryName}</h6>
        <button className='btn btn-danger'> <i class="fa-solid fa-trash" onClick={()=>deleteCategoryItem(category.id)}></i></button>
      </div>
      <Row>
        <Col sm={12}>
          {
            item.allVideos?.length>0?
            item.allVideos.map(video=>(<VideoCard displayVideo={video}/>))
            :
            <p>No Item</p>
          }
        </Col>
      </Row>
    </div>
  </div>
  ))
  :
    <p>Nothing to Display</p>
    }
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title><i class="fa-solid fa-pencil text-warning me-3"></i>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>Please fill the following details</p>
        <Form className='border border-secondary p-3'>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter category Id" onChange={(e)=>setCategory({...category,id:e.target.value})}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter category name" onChange={(e)=>setCategory({...category,categoryName:e.target.value})}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={uploadCategory}>Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-center' theme='colored' autoClose={2000}></ToastContainer>
    </>
  )
}

export default Category
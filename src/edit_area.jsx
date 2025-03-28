import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from './loading';
import Api from './api';
import { useParams, useNavigate } from 'react-router-dom';

const EditArea = (props) => {
  const [area, setArea] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Api.get_area(params.area_id).then(area => {
      setArea(area);
    });
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    Api.edit_area(
      params.area_id,
      {
        name: formData.get("name"),
        latitude: formData.get("latitude"),
        longitude: formData.get("longitude")
      }
    ).then(() => {
      navigate("/");
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this area? This action cannot be undone")) {
      Api.delete_area(params.area_id).then(() => navigate("/"));
    }
  };

  return (
    <Container>
      <h2>Edit Area</h2>
      {area == null ?
       <Loading/> :
       <Form onSubmit={handleEdit}>
         <Form.Group>
           <Form.Label>Name</Form.Label>
           <Form.Control name="name" placeholder="Area Name" defaultValue={area.name}/>
           <Form.Label>Longitude</Form.Label>
           <Form.Control name="longitude" placeholder="41.34" defaultValue={area.longitude}/>
           <Form.Label>Latitude</Form.Label>
           <Form.Control name="latitude" placeholder="31.23" defaultValue={area.latitude}/>
         </Form.Group>
         <Button type="submit">Save</Button>
         <Button variant="danger" onClick={handleDelete}>Delete</Button>
       </Form>
      }
    </Container>
  );
};

export default EditArea;

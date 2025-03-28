import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Api from './api';
import { useParams, useNavigate } from 'react-router-dom';

const CreateAsset = (props) => {
  const navigate = useNavigate();
  const { area_id } = useParams();

  const handleCreate = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    Api.create_asset(area_id, {
      name: formData.get("name"),
      latitude: formData.get("latitude"),
      longitude: formData.get("longitude"),
      description: formData.get("description"),
      error: formData.get("error") === "on",
      error_message: formData.get("error_message"),
      serial_number: formData.get("serial_number"),
      model_number: formData.get("model_number")
    }).then(() => {
      navigate(`/areas/${area_id}/assets`);
    });
  };

  return (
    <Container>
      <h2>Create Asset in Area {area_id}</h2>
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" placeholder="Asset Name"/>
          <Form.Label>Longitude</Form.Label>
          <Form.Control name="longitude" placeholder="41.34"/>
          <Form.Label>Latitude</Form.Label>
          <Form.Control name="latitude" placeholder="31.23"/>
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" as="textarea" placeholder="Description"/>
          <Form.Check type="checkbox" name="error" label="Error"/>
          <Form.Label>Error Message</Form.Label>
          <Form.Control name="error_message" placeholder="Error message"/>
          <Form.Label>Serial Number</Form.Label>
          <Form.Control name="serial_number" placeholder="Serial Number"/>
          <Form.Label>Model Number</Form.Label>
          <Form.Control name="model_number" placeholder="Model Number"/>
        </Form.Group>
        <Button type="submit">Create</Button>
      </Form>
    </Container>
  );
}

export default CreateAsset;

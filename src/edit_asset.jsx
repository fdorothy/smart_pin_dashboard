import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from './loading';
import Api from './api';
import { useParams, useNavigate } from 'react-router-dom';

const EditAsset = (props) => {
  const [asset, setAsset] = useState(null);
  const { area_id, asset_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    Api.get_asset(area_id, asset_id).then(asset => {
      setAsset(asset);
    });
  }, []);

  const handleEdit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    Api.edit_asset(
      area_id,
      asset_id,
      {
        name: formData.get("name"),
        latitude: formData.get("latitude"),
        longitude: formData.get("longitude"),
        description: formData.get("description"),
        error: formData.get("error") === "on",
        error_message: formData.get("error_message")
      }
    ).then(() => {
      navigate(`/areas/${area_id}/assets`);
    });
  };

  return (
    <Container>
      <h2>Edit Asset {asset_id} in Area {area_id}</h2>
      {asset == null ?
       <Loading/> :
       <Form onSubmit={handleEdit}>
         <Form.Group>
           <Form.Label>Name</Form.Label>
           <Form.Control name="name" placeholder="Asset Name" defaultValue={asset.name}/>
           <Form.Label>Longitude</Form.Label>
           <Form.Control name="longitude" placeholder="41.34" defaultValue={asset.longitude}/>
           <Form.Label>Latitude</Form.Label>
           <Form.Control name="latitude" placeholder="31.23" defaultValue={asset.latitude}/>
           <Form.Label>Description</Form.Label>
           <Form.Control name="description" placeholder="Description" defaultValue={asset.description}/>
           <Form.Check type="checkbox" name="error" label="Error" defaultChecked={asset.error}/>
           <Form.Label>Error Message</Form.Label>
           <Form.Control name="error_message" placeholder="Error message" defaultValue={asset.error_message}/>
         </Form.Group>
         <Button type="submit">Save</Button>
       </Form>
      }
    </Container>
  );
};

export default EditAsset;

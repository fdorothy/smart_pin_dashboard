import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Loading from './loading';
import Timestamp from './timestamp';
import { Link } from 'react-router-dom';
import Api from './api';

const AreaRow = (props) => {
  const { area } = props;
  return (
    <tr>
      <td>{area.id}</td>
      <td>{area.name}</td>
      <td>{area.longitude}</td>
      <td>{area.latitude}</td>
      <td><Timestamp dateString={area.updated_at}/></td>
      <td><Timestamp dateString={area.inserted_at}/></td>
      <td>
        <Link to={`/areas/${area.id}/assets`}>assets</Link> <Link to={`/areas/${area.id}/edit`}>edit</Link>
      </td>
    </tr>
  );
}

const AreaTable = (props) => {
  const { areas } = props;
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Updated At</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {areas.entries.map((area) => <AreaRow key={area.id} area={area}/>)}
        </tbody>
      </Table>
      <Link to="/create_area">Add Area</Link>
    </Container>
  );
}

const Areas = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    Api.get_areas().then(areas => {
      setLoaded(true);
      setAreas(areas);
    });
  }, []);

  return <Container><h2>Areas</h2>{loaded ? <AreaTable areas={areas}/> : <Loading/>}</Container>;
}

export default Areas;

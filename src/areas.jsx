import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Loading from './loading';
import Timestamp from './timestamp';
import Position from './position';
import { Link } from 'react-router-dom';
import Api from './api';

const AreaRow = (props) => {
  const { area } = props;
  return (
    <tr>
      <td>{area.id}</td>
      <td>{area.name}</td>
      <td><Position lat={area.latitude} long={area.longitude}/></td>
      <td><Timestamp dateString={area.updated_at}/></td>
      <td><Timestamp dateString={area.inserted_at}/></td>
      <td><Timestamp dateString={area.deleted_at}/></td>
      <td>
        <Link to={`/areas/${area.id}/assets`}>assets</Link> <Link to={`/areas/${area.id}/edit`}>edit</Link>
      </td>
    </tr>
  );
}

const AreaTable = (props) => {
  const { areas, onClickMore, hasMore } = props;
  return (
    <Container>
      <Link to="/create_area">Add Area</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Updated At</th>
            <th>Created At</th>
            <th>Deleted At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {areas.map((area) => <AreaRow key={area.id} area={area}/>)}
        </tbody>
        { hasMore ? <Button onClick={onClickMore}>More...</Button> : <></> }
      </Table>
    </Container>
  );
}

const Areas = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [areas, setAreas] = useState([]);
  const [after, setAfter] = useState("");

  useEffect(() => {
    Api.get_areas().then(page => {
      setLoaded(true);
      setAreas(page.entries);
      setAfter(page.after);
    });
  }, []);

  const getMore = () => {
    Api.get_areas(after).then(page => {
      setAreas(areas.concat(page.entries));
      setAfter(page.after);
    });
  };

  const hasMore = after !== null;
  return (
    <Container>
      <h2>Areas</h2>
      {loaded ? <AreaTable areas={areas} onClickMore={getMore} hasMore={hasMore}/> : <Loading/>}
    </Container>
  );
}

export default Areas;

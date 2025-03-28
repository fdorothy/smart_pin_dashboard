import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Loading from './loading';
import Timestamp from './timestamp';
import Position from './position';
import { useParams, Link } from 'react-router-dom';
import Api from './api';

const AssetRow = (props) => {
  const { asset } = props;
  return (
    <tr key={asset.id}>
      <td>{asset.id}</td>
      <td>{asset.name}</td>
      <td><Position lat={asset.latitude} long={asset.longitude}/></td>
      <td>{asset.description}</td>
      <td>{asset.serial_number}</td>
      <td>{asset.model_number}</td>
      <td>{asset.error ? "true" : ""}</td>
      <td>{asset.error_message}</td>
      <td><Timestamp dateString={asset.updated_at}/></td>
      <td><Timestamp dateString={asset.inserted_at}/></td>
      <td><Timestamp dateString={asset.deleted_at}/></td>
      <td>
        <Link to={`/areas/${asset.area_id}/assets/${asset.id}/edit`}>edit</Link>
      </td>
    </tr>
  );
}

const AssetsTable = (props) => {
  const { assets, area_id, onClickMore, hasMore } = props;
  return (
    <Container>
      <Link to={`/areas/${area_id}/create_asset`}>Add Asset</Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Description</th>
            <th>Serial Number</th>
            <th>Model Number</th>
            <th>Error</th>
            <th>Error Message</th>
            <th>Updated At</th>
            <th>Created At</th>
            <th>Deleted At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => <AssetRow key={asset.id} asset={asset}/>)}
        </tbody>
        { hasMore ? <Button onClick={onClickMore}>More...</Button> : <></> }
      </Table>
    </Container>
  );
};

const AreaAssets = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [assets, setAssets] = useState([]);
  const [after, setAfter] = useState("");
  const { area_id } = useParams();

  useEffect(() => {
    Api.get_assets(area_id).then(page => {
      setLoaded(true);
      setAssets(page.entries);
      setAfter(page.after);
    });
  }, []);

  const getMore = () => {
    Api.get_assets(area_id, after).then(page => {
      setAssets(assets.concat(page.entries));
      setAfter(page.after);
    });
  };

  const hasMore = after !== null;
  return (
    <Container>
      <h2>Area {area_id} Assets</h2>
      {loaded ? <AssetsTable assets={assets} area_id={area_id} onClickMore={getMore} hasMore={hasMore}/> : <Loading/>}
    </Container>
  );
};

export default AreaAssets;

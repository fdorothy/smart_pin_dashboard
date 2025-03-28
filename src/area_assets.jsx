import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Loading from './loading';
import Timestamp from './timestamp';
import { useParams, Link } from 'react-router-dom';
import Api from './api';

const AssetRow = (props) => {
  const { asset } = props;
  return (
    <tr key={asset.id}>
      <td>{asset.id}</td>
      <td>{asset.error ? "true" : ""}</td>
      <td>{asset.name}</td>
      <td>{asset.longitude}</td>
      <td>{asset.latitude}</td>
      <td><Timestamp dateString={asset.updated_at}/></td>
      <td><Timestamp dateString={asset.inserted_at}/></td>
      <td>
        <Link to={`/areas/${asset.area_id}/assets/${asset.id}/edit`}>edit</Link>
      </td>
    </tr>
  );
}

const AssetsTable = (props) => {
  const { assets, area_id } = props;
  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Error</th>
            <th>Name</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Updated At</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.entries.map((asset) => <AssetRow asset={asset}/>)}
        </tbody>
      </Table>
      <Link to={`/areas/${area_id}/create_asset`}>Add Asset</Link>
    </Container>
  );
};

const AreaAssets = (props) => {
  const [loaded, setLoaded] = useState(false);
  const [assets, setAssets] = useState([]);
  const { area_id } = useParams();

  useEffect(() => {
    Api.get_assets(area_id).then(assets => {
      setLoaded(true);
      setAssets(assets);
    });
  }, []);

  return <Container><h2>Area {area_id} Assets</h2>{loaded ? <AssetsTable assets={assets} area_id={area_id}/> : <Loading/>}</Container>;
};

export default AreaAssets;

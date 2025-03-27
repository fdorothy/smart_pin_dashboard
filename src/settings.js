import React from 'react';
import Container from 'react-bootstrap/Container';
import Config from './config';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Auth from './auth';
import Api from './api';
import { useStore } from './store';

const Settings = (props) => {
  const config = Config.fetch();
  const login_fn = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    Auth.setPat(formData.get("pat"));
    Config.setBaseUrl(formData.get("base_url"));
    Config.setApiKey(formData.get("api_key"));
    Api.login().then(_ => Api.get_enterprise_token().then(() => {
      login_fn();
      navigate("/");
    }));
  }

  return (
    <Container>
      <h2>Settings</h2>
      <Form onSubmit={handleSave}>
        <Form.Group>
          <Form.Label>Personal Access Token</Form.Label>
          <Form.Control name="pat" type="password" defaultValue={Auth.getPat()}/>
          <Form.Label>Fermata API Base Url</Form.Label>
          <Form.Control name="base_url" placeholder="https://api..." defaultValue={config.base_url}/>
          <Form.Label>API Key</Form.Label>
          <Form.Control name="api_key" placeholder="123abc" defaultValue={config.api_key}/>
        </Form.Group>
        <Button type="submit">Save</Button>
      </Form>
    </Container>
  );
}

export default Settings

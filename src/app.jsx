import React from 'react';
import Container from 'react-bootstrap/Container';
import Logout from './logout';
import Areas from './areas';
import Settings from './settings';
import CreateArea from './create_area';
import EditArea from './edit_area';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Navigate, HashRouter, Route, Link, Routes } from 'react-router-dom';
import Auth from './auth';
import { useStore } from './store';

function AuthGuard({children}) {
  const loggedIn = useStore((state) => state.loggedIn);
  if (!loggedIn) {
    return <Navigate to="/settings" replace />;
  } else {
    return children;
  }
}

const App = (props) => {
  const loggedIn = useStore((state) => state.loggedIn);
  return (
    <Container>
      <h1>Smart Pins Dashboard</h1>
      <HashRouter>
        <Navbar>
          <Nav>
            { loggedIn ? <Nav.Link as={Link} to="/">Areas</Nav.Link> : <></> }
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
            { loggedIn ? <Nav.Link as={Link} to="/logout">Logout</Nav.Link> : <></> }
          </Nav>
        </Navbar>
        <Routes>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/create_area" element={<AuthGuard><CreateArea/></AuthGuard>}/>
          <Route path="/areas/:area_id/edit" element={<AuthGuard><EditArea/></AuthGuard>}/>
          <Route path="/" element={<AuthGuard><Areas/></AuthGuard>}/>
        </Routes>
      </HashRouter>
    </Container>
  );
};

export default App;

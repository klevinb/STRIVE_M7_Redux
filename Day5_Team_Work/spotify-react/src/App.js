import React from 'react';
import './App.css';
import { Container, Row } from 'react-bootstrap'
import SideBar from './components/SideBar'
import Content from './components/Content'
import ArtistDetails from './components/ArtistDetails'
import AlbumDetails from './components/AlbumDetails'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'



function App() {
  return (
    <Router>
      <div className="App">
        <Container fluid>
          <Row md={2} style={{ display: 'flex' }} >
            <SideBar />
            <Route path="/artistdetails/:id" component={ArtistDetails}></Route>
            <Route path="/albumdetails/:id" component={AlbumDetails}></Route>
            <Route path="/" exact component={Content}></Route>
          </Row>
          <Footer />
        </Container>
      </div>
    </Router>
  );
}

export default App;

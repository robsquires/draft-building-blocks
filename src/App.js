import React, { Component } from 'react';
import SimpleEditor from './SimpleEditor';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
         <PageHeader>Write to ContentState (1)</PageHeader>
        <Row>
          <Col xs={12}>
            <SimpleEditor />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;

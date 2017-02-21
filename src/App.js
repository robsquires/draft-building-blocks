import React, { Component } from 'react';
import SimpleEditor from './SimpleEditor';
import {Grid, Row, Col, PageHeader} from 'react-bootstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid>
         <PageHeader>Writing Content</PageHeader>
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

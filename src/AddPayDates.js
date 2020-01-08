import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';

class AddPayDates extends React.Component {
    constructor(props){
      super(props);
      this.state = {showModal:false}
    }
  
    handleShowModalChange() {
      this.setState({showModal:!this.state.showModal});
    }
  
    handlePayDateChange (payDate) {
      this.props.handlePayDateChange(payDate.target.value);
    }
  
    handlePayAmountChange (payAmount) {
      this.props.handlePayAmountChange(payAmount.target.value);
    }
  
    handleAddPayDate () {
      this.props.handleAddPayDate();
    }
    
    render() {
      return (
        <>
            <Nav.Link href="#" onClick={this.handleShowModalChange.bind(this)}>
            Add Pay Date
            </Nav.Link>
            <Modal
            show={this.state.showModal}
            onHide={this.handleShowModalChange.bind(this)}
            >
            <Modal.Header>
                Add New Pay Date
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Row>
                    <Col>
                    <Form.Control placeholer="Pay Date" onChange={this.handlePayDateChange.bind(this)} />
                    </Col>
                    <Col>
                    <Form.Control placeholder="Pay Amount" onChange={this.handlePayAmountChange.bind(this)} />
                    </Col>
                </Row>
                <Row>
                    <Button onClick={this.handleAddPayDate.bind(this)}>Add Pay</Button>
                </Row>
                </Form>
            </Modal.Body>
            </Modal>
        </>
        );
    }
}

export default AddPayDates;
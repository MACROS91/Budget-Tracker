import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import {extendMoment} from 'moment-range';
import "react-datepicker/dist/react-datepicker.css"
const moment = extendMoment(Moment);



class AddPayDates extends React.Component {
    constructor(props){
      super(props);
      this.state = {
          showModal: false,
          startDate: new Date(), 
          recurring: false,
          payAmount: '',
          frequency: 1,
          endDate: new Date(),   
        }
    }
  
    handleShowModalChange() {
      this.setState({showModal:!this.state.showModal});
    }
  
    handlePayDateChange (payDate) {

        var options = {
            year: "numeric",
            month: "2-digit",
            day: "numeric"
        };

        const formattedDate = payDate.toLocaleString("en-US",options)
        this.setState({startDate:payDate})
        this.props.handlePayDateChange(formattedDate);
    }
  
    handleEndPayDateChange (payDate) {
        var options = {
            year: "numeric",
            month: "2-digit",
            day: "numeric"
        };

        const formattedDate = payDate.toLocaleString("en-US",options)
        this.setState({endDate:payDate})      
    }

    handlePayAmountChange (payAmount) {
        this.setState({payAmount:payAmount.target.value})
        this.props.handlePayAmountChange(payAmount.target.value);
    }
  
    handleAddPayDate () {
        let startDate = this.state.startDate
        let endDate = this.state.endDate

        var options = {
            year: "numeric",
            month: "2-digit",
            day: "numeric"
        };

        while (startDate < endDate) {
            startDate.setDate(startDate.getDate() + parseInt(this.state.frequency))
            const formattedDate = startDate.toLocaleString("en-US",options)
            console.log(formattedDate)
            console.log(this.state.payAmount)
            this.props.handleAddPayDate(formattedDate,this.state.payAmount)
        }

    }

    handleFrequencyChange(event) {
        console.log(event.target.value)
        this.setState({frequency:event.target.value})
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
                            <DatePicker
                                selected={this.state.startDate}
                                onChange={this.handlePayDateChange.bind(this)}
                            />
                        </Col>
                        <Col>
                            <DatePicker
                            selected={this.state.endDate}
                            onChange={this.handleEndPayDateChange.bind(this)}
                                />
                        </Col>
                        </Row>
                       <Row>
                        <Col>
                        <Form.Control placeholder="Pay Amount" onChange={this.handlePayAmountChange.bind(this)} />
                        </Col>
                        <Col>
                    <Form.Control placeholder="Frequency" as="select" onChange={this.handleFrequencyChange.bind(this)}>
                        <option value={1}>One Time</option>
                        <option value={7}>Weekly</option>
                        <option value={14}>Biweekly</option>
                        <option value={30}>Monthly</option>
                    </Form.Control>
                    </Col>
                    </Row>
                    <Button onClick={this.handleAddPayDate.bind(this)}>Add Pay</Button>
                </Form>
                </Modal.Body>
            </Modal>
        </>
        );
    }
}

export default AddPayDates;
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';


class AddSpendItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {showModal:false}
  }

  handleShowModalChange() {
    this.setState({showModal:!this.state.showModal})
  }

  handleSpendNameChange (spendName) {
    this.props.handleSpendNameChange(spendName.target.value);
  }
  handleSpendAmountChange (spendAmount) {
    this.props.handleSpendAmountChange(spendAmount.target.value);
  }
  handleSpendDateChange (spendDate) {
    this.props.handleSpendDateChange(spendDate.target.value);
  }
  handleSpendCategoryChange (spendCategory) {
    //TODO
  }
  handleSpendRecurringChange (spendRecurring) {
    //TODO
  }
  handleSpendFrequencyChange (spendFrequency) {
    //TODO
  }
  handleSpendEndDateChange (spendEndDate) {
    //TODO
  }
  handleAddSpendItem () {
    this.props.handleAddSpendItem();
  }


  render() {
    return (
        <>
            <Nav.Link href="#" onClick={this.handleShowModalChange.bind(this)}>
                Add Spending
            </Nav.Link>

            <Modal
                size="lg"
                show={this.state.showModal}
                onHide={this.handleShowModalChange.bind(this)}
            >
                <Modal.Header>
                    <Modal.Title>
                    Add Spend Item
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Control placeholder="Name" onChange={this.handleSpendNameChange.bind(this)} />
                            </Col>
                            <Col>
                                <Form.Control placeholder="Amount" onChange={this.handleSpendAmountChange.bind(this)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control placeholder="Date" onChange={this.handleSpendDateChange.bind(this)} />
                            </Col>
                            <Col>
                                <Form.Control as="select" placeholder="Category" onChange={this.handleSpendCategoryChange.bind(this)}>
                                    {this.props.categories.map((key) => {
                                        return (
                                        <option>{key}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button onClick={this.handleAddSpendItem.bind(this)}>Add Item</Button>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>        
    );
  }
}

export default AddSpendItem;
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Modal from 'react-bootstrap/Modal';

class AddSpendCategory extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showModal:false,
      newCategory: '',
    }
  }
  handleShowModalChange() {
    this.setState({showModal:!this.state.showModal});
  }
  handleAddNewCategory() {
    this.props.handleAddNewCategory(this.state.newCategory);
  }
  handleInputChange(event) {
    this.setState({newCategory: event.target.value});
  }

  render() {
    return (
        <>
            <Nav.Link href="#" onClick={this.handleShowModalChange.bind(this)}>
                Add Spend Category
            </Nav.Link>
            <Modal
                show={this.state.showModal}
                onHide={this.handleShowModalChange.bind(this)}
            >
                <Modal.Header>
                    Add New Spend Category  
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Control placeholder="Enter Category" onChange={this.handleInputChange.bind(this)}/>
                        <Button onClick={this.handleAddNewCategory.bind(this)}>
                            Add New Category  
                        </Button>  
                    </Form>      
                </Modal.Body>  
            </Modal>    
        </>
        )
    }
}

export default AddSpendCategory;
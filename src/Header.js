import React from 'react';
import './App.css';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import AddSpendCategory from './AddSpendCategory';
import AddPayDates from './AddPayDates';
import AddSpendItem from './AddSpendItem';

class Header extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return(
        <Navbar bg="dark" expand="md" variant="dark">
          <Navbar.Brand href="#">Budget App</Navbar.Brand>
          <Nav>
            <AddSpendCategory
              categories={Object.keys(this.props.categories)}
              handleAddNewCategory={this.props.handleAddNewCategory} 
            />
            <AddPayDates
              handleAddPayDate={this.props.handleAddPayDate}
              handlePayDateChange={this.props.handlePayDateChange}
              handlePayAmountChange={this.props.handlePayAmountChange} 
            />
            <AddSpendItem
              categories={Object.keys(this.props.categories)} 
              dates={this.props.dates}
              handleSpendNameChange={this.props.handleSpendNameChange}
              handleSpendAmountChange={this.props.handleSpendAmountChange}
              handleSpendDateChange={this.props.handleSpendDateChange}
              handleSpendCategoryChange={this.props.handleSpendCategoryChange}
              handleSpendRecurringChange={this.props.handleSpendRecurringChange}
              handleSpendFrequencyChange={this.props.handleSpendFrequencyChange}
              handleSpendEndDateChange={this.props.handleSpendEndDateChange}
              handleAddSpendItem={this.props.handleAddSpendItem}
            />
          </Nav>
        </Navbar>
      )
    }
  }

  export default Header;
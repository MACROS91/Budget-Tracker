import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import {OverlayTrigger} from 'react-bootstrap';

const SpendItem = styled.div`
  border: 1px solid lightgrey;
  border-radius: 1px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  background: ${props => props.backgroundColor};
  color:white;
`;


class SpendAmount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'isDragging':false
    }
  }

  handleChangeSpendName (event) {
    const newSpendName = event.target.value;
    this.props.handleChangeSpendName(newSpendName);
  }

  handleChangeSpendAmount (event) {
    const newSpendAmount = event.target.value;
    this.props.handleChangeSpendAmount(newSpendAmount);
  }

  handleChangeSpendCategory (event, eventKey) {
    const newSpendCategory = eventKey.target.text;
    console.log(newSpendCategory)
    this.props.handleChangeSpendCategory(newSpendCategory);
  }

  handleUpdateSpendAmount () {
    this.props.handleUpdateSpendAmount(this.props.payDate, this.props.spendName);
  }

  render() {
    return (
      <Draggable 
        draggableId={this.props.spendName + '~' + this.props.spendAmount + '~' + this.props.payDate + '~' + this.props.category} 
        index={this.props.index}
        key={this.props.spendName+this.props.payDate}
      >
        {(provided, snapshot) => {
          return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <OverlayTrigger
              trigger="click"
              placement="right"
              overlay={
                <Popover>
                  <Popover.Title>
                    <h4>Change expense</h4>
                  </Popover.Title>
                  <Popover.Content>
                    <Form>
                      <Form.Control 
                        placeholder={this.props.spendName} 
                        onChange={this.handleChangeSpendName.bind(this)}
                        defaultValue={this.props.spendName}  
                      />
                      <Form.Control 
                        placeholder={this.props.spendAmount} 
                        onChange={this.handleChangeSpendAmount.bind(this)} 
                        defaultValue={this.props.spendAmount}  
                      />
                      <DropdownButton title="Select Category">
                        {Object.keys(this.props.categories).map((category) => {
                          return (
                            <Dropdown.Item href="#" onSelect={this.handleChangeSpendCategory.bind(this)}>
                              {category}
                            </Dropdown.Item>
                          )
                        })}
                      </DropdownButton>
                      <Button onClick={this.handleUpdateSpendAmount.bind(this)}>Save Changes</Button>
                    </Form>
                  </Popover.Content>
                </Popover>
                }
            >
                <SpendItem
                  backgroundColor={this.props.backgroundColor}
                >
                  {this.props.spendName}  {this.props.spendAmount}
                </SpendItem>
            </OverlayTrigger>
          </div>
        )}}
        
      </Draggable>
    )
  }
}

export default SpendAmount;
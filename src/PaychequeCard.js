import React from 'react';
import './App.css';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';

import SpendAmount from './SpendAmount';
import SpendByCategory from './SpendByCategory';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  width: 400px;
`;


const SpendAmountStyle = styled.h3`
  padding: 8px;
  color: red
`;

const PayAmount = styled.h1`
  padding: 8px;
  color: green;
  `;

const SpendList = styled.div`
  padding: 8px;
  min-height: 400px;
  background-color: ${props => props.isDragging ? '#aecde0' : null}
  `;

const SpendItem = styled.div`
  border: 1px solid lightgrey;
  border-radius: 1px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  background: ${props => props.backgroundColor};
  color:white;
`;

const DateStyle = styled.h3`
  padding:8px;
  `;

class PaychequeCard extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render () {
      let spendAmount = 0;
      for (var key in this.props.spending) {
        spendAmount += this.props.spending[key]['amount']
      }
      return (
          <Container>
            <DateStyle>{this.props.payDate}</DateStyle>
            <PayAmount>Pay: {this.props.payAmounts[this.props.payDate]} </PayAmount>
            <SpendByCategory
              spendAmount={spendAmount}
              payData={this.props.payData[this.props.payDate]}
              categories={this.props.categories}
            />
            <Droppable
              droppableId={this.props.payDate}
              type="SPEND"
            >
              {(provided, snapshot) => {
                return (
                  <SpendList
                    ref = {provided.innerRef}
                    isDragging = {snapshot.isDraggingOver}
                    {...provided.droppableProps}
                    handleChangeSpendAmount={this.props.handleChangeSpendAmount}
                    handleChangeSpendName={this.props.handleChangeSpendName}
                    handleChangeSpendCategory={this.props.handleChangeSpendCategory}
                    handleUpdateSpendAmount={this.handleUpdateSpendAmount}
                  >
                  {this.props.spendOrder.map((key,index) => {
                    if (this.props.payDate === '2020-01-09') {
                    }
                    const spendAmount = this.props.spending[key]['amount'];
                    const categoryColor = this.props.spending[key]['category'];
                    return(
                          <SpendAmount 
                            spendName={key}   
                            spendAmount={spendAmount}
                            index={index}
                            category={this.props.spending[key]['category']}
                            payDate={this.props.payDate}
                            categories={this.props.categories}
                            backgroundColor={this.props.categories[categoryColor]}
                            handleChangeSpendAmount={this.props.handleChangeSpendAmount.bind(this)}
                            handleChangeSpendName={this.props.handleChangeSpendName.bind(this)}
                            handleChangeSpendCategory={this.props.handleChangeSpendCategory.bind(this)}
                            handleUpdateSpendAmount={this.props.handleUpdateSpendAmount.bind(this)}
                          />
                        )
                    })})}
                    {provided.placeholder}
                  </SpendList>
                )}}
            </Droppable>
          </Container>
      )
    }
  } 

  export default PaychequeCard;
import React from 'react';
import Popover from 'react-bootstrap/Popover';
import {OverlayTrigger} from 'react-bootstrap';
import styled from 'styled-components';


const SpendAmountStyle = styled.h3`
  padding: 8px;
  color: red
`;

class SpendByCategory extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={
                      <Popover>
                        <Popover.Title>
                            Spending Summary
                        </Popover.Title>
                        <Popover.Content>
                        
                        {Object.keys(this.props.categories).map((category) => {
                            let matchingItems = Object.values(this.props.payData).filter((item) => {    
                                return (
                                    item['category'] == category
                                )})
                            let matchingSum = Object.values(matchingItems).reduce((sum, amt) =>{
                                
                                return sum+parseFloat(amt['amount']);
                            }, 0)
                            return (
                                <h3>{matchingSum['category']} {matchingSum['amount']}</h3>
                            )
                        })}

                        </Popover.Content>
                      </Popover>

                  }
                >
                <SpendAmountStyle>Spending: {this.props.spendAmount}</SpendAmountStyle>
                
                </OverlayTrigger>
            </div>
        )
    }
}

export default SpendByCategory;
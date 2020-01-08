import React from 'react';
import Moment from 'moment';
import {extendMoment} from 'moment-range';
import './App.css';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';

// Import Child Components
import Header from './Header';
import PaychequeCard from './PaychequeCard';

const moment = extendMoment(Moment);

// Create Styled Components
const PayContainer = styled.div`
  display:flex;
  flex-direction: paycheques;
  background-color: ${props => (props.isDragging ? 'skyblue' : 'white')}
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    // Create pay range to render cards
    //let startDate = moment("2019-12-26","YYYY-MM-DD");
    //const endDate = moment("2020-01-24", "YYYY-MM-DD");
    //let dates = moment.range(startDate, endDate)
    let dates = [
      '2019-12-26', 
      '2020-01-02',
    ]

  let spending1 = {
    'Phone':{'category':"Regular Bills",
              'amount':100}, 
    'Xmas':{'category':"One-time Bills",
             'amount':100}, 
    'Power':{'category':"Regular Bills",
              'amount':100},
    'Vet':{'category':"Regular Savings",
              'amount':100},
    'Orlando':{'category':"Vacation Savings",
            'amount':100},
  }
  let spending2 = {
    'Internet':{'category':"Regular Savings",
             'amount':100}, 
    'Birthday':{'category':"One-time Bills",
            'amount':100}, 
    'Water':{'category':"Regular Bills",
        'amount':100},
    'Vet2':{'category':"Regular Savings",
        'amount':100},
    'Cali':{'category':"Vacation Savings",
               'amount':100},
  }

    let payData = {
      '2019-12-26': spending1,
      '2020-01-02': spending2,
    }
    let paySpendOrder = {
      '2019-12-26': Object.keys(payData['2019-12-26']),
      '2020-01-02': Object.keys(payData['2020-01-02']),
    }

    let payAmounts = {
      '2019-12-26': 800,
      '2020-01-02': 1600
    }

    let categories = {
      'Regular Bills': 'blue',
      'Regular Savings': 'green',
      'One-time Bills': 'orange',
      'Vacation Savings': 'darkgreen'
    }

    this.state = {
      // State for date grid
      'dates': dates,
      'paycheques': Array.from(dates),
      'spendAmounts': spending1,
      'spending': spending1,
      'paySpendOrder': paySpendOrder,
      'payData': payData,
      'categories': categories,
      'payAmounts':payAmounts,

      // State for adding new input data
      'inputSpendName': '',
      'inputSpendAmount': '',
      'inputSpendDate': '',
      'inputSpendCategory': '',
      'inputFrequency': '',
      'inputRecurring': '',
      'inputEndDate': '',

      // State for adding/modifying pay dates
      'inputPayDate': '',
      'inputPayAmount': '',

      // State for changing SpendItems
      'tempSpendName': '',
      'tempSpendAmount': '',
      'tempSpendCategory': '',
    } 
  }

  onDragEnd (result) {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    // Case where item is dropped in old position on old card - do nothing
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    // Case where item is moved within the same card to a different position
    else if (destination.droppableId === source.droppableId) {
      const spendOrder = this.state.paySpendOrder[source.droppableId];
      const newSpendOrder = Array.from(spendOrder);
      const old_val = newSpendOrder.splice(source.index, 1)[0];  
      newSpendOrder.splice(destination.index, 0, old_val);
      let newSpendObj = this.state.paySpendOrder;
      newSpendObj[destination.droppableId] = newSpendOrder;
      this.setState({paySpendOrder:newSpendObj})
    }
    else if (destination.droppableId !== source.droppableId) {
      
      //Remove item from old array
      const originSpendOrder = this.state.paySpendOrder[source.droppableId];
      const newSpendOrder = Array.from(originSpendOrder);
      const movedSpendItem = newSpendOrder.splice(source.index, 1)[0];
      const newSpendObj = this.state.paySpendOrder;
      newSpendObj[source.droppableId] = newSpendOrder;

      //Place item in destination array
      const destinationSpendOrder = this.state.paySpendOrder[destination.droppableId];
      const newDestinationSpendOrder = Array.from(destinationSpendOrder);
      newDestinationSpendOrder.splice(destination.index,0, movedSpendItem);
      newSpendObj[destination.droppableId] = newDestinationSpendOrder;

      //Move spend data from source to destination array
      const spending = this.state.payData;
      const item = draggableId.split("~");
      spending[destination.droppableId][item[0]] = {'amount':parseFloat(item[1]),
                                                    'category': item[3]};
      delete spending[source.droppableId][item[0]];
          
      // Update state
      this.setState({paySpendOrder:newSpendObj,
                     payData: spending})
    }
  }

  // Add new spend items

  handleSpendNameChange (spendName) {
    this.setState({inputSpendName: spendName});
  }
  handleSpendAmountChange (spendAmount) {
    this.setState({inputSpendAmount: spendAmount});
  }
  handleSpendDateChange (spendDate) {
    this.setState({inputSpendDate:spendDate});
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
    let payData = this.state.payData;
    let spendOrder = this.state.paySpendOrder;
    
    let spendItem = {}
    spendItem[this.state.inputSpendName] = {category: 'Regular Bills',
                                            amount: parseFloat(this.state.inputSpendAmount)}

    // TODO refactor so this doesn't erase the existing object
    Object.assign(payData[this.state.inputSpendDate],spendItem)


    if (spendOrder[this.state.inputSpendDate]) {
      let currentSpendOrder = spendOrder[this.state.inputSpendDate]
      currentSpendOrder.push(this.state.inputSpendName)
      spendOrder[this.state.inputSpendDate] = currentSpendOrder
    }
    else {
      spendOrder[this.state.inputSpendDate] = [this.state.inputSpendName]
    }

    console.log(spendOrder)
    console.log(payData)
    this.setState({payData:payData,
                   spendOrder: spendOrder,
                   inputSpendDate: '',
                   inputSpendAmount:'',
                   inputSpendName:''})
  }

  // Add new categories

  handleAddNewCategory(category) {

    let categories = this.state.categories;
    categories[category] = "AAAA";
    this.setState({categories:categories});
  }

  // Add new pay dates

  handlePayDateChange (payDate) {
    this.setState({inputPayDate:payDate})
  }
  
  handlePayAmountChange (payAmount) {
    this.setState({inputPayAmount:payAmount})
  }

  handleAddPayDate () {
    let payData = this.state.payData;
    payData[this.state.inputPayDate] = {};
    
    let payAmounts = this.state.payAmounts
    payAmounts[this.state.inputPayDate] = this.state.inputPayAmount

    let dates = Object.keys(payData)
    let paySpendOrder = this.state.paySpendOrder
    paySpendOrder[this.state.inputPayDate] = []
    this.setState({payData:payData,
                   paySpendOrder:paySpendOrder,
                   dates:dates})
  }


  // Change existing SpendItem values
  handleChangeSpendName (newSpendName) {
    this.setState({tempSpendName:newSpendName});
  }

  handleChangeSpendAmount (newSpendAmount) {
    this.setState({tempSpendAmount:newSpendAmount});
  }

  handleChangeSpendCategory (newSpendCategory) {
    this.setState({tempSpendCategory:newSpendCategory})
  }


  handleUpdateSpendAmount (payDate,spendName) {
    // Update spending dictionary
    let payData = this.state.payData;
    let spendAmount = this.state.tempSpendAmount !== '' ? this.state.tempSpendAmount : payData[payDate][spendName]['amount'];
    let newSpendName = this.state.tempSpendName !== '' ? this.state.tempSpendName : spendName;
    let newSpendCategory = this.state.tempSpendCategory !== '' ? this.state.tempSpendCategory : payData[payDate][spendName]['category']

    // If spendName has changed and isn't blank, create a new "spendName" and then delete the old one
    if (spendName !== this.state.tempSpendName && this.state.tempSpendName !== '') {
        delete payData[payDate][spendName];
        payData[payDate][newSpendName] = {'amount': parseFloat(spendAmount),
                                                      'category': newSpendCategory}
    }
    // Temp fix for phantom entries - no spend but amount
    if (payData[payDate]['']) {
      delete payData[payDate][''];
    }


    // Update display order for grid
    let paySpendOrder = this.state.paySpendOrder;
    let spendOrder = paySpendOrder[payDate]
    spendOrder[spendOrder.indexOf(spendName)] = newSpendName;
    paySpendOrder[payDate] = spendOrder
 
    payData[payDate][newSpendName]['amount'] = parseFloat(spendAmount);
    payData[payDate][newSpendName]['category'] = newSpendCategory;

    this.setState({payData: payData,
                   paySpendOrder: paySpendOrder,
                   tempSpendName: '',
                   tempSpendAmount: '',
                   tempSpendCategory: ''})
  }

  render () {
    //let dateRange = Array.from(this.state.dates.by('week'))
    return (
      
      <div className="App">
      <Header 
        categories={this.state.categories}
        handleSpendNameChange={this.handleSpendNameChange.bind(this)}
        handleSpendAmountChange={this.handleSpendAmountChange.bind(this)}
        handleSpendDateChange={this.handleSpendDateChange.bind(this)}
        handleSpendCategoryChange={this.handleSpendCategoryChange.bind(this)}
        handleSpendRecurringChange={this.handleSpendRecurringChange.bind(this)}
        handleSpendFrequencyChange={this.handleSpendFrequencyChange.bind(this)}
        handleSpendEndDateChange={this.handleSpendEndDateChange.bind(this)}
        handleAddSpendItem={this.handleAddSpendItem.bind(this)}
        handleAddNewCategory={this.handleAddNewCategory.bind(this)}
        handlePayDateChange={this.handlePayDateChange.bind(this)}
        handlePayAmountChange={this.handlePayAmountChange.bind(this)}
        handleAddPayDate={this.handleAddPayDate.bind(this)}
      />
      <Jumbotron>
        <h1>Budgeting App</h1>
        <h4>A simple tool for weekly budgeting</h4>
        <p>To get started, add an expense below:</p>
      </Jumbotron>
      
      
      <DragDropContext
        onDragEnd = {this.onDragEnd.bind(this)}
      >
        <PayContainer>
        {this.state.dates.sort().map(payDate => {
          //let payDate = date.format("YYYY-MM-DD");
          return (
            <PaychequeCard 
              payDate={payDate}
              payAmounts={this.state.payAmounts}
              payData={this.state.payData}
              spendOrder={this.state.paySpendOrder[payDate]}
              spending={this.state.payData[payDate]}
              categories={this.state.categories}
              handleChangeSpendAmount={this.handleChangeSpendAmount.bind(this)}
              handleChangeSpendName={this.handleChangeSpendName.bind(this)}
              handleChangeSpendCategory={this.handleChangeSpendCategory.bind(this)}
              handleUpdateSpendAmount={this.handleUpdateSpendAmount.bind(this)}
            />
          )
        })}
        </PayContainer>
      </DragDropContext>
      </div>
    )}
}

export default App;

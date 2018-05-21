import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// $ is a shortcut for jQuery methods
class App extends React.Component {

  constructor(){
    super();
    this.state = {
      rows: [
        {
          name: 'top',
          index: 0,
          value: 0,
          endValue: 0,
          speed: 200,
          isRunning: true,
          key: Math.random(),
          direction: 'ltr'
        },
        {
        name: 'center',
        value: 0,
        index: 1,
        endValue: 0,
        speed: 200,
        isRunning: true,
        key: Math.random(),
        direction: 'rtl'
        },
        {
        name: 'bottom',
        value: 0,
        index: 2,
        endValue: 0,
        speed: 200,
        isRunning: true,
        key: Math.random(),
        direction: 'ltr'
        }
      ],
      prize: 'none',
      activeRowIndex: 0
    }
    this.handleClick = this.handleClick.bind(this);
    this.updateActiveRow = this.updateActiveRow.bind(this);
    this.setEndValue = this.setEndValue.bind(this);
    this.setRotatingValue = this.setRotatingValue.bind(this);
    this.cancelInterval = this.cancelInterval.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.determinePrize = this.determinePrize.bind(this);
    document.body.addEventListener('touchstart', this.handleClick.bind(this));
    window.addEventListener('keypress', this.handleClick.bind(this));
  }

  handleClick(){
    var index = this.state.activeRowIndex;
    // If click occurs while a row is active
    if(index < this.state.rows.length){
      //Cancel the row's timer
      this.cancelInterval(index);
      //And set the value it ended on
      this.setEndValue(index, this.state.rows[index].value);
      this.determinePrize();
    }
    // Update the active row index every click
    this.updateActiveRow();
  }

  updateActiveRow(){
    //If the active section isn't a row
    if( this.state.activeRowIndex < this.state.rows.length){
      var index = this.state.activeRowIndex + 1;
      this.setState({activeRowIndex: index });
    } else{
      this.resetGame();
    }
  }

  determinePrize(){
    var rows = this.state.rows;
    var endValues = rows.map( function(row){
      return row.endValue;
    });

    var prize = '';
    endValues.forEach( function(value, index){
      if(endValues[index] !== endValues[0]){
        prize = 3; //code for 'No Prize'
      } else{
        prize = endValues[0];
      }
    });

    console.log(prize);
    this.setState({prize: prize});
  }

  resetGame(){
    //Generate new key for each row. This forces re-rendering and resetting of timers.
    var rows = this.state.rows.map( function(row){
      //Generate new key
      row.key = Math.random();
      //Reset running timer
      row.isRunning = true;
      return row;
    });

    //Set the state
    this.setState({rows: rows});
    this.setState({activeRowIndex: 0});
  }

  setRotatingValue(index, value){
    var rows = this.state.rows;
    var row = rows[index];
    row.value = value;
    rows[index] = row;
    this.setState({rows: rows});
  }

  setEndValue(index, value){
    var rows = this.state.rows;
    var row = rows[index];
    row.endValue = value;
    rows[index] = row;
    this.setState({rows: rows});
  }

  cancelInterval(index){
    var rows = this.state.rows;
    var row = rows[index];
    row.isRunning = false;
    rows[index] = row;
    this.setState({rows: rows});
  }

  render(){
    var rows = this.state.rows.map( function(row){
      return(
        <Row
          name={row.name}
          index={row.index}
          data={this.state}
          setEndValue={this.setEndValue}
          setRotatingValue={this.setRotatingValue}
          isRunning={row.isRunning}
          speed={row.speed}
          key={row.key}
          direction={row.direction}
          />
      )
    }, this);

    return (
      <div key={this.state.key} ref="game">
        <div className="viewport">
          <div className="game">
            <div className="rows">
              {rows}
            </div>
          </div>
          <Results shown={this.state.activeRowIndex === 3} prize={this.state.prize}/>
        </div>
      </div>
    )
  }
}

class Row extends React.Component {
  constructor(){
    super();
    this.state = {value: 0};
    this.counterIntervalFunction = this.counterIntervalFunction.bind(this);
    this.clearCounterInterval = this.clearCounterInterval.bind(this);
  }

  componentWillMount(){
    var interval = setInterval( this.counterIntervalFunction, this.props.speed);
    this.setState({interval: interval})
  }

  counterIntervalFunction(){
    if( this.props.isRunning && this.props.direction === 'ltr'){
      var value = this.state.value < 2 ? this.state.value + 1 : 0;
      this.setState({value: value});
      this.props.setRotatingValue(this.props.index, this.state.value);
    } else if( this.props.isRunning && this.props.direction === 'rtl'){
      var value = this.state.value > 0 ? this.state.value - 1 : 2;
      this.setState({value: value});
      this.props.setRotatingValue(this.props.index, this.state.value);
    }
    else{
      this.clearCounterInterval();
    }
  }

  clearCounterInterval(){
    clearInterval(this.state.interval);
  }

  render(){
    var activeRowIndex = this.props.data.activeRowIndex;
    var activeClass = this.props.index === activeRowIndex ? 'active' : '';
    var columnsClassList = 'columns columns-' + this.props.name;
    var wrapperClassList = 'row ' + activeClass;
    var animation = this.props.direction + '-transition-' + this.state.value;
    var style = {
      animationName: animation,
      animationDuration: this.props.speed + 'ms'
    }

    return (
      <div className={wrapperClassList}>
        <div className={columnsClassList} style={style}>
          <div className="column"></div>
          <div className="column"></div>
          <div className="column"></div>
        </div>
      </div>
    )
  }

}

class Results extends React.Component{
  constructor(){
    super();
    this.state = {
      messages: [
        '3UP',
        '5UP',
        '2UP',
        'No Prize'
      ]
    }
  }

  render(){
    var shown = this.props.shown ? 'shown' : '';
    var classList = 'results ' + shown;
    return(
      <div className={classList}>
        {this.state.messages[this.props.prize]}
      </div>
    )
  }
}

// Render the app



export default App;

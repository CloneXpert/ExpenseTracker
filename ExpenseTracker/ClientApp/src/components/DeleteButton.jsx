import React, { Component } from 'react';
import ExpenseDataService from "../services/expense.service";

export default class DeleteButton extends Component {

  constructor(props) {
    super(props);
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    const id = this.props.data.id;
    if (id) {
      ExpenseDataService.delete(id)
        .then(response => {
          //TODO: refresh the rows from the server or remove the deleted item from the grid
          console.log(this.props);
        })
        .catch(e => {
           console.log(e);
        });
    }
  }

  render() {
    return (
      <button type="button" style={{ fontSize: '0.5em' }} className="btn btn-danger btn-sm" onClick={this.incrementCounter}>X
      </button>
    );
  }
}

import React, { Component } from 'react';
import ExpenseDataService from "../../services/expense.service";
import { Link } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import DeleteButton from '../DeleteButton';
import ExpenseItemType from '../../enum/expenseItemType';

export default class ExpenseList extends Component {
  constructor(props) {
    super(props);

    this.fetchItems = this.fetchItems.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      columnDefs: [
        //{ headerName: "Delete", cellRenderer: "deleteButton" },
        {
          headerName: "Transaction Date", field: "transactionDate", width: 150,
          valueFormatter: (params) => {
            return new Intl.DateTimeFormat('en-US').format(new Date(params.value));
          }
        },
        {
          headerName: "Amount", field: "amount",
          valueFormatter: (params) => new Intl.NumberFormat('en-US', { style: 'currency', currency: params.data.currency }).format(params.value)
        },
        //{ headerName: "Currency", field: "currency" },
        { headerName: "Recipient", field: "recipient", flex: 1 },
        {
          headerName: "Expense Type", field: "type",
          valueFormatter: (params) => ExpenseItemType[params.value]
        }
      ],
      rowSelection: 'multiple',
      firstSelectedItem: null,
      expenseItems: []
    }
  }
    componentDidMount() {
    this.fetchItems();
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  onDelete = () => {
    let selectedRows = this.gridApi.getSelectedRows();

    if (selectedRows) {
      let success = true;
      for (let i = 0; i < selectedRows.length; i++) {
        ExpenseDataService.delete(selectedRows[i].id)
          .then(response => {
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

      this.gridApi.updateRowData({ remove: selectedRows });
    }
  };

  onSelectionChanged = event => {
    this.setState((state, props) => ({
      firstSelectedItem: event.api.getSelectedNodes()[0]
    }));
  };

  fetchItems() {
    ExpenseDataService.getAll()
      .then(response => {
        this.setState({
          expenseItems: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { expenseItems, columnDefs, firstSelectedItem } = this.state;

    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '1000px'
        }}
      >
        <Link to={`/Expenses/Add`} className="btn btn-success btn-sm">Add new expense</Link>
        {firstSelectedItem &&
          <Link to={`/Expenses/Edit/${firstSelectedItem.id}`} className="btn btn-success btn-sm">Edit</Link>}
        <button className="btn btn-danger btn-sm" role="button" onClick={() => this.onDelete()}>
          Delete Selected
        </button>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={expenseItems}
          rowSelection={this.state.rowSelection}
          onSelectionChanged={this.onSelectionChanged}
          onGridReady={this.onGridReady}
          frameworkComponents={{
            'deleteButton': DeleteButton
          }}
          defaultColDef={{
            sortable: true,
            //flex: 1,
            filter: true,
            resizable: true
          }}>
        </AgGridReact>
      </div >
    );
  }
}
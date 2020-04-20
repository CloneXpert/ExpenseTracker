import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import AddExpense from './components/expense/AddExpense'
import ExpenseList from './components/expense/ExpenseList'
import './custom.css'
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={ExpenseList} />
        <Route exact path='/expenses' component={ExpenseList} />
        <Route exact path='/expenses/add' component={AddExpense} />
        <Route exact path='/expenses/edit/:id' component={AddExpense} />
      </Layout>
    );
  }
}

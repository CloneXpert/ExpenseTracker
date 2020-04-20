import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AddExpense from './components/expense/AddExpense'

import './custom.css'
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/expenses/add' component={AddExpense} />
        {/*<Route path='/expenses' component={ExpenseItems} />
        <Route path='/expenses/:id' component={ExpenseItem} />*/}
      </Layout>
    );
  }
}

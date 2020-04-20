import React, { Component } from 'react';
import { Field, Form, Formik } from 'formik';
import { Link } from "react-router-dom";
import ExpenseDataService from "../../services/expense.service";
import * as Yup from 'yup';
import DatePicker from "../DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpenseItemType from '../../enum/expenseItemType';

export default class AddExpense extends Component {
  constructor(props) {
    super(props);

    this.initialValues = {
      transactionDate: new Date(),
      amount: 0,
      recipient: "",
      currency: "CHF",
      //type: 0
    };

    this.state = {
      error: null,
      expenseItem: null,
      response: {}
    }

    this.navigateToExpenseList = this.navigateToExpenseList.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      ExpenseDataService.get(id)
        .then(response => {

          this.setState({
            expenseItem: response.data
          });

          console.log(response.data);
        })
        .catch(error => {
          this.setState({ error });
        });
    }
  }

  navigateToExpenseList() {
    this.props.history.push('/expenses')
  }

  render() {
    const { error, expenseItem } = this.state;

    if (error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return (
        <Formik
          enableReinitialize={true}
          initialValues={expenseItem ? expenseItem : this.initialValues}
          onSubmit={async values => {
            let data = JSON.stringify(values, null, 2);

            if (values.id) {
              ExpenseDataService.update(values.id, data)
                .then(response => {
                  this.navigateToExpenseList();
                })
                .catch(e => {
                  console.log(e);
                });
            }
            else {
              ExpenseDataService.create(data)
                .then(response => {
                  this.navigateToExpenseList();
                })
                .catch(e => {
                  console.log(e);
                });
            }
          }}
          validationSchema={
            Yup.object().shape({
              amount: Yup.number()
                .positive()
                .required("A positive amount is required"),
              transactionDate: Yup.date().default(function () {
                return new Date();
              }),
              recipient: Yup.string().required("Please specify the recipient"),
            })
          }
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            } = props;

            return (
              <form onSubmit={handleSubmit} className="col-sm-4">
                <div className="form-group">
                  <label htmlFor="transactionDate" style={{ display: "block" }}>
                    Transaction Date
              </label>
                  <DatePicker className="form-control" name="transactionDate" />
                </div>

                <div className="form-group">
                  <label htmlFor="amount" style={{ display: "block" }}>
                    Amount
                </label>

                  <input
                    id="amount"
                    type="number"
                    value={values.amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      errors.amount && touched.amount
                        ? "form-control text-input is-invalid"
                        : "form-control text-input"
                    }
                  />
                </div>
                {errors.amount && touched.amount && (
                  <div className="input-feedback">{errors.amount}</div>
                )}

                <div className="form-group">
                  <label htmlFor="recipient" style={{ display: "block" }}>
                    Recipient
                </label>
                  <input
                    id="recipient"
                    type="text"
                    className={
                      errors.recipient && touched.recipient
                        ? "form-control text-input is-invalid"
                        : "form-control text-input"
                    }
                    value={values.recipient}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.recipient && touched.recipient && (
                  <div className="input-feedback">{errors.recipient}</div>
                )}

                <div className="form-group">
                  <label htmlFor="currency" style={{ display: "block" }}>
                    Currency
                </label>
                  <Field as="select" name="currency" className="form-control">
                    <option value="CHF">CHF</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </Field>
                </div>

                <div className="form-group">
                  <label htmlFor="type" style={{ display: "block" }}>
                    Type
                </label>
                  <Field as="select" name="type" className="form-control">
                    {Object.keys(ExpenseItemType).map(key =>
                      <option key={key} value={key}>{ExpenseItemType[key]}</option>
                    )}
                  </Field>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
            </button>
                <button type="submit"
                  className="btn btn-outline-success"
                  disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...'
                    : expenseItem ? 'Update' : 'Add expense'}
                </button>

                <div>
                  <Link to={`/Expenses`} className="btn btn-outline-primary btn-sm">Expense list</Link>
                </div>
              </form>
            );
          }}
        </Formik>
      );
    }
  }
}

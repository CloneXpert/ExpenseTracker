import React, { Component } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import ExpenseDataService from "../../services/expense.service";
import * as Yup from 'yup';
import DatePicker from "../DatePicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpenseItemType from '../../enum/expenseItemType';

export default class AddExpense extends Component {

  render() {
    return (
      <Formik
        initialValues={
          {
            transactionDate: new Date(),
            amount: 0,
            recipient: "",
            currency: "CHF",
            //type: 0
          }
        }
        onSubmit={async values => {
          let data = JSON.stringify(values, null, 2);
          alert(data);

          ExpenseDataService.create(data)
            .then(response => {
              //this.setState({
              //  id: response.data.id,
              //  title: response.data.title,
              //  description: response.data.description,
              //  published: response.data.published,

              //  submitted: true
              //});
              console.log(response.data);
              this.props.history.push('/expenses')
            })
            .catch(e => {
              console.log(e);
            });
        }}
        validationSchema={
          Yup.object().shape({
            amount: Yup.number()
              .positive()
              .required("Required"),
            transactionDate: Yup.date().default(function () {
              return new Date();
            }),
            recipient: Yup.string().required(),
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
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.amount && touched.amount
                      ? "form-control text-input error"
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
                      ? "form-control text-input error"
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
                className="btn btn-success"
                disabled={isSubmitting}>
                {isSubmitting ? 'Submitting expense...' : 'Add expense'}
              </button>

            </form>
          );
        }}
      </Formik>
    );
  }
}
import React, { Component } from 'react';
import { Field, Form, Formik, FormikProps } from 'formik';
import ExpenseDataService from "../../services/expense.service";
import * as Yup from 'yup';
import DatePicker from "../DatePicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddExpense extends Component {

  render() {
    return (
      <Formik
        initialValues={
          {
            transactionDate: new Date(),
            amount: 10,
            recipient: "",
            currency: "CHF",
            expenseItemType: 0
          }
        }
        onSubmit={async values => {
          let data = JSON.stringify(values, null, 2);
          alert(data);

          ExpenseDataService.create(data)
            .then(response => {

              alert(response.data);

              //this.setState({
              //  id: response.data.id,
              //  title: response.data.title,
              //  description: response.data.description,
              //  published: response.data.published,

              //  submitted: true
              //});
              console.log(response.data);
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
            <form onSubmit={handleSubmit} className="col-sm-6">
              <div class="form-group">
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
                  className={
                    errors.amount && touched.amount
                      ? "form-control error"
                      : "form-control"
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="recipient" style={{ display: "block" }}>
                  Recipient
                </label>
                <input
                  id="recipient"
                  type="text"
                  value={values.recipient}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.recipient && touched.recipient
                      ? "form-control text-input error"
                      : "form-control text-input"
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="recipient" style={{ display: "block" }}>
                  Currency
                </label>
                <Field as="select" name="currency" className="form-control">
                  <option value="CHF">CHF</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </Field>
              </div>

              <div className="form-group">
                <label htmlFor="recipient" style={{ display: "block" }}>
                  Type
                </label>
                <Field as="select" name="expenseItemType" className="form-control">
                  <option value="0">Food</option>
                  <option value="1">Drink</option>
                  <option value="2">Electronics</option>
                  <option value="3">Other</option>
                </Field>
              </div>

              {errors.amount && touched.amount && (
                <div className="input-feedback">{errors.amount}</div>
              )}

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
                Submit
            </button>

            </form>
          );
        }}
      </Formik>
    );
  }
}
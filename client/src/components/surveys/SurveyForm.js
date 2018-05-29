import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import ValidateEmails from '../../utils/validateEmails';
import SurveyField from './SurveyField';
import FIELDS from './formFields';

// To make your form component communicate with the store, we need to wrap it with reduxForm().
// It will provide the props about the form state and function to handle the submit process.
class SurveyForm extends Component {
  static renderField() {
    return FIELDS.map(({ label, name }) => (
      <Field
        type="text"
        component={SurveyField}
        label={label}
        name={name}
        key={name}
      />
    ));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {SurveyForm.renderField()}
          <Link to="/surveys" className="red btn-flat left white-text">
            Cancel
            <i className="material-icons right">clear</i>
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}
const formValidation = values => {
  // console.log(values);
  // values gather the whole inputs values object
  const errors = {}; // if errors is empty, reduxForm gets that as everything is okey with inputs values
  errors.recipients = ValidateEmails(values.recipients || '');
  FIELDS.forEach(({ name, label }) => {
    if (!values[name]) {
      errors[name] = `you must provide ${label}`;
    }
  });

  return errors;
};
export default reduxForm({
  form: 'surveyForm',
  validate: formValidation,
  destroyOnUnmount: false
})(SurveyForm);

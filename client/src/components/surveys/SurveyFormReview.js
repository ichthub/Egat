import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import formFields from './formFields';

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  const reviewFields = () =>
    formFields.map(({ name, label }) => (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields()}
      <button
        className="yellow white-text darken-3 btn-flat"
        onClick={onCancel}
      >
        Back
      </button>
      <button
        className="green white-text btn-flat right"
        onClick={() => submitSurvey(formValues, history)}
      >
        Send Email
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  formValues: state.form.surveyForm.values
});
export default connect(mapStateToProps, actions)(withRouter(SurveyReview));

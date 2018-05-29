// a container component either diplay a survey form to fill up or a review of the alreadyfilled form
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyFormReview';

class SurveyNew extends Component {
  state = {
    showReview: false
  };
  renderContent() {
    return this.state.showReview ? (
      <SurveyReview
        onCancel={() => {
          this.setState({ showReview: false });
        }}
      />
    ) : (
      <SurveyForm
        onSurveySubmit={() => {
          this.setState({ showReview: true });
        }}
      />
    );
  }
  render() {
    return <div>{this.renderContent()}</div>;
  }
}
// erase all form values when SurveyNew gets mounted
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);

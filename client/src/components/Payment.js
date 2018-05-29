import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeChekout from 'react-stripe-checkout';
import * as actions from '../actions/index';

class Payment extends Component {
  state = {
    // ath
  };
  render() {
    return (
      <div>
        <StripeChekout
          name="Egat Solutions"
          description="$5 for 5 surveys"
          amount={500}
          token={token => this.props.handleToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <button className="btn">Add Credites</button>
        </StripeChekout>
      </div>
    );
  }
}

export default connect(null, actions)(Payment);

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payment from './Payment';

class Header extends Component {
  // this.props.auth contains the user model

  renderContent() {
    switch (this.props.auth) {
      case null:
      case false:
        return (
          <li>
            <b>
              <a href="/auth/google">Login With Google</a>
            </b>
          </li>
        );
      default:
        return [
          <li key="1">
            <Payment />
          </li>,
          <li key="3" style={{ margin: '0 10px' }}>
            Credits : {this.props.auth.credits}
          </li>,
          <li key="2">
            <b>
              <a href="/api/logout">Logout</a>
            </b>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo"
          >
            Egat Solutions
          </Link>
          <ul className="right">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object
  ])
};

const mapStateToProps = ({ auth }) => ({ auth });
// this is equal to {auth; state.auth}

export default connect(mapStateToProps)(Header);

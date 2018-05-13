import PropTypes from "prop-types";
import React, {Component} from "react";
import {connect} from "react-redux";
import {BrowserRouter, Route} from "react-router-dom";
import * as actions from "../actions/index";
import "./App.css";
import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h2>Dashboard Page</h2>;
const SurveyNew = () => <h2>SurveyNew Page</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func,
};
export default connect(null, actions)(App);

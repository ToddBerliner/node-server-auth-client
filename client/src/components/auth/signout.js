import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {

  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Goodbye, Cruel World</h1>
      </div>
    );
  }
}

export default connect(null, actions)(Signout);

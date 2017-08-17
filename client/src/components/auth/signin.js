import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signin extends Component {

  handleValidFormSubmit = ({ email, password }) => {
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Opps!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {

    const { handleSubmit } = this.props;

    return(
      <form onSubmit={handleSubmit(this.handleValidFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" className="form-control" />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component="input"
            type="password" className="form-control" />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign In</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const signinForm = reduxForm({
  // required props for config of reduxForm
  form: 'signin'
})(Signin); // Signin is the component we're wrapping with reduxForm

export default connect(mapStateToProps, actions)(signinForm);

// reduxForm args:
// config - the form config
// mapStateToProps - the mapStateToProps function
// actions - the action creators available to this component
// * in this case, actions are all of the actions defined in actions/index.ht
// * each one is added individually to props so that props.signinUser is avaialble

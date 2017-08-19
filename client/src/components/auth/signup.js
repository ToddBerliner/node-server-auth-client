import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Opps!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  handleValidFormSubmit = ({ email, password }) => {
    this.props.signupUser({ email, password });
  }

  renderField ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }) {
    return (
      <div>
        <label>
          {label}
        </label>
        <div>
          <input {...input} placeholder={label} type={type}
            className="form-control" />
          {touched &&
            (error &&
              <div className="alert alert-danger mt-1">
                <strong>Opps!</strong> {error}
              </div>
            )
          }
        </div>
      </div>
    );
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleValidFormSubmit)}>
        <fieldset className="form-group">
          <Field
            name="email"
            type="text"
            className="form-control"
            component={this.renderField}
            label="Email"
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="password"
            component={this.renderField}
            type="password"
            className="form-control"
            label="Password">
          </Field>
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="password_confirm"
            component={this.renderField}
            type="password"
            className="form-control"
            label="Confirm Password">
          </Field>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  // email
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }
  // matching passwords
  if (values.password !== values.password_confirm) {
    errors.password_confirm = "Passwords don't match"
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const signupForm = reduxForm({
  form: 'signup',
  validate
})(Signup);

export default connect(mapStateToProps, actions)(signupForm);

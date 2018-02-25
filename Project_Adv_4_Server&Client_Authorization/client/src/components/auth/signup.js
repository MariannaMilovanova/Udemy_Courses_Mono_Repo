import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signup extends Component {
  handleFormSubmit(formProps) {
    //call action creator to sign up the user
    this.props.signupUser(formProps);
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit, submitFailed, signupForm } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            type="email"
            component="input"
            name="email"
            className="form-control"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            type="password"
            component="input"
            name="password"
            className="form-control"
          />
          {signupForm &&
            signupForm.syncErrors &&
            signupForm.syncErrors.password &&
            submitFailed && (
              <div className="error">{signupForm.syncErrors.password}</div>
            )}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field
            component="input"
            name="passwordConfirm"
            type="password"
            className="form-control"
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign up!
        </button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};
  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Password must match';
  }
  return errors;
}
function mapStateToProps(state) {
  return {
    signupForm: state.form.signup,
    errorMessage: state.auth.error
  };
}
export default reduxForm({
  form: 'signup',
  validate
})(connect(mapStateToProps, actions)(Signup));

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {

  renderLink(key, to, text) {
    return (
      <li className="nav-item" key={key}>
        <Link className="nav-link" to={to}>{text}</Link>
      </li>
    )
  }

  renderLinks() {
    if (this.props.authenticated) {
      return this.renderLink("sout", "/signout", "Sign Out");
    } else {
      return [
        this.renderLink("sin", "/signin", "Sign In"),
        this.renderLink("sup", "/signup", "Sign Up")
      ];
    }

  }

  render() {

    // if authenticated
    // - show Sign Out
    // else
    // - show Sign Up | Sign In

    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Aedux Ruth</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}
        </ul>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(Header);

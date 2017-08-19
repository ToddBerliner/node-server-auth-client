import React, { Component } from 'react';
import { Link } from 'react-router';
// Incorrect import === "check render method!!!"


class Signedup extends Component {
  render() {
    return (
      <div>
        <h1>Signed Up!</h1>
        <Link
          className="btn btn-primary"
          to="/protected">
          Get Protected!
        </Link>
      </div>
    );
  }
}

export default Signedup;

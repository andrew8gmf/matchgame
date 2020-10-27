import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import api from "../../services/api";

class App extends Component {
  state = {
    users: [],
  }

  async componentDidMount() {
    const response = await api.get('/users');

    this.setState({ users: response.data });
  }

  render() {

    const { users } = this.state;

    return (
      <div>
        <h1>Listar usuarios</h1>
        {users.map(user => (
          <li key={user.username}>
            <h2>
              <strong>Email: </strong>
              {user.email}
            </h2>
          </li>
        ))}
      </div>
    );
  };
};

export default withRouter(App);
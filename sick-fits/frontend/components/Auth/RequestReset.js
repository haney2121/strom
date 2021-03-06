import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Error from "../ErrorMessage";
import Form from "../styles/Form";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class Signin extends Component {
  state = {
    email: ""
  };
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { error, loading, called }) => {
          return (
            <Form
              method="POST"
              onSubmit={async e => {
                e.preventDefault();
                await reset();
                this.setState({ email: "" });
              }}
            >
              <fieldset aria-busy={loading} disabled={loading}>
                <h2>Request a password reset</h2>
                <Error error={error} />
                {!error && !loading && called && (
                  <p>Success! Check your email for reset link!</p>
                )}
                <label htmlFor="email">
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={this.state.email}
                    onChange={this.saveToState}
                  />
                </label>
                <button type="submit">Res{loading ? "seting" : "et"}</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;

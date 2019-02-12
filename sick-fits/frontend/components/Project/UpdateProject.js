import React, { Component } from "react";
import { Mutation, Query } from "react-apollo";
import Router from "next/router";
import moment from "moment";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../ErrorMessage";

const SINGLE_PROJECT_QUERY = gql`
  query SINGLE_PROJECT_QUERY($id: ID!) {
    project(where: { id: $id }) {
      id
      name
      description
      status
      isComplete
      deadline
      delivery
    }
  }
`;

const UPDATE_PROJECT_MUTATION = gql`
  mutation UPDATE_PROJECT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $status: String
    $isComplete: Boolean
    $deadline: DateTime
    $delivery: DateTime
  ) {
    updateProject(
      id: $id
      name: $name
      description: $description
      status: $status
      isComplete: $isComplete
      deadline: $deadline
      delivery: $delivery
    ) {
      id
    }
  }
`;

class UpdateProject extends Component {
  state = {};

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  handleCheckBox = e => {
    this.setState({
      isComplete: e.target.checked
    });
  };

  passUpdateProject = async (e, updateProjectMutation) => {
    e.preventDefault();
    const res = await updateProjectMutation({
      variables: {
        id: this.props.id,
        ...this.state
      }
    });
  };

  render() {
    return (
      <Query query={SINGLE_PROJECT_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (!data.project) return <p>No Project Found!</p>;
          return (
            <Mutation mutation={UPDATE_PROJECT_MUTATION} variables={this.state}>
              {(updateProject, { loading, error }) => (
                <Form onSubmit={e => this.passUpdateProject(e, updateProject)}>
                  <Error error={error} />
                  <h2>Edit Project</h2>
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="name">
                      Project Name
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter Project Name"
                        required
                        onChange={this.handleChange}
                        defaultValue={data.project.name}
                      />
                    </label>
                    <label htmlFor="status">
                      Project Status
                      <input
                        type="text"
                        id="status"
                        name="status"
                        placeholder="Enter Project Status"
                        required
                        onChange={this.handleChange}
                        defaultValue={data.project.status}
                      />
                    </label>
                    <label htmlFor="deadline">
                      Project Deadline
                      <input
                        type="date"
                        id="deadline"
                        name="deadline"
                        required
                        onChange={this.handleChange}
                        defaultValue={moment(data.project.deadline).format(
                          "YYYY-MM-DD"
                        )}
                      />
                    </label>
                    <label htmlFor="delivery">
                      Project Delivery Date
                      <input
                        type="date"
                        id="delivery"
                        name="delivery"
                        required
                        onChange={this.handleChange}
                        defaultValue={moment(data.project.delivery).format(
                          "YYYY-MM-DD"
                        )}
                      />
                    </label>
                    <label htmlFor="description">
                      Project Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Enter Project Description"
                        required
                        onChange={this.handleChange}
                        defaultValue={data.project.description}
                      />
                    </label>
                    <label htmlFor="isComplete">
                      Project Completed
                      <input
                        type="checkbox"
                        id="notCompleted"
                        name="isComplete"
                        onChange={this.handleCheckBox}
                        defaultValue={data.project.isComplete}
                      />
                    </label>
                    <button type="submit">
                      Updat{loading ? "ing" : "e"} Project
                    </button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateProject;
export { UPDATE_PROJECT_MUTATION };

import React, { Component } from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import Form from "../styles/Form";
import Error from "../ErrorMessage";

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATION(
    $name: String!
    $description: String!
    $status: String!
    $isComplete: Boolean
    $deadline: DateTime!
    $delivery: DateTime!
  ) {
    createProject(
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

class CreateProject extends Component {
  state = {
    name: "",
    description: "",
    status: "",
    isComplete: false,
    deadline: "",
    delivery: ""
  };

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

  uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "StromCentre");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/strom-centre/image/upload",
      { method: "POST", body: data }
    );
    const file = await res.json();
    console.log(file);
  };

  render() {
    return (
      <Mutation mutation={CREATE_PROJECT_MUTATION} variables={this.state}>
        {(createProject, { loading, error }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault();
              const response = await createProject();
              Router.push({
                pathname: "/project",
                query: { id: response.data.createProject.id }
              });
            }}
          >
            <Error error={error} />
            <h2>New Project</h2>
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="file">
                Project Files
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Upload an Image"
                  onChange={this.uploadfile}
                />
                {this.state.image && (
                  <img src={this.state.img} alt={this.state.name} />
                )}
              </label>
              <label htmlFor="name">
                Project Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Project Name"
                  required
                  onChange={this.handleChange}
                  value={this.state.name}
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
                  value={this.state.status}
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
                  value={this.state.deadline}
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
                  value={this.state.delivery}
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
                  value={this.state.description}
                />
              </label>
              <label htmlFor="isComplete">
                Project Completed
                <input
                  type="checkbox"
                  id="notCompleted"
                  name="isComplete"
                  onChange={this.handleCheckBox}
                  value={this.state.isComplete}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default CreateProject;
export { CREATE_PROJECT_MUTATION };

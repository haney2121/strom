import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_PROJECTS_QUERY } from "./AllProjects";

const DELETE_PROJECT_MUTATION = gql`
  mutation DELETE_PROJECT_MUTATION($id: ID!) {
    deleteProject(id: $id) {
      id
      name
    }
  }
`;

class DeleteProject extends Component {
  update = (cache, payload) => {
    //manually update cache on client to match server instead of refetch
    const data = cache.readQuery({ query: ALL_PROJECTS_QUERY });
    console.log(data);
    //filter delete item out of data
    data.projects = data.projects.filter(
      project => project.id !== payload.data.deleteProject.id
    );
    //put items back
    cache.writeQuery({ query: ALL_PROJECTS_QUERY, data });
  };

  render() {
    return (
      <Mutation
        mutation={DELETE_PROJECT_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteProject, { error }) => (
          <button
            onClick={() => {
              if (confirm("Are you sure you want to delete this project?")) {
                deleteProject().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteProject;

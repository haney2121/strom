import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import moment from "moment";
import Error from "../ErrorMessage";
import { SingleItemStyles } from "./ProjectStyles";
import Head from "next/head";

const SINGLE_PROJECT_QUERY = gql`
  query SINGLE_PROJECT_QUERY($id: ID!) {
    project(where: { id: $id }) {
      id
      name
      deadline
      delivery
      description
      status
      isComplete
    }
  }
`;

class SingleProject extends Component {
  render() {
    return (
      <Query query={SINGLE_PROJECT_QUERY} variables={{ id: this.props.id }}>
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.project) return <p>No Project Found!</p>;
          const project = data.project;
          return (
            <SingleItemStyles>
              <Head>
                <title>Strom Centre | {project.name}</title>
              </Head>
              <div>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
              </div>

              <div className="details">
                <p>
                  Deadline: {moment(project.deadline).format("MMM DD, YYYY")}
                </p>
                <p>
                  Delivery: {moment(project.delivery).format("MMM DD, YYYY")}
                </p>
                <p>Completed: {project.isComplete ? "Yes" : "No"}</p>
                <p>Status: {project.status}</p>
              </div>
            </SingleItemStyles>
          );
        }}
      </Query>
    );
  }
}

export default SingleProject;

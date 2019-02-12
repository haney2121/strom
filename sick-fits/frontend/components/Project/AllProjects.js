import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Link from "next/link";
import Head from "next/head";

import Project from "./Project";
import { Center, ProjectsList } from "./ProjectStyles";
import Pagination from "../Pagination";
import { perPage } from "../../config";

const ALL_PROJECTS_QUERY = gql`
  query ALL_PROJECTS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    projects(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      name
      description
      status
      createdAt
      id
    }
  }
`;

class AllProjects extends Component {
  render() {
    return (
      <Center>
        <Head>
          <title>Strom Centre | Projects</title>
        </Head>
        {/*{ data, error, loading } = payload */}
        <Pagination page={this.props.page} />
        <h2>
          <Link href="newproject">
            <a>New Project</a>
          </Link>
        </h2>
        <Query
          query={ALL_PROJECTS_QUERY}
          fetchPolicy="network-only"
          variables={{
            skip: this.props.page * perPage - perPage,
            first: perPage
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <ProjectsList>
                {data.projects.map(project => (
                  <Project project={project} key={project.id} />
                ))}
              </ProjectsList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default AllProjects;
export { ALL_PROJECTS_QUERY };

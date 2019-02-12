import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Link from "next/link";
import { perPage } from "../config";
import PaginationStyles from "./styles/PaginationStyles";

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    projectsConnection {
      aggregate {
        count
      }
    }
  }
`;

class Pagination extends Component {
  render() {
    return (
      <Query query={PAGINATION_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          const count = data.projectsConnection.aggregate.count;
          const pages = Math.ceil(count / perPage);
          const page = this.props.page;
          return (
            <PaginationStyles>
              <Link
                prefetch
                href={{ pathname: "projects", query: { page: page - 1 } }}
              >
                <a className="prev" aria-disabled={page <= 1}>
                  Prev
                </a>
              </Link>
              <p>
                Page {page} of {pages}
              </p>
              <p>{count} Projects Total</p>
              <Link
                prefetch
                href={{ pathname: "projects", query: { page: page + 1 } }}
              >
                <a className="prev" aria-disabled={page >= pages}>
                  Next
                </a>
              </Link>
            </PaginationStyles>
          );
        }}
      </Query>
    );
  }
}

export default Pagination;

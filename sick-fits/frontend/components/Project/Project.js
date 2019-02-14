import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Title from "../styles/Title";
import ItemStyles from "../styles/ItemStyles";
import PriceTag from "../styles/PriceTag";
import moment from "moment";
import DeleteProject from "./DeleteProject";

class Project extends Component {
  render() {
    const { project } = this.props;
    return (
      <ItemStyles>
        {project.image && <img src={project.image} alt={project.title} />}
        <Title>
          <Link
            as={`/projects/${project.id}`}
            href={{ pathname: "/project", query: { id: project.id } }}
          >
            <a>{project.name}</a>
          </Link>
        </Title>
        <PriceTag>{moment(project.createdAt).format("MMM DD, YYYY")}</PriceTag>
        <p>{project.description}</p>
        <div className="buttonList">
          <Link href={{ pathname: "edit-project", query: { id: project.id } }}>
            <a>Edit</a>
          </Link>
          <Link href={{ pathname: "/project", query: { id: project.id } }}>
            <a>Project Details</a>
          </Link>
          <DeleteProject id={project.id}>Delete Project</DeleteProject>
        </div>
      </ItemStyles>
    );
  }
}

Project.propTypes = {
  project: PropTypes.object.isRequired
};

export default Project;

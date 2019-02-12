import SingleProject from "../components/Project/SingleProject";

const Project = props => (
  <div>
    <SingleProject id={props.query.id} />
  </div>
);

export default Project;

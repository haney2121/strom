import AllProjects from "../components/Project/AllProjects";
import { Query } from "react-apollo";

const Projects = props => (
  <div>
    <AllProjects page={parseFloat(props.query.page) || 1} />
  </div>
);

export default Projects;

import UpdateProject from "../components/Project/UpdateProject";

const EditProject = props => (
  <div>
    <UpdateProject id={props.query.id} />
  </div>
);

export default EditProject;

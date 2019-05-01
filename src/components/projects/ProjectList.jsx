import React from "react";
import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";

import "../../css/ProjectList.css";

export default function ProjectList({ projects }) {

  let projectBlocks = projects && projects.map(
    project => {
      return (
        <Link to={`/project/${project._id}`} key={project._id}>
          <ProjectSummary project={project} />
        </Link>
      );
    }
  );

  return (
    <div className="project-list-wrapper">
      <div className="project-list">
        {projectBlocks}
      </div>
      <div className="project-list-shadow"></div>
    </div>
  );
}
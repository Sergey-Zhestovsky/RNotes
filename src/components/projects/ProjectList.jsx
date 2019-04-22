import React from "react";
import ProjectSummary from "./ProjectSummary";

import "../../css/ProjectList.css";

export default function ProjectList({ projects }) {
  let projectBlocks = projects && projects.map(
      project => <ProjectSummary project={project} key={project.id}/>
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
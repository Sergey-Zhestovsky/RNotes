import React from "react";
import ProjectSummary from "./ProjectSummary";
import { Link } from "react-router-dom";

import "../../css/ProjectList.css";

export default function ProjectList({ projectList, addButtonHandler, allLoaded }) {
  let projectBlocks = projectList && projectList.map(
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
        {
          projectBlocks.length
            ? projectBlocks
            : <div className="project-list_empty">Nothing yet.</div>
        }
        <div className="project-list_menu">
          {
            !allLoaded &&
            <button className="project-list_button add-button" onClick={addButtonHandler}>Load more</button>
          }
        </div>
      </div>
      <div className="project-list_shadow"></div>

    </div>
  );
}
import React from "react";

export default function ProjectSummary({ project }) {
  let style = {
    backgroundImage: `url(${project.img})`
  };

  return (
    <div className="project-block">
      <div className="project-block_image" style={style}></div>
      <div className="project-block_info">
        <div className="project-block_info-text info-title">{project.title}</div>
        <div className="project-block_info-text info-context">{project.context}</div>
        <div className="project-block_info-text info-date">{project.date}</div>
      </div>
    </div>
  );
}
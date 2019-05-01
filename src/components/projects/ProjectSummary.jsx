import React from "react";

export default function ProjectSummary({ project }) {
  let style = {
    backgroundImage: project.image
      ? `url(/img/uploads/${project.image})`
      : "url('/img/default_background.jpg')"
  },
    date = new Date( Number(project.date) );

  return (
    <div className="project-block">
      <div className="project-block_image" style={style}></div>
      <div className="project-block_info">
        <div className="project-block_info-text info-title">{project.title}</div>
        <div className="project-block_info-text info-context">{project.message}</div>
        <div className="project-block_info-text info-date">{date.toUTCString()}</div>
      </div>
    </div>
  );
}
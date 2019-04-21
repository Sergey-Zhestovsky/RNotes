import React from "react";

export default function ProjectSummary(props) {
  let style = {
    backgroundImage: `url(${props.img})`
  };
  return (
    <div className="project-block">
      <div className="project-block_image" style={style}></div>
      <div className="project-block_info">
        <div className="project-block_info-text info-title">Project Title</div>
        <div className="project-block_info-text info-context">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, laudantium!</div>
        <div className="project-block_info-text info-date">10.10.1994</div>
      </div>
    </div>
  );
}
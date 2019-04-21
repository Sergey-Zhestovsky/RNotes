import React from "react";
import ProjectSummary from "./ProjectSummary";

import "../../css/ProjectList.css";

export default function ProjectList() {
  return (
    <div className="project-list-wrapper">
      <div className="project-list">
        <ProjectSummary img={"https://caffaknitted.typepad.com/.a/6a00e54f8f86dc883401287636e5db970c-800wi"} />
        <ProjectSummary img={"https://i.kym-cdn.com/photos/images/facebook/000/035/751/41645-pikaman1_super.jpg"} />
        <ProjectSummary img={"http://pluspng.com/img-png/random-png-image-mabel-s-sweater-creator-random-gnome-png-gravity-falls-wiki-fandom-powered-by-wikia-510.png"} />
      </div>
      <div className="project-list-shadow"></div>
    </div>
  );
}
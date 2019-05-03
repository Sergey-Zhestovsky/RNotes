import React from "react";
import moment from "moment";

export default function projectDatailsPlaceholder(props) {
  let { project } = props,
    image = project.image
      ? `/img/uploads/${project.image}`
      : "/img/default_background.jpg",
    style = {
      backgroundImage: `url(${image})`
    },
    date = new Date( Number(project.date) );

  return (
    <React.Fragment>
      <div className="project_header">
        <div className="project_header-title">{project.title}</div>
        <div className="project_header-background" style={style}></div>
      </div>
      <div className="project_body container">
        <div className="project_body-main">
          <div className="project_body-main-image">
            <img src={image} alt="" />
          </div>
          <div className="project_body-main-text">
            <div className="project_body-main-context">{project.message}</div>
            <div className="project_body-main-info">
              <div className="project_body-main-info-data">Posted by {project.user}</div>
              <div className="project_body-main-info-data">{moment(date).calendar()}</div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
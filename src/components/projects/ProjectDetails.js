import React, { Component } from "react";

import "../../css/ProjectDetails.css"

export default function ProjectDetails(props) {
  let href = 'https://caffaknitted.typepad.com/.a/6a00e54f8f86dc883401287636e5db970c-800wi',
    style = {
      backgroundImage: `url(${href})`
    };
  return (
    <div className="project">
      <div className="project_header">
        <div className="project_header-title">Project Title</div>
        <div className="project_header-background" style={style}></div>
      </div>
      <div className="project_body container">
        <div className="project_body-main">
          <div className="project_body-main-image">
            <img src={href} alt="" />
          </div>
          <div className="project_body-main-text">
            <div className="project_body-main-context">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro quaerat unde vitae, labore eligendi veritatis illo consectetur quis rem, libero eum optio perferendis commodi totam deserunt nulla aliquam. Fugit nam sit velit deserunt reprehenderit adipisci autem impedit iusto soluta. Fugit assumenda adipisci voluptas sunt corporis aut aliquam temporibus, quae omnis, hic necessitatibus fuga sapiente enim ea repellat delectus ullam ab voluptatibus aperiam dignissimos laboriosam veniam ex inventore. Autem et sunt aliquam tenetur dolor accusamus iusto quasi totam quos mollitia vitae molestiae, nihil minus quod illum fugit odit distinctio laudantium maiores voluptas at blanditiis asperiores dignissimos. Quia sint eius impedit quisquam?</div>
            <div className="project_body-main-info">
              <div className="project_body-main-info-data">Posted by Sergey Z</div>
              <div className="project_body-main-info-data">10.10.1994</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
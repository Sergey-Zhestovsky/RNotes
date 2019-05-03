import Connector from "./connector";

export default class ProjectConnector extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getProjects: pathStructure.getProjects = "",
      setProject: pathStructure.setProject = "",
      getProject: pathStructure.getProject = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  getProject(id) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getProject, { _id: id });
  }

  getProjects(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getProjects, data);
  }

  setProject(data) {
    let path = this.pathStructure,
    formData = new FormData();

    for (let field in data) {
      formData.append(field, data[field]);
    }

    return super.straightRequest(path.root + path.setProject, formData, undefined, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
}
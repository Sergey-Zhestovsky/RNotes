import Connector from "./connector";

export default class ProjectConnector extends Connector {
  constructor({ pathStructure, signRequests = false } = {}) {
    super({ signRequests });

    ({
      root: pathStructure.root = "",
      getProjects: pathStructure.getProjects = "",
      setProject: pathStructure.setProject = ""
    } = pathStructure);

    this.pathStructure = pathStructure;
  }

  getProject(id) {
    return this.getProjects({ id });
  }

  getProjects(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.getProjects, data, {
      method: "get"
    });
  }

  setProject(data) {
    let path = this.pathStructure;

    return super.straightRequest(path.root + path.setProject, data);
  }
}
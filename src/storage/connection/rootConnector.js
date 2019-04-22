import ProjectConnector from "./projectConnector";
let config = require("./defaultConnectorConfig.json");

let projectConnector = new ProjectConnector(config.projectConnector);

export default {
  projectConnector
};
import ProjectConnector from "./projectConnector";
import UserConnector from "./userConnector";

let config = require("./defaultConnectorConfig.json"),
  projectConnector = new ProjectConnector(config.projectConnector),
  userConnector = new UserConnector(config.userConnector);

export default {
  projectConnector,
  userConnector
};
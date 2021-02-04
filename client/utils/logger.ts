import ActionController from "../controller/ActionController";
import ActionModel from "../model/ActionModel";
import ActionView from "../view/ActionView";

const actionView = new ActionView();
const actionModel = new ActionModel();
const logger = new ActionController(actionView, actionModel);

export default logger;

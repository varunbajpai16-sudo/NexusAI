import Router from "express";
import {runAgent} from "../Controller/Agent.controller.js";

const route = Router();

route.post("/nexus", runAgent);

export default route;
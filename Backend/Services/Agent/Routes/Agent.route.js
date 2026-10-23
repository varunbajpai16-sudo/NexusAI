import Router from "express";
import {runAgent, test} from "../Controller/Agent.controller.js";

const route = Router();

route.post("/nexus", runAgent);

export default route;
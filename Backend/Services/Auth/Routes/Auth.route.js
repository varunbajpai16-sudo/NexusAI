import Router from "express";
import LoginController from "../Controllers/auth.controller.js";
const route = Router();

route.post("/login", LoginController);

export default route;
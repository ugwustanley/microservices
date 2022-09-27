import { Router } from "express";
import UserService from "../services/services.js";
import axios from "axios";

const routes = Router();
const userService = new UserService(axios);

routes.get("/all-users", async (req, res) => {
  const all_users = await userService.getAllUsers();

  if (all_users) {
    return res.json({ ...all_users.data });
  }
  return res.status(500).json({ status: 500, message: "an error occurred" });
});

routes.delete("/delete/:id", async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  console.log(user)

  if (user) {
    return res.json({ ...user.data });
  }

  return res.status(500).json({ status: 500, message: "an error occurred" });
});

routes.get("/user/:id", async (req, res) => {
  const user = await userService.getUser(req.params.id);

  if (user) {
    return res.json({ ...user.data });
  }

  return res.status(500).json({ status: 500, message: "an error occurred" });
});

routes.post("/user", async (req, res) => {
  const user = await userService.addUser(req.body);

  if (user) {
    return res.json({ ...user.data });
  }

  return res.status(500).json({ status: 500, message: "an error occurred" });
});

export default routes;

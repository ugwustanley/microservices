import { Router } from "express";

const routes = Router();

let users = [
  {
    name: "Ugwu Stanley",
    email: "ugwustanley@email.com",
    id: 1,
  },
  {
    name: "James John",
    email: "jamesjohn@email.com",
    id: 2,
  },
  {
    name: "Peter Pan",
    email: "peterpan@email.com",
    id: 3,
  },
];

routes.get("/all-users", (req, res) => {
  res.json({
    message: "users fetch successful",
    data: users,
  });
});




routes.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== Number(id));

  res.json({
    message: "user deleted successfully",
  });
});






routes.get("/user/:id", (req, res) => {
  const { id } = req.params;

  console.log(typeof Number(id));

  const user = users.find((user) => user.id === Number(id));

  console.log(user);

  if (!user) {
    return res
      .status(404)
      .json({ status: 404, message: "user does not exist" });
  }

  res.json({
    message: "user fetch successful",
    data: user,
  });
});






routes.post("/user", (req, res) => {
  const user = req.body;

  console.log(user, "user");

  if (!user.name || !user.email || !user.id) {
    console.log(user);
    return res.status(500).json({
      status: 500,
      message: "incomplete details. Either name, id or email not provided",
    });
  }

  const existing_user = users.find((item) => item?.id === Number(user.id));

  if (existing_user) {
    return res
      .status(500)
      .json({ status: 500, message: "user with ID already exists" });
  }

  users.push({ ...user });

  res.send({
    message: "user added successfully",
    data: user,
  });
});

export default routes;

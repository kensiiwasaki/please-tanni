import { Hono } from "hono";

const app = new Hono();

app.get("/api/users/best", (c) => {
  const users = [
    { id: 1, name: "User One", link: "/api/users/1" },
    { id: 2, name: "User Two", link: "/api/users/2" },
  ];
  c.header("Content-Type", "application/json");
  return c.json(users);
});

app.post("/api/users/best", async (c) => {
  const newUser = await c.req.body();
  c.header("Content-Type", "application/json");
  c.status(201); // Created
  return c.json(newUser);
});

app.get("/api/users/bat", (c) => {
  const users = [
    { id: 1, name: "User One" },
    { id: 2, name: "User Two" },
  ];
  return c.json(users);
});

app.post("/api/users/bat", async (c) => {
  const newUser = await c.req.body();
  return c.json(newUser);
});

export default app;

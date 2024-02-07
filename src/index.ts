import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import users from "./schema";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/users/best", async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(users).all();

  if (result.length === 0) {
    return c.json({ message: "No users found" }, 404);
  }

  c.header("Content-Type", "application/json");
  return c.json({ result });
});

app.post("/users/bad", async (c) => {
  const db = drizzle(c.env.DB);
  const result = await db.select().from(users).all();

  if (result.length === 0) {
    return c.json({ message: "No users found" }, 404);
  }

  return c.json(
    {
      result,
    },
    400,
  );
});

app.post("/users", async (c) => {
  // データをハードコードしてるのでここは一旦コメントアウト
  // const params = await c.req.json<typeof users.$inferSelect>();
  const db = drizzle(c.env.DB);
  const result = await db
    .insert(users)
    .values({ name: "test3", email: "test3.com" })
    .execute();
  return c.json(result);
});

app.get("/api/users/:id", async (c) => {
  const { id } = c.req.param();
  const user = {
    id,
    name: "Sample User",
    email: "user@example.com",
  };

  return c.json(user);
});

export default app;

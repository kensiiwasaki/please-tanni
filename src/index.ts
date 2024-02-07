import { Hono } from "hono";
import { drizzle } from "drizzle-orm/d1";
import users from "./schema";
import { eq } from "drizzle-orm";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/users", async (c) => {
  // データベースからユーザー情報を取得
  const db = drizzle(c.env.DB);
  const result = await db.select().from(users).all();

  // 結果が空の場合は404 Not Foundを返す
  if (result.length === 0) {
    return c.json({ message: "No users found" }, 404);
  }

  // 成功した場合は200 OKと共にユーザーデータを返す
  c.header("Content-Type", "application/json");
  return c.json(result);
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

app.post("/api/users/bat", async (c) => {
  const newUser = await c.req.parseBody();
  return c.json(newUser);
});

export default app;

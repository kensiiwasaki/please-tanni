import { Hono } from "hono";

const app = new Hono();

app.get("/api/users", (c) => {
  // ここでユーザーデータを取得します。この例では、静的なデータを返します。
  const users = [
    { id: 1, name: "User One" },
    { id: 2, name: "User Two" },
  ];
  return c.json(users);
});

// POSTリクエストの例
app.post("/api/users", async (c) => {
  // リクエストボディからデータを取得します。
  const newUser = await c.req.body();
  // ここで新しいユーザーをデータベースに保存します。この例では、送信されたデータをそのまま返します。
  return c.json(newUser);
});

export default app;

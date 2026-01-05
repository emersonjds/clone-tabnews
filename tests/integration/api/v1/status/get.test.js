import database from "infra/database";

test("Should return status 200 on GET /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
});

test("Database connection should be successful", async () => {
  const result = await database.query(
    'SELECT 1 + 1 AS result'
  );
  console.log(result.rows);
});
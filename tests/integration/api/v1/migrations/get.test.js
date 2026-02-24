import database from "infra/database.js";

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(cleanDatabase);

test("Should return status 200 on GET /api/v1/migrations", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log("responseBody", responseBody);

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});

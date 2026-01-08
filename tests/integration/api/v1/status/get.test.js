import database from "infra/database";

test("Should return status 200 on GET /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBOdy = await response.json();
  console.log(responseBOdy);
});

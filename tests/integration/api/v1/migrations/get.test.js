test("Should return status 200 on GET /api/v1/migrations", async () => {

  const response = await fetch("http://localhost:3001/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
});





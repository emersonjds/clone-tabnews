test("Should return status 200 on GET /api/v1/status", async () => {

  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  console.log('Data consegue ser parseada', parsedUpdatedAt);
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  expect(responseBody.version_pg).toBe("16.0");
  expect(responseBody.max_connections).toBeGreaterThan(1);
  expect(responseBody.used_connections).toBeGreaterThanOrEqual(1);
});

test("Test of SQL Injection", async () => {
  await fetch("http://localhost:3000/api/v1/status?dbName=postgres");
  await fetch("http://localhost:3000/api/v1/status?dbName=");
  await fetch("http://localhost:3000/api/v1/status?dbName='; ");
  await fetch("http://localhost:3000/api/v1/status?dbName='; SELECT pg_sleep(4)");
});





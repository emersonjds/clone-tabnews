test("Should return status 200 on GET /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log('Response body:', responseBody);
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  console.log('Data consegue ser parseada', parsedUpdatedAt);
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  // const dbVersion = responseBody.version_pg;
  // const maxConnections = responseBody.max_connections;
  // const usedConnections = responseBody.used_connections;

  expect(responseBody.version_pg).toBe("16.0");
  expect(responseBody.max_connections).toBeGreaterThan(1);
  expect(responseBody.used_connections).toBeGreaterThanOrEqual(1);

});


import database from 'infra/database.js';

test("Should return status 200 on GET /api/v1/migrations", async () => {

  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log(responseBody);

  console.log('environment return', process.env.NODE_ENV);
  console.log('database url:', process.env.DATABASE_URL);

  expect(process.env.NODE_ENV).toBe('test');
  expect(process.env.DATABASE_URL).toBeUndefined();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});





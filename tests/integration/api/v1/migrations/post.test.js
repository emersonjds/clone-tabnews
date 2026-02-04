import database from 'infra/database.js';

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

beforeAll(cleanDatabase);

test("Should return status 200 on POST /api/v1/migrations and run migrations", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  // Verify migrations were actually applied
  const pgmigrationsTable = await database.query(
    "SELECT * FROM pgmigrations ORDER BY run_on DESC LIMIT 1"
  );
  expect(pgmigrationsTable.rows.length).toBeGreaterThan(0);
});

test("Should return array of migration objects on POST /api/v1/migrations", async () => {
  await cleanDatabase();

  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  const responseBody = await response.json();

  // Verify each migration entry is an object with proper structure
  responseBody.forEach((migration) => {
    expect(typeof migration).toBe('object');
    expect(migration).not.toBeNull();
    expect(migration.name || migration.file).toBeDefined();
  });
});

test("Should create pgmigrations table if it does not exist", async () => {
  await cleanDatabase();

  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(200);

  // Verify pgmigrations table was created
  const tableExists = await database.query(
    "SELECT EXISTS(SELECT FROM information_schema.tables WHERE table_name = 'pgmigrations')"
  );
  expect(tableExists.rows[0].exists).toBe(true);
});

test("Should not run same migrations twice", async () => {
  await cleanDatabase();

  // First POST
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const migrations1 = await response1.json();

  // Second POST
  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const migrations2 = await response2.json();

  // Second run should return empty array (no new migrations to run)
  expect(migrations2.length).toBe(0);
  expect(migrations1.length).toBeGreaterThan(0);
});

test("Should return proper Content-Type header on POST /api/v1/migrations", async () => {
  await cleanDatabase();

  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toContain("application/json");
});

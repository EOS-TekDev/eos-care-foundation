# Testing outline (next steps)

- **Integration tests (recommended stack):** add vitest or jest with ts-node, spin up a test database (MySQL or sqlite if models allow), and cover auth login/register, protected admin routes, CRUD flows, and Midtrans webhook idempotency.
- **Health/readiness check:** include a test that hits `/health` and asserts HTTP 200 when the DB is reachable and 503 when the DB is down.
- **CSRF/auth flows:** simulate state-changing requests with and without the `x-csrf-token` header to ensure middleware enforcement.
- **Performance guardrails:** add a simple load test script (e.g., k6 or autocannon) to ensure rate limiting and body limits behave under pressure.
- **How to run (once wired):** `npm test` after adding the test runner config; consider `npm run test:integration` to separate from unit tests.

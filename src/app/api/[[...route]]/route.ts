import { Hono } from 'hono';
import { handle } from 'hono/vercel';

const app = new Hono().basePath('/api');

app.get('/hello', (c) => {
  return c.json({ hello: 'world' });
});
app.get('/project/:projectID', (c) => {
  return c.json({ hello: c.req.param('projectID') });
});

export const GET = handle(app);

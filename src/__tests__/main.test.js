import { createTestClient } from 'apollo-server-testing';
import { server } from '../main';

it('fetches single launch', async () => {
  // use the test server to create a query function
  const { query } = createTestClient(server);

  // run query against the server and snapshot the output
  const res = await query({ query: '{}'});
  expect(res.data).toBeFalsy();
  expect(res.errors).toBeTruthy();
});
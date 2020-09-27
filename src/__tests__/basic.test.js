import { createTestClient } from 'apollo-server-testing';
import { server } from '../main';

describe('Query', () => {
  const { query } = createTestClient(server);
    
  //Empty
  test('Empty Braces', async () => {
    const res = await query({ query: '{}' });
    expect(res.data).toBeFalsy();
    expect(res.errors).toBeTruthy();
  });

  test('Supported Languages', async () => {
    const res = await query({ query: `{
        supportedLanguages {
          name
          label
        }
      }`
    });
    expect(res.errors).toBeFalsy();
    expect(res.data).toBeTruthy();
    expect(res.data.supportedLanguages).toBeDefined();
  })
})
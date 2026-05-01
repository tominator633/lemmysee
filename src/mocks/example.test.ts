import { describe, expect, it } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from './node';

// Přidáme vlastní handler pro test
const testHandler = http.get('https://example.com/api/test', () => {
  return HttpResponse.json({ message: 'Hello from mock!' });
});

describe('Example Component with MSW', () => {
  it('mocks API call', async () => {
    // Přidáme handler jen pro tento test
    server.use(testHandler);
    
    const response = await fetch('https://example.com/api/test');
    const data = await response.json();
    
    expect(data.message).toBe('Hello from mock!');
  });
});
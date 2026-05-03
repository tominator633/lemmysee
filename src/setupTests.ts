import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './shared/testing/mocks/node';
import '@testing-library/jest-dom/vitest';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

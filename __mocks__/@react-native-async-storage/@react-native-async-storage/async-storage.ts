const mockAsyncStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn(async (key: string) => store[key] || null),
    setItem: jest.fn(async (key: string, value: string) => {
      store[key] = value;
      return Promise.resolve();
    }),
    removeItem: jest.fn(async (key: string) => {
      delete store[key];
      return Promise.resolve();
    }),
    clear: jest.fn(async () => {
      store = {};
      return Promise.resolve();
    }),
  };
})();

export default mockAsyncStorage;

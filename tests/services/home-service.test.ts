import { init } from "../../src/services/home-service"

describe('home', () => {
  test('should return welcome message', async () => {
    const result = await init();
    expect(result).toEqual({ "msg": "Welcome to sports data analyser API" });
  });
});
// require polyfill for async functions in tests
require('@babel/polyfill');
const { User } = require('../../server/db/models');
const db = require('../../server/db/conn');

describe('testing user model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
    await User.create({ email: 'email@email.com', password: 'hello', type: 'user' });
  });
  afterAll(async () => {
    await db.close();
  });
  it('can retrieve data', async () => {
    const users = await User.findAll();
    return expect(users.length).toBe(1);
  });
  it('requires email to be an email', () => {
    return expect(
      User.create({ email: 'notanemail', password: 'failing test', type: 'user' }),
    ).rejects.toThrow();
  });
  it('requires email, password and type to not be empty', async () => {
    await expect(User.create({ password: '' })).rejects.toThrow();
    await expect(User.create({ email: '' })).rejects.toThrow();
    await expect(User.create({ type: '' })).rejects.toThrow();
  });
});

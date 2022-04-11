import logger from '@src/logger';
import { Court } from '@src/models/court';
import { User, UserType } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('Courts functional tests', () => {
  const defaultUser: User = {
    name: 'John Doe2',
    email: 'john3@mail.com',
    password: '1234',
    userType: UserType.Customer,
  };

  let token: string;
  let userId: string;

  beforeEach(async () => {
    await Court.deleteMany({});
    await User.deleteMany({});
    const user = await new User(defaultUser).save();
    token = AuthService.generateToken(user.id);
    userId = user.id;
  });

  describe('When creating a new Court', () => {
    it('should create a court with success', async () => {
      const newCourt: Court = {
        name: 'Quadra Areia 1',
        typeSport: 'Beach Volley',
        userId: userId,
      };

      const response = await global.testRequest
        .post('/courts')
        .set({ 'x-access-token': token })
        .send(newCourt);
      expect(response.status).toBe(201);
      //Object containing matches the keys and values, even if includes other keys such as id.
      expect(response.body).toEqual(expect.objectContaining(newCourt));
    });

    it('should return 422 when there is a validation error', async () => {
      const newCourt = {
        name: 'Volleyball -1',
        userId: userId,
      };
      const response = await global.testRequest
        .post('/courts')
        .set({ 'x-access-token': token })
        .send(newCourt);

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        code: 400,
        error: 'Bad Request',
        message: "request.body should have required property 'typeSport'",
      });
    });

    it.skip('should return 500 when there is any error other than validation error', async () => {
      //TODO think in a way to throw a 500
    });
  });
});

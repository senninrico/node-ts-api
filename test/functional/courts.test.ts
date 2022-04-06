import logger from '@src/logger';
import { Court } from '@src/models/court';
import { User, UserType } from '@src/models/user';
import AuthService from '@src/services/auth';

describe('Courts functional tests', () => {
  const defaultUser = {
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
    token = AuthService.generateToken(user.toJSON());
    userId = user.id;
  });

  describe('When creating a new Court', () => {
    it('should create a court with success', async () => {
      console.log('UserId:', userId);
      const newCourt = {
        name: 'Quadra Areia 1',
        typeSport: 'Beach Volley',
        user: userId,
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
      logger.info('UserID:', userId);
      const newCourt = {
        name: 'Quadra Areia 1',
        typeSport: 'true',
        user: userId,
      };
      const response = await global.testRequest
        .post('/courts')
        .set({ 'x-access-token': token })
        .send(newCourt);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
        code: 422,
        error: 'Unprocessable Entity',
        message:
          'Court validation failed: typeSport: Cast to Boolea failed for value "true" (type string) at path "typeSport"',
      });
    });

    it.skip('should return 500 when there is any error other than validation error', async () => {
      //TODO think in a way to throw a 500
    });
  });
});

describe('Courts functional tests', () => {
  describe('When creating a courts', () => {
    it('', async () => {
      const newBeach = {
        lat: -33.792726,
        lng: 151.28984,
        name: 'Manly',
        position: 'E',
      };

      const response = await global.testRequest.post('/courts').send(newBeach);
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(newBeach));
    });
  });
});

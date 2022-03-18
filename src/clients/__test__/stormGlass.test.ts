import { StormGlass } from '@src/clients/stormGlass';
import axios from 'axios';
import stormGlassWeather3HoursFixtures from '@test/fixtures/stormglass_weather_3_hours';

describe('StormGlass client', () => {
  it('should return the normalized forecast from the StromGlass service', async () => {
    const lat = -33.792726;
    const lng = 151.289824;

    axios.get = jest.fn().mockResolvedValue({});

    const stormGlass = new StormGlass(axios);
    const response = await stormGlass.fetchPoints(lat, lng);
  });
});

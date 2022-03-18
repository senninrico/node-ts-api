import { AxiosStatic } from 'axios';

export class StormGlass {
  readonly stormGlassApiParams =
    'swellDirection,swellHeightmswellPeriod,waveDirection,waveHeight,windDirection,windSpeed';
  readonly stormGlassApiSource = 'noaaa';

  constructor(protected request: AxiosStatic) {}

  public async fetchPoints(lat: number, lng: number): Promise<{}> {
    this.request.get(
      `https://api.stormglass.io/v2/weater/point?params=${this.stormGlassApiParams}&source=${this.stormGlassApiSource}&end=1592113802&lat=${lat}&lng=${lng}`
    );
    return Promise.resolve({});
  }
}

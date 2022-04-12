import logger from '@src/logger';
import { Cam } from '@src/models/cam';

export interface Rec {
  pid: string;
  fileName: string;
  recording: boolean;
}

export default class RecService {
  public static async startRecording(courtId: string): Promise<Rec> {
    const cams = Cam.find({ courtId });
    const rec = { pid: 'asdsad', fileName: 'test', recording: true };

    logger.info(JSON.stringify(cams));
    return rec;
  }
}

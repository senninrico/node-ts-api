import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';
import { User } from '@src/models/user';

//version of the user that is send to via API and decoded from the Json Web Token
export interface Rec {
  pid: string;
  recording: boolean;
}

export default class RecService {
  public static recordingCam(court: string): Rec {
    let rec = { pid: 'asdsad', recording: true };
    return rec;
  }

  //   public static generateToken(payload: object): string {
  //     return jwt.sign(payload, config.get('App.auth.key'), {
  //       expiresIn: config.get('App.auth.tokenExpiresIn'),
  //     });
  //   }

  //   public static decodeToken(token: string): DecodedUser {
  //     return jwt.verify(token, config.get('App.auth.key')) as DecodedUser;
  //   }
}

import { AuthenticatedUser, JwtPayload } from './auth.interfaces';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from './auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: JwtPayload): Promise<AuthenticatedUser> {
    return Promise.resolve({
      id: payload.sub,
      firstname: payload.firstname,
      lastname: payload.lastname,
      role: payload.role,
      number: payload.number,
    });
  }
}

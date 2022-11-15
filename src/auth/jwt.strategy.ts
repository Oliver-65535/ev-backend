import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './auth.constants';
import { AuthenticatedUser, JwtPayload } from './auth.interfaces';

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
      wallet_eth: payload.wallet_eth,
      is_active: payload.is_active,
    });
  }
}

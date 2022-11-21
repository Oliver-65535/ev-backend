import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import ethUtil from 'ethereumjs-util';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { randomBytes } from 'crypto';
import { UserEntity } from '../entities/user.entity';
import { Cert } from 'src/entities/cert.entity';
import { LoginResponseDto } from './dto/login-response.dto';
import { AuthenticatedUser, JwtPayload } from './auth.interfaces';
import { UserDTO } from '../graphql/user-graphql/dto/user.dto';
import { Role } from '../enums/role.enum';

type resultAuth = {
  publicAddress: string;
  result: boolean;
};

const roles = [
  { role: Role.Admin, column: 'singed_role1_id' },
  { role: Role.Doctor, column: 'singed_role2_id' },
  { role: Role.Midwife, column: 'singed_role4_id' },
];

@Injectable()
export class AuthService {
  constructor(
    @InjectQueryService(UserEntity)
    private usersService: QueryService<UserEntity>,
    @InjectQueryService(Cert)
    private certService: QueryService<Cert>,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    publicAddress: string,
    message: string,
    signature: string,
  ): Promise<AuthenticatedUser | null> {
    const recoveredAddr = this.getAddressFromSignature(
      publicAddress,
      message,
      signature,
    );
    console.log({ recoveredAddr });
    const [user] = await this.usersService.query({
      filter: { wallet_eth: { eq: recoveredAddr } },
      paging: { limit: 1 },
    });
    // dont use plain text passwords in production!
    if (user) {
      //const { password, ...result } = user;
      return user;
    }
    return null;
  }

  async currentUser(authUser: AuthenticatedUser): Promise<any> {
    try {
      const user = await this.usersService.getById(authUser.id);
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async signCert(authUser: AuthenticatedUser, cert_id): Promise<any> {
    let objUpdate = {};
    try {
      const user = await this.usersService.getById(authUser.id);
      if (user && authUser.role == user.role) {
        const [column] = roles.filter((e) => e.role == user.role);
        objUpdate[column.column] = authUser.id;
        await this.certService.updateOne(cert_id.id, objUpdate);
      }
      return { msg: 'Signed successfully!' };
    } catch (e) {
      throw new NotFoundException();
    }
  }

  login(user: AuthenticatedUser): Promise<LoginResponseDto> {
    const payload: JwtPayload = {
      sub: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      wallet_eth: user.wallet_eth,
      is_active: user.is_active,
    };
    return Promise.resolve({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      accessToken: this.jwtService.sign(payload),
    });
  }

  // async auth(
  //   publicAddress: string,
  //   msg: string,
  //   signature: string,
  // ): Promise<resultAuth> {
  //   var addrVerifi = this.verify(msg, signature);
  //   return {
  //     publicAddress: publicAddress,
  //     result: publicAddress == addrVerifi,
  //   };
  // }

  getAddressFromSignature(
    publicAddress: string,
    msg: string,
    signature: string,
  ): string {
    console.log({ msg, signature });
    const recoveredAddr = recoverPersonalSignature({
      data: msg,
      signature: signature,
    });
    console.log({ recoveredAddr });

    return recoveredAddr; //== publicAddress ? recoveredAddr : null;
  }

  generateString(size: number): string {
    return randomBytes(size).toString('hex');
  }
}

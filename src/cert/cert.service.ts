import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectQueryService, QueryService } from '@nestjs-query/core';
import { UserEntity } from '../entities/user.entity';
import { Cert } from 'src/entities/cert.entity';
import { EvmService } from 'src/evm/evm.service';
import { AuthenticatedUser } from '../auth/auth.interfaces';
import { Role } from '../enums/role.enum';

const roles = [
  { role: Role.Administrator, column: 'signatory1' },
  { role: Role.Doctor, column: 'signatory2' },
  { role: Role.Midwife, column: 'signatory3' },
];

@Injectable()
export class CertService {
  constructor(
    @InjectQueryService(UserEntity)
    private usersService: QueryService<UserEntity>,
    @InjectQueryService(Cert)
    private certService: QueryService<Cert>,
    private evmService: EvmService,
  ) {}

  async signCert(authUser: AuthenticatedUser, cert_id): Promise<any> {
    let objUpdate = {};
    try {
      const cert = await this.certService.getById(cert_id.id);
      const user = await this.usersService.getById(authUser.id);
      const [column_singer] = roles.filter((e) => e.role == user.role);
      if (
        cert[column_singer.column] == 0 &&
        user &&
        authUser.role == user.role
      ) {
        objUpdate[column_singer.column] = authUser.id;
        await this.certService.updateOne(cert_id.id, objUpdate);
        const updatedCert = await this.certService.getById(cert_id.id);
        if (
          updatedCert.signatory1 > 0 &&
          updatedCert.signatory2 > 0 &&
          updatedCert.signatory3 > 0
        ) {
          const payload = await this.convertCertToNFTMetadata(updatedCert);
          const mintedData = await this.evmService.ipfsSend(payload);
          if (mintedData) {
            await this.certService.updateOne(cert_id.id, {
              ipfs_public_hash: mintedData.txHash,
            });
            return { msg: 'Singed and load in blockchain successfully!' };
          }
        }
        return { msg: 'Signed successfully!' };
      } else throw new Error('Already signed!');
    } catch (e) {
      throw new Error(e);
    }
  }

  async convertCertToNFTMetadata(cert: Cert) {
    const {
      id,
      firstname,
      middlename,
      lastname,
      sex,
      single_twin,
      ismultiple,
      pb_name,
      pb_street,
      pb_city,
      pb_country,
      signatory1,
      signatory2,
      signatory3,
      ...privateData
    } = cert;
    const privateMetadata = {
      lbc_number: `00000${id}`,
      ...privateData,
    };
    const publicData = {
      private_data_url: 'ipfs://link_to_private_data',
      firstname,
      middlename,
      lastname,
      sex,
      single_twin,
      ismultiple,
      name: pb_name,
      street: pb_street,
      city: pb_city,
      country: pb_country,
    };
    const publicMetadata = {
      name: `Live Birth Certificate 00000${id}`,
      description: 'LBC for USER_X',
      image: `ipfs://QmcqbSmqLsEtHn51obdtUm4KtVU3Zf3jQqPYJMj2wnRZyx`,
      external_url: `https://link_to_LBC_website`,
      LBCnumber: `00000${id}`,
      attributes: Object.keys(publicData).map((key) => {
        return {
          trait_type: key,
          value: publicData[key],
        };
      }),
      signs: {
        sign1: signatory1,
        sign2: signatory2,
        sign3: signatory3,
      },
    };

    return {
      id,
      publicMetadata,
      privateMetadata,
    };
  }
}

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
  { role: Role.Admin, column: 'singed_role1_id' },
  { role: Role.Doctor, column: 'singed_role2_id' },
  { role: Role.Midwife, column: 'singed_role4_id' },
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
          updatedCert.singed_role1_id > 0 &&
          updatedCert.singed_role2_id > 0 &&
          updatedCert.singed_role4_id > 0
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
      child_weight,
      child_height,
      child_blood,
      singed_role1_id,
      singed_role2_id,
      singed_role4_id,
      ...publicData
    } = cert;
    const privateMetadata = {
      lbc_number: `00000${id}`,
      child_weight,
      child_height,
      child_blood,
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
        sign1: singed_role1_id,
        sign2: singed_role2_id,
        sign3: singed_role4_id,
      },
      private_data_url: 'ipfs://link_to_private_data',
    };

    return {
      id,
      publicMetadata,
      privateMetadata,
    };
  }
}

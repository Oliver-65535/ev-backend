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
require('dotenv').config();

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
          this.mintCert(cert_id.id, payload);
        }
        return { msg: 'Signed successfully!' };
      } else throw new Error('Already signed!');
    } catch (e) {
      throw new Error(e);
    }
  }

  async mintCert(cert_id, payload: any) {
    const mintedData = await this.evmService.ipfsSend(payload);
    if (mintedData) {
      this.certService.updateOne(cert_id, {
        ipfs_public_hash: mintedData.txHash,
      });
      return { msg: 'Singed and load in blockchain successfully!' };
    }
  }

  async checkSubscription() {
    return await this.certService.updateOne(8, {
      ipfs_private_hash: 'test string',
    });
    //return { msg: 'subscriptio runned!' };
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
      dob_date,
      dob_time,
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
    const publicData = [
      { key: '1A. First Name', val: firstname },
      { key: '1B. Middle Name', val: middlename },
      { key: '1C. Last Name', val: lastname },
      { key: '2. Sex', val: sex },
      { key: '3A. This Birth, Single, Twin, etc.', val: single_twin },
      { key: '3B. If Multiple This Child 1st, 2nd, etc.', val: ismultiple },
      { key: '4A. Date of birth', val: dob_date },
      { key: '4B. Hour - 24 Hour Clock Time', val: dob_time },
      { key: '5A. Name of Hospital or Facility', val: pb_name },
      { key: '5B. Street and Number, or Location', val: pb_street },
      { key: '5C. City', val: pb_city },
      { key: '5D. County', val: pb_country },
      { key: '6A. Private data url', val: 'ipfs://link_to_private_data' },
      { key: '6B. Contract address', val: process.env.CONTRACT_ADDRESS },
    ];
    const publicMetadata = {
      name: `Live Birth Certificate 00000${id}`,
      description: 'LBC for USER_X',
      image: `ipfs://QmcqbSmqLsEtHn51obdtUm4KtVU3Zf3jQqPYJMj2wnRZyx`,
      external_url: `https://link_to_LBC_website`,
      LBCnumber: `00000${id}`,
      attributes: publicData.map((e) => ({ trait_type: e.key, value: e.val })),
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

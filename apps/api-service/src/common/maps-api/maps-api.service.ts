import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { InjectQueryService, QueryService } from '@nestjs-query/core';

import { ChargePointEntity } from '../chargePoint/chargePoint/chargePoint.entity';

type markerType = {
  siteid: number;
  location: any;
  available: string;
  total: string;
};

@Injectable()
export class MapsApiService {
  constructor(
    @InjectQueryService(ChargePointEntity)
    private chargePointService: QueryService<ChargePointEntity>,
    private dataSource: DataSource,
  ) {}

  // async validateUser(
  //   publicAddress: string,
  //   message: string,
  //   signature: string,
  // ): Promise<AuthenticatedUser | null> {
  //   const recoveredAddr = this.getAddressFromSignature(
  //     publicAddress,
  //     message,
  //     signature,
  //   );
  //   console.log({ recoveredAddr });
  //   const [user] = await this.usersService.query({
  //     filter: { wallet_eth: { eq: recoveredAddr } },
  //     paging: { limit: 1 },
  //   });
  //   // dont use plain text passwords in production!
  //   if (user) {
  //     //const { password, ...result } = user;
  //     return user;
  //   }
  //   return null;
  // }

  async getConnectorsOnMarkers(): Promise<markerType[]> {
    try {
      const station = await this.dataSource
        .query(`select  siteId,ST_AsGeoJSON(location) as location, available,total from 
        (select  "location" as location,COUNT(*) as total,s.id as siteId  from "Site" s inner join "Connector" c on c."siteId" = s.id  where c."connectorTypeName" in ('Type 2','Tesla') group by s.id) t1 left join 
        (select  COUNT(*) as available,s.id as connSiteId  from "Site" s inner join "Connector" c on c."siteId" = s.id  where c."connectorTypeName" in ('Type 2','Tesla') and c."statusName" = 'Available' group by s.id)
         t2 on t1.siteId = t2.connSiteId order by t1.siteId ASC`);

      const st = station.map((e) => {
        return { ...e, location: JSON.parse(e.location) };
      });
      console.log(st);
      return st;
    } catch (e) {
      console.log(e);
      // throw new UnauthorizedException();
    }
  }

  // login(user: AuthenticatedUser): Promise<LoginResponseDto> {
  //   const payload: JwtPayload = {
  //     sub: user.id,
  //     firstname: user.firstname,
  //     lastname: user.lastname,
  //     role: user.role,
  //     wallet_eth: user.wallet_eth,
  //     //is_active: user.is_active,
  //   };
  //   return Promise.resolve({
  //     // eslint-disable-next-line @typescript-eslint/naming-convention
  //     accessToken: this.jwtService.sign(payload),
  //   });
  // }

  // getAddressFromSignature(
  //   publicAddress: string,
  //   msg: string,
  //   signature: string,
  // ): string {
  //   console.log({ msg, signature });
  //   const recoveredAddr = recoverPersonalSignature({
  //     data: msg,
  //     signature: signature,
  //   });
  //   console.log({ recoveredAddr });

  //   return recoveredAddr; //== publicAddress ? recoveredAddr : null;
  // }

  // generateString(size: number): string {
  //   return randomBytes(size).toString('hex');
  // }
}

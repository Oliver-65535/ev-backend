import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { InjectQueryService, QueryService } from '@nestjs-query/core';

import { СhargePointEntity } from '../chargePoint/chargePoint/chargePoint.entity';

type resultAuth = {
  publicAddress: string;
  result: boolean;
};

@Injectable()
export class MapsApiService {
  constructor(
    @InjectQueryService(СhargePointEntity)
    private chargePointService: QueryService<СhargePointEntity>,
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

  async getConnectorsOnMarkers(): Promise<any> {
    try {
      // const station = await this.stationService.getById(1);
      // const station = await this.dataSource.query(`select se."location" ,COUNT(*) from station_entity se inner join  connector c on se.id = c."stationId" group by se."location" WHERE c.status LIKE "Available"`);
      // const station = await this.dataSource.createQueryBuilder()
      // .select("location")
      // .from(StationEntity,"station").getMany()

      // const station_table = await this.dataSource
      //   .query(`select * from ChargePoint se
      // RIGHT OUTER JOIN  connector c ON se.id = c."stationId" WHERE c.status = 'Available'`);
      // const station = await this.dataSource
      //   .query(`select ST_AsGeoJSON(se.location) ,COUNT(*) from ChargePoint se
      // RIGHT OUTER JOIN  connector c ON se.id = c."stationId" WHERE c.status = 'Available' GROUP BY se.location`);

      //   const station = await this.dataSource
      //   .createQueryBuilder(StationEntity,"station")
      // .innerJoinAndSelect(
      //     "station.id",
      //     "connector.stationId", c
      //     "connector.status = :status",
      //     { status: 'Available' },
      // )
      // // .where("user.name = :name", { name: "Timber" })
      // .getRawMany()

      // const st = station.map((e) => {
      //   const res = { ...e, location: JSON.parse(e.st_asgeojson) };
      //   delete res.st_asgeojson;
      //   return res;
      // });
      // console.table(station_table);
      // console.log(st);
      return [];
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

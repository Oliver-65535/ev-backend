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

type siteType = {
  connector_type: string;
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

  async getFilteredSite(input: any): Promise<siteType[]> {
    try {
      const {
        connectorTypesSelected = [
          'Type 1',
          'Type 2',
          'Tesla',
          'CCS1',
          'CCS2',
          'CHAdeMO',
        ],
        siteId, // connectorStatusSelected = ['Available'],
        minPower = 0,
        maxPower = 200,
        minPrice = 0,
        maxPrice = 200,
      } = input;

      console.log('INNNPUTTT:', input);

      const site = await this.dataSource.query(
        `select t1.connectorType as connector_type,available,total  from 
        (select c."connectorTypeName" as connectorType,count(*) as total from "Connector" c 
        where c."siteId" = $2 and c."connectorTypeName" = any ($1)
        and c.price between  $3 and $4 and c.power between $5 and $6 group by c."connectorTypeName") t1
        left join
        (select c."connectorTypeName"  as connType ,count(*) as available from "Connector" c 
        where c."siteId" = $2 and c."connectorTypeName" = any ($1)
        and c.price between  $3 and $4 and c.power between $5 and $6
        and c."statusName"='Available' group by c."connectorTypeName") t2
        on t1.connectorType = t2.connType;`,
        [
          connectorTypesSelected,
          siteId, // connectorStatusSelected,
          minPrice,
          maxPrice,
          minPower,
          maxPower,
        ],
      );

      console.log(site);
      return site;
    } catch (e) {
      console.log(e);
      // throw new UnauthorizedException();
    }
  }

  async getFilteredMarkers(input: any): Promise<markerType[]> {
    try {
      const {
        connectorTypesSelected = [
          'Type 1',
          'Type 2',
          'Tesla',
          'CCS1',
          'CCS2',
          'CHAdeMO',
        ],
        connectorStatusSelected = ['Available'],
        minPower = 0,
        maxPower = 200,
        minPrice = 0,
        maxPrice = 200,
      } = input;

      // console.log('INNNPUTTT:', input);

      const sites = await this.dataSource.query(
        `select  siteId,ST_AsGeoJSON(location) as location, available,total from 
        (select  "location" as location,COUNT(*) as total,s.id as siteId  from "Site" s 
        inner join "Connector" c on c."siteId" = s.id  where c."connectorTypeName" = any ($1)
        and c.price between  $3 and $4 and c.power between $5 and $6 group by s.id) t1 
        left join 
        (select  COUNT(*) as available,s.id as connSiteId  from "Site" s 
        inner join "Connector" c on c."siteId" = s.id  where c."connectorTypeName" = any ($1) 
        and c.price between  $3 and $4 and c.power between $5 and $6 
        and c."statusName" = any ($2) group by s.id)
         t2 on t1.siteId = t2.connSiteId order by t1.siteId ASC;`,
        [
          connectorTypesSelected,
          connectorStatusSelected,
          minPrice,
          maxPrice,
          minPower,
          maxPower,
        ],
      );

      // const stat = await this.dataSource
      //   .createQueryBuilder(SiteEntity, 'site')
      //   .innerJoinAndSelect(
      //     'site.id',
      //     'connector.siteId',
      //     'connector.status = :status',
      //     { status: 'Available' },
      //   )
      //   // .where("user.name = :name", { name: "Timber" })
      //   .getRawMany();

      // const stat = await this.dataSource
      //   .createQueryBuilder(SiteEntity, 'Site')
      //   .addSelect('location')
      //   .innerJoinAndSelect('Site', 'Connector', 'Connector.siteId = Site.id')
      //   .getSql();

      const st = sites.map((e) => {
        return { ...e, location: JSON.parse(e.location) };
      });
      // console.log(sites);
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

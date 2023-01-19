import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationEntity } from 'src/common/charge-station/station.entity';
import { StationDTO } from './dto/station.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([StationEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([StationEntity])],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: StationDTO,
          EntityClass: StationEntity,
          create: { disabled: false },
          update: { disabled: false },
          delete: { disabled: false },
          enableSubscriptions: true,
        },
      ],
    }),
  ],
  exports: [TypeOrmModule],
})
export class GraphqlStationModule {}
console.log(NestjsQueryGraphQLModule.forFeature);

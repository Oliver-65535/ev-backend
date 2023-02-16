import { ChargePointDTO } from './dto/chargePoint.dto';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { СhargePointEntity } from 'src/common/chargePoint/chargePoint/chargePoint.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([СhargePointEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([СhargePointEntity])],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: ChargePointDTO,
          EntityClass: СhargePointEntity,
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
export class GraphqlСhargePointModule {}
console.log(NestjsQueryGraphQLModule.forFeature);

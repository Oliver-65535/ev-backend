import { ChargePointDTO } from './dto/chargePoint.dto';
import { ChargePointEntity } from 'src/common/chargePoint/chargePoint/chargePoint.entity';
import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChargePointEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([ChargePointEntity])],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: ChargePointDTO,
          EntityClass: ChargePointEntity,
          create: { disabled: false },
          update: { disabled: false },
          delete: { disabled: false },
          enableSubscriptions: true,
          enableAggregate: true,
        },
      ],
    }),
  ],
  exports: [TypeOrmModule],
})
export class GraphqlСhargePointModule {}
console.log(NestjsQueryGraphQLModule.forFeature);

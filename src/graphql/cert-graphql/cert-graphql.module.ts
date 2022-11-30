import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cert } from 'src/entities/cert.entity';
import { CertDTO } from './dto/cert-graphql.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cert]),
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryTypeOrmModule to register the entity with typeorm
      // and provide a QueryService
      imports: [NestjsQueryTypeOrmModule.forFeature([Cert])],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: CertDTO,
          EntityClass: Cert,
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
export class GraphqlCertModule {}

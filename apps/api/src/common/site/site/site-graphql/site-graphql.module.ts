import { Module } from '@nestjs/common';
import { NestjsQueryGraphQLModule } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { SiteDTO } from './dto/site.dto';
import { SiteEntity } from 'src/common/site/site/site.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([SiteEntity]),
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([SiteEntity])],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: SiteDTO,
          EntityClass: SiteEntity,
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
export class GraphqlSiteModule {}
// console.log(NestjsQueryGraphQLModule.forFeature);

import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { Cert } from '../entities/cert.entity';

@Module({
  imports: [NestjsQueryTypeOrmModule.forFeature([Cert])],
  exports: [NestjsQueryTypeOrmModule.forFeature([Cert])],
})
export class CertModule {}

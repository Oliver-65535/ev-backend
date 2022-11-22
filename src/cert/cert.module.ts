import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';
import { Module } from '@nestjs/common';
import { Cert } from '../entities/cert.entity';
import { UserEntity } from 'src/entities/user.entity';
import { CertService } from './cert.service';
import { EvmModule } from 'src/evm/evm.module';

@Module({
  imports: [
    EvmModule,
    NestjsQueryTypeOrmModule.forFeature([Cert]),
    NestjsQueryTypeOrmModule.forFeature([UserEntity]),
  ],
  exports: [NestjsQueryTypeOrmModule.forFeature([Cert]), CertService],
  providers: [CertService],
})
export class CertModule {}

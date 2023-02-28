import { ArgsType } from '@nestjs/graphql';
import { ChargePointDTO } from './dto/chargePoint.dto';
import { QueryArgsType } from '@nestjs-query/query-graphql';

@ArgsType()
export class ChargePointQuery extends QueryArgsType(ChargePointDTO) {}

export const ChargePointConnection = ChargePointQuery.ConnectionType;

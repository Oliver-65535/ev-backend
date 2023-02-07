import { QueryArgsType } from '@nestjs-query/query-graphql';
import { ArgsType } from '@nestjs/graphql';

import { StationDTO } from './dto/station.dto';

@ArgsType()
export class StationQuery extends QueryArgsType(StationDTO) {}

export const StationConnection = StationQuery.ConnectionType;
import { QueryArgsType } from '@nestjs-query/query-graphql';
import { ArgsType } from '@nestjs/graphql';

import { ConnectorDTO } from './dto/connector.dto';

@ArgsType()
export class ConnectorQuery extends QueryArgsType(ConnectorDTO) {}

export const ConnectorConnection = ConnectorQuery.ConnectionType;
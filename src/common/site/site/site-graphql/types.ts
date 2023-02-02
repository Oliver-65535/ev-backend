import { QueryArgsType } from '@nestjs-query/query-graphql';
import { ArgsType } from '@nestjs/graphql';

import { SiteDTO } from './dto/site.dto';

@ArgsType()
export class SiteQuery extends QueryArgsType(SiteDTO) {}

export const SiteConnection = SiteQuery.ConnectionType;
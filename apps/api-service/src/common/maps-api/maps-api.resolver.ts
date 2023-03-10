import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import {
  CertIDInputDTO,
  RandomMessageInputDTO,
} from './dto/maps-api-login-randmsg-input.dto';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

import {
  ConnectorsOnMarkerResponseDto,
  SiteResponseDto,
  InputFilterMarkersDto,
  InputFilterSiteDto,
} from './dto/getConnectors.dto';
import { LoginInputDTO } from './dto/maps-api-login-input.dto';
import { MapsApiService } from './maps-api.service';
import { RandomMessageResponseDTO } from './dto/maps-api-login-randmsg-response.dto';

import { ChargePointDTO } from '../chargePoint/chargePoint/dto/chargePoint.dto';
import { type } from 'os';

type markerType = {
  siteid: number;
  location: any;
  available: string;
  total: string;
};

type siteType = {
  connector_type: string;
  available: string;
  total: string;
};

const pubSub = new PubSub();

type rest = {
  res: string;
};

@Resolver()
export class MapsApiResolver {
  constructor(private mapsApiService: MapsApiService) {}

  // @Mutation(() => LoginResponseDto)
  // async login(@Args('input') input: LoginInputDTO): Promise<LoginResponseDto> {
  //   const user = await this.authService.validateUser(
  //     input.publicAddress,
  //     input.message,
  //     input.signature,
  //   );
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return this.authService.login(user);
  // }

  // async getRandomMessage(
  //   @Args('input') input: RandomMessageInputDTO,
  // ): Promise<RandomMessageResponseDTO> {
  //   const msgString = this.authService.generateString(128);
  //   return { msg: msgString };
  // }

  @Query(() => [ConnectorsOnMarkerResponseDto])
  getFilteredMarkers(
    @Args('input') input: InputFilterMarkersDto,
  ): Promise<markerType[]> {
    const res = this.mapsApiService.getFilteredMarkers(input);
    //console.log('ME', 'asd', res);
    return res;
  }

  @Query(() => [SiteResponseDto])
  getFilteredSite(
    @Args('input') input: InputFilterSiteDto,
  ): Promise<siteType[]> {
    const res = this.mapsApiService.getFilteredSite(input);
    return res;
  }

  //SUBSCRIBE SITE
  @Subscription(() => [SiteResponseDto], {
    name: 'siteUpdated',
    filter: (payload, variables) => {
      // console.log('FILTER', { payload, variables });
      return payload.siteId === variables.input.siteId;
    },
    resolve(this: MapsApiResolver, payload, variables) {
      // "this" refers to an instance of "AuthorResolver"
      return this.getUpdatedSite(variables);
    },
  })
  private siteUpdated(@Args('input') input: InputFilterSiteDto) {
    return pubSub.asyncIterator('siteUpdated');
  }

  //SUBSCRIBE Markers
  @Subscription(() => [ConnectorsOnMarkerResponseDto], {
    name: 'markerUpdated',
    resolve(this: MapsApiResolver, payload, variables) {
      // "this" refers to an instance of "AuthorResolver"
      return this.getUpdatedMarker({ ...variables });
    },
  })
  private markerUpdated(@Args('input') input: InputFilterSiteDto) {
    return pubSub.asyncIterator('markerUpdated');
  }

  private async getUpdatedSite(variables) {
    return await this.mapsApiService.getFilteredSite(variables.input);
  }

  private async getUpdatedMarker(variables) {
    console.log('YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY', variables);
    return await this.mapsApiService.getFilteredMarkers(variables.input);
  }

  public pubMarkerUpdated(siteId: number) {
    console.log(siteId);
    pubSub.publish('markerUpdated', { siteId });
    pubSub.publish('siteUpdated', { siteId });
  }

  // pubSiteUpdated() {
  //   console.log();
  //   pubSub.publish('siteUpdated', { minPrice: 200 });
  // }

  // @Mutation(() => RandomMessageResponseDTO)
  // sign(
  //   @CurrentUser() user: AuthenticatedUser,
  //   @Args('input') input: CertIDInputDTO,
  // ): Promise<UserAuthDTO> {
  //   console.log('asjdjasldjl', user, input);
  //   return this.certService.signCert(user, input);
  // }
}

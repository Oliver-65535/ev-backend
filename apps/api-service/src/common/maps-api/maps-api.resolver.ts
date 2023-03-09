import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import {
  CertIDInputDTO,
  RandomMessageInputDTO,
} from './dto/maps-api-login-randmsg-input.dto';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

import {
  ConnectorsOnMarkerResponseDto,
  InputFilterMarkersDto,
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
    this.markersUpdated();
    return res;
  }

  //SUBSCRIBE
  @Subscription(() => InputFilterMarkersDto, {
    name: 'chargePointAdded',
  })
  chargePointAdded() {
    return pubSub.asyncIterator('chargePointAdded');
  }

  markersUpdated() {
    pubSub.publish('chargePointAdded', {
      chargePointAdded: {
        minPower: 20,
        maxPower: 60,
        minPrice: 30,
        maxPrice: 70,
      },
    });
  }

  // @Mutation(() => RandomMessageResponseDTO)
  // sign(
  //   @CurrentUser() user: AuthenticatedUser,
  //   @Args('input') input: CertIDInputDTO,
  // ): Promise<UserAuthDTO> {
  //   console.log('asjdjasldjl', user, input);
  //   return this.certService.signCert(user, input);
  // }
}

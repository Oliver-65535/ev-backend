import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CertIDInputDTO,
  RandomMessageInputDTO,
} from './dto/maps-api-login-randmsg-input.dto';
import { UnauthorizedException, UseGuards } from '@nestjs/common';

import { ConnectorsOnMarkerResponseDto } from './dto/getConnectors.dto';
import { LoginInputDTO } from './dto/maps-api-login-input.dto';
import { MapsApiService } from './maps-api.service';
import { RandomMessageResponseDTO } from './dto/maps-api-login-randmsg-response.dto';

type markerType = {
  siteid: number;
  location: any;
  available: string;
  total: string;
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
  getConnectorByMarker(): Promise<markerType[]> {
    const res = this.mapsApiService.getConnectorsOnMarkers();
    console.log('ME', 'asd', res);
    return res;
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
